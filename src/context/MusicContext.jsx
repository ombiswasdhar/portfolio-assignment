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
  const [volume, setVolume] = useState(0.85)
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false)

  const audioRef = useRef(null)
  const userPausedRef = useRef(false)
  const isPlayingRef = useRef(false)
  const isFirstRenderRef = useRef(true)

  // Keep isPlayingRef in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Track switching effect (seamless transition to new track)
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return
    }

    if (!audioRef.current) return
    const track = TRACKS[currentTrackIndex]
    userPausedRef.current = false
    audioRef.current.src = track.src
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    audioRef.current.volume = volume
    audioRef.current.muted = false

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true)
        setIsAutoplayBlocked(false)
      })
      .catch((err) => {
        console.warn('Playback error on track change:', err)
        setIsPlaying(false)
      })
  }, [currentTrackIndex, volume])

  // Robust AutoPlay on Launch & Refresh
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    userPausedRef.current = false
    let isCancelled = false

    const playAudio = () => {
      if (!audioRef.current || userPausedRef.current || isCancelled) return

      audioRef.current.muted = false
      audioRef.current.volume = volume

      const promise = audioRef.current.play()
      if (promise !== undefined) {
        promise
          .then(() => {
            if (!isCancelled && !userPausedRef.current) {
              setIsPlaying(true)
              setIsAutoplayBlocked(false)
              cleanupListeners()
            }
          })
          .catch((err) => {
            // Browser blocked unmuted autoplay without a user gesture on this page load
            console.log('Autoplay deferred by browser policy, awaiting first user interaction:', err?.message || err)
            if (!isCancelled && !userPausedRef.current) {
              setIsPlaying(false)
              setIsAutoplayBlocked(true)
            }
            // KEEP LISTENERS ACTIVE until audio actually starts playing!
          })
      }
    }

    const onUserGesture = () => {
      if (userPausedRef.current) return
      playAudio()
    }

    const cleanupListeners = () => {
      const gestureEvents = ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart']
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, onUserGesture, true)
        document.removeEventListener(evt, onUserGesture, true)
      })
    }

    const attachListeners = () => {
      const gestureEvents = ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart']
      gestureEvents.forEach((evt) => {
        window.addEventListener(evt, onUserGesture, { capture: true, passive: true })
        document.addEventListener(evt, onUserGesture, { capture: true, passive: true })
      })
    }

    // Attach interaction listeners immediately so the very first click anywhere on refresh triggers sound
    attachListeners()

    // Try playing immediately
    if (audio.readyState >= 2) {
      playAudio()
    } else {
      audio.addEventListener('canplay', playAudio, { once: true })
      audio.addEventListener('loadedmetadata', playAudio, { once: true })
      playAudio()
    }

    return () => {
      isCancelled = true
      cleanupListeners()
    }
  }, [volume])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      userPausedRef.current = true
      audioRef.current.pause()
      setIsPlaying(false)
      setIsAutoplayBlocked(false)
    } else {
      userPausedRef.current = false
      audioRef.current.muted = false
      audioRef.current.volume = volume
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setIsAutoplayBlocked(false)
        })
        .catch((err) => {
          console.warn('Playback request error:', err)
          setIsPlaying(false)
        })
    }
  }, [isPlaying, volume])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    const nextMuted = !isMuted
    audioRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }, [isMuted])

  const restartTrack = useCallback(() => {
    if (!audioRef.current) return
    userPausedRef.current = false
    audioRef.current.muted = false
    audioRef.current.volume = volume
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true)
        setIsAutoplayBlocked(false)
      })
      .catch(() => {})
  }, [volume])

  const playNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
  }, [])

  const playPrevious = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      return
    }
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
  }, [])

  const selectTrack = useCallback((index) => {
    if (index >= 0 && index < TRACKS.length) {
      setCurrentTrackIndex(index)
    }
  }, [])

  // Auto-switch track between Sunflower and NOBLE based on active section:
  // "play noble the moment the screen comes to about me page then when goes to the next page go back to sunflower"
  const activeSectionRef = useRef('home')

  useEffect(() => {
    let scrollRaf = 0

    const updateSectionMusic = () => {
      if (typeof window === 'undefined') return

      const aboutEl = document.getElementById('about')
      const skillsEl = document.getElementById('skills')
      const workEl = document.getElementById('work') || document.getElementById('featured-works')
      const cvEl = document.getElementById('cv')

      // If About section doesn't exist (e.g. on /contact page), default to Sunflower
      if (!aboutEl) {
        if (activeSectionRef.current === 'about') {
          activeSectionRef.current = 'other'
          selectTrack(0) // Back to Sunflower
        }
        return
      }

      const threshold = window.innerHeight * 0.45
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80

      let currentSection = 'home'
      if (isAtBottom || (cvEl && cvEl.getBoundingClientRect().top <= threshold)) {
        currentSection = 'cv'
      } else if (workEl && workEl.getBoundingClientRect().top <= threshold) {
        currentSection = 'work'
      } else if (skillsEl && skillsEl.getBoundingClientRect().top <= threshold) {
        currentSection = 'skills'
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= threshold) {
        currentSection = 'about'
      }

      // Check transition into or out of 'about' section
      if (currentSection === 'about' && activeSectionRef.current !== 'about') {
        activeSectionRef.current = 'about'
        selectTrack(1) // Play NOBLE!
      } else if (currentSection !== 'about' && activeSectionRef.current === 'about') {
        activeSectionRef.current = currentSection
        selectTrack(0) // Go back to Sunflower!
      } else if (currentSection !== 'about') {
        activeSectionRef.current = currentSection
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

    // Check after initial mount / navigation settle
    const initialTimer = setTimeout(updateSectionMusic, 350)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('hashchange', onScroll)
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf)
      clearTimeout(initialTimer)
    }
  }, [selectTrack])

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration || currentTrack.duration)
  }

  const handleEnded = () => {
    // Auto advance to next song in playlist
    playNext()
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
      {/* Global Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        playsInline
        onPlay={() => {
          setIsPlaying(true)
          setIsAutoplayBlocked(false)
        }}
        onPlaying={() => {
          setIsPlaying(true)
          setIsAutoplayBlocked(false)
        }}
        onPause={() => {
          if (userPausedRef.current) {
            setIsPlaying(false)
          }
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Floating Gentle Prompt if Browser Blocks Autoplay on Refresh */}
      {isAutoplayBlocked && !isPlaying && (
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
          <span className="text-xs font-semibold tracking-wide">
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
