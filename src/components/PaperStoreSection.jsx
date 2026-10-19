import React, { useState, useRef } from 'react'
import ThreeUISketchbookViewer from './ThreeUISketchbookViewer'
import sketchbookFace from '../assets/sketchbook-face.png'

const PDF_PAGE_NUMBERS = Array.from({ length: 87 }, (_, index) => index + 1)
  .filter((pageNumber) => pageNumber !== 31 && pageNumber !== 32)

const PDF_SKETCH_SPREADS = Array.from({ length: Math.ceil(PDF_PAGE_NUMBERS.length / 2) }, (_, index) => {
  const pagesInSpread = PDF_PAGE_NUMBERS.slice(index * 2, index * 2 + 2)
  const pageRange = pagesInSpread.length === 1
    ? `${pagesInSpread[0]}`
    : `${pagesInSpread[0]}-${pagesInSpread[pagesInSpread.length - 1]}`

  return {
    url: `/assets/sketchbook/om-paya-${String(index + 1).padStart(2, '0')}.jpg`,
    title: `Sketchbook spread ${pageRange}`
  }
})

export default function PaperStoreSection() {
  const [isOpen, setIsOpen] = useState(false)
  const spreadPages = PDF_SKETCH_SPREADS

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

  return (
    <section
      id="sketchbook"
      data-theme="light"
      className="w-full relative pt-14 sm:pt-24 md:pt-28 pb-12 sm:pb-24 px-2 xs:px-4 sm:px-8 overflow-hidden select-none flex flex-col items-center justify-between min-h-[580px] xs:min-h-[640px] sm:min-h-[760px] md:min-h-[920px] ca-dotted-grid-bg text-neutral-900 border-b-4 border-black transition-colors duration-500"
    >
      {/* FEATURED WORKS DOTTED GRID CANVAS PATTERN */}
      <div className="ca-dotted-grid-pattern" aria-hidden="true" />

      {/* SECTION HEADER: "I ALSO SKETCH" IN SAME FONT & STYLE AS FEATURED WORKS */}
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
        <div className="mt-6 flex items-center justify-center gap-0 xs:gap-1">
          <h2 className="font-akira text-[26px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-neutral-950 uppercase font-black text-center">
            I ALSO SKETCH
          </h2>
          <img
            src={sketchbookFace}
            alt=""
            aria-hidden="true"
            className="w-[50px] h-[50px] xs:w-[60px] xs:h-[60px] sm:w-[88px] sm:h-[88px] md:w-[110px] md:h-[110px] object-contain shrink-0 rotate-12"
          />
        </div>
      </div>

      {/* CENTER STAGE: THE 3D MOLESKINE NOTEBOOK */}
      <div className="my-auto py-4 sm:py-10 flex flex-col items-center justify-center relative z-10 w-full max-w-5xl">
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
              className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-12 sm:h-16 bg-neutral-950/35 blur-2xl rounded-full pointer-events-none transition-all duration-300 group-hover:scale-105 group-hover:bg-neutral-950/45"
            />

            {/* THE TACTILE MOLESKINE BOOK COVER */}
            <div
              className="relative w-[195px] xs:w-[225px] sm:w-[380px] md:w-[560px] h-[275px] xs:h-[315px] sm:h-[530px] md:h-[760px] bg-[#222226] rounded-r-[20px] xs:rounded-r-[24px] sm:rounded-r-[30px] rounded-l-[4px] border border-neutral-800/80 overflow-hidden transition-all duration-300 group-hover:shadow-[0_45px_85px_-15px_rgba(0,0,0,0.45)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)]"
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
              <div className="absolute top-0 bottom-0 left-0 w-[28px] xs:w-[34px] sm:w-[48px] bg-[#16161A] border-r border-black/60 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.5)] flex flex-col justify-between py-4 sm:py-6">
                <div className="w-full h-6 sm:h-8 border-b border-black/30" />
                <div className="w-full h-6 sm:h-8 border-t border-black/30" />
              </div>

              {/* COVER RIGHT EDGE SUBTLE EMBOSS / CREASE */}
              <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />

              {/* CENTER "CLICK TO OPEN" BADGE - FONT MYFONT, NO ICON */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-4 xs:px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-white/25 text-white font-myfont text-xl xs:text-2xl sm:text-3xl tracking-wide shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform lowercase">
                  <span>click to open</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= OPEN THREEUI 3D SKETCHBOOK SPREAD ================= */
          <div className="w-full max-w-6xl relative">
            <ThreeUISketchbookViewer
              pages={spreadPages}
              onClose={() => setIsOpen(false)}
              autoRiffle={false}
            />
          </div>
        )}
      </div>
    </section>
  )
}

