"use client"

import React, { useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { useMusic } from '../context/MusicContext'
import sunflowerCover from '/sunflower_cover.jpg'

export default function HeroCD({ mousePos = { x: 0, y: 0 } }) {
  const { isPlaying, togglePlay } = useMusic()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={togglePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute -right-[4%] sm:-right-[5.87%] -top-[14%] sm:-top-[16.36%] w-[17%] sm:w-[14.65%] aspect-square z-30 group cursor-pointer transition-transform duration-300 ease-out hover:scale-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] pointer-events-auto"
      title={isPlaying ? 'Pause Sunflower (Official Instrumental)' : 'Play Sunflower (Official Instrumental)'}
      style={{
        transform: `translate3d(${-mousePos.x * 0.9}px, ${-mousePos.y * 0.9}px, 0)`,
        transition: 'transform 0.2s ease-out',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          togglePlay()
        }
      }}
      aria-label={isPlaying ? 'Pause Sunflower Instrumental' : 'Play Sunflower Instrumental'}
    >
      {/* Active Audio Pulse / Soundwave Badge */}
      {isPlaying && (
        <div className="absolute -top-2 -right-2 z-40 flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-[#DE2020] opacity-75" />
          <span className="relative inline-flex rounded-full h-5 w-5 bg-[#DE2020] items-center justify-center text-[9px] font-bold text-white shadow-md">
            ♫
          </span>
        </div>
      )}

      {/* Rotating CD Disc (Memory Lane style) */}
      <div
        className="w-full h-full rounded-full overflow-hidden relative border border-white/40 dark:border-white/30 ring-1 ring-black/40 shadow-inner select-none will-change-transform"
        style={{
          animation: 'spin-slow 8s linear infinite',
          transformOrigin: 'center center',
        }}
      >
        {/* 1. Official Sunflower Cover Art Surface */}
        <img
          src={sunflowerCover}
          alt="Sunflower CD Disc"
          className="w-full h-full object-cover object-center filter contrast-105 saturate-110 select-none pointer-events-none"
        />

        {/* 2. Editorial Typography Printed Directly on CD Face */}
        <div className="absolute top-[18%] left-[12%] right-[12%] flex flex-col items-start z-10 pointer-events-none select-none text-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <span
            className="font-myfont text-white text-[10px] sm:text-[13px] md:text-[15px] font-bold tracking-wide leading-none"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.95)' }}
          >
            Sunflower
          </span>
          <span
            className="text-[7px] sm:text-[9px] md:text-[10px] text-white/90 font-medium tracking-tight mt-0.5 leading-none"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.95)' }}
          >
            Post Malone & Swae Lee
          </span>
        </div>

        <div className="absolute bottom-[16%] left-0 right-0 flex flex-col items-center z-10 pointer-events-none select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <span
            className="text-[6px] sm:text-[7px] md:text-[8px] uppercase tracking-widest text-amber-300 font-bold"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.95)' }}
          >
            Official Instrumental
          </span>
        </div>

        {/* 3. Holographic Rainbow CD Sheen */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-30"
          style={{
            background:
              'conic-gradient(from 45deg, transparent 0deg, rgba(255,100,100,0.3) 45deg, rgba(255,255,120,0.35) 90deg, rgba(120,255,180,0.3) 135deg, rgba(120,220,255,0.35) 180deg, transparent 225deg, rgba(255,120,255,0.3) 270deg, transparent 360deg)',
          }}
          aria-hidden="true"
        />

        {/* 4. Fine Concentric CD Grooves */}
        <div className="absolute inset-0 rounded-full border border-black/20 pointer-events-none" />
        <div className="absolute inset-1.5 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute inset-3.5 rounded-full border border-black/15 pointer-events-none" />

        {/* 5. Authentic Polycarbonate Inner Clamping Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] h-[42%] rounded-full bg-gradient-to-br from-neutral-200/90 via-neutral-100/75 to-neutral-300/85 dark:from-neutral-800/90 dark:via-neutral-700/80 dark:to-neutral-900/90 border border-neutral-300/80 dark:border-neutral-600/80 shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-center z-10 pointer-events-none">
          <div className="w-[78%] h-[78%] rounded-full border border-neutral-300 dark:border-neutral-600 flex items-center justify-center relative">
            <span className="absolute inset-0 rounded-full border border-dashed border-neutral-400/40" />

            {/* Clear Center Ring */}
            <div className="w-[62%] h-[62%] rounded-full bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center">
              {/* Center Spindle Hole Cutout */}
              <div className="w-[52%] h-[52%] rounded-full bg-[#18181b] border border-black/40 shadow-inner" />
            </div>
          </div>
        </div>
      </div>

      {/* Center Play / Pause Icon Button on Hover */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
          isHovered
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-75 pointer-events-none'
        }`}
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform">
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
          ) : (
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white ml-0.5" />
          )}
        </div>
      </div>
    </div>
  )
}
