import React from 'react'

// Authentic Red & Black 3x4 Checkerboard pattern matching the design
function RedBlackCheckerboard() {
  return (
    <svg
      className="w-10 h-5 sm:w-12 sm:h-6 shrink-0 select-none drop-shadow-xs"
      viewBox="0 0 44 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Row 0 */}
      <rect x="0" y="0" width="11" height="8" fill="#DE2020" />
      <rect x="11" y="0" width="11" height="8" fill="#0A0A0A" />
      <rect x="22" y="0" width="11" height="8" fill="#DE2020" />
      <rect x="33" y="0" width="11" height="8" fill="#0A0A0A" />

      {/* Row 1 */}
      <rect x="0" y="8" width="11" height="8" fill="#0A0A0A" />
      <rect x="11" y="8" width="11" height="8" fill="#DE2020" />
      <rect x="22" y="8" width="11" height="8" fill="#0A0A0A" />
      <rect x="33" y="8" width="11" height="8" fill="#DE2020" />

      {/* Row 2 */}
      <rect x="0" y="16" width="11" height="8" fill="#DE2020" />
      <rect x="11" y="16" width="11" height="8" fill="#0A0A0A" />
      <rect x="22" y="16" width="11" height="8" fill="#DE2020" />
      <rect x="33" y="16" width="11" height="8" fill="#0A0A0A" />
    </svg>
  )
}

export default function AboutMarquee({ className = '' }) {
  const repetitions = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div
      aria-label="About section dual animated marquee"
      className={`w-full select-none overflow-hidden flex flex-col ${className}`}
    >
      {/* Top Tier: Solid Red Bar with repeating bold white ABOUT */}
      <div className="relative w-full h-8 sm:h-9 bg-[#DE2020] text-white flex items-stretch overflow-hidden border-t border-black/30 shadow-xs">
        {/* Soft edge gradient fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-14 z-10 bg-gradient-to-r from-[#DE2020] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-14 z-10 bg-gradient-to-l from-[#DE2020] to-transparent" />

        <div className="relative w-full overflow-hidden h-full flex items-center">
          <div className="animate-marquee-scroll flex items-center h-full">
            {/* Half 1 */}
            <div className="flex items-center h-full shrink-0">
              {repetitions.map((idx) => (
                <div
                  key={`red-h1-${idx}`}
                  className="flex items-center px-8 sm:px-12 h-full shrink-0 group/red cursor-pointer"
                >
                  <span className="font-akira font-black text-xs sm:text-sm tracking-[0.25em] uppercase text-white group-hover/red:text-neutral-900 transition-colors">
                    ABOUT
                  </span>
                </div>
              ))}
            </div>

            {/* Half 2 (Exact duplicate for seamless infinite loop) */}
            <div className="flex items-center h-full shrink-0" aria-hidden="true">
              {repetitions.map((idx) => (
                <div
                  key={`red-h2-${idx}`}
                  className="flex items-center px-8 sm:px-12 h-full shrink-0 group/red cursor-pointer"
                >
                  <span className="font-akira font-black text-xs sm:text-sm tracking-[0.25em] uppercase text-white group-hover/red:text-neutral-900 transition-colors">
                    ABOUT
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tier: Solid Black Bar with repeating white ABOUT + Red/Black Checkered Blocks */}
      <div className="relative w-full h-10 sm:h-11 bg-[#0A0A0C] text-white flex items-stretch overflow-hidden border-y border-neutral-900 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {/* Soft edge gradient fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-14 z-10 bg-gradient-to-r from-[#0A0A0C] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-14 z-10 bg-gradient-to-l from-[#0A0A0C] to-transparent" />

        <div className="relative w-full overflow-hidden h-full flex items-center">
          <div className="animate-marquee-scroll-reverse flex items-center h-full">
            {/* Half 1 */}
            <div className="flex items-center h-full shrink-0">
              {repetitions.map((idx) => (
                <div
                  key={`blk-h1-${idx}`}
                  className="flex items-center gap-5 sm:gap-7 px-5 sm:px-7 h-full shrink-0 group/blk cursor-pointer"
                >
                  <span className="font-akira font-black text-xs sm:text-sm tracking-[0.22em] uppercase text-white group-hover/blk:text-[#DE2020] transition-colors">
                    ABOUT
                  </span>
                  <RedBlackCheckerboard />
                </div>
              ))}
            </div>

            {/* Half 2 (Exact duplicate for seamless infinite loop) */}
            <div className="flex items-center h-full shrink-0" aria-hidden="true">
              {repetitions.map((idx) => (
                <div
                  key={`blk-h2-${idx}`}
                  className="flex items-center gap-5 sm:gap-7 px-5 sm:px-7 h-full shrink-0 group/blk cursor-pointer"
                >
                  <span className="font-akira font-black text-xs sm:text-sm tracking-[0.22em] uppercase text-white group-hover/blk:text-[#DE2020] transition-colors">
                    ABOUT
                  </span>
                  <RedBlackCheckerboard />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
