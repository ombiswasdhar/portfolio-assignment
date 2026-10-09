"use client"

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'

const MusicContext = createContext(null)

// Multi-track playlist: Sunflower (Spider-Verse) & NOBLE (F3miii)
export const TRACKS = [
  {
    id: 'sunflower',
    title: 'Sunflower',
    subtitle: 'Spider-Verse • Instrumental',
    artist: 'Post Malone & Swae Lee',
    src: '/sunflower.m4a',
    cover: '/sunflower_cover.jpg',
    appleMusicEmbedUrl: 'https://embed.music.apple.com/us/album/sunflower-spider-man-into-the-spider-verse/1438399551?i=1438399556',
    appleMusicUrl: 'https://music.apple.com/us/album/sunflower-spider-man-into-the-spider-verse/1438399551?i=1438399556',
    duration: 158,
  },
  {
    id: 'noble',
    title: 'NOBLE',
    subtitle: 'F3miii • Instrumental (prod. sparse)',
    artist: 'F3miii',
    src: '/noble.m4a',
    cover: '/noble_cover.jpg',
    appleMusicEmbedUrl: 'https://embed.music.apple.com/us/album/noble/1878172174?i=1878172181',
    appleMusicUrl: 'https://music.apple.com/us/album/noble/1878172174?i=1878172181',
    duration: 186,
  },
]

export const AUDIO_TRACK_URL = TRACKS[0].src
export const APPLE_MUSIC_STREAM_URL = AUDIO_TRACK_URL

