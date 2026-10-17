import React, { useState, useRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'
import FeaturedWorksFloatingElements from './FeaturedWorksFloatingElements'

// Authentic artwork from Om's portfolio for the sketchbook pages
import aureusIdeationImg from '../assets/work/aureus/aureus-01-ideation.png'
import aureusPersonaImg from '../assets/work/aureus/aureus-04-persona.png'
import oniCardFrontImg from '../assets/work/oni-card-front.png'
import oniCard2FrontImg from '../assets/work/oni-card-2-front.png'
import psCycle01BombayImg from '../assets/playstaples/user-cycle/01_Bombay.jpg'
import psCycleBd01Img from '../assets/playstaples/user-cycle/BD_01.jpg'

const SKETCHBOOK_SPREADS = [
  {
    id: 'spread-1',
    spreadNum: '01 / 03',
    leftTitle: 'VISUAL DEVELOPMENT & 3D HARDWARE',
    leftDate: 'MAR 2026 // LAB NOTEBOOK',
    leftNotes: [
      'Initial brainstorming for Aureus Audio flagship headphone lookbook.',
      'Explored isometric angles, tactile floating geometries, and high-contrast editorial magazine typography.',
      'Goal: Fuse industrial luxury aesthetics with audiophile telemetry metrics.'
    ],
    rightImage: aureusIdeationImg,
    rightCaption: 'Aureus Audio • Ideation & Wireframe Telemetry',
    tags: ['Blender 3D', 'Editorial UI', 'Telemetry']
  },
  {
    id: 'spread-2',
    spreadNum: '02 / 03',
    leftTitle: 'CHARACTER MASCOT & PRINT PRODUCTION',
    leftDate: 'MAR 2026 // ONI STUDIOS',
    leftNotes: [
      'Corporate & freelance identity design for Oni Studios.',
      'Illustrated anime mascot studies with cyberpunk lavender and crimson colorways.',
      'Precision dimensions: 3.5" x 2.0" with velvet soft-touch finish and custom vector QR code integration.'
    ],
    rightImage: oniCardFrontImg,
    rightImageSecondary: oniCard2FrontImg,
    rightCaption: 'Oni Studios • Dual Mascot Print Iterations',
    tags: ['Procreate', 'Print Design', 'Character Art']
  },
  {
    id: 'spread-3',
    spreadNum: '03 / 03',
    leftTitle: 'TACTILE COLLECTIBLES & LIVERY',
    leftDate: 'JAN 2026 // PLAYSTAPLES',
    leftNotes: [
      'Kaali Peeli Mumbai Premier Padmini wooden toy collectible.',
      '"For the ones who carved dreams on the trunk."',
      'Organic hardwood proportions, handcrafted rooftop luggage rack, and authentic taxi meter livery typography.'
    ],
    rightImage: psCycle01BombayImg,
    rightImageSecondary: psCycleBd01Img,
    rightCaption: 'PlayStaples • Heritage Taxi Archive & Prototype',
    tags: ['Toy Design', '3D CAD', 'Packaging']
  }
]

export default function PaperStoreSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSpread, setCurrentSpread] = useState(0)
  const [paperTexture, setPaperTexture] = useState('dots') // 'dots' | 'blank' | 'grid'

  // 3D tilt tracking for closed cover
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const coverRef = useRef(null)

  const handleMouseMove = (e) => {
    if (isOpen || !coverRef.current) return
    const rect = coverRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Limit tilt range between -12 and +12 degrees
    const rotateY = (x / (rect.width / 2)) * 12
    const rotateX = -(y / (rect.height / 2)) * 12
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const activeSpread = SKETCHBOOK_SPREADS[currentSpread]

  return (
    <section
      id="sketchbook"
      data-theme="light"
      className="w-full relative pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 overflow-hidden select-none flex flex-col items-center justify-between min-h-[920px] ca-dotted-grid-bg text-neutral-900 border-b-4 border-black transition-colors duration-500"
    >
      {/* FEATURED WORKS DOTTED GRID CANVAS PATTERN */}
      <div className="ca-dotted-grid-pattern" aria-hidden="true" />

      {/* DYNAMIC FLOATING BACKGROUND ELEMENTS (FROM FEATURED WORKS) */}
      <FeaturedWorksFloatingElements />

      {/* SECTION HEADER: "MY SKETCHES" IN SAME FONT & STYLE AS FEATURED WORKS */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center mb-8 sm:mb-12">
        <div className="flex flex-col items-center">
          <div className="font-myfont text-3xl sm:text-4xl text-neutral-800 font-medium tracking-wide flex items-center justify-center min-h-[2.5rem] sm:min-h-[3rem] lowercase">
            explore my notebook!
          </div>
          <svg viewBox="0 0 64 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="mt-1 h-3.5 w-24 sm:w-28 text-[#E84A4A]">
            <path d="M3 4c18-3 40-3 58 0" />
            <path d="M9 9c14-2.5 32-2.5 46 0" />
          </svg>
        </div>
        <h2 className="mt-6 font-akira text-[26px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-neutral-950 uppercase font-black text-center">
          MY SKETCHES
        </h2>
        <div className="mt-8 max-w-md -rotate-[3.6deg] hover:rotate-0 transition-transform duration-300 mb-2">
          <span className="ca-tape-clip inline-block px-6 py-2.5 text-xs sm:text-sm font-ca-mono font-bold uppercase tracking-wider text-black bg-[#FFE57F] shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-amber-300/60">
            Visual development, character studies, and tactile archives.
          </span>
        </div>
      </div>

      {/* CENTER STAGE: THE 3D MOLESKINE NOTEBOOK */}
      <div className="my-auto py-6 sm:py-10 flex flex-col items-center justify-center relative z-10 w-full max-w-5xl">
        {!isOpen ? (
          /* ================= CLOSED NOTEBOOK ================= */
          <div
            ref={coverRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer transition-transform duration-200 ease-out group"
            data-sketchbook-cover="true"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* AMBIENT DROP SHADOW BENEATH THE FLOATING BOOK */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-16 bg-neutral-950/35 blur-2xl rounded-full pointer-events-none transition-all duration-300 group-hover:scale-105 group-hover:bg-neutral-950/45"
            />

            {/* THE TACTILE MOLESKINE BOOK COVER */}
            <div
              className="relative w-[300px] xs:w-[330px] sm:w-[380px] h-[410px] xs:h-[450px] sm:h-[510px] bg-[#222226] rounded-r-[26px] sm:rounded-r-[30px] rounded-l-[4px] border border-neutral-800/80 overflow-hidden transition-all duration-300 group-hover:shadow-[0_45px_85px_-15px_rgba(0,0,0,0.45)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)]"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              {/* SPECULAR SHEEN LIGHTING ON COVER */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity"
                style={{
                  background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${50 - tilt.x * 3}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)`
                }}
              />

              {/* LEFT SPINE BINDING TAPE */}
              <div className="absolute top-0 bottom-0 left-0 w-[42px] sm:w-[48px] bg-[#16161A] border-r border-black/60 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.5)] flex flex-col justify-between py-6">
                <div className="w-full h-8 border-b border-black/30" />
                <div className="w-full h-8 border-t border-black/30" />
              </div>

              {/* COVER RIGHT EDGE SUBTLE EMBOSS / CREASE */}
              <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />

              {/* CENTER "CLICK TO OPEN" BADGE - FONT MYFONT, NO ICON */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-6 py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-white/25 text-white font-myfont text-2xl sm:text-3xl tracking-wide shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform lowercase">
                  <span>click to open</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= OPEN TWO-PAGE SKETCHBOOK SPREAD ================= */
          <div className="w-full max-w-4xl relative animate-fadeIn flex flex-col items-center">
            {/* SPREAD TOOLBAR (PREV / NEXT / CLOSE) */}
            <div className="w-full flex items-center justify-between mb-3 px-2 text-neutral-800 font-poppins text-xs">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-50 border border-neutral-300/80 text-neutral-800 transition-all cursor-pointer active:scale-95 shadow-sm font-medium"
              >
                <X className="w-3.5 h-3.5 text-neutral-600" />
                <span>Close Cover</span>
              </button>

              <div className="flex items-center gap-2 font-ca-mono text-xs text-neutral-700">
                <span className="font-semibold">Spread {currentSpread + 1} of {SKETCHBOOK_SPREADS.length}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                <span className="text-neutral-500">{activeSpread.leftTitle.slice(0, 24)}...</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentSpread === 0}
                  onClick={() => setCurrentSpread(prev => Math.max(0, prev - 1))}
                  className="w-8 h-8 rounded-full bg-white hover:bg-neutral-50 disabled:opacity-35 border border-neutral-300/80 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm text-neutral-800"
                  title="Previous spread"
                >
                  <ChevronLeft className="w-4 h-4 text-neutral-700" />
                </button>
                <button
                  type="button"
                  disabled={currentSpread === SKETCHBOOK_SPREADS.length - 1}
                  onClick={() => setCurrentSpread(prev => Math.min(SKETCHBOOK_SPREADS.length - 1, prev + 1))}
                  className="w-8 h-8 rounded-full bg-white hover:bg-neutral-50 disabled:opacity-35 border border-neutral-300/80 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm text-neutral-800"
                  title="Next spread"
                >
                  <ChevronRight className="w-4 h-4 text-neutral-700" />
                </button>
              </div>
            </div>

            {/* OPEN BOOK SPREAD CONTAINER */}
            <div
              className="w-full bg-[#FAF7F0] text-neutral-900 rounded-3xl shadow-[0_35px_75px_-20px_rgba(0,0,0,0.22)] border border-neutral-300/80 overflow-hidden relative flex flex-col md:flex-row min-h-[460px] sm:min-h-[520px]"
              style={{
                backgroundImage:
                  paperTexture === 'dots'
                    ? 'radial-gradient(#C5BFB0 1.1px, transparent 1.1px)'
                    : paperTexture === 'grid'
                    ? 'linear-gradient(to right, #ECE6D8 1px, transparent 1px), linear-gradient(to bottom, #ECE6D8 1px, transparent 1px)'
                    : 'none',
                backgroundSize: paperTexture === 'dots' ? '18px 18px' : '20px 20px'
              }}
            >
              {/* CENTER SPINE CREASE / SHADOW */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/15 via-black/25 to-black/15 pointer-events-none z-10 shadow-inner" />

              {/* LEFT PAGE: EDITORIAL NOTES & SKETCHES */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/10 relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-black/10 pb-3">
                    <span className="font-ca-mono text-[10px] tracking-widest uppercase text-neutral-500 font-semibold">
                      {activeSpread.leftDate}
                    </span>
                    <span className="font-ca-mono text-xs font-bold text-neutral-400">
                      p. {currentSpread * 2 + 1}
                    </span>
                  </div>

                  <h3 className="font-akira text-base sm:text-lg font-black text-neutral-900 uppercase tracking-wide leading-snug">
                    {activeSpread.leftTitle}
                  </h3>

                  <div className="space-y-3 pt-2">
                    {activeSpread.leftNotes.map((note, idx) => (
                      <p key={idx} className="font-poppins text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                        • {note}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/10 flex flex-wrap gap-1.5 items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {activeSpread.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-ca-mono text-neutral-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-ca-mono text-[10px] text-neutral-400">
                    OM BISWAS SKETCH ARCHIVE
                  </span>
                </div>
              </div>

              {/* RIGHT PAGE: HIGH-RES ARTWORK & VISUAL DISPLAY */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-black/[0.015] relative">
                <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
                  <span className="font-ca-mono text-[10px] tracking-widest uppercase text-neutral-500 font-semibold">
                    VISUAL SPECIFICATION
                  </span>
                  <span className="font-ca-mono text-xs font-bold text-neutral-400">
                    p. {currentSpread * 2 + 2}
                  </span>
                </div>

                {/* Primary Artwork */}
                <div className="w-full flex-1 flex flex-col items-center justify-center rounded-2xl overflow-hidden bg-white/70 border border-black/10 shadow-sm p-3 relative group">
                  <img
                    src={activeSpread.rightImage}
                    alt={activeSpread.rightCaption}
                    className="max-h-[300px] w-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  {activeSpread.rightImageSecondary && (
                    <div className="mt-3 w-full flex justify-center gap-2">
                      <img
                        src={activeSpread.rightImageSecondary}
                        alt="Secondary preview"
                        className="h-16 object-contain rounded border border-black/10 shadow-xs"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between text-neutral-500 font-ca-mono text-[11px]">
                  <span className="truncate">{activeSpread.rightCaption}</span>
                  <span className="shrink-0 text-neutral-400">300 DPI // 1:1</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
