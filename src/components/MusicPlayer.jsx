"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Music,
} from 'lucide-react'
import sunflowerCover from '/sunflower_cover.jpg'

const TRACKS = [
  {
    title: 'Sunflower (Instrumental)',
    artist: 'Post Malone, Swae Lee',
    src: '/sunflower.mp3',
    cover: sunflowerCover,
  },
  {
    title: 'Sunflower (Full Version)',
    artist: 'Post Malone, Swae Lee',
    src: '/sunflower_full.mp3',
    cover: sunflowerCover,
  },
]

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [volume, setVolume] = useState(0.8)

  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const isDraggingRef = useRef(false)

  const track = TRACKS[currentTrackIndex]

  // Initialize audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Handle play / pause toggle
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
          console.warn('Audio play request interrupted or blocked:', err)
          setIsPlaying(false)
        })
    }
  }, [isPlaying])

  // Track time updates
  const handleTimeUpdate = () => {
    if (!audioRef.current || isDraggingRef.current) return
    setCurrentTime(audioRef.current.currentTime)
  }

  // Loaded metadata handler for track duration
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration || 0)
  }

  // Handle song ending -> loop or go next
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => setIsPlaying(false))
    }
  }

  // Seek bar click / drag handler
  const handleSeek = (e) => {
    if (!progressRef.current || !audioRef.current || !duration) return
    const rect = progressRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clickRatio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const targetTime = clickRatio * duration
    audioRef.current.currentTime = targetTime
    setCurrentTime(targetTime)
  }

  // Toggle Mute
  const toggleMute = () => {
    if (!audioRef.current) return
    const nextMuted = !isMuted
    audioRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  // Switch Track (Previous / Next)
  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
  }

  const handlePrevTrack = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
    }
  }

  // Automatically start playback when switching tracks if already playing
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
    }
  }, [currentTrackIndex])

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Floating Music Player Widget */}
      <div
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none font-sans transition-all duration-300"
        style={{
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.22))',
        }}
        aria-label="Sunflower Music Player"
      >
        {isMinimized ? (
          /* ================= MINIMIZED FLOATING BADGE ================= */
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-[#121216] border border-black/10 dark:border-white/20 shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200"
            title="Open Music Player (Sunflower Instrumental)"
            aria-label="Expand Music Player"
          >
            {/* Spinning Vinyl in badge */}
            <div
              className="w-12 h-12 rounded-full overflow-hidden relative shadow-inner"
              style={{
                animation: 'spin 8s linear infinite',
                animationPlayState: isPlaying ? 'running' : 'paused',
              }}
            >
              <img
                src={track.cover}
                alt="Sunflower Vinyl"
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute inset-0 rounded-full border border-black/30 pointer-events-none" />
              {/* Spindle hole */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border border-neutral-400 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-neutral-900" />
              </span>
            </div>

            {/* Glowing active indicator */}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE2020] opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#DE2020] items-center justify-center text-[8px] text-white">
                  ♫
                </span>
              </span>
            )}
          </button>
        ) : (
          /* ================= EXPANDED CARD (MATCHING PINTEREST GIF) ================= */
          <div className="relative flex items-center">
            {/* 1. OVERLAPPING SPINNING VINYL RECORD DISC (Left Side) */}
            <div
              onClick={togglePlay}
              title={isPlaying ? 'Pause music' : 'Play Sunflower'}
              className="absolute -left-9 sm:-left-10 z-20 w-20 h-20 sm:w-[86px] sm:h-[86px] cursor-pointer group hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              {/* Vinyl Disc Container */}
              <div
                className="w-full h-full rounded-full overflow-hidden relative shadow-[0_10px_25px_rgba(0,0,0,0.35)] bg-neutral-900"
                style={{
                  animation: 'spin 8s linear infinite',
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              >
                {/* Album Cover Art */}
                <img
                  src={track.cover}
                  alt="Sunflower Cover Art"
                  className="w-full h-full object-cover object-center filter saturate-110"
                />

                {/* Subtle Concentric Vinyl Grooves Overlay */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
                <div className="absolute inset-1.5 rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute inset-3.5 rounded-full border border-black/25 pointer-events-none" />
                <div className="absolute inset-5 rounded-full border border-white/15 pointer-events-none" />

                {/* Vinyl Glossy Sheen Highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 via-transparent to-white/30 mix-blend-overlay pointer-events-none" />

                {/* Turntable Center Spindle Hole */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                </div>
              </div>

              {/* Play hover badge over vinyl */}
              <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/25 backdrop-blur-[1px]">
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white fill-white drop-shadow-md" />
                ) : (
                  <Play className="w-5 h-5 text-white fill-white drop-shadow-md ml-0.5" />
                )}
              </div>
            </div>

            {/* 2. MAIN PLAYER CARD (Horizontal Pill) */}
            <div className="relative pl-[54px] sm:pl-[58px] pr-4 sm:pr-5 py-3.5 sm:py-4 bg-white/95 dark:bg-[#121216]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 w-[275px] sm:w-[310px] shadow-2xl flex flex-col justify-between gap-2.5">
              {/* Top Row: Track Name & Volume / Minimize */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 pr-1">
                  <h4 className="font-sans font-bold text-[14px] sm:text-[15px] leading-tight text-neutral-900 dark:text-neutral-100 truncate tracking-tight">
                    {track.title}
                  </h4>
                  <p className="text-[11px] sm:text-[12px] font-medium text-neutral-500 dark:text-neutral-400 truncate mt-0.5 leading-none">
                    {track.artist}
                  </p>
                </div>

                {/* Top Right Controls (Mute & Minimize) */}
                <div className="flex items-center gap-1 shrink-0 text-neutral-500 dark:text-neutral-400">
                  {/* Volume Slider Popout */}
                  <div
                    className="relative flex items-center"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-red-500" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    {showVolumeSlider && (
                      <div className="absolute right-0 bottom-6 bg-white dark:bg-[#1f1f27] px-2 py-1.5 rounded-lg shadow-xl border border-black/10 dark:border-white/10 flex items-center z-30 animate-fadeIn">
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
                          className="w-16 h-1 accent-[#3b82f6] cursor-pointer"
                          aria-label="Volume slider"
                        />
                      </div>
                    )}
                  </div>

                  {/* Minimize Button */}
                  <button
                    type="button"
                    onClick={() => setIsMinimized(true)}
                    className="p-1 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                    title="Minimize player"
                    aria-label="Minimize player"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Middle Row: Sleek Progress Bar (Matching Blue Accent from GIF) */}
              <div
                ref={progressRef}
                onClick={handleSeek}
                className="w-full py-1 cursor-pointer group"
                title="Seek audio track"
              >
                <div className="w-full h-1 sm:h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full relative overflow-hidden transition-all group-hover:h-2">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-[width] duration-100 relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    {/* Glowing head of progress bar */}
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>

              {/* Bottom Row: Playback Controls (Matching GIF) */}
              <div className="flex items-center justify-center gap-6 sm:gap-7 pt-0.5">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={handlePrevTrack}
                  className="text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 active:scale-95 transition-all cursor-pointer p-1"
                  title="Previous / Restart Track"
                  aria-label="Previous track"
                >
                  <SkipBack className="w-4 h-4 fill-current" />
                </button>

                {/* Big Center Play / Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-8 h-8 flex items-center justify-center text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-115 active:scale-90 transition-all cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play Sunflower'}
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                {/* Next Button (With Circular Border Plate from GIF) */}
                <button
                  type="button"
                  onClick={handleNextTrack}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Next Track"
                  aria-label="Next track"
                >
                  <SkipForward className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
