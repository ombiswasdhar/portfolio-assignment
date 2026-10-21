import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2, Minimize2, ExternalLink, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

// Project challenge copy for each case study
const PROJECT_STORIES = {
  playstaples: {
    challenge:
      'The original PlayStaples online store struggled with high checkout abandonment, cluttered navigation, and a lack of emotional resonance that failed to communicate the tactile value of handcrafted Indian collectibles. The challenge was to conduct an in-depth heuristic evaluation, diagnose core UX pain points, and reimagine the digital storefront from the ground up—balancing modern e-commerce utility with the nostalgic celebration of Mumbai\'s iconic "Kaali Peeli" Premier Padmini taxi.',
  },
  'business-cards': {
    challenge:
      'Personal branding collateral often risks falling into two extremes: either generic corporate monotony or illegible, over-stylized clutter that fails in physical print production. The challenge was to develop "ONI / OM"—a versatile personal identity system that captures a love for Japanese folklore, anime aesthetics, and modern typography across three radically different creative directions, while adhering to strict dimensional and print-finish standards.',
  },
  aureaus: {
    challenge:
      'High-end audiophile audio products often suffer from fragmented digital experiences: dry technical spec sheets fail to evoke luxury, while generic corporate e-commerce grids fail to convey acoustic science and tactile hardware craftsmanship. The challenge for Aureus was to create an editorial design system, immersive 3D hardware lookbook, and telemetry dashboard that make complex acoustic engineering accessible, elegant, and seductive.',
  },
  melody: {
    challenge:
      'Live concert ticketing platforms frequently suffer from cluttered visual noise, disjointed page transitions, and anxiety-inducing checkout flows that drain the raw anticipation of seeing live music. The objective for Melody was to design a unified, end-to-end desktop web experience that channels the electric atmosphere of rock concerts and live festivals while providing effortless clarity, immediate event discovery, and zero-friction ticket purchasing.',
  },
}

// Project-specific color themes matching the project detail image & branding
const PROJECT_THEMES = {
  'business-cards': {
    baseBg: '#F8F4FA',
    defaultGlow1: '#D8B4E2', // Soft pastel lilac
    defaultGlow2: '#FF2E93', // Split-mask hot magenta
  },
  'oni-studios': {
    baseBg: '#F8F4FA',
    defaultGlow1: '#D8B4E2',
    defaultGlow2: '#FF2E93',
  },
  playstaples: {
    baseBg: '#F1F9F6',
    defaultGlow1: '#48C9A8', // Fresh mint
    defaultGlow2: '#FFB800', // Mumbai taxi yellow / amber
  },
  aureaus: {
    baseBg: '#FAF5F0',
    defaultGlow1: '#F08264', // Coral peach
    defaultGlow2: '#EAB854', // Champagne gold
  },
  melody: {
    baseBg: '#F2F1FA',
    defaultGlow1: '#8B7DE8', // Periwinkle lavender
    defaultGlow2: '#FF6584', // Electric rock pink / coral
  },
}

