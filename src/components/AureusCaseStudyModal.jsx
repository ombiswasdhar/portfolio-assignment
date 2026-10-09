import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUp, Sparkles, Maximize2, Minimize2, ZoomIn } from 'lucide-react'

import aureusIdeationImg from '../assets/work/aureus/aureus-01-ideation.png'
import aureusUserStudyImg from '../assets/work/aureus/aureus-02-user-study.png'
import aureusPainPointsImg from '../assets/work/aureus/aureus-03-pain-points.png'
import aureusPersonaImg from '../assets/work/aureus/aureus-04-persona.png'
import aureusAdvantagesImg from '../assets/work/aureus/aureus-05-advantages.png'
import projectAureausImg from '../assets/work/project_aureaus.png'

export const AUREUS_FRAMES = [
  {
    id: 'aureus-frame-01',
    num: '01',
    title: 'Ideation & Brand Vision',
    shortLabel: 'Vision',
    category: 'Brand Strategy',
    image: aureusIdeationImg,
    alt: 'Aureus Ideation and Vision presentation frame',
  },
  {
    id: 'aureus-frame-02',
    num: '02',
    title: 'User Study & Demographics',
    shortLabel: 'Audience',
    category: 'Audience Research',
    image: aureusUserStudyImg,
    alt: 'Aureus User Study target audience presentation frame',
  },
  {
    id: 'aureus-frame-03',
    num: '03',
    title: 'User Study & Persona (Ayush)',
    shortLabel: 'Persona',
    category: 'UX Persona',
    image: aureusPersonaImg,
    alt: 'Aureus User Persona Ayush presentation frame',
  },
  {
    id: 'aureus-frame-04',
    num: '04',
    title: 'Pain Points & Market Landscape',
    shortLabel: 'Pain Points',
    category: 'Competitive Analysis',
    image: aureusPainPointsImg,
    alt: 'Aureus Pain Points multi-brand analysis frame',
  },
  {
    id: 'aureus-frame-05',
    num: '05',
    title: 'Multi-Brand Platform Advantages',
    shortLabel: 'Advantages',
    category: 'Product Value',
    image: aureusAdvantagesImg,
    alt: 'Aureus Platform Advantages presentation frame',
  },
]

export default function AureusCaseStudyModal({ onClose }) {
  const scrollContainerRef = useRef(null)
  const [activeZoomImage, setActiveZoomImage] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Track browser native fullscreen state
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }

  const handleClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
    onClose()
  }

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeZoomImage) {
          setActiveZoomImage(null)
        } else {
          handleClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeZoomImage])

  // Prevent background body scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  const scrollToFrame = (frameId) => {
    const el = document.getElementById(frameId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 w-screen h-screen bg-[#070709] text-white flex flex-col overflow-hidden animate-fadeIn"
      role="dialog"
      aria-label="Aureus Audio Case Study Deck"
    >
      {/* Sticky Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[#09090C]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F08264] animate-pulse" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
            <span className="font-akira font-black text-sm sm:text-base tracking-wider uppercase text-white">
              Aureus Audio ©
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-wider">
              Coursework Assignment • UX Presentation Deck
            </span>
          </div>
        </div>

        {/* Desktop Quick Jump Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2 py-1">
          <span className="text-[10px] font-mono uppercase text-neutral-400 font-semibold px-2">
            Jump to:
          </span>
          {AUREUS_FRAMES.map((frame) => (
            <button
              key={frame.id}
              type="button"
              onClick={() => scrollToFrame(frame.id)}
              className="px-2.5 py-1 rounded-full text-xs font-mono text-neutral-300 hover:text-black hover:bg-[#F08264] transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              {frame.num}. {frame.shortLabel || frame.title.split(' ')[0]}
            </button>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-[#F08264]" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-[#F08264]" />
            )}
            <span className="hidden sm:inline">
              {isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#E84A4A] hover:text-white active:scale-95 text-neutral-200 border border-white/20 transition-all cursor-pointer text-xs font-mono uppercase tracking-wider shrink-0 shadow-md"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </header>

      {/* Main Continuous Scrolling Feed of Images */}
      <div
        ref={scrollContainerRef}
        className="flex-1 w-full overflow-y-auto px-3 sm:px-6 md:px-10 py-6 sm:py-10"
      >
        <main className="w-full max-w-[1500px] mx-auto flex flex-col gap-8 sm:gap-12">
          {AUREUS_FRAMES.map((frame, idx) => (
            <article
              id={frame.id}
              key={frame.id}
              className="flex flex-col gap-3 group scroll-mt-24"
            >
              {/* Minimal Frame Header Tag */}
              <div className="flex items-center justify-between px-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-[#F08264]" />
                  <span className="font-bold text-white uppercase tracking-wider">
                    Frame {frame.num} • {frame.title}
                  </span>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] uppercase tracking-wider">
                  {frame.category}
                </span>
              </div>

              {/* High-Resolution Frame Image with Click to Zoom */}
              <div
                className="group/img relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_20px_70px_rgba(0,0,0,0.85)] hover:border-[#F08264]/60 transition-colors cursor-zoom-in"
                onClick={() => setActiveZoomImage(frame.image)}
              >
                <img
                  src={frame.image}
                  alt={frame.alt}
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  className="w-full h-auto object-contain block select-none mx-auto transition-transform duration-500 group-hover/img:scale-[1.008]"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-black/80 text-white font-mono text-xs font-bold border border-white/30 flex items-center gap-2 shadow-2xl">
                    <ZoomIn className="w-4 h-4 text-[#F08264]" /> Click to Zoom
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* Footer Actions */}
          <footer className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-neutral-400">
              <span>End of Aureus Audio Assignment Deck</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#F08264] hover:text-black text-white border border-white/20 hover:border-[#F08264] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back to Top</span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E84A4A] hover:bg-[#ff5757] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-lg"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>
          </footer>
        </main>
      </div>

      {/* Full-Screen Image Lightbox */}
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
              <span className="text-xs font-mono text-white/60 bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
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
