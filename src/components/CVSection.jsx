import React, { useState, useRef } from 'react'
import cvFullFrame from '../assets/cv/cv_full_frame.png'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * CVSection
 * 
 * Curriculum Vitae / Resume presented as an interactive bulletin poster
 * matching the Figma frame (node 373-908) with:
 * - 3D responsive mouse tilt & specular sheen reflection
 * - Interactive software icon tooltips & glow
 * - Clickable contact links (Phone, Email, Instagram, Behance)
 * - Animated crown & comic doodles
 * - Download & Print action bar
 * - Mobile-friendly responsive view
 */
export default function CVSection() {
  const containerRef = useRef(null)
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false, px: 0.5, py: 0.5 })
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [activeTooltip, setActiveTooltip] = useState(null)

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    const tiltX = (py - 0.5) * -12
    const tiltY = (px - 0.5) * 12

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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[880px] mx-auto mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 text-neutral-400">
              Curriculum Vitae
            </span>
            <span className="w-2 h-2 rounded-full bg-[#BA1F1F] animate-pulse" />
          </div>

          {/* Action Bar: Download CV, Print, Copy Email */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/15 text-xs font-mono text-neutral-300 hover:text-white hover:border-red-500/50 hover:bg-neutral-800 transition-all active:scale-95 shadow-md"
              title="Copy Email Address"
            >
              <span>{copiedEmail ? '✓ Copied!' : 'Copy Email'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/15 text-xs font-mono text-neutral-300 hover:text-white hover:border-red-500/50 hover:bg-neutral-800 transition-all active:scale-95 shadow-md"
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
                className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-200"
                style={{
                  background: `radial-gradient(circle at ${(tilt.px || 0.5) * 100}% ${(tilt.py || 0.5) * 100}%, rgba(255,255,255,0.42) 0%, transparent 60%)`,
                }}
                aria-hidden="true"
              />
            )}

            {/* ================= INTERACTIVE HOTSPOT OVERLAYS ================= */}

            {/* 1. Philosophy Burst Hotspot */}
            <div
              className="absolute cursor-pointer group/philo rounded-2xl transition-all duration-300 hover:scale-105"
              style={{ left: '5.5%', top: '3.5%', width: '33%', height: '19.5%' }}
              title="Philosophy: Keep Upgrading. Keep Evolving. ALWAYS at your Own pace."
              tabIndex={0}
            >
              <div className="w-full h-full rounded-2xl hover:ring-2 hover:ring-yellow-400/50 hover:bg-yellow-400/5 transition-all" />
            </div>

            {/* 2. Software App Hotspots (Row 1 & Row 2) */}
            {/* Procreate */}
            <div
              className="absolute cursor-pointer rounded-lg transition-transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg"
              style={{ left: '44.8%', top: '15.4%', width: '5.6%', height: '3.8%' }}
              title="Procreate"
              onMouseEnter={() => setActiveTooltip('Procreate')}
              onMouseLeave={() => setActiveTooltip(null)}
            />
            {/* Sketchbook */}
            <div
              className="absolute cursor-pointer rounded-lg transition-transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg"
              style={{ left: '52.7%', top: '15.4%', width: '5.6%', height: '3.8%' }}
              title="Sketchbook"
              onMouseEnter={() => setActiveTooltip('Sketchbook')}
              onMouseLeave={() => setActiveTooltip(null)}
            />
            {/* Figma */}
            <div
              className="absolute cursor-pointer rounded-lg transition-transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg"
              style={{ left: '60.6%', top: '15.4%', width: '5.6%', height: '3.8%' }}
              title="Figma"
              onMouseEnter={() => setActiveTooltip('Figma')}
              onMouseLeave={() => setActiveTooltip(null)}
            />
            {/* Premiere Pro */}
            <div
              className="absolute cursor-pointer rounded-lg transition-transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg"
              style={{ left: '68.5%', top: '15.4%', width: '5.6%', height: '3.8%' }}
              title="Premier Pro"
              onMouseEnter={() => setActiveTooltip('Premier Pro')}
              onMouseLeave={() => setActiveTooltip(null)}
            />
            {/* Photoshop */}
            <div
              className="absolute cursor-pointer rounded-lg transition-transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg"
              style={{ left: '44.8%', top: '19.4%', width: '5.6%', height: '3.8%' }}
              title="Photoshop"
              onMouseEnter={() => setActiveTooltip('Photoshop')}
              onMouseLeave={() => setActiveTooltip(null)}
            />
            {/* Illustrator */}
            <div
              className="absolute cursor-pointer rounded-lg transition-transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg"
              style={{ left: '52.7%', top: '19.4%', width: '5.6%', height: '3.8%' }}
              title="Illustrator"
              onMouseEnter={() => setActiveTooltip('Illustrator')}
              onMouseLeave={() => setActiveTooltip(null)}
            />
            {/* Procreate Dreams */}
            <div
              className="absolute cursor-pointer rounded-lg transition-transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg"
              style={{ left: '60.6%', top: '19.4%', width: '5.6%', height: '3.8%' }}
              title="Procreate Dreams"
              onMouseEnter={() => setActiveTooltip('Procreate Dreams')}
              onMouseLeave={() => setActiveTooltip(null)}
            />
            {/* Canva */}
            <div
              className="absolute cursor-pointer rounded-lg transition-transform hover:scale-125 hover:-translate-y-1 hover:shadow-lg"
              style={{ left: '68.5%', top: '19.4%', width: '5.6%', height: '3.8%' }}
              title="Canva"
              onMouseEnter={() => setActiveTooltip('Canva')}
              onMouseLeave={() => setActiveTooltip(null)}
            />

            {/* Active Tooltip Pill */}
            {activeTooltip && (
              <div
                className="absolute z-30 pointer-events-none px-3 py-1 rounded-md bg-black/90 text-white text-[11px] font-mono shadow-xl border border-white/20 animate-fade-in"
                style={{ left: '50%', top: '12%', transform: 'translateX(-50%)' }}
              >
                {activeTooltip}
              </div>
            )}

            {/* 3. Crown Doodle near Om's Head */}
            <div
              className="absolute pointer-events-auto cursor-pointer group/crown"
              style={{ left: '92.5%', top: '16.5%', width: '7%', height: '5.5%' }}
              title="Crown sticker"
            >
              <div className="w-full h-full animate-float-gentle transition-transform group-hover/crown:scale-125 group-hover/crown:rotate-12" />
            </div>

            {/* 4. Orange Action Doodle near Om's Ear */}
            <div
              className="absolute pointer-events-auto cursor-pointer group/action"
              style={{ left: '71.5%', top: '25.5%', width: '3%', height: '3%' }}
              title="Action marks"
            >
              <div className="w-full h-full animate-float-reverse transition-transform group-hover/action:scale-125 group-hover/action:-translate-y-1" />
            </div>

            {/* 5. Mentorsity Experience Hotspot */}
            <a
              href="https://mentorsity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute cursor-pointer rounded-lg transition-all hover:bg-white/10 hover:ring-1 hover:ring-white/40"
              style={{ left: '43.5%', top: '71.5%', width: '18.5%', height: '3.8%' }}
              title="Visit Mentorsity"
              aria-label="Visit Mentorsity"
            />

            {/* 6. Contact Information Clickable Hotspots (Bottom Right) */}
            {/* Phone */}
            <a
              href="tel:9383049271"
              className="absolute cursor-pointer rounded-md transition-all hover:bg-white/15 hover:ring-1 hover:ring-white/30"
              style={{ left: '57.5%', top: '86.4%', width: '25%', height: '2.5%' }}
              title="Call: 9383049271"
              aria-label="Phone: 9383049271"
            />
            {/* Email */}
            <a
              href="mailto:ombiswasdhar@gmail.com"
              className="absolute cursor-pointer rounded-md transition-all hover:bg-white/15 hover:ring-1 hover:ring-white/30"
              style={{ left: '57.5%', top: '89.1%', width: '34%', height: '2.5%' }}
              title="Email: ombiswasdhar@gmail.com"
              aria-label="Email: ombiswasdhar@gmail.com"
            />
            {/* Instagram */}
            <a
              href="https://instagram.com/jkitsnoah"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute cursor-pointer rounded-md transition-all hover:bg-white/15 hover:ring-1 hover:ring-white/30"
              style={{ left: '57.5%', top: '91.6%', width: '22%', height: '2.5%' }}
              title="Instagram: @jkitsnoah"
              aria-label="Instagram: @jkitsnoah"
            />
            {/* Behance */}
            <a
              href="https://behance.net/OmBiswasXD"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute cursor-pointer rounded-md transition-all hover:bg-white/15 hover:ring-1 hover:ring-white/30"
              style={{ left: '57.5%', top: '94.0%', width: '23%', height: '2.5%' }}
              title="Behance: OmBiswasXD"
              aria-label="Behance: OmBiswasXD"
            />

            {/* 7. Yellow Hashtag Sticker Hotspot */}
            <div
              className="absolute cursor-pointer transition-transform duration-300 hover:rotate-12 hover:scale-125"
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
