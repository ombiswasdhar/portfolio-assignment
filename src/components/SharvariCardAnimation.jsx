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

      {/* Floating Crimson Accent Glow matching SWF Brand Red (#D7191F) */}
      <div
        className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#D7191F]/30 blur-3xl pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-80' : 'opacity-40'
        }`}
        aria-hidden="true"
      />

      {/* Top Banner Bar: College Assignment Tag & Live Website Badge */}
      <div className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 z-20 flex items-center justify-between flex-wrap gap-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-ca-mono font-bold uppercase tracking-wider text-white shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7191F] animate-pulse" />
            <span>College Assignment • Symbiosis</span>
          </span>
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-[#D7191F]/90 text-white text-[10px] font-fredoka font-bold uppercase tracking-wider shadow-md">
            NGO Website Redesign
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md text-emerald-300 text-[10px] sm:text-xs font-fredoka font-bold uppercase tracking-wider shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Live • sharvariwasnik.foundation</span>
        </div>
      </div>

      {/* Center / Bottom Layout: Impact Telemetry & Program Highlights */}
      <div className="absolute inset-x-3 sm:inset-x-6 bottom-3 sm:bottom-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
        {/* Left: Foundation Name, Headline & Verified Impact Stats */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded bg-[#D7191F] text-white flex items-center justify-center font-bold text-xs shadow-md">
              SWF
            </div>
            <span className="text-xs sm:text-sm font-fredoka font-semibold text-neutral-300 uppercase tracking-widest">
              Sharvari Wasnik Foundation
            </span>
          </div>

          <h4 className="text-xl sm:text-2xl md:text-3xl font-akira font-black text-white tracking-wide leading-tight drop-shadow-md">
            NGO WEBSITE
          </h4>

          <p className="text-xs sm:text-sm text-neutral-300 font-fredoka mt-1 line-clamp-2 max-w-lg leading-snug drop-shadow">
            Complete multi-page web platform redesign for Sharvari Wasnik Foundation—featuring 5 dedicated responsive pages, impact telemetry, and community pathways.
          </p>

          {/* Verified Impact Metrics Pill Row */}
          <div className="flex flex-wrap items-center gap-2 mt-3 font-fredoka">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white text-[10px] sm:text-xs font-medium">
              <span className="text-amber-400 font-bold">5</span> Core Pages
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white text-[10px] sm:text-xs font-medium">
              <span className="text-emerald-400 font-bold">450+</span> Books Donated
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white text-[10px] sm:text-xs font-medium">
              <span className="text-rose-400 font-bold">150+</span> Beneficiaries
            </span>
          </div>
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

