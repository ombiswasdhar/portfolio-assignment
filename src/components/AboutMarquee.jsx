import React from 'react'

export default function AboutMarquee({ className = '' }) {
  const repetitions = Array.from({ length: 16 }, (_, i) => i)

  return (
    <div
      aria-label="About section dual animated marquee"
      className={`w-full select-none overflow-hidden flex flex-col ${className}`}
    >
      {/* Top Tier: Tilted White Ribbon (Portfolio Theme with Akira font + Crimson Stars ✦) */}
      <div className="relative w-full overflow-hidden pt-2 sm:pt-3 pb-3 sm:pb-4 z-20">
        <div className="w-[108%] -ml-[4%] -rotate-[2deg] sm:-rotate-[2.5deg] shadow-[0_12px_36px_rgba(0,0,0,0.85)]">
          <div className="relative w-full h-9 sm:h-10 bg-white text-black flex items-stretch overflow-hidden border-y-2 border-black">
            {/* Soft edge gradient fades from white */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-14 z-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-14 z-10 bg-gradient-to-l from-white to-transparent" />

            <div className="relative w-full overflow-hidden h-full flex items-center">
              <div className="animate-marquee-scroll-reverse flex items-center h-full">
                {/* Half 1 */}
                <div className="flex items-center h-full shrink-0">
                  {repetitions.map((idx) => (
                    <div
                      key={`wht-h1-${idx}`}
                      className="flex items-center gap-4 sm:gap-5 px-6 sm:px-8 h-full border-r border-black/15 hover:bg-neutral-100/80 transition-all duration-200 group/wht cursor-pointer shrink-0"
                    >
                      <span className="font-akira font-black text-xs sm:text-sm tracking-wider uppercase text-neutral-900 group-hover/wht:text-[#DE2020] transition-colors">
                        ABOUT
                      </span>
                      <span className="text-[#DE2020] text-xs sm:text-sm font-bold shrink-0 drop-shadow-[0_0_6px_rgba(222,32,32,0.4)]">
                        ✦
                      </span>
                    </div>
                  ))}
                </div>

                {/* Half 2 (Exact duplicate for seamless infinite loop) */}
                <div className="flex items-center h-full shrink-0" aria-hidden="true">
                  {repetitions.map((idx) => (
                    <div
                      key={`wht-h2-${idx}`}
                      className="flex items-center gap-4 sm:gap-5 px-6 sm:px-8 h-full border-r border-black/15 hover:bg-neutral-100/80 transition-all duration-200 group/wht cursor-pointer shrink-0"
                    >
                      <span className="font-akira font-black text-xs sm:text-sm tracking-wider uppercase text-neutral-900 group-hover/wht:text-[#DE2020] transition-colors">
                        ABOUT
                      </span>
                      <span className="text-[#DE2020] text-xs sm:text-sm font-bold shrink-0 drop-shadow-[0_0_6px_rgba(222,32,32,0.4)]">
                        ✦
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tier: Solid Red Bar (Straight horizontal, anchoring transition to About section) */}
      <div className="relative w-full h-8 sm:h-9 bg-[#DE2020] text-white flex items-stretch overflow-hidden border-y border-black/30 shadow-xs z-10">
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
                  className="flex items-center gap-4 sm:gap-6 px-7 sm:px-10 h-full border-r border-black/20 hover:bg-black/10 transition-colors group/red cursor-pointer shrink-0"
                >
                  <span className="font-akira font-black text-xs sm:text-sm tracking-[0.2em] uppercase text-white group-hover/red:text-neutral-950 transition-colors">
                    ABOUT
                  </span>
                  <span className="text-white/80 text-xs font-bold shrink-0">✦</span>
                </div>
              ))}
            </div>

            {/* Half 2 (Exact duplicate for seamless infinite loop) */}
            <div className="flex items-center h-full shrink-0" aria-hidden="true">
              {repetitions.map((idx) => (
                <div
                  key={`red-h2-${idx}`}
                  className="flex items-center gap-4 sm:gap-6 px-7 sm:px-10 h-full border-r border-black/20 hover:bg-black/10 transition-colors group/red cursor-pointer shrink-0"
                >
                  <span className="font-akira font-black text-xs sm:text-sm tracking-[0.2em] uppercase text-white group-hover/red:text-neutral-950 transition-colors">
                    ABOUT
                  </span>
                  <span className="text-white/80 text-xs font-bold shrink-0">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
