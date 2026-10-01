import React from 'react'
import { useMusic } from '../context/MusicContext'

/**
 * ClickToPlayBadge Component
 * Displays "CLICK TO PLAY" in Fredoka dotted matrix text (Nothing font aesthetic)
 * with a luminous white neon glow, and a hand-drawn twirling loop-de-loop arrow
 * pointing towards the Sunflower CD disc.
 */
export default function ClickToPlayBadge({ mousePos = { x: 0, y: 0 } }) {
  const { isPlaying, togglePlay } = useMusic()

  const labelText = isPlaying ? 'CLICK TO PAUSE' : 'CLICK TO PLAY'
  // Width dynamically adjusted for letter count
  const svgWidth = isPlaying ? 172 : 162

  return (
    <div
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          togglePlay()
        }
      }}
      title={isPlaying ? 'Pause Sunflower Instrumental' : 'Play Sunflower Instrumental'}
      aria-label={isPlaying ? 'Pause Sunflower Instrumental' : 'Play Sunflower Instrumental'}
      style={{
        transform: `translate3d(${-mousePos.x * 0.75}px, ${-mousePos.y * 0.75}px, 0)`,
        transition: 'transform 0.2s ease-out',
      }}
      className="absolute -top-[20%] sm:-top-[26%] md:-top-[30%] right-[11%] sm:right-[12.5%] md:right-[14%] z-35 flex items-center gap-1 sm:gap-2 cursor-pointer group select-none pointer-events-auto transition-transform duration-300 hover:scale-105"
    >
      {/* 1. Dotted Text in Fredoka font (Nothing Phone dot-matrix style) with White Luminous Glow */}
      <div className="relative flex flex-col items-end">
        <svg
          viewBox={`0 0 ${svgWidth} 26`}
          className="h-5 sm:h-6 md:h-7 w-auto overflow-visible filter drop-shadow-[0_0_3px_rgba(255,255,255,1)] drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] drop-shadow-[0_0_16px_rgba(255,255,255,0.45)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)] transition-all duration-300"
          style={{ width: `${svgWidth}px` }}
        >
          <defs>
            {/* Nothing font dot-matrix pattern */}
            <pattern
              id="nothing-dot-matrix"
              x="0"
              y="0"
              width="3.2"
              height="3.2"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.6" cy="1.6" r="1.1" fill="#ffffff" />
            </pattern>

            {/* Glowing neon aura */}
            <filter id="white-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dotted Text Body */}
          <text
            x="2"
            y="19"
            fontFamily="'Fredoka', -apple-system, sans-serif"
            fontWeight="700"
            fontSize="16"
            letterSpacing="2.2px"
            fill="url(#nothing-dot-matrix)"
            filter="url(#white-glow-filter)"
            className="uppercase select-none"
          >
            {labelText}
          </text>
        </svg>

        {/* Small subtle active status hint */}
        {isPlaying && (
          <span className="text-[9px] font-mono text-white/80 tracking-widest mt-0.5 animate-pulse filter drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
            ● PLAYING
          </span>
        )}
      </div>

      {/* 2. Twirling / Loop-de-loop Arrow Pointing Directly Towards the CD Disc */}
      <div className="relative -ml-1 sm:-ml-0.5 -mt-1 sm:-mt-2 flex-shrink-0 animate-float-gentle group-hover:rotate-6 transition-transform duration-300">
        <svg
          viewBox="0 0 88 68"
          className="w-12 sm:w-16 md:w-20 h-auto overflow-visible select-none filter drop-shadow-[0_0_3px_rgba(255,255,255,1)] drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)] transition-all duration-300"
        >
          {/* Hand-drawn Twirling Spiral / Loop-de-loop Curve */}
          <path
            d="M 6 18 C 22 8, 46 4, 55 16 C 63 27, 48 42, 37 34 C 27 26, 38 12, 50 14 C 62 16, 74 34, 82 50"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Arrowhead Barbs Pointing Down-Right Towards the CD Hub */}
          <path
            d="M 82 50 L 71 44 M 82 50 L 78 37"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
