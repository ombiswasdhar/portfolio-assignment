"use client"

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'

const MusicContext = createContext(null)

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(158)
  const [volume, setVolume] = useState(0.85)
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false)

  const audioRef = useRef(null)
  const userPausedRef = useRef(false)
  const isPlayingRef = useRef(false)

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

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration || 158)
  }

  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => setIsPlaying(false))
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
        setVolume,
        togglePlay,
        toggleMute,
        restartTrack,
      }}
    >
      {/* Global Audio Element for Sunflower Official Instrumental */}
      <audio
        ref={audioRef}
        src="/sunflower.m4a"
        preload="auto"
        loop
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
      >
        <source src="/sunflower.m4a" type="audio/mp4" />
        <source src="/sunflower.webm" type="audio/webm" />
      </audio>

      {/* Floating Gentle Prompt if Browser Blocks Autoplay on Refresh */}
      {isAutoplayBlocked && !isPlaying && (
        <div
          onClick={togglePlay}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/90 text-white backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-105 active:scale-95 transition-all animate-bounce select-none pointer-events-auto"
          title="Click to play music"
          role="button"
          tabIndex={0}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE2020] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DE2020]" />
          </span>
          <span className="text-xs font-semibold tracking-wide">
            Click anywhere to play Sunflower ♫
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
