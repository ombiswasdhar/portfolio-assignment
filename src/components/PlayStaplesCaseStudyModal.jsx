import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUp, ExternalLink, ZoomIn, Maximize2, CheckCircle2, Users, BarChart3, ShieldCheck } from 'lucide-react'

import heroPosterImg from '../assets/work/playstaples/playstaples-hero.png'
import cs01Img from '../assets/work/playstaples/playstaples-case-study-01.jpg'
import cs02Img from '../assets/work/playstaples/playstaples-case-study-02.jpg'
import cs04Img from '../assets/work/playstaples/playstaples-case-study-04.jpg'
import cs05Img from '../assets/work/playstaples/playstaples-case-study-05.jpg'
import cs06Img from '../assets/work/playstaples/playstaples-case-study-06.jpg'
import cs07Img from '../assets/work/playstaples/playstaples-case-study-07.jpg'
import cs08Img from '../assets/work/playstaples/playstaples-case-study-08.jpg'

export const PLAYSTAPLES_SECTIONS = [
  {
    id: 'ps-hero-poster',
    num: '01',
    title: 'Master Usability Testing Infographic',
    shortLabel: 'Hero Poster',
    category: 'Full Overview & Methodology',
    image: heroPosterImg,
    badge: 'HERO PAGE (UT A1 2)',
    description:
      'Complete usability evaluation synthesis including testing methodology, Nielsen heuristic audit, friction points, A/B testing matrix, and quantitative speed comparisons.',
  },
  {
    id: 'ps-study-overview',
    num: '02',
    title: 'Usability Testing & Study Overview',
    shortLabel: 'Testing Study',
    category: 'Research Framework',
    images: [cs01Img, cs02Img],
    badge: 'FRAME 490 · PART 1',
    description:
      'Detailed study breakdown covering student & elder demographic exhibits, unmoderated task protocols, and Nielsen heuristic evaluation findings.',
  },
  {
    id: 'ps-ab-participants',
    num: '03',
    title: 'A/B Testing: Participant Profiles & System A vs B',
    shortLabel: 'A/B Testing',
    category: 'Qualitative Evaluation',
    image: cs04Img,
    badge: 'FRAME 490 · PART 2',
    description:
      'Comparing baseline system [A] against redesigned system [B] across 5 participant personas with structured qualitative observations and task feedback.',
  },
  {
    id: 'ps-checkout-redesign',
    num: '04',
    title: 'Product Discovery & Checkout Flow Redesign',
    shortLabel: 'Checkout UX',
    category: 'Interaction Redesign',
    image: cs05Img,
    badge: 'BEFORE VS AFTER',
    description:
      'Resolving ambiguous car selection with clickable imagery and overhauling the generic template checkout into a branded, personalized purchase flow.',
  },
  {
    id: 'ps-navigation-catalog',
    num: '05',
    title: 'Catalog Navigation & Scroll Indicators',
    shortLabel: 'Catalog & Scroll',
    category: 'Information Architecture',
    image: cs06Img,
    badge: 'BEFORE VS AFTER',
    description:
      'Adding visible scrollbar progress cues, clear product labeling, and direct-to-product click affordances to eradicate navigation drop-offs.',
  },
  {
    id: 'ps-quantity-reviews',
    num: '06',
    title: 'Cart Quantity Control & Social Proof',
    shortLabel: 'Trust & Cart',
    category: 'Conversion Optimization',
    image: cs07Img,
    badge: 'BEFORE VS AFTER',
    description:
      'Enabling in-cart quantity modification (+/-) and introducing authentic customer reviews to overcome user hesitation and trust deficits.',
  },
  {
    id: 'ps-quantitative-metrics',
    num: '07',
    title: 'Quantitative Duration & Click Results',
    shortLabel: 'Metrics & Conclusion',
    category: 'Impact & Data',
    image: cs08Img,
    badge: 'RESULTS & METRICS',
    description:
      'Hard metrics proving 50%+ reduction in task duration (average dropped from 2m 45s down to 1m 20s) across all 5 test subjects with 3 clicks total.',
  },
]