export default function ProjectCaseStudyModal({
  project,
  onClose,
  allProjects = [],
  onSelectProject,
}) {
  const [activeZoomImage, setActiveZoomImage] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const scrollContainerRef = useRef(null)

  useBodyScrollLock(true)

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
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {})
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeZoomImage) {
          setActiveZoomImage(null)
        } else {
          onClose()
        }
      } else if (e.key === 'ArrowLeft' && !activeZoomImage) {
        handlePrevProject()
      } else if (e.key === 'ArrowRight' && !activeZoomImage) {
        handleNextProject()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  // Reset scroll when active project changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [project?.id])

  if (!project) return null

  const story = PROJECT_STORIES[project.id] || PROJECT_STORIES.playstaples
  const theme = PROJECT_THEMES[project.id] || PROJECT_THEMES.playstaples

  // Calculate previous and next projects
  const currentIndex = allProjects.findIndex((p) => p.id === project.id)
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1]
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0]

  const handlePrevProject = () => {
    if (prevProject && onSelectProject) onSelectProject(prevProject)
  }

  const handleNextProject = () => {
    if (nextProject && onSelectProject) onSelectProject(nextProject)
  }

  // Build the image gallery grid for the right column
  const images = (project.previewPhotos && project.previewPhotos.length > 0)
    ? project.previewPhotos
    : [project.thumbnail]

  // TRIONN grid arrangement: Full width (col-span-2) for sequential case study boards, or staggered for photo sets
  const getItemSpan = (index) => {
    if (project.id === 'playstaples' || project.id === 'aureaus') return 'col-span-2'
    if (index === 0 || index === 1) return 'col-span-2'
    const offset = index - 2
    const pattern = offset % 3
    if (pattern === 0 || pattern === 1) return 'col-span-2 sm:col-span-1'
    return 'col-span-2'
  }

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 z-[100] w-full h-full text-neutral-900 flex flex-col overflow-y-auto overflow-x-hidden selection:bg-[#E84A4A] selection:text-white"
      style={{
        backgroundColor: theme.baseBg,
        backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.22) 1.25px, transparent 1.25px)',
        backgroundSize: '28px 28px',
        backgroundPosition: 'center top',
        backgroundRepeat: 'repeat',
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* FIXED AMBIENT PROJECT AURA BACKDROP */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(900px circle at 50% 20%, ${theme.defaultGlow1}20, transparent 70%),
            radial-gradient(1000px circle at 85% 15%, ${theme.defaultGlow2}18, transparent 65%),
            radial-gradient(900px circle at 15% 85%, ${theme.defaultGlow1}14, transparent 65%)
          `,
        }}
        aria-hidden="true"
      />

      {/* TOP FLOATING CONTROLS BAR (FROSTED GLASS LIGHT DESIGN) */}
      <div className="sticky top-0 z-50 w-full px-4 sm:px-8 lg:px-14 py-3 bg-white/80 backdrop-blur-xl border-b border-black/10 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <button
          onClick={onClose}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-fredoka font-semibold tracking-wider uppercase text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#E84A4A]" />
          <span>Back to work</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 text-xs font-fredoka font-semibold text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-[#E84A4A] hover:text-white text-neutral-700 flex items-center justify-center transition-colors cursor-pointer border border-black/10 shadow-xs"
            title="Close (Esc)"
            aria-label="Close case study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TRIONN SPLIT SCREEN CONTAINER */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-14 py-6 sm:py-10 lg:py-16">
        <div className="grid grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ============================================================= */}
          {/* LEFT COLUMN: STICKY PROJECT STORY SIDEBAR                    */}
          {/* ============================================================= */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20 lg:h-[calc(100vh-6.5rem)] lg:flex lg:flex-col lg:justify-between lg:overflow-y-auto pr-0 lg:pr-4 no-scrollbar">
            
            {/* Title & Metadata Block */}
            <div className="flex flex-col">
              {/* Category tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: project.folderColor || '#E84A4A' }} />
                <span className="text-[11px] font-fredoka font-semibold tracking-[0.16em] uppercase text-neutral-600">
                  {project.category || 'CASE STUDY'}
                </span>
                <span className="text-neutral-300 font-fredoka text-[11px]">/</span>
                <span className="text-[11px] font-fredoka font-medium text-neutral-500 uppercase">
                  {project.date ? project.date.split(',')[1]?.trim() || project.date : '2026'}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="font-akira text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase text-neutral-950 tracking-tight leading-none mb-4">
                {project.title}
              </h1>

              {/* Subtitle / Tagline */}
              <p className="font-poppins text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mb-6">
                {project.subtitle || project.description}
              </p>

              {/* Services / Tags List (TRIONN style) */}
              <div className="mb-8">
                <ul className="space-y-1.5 text-xs sm:text-sm font-poppins text-neutral-700">
                  {project.tags.slice(0, 5).map((tag, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E84A4A]" />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project challenge */}
              <div className="border-t border-black/10 pt-6 mb-8">
                <p className="text-xs sm:text-sm font-poppins text-neutral-700 leading-relaxed">
                  {story.challenge}
                </p>
              </div>

              {/* External Links (TRIONN Buttons for Behance & Figma) */}
              {(project.behanceUrl || project.figmaUrl) && (
                <div className="flex flex-wrap items-center gap-5 sm:gap-6 mb-8">
                  {project.behanceUrl && (
                    <a
                      href={project.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-fredoka font-bold uppercase tracking-wider text-neutral-950 border-b-2 border-neutral-950 pb-1 hover:text-[#0057FF] hover:border-[#0057FF] transition-colors cursor-pointer"
                    >
                      <span>View on Behance</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.figmaUrl && (
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-fredoka font-bold uppercase tracking-wider text-neutral-950 border-b-2 border-neutral-950 pb-1 hover:text-[#E84A4A] hover:border-[#E84A4A] transition-colors cursor-pointer"
                    >
                      <span>View on Figma</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Project Navigation (Previous / Next) */}
            <div className="border-t border-black/10 pt-4 flex items-center justify-between text-xs font-fredoka uppercase tracking-wider text-neutral-600 mt-6 lg:mt-auto">
              <button
                type="button"
                onClick={handlePrevProject}
                className="flex items-center gap-2 font-fredoka font-semibold text-xs tracking-wider uppercase text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
                title={`Previous: ${prevProject.title}`}
              >
                <ChevronLeft className="w-4 h-4 text-[#E84A4A]" />
                <span>Previous</span>
              </button>

              <div className="text-[11px] text-neutral-500 font-fredoka font-semibold">
                {currentIndex + 1} / {allProjects.length}
              </div>

              <button
                type="button"
                onClick={handleNextProject}
                className="flex items-center gap-2 font-fredoka font-semibold text-xs tracking-wider uppercase text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer ml-auto"
                title={`Next: ${nextProject.title}`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 text-[#E84A4A]" />
              </button>
            </div>
          </div>

          {/* ============================================================= */}
          {/* RIGHT COLUMN: SCROLLABLE MEDIA GALLERY (TRIONN STYLE)         */}
          {/* ============================================================= */}
          <div
            className={`col-span-12 lg:col-span-7 xl:col-span-8 pt-0 lg:pt-2 ${
              project.id === 'playstaples' || project.id === 'aureaus'
                ? 'flex flex-col gap-0 rounded-2xl overflow-hidden border border-black/10 shadow-[0_4px_25px_rgba(0,0,0,0.08)] bg-white'
                : 'grid grid-cols-2 gap-5 sm:gap-6'
            }`}
          >
            {images.map((imgSrc, idx) => {
              const spanClass = getItemSpan(idx)
              const isSeamless = project.id === 'playstaples' || project.id === 'aureaus'

              return (
                <div
                  key={idx}
                  className={`${
                    isSeamless
                      ? 'w-full relative cursor-pointer block leading-none overflow-hidden m-0 p-0 border-0'
                      : `${spanClass} relative rounded-2xl overflow-hidden bg-white border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] cursor-pointer`
                  }`}
                  onClick={() => setActiveZoomImage(imgSrc)}
                >
                  <img
                    src={imgSrc}
                    alt={`${project.title} showcase visual ${idx + 1}`}
                    loading={idx <= 2 ? 'eager' : 'lazy'}
                    className="w-full h-auto object-cover block m-0 p-0"
                  />

                  {/* Corner visual index for standard card layouts */}
                  {!isSeamless && (
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <span className="text-[11px] font-fredoka font-semibold text-neutral-700 bg-white/90 px-2.5 py-1 rounded-full border border-black/10 shadow-xs backdrop-blur-md">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* FULL RESOLUTION LIGHTBOX ZOOM MODAL (Cinematic Dark Mode for high contrast preview) */}
      <AnimatePresence>
        {activeZoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setActiveZoomImage(null)}
          >
            <button
              onClick={() => setActiveZoomImage(null)}
              className="fixed top-4 right-4 z-[130] p-2.5 rounded-full bg-black/80 hover:bg-[#E84A4A] text-white transition-colors cursor-pointer border border-white/20 shadow-xl"
              title="Close (Esc)"
              aria-label="Close zoom"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="relative max-w-5xl w-full flex items-center justify-center m-auto py-4 sm:py-8"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.96 }}
                src={activeZoomImage}
                alt="Full Resolution Preview"
                className="w-auto max-w-[96vw] max-h-[92vh] object-contain rounded-xl shadow-2xl cursor-default [&.tall-board]:max-h-none [&.tall-board]:w-full"
                onLoad={(e) => {
                  const img = e.currentTarget
                  if (img.naturalHeight > img.naturalWidth * 1.5) {
                    img.classList.add('tall-board')
                  }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
