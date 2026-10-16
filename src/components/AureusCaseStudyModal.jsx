import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUp, Sparkles, Maximize2, Minimize2, ZoomIn } from 'lucide-react'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

import aureusIdeationImg from '../assets/work/aureus/aureus-01-ideation.png'
import aureusUserStudyImg from '../assets/work/aureus/aureus-02-user-study.png'
import aureusPainPointsImg from '../assets/work/aureus/aureus-03-pain-points.png'
import aureusPersonaImg from '../assets/work/aureus/aureus-04-persona.png'
import aureusAdvantagesImg from '../assets/work/aureus/aureus-05-advantages.png'
import AureusIsometricAnimation from './AureusIsometricAnimation'
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
  useBodyScrollLock(true)

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
      className="fixed inset-0 z-[100] w-full h-full bg-[#070709] text-white flex flex-col overflow-hidden animate-fadeIn"
      role="dialog"
      aria-label="Aureus Audio Case Study Deck"
    >
      {/* Sticky Top Header Bar */}
      <header
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))' }}
        className="sticky top-0 z-50 bg-[#09090C] border-b border-white/10 px-3 sm:px-8 py-3 flex items-center justify-between gap-3 shadow-xl shrink-0"
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F08264] animate-pulse shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 min-w-0">
            <span className="font-akira font-black text-xs sm:text-base tracking-wider uppercase text-white truncate">
              Aureus Audio ©
            </span>
            <span className="font-mono text-[9px] sm:text-xs text-neutral-400 tracking-wider truncate hidden xs:inline sm:inline">
              Coursework Assignment • UX Presentation Deck
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-[#F08264]" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-[#F08264]" />
            )}
            <span className="hidden md:inline">
              {isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="min-w-[38px] min-h-[38px] inline-flex items-center justify-center gap-1.5 p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-white/15 hover:bg-[#E84A4A] active:bg-red-700 text-white border border-white/20 transition-all cursor-pointer text-xs font-mono uppercase tracking-wider shrink-0 shadow-md"
            title="Close (Esc)"
            aria-label="Close Aureus case study"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </header>

      {/* Main Empty State Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 w-full overflow-y-auto px-4 sm:px-8 py-12 flex flex-col items-center justify-center overscroll-contain"
        style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="max-w-md w-full mx-auto text-center flex flex-col items-center gap-5 p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#0F0F14] shadow-2xl">
          <div className="w-14 h-14 rounded-full flex items-center justify-center border border-white/15 bg-[#F08264]/10 shadow-inner">
            <span className="w-3.5 h-3.5 rounded-full bg-[#F08264]" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-neutral-400">
              03 // CASE STUDY
            </span>
            <h3 className="font-akira text-xl sm:text-2xl text-white uppercase font-black tracking-wide">
              AUREAUS ©
            </h3>
            <p className="font-mono text-xs text-neutral-400">
              UX Case Study &amp; 3D Design
            </p>
          </div>

          <div className="h-px w-20 bg-white/10 my-1" />

          <p className="font-poppins text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Project case study content, high-resolution galleries, and deliverables are currently being curated.
          </p>

          <button
            type="button"
            onClick={handleClose}
            className="mt-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
          >
            ← Back to Featured Works
          </button>
        </div>
      </div>

      {/* Full-Screen Image Lightbox */}
      <AnimatePresence>
        {activeZoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl p-2 sm:p-6 flex flex-col items-center justify-center cursor-zoom-out"
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