export function MusicProvider({ children }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const currentTrack = TRACKS[currentTrackIndex]

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(TRACKS[0].duration)
  const [volume, setVolumeState] = useState(0.85)
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false)

  // Dedicated Audio Element References for both Sunflower & Noble
  const sunflowerAudioRef = useRef(null)
  const nobleAudioRef = useRef(null)

  const currentTrackIndexRef = useRef(0)
  const isPlayingRef = useRef(false)

  // Check if user explicitly paused during this session
  const isInitiallyPausedByUser = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_music_paused') === 'true'
  const userPausedRef = useRef(isInitiallyPausedByUser)

  const volumeRef = useRef(0.85)
  const isMutedRef = useRef(false)
  const fadeRafRef = useRef(null)
  const cleanupGestureListenersRef = useRef(null)

  // Keep references in sync with state
  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex
  }, [currentTrackIndex])

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    volumeRef.current = volume
  }, [volume])

  useEffect(() => {
    isMutedRef.current = isMuted
  }, [isMuted])

  // Crossfade between Sunflower (index 0) and Noble (index 1)
  // When leaving About Me, Sunflower resumes seamlessly from the exact timestamp where it faded out
  const crossfadeToTrack = useCallback((targetIndex) => {
    if (targetIndex === currentTrackIndexRef.current) return

    const fromTrack = currentTrackIndexRef.current
    const toTrack = targetIndex

    currentTrackIndexRef.current = toTrack
    setCurrentTrackIndex(toTrack)

    const fromAudio = fromTrack === 0 ? sunflowerAudioRef.current : nobleAudioRef.current
    const toAudio = toTrack === 0 ? sunflowerAudioRef.current : nobleAudioRef.current

    if (!fromAudio || !toAudio) return

    // Immediately sync current time and duration to the active track
    setCurrentTime(toAudio.currentTime || 0)
    setDuration(toAudio.duration || TRACKS[toTrack].duration)

    // CRITICAL: If user explicitly paused music or player is not playing, STAY PAUSED!
    // Never auto-play on scroll if the user clicked pause!
    if (userPausedRef.current || !isPlayingRef.current) {
      if (fromAudio) fromAudio.pause()
      if (toAudio) toAudio.pause()
      return
    }

    // Cancel any ongoing fade animation
    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current)
      fadeRafRef.current = null
    }

    const targetVol = volumeRef.current
    const startFromVol = fromAudio.volume
    const startToVol = toAudio.volume

    // Start incoming track (unmuted, starting at its current volume or 0)
    toAudio.muted = isMutedRef.current
    toAudio.volume = Math.max(0, startToVol)

    const playPromise = toAudio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Guard: if user paused while playPromise was resolving, halt immediately!
          if (userPausedRef.current || !isPlayingRef.current) {
            toAudio.pause()
            return
          }
          setIsPlaying(true)
          isPlayingRef.current = true
          setIsAutoplayBlocked(false)
        })
        .catch((err) => {
          console.warn('Playback error during crossfade:', err)
        })
    }

    const fadeDuration = 1100 // 1.1s smooth musical crossfade
    const startTime = performance.now()

    const step = (now) => {
      // If user paused mid-fade, abort immediately
      if (userPausedRef.current || !isPlayingRef.current) {
        fromAudio.pause()
        toAudio.pause()
        fadeRafRef.current = null
        return
      }

      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / fadeDuration)

      // Smoothstep curve for natural volume ramp
      const smooth = progress * progress * (3 - 2 * progress)

      // Fade out previous track
      const newFromVol = Math.max(0, startFromVol * (1 - smooth))
      fromAudio.volume = newFromVol

      // Fade in target track
      const newToVol = Math.min(targetVol, startToVol + (targetVol - startToVol) * smooth)
      toAudio.volume = newToVol

      if (progress < 1) {
        fadeRafRef.current = requestAnimationFrame(step)
      } else {
        // Complete the fade
        fromAudio.volume = 0
        fromAudio.pause()
        // Crucial: fromAudio.currentTime is PRESERVED so Sunflower resumes from this exact second later!
        toAudio.volume = targetVol
        fadeRafRef.current = null
      }
    }

    fadeRafRef.current = requestAnimationFrame(step)
  }, [])

  // Auto-switch track between Sunflower and NOBLE on scroll:
  // - While scrolling to the About Me page: Sunflower fades out, Noble fades in.
  // - After scrolling out of About Me: Noble fades out, Sunflower fades in FROM WHERE IT FADED OUT EARLIER!
  useEffect(() => {
    let scrollRaf = 0

    const updateSectionMusic = () => {
      if (typeof window === 'undefined') return

      const aboutEl = document.getElementById('about')

      // If About section doesn't exist on page (e.g. /contact), default to Sunflower
      if (!aboutEl) {
        if (currentTrackIndexRef.current === 1) {
          crossfadeToTrack(0)
        }
        return
      }

      const rect = aboutEl.getBoundingClientRect()
      const winHeight = window.innerHeight || 800

      // When about section is visibly prominent in the viewport:
      // - Top has entered into viewport (rect.top <= winHeight * 0.5)
      // - Bottom has not scrolled past (rect.bottom >= winHeight * 0.25)
      const inAbout = rect.top <= winHeight * 0.5 && rect.bottom >= winHeight * 0.25

      if (inAbout && currentTrackIndexRef.current !== 1) {
        // Entering About Me -> fade out Sunflower, fade in Noble!
        crossfadeToTrack(1)
      } else if (!inAbout && currentTrackIndexRef.current === 1) {
        // Scrolling out of About Me -> fade out Noble, fade in Sunflower from where it faded out!
        crossfadeToTrack(0)
      }
    }

    const onScroll = () => {
      if (scrollRaf) return
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0
        updateSectionMusic()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    window.addEventListener('hashchange', onScroll, { passive: true })

    const initialTimer = setTimeout(updateSectionMusic, 350)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('hashchange', onScroll)
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf)
      clearTimeout(initialTimer)
    }
  }, [crossfadeToTrack])

  // Robust AutoPlay on Launch & Refresh (Respects User Pause permanently)
  useEffect(() => {
    // If the user previously clicked pause during this session, DO NOT AUTO-PLAY!
    const isPausedByUser = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_music_paused') === 'true'
    if (isPausedByUser) {
      userPausedRef.current = true
      isPlayingRef.current = false
      setIsPlaying(false)
      setIsAutoplayBlocked(false)
      return
    }

    let isCancelled = false

    const playAudio = () => {
      if (userPausedRef.current || isCancelled) return
      const activeAudio = currentTrackIndexRef.current === 0 ? sunflowerAudioRef.current : nobleAudioRef.current
      if (!activeAudio) return

      activeAudio.muted = false
      activeAudio.volume = volumeRef.current

      const promise = activeAudio.play()
      if (promise !== undefined) {
        promise
          .then(() => {
            if (!isCancelled && !userPausedRef.current) {
              isPlayingRef.current = true
              setIsPlaying(true)
              setIsAutoplayBlocked(false)
              if (cleanupGestureListenersRef.current) {
                cleanupGestureListenersRef.current()
              }
            } else if (userPausedRef.current) {
              activeAudio.pause()
            }
          })
          .catch((err) => {
            // Browser blocked unmuted autoplay without a user gesture on this page load
            if (!isCancelled && !userPausedRef.current) {
              isPlayingRef.current = false
              setIsPlaying(false)
              setIsAutoplayBlocked(true)
            }
          })
      }
    }

    const onUserGesture = () => {
      if (userPausedRef.current) {
        if (cleanupGestureListenersRef.current) {
          cleanupGestureListenersRef.current()
        }
        return
      }
      playAudio()
    }

    const cleanupListeners = () => {
      const gestureEvents = ['pointerdown', 'click', 'keydown', 'touchstart']
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, onUserGesture, true)
      })
    }
    cleanupGestureListenersRef.current = cleanupListeners

    const attachListeners = () => {
      const gestureEvents = ['pointerdown', 'click', 'keydown', 'touchstart']
      gestureEvents.forEach((evt) => {
        window.addEventListener(evt, onUserGesture, { capture: true, passive: true })
      })
    }

    attachListeners()

    // Try playing initial track
    const initialAudio = sunflowerAudioRef.current
    if (initialAudio) {
      if (initialAudio.readyState >= 2) {
        playAudio()
      } else {
        const onCanPlay = () => {
          if (!userPausedRef.current && !isCancelled) {
            playAudio()
          }
        }
        initialAudio.addEventListener('canplay', onCanPlay, { once: true })
        initialAudio.addEventListener('loadedmetadata', onCanPlay, { once: true })
        playAudio()
      }
    }

    return () => {
      isCancelled = true
      cleanupListeners()
    }
  }, [])

  const setVolume = useCallback((newVol) => {
    setVolumeState(newVol)
    volumeRef.current = newVol
    const activeAudio = currentTrackIndexRef.current === 0 ? sunflowerAudioRef.current : nobleAudioRef.current
    if (activeAudio && !fadeRafRef.current) {
      activeAudio.volume = newVol
    }
  }, [])

  // Explicit User Toggle: Clicking Pause KEEPS it paused permanently. Clicking Play resumes.
  const togglePlay = useCallback(() => {
    const activeAudio = currentTrackIndexRef.current === 0 ? sunflowerAudioRef.current : nobleAudioRef.current
    if (!activeAudio) return

    if (isPlayingRef.current) {
      // 1. User clicked PAUSE: Set flags synchronously so nothing can bypass it
      userPausedRef.current = true
      isPlayingRef.current = false
      setIsPlaying(false)
      setIsAutoplayBlocked(false)

      try {
        sessionStorage.setItem('portfolio_music_paused', 'true')
      } catch (e) {}

      // 2. Immediately remove all gesture listeners so no subsequent clicks auto-play
      if (cleanupGestureListenersRef.current) {
        cleanupGestureListenersRef.current()
      }

      // 3. Immediately cancel any crossfades and pause all audio elements
      if (fadeRafRef.current) {
        cancelAnimationFrame(fadeRafRef.current)
        fadeRafRef.current = null
      }
      if (sunflowerAudioRef.current) sunflowerAudioRef.current.pause()
      if (nobleAudioRef.current) nobleAudioRef.current.pause()
    } else {
      // 1. User clicked PLAY: Unpause explicitly
      userPausedRef.current = false
      isPlayingRef.current = true

      try {
        sessionStorage.removeItem('portfolio_music_paused')
      } catch (e) {}

      if (cleanupGestureListenersRef.current) {
        cleanupGestureListenersRef.current()
      }

      activeAudio.muted = isMutedRef.current
      activeAudio.volume = volumeRef.current
      activeAudio
        .play()
        .then(() => {
          isPlayingRef.current = true
          setIsPlaying(true)
          setIsAutoplayBlocked(false)
        })
        .catch((err) => {
          console.warn('Playback request error:', err)
          isPlayingRef.current = false
          setIsPlaying(false)
        })
    }
  }, [])

  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted
    isMutedRef.current = nextMuted
    setIsMuted(nextMuted)
    if (sunflowerAudioRef.current) sunflowerAudioRef.current.muted = nextMuted
    if (nobleAudioRef.current) nobleAudioRef.current.muted = nextMuted
  }, [isMuted])

  const restartTrack = useCallback(() => {
    const activeAudio = currentTrackIndexRef.current === 0 ? sunflowerAudioRef.current : nobleAudioRef.current
    if (!activeAudio) return

    activeAudio.currentTime = 0
    setCurrentTime(0)

    // If user has paused, rewind to 0:00 but KEEP IT PAUSED!
    if (userPausedRef.current || !isPlayingRef.current) {
      activeAudio.pause()
      return
    }

    activeAudio.volume = volumeRef.current
    activeAudio.muted = isMutedRef.current
    activeAudio
      .play()
      .then(() => {
        isPlayingRef.current = true
        setIsPlaying(true)
        setIsAutoplayBlocked(false)
      })
      .catch(() => {})
  }, [])

  const playNext = useCallback(() => {
    const nextIndex = (currentTrackIndexRef.current + 1) % TRACKS.length
    crossfadeToTrack(nextIndex)
  }, [crossfadeToTrack])

  const playPrevious = useCallback(() => {
    const activeAudio = currentTrackIndexRef.current === 0 ? sunflowerAudioRef.current : nobleAudioRef.current
    if (activeAudio && activeAudio.currentTime > 3) {
      activeAudio.currentTime = 0
      setCurrentTime(0)
      return
    }
    const prevIndex = (currentTrackIndexRef.current - 1 + TRACKS.length) % TRACKS.length
    crossfadeToTrack(prevIndex)
  }, [crossfadeToTrack])

  const selectTrack = useCallback((index) => {
    if (index >= 0 && index < TRACKS.length) {
      crossfadeToTrack(index)
    }
  }, [crossfadeToTrack])

  const handleSunflowerTimeUpdate = () => {
    if (currentTrackIndexRef.current === 0 && sunflowerAudioRef.current) {
      setCurrentTime(sunflowerAudioRef.current.currentTime)
    }
  }

  const handleSunflowerLoadedMetadata = () => {
    if (currentTrackIndexRef.current === 0 && sunflowerAudioRef.current) {
      setDuration(sunflowerAudioRef.current.duration || TRACKS[0].duration)
    }
  }

  const handleNobleTimeUpdate = () => {
    if (currentTrackIndexRef.current === 1 && nobleAudioRef.current) {
      setCurrentTime(nobleAudioRef.current.currentTime)
    }
  }

  const handleNobleLoadedMetadata = () => {
    if (currentTrackIndexRef.current === 1 && nobleAudioRef.current) {
      setDuration(nobleAudioRef.current.duration || TRACKS[1].duration)
    }
  }

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        currentTime,
        duration,
        volume,
        isAutoplayBlocked,
        tracks: TRACKS,
        currentTrackIndex,
        currentTrack,
        setVolume,
        togglePlay,
        toggleMute,
        restartTrack,
        playPrevious,
        playNext,
        selectTrack,
      }}
    >
      {/* Sunflower Audio Element (Track 0) */}
      <audio
        ref={sunflowerAudioRef}
        src={TRACKS[0].src}
        preload="auto"
        playsInline
        loop
        onTimeUpdate={handleSunflowerTimeUpdate}
        onLoadedMetadata={handleSunflowerLoadedMetadata}
      />

      {/* NOBLE Audio Element (Track 1) */}
      <audio
        ref={nobleAudioRef}
        src={TRACKS[1].src}
        preload="auto"
        playsInline
        loop
        onTimeUpdate={handleNobleTimeUpdate}
        onLoadedMetadata={handleNobleLoadedMetadata}
      />

      {/* Floating Gentle Prompt if Browser Blocks Autoplay on Refresh (Hidden if user explicitly paused) */}
      {isAutoplayBlocked && !isPlaying && !userPausedRef.current && (
        <div
          onClick={togglePlay}
          className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/90 text-white backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-105 active:scale-95 transition-all animate-bounce select-none pointer-events-auto"
          title="Click to play music"
          role="button"
          tabIndex={0}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE2020] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DE2020]" />
          </span>
          <span className="text-xs font-semibold tracking-wide font-fredoka">
            Click anywhere to play {currentTrack.title} ♫
          </span>
        </div>
      )}

      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  return (
    context || {
      isPlaying: false,
      isMuted: false,
      currentTime: 0,
      duration: 158,
      volume: 0.85,
      isAutoplayBlocked: false,
      setVolume: () => {},
      togglePlay: () => {},
      toggleMute: () => {},
      restartTrack: () => {},
    }
  )
}

export default MusicContext
