import React from 'react'

/**
 * ComicTapHintBubble
 * Pixel-art comic speech bubble sticker matching user reference:
 * - Crisp white die-cut vinyl sticker contour
 * - 4px dark navy/charcoal pixel border (#1E222B)
 * - 3D vibrant cyan/blue drop shadow (#38B6FF)
 * - Downward pixel speech tail at bottom-right
 * - Authentic 8-bit / pixel typography ("Silkscreen")
 * - Interactive tap/click to zoom paragraphs
 */
export default function ComicTapHintBubble({
  onClick,
  active = false,
  className = '',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center cursor-pointer select-none transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0.5 active:scale-[0.97] focus:outline-none ${className}`}
      title="Tap any paragraph to zoom in"
      aria-label="Tap any paragraph to zoom in • Tap again to close"
    >
      {/* Outer White Die-Cut Vinyl Sticker Border */}
      <div className="relative inline-flex bg-white p-[6px] sm:p-[8px] pb-[12px] sm:pb-[14px] pr-[12px] sm:pr-[14px] rounded-[18px] sm:rounded-[22px] shadow-[0_12px_28px_rgba(0,0,0,0.75)] border border-white/80 transition-shadow group-hover:shadow-[0_16px_36px_rgba(56,182,255,0.35)]">
        
        {/* Pixel Speech Bubble Wrapper */}
        <div className="relative inline-flex items-center">
          
          {/* Main Speech Box with 3D Cyan Shadow */}
          <div className="relative bg-white border-[3.5px] sm:border-[4px] border-[#1e222b] px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-[8px_8px_0px_#38b6ff] sm:shadow-[10px_10px_0px_#38b6ff] z-10 flex items-center justify-center">
            <span
              className="font-pixel text-[10px] sm:text-[12px] font-bold text-[#1e222b] tracking-wider uppercase whitespace-nowrap leading-none pt-0.5"
              style={{
                fontFamily: "'Silkscreen', 'Space Mono', monospace",
                textRendering: 'pixelated',
              }}
            >
              tap any paragraph to zoom in
            </span>
          </div>

          {/* Pixel Tail on Bottom Right */}
          <div className="absolute right-4 sm:right-6 -bottom-[13px] sm:-bottom-[15px] w-[24px] sm:w-[28px] h-[16px] sm:h-[18px] z-20 pointer-events-none">
            <svg
              viewBox="0 0 28 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible"
            >
              {/* Cyan 3D Shadow for Tail (offset 8px right and down) */}
              <rect x="14" y="2" width="10" height="15" fill="#38b6ff" />
              <rect x="6" y="9" width="18" height="8" fill="#38b6ff" />

              {/* Dark Outline of Tail */}
              <path d="M0 0H14V13H5V7H0V0Z" fill="#1e222b" />

              {/* White Interior Connecting with Box Interior */}
              <rect x="0" y="-4" width="10" height="8" fill="#ffffff" />
              <rect x="3" y="0" width="7" height="9" fill="#ffffff" />
            </svg>
          </div>

        </div>

      </div>
    </button>
  )
}
