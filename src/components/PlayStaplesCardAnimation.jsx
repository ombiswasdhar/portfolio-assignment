import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import heroPosterImg from '../assets/work/playstaples/playstaples-hero.png'

// Hotspot viewports mapped to key sections of the 1400x1982 poster
const HOTSPOTS = [
  {
    id: 'overview',
    label: '00 // FULL OVERVIEW',
    title: 'Usability Testing Poster',
    scale: 1,
    x: 0,
    y: 0,
    duration: 3200,
  },
  {
    id: 'header',
    label: '01 // TITLE & BRAND',
    title: 'PlayStaples Usability Testing',
    scale: 2.1,
    x: '0%',
    y: '28%',
    duration: 3000,
  },
  {
    id: 'cohort',
    label: '02 // TEST COHORT',
    title: '5 Participant Profiles & Exhibits',
    scale: 2.2,
    x: '15%',
    y: '16%',
    duration: 3000,
  },
  {
    id: 'heuristics',
    label: '03 // HEURISTIC AUDIT',
    title: "10 Nielsen's Heuristics & UCD Table",
    scale: 2.3,
    x: '0%',
    y: '-3%',
    duration: 3200,
  },
  {
    id: 'ab-testing',
    label: '04 // A/B EXPERIMENTS',
    title: 'Core Friction Points & Redesign',
    scale: 2.2,
    x: '-18%',
    y: '-25%',
    duration: 3200,
  },
  {
    id: 'quant-data',
    label: '05 // QUANT DATA',
    title: 'Time & Click Reduction Metrics',
    scale: 2.3,
    x: '-16%',
    y: '-40%',
    duration: 3000,
  },
]

export default function PlayStaplesCardAnimation({ isPaused = false }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (isPaused) return

    const currentSpot = HOTSPOTS[currentIndex]
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HOTSPOTS.length)
    }, currentSpot.duration)

    return () => clearTimeout(timer)
  }, [currentIndex, isPaused])

  const activeSpot = HOTSPOTS[currentIndex]

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0A0A0C] select-none">
      {/* Dynamic Animated Viewport Image with Snapping Transitions */}
      <motion.div
        className="w-full h-full flex items-center justify-center will-change-transform"
        animate={{
          scale: activeSpot.scale,
          x: activeSpot.x,
          y: activeSpot.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 18,
          mass: 0.8,
        }}
      >
        <img
          src={heroPosterImg}
          alt="PlayStaples Usability Testing Infographic Poster"
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      </motion.div>

      {/* Cinematic Vignette & Grain Filter */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />

      {/* Camera Reticle / HUD Viewfinder Overlay */}
      <div className="absolute inset-0 pointer-events-none p-3 sm:p-4 flex flex-col justify-between">
        {/* Top HUD Row */}
        <div className="flex items-center justify-between text-[10px] font-ca-mono tracking-wider text-white/80">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/15">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 font-bold">INSPECT</span>
            <span className="text-white/40">|</span>
            <span className="text-white/90 uppercase">{activeSpot.label}</span>
          </div>

          <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/15 font-bold text-yellow-400">
            {activeSpot.scale > 1 ? `${activeSpot.scale}X ZOOM` : '1.0X FIT'}
          </div>
        </div>

        {/* Viewfinder Target Crosshairs in Center */}
        {activeSpot.scale > 1 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
            </div>
            {/* Corner brackets */}
            <div className="absolute w-24 h-24 border border-dashed border-white/20 rounded-lg pointer-events-none" />
          </div>
        )}

        {/* Bottom HUD Row */}
        <div className="flex items-end justify-between">
          {/* Section Description Card */}
          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 max-w-[75%] shadow-xl">
            <div className="text-[9px] font-ca-mono text-white/50 uppercase tracking-widest">
              FOCUSED INSPECTION
            </div>
            <div className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
              {activeSpot.title}
            </div>
          </div>

          {/* Stepper Indicators */}
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded border border-white/15">
            {HOTSPOTS.map((spot, idx) => (
              <button
                key={spot.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(idx)
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-4 h-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
                title={spot.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
