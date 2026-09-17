import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import contentsFullFrame from '../assets/work/contents_full_frame.png'
import previewBusinessCards from '../assets/work/preview_business_cards.png'
import previewAureaus from '../assets/work/preview_aureaus.png'
import previewMelody from '../assets/work/preview_melody.png'
import monogramTopRight from '../assets/skills/monogram_top_right.png'
import arrowLogo from '../assets/hero/arrowLogo_rendered.png'
import halftone from '../assets/hero/halftone.png'
import { useScrollReveal } from '../hooks/useScrollReveal'

const projectsData = [
  {
    id: 'business-cards',
    num: '01',
    label: '1. BUSINESS CARDS',
    category: 'Brand Identity & Print Design',
    color: '#E84A4A',
    accentColor: '#B399D4',
    tools: ['Figma', 'Illustrator', 'Procreate'],
    previewImg: previewBusinessCards,
    quote:
      'Students were given the assignment of researching business card and designing their own card, either as a freelancer or an employee of any brand. Analysis of the brand was done after preparing different iterations which include the logo, colours, typefaces, and dimensions.',
    extendedDetails: {
      type: '2nd Year College Coursework',
      duration: '3 Weeks',
      deliverables: [
        'Brand analysis & competitive benchmarking',
        'Custom illustrated character mascot & avatar',
        'Multiple typographic & color palette iterations',
        'Print-ready business cards with custom QR code integration',
      ],
      highlights:
        'Focused on balancing artistic expression with functional corporate dimensions, culminating in a striking cyberpunk purple identity with diagonal layout dynamics.',
    },
    // Hotspot coordinates on 576x1024 poster (percentages)
    bounds: { left: '3%', top: '34%', width: '94%', height: '17%' },
  },
  {
    id: 'aureaus',
    num: '02',
    label: '2. AUREAUS',
    category: '3D Product Design & Editorial UI',
    color: '#E84A4A',
    accentColor: '#1A1A1A',
    tools: ['Blender', 'Figma', 'Photoshop'],
    previewImg: previewAureaus,
    quote:
      'Aureaus is your go-to site for discovering top review headphones made by the best brands for audio in the market. We focus on bringing you a carefully curated range of flawless, high performance headphones that combine superior sound with sleek design.',
    extendedDetails: {
      type: '2nd Year College Coursework',
      duration: '4 Weeks',
      deliverables: [
        '3D headphone model rendering & lighting setups in Blender',
        'Editorial audio lookbook & magazine spread typography',
        'Headphone review breakdown & telemetry dashboard',
        'Dark mode product landing page design system',
      ],
      highlights:
        'Seamlessly integrated tactile 3D floating geometries with monochromatic high-contrast audio hardware presentation for modern audiophiles.',
    },
    bounds: { left: '8%', top: '51%', width: '90%', height: '18%' },
  },
  {
    id: 'melody',
    num: '03',
    label: '3. MELODY',
    category: 'Entertainment UI/UX & Web Flow',
    color: '#E84A4A',
    accentColor: '#4B8BF5',
    tools: ['Figma', 'UI/UX Design', 'User Flow'],
    previewImg: previewMelody,
    quote:
      "The task was to develop a website on any subject named 'MELODY,' and demonstrate a user flow for an activity on the site. For instance, outlining the steps of purchasing a movie ticket online or navigating through various sections of a website.",
    extendedDetails: {
      type: '2nd Year College Coursework',
      duration: '4 Weeks',
      deliverables: [
        'Complete end-to-end user flow: discover to ticket checkout',
        'Information architecture & wireframe journeys',
        'Interactive movie ticket seat selector & confirmation modal',
        'Vibrant promotional campaign banner ("NEW SEASON TICKETS!!")',
      ],
      highlights:
        'Designed an intuitive booking funnel that eliminates cart friction, illustrated with floating 3D spheres and bold chromatic accents.',
    },
    bounds: { left: '14%', top: '69%', width: '84%', height: '18%' },
  },
]

