"use client"

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useMusic } from '../context/MusicContext'
import sunflowerCover from '/sunflower_cover.jpg'

const SUNFLOWER_COVER_URL =
  'https://a5.mzstatic.com/us/r1000/0/Music125/v4/4b/30/2c/4b302cb6-7a14-5464-4e97-0577e9d0be49/18UMGIM82277.rgb.jpg'

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
    playPrevious,
    playNext,
  } = useMusic()

  const location = useLocation()
  const [scrollY, setScrollY] = useState(0)
  const [isPastHero, setIsPastHero] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  // Track scroll position and detect when user has scrolled past the hero section
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (location.pathname !== '/') {
        setIsPastHero(true)
        return
      }
      const heroEl = document.getElementById('hero') || document.querySelector('section')
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect()
        // Notch activates as soon as the hero card scrolls off-screen
        setIsPastHero(rect.bottom < 140 || window.scrollY > 380)
      } else {
        setIsPastHero(window.scrollY > 380)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [location.pathname])

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const progressPercent = duration ? Math.min(100, (currentTime / duration) * 100) : 0

  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE SCREEN: TOP DYNAMIC NOTCH MUSIC PLAYER (Active past hero section) */}
      {/* Inspired by Apple Dynamic Island & user reference pin: https://pin.it/2rGTJh73E */}
      {/* ========================================================================= */}
      <div
        className={`fixed top-12 left-1/2 -translate-x-1/2 z-50 md:hidden select-none transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isPastHero
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ width: '312px', height: '56px' }}
        role="region"
        aria-label="Mobile Music Player Notch"
      >
        {/* Notch Physical Silhouette SVG with Inverted Fillet Wings & OLED Black Fill */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
          viewBox="0 0 312 56"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Deep OLED Black Fill (Closed Path) */}
          <path
            d="M 0 0 C 8 0 14 6 14 14 L 14 38 C 14 48 22 56 32 56 L 280 56 C 290 56 298 48 298 38 L 298 14 C 298 6 304 0 312 0 Z"
            fill="#000000"
          />
          {/* Perimeter Glass Rim Stroke (Open across top so it connects seamlessly to the nav bar) */}
          <path
            d="M 0 0 C 8 0 14 6 14 14 L 14 38 C 14 48 22 56 32 56 L 280 56 C 290 56 298 48 298 38 L 298 14 C 298 6 304 0 312 0"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Notch Inner Content Bar */}
        <div className="relative z-10 w-full h-full pl-[22px] pr-[18px] flex items-center justify-between">
          
          {/* 1. Small Rotating CD Disc */}
          <div
            onClick={togglePlay}
            className="relative w-9 h-9 shrink-0 cursor-pointer group active:scale-90 transition-transform"
            title={isPlaying ? 'Pause Sunflower' : 'Play Sunflower'}
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? 'Pause Sunflower' : 'Play Sunflower'}
          >
            {/* Spinning CD Disc */}
            <div
              className="w-full h-full rounded-full overflow-hidden relative border border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.8)] will-change-transform"
              style={{
                animation: 'spin 6s linear infinite',
                animationPlayState: isPlaying ? 'running' : 'paused',
              }}
            >
              {/* Cover Art Surface */}
              <img
                src={sunflowerCover}
                onError={(e) => {
                  e.currentTarget.src = SUNFLOWER_COVER_URL
                }}
                alt="Sunflower CD Disc"
                className="w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Holographic Iridescent Sheen */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-35"
                style={{
                  background:
                    'conic-gradient(from 45deg, transparent 0deg, rgba(255,100,100,0.3) 45deg, rgba(255,255,120,0.35) 90deg, rgba(120,255,180,0.3) 135deg, rgba(120,220,255,0.35) 180deg, transparent 225deg, rgba(255,120,255,0.3) 270deg, transparent 360deg)',
                }}
              />

              {/* Concentric Vinyl Grooves */}
              <div className="absolute inset-0 rounded-full border border-black/35 pointer-events-none" />
              <div className="absolute inset-1 rounded-full border border-white/15 pointer-events-none" />

              {/* Polycarbonate Center Spindle Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 border border-neutral-400/80 shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-black border border-neutral-500/50" />
              </div>
            </div>

            {/* Glowing Active Note Indicator Badge */}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 z-20 flex h-3.5 w-3.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE2020] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#DE2020] text-[8px] font-bold text-white items-center justify-center leading-none">
                  ♫
                </span>
              </span>
            )}
          </div>

          {/* 2. Track Info & Dynamic Equalizer */}
          <div className="flex flex-col justify-center min-w-0 flex-1 px-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[12.5px] font-bold text-white tracking-tight leading-none truncate">
                Sunflower
              </span>
              {/* Mini Audio Equalizer Animation */}
              <div className="flex items-end gap-0.5 h-2.5 w-3 shrink-0 opacity-80" aria-hidden="true">
                <span
                  className={`w-0.5 bg-[#DE2020] rounded-full ${isPlaying ? 'animate-pulse h-full' : 'h-1'}`}
                  style={{ animationDuration: '0.6s' }}
                />
                <span
                  className={`w-0.5 bg-[#DE2020] rounded-full ${isPlaying ? 'animate-pulse h-2' : 'h-1.5'}`}
                  style={{ animationDuration: '0.4s', animationDelay: '0.15s' }}
                />
                <span
                  className={`w-0.5 bg-[#DE2020] rounded-full ${isPlaying ? 'animate-pulse h-full' : 'h-0.5'}`}
                  style={{ animationDuration: '0.7s', animationDelay: '0.3s' }}
                />
              </div>
            </div>
            <span className="text-[9.5px] text-neutral-400 font-mono tracking-tight leading-none truncate mt-0.5">
              Spider-Verse • {formatTime(currentTime)}
            </span>
          </div>

          {/* 3. Controls: Previous, Play/Pause, Next */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Previous Button */}
            <button
              type="button"
              onClick={playPrevious}
              className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-white active:scale-85 transition-all cursor-pointer hover:bg-white/10"
              title="Previous track / Restart"
              aria-label="Previous track"
            >
              <SkipBack className="w-3.5 h-3.5 fill-current" />
            </button>

            {/* Play / Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white/12 hover:bg-white/22 active:scale-90 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-white" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              )}
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={playNext}
              className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-white active:scale-85 transition-all cursor-pointer hover:bg-white/10"
              title="Next track"
              aria-label="Next track"
            >
              <SkipForward className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* 4. Slim Glowing Audio Progress Bar along the bottom of the Notch */}
        <div className="absolute bottom-[2px] left-[32px] right-[32px] h-[1.5px] bg-white/15 rounded-full overflow-hidden pointer-events-none">
          <div
            className="h-full bg-[#DE2020] transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP SCREEN: FLOATING AUXILIARY PILL (Bottom-left on large viewports) */}
      {/* ========================================================================= */}
      {isPlaying && isPastHero && (
        <div
          className="hidden md:flex fixed bottom-6 left-6 z-50 select-none font-sans items-center gap-3 px-4 py-2.5 rounded-full bg-white/95 dark:bg-[#111116]/95 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.22)] animate-fadeIn transition-all duration-300"
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
      )}
    </>
  )
}
