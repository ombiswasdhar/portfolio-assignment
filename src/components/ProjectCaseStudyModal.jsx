import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2, Minimize2, ExternalLink, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

// TRIONN-style storytelling tab details for each project
const PROJECT_STORIES = {
  playstaples: {
    challenge:
      'Indian street culture is filled with soul, kinetic energy, and everyday design wisdom, yet it is rarely celebrated as collector-grade art. The challenge was to reimagine the legendary Mumbai Premier Padmini taxi—the iconic "Kaali Peeli"—as a handcrafted wooden collectible that honors nostalgia without appearing dated or childish. Balancing authentic heritage with contemporary toy industrial design was key.',
    approach:
      'We broke down the distinctive silhouettes, curved rooflines, and tactile proportions of the classic 1960s Padmini into modular hardwood geometry. Every component—from the custom rooftop luggage rack and authentic yellow-and-black taxi livery to the mechanical wooden wheel axles—was precision-modeled in 3D CAD. We complemented the physical toy with archival packaging and editorial storytelling celebrating "the ones who carved dreams on the trunk."',
    outcome:
      'The result is a timeless, museum-grade collectible that bridges Indian street heritage and modern industrial design. PlayStaples transforms an everyday cultural icon into an emotionally resonant collector\'s piece that sparks memories across generations while setting a benchmark for homegrown collectible craft.',
    whatWeDid: [
      'Conceptualized and 3D CAD modeled handcrafted wooden Premier Padmini toy.',
      'Engineered custom rooftop luggage rack and authentic dual-tone livery details.',
      'Designed collector-grade retail packaging, hangtags, and vintage typography.',
      'Staged 3D lifestyle product renders, packaging graphics, and tactile scene visualizations.',
    ],
  },
  'business-cards': {
    challenge:
      'Personal branding collateral often risks falling into two extremes: either generic corporate monotony or illegible, over-stylized clutter that fails in physical print production. The challenge was to develop "ONI / OM"—a versatile personal identity system that captures a love for Japanese folklore, anime aesthetics, and modern typography across three radically different creative directions, while adhering to strict dimensional and print-finish standards.',
    approach:
      'The visual development began with traditional pencil sketches on paper, exploring Oni demon mask motifs, monogram geometry, and card layout compositions. From this foundation, three contrasting directions were engineered: Concept 1 (Split-Mask Illustration) sets a horizontal half-face Oni portrait over swirled cosmic marbling and bold magenta staging with a high-contrast four-color palette; Concept 2 (Minimalist Monogram) embraces two-tone monochrome with a speckled black texture, oversized interlocking monogram, and spacious contact typography; and Concept 3 (Vertical Character Cutout) blends an anime character portrait in pastel lilac with geometric color bars, monogram, and corner QR code. The journey concluded with floating, angled 3D perspective mockups demonstrating physical print translation.',
    outcome:
      'A multi-faceted brand identity showcase that demonstrates creative range—proving how a single personal brand can seamlessly flex between high-voltage character illustration and understated editorial minimalism. The 3D physical mockups bridge digital art and real-world print craftsmanship, resulting in a memorable networking artifact that leaves an indelible creative impression.',
    whatWeDid: [
      'Explored traditional pencil ideation and rough paper sketches for Oni motifs and monogram layouts.',
      'Illustrated Concept 1: horizontal split-face Oni mask with swirled cosmic marbling on magenta.',
      'Designed Concept 2: minimalist monochrome layout with speckled paper texture and oversized monogram.',
      'Engineered Concept 3: pastel lilac vertical card with anime character cutout, color bars, and QR code.',
      'Built print-ready vector production assets with accurate bleed, trim, and tactile finish specifications.',
      'Rendered floating 3D perspective mockups to showcase physical card weight and tactile presence.',
    ],
  },
  aureaus: {
    challenge:
      'High-end audiophile headphones are often marketed with dry technical spec sheets or generic corporate e-commerce grids. Aureus needed an editorial lookbook and telemetry UX that conveys acoustic luxury, acoustic science, and tactile hardware presence simultaneously, making complex acoustic metrics accessible and seductive.',
    approach:
      'We paired high-fidelity 3D Blender hardware model lighting and monochromatic staging with a magazine-style editorial design system. Floating geometric props in 3D space create depth, while structured telemetry dashboards, frequency response curves, and driver breakdown diagrams deliver authoritative data without overwhelming the consumer.',
    outcome:
      'Aureus sets a new standard for luxury audio UX—merging high-fashion editorial aesthetics with surgical acoustic telemetry. The frictionless cart and checkout funnel ensures seamless conversion from lookbook discovery to ownership.',
    whatWeDid: [
      'Modeled and staged 3D luxury headphones with custom lighting in Blender.',
      'Designed editorial audio lookbook with high-contrast typography hierarchy.',
      'Architected telemetry dashboard and driver specification breakdown screens.',
      'Streamlined the end-to-end checkout funnel and cart interaction flow.',
    ],
  },
  melody: {
    challenge:
      'Live concert ticketing platforms frequently suffer from cluttered visual noise, disjointed page transitions, and anxiety-inducing checkout flows that drain the raw anticipation of seeing live music. The objective for Melody was to design a unified, end-to-end desktop web experience that channels the electric atmosphere of rock concerts and live festivals while providing effortless clarity, immediate event discovery, and zero-friction ticket purchasing.',
    approach:
      'We architected an uninterrupted desktop user journey staged against an energetic periwinkle canvas accented with tactile 3D spheres and circular "MELODY." orbital typography. The discovery begins with an atmospheric dark-mode hero featuring bold poster cards that instantly command attention for live acts. When an event is selected, the interface transitions into an intentional split-theme layout—pairing a dramatic, stage-lit promotional header with a clean, light-mode section detailing venue info, tour schedules, and an artist photo grid. The booking journey then funnels into a focused two-column checkout view that positions the ticket summary directly alongside a streamlined card payment form, keeping the user grounded without unnecessary multi-step friction.',
    outcome:
      'Melody turns ticket purchasing from a stressful digital errand into an exhilarating prologue to the live concert. The journey wraps up with a high-impact "Thank You For Your Purchase!!" confirmation screen and an authentic "About" section backdropped by immersive concert-crowd photography. By balancing moody festival energy with disciplined information architecture, the concept proves that high-voltage rock aesthetics and intuitive UX conversion can harmoniously amplify each other.',
    whatWeDid: [
      'Mapped a comprehensive end-to-end desktop user journey from show discovery to purchase confirmation.',
      'Designed an atmospheric dark-mode hero experience with high-contrast rock act and concert poster cards.',
      'Engineered a split-theme event detail layout combining dark stage visuals with an airy, light-mode artist grid.',
      'Streamlined the checkout funnel into a focused two-column architecture pairing order summary and card payment.',
      'Created celebratory confirmation screens and brand storytelling backed by live concert photography.',
      'Developed a cohesive visual presentation system featuring vibrant periwinkle staging and floating 3D spheres.',
    ],
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
  const [activeTab, setActiveTab] = useState('challenge') // 'challenge' | 'approach' | 'outcome' | 'whatWeDid'
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

  // Reset tab and scroll when active project changes
  useEffect(() => {
    setActiveTab('challenge')
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

  // TRIONN grid arrangement: Hero (col-span-2), full (col-span-2), then alternating dual columns (col-span-1)
  const getItemSpan = (index) => {
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

              {/* TRIONN STORY TABS */}
              <div className="border-t border-black/10 pt-6 mb-8">
                {/* Tab Header Buttons */}
                <div className="flex flex-wrap gap-4 sm:gap-6 border-b border-black/10 pb-3 mb-4">
                  {[
                    { id: 'challenge', label: 'The challenge' },
                    { id: 'approach', label: 'Approach' },
                    { id: 'outcome', label: 'Outcome' },
                    { id: 'whatWeDid', label: 'What we did' },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-1 text-xs sm:text-sm font-fredoka font-semibold tracking-wide cursor-pointer relative ${
                          isActive
                            ? 'text-neutral-950 border-b-2 border-[#E84A4A]'
                            : 'text-neutral-500 hover:text-neutral-900 border-b-2 border-transparent'
                        }`}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                {/* Tab Content Display - completely steady with no layout jump or movement */}
                <div className="min-h-[140px] text-xs sm:text-sm font-poppins text-neutral-700 leading-relaxed">
                  {activeTab === 'challenge' && <p>{story.challenge}</p>}
                  {activeTab === 'approach' && <p>{story.approach}</p>}
                  {activeTab === 'outcome' && <p>{story.outcome}</p>}
                  {activeTab === 'whatWeDid' && (
                    <ul className="space-y-2">
                      {story.whatWeDid.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E84A4A] mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* External Link (TRIONN Button) */}
              {project.figmaUrl && (
                <div className="mb-8">
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-fredoka font-bold uppercase tracking-wider text-neutral-950 border-b-2 border-neutral-950 pb-1 hover:text-[#E84A4A] hover:border-[#E84A4A] transition-colors cursor-pointer"
                  >
                    <span>View on Figma</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
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
          <div className="col-span-12 lg:col-span-7 xl:col-span-8 pt-0 lg:pt-2 grid grid-cols-2 gap-5 sm:gap-6">
            {images.map((imgSrc, idx) => {
              const spanClass = getItemSpan(idx)

              return (
                <div
                  key={idx}
                  className={`${spanClass} relative rounded-2xl overflow-hidden bg-white border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] cursor-pointer`}
                  onClick={() => setActiveZoomImage(imgSrc)}
                >
                  <img
                    src={imgSrc}
                    alt={`${project.title} showcase visual ${idx + 1}`}
                    loading={idx <= 2 ? 'eager' : 'lazy'}
                    className="w-full h-auto object-cover block"
                  />

                  {/* Corner visual index */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="text-[11px] font-fredoka font-semibold text-neutral-700 bg-white/90 px-2.5 py-1 rounded-full border border-black/10 shadow-xs backdrop-blur-md">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
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
