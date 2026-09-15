import React, { useState, useRef } from 'react'
import cvFullFrame from '../assets/cv/cv_full_frame.png'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  ProcreateIcon,
  SketchbookIcon,
  FigmaIcon,
  PremierProIcon,
  PhotoshopIcon,
  IllustratorIcon,
  CanvaIcon,
  ProcreateDreamsIcon,
} from './SkillIcons'

/**
 * CVSection
 * 
 * Curriculum Vitae / Resume presented as an interactive bulletin poster
 * matching the Figma frame (node 373-908) with:
 * - 3D responsive mouse tilt & specular sheen reflection
 * - Interactive Hover Zoom Cards: Hovering on any section (About Me, Experience,
 *   Interests, Philosophy, Software, Contacts) zooms it in to a crystal-clear, readable scale
 * - Interactive software icon tooltips & glow
 * - Clickable contact links (Phone, Email, Instagram, Behance)
 * - Animated crown & comic doodles
 * - Download & Print action bar
 */
export default function CVSection() {
  const containerRef = useRef(null)
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false, px: 0.5, py: 0.5 })
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [activeTooltip, setActiveTooltip] = useState(null)
  const [pinnedCard, setPinnedCard] = useState(null)

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    const tiltX = (py - 0.5) * -10
    const tiltY = (px - 0.5) * 10

    setTilt({ x: tiltX, y: tiltY, isHovered: true, px, py })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false, px: 0.5, py: 0.5 })
    setActiveTooltip(null)
  }

  const handleCopyEmail = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText('ombiswasdhar@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <section
      id="cv"
      aria-label="Curriculum Vitae / Resume section"
      className="relative w-full bg-black text-white select-none overflow-hidden pt-12 sm:pt-16 pb-20 sm:pb-24 md:pb-28"
    >
      {/* Decorative ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-blue-900/15 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div
        ref={sectionRef}
        className={`relative w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-8 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
        }`}
      >
        {/* ================= SECTION HEADER & ACTION BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[880px] mx-auto mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 text-neutral-300 font-semibold">
              Curriculum Vitae
            </span>
            <span className="w-2 h-2 rounded-full bg-[#BA1F1F] animate-pulse" />
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 pl-2">
              <span>🔍</span>
              <span>Hover any section to zoom & read</span>
            </span>
          </div>

          {/* Action Bar: Download CV, Print, Copy Email */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/15 text-xs font-mono text-neutral-300 hover:text-white hover:border-red-500/50 hover:bg-neutral-800 transition-all active:scale-95 shadow-md cursor-pointer"
              title="Copy Email Address"
            >
              <span>{copiedEmail ? '✓ Copied!' : 'Copy Email'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/15 text-xs font-mono text-neutral-300 hover:text-white hover:border-red-500/50 hover:bg-neutral-800 transition-all active:scale-95 shadow-md cursor-pointer"
              title="Print CV or Save as PDF"
            >
              <span>Print / PDF</span>
            </button>

            <a
              href={cvFullFrame}
              download="Om_Biswas_CV.png"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#BA1F1F] hover:bg-red-600 text-white text-xs font-bold font-mono tracking-wide shadow-[0_4px_16px_rgba(186,31,31,0.45)] hover:shadow-[0_6px_22px_rgba(186,31,31,0.65)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Download CV</span>
              <span>↓</span>
            </a>
          </div>
        </div>

        {/* ================= INTERACTIVE BULLETIN POSTER CARD ================= */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-[760px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-white/15 transition-shadow duration-300 group/poster"
          style={{
            perspective: '1200px',
          }}
        >
          {/* 3D Tilting Inner Container */}
          <div
            className="relative w-full aspect-[684/1024] bg-[#758AE6] transition-transform ease-out will-change-transform"
            style={{
              transform: tilt.isHovered
                ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
                : 'rotateX(0deg) rotateY(0deg) scale(1)',
              transition: tilt.isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
            }}
          >
            {/* Pristine Full Figma Frame Graphic */}
            <img
              src={cvFullFrame}
              alt="Om Biswas - Curriculum Vitae: Designer, 21 y.o, Symbiosis School of Planning Architecture and Design. Experience, Skills, and Interests."
              className="w-full h-full object-contain pointer-events-none select-none"
            />

            {/* Dynamic Specular Sheen Light Reflection across the glossy poster on tilt */}
            {tilt.isHovered && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-200 z-10"
                style={{
                  background: `radial-gradient(circle at ${(tilt.px || 0.5) * 100}% ${(tilt.py || 0.5) * 100}%, rgba(255,255,255,0.42) 0%, transparent 60%)`,
                }}
                aria-hidden="true"
              />
            )}

            {/* ================= 1. HOVER ZOOM CARD: ABOUT ME (OM BISWAS / HELLO) ================= */}
            <div
              className={`cv-zoom-card bg-[#5268dc]/95 text-white p-3.5 sm:p-4 md:p-5 flex flex-col justify-between overflow-y-auto ${
                pinnedCard === 'about' ? 'is-active' : ''
              }`}
              style={{ left: '4.8%', top: '23%', width: '58%', height: '29.5%' }}
              onClick={() => setPinnedCard(pinnedCard === 'about' ? null : 'about')}
              role="region"
              aria-label="Zoomed view: About Om Biswas"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-1.5 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-display text-base sm:text-lg md:text-xl font-black text-white">
                    Om Biswas
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-yellow-300 uppercase tracking-wide">
                    Shillong, India
                  </span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/90">
                  🔍 Zoom
                </span>
              </div>

              <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-[11.5px] md:text-[12.5px] font-fredoka font-light leading-snug text-neutral-100">
                <p className="font-medium text-white text-[10.5px] sm:text-xs">
                  <strong>HELLO</strong>, my name is Om, a designer / illustrator / artist based in Shillong, India.
                </p>
                <p>
                  Since 8th grade, my passion for illustration, character design, and visual storytelling has continued to grow. Over the years, this has expanded into UI/UX design, graphic design, 3D, and product design.
                </p>
                <p>
                  Always eager to explore new directions, I enjoy experimenting with different styles and mediums to express ideas in fresh, meaningful ways.
                </p>
                <p className="text-[9.5px] sm:text-[11px] text-neutral-200 pt-0.5">
                  🏸 District-level badminton player • 🎸 Trinity College London-certified guitarist.
                </p>
              </div>
            </div>

            {/* ================= 2. HOVER ZOOM CARD: MY EXPERIENCE ================= */}
            <div
              className={`cv-zoom-card bg-[#5268dc]/95 text-white p-3.5 sm:p-4 md:p-5 flex flex-col justify-between overflow-y-auto ${
                pinnedCard === 'experience' ? 'is-active' : ''
              }`}
              style={{ left: '4.8%', top: '53.5%', width: '58%', height: '22.5%' }}
              onClick={() => setPinnedCard(pinnedCard === 'experience' ? null : 'experience')}
              role="region"
              aria-label="Zoomed view: Experience"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-1.5 mb-2">
                <h3 className="font-display font-black text-xs sm:text-sm md:text-base tracking-wider uppercase text-white">
                  MY EXPERIENCE
                </h3>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/90">
                  🔍 Zoom
                </span>
              </div>

              <div className="space-y-2 text-[10px] sm:text-[11px] md:text-[12px] font-fredoka leading-tight text-neutral-100">
                <div>
                  <h4 className="font-bold text-white text-[11px] sm:text-[12px]">
                    1. Sports Council Head
                  </h4>
                  <ul className="list-disc list-inside text-neutral-200 pl-1 space-y-0.5 text-[9.5px] sm:text-[11px]">
                    <li>Designed posters and promotional materials for sports & events.</li>
                    <li>Organized & managed tournaments; coordinated execution.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white text-[11px] sm:text-[12px]">
                    2. Government School Workshop
                  </h4>
                  <p className="text-neutral-200 text-[9.5px] sm:text-[11px]">
                    Conducted design & illustration workshops, sharing skills and guiding students.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <h4 className="font-bold text-white text-[11px] sm:text-[12px]">
                    3. Graphics Designer at Mentorsity
                  </h4>
                  <a
                    href="https://mentorsity.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[9px] font-mono px-2 py-0.5 rounded bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors"
                  >
                    Visit ↗
                  </a>
                </div>
              </div>
            </div>

            {/* ================= 3. HOVER ZOOM CARD: INTERESTS ================= */}
            <div
              className={`cv-zoom-card bg-[#5268dc]/95 text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-y-auto ${
                pinnedCard === 'interests' ? 'is-active' : ''
              }`}
              style={{ left: '4.8%', top: '76.8%', width: '46%', height: '20.2%' }}
              onClick={() => setPinnedCard(pinnedCard === 'interests' ? null : 'interests')}
              role="region"
              aria-label="Zoomed view: Interests"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-1 mb-1.5">
                <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                  INTERESTS
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/90">
                  🔍 Zoom
                </span>
              </div>

              <div className="space-y-1.5 text-[10px] sm:text-[11.5px] font-fredoka leading-snug text-neutral-100">
                <p>
                  <strong className="text-yellow-300">Sports:</strong> Badminton 🏸, Table Tennis 🏓, Football ⚽, Basketball 🏀 — keeps me disciplined and energized.
                </p>
                <p>
                  <strong className="text-yellow-300">Creative:</strong> Sketching 🎨, Animating 🎬, Gaming 🎮, Guitar 🎸, Movies & Traveling ✈️.
                </p>
              </div>
            </div>

            {/* ================= 4. HOVER ZOOM CARD: LANGUAGES & CONTACT ================= */}
            <div
              className={`cv-zoom-card bg-[#5268dc]/95 text-white p-3 sm:p-3.5 flex flex-col justify-between overflow-y-auto ${
                pinnedCard === 'languages' ? 'is-active' : ''
              }`}
              style={{ left: '52%', top: '76.8%', width: '44%', height: '20.2%' }}
              onClick={() => setPinnedCard(pinnedCard === 'languages' ? null : 'languages')}
              role="region"
              aria-label="Zoomed view: Languages & Contact"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-1 mb-1">
                <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                  LANGUAGES & CONTACT
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/90">
                  🔍 Zoom
                </span>
              </div>

              <div className="text-[9.5px] sm:text-[11px] font-fredoka space-y-1 text-neutral-100">
                <p>
                  <strong>Fluent:</strong> English, Hindi, Bengali
                </p>
                <p>
                  <strong>Understanding:</strong> Assamese, Nepali
                </p>

                {/* Direct Action Links */}
                <div className="grid grid-cols-2 gap-1 pt-1 font-mono text-[9px] sm:text-[10px]">
                  <a
                    href="tel:9383049271"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded bg-black/30 hover:bg-black/50 border border-white/20 text-center truncate text-neutral-200 hover:text-white"
                  >
                    📞 9383049271
                  </a>
                  <a
                    href="mailto:ombiswasdhar@gmail.com"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded bg-black/30 hover:bg-black/50 border border-white/20 text-center truncate text-neutral-200 hover:text-white"
                  >
                    ✉️ Email
                  </a>
                  <a
                    href="https://instagram.com/jkitsnoah"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded bg-black/30 hover:bg-black/50 border border-white/20 text-center truncate text-neutral-200 hover:text-white"
                  >
                    📷 @jkitsnoah
                  </a>
                  <a
                    href="https://behance.net/OmBiswasXD"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded bg-black/30 hover:bg-black/50 border border-white/20 text-center truncate text-neutral-200 hover:text-white"
                  >
                    🎨 Behance
                  </a>
                </div>
              </div>
            </div>

            {/* ================= 5. HOVER ZOOM CARD: PHILOSOPHY ================= */}
            <div
              className={`cv-zoom-card bg-[#BA1F1F]/95 text-white p-3.5 sm:p-4 flex flex-col justify-between border-2 border-yellow-300 shadow-2xl ${
                pinnedCard === 'philosophy' ? 'is-active' : ''
              }`}
              style={{ left: '4.8%', top: '3.5%', width: '35%', height: '19%' }}
              onClick={() => setPinnedCard(pinnedCard === 'philosophy' ? null : 'philosophy')}
              role="region"
              aria-label="Zoomed view: Philosophy"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-1">
                <span className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                  MY PHILOSOPHY
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white">
                  🔍 Zoom
                </span>
              </div>
              <p className="font-script text-lg sm:text-xl md:text-2xl font-bold text-yellow-300 leading-tight py-1">
                Keep Upgrading. Keep Evolving. ALWAYS at your Own pace.
              </p>
            </div>

            {/* ================= 6. HOVER ZOOM CARD: DESIGNER, EDUCATION & SOFTWARE ================= */}
            <div
              className={`cv-zoom-card bg-[#5268dc]/95 text-white p-3 sm:p-3.5 flex flex-col justify-between overflow-y-auto ${
                pinnedCard === 'designer' ? 'is-active' : ''
              }`}
              style={{ left: '41.5%', top: '3.5%', width: '53%', height: '19%' }}
              onClick={() => setPinnedCard(pinnedCard === 'designer' ? null : 'designer')}
              role="region"
              aria-label="Zoomed view: Education and Software"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-1 mb-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-xs sm:text-sm uppercase text-white">
                    DESIGNER 21 y.o
                  </span>
                  <span className="text-[9px] font-mono text-yellow-300">
                    Symbiosis Design
                  </span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/90">
                  🔍 Zoom
                </span>
              </div>

              <p className="text-[9.5px] sm:text-[10.5px] font-fredoka text-neutral-100 leading-tight">
                B.Des in User Interface & User Experience AND Product Design
              </p>

              {/* Software Icons Row */}
              <div className="flex items-center gap-1.5 pt-1 overflow-x-auto select-none">
                <ProcreateIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <SketchbookIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <FigmaIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <PremierProIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <PhotoshopIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <IllustratorIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <ProcreateDreamsIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <CanvaIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* ================= SUBTLE HOTSPOTS FOR ACCENT DOODLES ================= */}
            {/* Crown Doodle near Om's Head */}
            <div
              className="absolute pointer-events-auto cursor-pointer group/crown z-20"
              style={{ left: '92.5%', top: '16.5%', width: '7%', height: '5.5%' }}
              title="Crown sticker"
            >
              <div className="w-full h-full animate-float-gentle transition-transform group-hover/crown:scale-125 group-hover/crown:rotate-12" />
            </div>

            {/* Orange Action Doodle near Om's Ear */}
            <div
              className="absolute pointer-events-auto cursor-pointer group/action z-20"
              style={{ left: '71.5%', top: '25.5%', width: '3%', height: '3%' }}
              title="Action marks"
            >
              <div className="w-full h-full animate-float-reverse transition-transform group-hover/action:scale-125 group-hover/action:-translate-y-1" />
            </div>

            {/* Yellow Hashtag Sticker Hotspot */}
            <div
              className="absolute cursor-pointer transition-transform duration-300 hover:rotate-12 hover:scale-125 z-20"
              style={{ left: '87%', top: '89.5%', width: '11%', height: '8%' }}
              title="#creative"
            />
          </div>
        </div>

        {/* ================= SCREEN READER & SEO ACCESSIBILITY ================= */}
        <div className="sr-only">
          <h2>Om Biswas — Curriculum Vitae</h2>
          <p>Age: 21 | Designer | Shillong, India</p>
          <p>Education: Symbiosis School of Planning Architecture and Design — B.Des in User Interface & User Experience AND Product Design</p>
          <p>Philosophy: Keep Upgrading. Keep Evolving. ALWAYS at your Own pace.</p>
          <p>Software: Procreate, Sketchbook, Figma, Premiere Pro, Photoshop, Illustrator, Procreate Dreams, Canva</p>
          <p>Experience: Sports Council Head, Workshop at government school, Graphics Designer at Mentorsity</p>
          <p>Interests: Badminton, Table Tennis, Football, Basketball, Sketching, Animation, Gaming, Guitar, Traveling</p>
          <p>Languages: Fluent in English, Hindi, Bengali. Understanding: Assamese, Nepali</p>
          <p>Contact: Phone: 9383049271 | Email: ombiswasdhar@gmail.com | Instagram: @jkitsnoah | Behance: OmBiswasXD</p>
        </div>
      </div>
    </section>
  )
}
