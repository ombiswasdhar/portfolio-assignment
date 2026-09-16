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
 * - Authentic Section Zoom: Hovering/tapping any section (Philosophy, Designer/Software,
 *   About Me, Experience, Interests, Languages/Contact) magnifies that exact portion of
 *   the original poster artwork with 100% fidelity without altering fonts, colors, or layouts.
 * - Interactive contact hotspots (Phone, Email, Instagram, Behance) & Mentorsity link
 * - Animated crown & comic doodles
 * - Download & Print action bar
 */
export default function CVSection() {
  const containerRef = useRef(null)
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false, px: 0.5, py: 0.5 })
  const [copiedEmail, setCopiedEmail] = useState(false)
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
      className="relative w-full bg-black/75 text-white select-none overflow-hidden pt-12 sm:pt-16 pb-20 sm:pb-24 md:pb-28"
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

            {/* ================= 1. HOVER ZOOM: MY PHYLOSOPHY ================= */}
            <div
              className={`cv-zoom-card bg-[#BA1F1F] text-white p-4 sm:p-5 flex flex-col justify-between shadow-2xl ${
                pinnedCard === 'philosophy' ? 'is-active' : ''
              }`}
              style={{
                left: '4.8%',
                top: '3.5%',
                width: '35.8%',
                height: '19.0%',
                transformOrigin: 'top left',
                background: 'radial-gradient(circle at 45% 45%, #cf2525 0%, #a81717 60%, #850f0f 100%)',
              }}
              onClick={() => setPinnedCard(pinnedCard === 'philosophy' ? null : 'philosophy')}
              role="region"
              aria-label="Zoomed view: Philosophy"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-1">
                <h3 className="font-display font-extrabold text-xs sm:text-sm md:text-base tracking-wider uppercase text-white">
                  MY PHYLOSOPHY
                </h3>
              </div>
              <div className="font-script text-lg sm:text-2xl md:text-3xl font-bold text-yellow-300 leading-tight py-1 select-text">
                <p>Keep Upgrading.</p>
                <p>Keep Evolving.</p>
                <p>ALWAYS at your</p>
                <p className="text-yellow-400">Own pace.</p>
              </div>
            </div>

            {/* ================= 2. HOVER ZOOM: DESIGNER & SOFTWARE ================= */}
            <div
              className={`cv-zoom-card bg-[#5066db] text-white p-3.5 sm:p-4 flex flex-col justify-between ${
                pinnedCard === 'designer' ? 'is-active' : ''
              }`}
              style={{
                left: '41.2%',
                top: '3.5%',
                width: '53.5%',
                height: '19.0%',
                transformOrigin: 'top right',
              }}
              onClick={() => setPinnedCard(pinnedCard === 'designer' ? null : 'designer')}
              role="region"
              aria-label="Zoomed view: Designer, Education and Software"
            >
              <div className="flex items-start justify-between gap-2 border-b border-white/20 pb-1">
                <div>
                  <h3 className="font-display font-black text-xs sm:text-sm md:text-base uppercase text-white leading-none">
                    DESIGNER
                  </h3>
                  <span className="text-[10px] sm:text-xs font-semibold text-neutral-200">
                    21 y.o
                  </span>
                </div>
                <div className="text-right text-[9.5px] sm:text-[11px] leading-tight select-text">
                  <p className="text-neutral-200">
                    From <strong className="text-white font-bold">Symbiosis School of Planning Architecture and Design</strong>
                  </p>
                  <p className="text-neutral-300 text-[8.5px] sm:text-[10px] pt-0.5">
                    B.Des in User Interface & User Experience AND Product Design
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <div className="flex items-center justify-between pb-1">
                  <span className="font-display font-bold text-[10px] sm:text-xs uppercase tracking-wider text-white">
                    SOFTWARE
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 select-none py-0.5 w-fit">
                  <ProcreateIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  <SketchbookIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  <FigmaIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  <PremierProIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  <PhotoshopIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  <IllustratorIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  <ProcreateDreamsIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  <CanvaIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
              </div>
            </div>

            {/* ================= 3. HOVER ZOOM: ABOUT ME (OM BISWAS) ================= */}
            <div
              className={`cv-zoom-card bg-[#5066db] text-white p-3.5 sm:p-5 flex flex-col justify-between ${
                pinnedCard === 'about' ? 'is-active' : ''
              }`}
              style={{
                left: '4.8%',
                top: '22.8%',
                width: '57.5%',
                height: '29.8%',
                transformOrigin: 'left center',
              }}
              onClick={() => setPinnedCard(pinnedCard === 'about' ? null : 'about')}
              role="region"
              aria-label="Zoomed view: About Om Biswas"
            >
              <h2 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-black text-white italic tracking-wide pb-1 border-b border-white/20">
                Om Biswas
              </h2>

              <div className="space-y-1.5 sm:space-y-2 text-[9.5px] sm:text-[11.5px] md:text-[12.5px] font-fredoka font-normal leading-snug text-neutral-100 select-text">
                <p>
                  <span className="font-serif-display font-bold text-xs sm:text-sm text-white uppercase">HELLO</span> , my name is Om , a designer / illustrator / artist based in <strong className="text-white font-bold">SHILLONG , INDIA</strong>.
                </p>
                <p>
                  <span className="font-serif-display font-bold text-xs sm:text-sm">Since</span> 8th grade, my passion for illustration, character design, and visual storytelling has continued to grow. Over the years, this creative interest has expanded into UI/UX design, graphic design, 3D, and product design.
                </p>
                <p>
                  Always eager to explore new directions, I enjoy experimenting with different styles and mediums to express ideas in fresh, meaningful ways.
                </p>
                <p className="text-neutral-200">
                  Apart from design, I am a district-level badminton player and an active sports enthusiast. I'm also a Trinity College London–certified guitarist, which has helped me build discipline, focus, and a sense of balance that reflects in my creative work.
                </p>
              </div>
            </div>

            {/* ================= 4. HOVER ZOOM: MY EXPERIENCE ================= */}
            <div
              className={`cv-zoom-card bg-[#5066db] text-white p-3.5 sm:p-4 md:p-5 flex flex-col justify-between ${
                pinnedCard === 'experience' ? 'is-active' : ''
              }`}
              style={{
                left: '4.8%',
                top: '52.8%',
                width: '57.5%',
                height: '23.8%',
                transformOrigin: 'left center',
              }}
              onClick={() => setPinnedCard(pinnedCard === 'experience' ? null : 'experience')}
              role="region"
              aria-label="Zoomed view: Experience"
            >
              <h3 className="font-display font-black text-xs sm:text-sm md:text-base tracking-wider uppercase text-white pb-1 border-b border-white/20">
                MY EXPERIENCE
              </h3>

              <div className="space-y-2 pt-1 text-[9.5px] sm:text-[11px] md:text-[12px] font-fredoka leading-tight text-neutral-100 select-text">
                <div>
                  <h4 className="font-bold text-white text-[11px] sm:text-[12.5px]">
                    1. Sports Council Head
                  </h4>
                  <ul className="list-disc list-inside text-neutral-200 pl-1 space-y-0.5 text-[9px] sm:text-[10.5px]">
                    <li>Designed posters and promotional materials for college sports and other events.</li>
                    <li>Helped organize and manage sports tournaments and activities.</li>
                    <li>Collaborated with teams to ensure smooth execution and maximum participation.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white text-[10.5px] sm:text-[12px]">
                    2. Conducted a workshop at a government school, sharing skills and guiding students.
                  </h4>
                </div>

                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <h4 className="font-bold text-white text-[10.5px] sm:text-[12px]">
                    3. Worked as a Graphics Designer at Mentorsity
                  </h4>
                  <a
                    href="https://mentorsity.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-400 hover:bg-yellow-300 text-black font-display font-bold text-[9px] sm:text-[10px] tracking-wide transition-all shadow"
                  >
                    <span>Mentorsity ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ================= 5. HOVER ZOOM: INTERESTS ================= */}
            <div
              className={`cv-zoom-card bg-[#5066db] text-white p-3.5 sm:p-4 flex flex-col justify-between ${
                pinnedCard === 'interests' ? 'is-active' : ''
              }`}
              style={{
                left: '4.8%',
                top: '76.6%',
                width: '49.8%',
                height: '20.4%',
                transformOrigin: 'bottom left',
              }}
              onClick={() => setPinnedCard(pinnedCard === 'interests' ? null : 'interests')}
              role="region"
              aria-label="Zoomed view: Interests"
            >
              <h3 className="font-display font-black text-xs sm:text-sm md:text-base tracking-wider uppercase text-white pb-1 border-b border-white/20">
                INTERESTS
              </h3>

              <div className="space-y-1.5 sm:space-y-2 pt-1 text-[9.5px] sm:text-[11px] md:text-[12px] font-fredoka leading-snug text-neutral-100 select-text">
                <p>
                  I'm passionate about both creativity and activity. I enjoy sports like badminton, table tennis, football, and basketball, which keep me energized and disciplined.
                </p>
                <p>
                  On the creative side, I love sketching, animating, gaming, playing the guitar, and watching movies. I'm also an avid traveler, always curious to explore new places, cultures, and experiences.
                </p>
              </div>
            </div>

            {/* ================= 6. HOVER ZOOM: LANGUAGES & CONTACT ================= */}
            <div
              className={`cv-zoom-card bg-[#5066db] text-white p-3 sm:p-3.5 flex flex-col justify-between ${
                pinnedCard === 'languages' ? 'is-active' : ''
              }`}
              style={{
                left: '55.0%',
                top: '76.6%',
                width: '39.5%',
                height: '20.4%',
                transformOrigin: 'bottom right',
              }}
              onClick={() => setPinnedCard(pinnedCard === 'languages' ? null : 'languages')}
              role="region"
              aria-label="Zoomed view: Languages and Contact"
            >
              <h3 className="font-display font-black text-xs sm:text-sm md:text-base tracking-wider uppercase text-white pb-0.5 border-b border-white/20">
                LANGUAGES
              </h3>

              <div className="text-[9.5px] sm:text-[11px] font-fredoka space-y-0.5 text-neutral-100 pt-0.5 select-text">
                <p><strong className="text-white font-bold">Fluent :</strong> English , Hindi , Bengali.</p>
                <p><strong className="text-white font-bold">Understanding :</strong> Assamese , Nepali</p>
              </div>

              <div className="pt-1 space-y-1 text-[9px] sm:text-[10px] font-mono">
                <a
                  href="tel:9383049271"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-2 py-0.5 rounded bg-black/30 hover:bg-black/50 border border-white/20 text-neutral-100 hover:text-white transition-colors"
                  title="Call 9383049271"
                >
                  <span className="w-4 h-4 rounded bg-blue-500 text-white flex items-center justify-center text-[9px] shrink-0">📞</span>
                  <span className="truncate">: 9383049271</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full flex items-center gap-2 px-2 py-0.5 rounded bg-black/30 hover:bg-black/50 border border-white/20 text-neutral-100 hover:text-white transition-colors text-left cursor-pointer"
                  title="Copy ombiswasdhar@gmail.com"
                >
                  <span className="w-4 h-4 rounded bg-cyan-500 text-white flex items-center justify-center text-[9px] shrink-0">✉️</span>
                  <span className="truncate">: {copiedEmail ? '✓ Copied!' : 'ombiswasdhar@gmail.com'}</span>
                </button>
                <a
                  href="https://instagram.com/jkitsnoah"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-2 py-0.5 rounded bg-black/30 hover:bg-black/50 border border-white/20 text-neutral-100 hover:text-white transition-colors"
                  title="Instagram: @jkitsnoah"
                >
                  <span className="w-4 h-4 rounded bg-pink-500 text-white flex items-center justify-center text-[9px] shrink-0">📷</span>
                  <span className="truncate">: @jkitsnoah</span>
                </a>
                <a
                  href="https://behance.net/OmBiswasXD"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-2 py-0.5 rounded bg-black/30 hover:bg-black/50 border border-white/20 text-neutral-100 hover:text-white transition-colors"
                  title="Behance: OmBiswasXD"
                >
                  <span className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">Bē</span>
                  <span className="truncate">: OmBiswasXD</span>
                </a>
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
