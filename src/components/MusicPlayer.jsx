"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react'
import sunflowerCover from '/sunflower_cover.jpg'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.85)
  const [isHovered, setIsHovered] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const audioRef = useRef(null)

  // Initialize and sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.warn('Audio play prevented or interrupted:', err)
          setIsPlaying(false)
        })
    }
  }, [isPlaying])

  // Time update listener
  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setCurrentTime(audioRef.current.currentTime)
  }

  // Loaded metadata for duration
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration || 158)
  }

  // Loop back seamlessly on ended
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => setIsPlaying(false))
    }
  }

  // Restart track
  const handleRestart = (e) => {
    e.stopPropagation()
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    if (!isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  // Toggle mute
  const toggleMute = (e) => {
    e.stopPropagation()
    if (!audioRef.current) return
    const nextMuted = !isMuted
    audioRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  // Format time (0:14)
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  // SVG Circular Progress Calculations
  // CD disc diameter: 154px (radius: 77px), outer ring radius: 81px
  const ringRadius = 81
  const circumference = 2 * Math.PI * ringRadius
  const progressRatio = duration > 0 ? currentTime / duration : 0
  const strokeDashoffset = circumference - progressRatio * circumference

  return (
    <>
      {/* HTML5 Audio playing strictly the Official Instrumental from YouTube (https://youtu.be/3ApM0HfNtV4) */}
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
        <source src="/sunflower.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating CD Music Widget Container (Memory Lane Style) */}
      <div
        className="fixed bottom-6 right-6 z-50 select-none font-sans flex flex-col items-end gap-3 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setShowVolumeSlider(false)
        }}
        aria-label="Sunflower Official Instrumental Music Player"
      >
        {/* ================= FLOATING GLASS CONTROL PILL (SLIDES OUT ON HOVER) ================= */}
        <div
          className={`transition-all duration-300 transform origin-bottom-right ${
            isHovered || isPlaying
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 dark:bg-[#111116]/95 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
            {/* Equalizer Waveform Bars (Bouncing when playing) */}
            <div className="flex items-end gap-0.5 h-4 w-4 shrink-0" aria-hidden="true">
              <span
                className={`w-0.5 bg-[#DE2020] rounded-full transition-all ${
                  isPlaying ? 'h-full animate-pulse' : 'h-1.5'
                }`}
                style={{ animationDuration: '0.6s' }}
              />
              <span
                className={`w-0.5 bg-[#DE2020] rounded-full transition-all ${
                  isPlaying ? 'h-3.5 animate-pulse' : 'h-2.5'
                }`}
                style={{ animationDuration: '0.4s', animationDelay: '0.15s' }}
              />
              <span
                className={`w-0.5 bg-[#DE2020] rounded-full transition-all ${
                  isPlaying ? 'h-full animate-pulse' : 'h-1'
                }`}
                style={{ animationDuration: '0.7s', animationDelay: '0.3s' }}
              />
              <span
                className={`w-0.5 bg-[#DE2020] rounded-full transition-all ${
                  isPlaying ? 'h-3 animate-pulse' : 'h-2'
                }`}
                style={{ animationDuration: '0.5s', animationDelay: '0.45s' }}
              />
            </div>

            {/* Song Details */}
            <div className="flex flex-col leading-none min-w-[120px] max-w-[170px]">
              <span className="font-bold text-[13px] text-neutral-900 dark:text-neutral-100 truncate tracking-tight">
                Sunflower
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium truncate mt-0.5">
                Official Instrumental • {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Controls: Restart & Volume */}
            <div className="flex items-center gap-1.5 border-l border-neutral-200 dark:border-neutral-800 pl-2">
              {/* Restart button */}
              <button
                type="button"
                onClick={handleRestart}
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
                onMouseLeave={() => setShowVolumeSlider(false)}
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
                  <div className="absolute right-0 bottom-7 bg-white dark:bg-[#1a1a22] px-2.5 py-1.5 rounded-lg shadow-xl border border-black/10 dark:border-white/10 flex items-center z-40 animate-fadeIn">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        setVolume(val)
                        if (isMuted && val > 0) setIsMuted(false)
                      }}
                      className="w-16 h-1 accent-[#DE2020] cursor-pointer"
                      aria-label="Volume slider"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= REALISTIC CD DISC (MEMORY LANE PIN STYLE) ================= */}
        <div
          onClick={togglePlay}
          className="relative w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 group/cd"
          title={isPlaying ? 'Click to pause' : 'Click to play Sunflower (Instrumental)'}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              togglePlay()
            }
          }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {/* Circular Progress Ring (Outer border tracks playback) */}
          <svg
            className="absolute -inset-[9px] w-[calc(100%+18px)] h-[calc(100%+18px)] pointer-events-none transform -rotate-90 z-30"
            viewBox="0 0 182 182"
          >
            {/* Background ring track */}
            <circle
              cx="91"
              cy="91"
              r={ringRadius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="2"
            />
            {/* Active progress stroke */}
            <circle
              cx="91"
              cy="91"
              r={ringRadius}
              fill="none"
              stroke="#DE2020"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-150"
            />
          </svg>

          {/* Deep Ambient CD Drop Shadow */}
          <div
            className="absolute inset-0 rounded-full shadow-[0_22px_45px_rgba(0,0,0,0.42),0_8px_16px_rgba(0,0,0,0.25)] pointer-events-none"
            aria-hidden="true"
          />

          {/* THE ROTATING CD DISC */}
          <div
            className="w-full h-full rounded-full overflow-hidden relative border border-white/30 dark:border-white/20 ring-1 ring-black/30"
            style={{
              animation: 'spin 6s linear infinite',
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
          >
            {/* 1. Album Artwork Background */}
            <img
              src={sunflowerCover}
              alt="Sunflower Cover Art"
              className="w-full h-full object-cover object-center filter contrast-105 saturate-110 select-none pointer-events-none"
            />

            {/* 2. Authentic Editorial Handwriting Text Printed on CD (Matching Pin Style) */}
            <div className="absolute top-[18%] left-[14%] right-[14%] flex flex-col items-start z-10 pointer-events-none select-none text-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              <span
                className="font-myfont text-white text-[17px] sm:text-[19px] font-bold tracking-wide leading-none"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
              >
                Sunflower
              </span>
              <span
                className="text-[10px] sm:text-[11px] text-white/90 font-medium tracking-tight mt-0.5 leading-none"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
              >
                Post Malone & Swae Lee
              </span>
            </div>

            <div className="absolute bottom-[16%] left-0 right-0 flex flex-col items-center z-10 pointer-events-none select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              <span
                className="text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-300 font-bold"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
              >
                Official Instrumental
              </span>
            </div>

            {/* 3. Holographic Rainbow CD Specular Sheen (Iridescent light reflection) */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-25"
              style={{
                background:
                  'conic-gradient(from 45deg, transparent 0deg, rgba(255,100,100,0.3) 45deg, rgba(255,255,120,0.35) 90deg, rgba(120,255,180,0.3) 135deg, rgba(120,220,255,0.35) 180deg, transparent 225deg, rgba(255,120,255,0.3) 270deg, transparent 360deg)',
              }}
              aria-hidden="true"
            />

            {/* 4. Fine Concentric CD Grooves */}
            <div className="absolute inset-0 rounded-full border border-black/20 pointer-events-none" />
            <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-black/15 pointer-events-none" />

            {/* 5. Authentic Polycarbonate Inner Clamping Hub (CD Center Ring) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] h-[42%] rounded-full bg-gradient-to-br from-neutral-200/90 via-neutral-100/75 to-neutral-300/85 dark:from-neutral-800/90 dark:via-neutral-700/80 dark:to-neutral-900/90 border border-neutral-300/80 dark:border-neutral-600/80 shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-center z-10 pointer-events-none">
              {/* Micro-etched Matrix & Serial Ring */}
              <div className="w-[78%] h-[78%] rounded-full border border-neutral-300 dark:border-neutral-600 flex items-center justify-center relative">
                <span className="absolute inset-0 rounded-full border border-dashed border-neutral-400/40" />

                {/* Clear Polycarbonate Inner Ring */}
                <div className="w-[62%] h-[62%] rounded-full bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center">
                  {/* Center Spindle Cutout Hole (Through which background peeks) */}
                  <div className="w-[52%] h-[52%] rounded-full bg-white dark:bg-[#0A0A0E] border border-black/30 dark:border-white/20 shadow-inner" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= CENTER PLAY/PAUSE INTERACTIVE OVERLAY ================= */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
              isHovered || !isPlaying
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-black/60 dark:bg-black/75 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform">
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
