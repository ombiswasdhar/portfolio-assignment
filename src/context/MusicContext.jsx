"use client"

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'

const MusicContext = createContext(null)

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(158)
  const [volume, setVolume] = useState(0.85)

  const audioRef = useRef(null)
  const userPausedRef = useRef(false)
  const isMutedForAutoplayRef = useRef(false)

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current && !isMutedForAutoplayRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Bulletproof Autoplay on launch and on page refresh
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    userPausedRef.current = false
    let isCancelled = false

    const unmuteAndPlay = () => {
      if (!audioRef.current || userPausedRef.current) return

      if (isMutedForAutoplayRef.current) {
        audioRef.current.muted = false
        audioRef.current.volume = volume
        isMutedForAutoplayRef.current = false
        setIsMuted(false)
      }

      const p = audioRef.current.play()
      if (p !== undefined) {
        p.then(() => {
          if (!isCancelled && !userPausedRef.current) {
            setIsPlaying(true)
          }
        }).catch(() => {})
      }
      removeGestureListeners()
    }

    const removeGestureListeners = () => {
      const events = [
        'pointerdown',
        'mousedown',
        'click',
        'keydown',
        'touchstart',
        'touchend',
        'scroll',
        'wheel',
        'mousemove',
      ]
      events.forEach((evt) => {
        window.removeEventListener(evt, unmuteAndPlay)
        document.removeEventListener(evt, unmuteAndPlay)
      })
    }

    const attachGestureListeners = () => {
      const events = [
        'pointerdown',
        'mousedown',
        'click',
        'keydown',
        'touchstart',
        'touchend',
        'scroll',
        'wheel',
        'mousemove',
      ]
      events.forEach((evt) => {
        window.addEventListener(evt, unmuteAndPlay, { once: true, passive: true })
        document.addEventListener(evt, unmuteAndPlay, { once: true, passive: true })
      })
    }

    const attemptAutoplay = () => {
      if (!audioRef.current || userPausedRef.current || isCancelled) return

      // Stage 1: Attempt direct unmuted playback (works if domain has permission or on reload after interaction)
      audioRef.current.muted = false
      audioRef.current.volume = volume
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!isCancelled && !userPausedRef.current) {
              setIsPlaying(true)
              isMutedForAutoplayRef.current = false
              removeGestureListeners()
            }
          })
          .catch((err) => {
            console.log('Direct autoplay restricted by browser policy, using muted fallback until gesture:', err?.message || err)
            if (isCancelled || userPausedRef.current || !audioRef.current) return

            // Stage 2: Start playing immediately in muted state (allowed 100% by all browsers on refresh)
            audioRef.current.muted = true
            isMutedForAutoplayRef.current = true
            const mutedPromise = audioRef.current.play()
            if (mutedPromise !== undefined) {
              mutedPromise
                .then(() => {
                  if (!isCancelled && !userPausedRef.current) {
                    setIsPlaying(true)
                  }
                })
                .catch(() => {})
            }

            // Stage 3: The very instant user makes ANY gesture (even moves mouse cursor), unmute smoothly!
            attachGestureListeners()
          })
      }
    }

    // Run autoplay on mount and when audio resource is ready
    if (audio.readyState >= 2) {
      attemptAutoplay()
    } else {
      audio.addEventListener('canplay', attemptAutoplay, { once: true })
      audio.addEventListener('loadeddata', attemptAutoplay, { once: true })
      // Also try immediately in case already buffered
      attemptAutoplay()
    }

    // Also attach gesture listeners as safety net
    attachGestureListeners()

    return () => {
      isCancelled = true
      removeGestureListeners()
    }
  }, [volume])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      userPausedRef.current = true
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      userPausedRef.current = false
      if (isMutedForAutoplayRef.current) {
        audioRef.current.muted = false
        isMutedForAutoplayRef.current = false
        setIsMuted(false)
      }
      audioRef.current.volume = volume
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error:', err)
          setIsPlaying(false)
        })
    }
  }, [isPlaying, volume])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    const nextMuted = !isMuted
    audioRef.current.muted = nextMuted
    isMutedForAutoplayRef.current = false
    setIsMuted(nextMuted)
  }, [isMuted])

  const restartTrack = useCallback(() => {
    if (!audioRef.current) return
    userPausedRef.current = false
    isMutedForAutoplayRef.current = false
    audioRef.current.muted = false
    audioRef.current.volume = volume
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
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
        setVolume,
        togglePlay,
        toggleMute,
        restartTrack,
      }}
    >
      {/* Global Audio Element for Sunflower Official Instrumental */}
      <audio
        ref={audioRef}
        src="/sunflower.webm"
        autoPlay
        playsInline
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          if (userPausedRef.current) {
            setIsPlaying(false)
          }
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      >
        <source src="/sunflower.webm" type="audio/webm" />
        <source src="/sunflower.m4a" type="audio/mp4" />
      </audio>
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
      setVolume: () => {},
      togglePlay: () => {},
      toggleMute: () => {},
      restartTrack: () => {},
    }
  )
}

export default MusicContext
