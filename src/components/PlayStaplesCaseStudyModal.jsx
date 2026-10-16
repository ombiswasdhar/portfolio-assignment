import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUp, ExternalLink, ZoomIn, Maximize2, Minimize2 } from 'lucide-react'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

import heroPosterImg from '../assets/work/playstaples/playstaples-hero.png'
import cs01Img from '../assets/work/playstaples/playstaples-case-study-01.jpg'
import cs02Img from '../assets/work/playstaples/playstaples-case-study-02.jpg'
import cs04Img from '../assets/work/playstaples/playstaples-case-study-04.jpg'
import cs05Img from '../assets/work/playstaples/playstaples-case-study-05.jpg'
import cs06Img from '../assets/work/playstaples/playstaples-case-study-06.jpg'
import cs07Img from '../assets/work/playstaples/playstaples-case-study-07.jpg'
import cs08Img from '../assets/work/playstaples/playstaples-case-study-08.jpg'

const FRAME_490_SLICES = [
  cs01Img,
  cs02Img,
  cs04Img,
  cs05Img,
  cs06Img,
  cs07Img,
  cs08Img,
]

export default function PlayStaplesCaseStudyModal({ onClose }) {
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

  // Prevent background scrolling while modal is open
  useBodyScrollLock(true)

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] w-full h-full bg-[#070709] text-white flex flex-col overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* ================= TOP FULLSCREEN APP BAR ================= */}
      <header
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))' }}
        className="sticky top-0 z-40 bg-[#0A0A0D] border-b border-white/10 px-3 sm:px-8 py-3 flex items-center justify-between gap-3 shrink-0 shadow-lg"
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFE500] shadow-[0_0_10px_#FFE500] shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 min-w-0">
            <span className="font-akira text-xs sm:text-base font-black tracking-wider text-white truncate">
              PLAYSTAPLES
            </span>
            <span className="text-[9px] sm:text-xs font-ca-mono text-white/50 tracking-wider truncate hidden xs:inline sm:inline">
              Coursework Assignment • Usability Testing &amp; Research Artboards
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-ca-mono text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-[#FFE500]" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-[#FFE500]" />
            )}
            <span className="hidden md:inline">
              {isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}
            </span>
          </button>

          <a
            href="https://www.figma.com/design/eHCTRQ3nwpXcfMDtlNUO9Q/PlayStaples--Copy-?node-id=474-5581&t=O1mLutYpZ2gweGkb-0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-ca-mono transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FFE500]" />
            <span className="hidden sm:inline">Figma Design ↗</span>
          </a>

          <button
            onClick={handleClose}
            type="button"
            className="min-w-[38px] min-h-[38px] inline-flex items-center justify-center gap-1.5 p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-white/15 hover:bg-red-600 active:bg-red-700 text-white border border-white/20 transition-all active:scale-95 cursor-pointer text-xs font-ca-mono shrink-0 shadow-md"
            title="Close (Esc)"
            aria-label="Close PlayStaples case study"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </header>

      {/* ================= SCROLLABLE ASSIGNMENT FEED - EMPTIED ================= */}
      <div
        ref={scrollContainerRef}
        className="flex-1 w-full overflow-y-auto px-4 sm:px-8 py-12 flex flex-col items-center justify-center overscroll-contain"
        style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="max-w-md w-full mx-auto text-center flex flex-col items-center gap-5 p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#0F0F14] shadow-2xl">
          <div className="w-14 h-14 rounded-full flex items-center justify-center border border-white/15 bg-[#FFE500]/10 shadow-inner">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFE500]" />
          </div>

          <div className="space-y-2">
            <span className="font-ca-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-neutral-400">
              01 // CASE STUDY
            </span>
            <h3 className="font-akira text-xl sm:text-2xl text-white uppercase font-black tracking-wide">
              PLAYSTAPLES ©
            </h3>
            <p className="font-ca-mono text-xs text-neutral-400">
              Toy Design &amp; Branding
            </p>
          </div>

          <div className="h-px w-20 bg-white/10 my-1" />

          <p className="font-poppins text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Project case study content, high-resolution galleries, and deliverables are currently being curated.
          </p>

          <button
            type="button"
            onClick={handleClose}
            className="mt-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-xs font-ca-mono text-white transition-all cursor-pointer"
          >
            ← Back to Featured Works
          </button>
        </div>
      </div>

      {/* ================= FULL-SCREEN IMAGE LIGHTBOX ================= */}
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
                alt="Case Study Artboard"
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
