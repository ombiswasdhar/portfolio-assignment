import React, { useState, useRef, useEffect } from 'react'
import FeaturedWorksFloatingElements from './FeaturedWorksFloatingElements'
import ThreeUISketchbookViewer from './ThreeUISketchbookViewer'
import { createSpreadImage } from '../utils/sketchbookRenderer'

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
  const [spreadPages, setSpreadPages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 3D tilt tracking for closed cover
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const coverRef = useRef(null)

  // Generate high-resolution spread canvas images on mount
  useEffect(() => {
    let isMounted = true

    Promise.all(
      SKETCHBOOK_SPREADS.map((spread, idx) =>
        createSpreadImage(spread, idx, SKETCHBOOK_SPREADS.length)
      )
    )
      .then((urls) => {
        if (!isMounted) return
        setSpreadPages(
          urls.map((url, i) => ({
            url,
            title: SKETCHBOOK_SPREADS[i].leftTitle,
            date: SKETCHBOOK_SPREADS[i].leftDate,
            caption: SKETCHBOOK_SPREADS[i].rightCaption,
            tags: SKETCHBOOK_SPREADS[i].tags
          }))
        )
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to pre-render sketchbook spreads:', err)
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

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
          /* ================= OPEN THREEUI 3D SKETCHBOOK SPREAD ================= */
          <div className="w-full max-w-4xl relative">
            {spreadPages.length > 0 ? (
              <ThreeUISketchbookViewer
                pages={spreadPages}
                onClose={() => setIsOpen(false)}
                autoRiffle={true}
              />
            ) : (
              <div className="py-24 flex flex-col items-center justify-center text-neutral-600 gap-3">
                <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                <span className="font-ca-mono text-xs uppercase tracking-wider">Opening sketchbook...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

