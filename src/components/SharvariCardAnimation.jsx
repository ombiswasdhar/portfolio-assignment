import React, { useState } from 'react'

/**
 * SharvariCardAnimation
 * 
 * Featured visual display for the Sharvari Wasnik Foundation project card:
 * - Real-world NGO website redesign developed as a college assignment at Symbiosis Institute of Design
 * - Dual-photo showcase: "Class of Hope" (Children's Education & Library) & "Udyogini" (Women's Financial Self-Reliance)
 * - Live impact telemetry counters (450+ Books, 150+ Beneficiaries, 35+ Programs)
 * - Interactive hover state with dynamic spotlight & live production link badge
 */
export default function SharvariCardAnimation({ className = '' }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-full overflow-hidden bg-[#161414] select-none ${className}`}
    >
      {/* Background Graphic: Hero Visual with Anton "EMPOWERING LIVES." artwork */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/sharvari/page_home.png"
          alt="NGO Website - Sharvari Wasnik Foundation"
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
            isHovered ? 'scale-105 filter brightness-95' : 'scale-100 filter brightness-90'
          }`}
          loading="lazy"
        />
        {/* Ambient Dark Gradient Vignette for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/60" />
      </div>

      {/* Center / Bottom Layout: Foundation Name, Headline & Description */}
      <div className="absolute inset-x-3 sm:inset-x-6 bottom-3 sm:bottom-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
        {/* Left: Foundation Name, Headline & Description */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs sm:text-sm font-fredoka font-semibold text-neutral-300 uppercase tracking-widest">
              Sharvari Wasnik Foundation
            </span>
          </div>

          <h4 className="text-xl sm:text-2xl md:text-3xl font-akira font-black text-white tracking-wide leading-tight drop-shadow-md">
            NGO WEBSITE
          </h4>

          <p className="text-xs sm:text-sm text-neutral-300 font-fredoka mt-1 max-w-lg leading-snug drop-shadow">
            Website Redesign for Sharvari Wasnik Foundation
          </p>
        </div>

        {/* Right: Multi-Page Website Preview Cards */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-28 xl:w-32 aspect-[4/3] rounded-xl overflow-hidden border border-white/20 shadow-2xl relative group/card transition-transform duration-300 hover:scale-105">
            <img
              src="/sharvari/page_about.png"
              alt="About Page Preview"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-1.5 left-2 right-2 text-[9px] font-fredoka font-bold text-white uppercase tracking-wider truncate">
              About Page
            </span>
          </div>

          <div className="w-28 xl:w-32 aspect-[4/3] rounded-xl overflow-hidden border border-white/20 shadow-2xl relative group/card transition-transform duration-300 hover:scale-105">
            <img
              src="/sharvari/page_events.png"
              alt="Events Page Preview"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-1.5 left-2 right-2 text-[9px] font-fredoka font-bold text-white uppercase tracking-wider truncate">
              Events Page
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

