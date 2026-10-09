import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, ArrowUp, Sparkles } from 'lucide-react'

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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

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
      ref={scrollContainerRef}
      className="fixed inset-0 z-50 bg-[#070709]/95 backdrop-blur-xl overflow-y-auto animate-fadeIn text-white"
      onClick={(e) => {
        // Close if user clicks the backdrop margin
        if (e.target === scrollContainerRef.current) {
          onClose()
        }
      }}
      role="dialog"
      aria-label="Aureus Audio Case Study Deck"
    >
      {/* Sticky Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[#09090C]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F08264] animate-pulse" />
          <div className="flex flex-col">
            <span className="font-akira font-black text-sm sm:text-base tracking-wider uppercase text-white">
              Aureus Audio ©
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest">
              UX Case Study • 5 Frames
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

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-[#E84A4A] hover:text-white active:scale-95 text-neutral-200 border border-white/20 transition-all cursor-pointer text-xs font-mono uppercase tracking-wider shrink-0 shadow-md"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Close (Esc)</span>
        </button>
      </header>

      {/* Main Continuous Scrolling Feed of Images */}
      <main className="max-w-5xl mx-auto px-3 sm:px-6 md:px-8 py-8 sm:py-14 flex flex-col gap-10 sm:gap-14">
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

            {/* High-Resolution Frame Image */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_20px_70px_rgba(0,0,0,0.85)] group-hover:border-[#F08264]/60 transition-colors">
              <img
                src={frame.image}
                alt={frame.alt}
                loading={idx < 2 ? 'eager' : 'lazy'}
                className="w-full h-auto object-contain block select-none"
              />
            </div>
          </article>
        ))}

        {/* Footer Actions */}
        <footer className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-400">
            <span>End of Aureus Audio Case Study Deck</span>
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
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E84A4A] hover:bg-[#ff5757] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-lg"
            >
              <X className="w-4 h-4" />
              <span>Close &amp; Return</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  )
}
