import React, { useState, useRef, useEffect } from 'react'
import cvFullFrame from '../assets/cv/cv_full_frame.png'
import philosophyCardImg from '../assets/cv/philosophy_card_2x.png'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ComicTapHintBubble from './ComicTapHintBubble'
import {
  FileDown,
  FileText,
  Eye,
  ExternalLink,
  X,
  Printer,
} from 'lucide-react'
import {
  ProcreateIcon,
  SketchbookIcon,
  FigmaIcon,
  PremierProIcon,
  AntigravityIcon,
  VSCodeIcon,
  AfterEffectsIcon,
  PhotoshopIcon,
  IllustratorIcon,
  CanvaIcon,
  ProcreateDreamsIcon,
  InstagramIcon,
  PhoneIcon,
  MailIcon,
  BehanceIcon,
  LinkedInIcon,
} from './SkillIcons'

/**
 * CVSection
 * 
 * Curriculum Vitae / Resume presented as an interactive bulletin poster
 * matching the Figma frame (node 373-908) with:
 * - 3D responsive mouse tilt & specular sheen reflection
 * - Comic Tap-To-Zoom: Hovering/tapping any section (Philosophy, Designer/Software,
 *   About Me, Experience, Interests, Languages/Contact) magnifies that section
 *   with comic outline & 3D shadow aesthetic, identical to About Me paragraph zoom.
 * - Fredoka typography throughout all zoomed cards and action buttons.
 * - Interactive contact hotspots (Phone, Email, Instagram, Behance) & Mentorsity link
 * - Download & Print action bar
 */
