import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, LayoutGrid, SlidersHorizontal } from 'lucide-react'

import aureusIdeationImg from '../assets/work/aureus/aureus-01-ideation.png'
import aureusUserStudyImg from '../assets/work/aureus/aureus-02-user-study.png'
import aureusPainPointsImg from '../assets/work/aureus/aureus-03-pain-points.png'
import aureusPersonaImg from '../assets/work/aureus/aureus-04-persona.png'
import aureusAdvantagesImg from '../assets/work/aureus/aureus-05-advantages.png'
import projectAureausImg from '../assets/work/project_aureaus.png'

export const AUREUS_SLIDES = [
  {
    id: 'ideation',
    number: '01',
    title: 'Ideation & Vision',
    category: 'Brand Strategy',
    description: 'Core brand ethos, high-performance audio discovery platform, and editorial product curation.',
    image: aureusIdeationImg,
    theme: 'dark',
  },
  {
    id: 'user-study',
    number: '02',
    title: 'User Study & Demographics',
    category: 'Audience Research',
    description: 'Target audience segmentation: Primary (18–35 tech-savvy & travelers) and Secondary (casual listeners & professionals).',
    image: aureusUserStudyImg,
    theme: 'light',
  },
  {
    id: 'persona',
    number: '03',
    title: 'User Study & Persona (Ayush)',
    category: 'UX Persona',
    description: 'Profile of Ayush (22, Student): listening habits, acoustic clarity priorities, durability, and active noise-cancellation needs.',
    image: aureusPersonaImg,
    theme: 'dark',
  },
  {
    id: 'pain-points',
    number: '04',
    title: 'Pain Points & Market Landscape',
    category: 'Competitive Analysis',
    description: 'Multi-Brand vs. Single-Brand sites: complex navigation, inventory management, unified identity, and pricing dynamics.',
    image: aureusPainPointsImg,
    theme: 'light',
  },
  {
    id: 'advantages',
    number: '05',
    title: 'Platform Advantages',
    category: 'Product Value',
    description: 'Strategic strengths of Aureus: broader audience appeal, seamless cross-brand comparison, and enhanced organic growth.',
    image: aureusAdvantagesImg,
    theme: 'dark',
  },
]

export default function AureusShowcase({ onZoomImage }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState('slides') // 'slides' | 'grid'
  const [direction, setDirection] = useState(0)

  const activeSlide = AUREUS_SLIDES[currentIndex]

  const handlePrev = (e) => {
    e?.stopPropagation()
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? AUREUS_SLIDES.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e?.stopPropagation()
    setDirection(1)
    setCurrentIndex((prev) => (prev === AUREUS_SLIDES.length - 1 ? 0 : prev + 1))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== 'slides') return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [viewMode])

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.25, ease: 'easeIn' },
    }),
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F08264] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold">
            Case Study Deck
          </span>
          <span className="text-xs text-neutral-500">•</span>
          <span className="text-xs text-neutral-400 font-mono">
            {currentIndex + 1} / {AUREUS_SLIDES.length}
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setViewMode('slides')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === 'slides'
                ? 'bg-[#F08264] text-black font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Single Slide Presentation"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Slides</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-[#F08264] text-black font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="View All Frames in Grid"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Frames</span>
          </button>
        </div>
      </div>

      {viewMode === 'slides' ? (
        <div className="flex flex-col gap-3">
          {/* Main Slide Viewer */}
          <div className="relative group/slide overflow-hidden rounded-xl border border-white/20 bg-neutral-950 shadow-2xl">
            {/* Slide Header Pill */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] uppercase tracking-wider shadow">
                {activeSlide.number} • {activeSlide.title}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#F08264]/20 border border-[#F08264]/40 text-[#F08264] text-[10px] uppercase tracking-wider font-semibold">
                {activeSlide.category}
              </span>
            </div>

            {/* Click To Expand Button Top-Right */}
            <button
              type="button"
              onClick={() => onZoomImage && onZoomImage(activeSlide.image)}
              className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 hover:bg-[#F08264] hover:text-black active:scale-95 text-white border border-white/20 hover:border-[#F08264] transition-all text-xs shadow cursor-pointer"
              title="Expand to Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-medium">Full HD</span>
            </button>

            {/* Main Interactive Slide Display */}
            <div
              className="relative w-full aspect-[1440/1024] max-h-[520px] bg-black/90 flex items-center justify-center cursor-zoom-in"
              onClick={() => onZoomImage && onZoomImage(activeSlide.image)}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={activeSlide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={activeSlide.image}
                  alt={`${activeSlide.title} Slide`}
                  className="w-full h-full object-contain select-none group-hover/slide:scale-[1.01] transition-transform duration-300"
                />
              </AnimatePresence>

              {/* Hover Zoom Prompt Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/slide:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                <span className="font-poppins-light font-light text-xs px-4 py-2 rounded-full bg-black/85 text-white border border-white/30 tracking-wider uppercase backdrop-blur-sm shadow-xl">
                  Click to Expand 🔍
                </span>
              </div>

              {/* Prev / Next Arrow Overlay Controls */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#F08264] hover:text-black text-white border border-white/30 hover:border-[#F08264] flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-90 shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Slide"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#F08264] hover:text-black text-white border border-white/30 hover:border-[#F08264] flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-90 shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Slide Caption / Description */}
          <div className="px-1 text-xs text-neutral-300 leading-relaxed flex items-start gap-2 bg-white/5 p-2.5 rounded-lg border border-white/10">
            <span className="text-[#F08264] font-bold shrink-0">✦</span>
            <span>{activeSlide.description}</span>
          </div>

          {/* Interactive Thumbnail Strip */}
          <div className="grid grid-cols-6 gap-2 pt-1">
            {AUREUS_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1)
                    setCurrentIndex(idx)
                  }}
                  className={`relative group/thumb aspect-[1440/1024] rounded-lg overflow-hidden border transition-all cursor-pointer bg-neutral-900 ${
                    isActive
                      ? 'border-[#F08264] ring-2 ring-[#F08264]/60 scale-105 shadow-lg shadow-[#F08264]/20'
                      : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                  }`}
                  title={`${slide.number}. ${slide.title}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/10 transition-colors" />
                  <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 font-mono text-[9px] text-white">
                    {slide.number}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        /* Grid / Stack View of All Frames */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
          {AUREUS_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="relative group/gridItem rounded-xl overflow-hidden border border-white/15 hover:border-[#F08264] bg-neutral-950 transition-all cursor-zoom-in"
              onClick={() => onZoomImage && onZoomImage(slide.image)}
            >
              <div className="aspect-[1440/1024] w-full bg-black/80 flex items-center justify-center overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain group-hover/gridItem:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info overlay */}
              <div className="p-2.5 bg-neutral-900/90 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-[#F08264] uppercase font-semibold">
                    {slide.number} • {slide.category}
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {slide.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onZoomImage && onZoomImage(slide.image)
                  }}
                  className="p-1.5 rounded bg-white/10 hover:bg-[#F08264] hover:text-black text-white transition-colors"
                  title="Zoom Image"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
