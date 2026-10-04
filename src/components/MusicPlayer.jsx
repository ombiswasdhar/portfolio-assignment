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
  const isLightBackground =
    location.pathname === '/contact' ||
    location.pathname === '/get-in-touch' ||
    location.pathname === '/connect'
  const [scrollY, setScrollY] = useState(0)
  const [isPastHero, setIsPastHero] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [showAppleMusic, setShowAppleMusic] = useState(true)

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
        className={`fixed left-1/2 -translate-x-1/2 z-50 md:hidden select-none transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isPastHero
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ top: isLightBackground ? '84px' : '48px', width: '312px', height: '56px' }}
        role="region"
        aria-label="Mobile Music Player Notch"
      >
        {/* Notch Physical Silhouette SVG with Inverted Fillet Wings & OLED Black Fill */}
        <svg
          className={`absolute inset-0 w-full h-full pointer-events-none ${isLightBackground ? 'drop-shadow-[0_8px_20px_rgba(0,0,0,0.16)]' : 'drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]'}`}
          viewBox="0 0 312 56"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Deep OLED Black Fill (Closed Path) */}
          <path
            d="M 0 0 C 8 0 14 6 14 14 L 14 38 C 14 48 22 56 32 56 L 280 56 C 290 56 298 48 298 38 L 298 14 C 298 6 304 0 312 0 Z"
            fill={isLightBackground ? '#FFFFFF' : '#000000'}
          />
          {/* Perimeter Glass Rim Stroke (Open across top so it connects seamlessly to the nav bar) */}
          <path
            d="M 0 0 C 8 0 14 6 14 14 L 14 38 C 14 48 22 56 32 56 L 280 56 C 290 56 298 48 298 38 L 298 14 C 298 6 304 0 312 0"
            stroke={isLightBackground ? 'rgba(0, 0, 0, 0.16)' : 'rgba(255, 255, 255, 0.18)'}
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
              className={`w-full h-full rounded-full overflow-hidden relative border ${isLightBackground ? 'border-black/20 shadow-[0_2px_8px_rgba(0,0,0,0.2)]' : 'border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.8)]'} will-change-transform`}
              style={{
                animation: 'music-disc-spin 6s linear infinite',
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
          <div className="flex flex-col justify-center min-w-0 flex-1 px-3 font-fredoka">
            <div className="flex items-center gap-1.5">
              <span className={`text-[12.5px] font-bold tracking-tight leading-none truncate ${isLightBackground ? 'text-neutral-900' : 'text-white'}`}>
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
              <span className={`text-[9.5px] font-fredoka tracking-tight leading-none truncate mt-0.5 tabular-nums ${isLightBackground ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Spider-Verse • {formatTime(currentTime)}
            </span>
          </div>

          {/* 3. Controls: Previous, Play/Pause, Next */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Previous Button */}
            <button
              type="button"
              onClick={playPrevious}
              className={`w-7 h-7 rounded-full flex items-center justify-center active:scale-85 transition-all cursor-pointer ${isLightBackground ? 'text-neutral-500 hover:text-black hover:bg-black/5' : 'text-neutral-400 hover:text-white hover:bg-white/10'}`}
              title="Previous track / Restart"
              aria-label="Previous track"
            >
              <SkipBack className="w-3.5 h-3.5 fill-current" />
            </button>

            {/* Play / Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className={`w-8 h-8 rounded-full active:scale-90 flex items-center justify-center transition-all cursor-pointer ${isLightBackground ? 'bg-black/[0.06] hover:bg-black/[0.12] border border-black/15 text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.12)]' : 'bg-white/12 hover:bg-white/22 border border-white/20 text-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]'}`}
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
              className={`w-7 h-7 rounded-full flex items-center justify-center active:scale-85 transition-all cursor-pointer ${isLightBackground ? 'text-neutral-500 hover:text-black hover:bg-black/5' : 'text-neutral-400 hover:text-white hover:bg-white/10'}`}
              title="Next track"
              aria-label="Next track"
            >
              <SkipForward className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* 4. Slim Glowing Audio Progress Bar along the bottom of the Notch */}
        <div className={`absolute bottom-[2px] left-[32px] right-[32px] h-[1.5px] rounded-full overflow-hidden pointer-events-none ${isLightBackground ? 'bg-black/15' : 'bg-white/15'}`}>
          <div
            className="h-full bg-[#DE2020] transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP SCREEN: VERTICAL NOTCH / DOCK (Fixed Left Edge after scrolling)  */}
      {/* "Like the mobile version but on the left side vertically + Apple Music"   */}
      {/* ========================================================================= */}
      <div
        className={`hidden md:flex fixed left-3 lg:left-5 top-1/2 -translate-y-1/2 z-50 select-none items-center transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isPastHero
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : '-translate-x-28 opacity-0 pointer-events-none'
        }`}
        role="region"
        aria-label="Desktop Vertical Music Player"
      >
        {/* 1. Vertical Capsule Dock */}
        <div
          className={`relative z-20 flex flex-col items-center py-3.5 px-2 rounded-[28px] transition-colors duration-300 w-[64px] ${
            isLightBackground
              ? 'bg-white/95 text-neutral-900 border border-black/15 shadow-[0_16px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl'
              : 'bg-[#000000]/95 text-white border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl'
          }`}
        >
          {/* Vertical Audio Progress Bar along left edge */}
          <div
            className={`absolute left-[3px] top-6 bottom-6 w-[2px] rounded-full overflow-hidden pointer-events-none ${
              isLightBackground ? 'bg-black/15' : 'bg-white/15'
            }`}
          >
            <div
              className="w-full bg-[#DE2020] transition-all duration-200"
              style={{ height: `${progressPercent}%` }}
            />
          </div>

          {/* (1) Spinning Sunflower CD Disc */}
          <div
            onClick={togglePlay}
            className="relative w-10 h-10 shrink-0 cursor-pointer group active:scale-90 transition-transform"
            title={isPlaying ? 'Pause Sunflower' : 'Play Sunflower'}
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? 'Pause Sunflower' : 'Play Sunflower'}
          >
            <div
              className={`w-full h-full rounded-full overflow-hidden relative border ${
                isLightBackground
                  ? 'border-black/20 shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
                  : 'border-white/30 shadow-[0_2px_10px_rgba(0,0,0,0.8)]'
              } will-change-transform`}
              style={{
                animation: 'music-disc-spin 6s linear infinite',
                animationPlayState: isPlaying ? 'running' : 'paused',
              }}
            >
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

          {/* (2) Track Details & Animated Equalizer */}
          <div className="flex flex-col items-center mt-2 font-fredoka text-center w-full px-0.5">
            <div className="flex items-center justify-center gap-0.5 h-3 w-5 my-0.5" aria-hidden="true">
              <span
                className={`w-0.5 bg-[#DE2020] rounded-full ${isPlaying ? 'animate-pulse h-full' : 'h-1'}`}
                style={{ animationDuration: '0.6s' }}
              />
              <span
                className={`w-0.5 bg-[#DE2020] rounded-full ${isPlaying ? 'animate-pulse h-2.5' : 'h-1.5'}`}
                style={{ animationDuration: '0.4s', animationDelay: '0.15s' }}
              />
              <span
                className={`w-0.5 bg-[#DE2020] rounded-full ${isPlaying ? 'animate-pulse h-full' : 'h-0.5'}`}
                style={{ animationDuration: '0.7s', animationDelay: '0.3s' }}
              />
              <span
                className={`w-0.5 bg-[#DE2020] rounded-full ${isPlaying ? 'animate-pulse h-2' : 'h-1'}`}
                style={{ animationDuration: '0.5s', animationDelay: '0.45s' }}
              />
            </div>
            <span
              className={`text-[10px] font-bold tracking-tight leading-tight truncate w-full ${
                isLightBackground ? 'text-neutral-900' : 'text-white'
              }`}
            >
              Sunflower
            </span>
            <span
              className={`text-[8.5px] font-fredoka tracking-tight leading-none truncate mt-0.5 tabular-nums ${
                isLightBackground ? 'text-neutral-500' : 'text-neutral-400'
              }`}
            >
              {formatTime(currentTime)}
            </span>
          </div>

          {/* (3) Playback Controls Stack */}
          <div className="flex flex-col items-center gap-1.5 my-1.5">
            <button
              type="button"
              onClick={playPrevious}
              className={`w-7 h-7 rounded-full flex items-center justify-center active:scale-85 transition-all cursor-pointer ${
                isLightBackground
                  ? 'text-neutral-500 hover:text-black hover:bg-black/5'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
              title="Previous track / Restart"
              aria-label="Previous track"
            >
              <SkipBack className="w-3.5 h-3.5 fill-current" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className={`w-8 h-8 rounded-full active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isLightBackground
                  ? 'bg-black/[0.08] hover:bg-black/[0.14] border border-black/15 text-neutral-900'
                  : 'bg-white/15 hover:bg-white/25 border border-white/20 text-white'
              }`}
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-white" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={playNext}
              className={`w-7 h-7 rounded-full flex items-center justify-center active:scale-85 transition-all cursor-pointer ${
                isLightBackground
                  ? 'text-neutral-500 hover:text-black hover:bg-black/5'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
              title="Next track"
              aria-label="Next track"
            >
              <SkipForward className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Divider */}
          <div className={`w-7 h-px my-1 ${isLightBackground ? 'bg-black/10' : 'bg-white/10'}`} />

          {/* (4) Volume Button with Popout */}
          <div
            className="relative flex items-center justify-center my-0.5"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              type="button"
              onClick={toggleMute}
              className={`w-7 h-7 rounded-full flex items-center justify-center active:scale-85 transition-all cursor-pointer ${
                isLightBackground
                  ? 'text-neutral-500 hover:text-black hover:bg-black/5'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-[#DE2020]" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 fill-current" />
              )}
            </button>

            {/* Horizontal Popout Volume Slider to the right */}
            {showVolumeSlider && (
              <div
                className={`absolute left-8 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg shadow-xl border flex items-center z-40 ${
                  isLightBackground ? 'bg-white border-black/10' : 'bg-[#181820] border-white/15'
                }`}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 h-1 accent-[#DE2020] cursor-pointer"
                  aria-label="Volume slider"
                />
              </div>
            )}
          </div>

          {/* (5) Apple Music Embed Toggle Button */}
          <button
            type="button"
            onClick={() => setShowAppleMusic((prev) => !prev)}
            className={`mt-1 flex flex-col items-center justify-center w-9 h-9 rounded-full transition-all duration-200 cursor-pointer group/am ${
              showAppleMusic
                ? 'bg-gradient-to-tr from-[#FA243C] to-[#DE2020] text-white shadow-[0_0_14px_rgba(250,36,60,0.55)] scale-105'
                : isLightBackground
                ? 'bg-neutral-100 hover:bg-[#FA243C] text-neutral-800 hover:text-white border border-black/10'
                : 'bg-white/10 hover:bg-[#FA243C] text-neutral-200 hover:text-white border border-white/15'
            }`}
            title={showAppleMusic ? 'Collapse Apple Music embed' : 'Open Apple Music embed'}
            aria-label="Toggle Apple Music embed"
          >
            {/* Apple Music Logo Icon */}
            <svg viewBox="0 0 170 170" className="w-3.5 h-3.5 fill-current">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.68-7.74-11.93-14.1-4.88-7.29-8.91-15.6-12.08-24.93-3.17-9.33-4.76-18.42-4.76-27.27 0-11.51 2.92-21.36 8.76-29.56 5.84-8.2 13.43-12.44 22.77-12.72 4.48 0 9.4 1.13 14.75 3.39 5.35 2.26 9.07 3.44 11.16 3.55 1.85-.11 5.67-1.35 11.45-3.72 5.78-2.37 10.63-3.44 14.56-3.21 10.89.65 19.68 4.78 26.36 12.39-9.59 5.76-14.28 13.8-14.07 24.11.22 8.04 3.29 14.78 9.21 20.21 5.92 5.43 12.87 8.52 20.85 9.28-2.18 6.52-4.9 12.92-8.15 19.2zm-28.53-107.82c0 5.43-1.99 10.59-5.97 15.48-3.98 4.89-8.99 8.04-15.03 9.45-.65-4.78.43-9.77 3.26-14.97 2.83-5.2 6.84-9.14 12.03-11.82 3.59-1.85 7.15-2.78 10.69-2.78 1.09 1.52 1.63 3.06 1.63 4.64z" />
            </svg>
            <span className="text-[7px] font-fredoka font-semibold tracking-tighter leading-none mt-0.5">
              Music
            </span>
          </button>
        </div>

        {/* 2. Apple Music Embedded Card (Expands to the right of the vertical capsule) */}
        {showAppleMusic && (
          <div
            className={`ml-2.5 w-[295px] rounded-2xl p-2.5 border transition-all duration-300 ease-out origin-left animate-fadeIn ${
              isLightBackground
                ? 'bg-white/95 border-black/15 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl text-neutral-900'
                : 'bg-[#0E0E14]/95 border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-white'
            }`}
          >
            {/* Card Header: Apple Music branding + Link to Apple Music + Close button */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-black/10 dark:border-white/10 font-fredoka">
              <div className="flex items-center gap-1.5">
                <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#FA243C] text-white">
                  <svg viewBox="0 0 170 170" className="w-2.5 h-2.5 fill-current">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.68-7.74-11.93-14.1-4.88-7.29-8.91-15.6-12.08-24.93-3.17-9.33-4.76-18.42-4.76-27.27 0-11.51 2.92-21.36 8.76-29.56 5.84-8.2 13.43-12.44 22.77-12.72 4.48 0 9.4 1.13 14.75 3.39 5.35 2.26 9.07 3.44 11.16 3.55 1.85-.11 5.67-1.35 11.45-3.72 5.78-2.37 10.63-3.44 14.56-3.21 10.89.65 19.68 4.78 26.36 12.39-9.59 5.76-14.28 13.8-14.07 24.11.22 8.04 3.29 14.78 9.21 20.21 5.92 5.43 12.87 8.52 20.85 9.28-2.18 6.52-4.9 12.92-8.15 19.2zm-28.53-107.82c0 5.43-1.99 10.59-5.97 15.48-3.98 4.89-8.99 8.04-15.03 9.45-.65-4.78.43-9.77 3.26-14.97 2.83-5.2 6.84-9.14 12.03-11.82 3.59-1.85 7.15-2.78 10.69-2.78 1.09 1.52 1.63 3.06 1.63 4.64z" />
                  </svg>
                </span>
                <span className="text-[11px] font-bold tracking-tight">Apple Music</span>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href="https://music.apple.com/us/album/sunflower-spider-man-into-the-spider-verse/1438399551?i=1438399556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9.5px] text-[#FA243C] hover:underline font-semibold flex items-center gap-0.5 px-1.5 py-0.5 rounded hover:bg-[#FA243C]/10 transition-colors"
                  title="Open in Apple Music App"
                >
                  Open App ↗
                </a>
                <button
                  type="button"
                  onClick={() => setShowAppleMusic(false)}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs cursor-pointer"
                  title="Close Apple Music embed"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Official Apple Music Embed Iframe */}
            <div className="w-full rounded-xl overflow-hidden bg-black/40">
              <iframe
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                frameBorder="0"
                height="175"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  border: 'none',
                  display: 'block',
                }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src="https://embed.music.apple.com/us/album/sunflower-spider-man-into-the-spider-verse/1438399551?i=1438399556"
                title="Sunflower by Post Malone & Swae Lee on Apple Music"
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