export default function CVSection() {
  const containerRef = useRef(null)
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false, px: 0.5, py: 0.5 })
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [pinnedCard, setPinnedCard] = useState(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Escape key and scroll lock for preview modal
  useEffect(() => {
    if (!isPreviewOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsPreviewOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isPreviewOpen])

  // Tap outside any zoom card to dismiss back to resting poster state (identical to About Me)
  useEffect(() => {
    if (pinnedCard === null) return

    const handleOutsideTap = (e) => {
      if (!e.target.closest('.cv-zoom-card') && !e.target.closest('.comic-tap-hint')) {
        setPinnedCard(null)
      }
    }

    document.addEventListener('click', handleOutsideTap)
    document.addEventListener('touchstart', handleOutsideTap, { passive: true })
    return () => {
      document.removeEventListener('click', handleOutsideTap)
      document.removeEventListener('touchstart', handleOutsideTap)
    }
  }, [pinnedCard])

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
    navigator.clipboard.writeText('ombiswasatwork@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.open('/Om_Biswas_Professional_CV.pdf', '_blank')
    }
  }

  const toggleCard = (cardKey, e) => {
    if (e) e.stopPropagation()
    setPinnedCard(prev => (prev === cardKey ? null : cardKey))
  }

  return (
    <section
      id="cv"
      aria-label="Curriculum Vitae / Resume section"
      className="relative w-full bg-black/75 text-white select-none overflow-hidden pt-12 sm:pt-16 pb-20 sm:pb-24 md:pb-28 scroll-mt-14 sm:scroll-mt-16 font-fredoka"
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
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-fredoka font-semibold uppercase tracking-widest bg-white/5 border border-white/10 text-neutral-300">
              Curriculum Vitae
            </span>
            <span className="w-2 h-2 rounded-full bg-[#BA1F1F] animate-pulse" />
            <ComicTapHintBubble
              text="tap any section to zoom in"
              active={pinnedCard !== null}
              onClick={(e) => {
                e.stopPropagation()
                setPinnedCard(prev => (prev === null ? 'philosophy' : null))
              }}
            />
          </div>

          {/* Action Bar: Download Professional CV, Preview, Creative Poster, Print, Copy Email */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center font-fredoka">

            <button
              type="button"
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-neutral-900/80 border border-white/15 text-xs font-fredoka font-medium text-neutral-300 hover:text-white hover:border-red-500/50 hover:bg-neutral-800 transition-all active:scale-95 shadow-md cursor-pointer min-h-[38px]"
              title="Copy Email Address (ombiswasatwork@gmail.com)"
            >
              <span>{copiedEmail ? '✓ Copied!' : 'Copy Email'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-neutral-900/80 border border-white/15 text-xs font-fredoka font-medium text-neutral-300 hover:text-white hover:border-red-500/50 hover:bg-neutral-800 transition-all active:scale-95 shadow-md cursor-pointer min-h-[38px]"
              title="Print Professional CV or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-400" />
              <span>Print</span>
            </button>

            <a
              href={cvFullFrame}
              download="Om_Biswas_Creative_CV_Poster.png"
              className="group inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-neutral-900/80 border border-white/15 text-xs font-fredoka font-medium text-neutral-300 hover:text-white hover:border-white/30 hover:bg-neutral-800 transition-all active:scale-95 shadow-md cursor-pointer min-h-[38px]"
              title="Download illustrated creative bulletin poster (PNG)"
            >
              <span>Creative Poster</span>
              <span className="text-neutral-400 group-hover:text-white transition-colors">↓</span>
            </a>

            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="group inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-neutral-900/90 border border-white/20 text-xs font-fredoka font-medium text-neutral-200 hover:text-white hover:border-red-500/50 hover:bg-neutral-800 transition-all active:scale-95 shadow-md cursor-pointer min-h-[38px]"
              title="Preview Professional CV"
            >
              <Eye className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
              <span>Preview CV</span>
            </button>

            <a
              href="/Om_Biswas_Professional_CV.pdf"
              download="Om_Biswas_Professional_CV.pdf"
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#BA1F1F] hover:bg-red-600 text-white text-xs font-fredoka font-bold tracking-wide shadow-[0_4px_16px_rgba(186,31,31,0.5)] hover:shadow-[0_6px_24px_rgba(186,31,31,0.75)] hover:scale-105 active:scale-95 transition-all min-h-[38px] cursor-pointer"
              title="Download Professional ATS-Friendly CV (PDF)"
            >
              <FileDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>Download Professional CV</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/95">PDF</span>
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
            className="relative w-full aspect-[1003/1500] bg-[#8499FF] transition-transform ease-out will-change-transform"
            style={{
              transform: tilt.isHovered && !pinnedCard
                ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
                : 'rotateX(0deg) rotateY(0deg) scale(1)',
              transition: tilt.isHovered && !pinnedCard ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
            }}
          >
            {/* Pristine Full Figma Frame Graphic */}
            <img
              src={cvFullFrame}
              alt="Om Biswas - Curriculum Vitae: Designer, 22 y.o, Symbiosis Institute of Design , Nagpur. Experience, Skills, and Interests."
              className="w-full h-full object-contain pointer-events-none select-none"
            />

            {/* Dynamic Specular Sheen Light Reflection across the glossy poster on tilt */}
            {tilt.isHovered && !pinnedCard && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-200 z-10"
                style={{
                  background: `radial-gradient(circle at ${(tilt.px || 0.5) * 100}% ${(tilt.py || 0.5) * 100}%, rgba(255,255,255,0.42) 0%, transparent 60%)`,
                }}
                aria-hidden="true"
              />
            )}

            {/* ================= 1. HOVER ZOOM: MY PHILOSOPHY ================= */}
            <div
              className={`cv-zoom-card cv-zoom-card--philosophy p-0 shadow-2xl overflow-hidden font-fredoka ${
                pinnedCard === 'philosophy' ? 'is-active' : ''
              }`}
              style={{
                left: '2.92%',
                top: '1.85%',
                width: '38.60%',
                height: '21.00%',
                transformOrigin: 'top left',
              }}
              onClick={(e) => toggleCard('philosophy', e)}
              role="region"
              aria-label="Zoomed view: Philosophy - Keep Upgrading. Keep Evolving. ALWAYS at your Own pace."
            >
              <img
                src={philosophyCardImg}
                alt="My Philosophy: Keep Upgrading. Keep Evolving. ALWAYS at your Own pace."
                className="w-full h-full object-fill pointer-events-none select-none rounded-[16px]"
              />
              <span className="sr-only">
                MY PHILOSOPHY: Keep Upgrading. Keep Evolving. ALWAYS at your Own pace.
              </span>
            </div>

            {/* ================= 2. HOVER ZOOM: DESIGNER & SOFTWARE ================= */}
            <div
              className={`cv-zoom-card bg-[#1e2024] text-white p-3 sm:p-3.5 md:p-4 flex flex-col justify-between font-fredoka ${
                pinnedCard === 'designer' ? 'is-active' : ''
              }`}
              style={{
                left: '41.2%',
                top: '3.5%',
                width: '54.0%',
                height: '19.8%',
                transformOrigin: 'top right',
              }}
              onClick={(e) => toggleCard('designer', e)}
              role="region"
              aria-label="Zoomed view: Designer, Education and Software"
            >
              <div className="flex items-start justify-between gap-2 border-b border-white/20 pb-1">
                <div>
                  <h3 className="font-fredoka font-bold text-xs sm:text-sm md:text-base uppercase text-white leading-none tracking-wide">
                    DESIGNER
                  </h3>
                  <span className="text-[10px] sm:text-xs font-semibold text-neutral-200">
                    22 y.o
                  </span>
                </div>
                <div className="text-right text-[9.5px] sm:text-[11px] leading-tight select-text font-fredoka">
                  <p className="text-neutral-200">
                    From <strong className="text-white font-bold">Symbiosis Institute of Design , Nagpur</strong>
                  </p>
                  <p className="text-neutral-300 text-[8.5px] sm:text-[10px] pt-0.5">
                    B.Des in User Interface & User Experience AND Product Design
                  </p>
                </div>
              </div>

              <div className="pt-0.5">
                <div className="flex items-center justify-between pb-1">
                  <span className="font-fredoka font-bold text-[10px] sm:text-xs uppercase tracking-wider text-white">
                    SOFTWARE
                  </span>
                </div>
                <div className="space-y-1 sm:space-y-1.5 select-none py-0.5 w-full">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap">
                    <ProcreateIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                    <SketchbookIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                    <FigmaIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                    <PremierProIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                    <AntigravityIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                    <VSCodeIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap">
                    <AfterEffectsIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                    <IllustratorIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                    <ProcreateDreamsIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                    <CanvaIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* ================= 3. HOVER ZOOM: ABOUT ME (OM BISWAS) ================= */}
            <div
              className={`cv-zoom-card bg-[#1e2024] text-white p-3.5 sm:p-5 flex flex-col justify-between font-fredoka ${
                pinnedCard === 'about' ? 'is-active' : ''
              }`}
              style={{
                left: '4.8%',
                top: '22.8%',
                width: '57.5%',
                height: '29.8%',
                transformOrigin: 'left center',
              }}
              onClick={(e) => toggleCard('about', e)}
              role="region"
              aria-label="Zoomed view: About Om Biswas"
            >
              <h2 className="font-fredoka text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide pb-1 border-b border-white/20">
                Om Biswas
              </h2>

              <div className="space-y-1.5 sm:space-y-2 text-[9.5px] sm:text-[11.5px] md:text-[12.5px] font-fredoka font-normal leading-snug text-neutral-100 select-text">
                <p>
                  <span className="font-fredoka font-bold text-xs sm:text-sm text-white uppercase">HELLO</span> , my name is Om , a designer / illustrator / artist based in <strong className="text-white font-bold">SHILLONG , INDIA</strong>.
                </p>
                <p>
                  <span className="font-fredoka font-bold text-xs sm:text-sm">Since</span> 8th grade, my passion for illustration, character design, and visual storytelling has continued to grow. Over the years, this creative interest has expanded into UI/UX design, graphic design, 3D, and product design.
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
              className={`cv-zoom-card bg-[#1e2024] text-white p-3.5 sm:p-4 md:p-5 flex flex-col justify-between font-fredoka ${
                pinnedCard === 'experience' ? 'is-active' : ''
              }`}
              style={{
                left: '4.8%',
                top: '52.8%',
                width: '57.5%',
                height: '23.8%',
                transformOrigin: 'left center',
              }}
              onClick={(e) => toggleCard('experience', e)}
              role="region"
              aria-label="Zoomed view: Experience"
            >
              <h3 className="font-fredoka font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase text-white pb-1 border-b border-white/20">
                MY EXPERIENCE
              </h3>

              <div className="space-y-1.5 sm:space-y-2 pt-1 text-[9.5px] sm:text-[11px] md:text-[12px] font-fredoka leading-tight text-neutral-100 select-text">
                <div>
                  <h4 className="font-bold text-white text-[10.5px] sm:text-[12px] font-fredoka">
                    1. Sports Council Head :
                  </h4>
                  <ul className="list-disc list-inside text-neutral-200 pl-1 space-y-0.5 text-[8.5px] sm:text-[10px] font-fredoka">
                    <li>Designed posters and promotional materials for college sports and other events.</li>
                    <li>Helped organize and manage sports tournaments and activities.</li>
                    <li>Collaborated with teams to ensure smooth execution and maximum participation.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white text-[10px] sm:text-[11.5px] font-fredoka">
                    2. Member of Placement Cell.
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-white text-[10px] sm:text-[11.5px] font-fredoka">
                    3. Conducted a workshop at a government school, sharing skills and guiding students.
                  </h4>
                </div>

                <div className="flex items-center justify-between gap-2 pt-0.5 font-fredoka">
                  <h4 className="font-bold text-white text-[10px] sm:text-[11.5px]">
                    4. Worked as a Graphics Designer at Mentorsity
                  </h4>
                  <a
                    href="https://mentorsity.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-400 hover:bg-yellow-300 text-black font-fredoka font-bold text-[9px] sm:text-[10px] tracking-wide transition-all shadow shrink-0"
                  >
                    <span>Mentorsity ↗</span>
                  </a>
                </div>

                <div className="flex items-center justify-between gap-2 pt-0.5 font-fredoka">
                  <h4 className="font-bold text-white text-[10px] sm:text-[11.5px]">
                    5. Re-designed a website from ground up for PLAYSTAPLES
                  </h4>
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.stopPropagation()
                      const el = document.getElementById('featured-works') || document.getElementById('work')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-fredoka font-bold text-[9px] sm:text-[10px] tracking-wide transition-all shadow shrink-0"
                  >
                    <span>PlayStaples ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ================= 5. HOVER ZOOM: INTERESTS ================= */}
            <div
              className={`cv-zoom-card bg-[#1e2024] text-white p-3.5 sm:p-4 flex flex-col justify-between font-fredoka ${
                pinnedCard === 'interests' ? 'is-active' : ''
              }`}
              style={{
                left: '4.8%',
                top: '76.6%',
                width: '49.8%',
                height: '20.4%',
                transformOrigin: 'bottom left',
              }}
              onClick={(e) => toggleCard('interests', e)}
              role="region"
              aria-label="Zoomed view: Interests"
            >
              <h3 className="font-fredoka font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase text-white pb-1 border-b border-white/20">
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
              className={`cv-zoom-card bg-[#1e2024] text-white p-3 sm:p-3.5 flex flex-col justify-between font-fredoka ${
                pinnedCard === 'languages' ? 'is-active' : ''
              }`}
              style={{
                left: '55.0%',
                top: '76.6%',
                width: '39.5%',
                height: '20.4%',
                transformOrigin: 'bottom right',
              }}
              onClick={(e) => toggleCard('languages', e)}
              role="region"
              aria-label="Zoomed view: Languages and Contact"
            >
              <h3 className="font-fredoka font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase text-white pb-0.5 border-b border-white/20">
                LANGUAGES
              </h3>

              <div className="text-[9.5px] sm:text-[11px] font-fredoka space-y-0.5 text-neutral-100 pt-0.5 select-text">
                <p><strong className="text-white font-bold">Fluent :</strong> English , Hindi , Bengali.</p>
                <p><strong className="text-white font-bold">Understanding :</strong> Assamese , Nepali</p>
              </div>

              <div className="pt-1 space-y-1 text-[9px] sm:text-[10px] font-fredoka">
                <a
                  href="tel:9383049271"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-2 py-0.5 rounded bg-black/40 hover:bg-black/60 border border-white/20 text-neutral-100 hover:text-white transition-colors"
                  title="Call 9383049271"
                >
                  <PhoneIcon className="w-4 h-4 shrink-0 shadow-sm" />
                  <span className="truncate">: 9383049271</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full flex items-center gap-2 px-2 py-0.5 rounded bg-black/40 hover:bg-black/60 border border-white/20 text-neutral-100 hover:text-white transition-colors text-left cursor-pointer"
                  title="Copy ombiswasatwork@gmail.com"
                >
                  <MailIcon className="w-4 h-4 shrink-0 shadow-sm" />
                  <span className="truncate">: {copiedEmail ? '✓ Copied!' : 'ombiswasatwork@gmail.com'}</span>
                </button>
                <a
                  href="https://www.linkedin.com/in/ombiswasxd"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-2 py-0.5 rounded bg-black/40 hover:bg-black/60 border border-white/20 text-neutral-100 hover:text-white transition-colors"
                  title="LinkedIn: ombiswasxd"
                >
                  <LinkedInIcon className="w-4 h-4 shrink-0 shadow-sm" />
                  <span className="truncate">: ombiswasxd</span>
                </a>
                <a
                  href="https://instagram.com/jkitsnoah"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-2 py-0.5 rounded bg-black/40 hover:bg-black/60 border border-white/20 text-neutral-100 hover:text-white transition-colors"
                  title="Instagram: @jkitsnoah"
                >
                  <InstagramIcon className="w-4 h-4 shrink-0 shadow-sm" />
                  <span className="truncate">: @jkitsnoah</span>
                </a>
                <a
                  href="https://behance.net/OmBiswasXD"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-2 py-0.5 rounded bg-black/40 hover:bg-black/60 border border-white/20 text-neutral-100 hover:text-white transition-colors"
                  title="Behance: OmBiswasXD"
                >
                  <BehanceIcon className="w-4 h-4 shrink-0 shadow-sm" />
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

        {/* ================= RECRUITER / ATS PROFESSIONAL CV BANNER ================= */}
        <div className="max-w-[760px] mx-auto mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/80 to-neutral-900/90 border border-white/10 backdrop-blur-sm shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[#BA1F1F] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-fredoka font-semibold text-white">Looking for my formal resume?</span>
                <span className="text-[10px] font-fredoka font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  ATS Ready
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-fredoka mt-0.5">
                Standard 1-page clean CV with full work experience, skills, education & achievements.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end font-fredoka">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-medium text-neutral-200 hover:text-white transition-all active:scale-95 cursor-pointer"
              title="Preview Professional CV"
            >
              <Eye className="w-3.5 h-3.5 text-neutral-400" />
              <span>Preview</span>
            </button>
            <a
              href="/Om_Biswas_Professional_CV.pdf"
              download="Om_Biswas_Professional_CV.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#BA1F1F] hover:bg-red-600 text-white text-xs font-bold shadow-[0_4px_14px_rgba(186,31,31,0.4)] hover:shadow-[0_6px_20px_rgba(186,31,31,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Download Professional CV (PDF)"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* ================= SCREEN READER & SEO ACCESSIBILITY ================= */}
        <div className="sr-only">
          <h2>Om Biswas — Curriculum Vitae</h2>
          <p>Age: 22 | Designer | Shillong, India</p>
          <p>Education: Symbiosis Institute of Design , Nagpur — B.Des in User Interface & User Experience AND Product Design</p>
          <p>Philosophy: Keep Upgrading. Keep Evolving. ALWAYS at your Own pace.</p>
          <p>Software: Procreate, Sketchbook, Figma, Premiere Pro, Antigravity, VS Code, After Effects, Illustrator, Procreate Dreams, Canva</p>
          <p>Experience: Sports Council Head, Member of Placement Cell, Conducted workshop at government school, Graphics Designer at Mentorsity, Re-designed website for PLAYSTAPLES</p>
          <p>Interests: Badminton, Table Tennis, Football, Basketball, Sketching, Animation, Gaming, Guitar, Traveling</p>
          <p>Languages: Fluent in English, Hindi, Bengali. Understanding: Assamese, Nepali</p>
          <p>Contact: Phone: 9383049271 | Email: ombiswasatwork@gmail.com | LinkedIn: ombiswasxd | Instagram: @jkitsnoah | Behance: OmBiswasXD</p>
          <p><a href="/Om_Biswas_Professional_CV.pdf">Download Om Biswas Professional CV (PDF)</a></p>
        </div>
      </div>

      {/* ================= PROFESSIONAL CV PREVIEW MODAL ================= */}
      {isPreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Om Biswas Professional CV Preview"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl h-[92vh] max-h-[920px] bg-[#141518] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-neutral-900/90">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-[#BA1F1F]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold font-fredoka text-white">Om Biswas — Professional CV</h3>
                    <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-fredoka font-semibold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      ATS Ready
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-fredoka">UI/UX & Product Designer • 1-Page Formal Resume</p>
                </div>
              </div>

              {/* Action Buttons in Modal Header */}
              <div className="flex items-center gap-2 font-fredoka">
                <a
                  href="/Om_Biswas_Professional_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-neutral-200 hover:text-white transition-colors"
                  title="Open in new window"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Tab</span>
                </a>
                <a
                  href="/Om_Biswas_Professional_CV.pdf"
                  download="Om_Biswas_Professional_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#BA1F1F] hover:bg-red-600 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                  title="Download Professional CV PDF"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors ml-1 cursor-pointer"
                  title="Close Preview (Esc)"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: PDF Viewer */}
            <div className="relative flex-1 w-full bg-neutral-950 overflow-hidden flex flex-col">
              <iframe
                src="/Om_Biswas_Professional_CV.pdf#toolbar=1&navpanes=0"
                title="Om Biswas Professional CV"
                className="w-full flex-1 border-0"
              />
              {/* Mobile / Fallback Footer */}
              <div className="sm:hidden px-4 py-2.5 bg-neutral-900 border-t border-white/10 flex items-center justify-between text-xs font-fredoka text-neutral-400">
                <span>PDF preview restricted on mobile?</span>
                <a
                  href="/Om_Biswas_Professional_CV.pdf"
                  download="Om_Biswas_Professional_CV.pdf"
                  className="text-red-400 hover:text-red-300 font-bold underline"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
