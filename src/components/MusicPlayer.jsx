"use client"

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useMusic } from '../context/MusicContext'

export default function MusicPlayer() {
  const {
    isPlaying,
    isMuted,
    currentTime,
    duration,
    volume,
    setVolume,
    togglePlay,
    toggleMute,
    restartTrack,
  } = useMusic()

  const location = useLocation()
  const [scrollY, setScrollY] = useState(0)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  // Only show auxiliary floating control when audio is playing and scrolled away from the hero section
  const isPastHero = scrollY > 400 || location.pathname !== '/'
  if (!isPlaying || !isPastHero) {
    return null
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 select-none font-sans flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/95 dark:bg-[#111116]/95 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.22)] animate-fadeIn transition-all duration-300"
      onMouseLeave={() => setShowVolumeSlider(false)}
      role="region"
      aria-label="Sunflower Instrumental Player Controls"
    >
      {/* Equalizer Waveform Bars */}
      <div className="flex items-end gap-0.5 h-4 w-4 shrink-0" aria-hidden="true">
        <span
          className="w-0.5 bg-[#DE2020] rounded-full animate-pulse h-full"
          style={{ animationDuration: '0.6s' }}
        />
        <span
          className="w-0.5 bg-[#DE2020] rounded-full animate-pulse h-3.5"
          style={{ animationDuration: '0.4s', animationDelay: '0.15s' }}
        />
        <span
          className="w-0.5 bg-[#DE2020] rounded-full animate-pulse h-full"
          style={{ animationDuration: '0.7s', animationDelay: '0.3s' }}
        />
        <span
          className="w-0.5 bg-[#DE2020] rounded-full animate-pulse h-3"
          style={{ animationDuration: '0.5s', animationDelay: '0.45s' }}
        />
      </div>

      {/* Song Details */}
      <div className="flex flex-col leading-none min-w-[110px] max-w-[160px]">
        <span className="font-bold text-[12px] text-neutral-900 dark:text-neutral-100 truncate tracking-tight">
          Sunflower
        </span>
        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium truncate mt-0.5">
          Instrumental • {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 border-l border-neutral-200 dark:border-neutral-800 pl-2">
        {/* Play/Pause */}
        <button
          type="button"
          onClick={togglePlay}
          className="p-1 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          title={isPlaying ? 'Pause' : 'Play'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Restart */}
        <button
          type="button"
          onClick={restartTrack}
          className="p-1 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          title="Restart track"
          aria-label="Restart track"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Volume / Mute Toggle */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
        >
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5 text-[#DE2020]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Volume Slider Popout */}
          {showVolumeSlider && (
            <div className="absolute right-0 bottom-7 bg-white dark:bg-[#1a1a22] px-2.5 py-1.5 rounded-lg shadow-xl border border-black/10 dark:border-white/10 flex items-center z-40">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value)
                  setVolume(val)
                }}
                className="w-16 h-1 accent-[#DE2020] cursor-pointer"
                aria-label="Volume slider"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