export default function ContentsSection({ standalone = false }) {
  const containerRef = useRef(null)
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false, px: 0.5, py: 0.5 })
  const [activeProject, setActiveProject] = useState(null)
  const [hoveredProjectId, setHoveredProjectId] = useState(null)

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    const tiltX = (py - 0.5) * -8
    const tiltY = (px - 0.5) * 8

    setTilt({ x: tiltX, y: tiltY, isHovered: true, px, py })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false, px: 0.5, py: 0.5 })
    setHoveredProjectId(null)
  }

  return (
    <section
      id="work"
      aria-label="Contents and College Assignments Showcase"
      className="relative w-full bg-black text-white select-none overflow-hidden pt-8 sm:pt-12 pb-16 sm:pb-24"
    >
      {/* Decorative ambient background glows */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-950/25 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-blue-950/20 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div
        ref={sectionRef}
        className={`relative w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-8 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
        }`}
      >
        {/* Top Right Monogram Logo from Figma */}
        <div className="flex justify-end max-w-[760px] mx-auto mb-2 sm:mb-4">
          <img
            src={monogramTopRight}
            alt="Monogram mark"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain filter invert opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
          />
        </div>

        {/* ================= SECTION TELEMETRY / TOP BAR ================= */}
        <div className="flex items-center justify-between max-w-[760px] mx-auto mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 text-neutral-300 font-semibold">
              Portfolio Index
            </span>
            <span className="w-2 h-2 rounded-full bg-[#E84A4A] animate-pulse" />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
              <span>📌</span>
              <span>Click any project to inspect case study</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {standalone && (
              <a
                href="/"
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 transition-colors"
              >
                ← Home Deck
              </a>
            )}
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              3 College Projects
            </span>
          </div>
        </div>

        {/* ================= DESKTOP / TABLET VIEW: AUTHENTIC 3D PINNED POSTER ================= */}
        <div className="hidden sm:block w-full">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[620px] mx-auto rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-white/15 transition-all duration-300 group"
            style={{
              perspective: '1200px',
            }}
          >
            {/* 3D Tilting Poster Canvas */}
            <div
              className="relative w-full aspect-[576/1024] bg-[#0E0E12] transition-transform ease-out will-change-transform"
              style={{
                transform: tilt.isHovered
                  ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
                  : 'rotateX(0deg) rotateY(0deg) scale(1)',
                transition: tilt.isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
              }}
            >
              {/* Authentic Figma Full Frame Artwork */}
              <img
                src={contentsFullFrame}
                alt="Contents - 2nd year college assignments (3 projects): Business Cards, Aureaus, Melody."
                className="w-full h-full object-contain pointer-events-none select-none"
              />

              {/* Dynamic Specular Sheen Light Reflection across the glossy poster on tilt */}
              {tilt.isHovered && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-200 z-10"
                  style={{
                    background: `radial-gradient(circle at ${(tilt.px || 0.5) * 100}% ${(tilt.py || 0.5) * 100}%, rgba(255,255,255,0.35) 0%, transparent 60%)`,
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Wooden Pushpin Interactive Glow and wobble */}
              <div
                className="absolute left-[49.5%] top-[27.5%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full cursor-pointer z-20 group/pin"
                title="Tactile wooden pushpin"
                onClick={() => {
                  if (containerRef.current) {
                    containerRef.current.classList.add('animate-bounce')
                    setTimeout(() => containerRef.current?.classList.remove('animate-bounce'), 800)
                  }
                }}
              >
                <div className="w-full h-full rounded-full opacity-0 group-hover/pin:opacity-100 transition-opacity bg-yellow-400/20 blur-sm pointer-events-none" />
              </div>

              {/* Interactive Handwriting Disclaimer Hotspot */}
              <div
                className="absolute left-[15%] top-[5.5%] w-[70%] h-[12%] z-20 cursor-pointer rounded-xl group/note transition-all"
                title="Om's authentic handwriting"
              >
                <div className="w-full h-full rounded-xl border border-transparent group-hover/note:border-white/20 group-hover/note:bg-white/[0.03] transition-all flex items-end justify-center pb-1">
                  <span className="opacity-0 group-hover/note:opacity-100 transition-opacity text-[10px] font-mono text-neutral-300 bg-black/70 px-2 py-0.5 rounded-full border border-white/10">
                    ✍️ Handcrafted in Procreate
                  </span>
                </div>
              </div>

              {/* Interactive Hotspot Overlay Cards for each of the 3 projects */}
              {projectsData.map((proj) => {
                const isHovered = hoveredProjectId === proj.id
                return (
                  <div
                    key={proj.id}
                    style={{
                      left: proj.bounds.left,
                      top: proj.bounds.top,
                      width: proj.bounds.width,
                      height: proj.bounds.height,
                    }}
                    onMouseEnter={() => setHoveredProjectId(proj.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    onClick={() => setActiveProject(proj)}
                    className="absolute z-20 cursor-pointer rounded-2xl transition-all duration-300 group/item focus:outline-none"
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${proj.label}`}
                  >
                    {/* Hover Glow Rim */}
                    <div
                      className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 pointer-events-none ${
                        isHovered
                          ? 'border-white bg-black/20 shadow-[0_12px_36px_rgba(0,0,0,0.85)] scale-[1.02]'
                          : 'border-transparent'
                      }`}
                    />

                    {/* Floating Action Pill on Hover */}
                    <div
                      className={`absolute -bottom-2.5 right-6 px-3 py-1 rounded-full bg-black/90 text-white border border-white/30 text-[10px] font-mono tracking-wider flex items-center gap-1.5 shadow-xl transition-all duration-300 pointer-events-none ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>CLICK TO INSPECT CASE STUDY →</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ================= MOBILE VIEW: CLEAR & TACTILE RESPONSIVE CARDS ================= */}
        <div className="sm:hidden w-full flex flex-col gap-6">
          {/* Mobile Top Disclaimer Banner */}
          <div className="text-center bg-neutral-900/70 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <h3 className="font-script text-2xl font-bold text-white mb-1">
              disclaimer !
            </h3>
            <p className="font-script text-base text-neutral-200 leading-snug">
              all the projects showcased here are my 2nd year college assignments (3 projects) which i created as part of my coursework.
            </p>
            <div className="w-3/4 mx-auto h-[1px] bg-white/20 my-2" />
            <p className="font-script text-xs text-neutral-400 text-right pr-2">
              (see, that's my handwriting , dont judge )
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-black font-display tracking-tight text-white">
              CONTENTS
            </h2>
          </div>

          {/* Tilted Red Bulletin Pinboard for Mobile */}
          <div className="relative rounded-3xl bg-[#EB4D42] p-4 pt-8 shadow-2xl border border-white/20 -rotate-1">
            {/* Pushpin at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E5B582] border-2 border-[#8E5E35] shadow-lg flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#8E5E35]" />
            </div>

            {/* List of 3 Mobile Projects */}
            <div className="flex flex-col gap-6">
              {projectsData.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className="bg-[#1C1D21] rounded-2xl p-4 border border-white/10 shadow-lg text-white active:scale-98 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                    <span className="font-display font-bold text-sm tracking-wide text-white">
                      {proj.label}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                      Case Study →
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden mb-3 border border-white/10 aspect-[16/10] bg-neutral-800">
                    <img
                      src={proj.previewImg}
                      alt={proj.label}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-xs font-fredoka text-neutral-300 leading-relaxed">
                    {proj.quote}
                  </p>

                  <div className="mt-3 pt-2 flex items-center justify-between border-t border-white/5 text-[10px] font-mono text-neutral-400">
                    <span>{proj.category}</span>
                    <span className="text-red-400 font-semibold">Inspect 🔍</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MODAL / CASE STUDY DEEP DIVE DRAWER ================= */}
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setActiveProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#18191E] border border-white/20 p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95)] text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white text-sm transition-all cursor-pointer active:scale-95"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Tag & Course Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-red-500/20 border border-red-500/30 text-red-300">
                  {activeProject.extendedDetails.type}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  • {activeProject.category}
                </span>
              </div>

              {/* Project Title */}
              <h3 id="modal-title" className="text-2xl sm:text-3xl font-black font-display text-white mb-4">
                {activeProject.label}
              </h3>

              {/* Hero Preview Image */}
              <div className="rounded-2xl overflow-hidden border border-white/15 mb-6 shadow-xl bg-neutral-900 aspect-[16/9] flex items-center justify-center">
                <img
                  src={activeProject.previewImg}
                  alt={activeProject.label}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* Original Figma Quote Box */}
              <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-4 sm:p-5 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  Assignment Brief & Overview
                </span>
                <p className="text-xs sm:text-sm font-fredoka text-neutral-200 leading-relaxed">
                  "{activeProject.quote}"
                </p>
              </div>

              {/* Tools Used Pills */}
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                  Tools & Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/15 text-neutral-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                  Key Deliverables
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm font-fredoka text-neutral-300">
                  {activeProject.extendedDetails.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400 font-mono">0{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  Design Highlights & Learning
                </span>
                <p className="text-xs sm:text-sm font-fredoka text-neutral-300 leading-relaxed">
                  {activeProject.extendedDetails.highlights}
                </p>
              </div>

              {/* Close Action */}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all active:scale-95 cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= BOTTOM BAR & CV BRIDGING ================= */}
        <div className="relative mt-12 sm:mt-16 pt-4 border-t border-white/10 max-w-[760px] mx-auto flex items-center justify-between text-xs font-mono text-neutral-400">
          {/* Subtle Halftone Pattern Overlay */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-12 opacity-15 pointer-events-none mix-blend-screen bg-repeat-x"
            style={{ backgroundImage: `url(${halftone})`, backgroundSize: 'contain' }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>OM BISWAS • 2ND YEAR DESIGN COURSEWORK • SYMBIOIS</span>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <Link
              to="/cv"
              className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-neutral-200 hover:text-white transition-all text-xs font-mono flex items-center gap-2 shadow-sm"
            >
              <span>View Full Curriculum Vitae</span>
              <span className="text-[#BA1F1F]">→</span>
            </Link>
            <img
              src={arrowLogo}
              alt="Arrow logo"
              className="w-5 h-5 object-contain filter invert opacity-70 hover:opacity-100 hover:rotate-45 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
