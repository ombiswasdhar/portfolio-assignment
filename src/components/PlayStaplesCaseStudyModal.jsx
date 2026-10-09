import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUp, ExternalLink, ZoomIn, Maximize2, Minimize2 } from 'lucide-react'

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
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 w-screen h-screen bg-[#070709] text-white flex flex-col overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* ================= TOP FULLSCREEN APP BAR ================= */}
      <header className="sticky top-0 z-40 bg-[#0A0A0D]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFE500] shadow-[0_0_10px_#FFE500]" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
            <span className="font-akira text-sm sm:text-base font-black tracking-wider text-white">
              PLAYSTAPLES
            </span>
            <span className="text-[10px] sm:text-xs font-ca-mono text-white/50 tracking-wider">
              Coursework Assignment • Usability Testing &amp; Research Artboards
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-ca-mono text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-[#FFE500]" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-[#FFE500]" />
            )}
            <span className="hidden sm:inline">
              {isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}
            </span>
          </button>

          <a
            href="https://www.figma.com/design/eHCTRQ3nwpXcfMDtlNUO9Q/PlayStaples--Copy-?node-id=474-5581&t=O1mLutYpZ2gweGkb-0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-ca-mono transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FFE500]" />
            <span className="hidden sm:inline">Figma Design ↗</span>
          </a>

          <button
            onClick={handleClose}
            type="button"
            className="p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 hover:bg-red-600/80 hover:text-white text-white/80 border border-white/15 transition-all active:scale-95 cursor-pointer text-xs font-ca-mono flex items-center gap-1.5"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </header>

      {/* ================= SCROLLABLE ASSIGNMENT ARTBOARD FEED ================= */}
      <div
        ref={scrollContainerRef}
        className="flex-1 w-full overflow-y-auto px-2 sm:px-6 md:px-10 py-6 sm:py-8 space-y-6"
      >
        <div className="w-full max-w-[1500px] mx-auto space-y-6">
          {/* HERO PAGE: UT A1 2.PDF */}
          <div
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-black cursor-zoom-in shadow-2xl transition-all duration-300 hover:border-white/30"
            onClick={() => setActiveZoomImage(heroPosterImg)}
          >
            <img
              src={heroPosterImg}
              alt="PlayStaples Usability Testing Infographic Poster"
              className="w-full h-auto object-contain block mx-auto transition-transform duration-500 group-hover:scale-[1.008]"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="px-4 py-2 rounded-full bg-black/80 text-white font-ca-mono text-xs font-bold border border-white/30 flex items-center gap-2 shadow-2xl">
                <ZoomIn className="w-4 h-4 text-[#FFE500]" /> Click to Zoom
              </span>
            </div>
          </div>

          {/* FRAME 490.PDF: CONTINUOUS ARTBOARD SLICES */}
          <div className="space-y-4">
            {FRAME_490_SLICES.map((sliceImg, idx) => (
              <div
                key={`frame490-slice-${idx}`}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-black cursor-zoom-in shadow-2xl transition-all duration-300 hover:border-white/30"
                onClick={() => setActiveZoomImage(sliceImg)}
              >
                <img
                  src={sliceImg}
                  alt={`PlayStaples Usability Testing Study Slice ${idx + 1}`}
                  className="w-full h-auto object-contain block mx-auto transition-transform duration-500 group-hover:scale-[1.008]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-black/80 text-white font-ca-mono text-xs font-bold border border-white/30 flex items-center gap-2 shadow-2xl">
                    <ZoomIn className="w-4 h-4 text-[#FFE500]" /> Click to Zoom
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ================= FOOTER ================= */}
          <footer className="border-t border-white/15 pt-8 pb-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-ca-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" /> Back to Top
            </button>

            <div className="flex items-center gap-3">
              <a
                href="https://www.figma.com/design/eHCTRQ3nwpXcfMDtlNUO9Q/PlayStaples--Copy-?node-id=474-5581&t=O1mLutYpZ2gweGkb-0"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-ca-mono flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#FFE500]" /> Figma Design ↗
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 rounded-full bg-[#FFE500] hover:bg-[#ffe833] text-black font-ca-mono text-xs font-bold transition-transform active:scale-95 cursor-pointer shadow-lg shadow-[#FFE500]/20"
              >
                Close
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* ================= FULL-SCREEN IMAGE LIGHTBOX ================= */}
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
