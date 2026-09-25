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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
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
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    if (!isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [isPlaying])

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
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
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
