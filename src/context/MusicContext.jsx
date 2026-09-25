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

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Autoplay on launch (immediate + fallback on first interaction if blocked by browser policy)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let cleanedUp = false

    const attemptPlay = () => {
      if (cleanedUp || userPausedRef.current || !audioRef.current) return

      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!cleanedUp && !userPausedRef.current) {
              setIsPlaying(true)
              removeListeners()
            }
          })
          .catch((err) => {
            // Browser blocked unmuted autoplay without prior interaction.
            // Listen for the first user interaction to start playing.
            console.log('Autoplay pending user gesture:', err.message || err)
          })
      }
    }

    const handleFirstGesture = () => {
      if (userPausedRef.current) return
      attemptPlay()
    }

    const removeListeners = () => {
      window.removeEventListener('click', handleFirstGesture)
      window.removeEventListener('pointerdown', handleFirstGesture)
      window.removeEventListener('keydown', handleFirstGesture)
      window.removeEventListener('touchstart', handleFirstGesture)
      window.removeEventListener('scroll', handleFirstGesture)
    }

    // Try playing immediately
    attemptPlay()

    // Listen for any gesture as a fallback
    window.addEventListener('click', handleFirstGesture, { once: true, passive: true })
    window.addEventListener('pointerdown', handleFirstGesture, { once: true, passive: true })
    window.addEventListener('keydown', handleFirstGesture, { once: true, passive: true })
    window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true })
    window.addEventListener('scroll', handleFirstGesture, { once: true, passive: true })

    return () => {
      cleanedUp = true
      removeListeners()
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      userPausedRef.current = true
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      userPausedRef.current = false
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio playback failed or prevented:', err)
          setIsPlaying(false)
        })
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    const nextMuted = !isMuted
    audioRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }, [isMuted])

  const restartTrack = useCallback(() => {
    if (!audioRef.current) return
    userPausedRef.current = false
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {})
  }, [])

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
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="auto"
        loop
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