export default function PlayStaplesCaseStudyModal({ onClose }) {
  const scrollContainerRef = useRef(null)
  const [activeZoomImage, setActiveZoomImage] = useState(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeZoomImage) {
          setActiveZoomImage(null)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, activeZoomImage])

  // Prevent background scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-xl overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={scrollContainerRef}
        className="relative w-full max-w-7xl h-[94vh] overflow-y-auto bg-[#0C0D11] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.98)] text-white flex flex-col"
      >
        {/* ================= STICKY TOP APP BAR ================= */}
        <header className="sticky top-0 z-40 bg-[#0C0D11]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 truncate">
            <span className="w-3 h-3 rounded-full bg-[#FFE500] shadow-[0_0_12px_#FFE500]" />
            <div className="flex flex-col truncate">
              <div className="flex items-center gap-2">
                <span className="font-akira text-sm sm:text-base font-black tracking-wider text-white">
                  PLAYSTAPLES
                </span>
                <span className="text-[10px] font-ca-mono bg-[#FFE500] text-black px-2 py-0.5 rounded font-bold uppercase">
                  UX CASE STUDY
                </span>
              </div>
              <span className="text-xs text-white/50 font-ca-mono truncate">
                Usability Testing & E-Commerce Redesign • By Om Biswas
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="https://www.figma.com/design/eHCTRQ3nwpXcfMDtlNUO9Q/PlayStaples--Copy-?node-id=474-5581&t=O1mLutYpZ2gweGkb-0"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-ca-mono font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#FFE500]" />
              Figma Board ↗
            </a>

            <button
              onClick={onClose}
              type="button"
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-red-600/80 hover:text-white text-white/70 border border-white/15 transition-all active:scale-95 cursor-pointer"
              title="Close Case Study (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* ================= STICKY SUB-NAV PILL BAR ================= */}
        <nav className="sticky top-[69px] z-30 bg-[#0E0F14]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-ca-mono text-white/40 uppercase tracking-widest shrink-0 pr-1">
            Jump to:
          </span>
          {PLAYSTAPLES_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              className="shrink-0 px-3 py-1 rounded-full text-xs font-ca-mono bg-white/5 hover:bg-[#FFE500] hover:text-black text-white/75 border border-white/10 hover:border-[#FFE500] transition-all cursor-pointer"
            >
              {sec.shortLabel}
            </button>
          ))}
        </nav>

        {/* ================= MODAL BODY CONTENT ================= */}
        <div className="p-4 sm:p-8 lg:p-12 space-y-16 flex-1">
          {/* INTRO HERO BANNER */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#161720] to-[#0A0A0E] p-6 sm:p-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE500]/10 border border-[#FFE500]/30 text-[#FFE500] text-xs font-ca-mono font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Human-Centered Usability Evaluation
              </div>

              <h1 className="font-akira text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase">
                PlayStaples Usability Testing & UX Redesign
              </h1>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
                A rigorous, multi-method usability evaluation of the PlayStaples e-commerce platform. Audited against Nielsen&apos;s 10 Usability Heuristics, conducted unmoderated testing with 5 diverse participants, and engineered an A/B tested checkout and catalog redesign that cut task completion duration in half.
              </p>

              {/* STATS QUICK CHIPS */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                  <div className="text-[10px] font-ca-mono text-white/50 uppercase">Participants</div>
                  <div className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Users className="w-4 h-4 text-[#FFE500]" /> 5 Users
                  </div>
                </div>
                <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                  <div className="text-[10px] font-ca-mono text-white/50 uppercase">Heuristics Audit</div>
                  <div className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> 10 Principles
                  </div>
                </div>
                <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                  <div className="text-[10px] font-ca-mono text-white/50 uppercase">Speed Improvement</div>
                  <div className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <BarChart3 className="w-4 h-4 text-rose-400" /> -50% Time
                  </div>
                </div>
                <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                  <div className="text-[10px] font-ca-mono text-white/50 uppercase">Final Clicks</div>
                  <div className="text-lg font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> 3 Clicks
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SECTION 01: HERO POSTER (UT A1 2) ================= */}
          <section id="ps-hero-poster" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-ca-mono text-[#FFE500] uppercase tracking-wider font-bold">
                  SECTION 01 // HERO PAGE (UT A1 2.PDF)
                </span>
                <h2 className="text-xl sm:text-2xl font-akira font-black uppercase text-white mt-1">
                  Master Usability Testing Infographic
                </h2>
              </div>
              <span className="text-xs font-ca-mono text-white/50">
                Click image to zoom full-screen ↗
              </span>
            </div>

            <div
              className="group relative rounded-2xl overflow-hidden border border-white/20 bg-black cursor-zoom-in shadow-2xl transition-all duration-300 hover:border-[#FFE500]/60"
              onClick={() => setActiveZoomImage(heroPosterImg)}
            >
              <img
                src={heroPosterImg}
                alt="PlayStaples Master Usability Testing Poster"
                className="w-full h-auto object-contain block mx-auto max-h-[85vh] transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-4 py-2 rounded-full bg-black/80 text-white font-ca-mono text-xs font-bold border border-white/30 flex items-center gap-2 shadow-2xl">
                  <ZoomIn className="w-4 h-4 text-[#FFE500]" /> Click to Zoom Full Image
                </span>
              </div>
            </div>
          </section>

          {/* ================= SECTION 02: FRAME 490 PART 1 (STUDY OVERVIEW) ================= */}
          <section id="ps-study-overview" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-ca-mono text-emerald-400 uppercase tracking-wider font-bold">
                  SECTION 02 // FRAME 490 · PART 1
                </span>
                <h2 className="text-xl sm:text-2xl font-akira font-black uppercase text-white mt-1">
                  Testing Methodology & Nielsen Heuristics
                </h2>
              </div>
              <span className="text-xs font-ca-mono text-white/50">
                High-Resolution Figma Artboard Slices
              </span>
            </div>

            <div className="space-y-2">
              {[cs01Img, cs02Img].map((imgSrc, i) => (
                <div
                  key={`study-${i}`}
                  className="group relative rounded-xl overflow-hidden border border-white/15 bg-black cursor-zoom-in shadow-xl hover:border-emerald-400/50 transition-colors"
                  onClick={() => setActiveZoomImage(imgSrc)}
                >
                  <img
                    src={imgSrc}
                    alt={`PlayStaples Case Study Frame 490 Slice ${i + 1}`}
                    className="w-full h-auto object-contain block"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/75 px-3 py-1 rounded-full text-[10px] font-ca-mono text-white/80 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to Zoom
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= SECTION 03: FRAME 490 PART 2 (A/B PARTICIPANTS) ================= */}
          <section id="ps-ab-participants" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-ca-mono text-rose-400 uppercase tracking-wider font-bold">
                  SECTION 03 // FRAME 490 · PART 2
                </span>
                <h2 className="text-xl sm:text-2xl font-akira font-black uppercase text-white mt-1">
                  A/B Testing & Qualitative User Feedback
                </h2>
              </div>
              <span className="text-xs font-ca-mono text-white/50">
                5 Participant Case Evaluations
              </span>
            </div>

            <div className="space-y-4">
              {[
                { img: cs04Img, label: 'Participant Cohort & Gilbert Paoliansiam' },
                { img: cs05Img, label: 'Ayaan Ahmad & Checkout Page Redesign' },
                { img: cs06Img, label: 'Mayank Chandak & Sangeeta Dhar Catalog Fixes' },
                { img: cs07Img, label: 'Santanu Biswas, Quantity Controls & Social Proof' },
              ].map((item, idx) => (
                <div key={`ab-slice-${idx}`} className="space-y-2">
                  <div className="text-xs font-ca-mono text-white/60 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    {item.label}
                  </div>
                  <div
                    className="group relative rounded-xl overflow-hidden border border-white/15 bg-black cursor-zoom-in shadow-xl hover:border-rose-400/50 transition-colors"
                    onClick={() => setActiveZoomImage(item.img)}
                  >
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-auto object-contain block"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/75 px-3 py-1 rounded-full text-[10px] font-ca-mono text-white/80 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to Zoom
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= SECTION 04: FRAME 490 RESULTS & METRICS ================= */}
          <section id="ps-quantitative-metrics" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-ca-mono text-amber-400 uppercase tracking-wider font-bold">
                  SECTION 04 // QUANTITATIVE METRICS & OUTCOMES
                </span>
                <h2 className="text-xl sm:text-2xl font-akira font-black uppercase text-white mt-1">
                  Hard Results, Time Reductions & Conclusion
                </h2>
              </div>
              <span className="text-xs font-ca-mono text-white/50">
                Measurable UX Improvements
              </span>
            </div>

            <div
              className="group relative rounded-xl overflow-hidden border border-white/15 bg-black cursor-zoom-in shadow-xl hover:border-amber-400/50 transition-colors"
              onClick={() => setActiveZoomImage(cs08Img)}
            >
              <img
                src={cs08Img}
                alt="PlayStaples Quantitative Data & Final Testing Conclusion"
                className="w-full h-auto object-contain block"
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4 bg-black/75 px-3 py-1 rounded-full text-[10px] font-ca-mono text-white/80 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to Zoom
              </div>
            </div>
          </section>

          {/* ================= FOOTER WITH CALL TO ACTIONS ================= */}
          <footer className="border-t border-white/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/50 font-ca-mono text-center sm:text-left">
              Project for PlayStaples • Designed & Evaluated by Om Biswas
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToTop}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-ca-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" /> Back to Top
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#FFE500] hover:bg-[#ffe833] text-black font-ca-mono text-xs font-bold transition-transform active:scale-95 cursor-pointer shadow-lg shadow-[#FFE500]/20"
              >
                Done / Close
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* ================= FULL IMAGE LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {activeZoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl p-2 sm:p-6 flex flex-col items-center justify-center cursor-zoom-out"
            onClick={() => setActiveZoomImage(null)}
          >
            <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
              <span className="text-xs font-ca-mono text-white/60 bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                Click anywhere or Esc to close
              </span>
              <button
                onClick={() => setActiveZoomImage(null)}
                className="p-2 rounded-full bg-white/20 hover:bg-red-600 text-white transition-colors"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full h-full max-w-7xl overflow-auto flex items-center justify-center p-2">
              <img
                src={activeZoomImage}
                alt="Expanded Case Study Artwork"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
