import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Layers, Grid3X3, LayoutList } from 'lucide-react'
import projectCardsImg from '../assets/work/project_cards.jpg'
import projectAureausImg from '../assets/work/project_aureaus.png'
import projectMelodyImg from '../assets/work/project_melody.jpg'
import projectPlaystaplesImg from '../assets/work/project_playstaples.png'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { HandwritingText } from '@/components/ui/handwriting-text'
import Auralis from '@/components/ui/auralis'
import MarqueeBar from './MarqueeBar'

/* ========================================================================= */
/* RETRO CARTOON MASCOT CHARACTERS MATCHING REFERENCE IMAGE */
/* ========================================================================= */

// White 4-Finger Cartoon Glove Hand Mascot with Cute Face (Right of Folder)
function HandMascot({ className = 'w-16 h-16' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <path
        d="M32 30 C32 20 38 18 42 24 C45 16 52 16 55 23 C58 17 65 18 67 25 C70 20 78 22 76 32 L78 50 C80 65 72 78 58 80 C44 82 34 72 32 58 Z"
        fill="#FFFFFF"
        stroke="#111"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Thumb */}
      <path
        d="M32 50 C22 48 18 56 26 62 C30 65 34 62 34 58 Z"
        fill="#FFFFFF"
        stroke="#111"
        strokeWidth="3.5"
      />
      {/* Eyes */}
      <ellipse cx="48" cy="48" rx="4.5" ry="6.5" fill="#FFF" stroke="#111" strokeWidth="2.2" />
      <circle cx="49" cy="47" r="2.8" fill="#111" />
      <circle cx="50" cy="45.5" r="1" fill="#FFF" />
      <ellipse cx="62" cy="48" rx="4.5" ry="6.5" fill="#FFF" stroke="#111" strokeWidth="2.2" />
      <circle cx="63" cy="47" r="2.8" fill="#111" />
      <circle cx="64" cy="45.5" r="1" fill="#FFF" />
      {/* Mouth */}
      <path d="M48 60 Q55 70 62 60 Z" fill="#111" stroke="#111" strokeWidth="2" />
      <path d="M52 65 Q55 68 58 65" fill="#FF6584" />
    </svg>
  )
}

// Red/Pink Spiky Starburst Mascot with Cartoon Eyes (Bottom-Right of Folder)
function StarburstMascot({ className = 'w-18 h-18' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <polygon
        points="50,6 59,32 86,18 72,44 98,54 72,66 84,92 58,78 48,98 38,76 12,90 24,64 2,52 26,42 14,16 40,30"
        fill="#FF2E63"
        stroke="#111"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Eyes */}
      <ellipse cx="44" cy="52" rx="4.5" ry="6" fill="#FFF" stroke="#111" strokeWidth="2.2" />
      <circle cx="45" cy="52" r="2.8" fill="#111" />
      <circle cx="46" cy="50.5" r="1" fill="#FFF" />
      <ellipse cx="56" cy="52" rx="4.5" ry="6" fill="#FFF" stroke="#111" strokeWidth="2.2" />
      <circle cx="57" cy="52" r="2.8" fill="#111" />
      <circle cx="58" cy="50.5" r="1" fill="#FFF" />
    </svg>
  )
}

/* ========================================================================= */
/* 4 RICH PROJECTS DATA */
/* ========================================================================= */
const projectsData = [
  {
    id: 'playstaples',
    num: '01',
    tabTitle: 'PlayStaples',
    displayTitle: 'PLAYSTAPLES ©',
    folderColor: '#48C9A8', // Fresh Mint Green
    tabColor: '#48C9A8',
    accentColor: '#FF6584',
    date: 'FEB 20, 2026',
    title: 'PlayStaples',
    subtitle: 'Kaali Peeli Toy Design & Brand Experience',
    category: 'Toy Design & Branding',
    bulletSummary: 'Kaali Peeli Toy Design • 3D CAD Modeling • Retail Packaging',
    description:
      'PlayStaples celebrates iconic Indian street culture through tactile collectible design. "Kaali Peeli" reimagines the legendary Mumbai Premier Padmini taxi as a handcrafted wooden toy—celebrating nostalgia "for the ones who carved dreams on the trunk." Developed with 3D product visualization, custom taxi livery, physical packaging, and brand storytelling.',
    thumbnail: projectPlaystaplesImg,
    previewPhotos: [projectPlaystaplesImg, projectPlaystaplesImg],
    tags: ['Toy Design', '3D Modeling', 'Branding', 'Packaging', 'Figma', 'Collectibles'],
    deliverables: [
      'Handcrafted wooden toy conceptualization & 3D CAD modeling',
      'Authentic "Kaali Peeli" Mumbai taxi colorway & livery details',
      'Custom rooftop luggage rack & tactile wooden wheel proportions',
      'Complete retail packaging design, hangtags & typography',
      'Interactive 3D renders & lifestyle product scene staging',
    ],
    highlights:
      'Transformed an ubiquitous Mumbai cultural emblem into a sleek, nostalgic collectible wooden toy—blending warm organic wood grain with pop-art industrial styling and playful brand identity.',
    tools: ['Figma', '3D Modeling', 'Photoshop', 'Packaging Design'],
    figmaUrl:
      'https://www.figma.com/design/eHCTRQ3nwpXcfMDtlNUO9Q/PlayStaples--Copy-?node-id=474-5581&t=O1mLutYpZ2gweGkb-0',
  },
  {
    id: 'business-cards',
    num: '02',
    tabTitle: 'Oni Studios',
    displayTitle: 'ONI STUDIOS ©',
    folderColor: '#EAB854', // Mustard Manila Yellow
    tabColor: '#EAB854',
    accentColor: '#FF6584',
    date: 'MAR 19, 2026',
    title: 'Oni Design Studios',
    subtitle: 'Brand Identity & Print Design',
    category: 'Brand Identity',
    bulletSummary: 'Brand Identity • Mascot Character Design • Print Production',
    description:
      'Students were given the assignment of researching business cards and designing their own card, either as a freelancer or an employee of any brand. Analysis of the card was done after preparing different iterations which include the logo, colours, typefaces, and dimensions.',
    thumbnail: projectCardsImg,
    previewPhotos: [projectCardsImg, projectCardsImg],
    tags: ['Brand Identity', 'Print Design', 'Figma', 'Procreate', 'Typography'],
    deliverables: [
      'Brand analysis & competitive benchmarking',
      'Custom illustrated anime mascot avatar & color studies',
      'Multiple typographic & layout iterations',
      'Print-ready business cards with custom QR code integration',
      'Complete vector identity guidelines for print production',
    ],
    highlights:
      'Focused on balancing artistic expression with functional corporate dimensions, culminating in a striking cyberpunk purple identity with diagonal layout dynamics.',
    tools: ['Figma', 'Illustrator', 'Procreate'],
  },
  {
    id: 'aureaus',
    num: '03',
    tabTitle: 'Aureaus Audio',
    displayTitle: 'AUREAUS ©',
    folderColor: '#F08264', // Coral Peach
    tabColor: '#F08264',
    accentColor: '#EAB854',
    date: 'MAR 2, 2026',
    title: 'Aureaus Audio',
    subtitle: '3D Hardware & Editorial UI',
    category: '3D Product Design',
    bulletSummary: '3D Product Design • Telemetry Dashboard • Hardware Lookbook',
    description:
      'Aureus is your go-to site for discovering top quality headphones made by the best brands for audio in the market. We focus on bringing you a carefully chosen range of luxurious, high performance headphones that combine superior sound with sleek design.',
    thumbnail: projectAureausImg,
    previewPhotos: [projectAureausImg, projectAureausImg],
    tags: ['3D Modeling', 'Blender', 'Editorial UI', 'Telemetry', 'Hardware Lookbook'],
    deliverables: [
      '3D headphone model rendering & lighting setups in Blender',
      'Editorial audio lookbook & magazine spread typography',
      'Headphone review breakdown & telemetry dashboard',
      'Dark mode product landing page design system',
      'Custom floating geometric props in 3D space',
    ],
    highlights:
      'Seamlessly integrated tactile 3D floating geometries with monochromatic high-contrast audio hardware presentation for modern audiophiles.',
    tools: ['Blender', 'Figma', 'Photoshop'],
  },
  {
    id: 'melody',
    num: '04',
    tabTitle: 'Melody Tickets',
    displayTitle: 'MELODY ©',
    folderColor: '#8B7DE8', // Lavender Purple
    tabColor: '#8B7DE8',
    accentColor: '#FF6584',
    date: 'JAN 12, 2026',
    title: 'Melody Tickets',
    subtitle: 'Entertainment UI/UX & Web Flow',
    category: 'UI/UX & User Flow',
    bulletSummary: 'Interactive Ticketing Funnel • User Flow • UI/UX Design',
    description:
      'The task was to develop a website on any subject, named "MELODY," and demonstrate a user flow for an activity on the site. For instance, outlining the steps of purchasing a movie ticket online or navigating through various sections of a website.',
    thumbnail: projectMelodyImg,
    previewPhotos: [projectMelodyImg, projectMelodyImg],
    tags: ['UI/UX Design', 'User Flow', 'Interactive Funnel', 'Figma', 'Ticketing'],
    deliverables: [
      'Complete end-to-end user flow: discover to ticket checkout',
      'Information architecture & wireframe journeys',
      'Interactive concert ticket seat selector & confirmation modal',
      'Vibrant promotional campaign banner ("NEW SEASON TICKETS!!")',
      'Mobile and desktop responsive breakpoint wireframes',
    ],
    highlights:
      'Designed an intuitive booking funnel that eliminates cart friction, illustrated with floating 3D spheres and bold chromatic accents.',
    tools: ['Figma', 'UI/UX Design', 'User Flow'],
  },
]

const SWIPE_THRESHOLD = 50

export default function ContentsSection() {
  const [layoutMode, setLayoutMode] = useState('stack') // 'stack' | 'grid' | 'list'
  const [activeTabIdx, setActiveTabIdx] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [activeImageZoom, setActiveImageZoom] = useState(null)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  )

  const [disclaimerRef, isDisclaimerVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  const [headerRef, isHeaderVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  // Screen size listener for responsive stack offsets
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' ? window.innerWidth < 640 : false)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleNext = () => {
    setActiveTabIdx((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0))
  }

  const handlePrev = () => {
    setActiveTabIdx((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1))
  }

  const SWIPE_THRESHOLD = 30

  // Framer Motion Drag and Swipe physics handler for responsive touch & mouse drag
  const handleDragEnd = (_e, info) => {
    const { offset, velocity } = info
    const swipePower = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -0.2 || swipePower < -100) {
      handleNext()
    } else if (offset.x > SWIPE_THRESHOLD || velocity.x > 0.2 || swipePower > 100) {
      handlePrev()
    }
    setTimeout(() => setIsDragging(false), 80)
  }

  // Laptop Trackpad: 2-finger horizontal swipe gesture listener
  const stackContainerRef = useRef(null)
  const wheelAccumulatorRef = useRef(0)
  const wheelCooldownRef = useRef(false)
  const wheelTimerRef = useRef(null)

  useEffect(() => {
    const container = stackContainerRef.current
    if (!container) return

    const handleWheel = (e) => {
      // Only handle horizontal trackpad gestures in 'stack' layout mode when no modals are open
      if (layoutMode !== 'stack' || activeProject || activeImageZoom) return

      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)

      // Detect predominant horizontal swipe gesture on trackpad (leaving vertical scroll completely natural)
      if (absX > absY && absX > 4) {
        // Prevent default browser back/forward history navigation gesture on laptops
        e.preventDefault()

        // If currently in gesture cooldown after a card flip, ignore residual trackpad inertia
        if (wheelCooldownRef.current) return

        wheelAccumulatorRef.current += e.deltaX

        // Reset accumulator if the user pauses gesture
        if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current)
        wheelTimerRef.current = setTimeout(() => {
          wheelAccumulatorRef.current = 0
        }, 160)

        const TRACKPAD_SWIPE_THRESHOLD = 28 // Responsive threshold for two-finger swipe

        if (wheelAccumulatorRef.current > TRACKPAD_SWIPE_THRESHOLD) {
          // Swiped left on trackpad -> Next project file
          handleNext()
          wheelCooldownRef.current = true
          wheelAccumulatorRef.current = 0
          setTimeout(() => {
            wheelCooldownRef.current = false
          }, 360)
        } else if (wheelAccumulatorRef.current < -TRACKPAD_SWIPE_THRESHOLD) {
          // Swiped right on trackpad -> Previous project file
          handlePrev()
          wheelCooldownRef.current = true
          wheelAccumulatorRef.current = 0
          setTimeout(() => {
            wheelCooldownRef.current = false
          }, 360)
        }
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current)
    }
  }, [layoutMode, activeProject, activeImageZoom])

  // Bi-directional viewport tracker: resets handwriting animation whenever scrolled past or scrolled above
  const [isHandwritingInView, setIsHandwritingInView] = useState(false)
  const [handwritingKey, setHandwritingKey] = useState(0)
  const handwritingTriggerRef = useRef(null)

  useEffect(() => {
    const el = handwritingTriggerRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsHandwritingInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHandwritingInView(true)
          setHandwritingKey((prev) => prev + 1)
        } else {
          setIsHandwritingInView(false)
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-20px 0px -40px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Keyboard navigation for switching tabs (Left/Right arrows) and closing modals (ESC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProject(null)
        setActiveImageZoom(null)
      } else if (!activeProject && !activeImageZoom && layoutMode === 'stack') {
        if (e.key === 'ArrowRight') {
          setActiveTabIdx((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0))
        } else if (e.key === 'ArrowLeft') {
          setActiveTabIdx((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1))
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeProject, activeImageZoom, layoutMode])

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeProject || activeImageZoom) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeProject, activeImageZoom])

  const scrollToWorks = (e) => {
    e.preventDefault()
    const target = document.getElementById('featured-works')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 3D Staggered calculations matching morphing-card-stack
  const getStackedCards = () => {
    const stacked = []
    for (let i = 0; i < projectsData.length; i++) {
      const idx = (activeTabIdx + i) % projectsData.length
      stacked.push({
        ...projectsData[idx],
        originalIndex: idx,
        stackPosition: i,
      })
    }
    return stacked.reverse() // DOM order: position 0 renders last so it is on top
  }

  const getPositionStyle = (stackPosition) => {
    switch (layoutMode) {
      case 'stack': {
        const yOffset = isMobile ? 8 : 12
        const xOffset = isMobile ? 4 : 8
        const rot = stackPosition === 0 ? 0 : (stackPosition - 1) * 1.8 + 1
        return {
          y: stackPosition * yOffset, // 100% GPU transform (zero layout reflow!)
          x: (stackPosition % 2 === 1 ? 1 : -1) * (stackPosition * xOffset),
          zIndex: 30 - stackPosition,
          rotate: rot,
        }
      }
      case 'grid':
      case 'list':
        return { y: 0, x: 0, zIndex: 1, rotate: 0 }
    }
  }

  // Staggered horizontal cut positions for Manila folder bookmark tabs
  const getTabStyle = (idx) => {
    if (isMobile) {
      if (idx === 3) return { right: '2%', left: 'auto' }
      if (idx === 2) return { left: '48%', right: 'auto' }
      if (idx === 1) return { left: '25%', right: 'auto' }
      return { left: '2%', right: 'auto' }
    }
    const desktopOffsets = ['3%', '26%', '49%', '72%']
    return { left: desktopOffsets[idx] || '0%', right: 'auto' }
  }

  const displayCards =
    layoutMode === 'stack'
      ? getStackedCards()
      : projectsData.map((p, i) => ({ ...p, originalIndex: i, stackPosition: i }))

  return (
    <div className="relative w-full bg-black text-white selection:bg-black selection:text-white">
      {/* ========================================================================= */}
      {/* PART 1: DISCLAIMER HERO BLOCK */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden py-16 px-4 sm:px-6 md:px-8 border-b border-white/10">
        <Auralis height="100%" className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        <div
          ref={disclaimerRef}
          className={`relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center transition-all duration-1000 ${
            isDisclaimerVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-8'
          }`}
        >
          <div className="relative w-full max-w-3xl mx-auto py-2 select-none flex flex-col items-center text-center">
            <h2 className="font-myfont text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-wide drop-shadow-[0_2px_14px_rgba(255,255,255,0.2)] mb-3 sm:mb-4 lowercase">
              disclaimer !
            </h2>

            <p className="font-myfont text-xl sm:text-2xl md:text-[28px] lg:text-[32px] text-neutral-100 font-medium leading-[1.65] max-w-2xl mx-auto lowercase">
              all the projects showcased here are my 2nd year college assignments (4 projects) which i created as part of my coursework.
            </p>

            <div className="w-full max-w-sm sm:max-w-md mx-auto my-3 sm:my-4 flex justify-center opacity-40">
              <svg className="w-full h-2.5 text-neutral-400" viewBox="0 0 500 6" fill="none" preserveAspectRatio="none">
                <path
                  d="M2 3.5 C 90 2, 220 5, 340 3 C 400 2, 460 4.5, 498 3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="font-myfont text-sm sm:text-base md:text-lg text-neutral-400 lowercase tracking-wide">
              (yes , that's my handwriting , don't judge)
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-ca-mono text-neutral-400 text-center">
            <span className="text-neutral-300">Handcrafted in Procreate &amp; Figma</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-300">Symbiosis Institute of Design</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="text-neutral-400">2nd Year Coursework</span>
          </div>

          <div className="mt-6 sm:mt-7 flex flex-col items-center justify-center">
            <a
              href="#featured-works"
              onClick={scrollToWorks}
              className="group flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-all cursor-pointer focus:outline-none"
              aria-label="Scroll down to explore featured assignments"
            >
              <span className="text-xs font-ca-mono tracking-widest uppercase text-neutral-400 group-hover:text-neutral-200 transition-colors">
                Scroll down to explore assignments
              </span>
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/15 group-hover:translate-y-1 transition-all shadow-lg">
                <svg
                  className="w-4 h-4 text-neutral-300 group-hover:text-white transition-colors animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Marquee divider */}
      <MarqueeBar className="border-t border-black relative z-10" />

      {/* ========================================================================= */}
      {/* FEATURED WORKS ONWARDS: DOTTED GRID BACKGROUND CANVAS (WHITE & BLACK DOTS) */}
      {/* ========================================================================= */}
      <div id="work" data-theme="light" className="relative w-full ca-dotted-grid-bg text-neutral-900 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] scroll-mt-14">
        {/* Dotted Grid Pattern Layer */}
        <div className="ca-dotted-grid-pattern" aria-hidden="true" />

        {/* PART 2: CREATIVE ARTSY SECTION HEADER (WITH LETTER REVEAL) */}
        <section id="featured-works" className="relative z-10 w-full pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-8 scroll-mt-16">
          <div
            ref={headerRef}
            className={`mx-auto flex max-w-4xl flex-col items-center text-center transition-all duration-1000 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Cursive handwritten header with animated handwriting */}
            <div ref={handwritingTriggerRef} className="flex flex-col items-center">
              <div className="font-myfont text-3xl sm:text-4xl text-neutral-800 font-medium tracking-wide flex items-center justify-center min-h-[2.5rem] sm:min-h-[3rem]">
                {isHandwritingInView ? (
                  <HandwritingText
                    key={handwritingKey}
                    text="explore my work!"
                    fontUrl="/fonts/Myfont-Regular.ttf"
                    height="1.15em"
                    duration={1.6}
                    delay={0.15}
                    strokeWidth={1.8}
                    className="text-neutral-900"
                  />
                ) : (
                  <span className="opacity-0">explore my work!</span>
                )}
              </div>
              {/* Hand-drawn double squiggle SVG */}
              <svg
                viewBox="0 0 64 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className={`mt-1 h-3.5 w-24 sm:w-28 text-[#E84A4A] transition-all duration-700 delay-300 ${
                  isHandwritingInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                aria-hidden="true"
              >
                <path d="M3 4c18-3 40-3 58 0" />
                <path d="M9 9c14-2.5 32-2.5 46 0" />
              </svg>
            </div>

            {/* Akira Expanded display headline */}
            <h2 className="mt-6 font-akira text-[26px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-neutral-950 uppercase font-black text-center">
              FEATURED WORKS
            </h2>

            {/* Angled Washi Tape Sticker Banner */}
            <div className="mt-8 max-w-md -rotate-[3.6deg] hover:rotate-0 transition-transform duration-300">
              <span className="ca-tape-clip inline-block px-6 py-2.5 text-xs sm:text-sm font-ca-mono font-bold uppercase tracking-wider text-black bg-[#FFE57F] shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-amber-300/60">
                A few products I helped make simpler, calmer, and easier to trust.
              </span>
            </div>
          </div>
        </section>

        {/* Main Interactive Morphing Manila Folder Showcase Container */}
        <div ref={stackContainerRef} className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-8 pb-20 sm:pb-28">
          {/* ========================================================================= */}
          {/* MORPHING CONTROLS: LAYOUT TOGGLE (STACK / GRID / LIST) */}
          {/* ========================================================================= */}
          <div className="relative z-40 flex items-center justify-between flex-wrap gap-4 mb-14 sm:mb-20 -mt-2 sm:-mt-4">
            <div className="flex items-center gap-2.5">
              <span className="font-poppins-light font-light text-xs uppercase tracking-widest text-neutral-700">
                Layout:
              </span>
              <div className="inline-flex items-center p-1 rounded-full bg-white/90 backdrop-blur-md border-2 border-black shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                <button
                  type="button"
                  onClick={() => setLayoutMode('stack')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-akira tracking-wider transition-all cursor-pointer ${
                    layoutMode === 'stack'
                      ? 'bg-black text-white shadow-sm'
                      : 'text-neutral-700 hover:text-black hover:bg-black/5'
                  }`}
                  title="Stack 3D Deck View"
                  aria-label="Switch to stack layout"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Stack</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('grid')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-akira tracking-wider transition-all cursor-pointer ${
                    layoutMode === 'grid'
                      ? 'bg-black text-white shadow-sm'
                      : 'text-neutral-700 hover:text-black hover:bg-black/5'
                  }`}
                  title="2-Column Grid View"
                  aria-label="Switch to grid layout"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('list')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-akira tracking-wider transition-all cursor-pointer ${
                    layoutMode === 'list'
                      ? 'bg-black text-white shadow-sm'
                      : 'text-neutral-700 hover:text-black hover:bg-black/5'
                  }`}
                  title="Editorial List View"
                  aria-label="Switch to list layout"
                >
                  <LayoutList className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">List</span>
                </button>
              </div>
            </div>

            {/* In Stack mode, show swipe & drag hint */}
            {layoutMode === 'stack' && (
              <div className="flex items-center gap-2 text-xs font-poppins-light text-neutral-600 bg-white/70 px-3.5 py-1.5 rounded-full border border-black/10 shadow-xs">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Swipe on trackpad or drag file to flip • Press ← →</span>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* PHYSICAL MANILA FOLDER COMPONENT (STACK / GRID / LIST ANIMATION) */}
          {/* ========================================================================= */}
          <div className="relative z-10 w-full mt-2 sm:mt-4">
            {/* Folder Body Canvas / Morphing Stack Container */}
            <LayoutGroup>
              <div
                className={
                  layoutMode === 'stack'
                    ? 'relative w-full pt-10 sm:pt-14 min-h-[670px] xs:min-h-[650px] sm:min-h-[680px] lg:min-h-[640px]'
                    : layoutMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full'
                    : 'flex flex-col gap-4 sm:gap-5 w-full'
                }
              >
                <AnimatePresence mode="popLayout">
                  {displayCards.map((card) => {
                    const posStyle = getPositionStyle(card.stackPosition)
                    const isTop = layoutMode === 'stack' && card.stackPosition === 0

                    // 1. GRID LAYOUT MODE CARD
                    if (layoutMode === 'grid') {
                      return (
                        <motion.div
                          key={card.id}
                          layoutId={`project-card-${card.id}`}
                          layout
                          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                          className="relative w-full rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-black shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-5 sm:p-7 flex flex-col justify-between overflow-hidden select-none hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-300"
                          style={{ backgroundColor: card.folderColor }}
                        >
                          {/* Top Tab Bar inside Grid Card */}
                          <div className="flex items-center justify-between pb-3 border-b border-black/15">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/10 border border-black/15 text-xs font-akira font-black uppercase text-neutral-950">
                              <span className="w-2 h-2 rounded-full bg-neutral-950" />
                              <span>{card.tabTitle}</span>
                            </div>
                            <span className="font-poppins-light font-light text-xs tracking-widest text-neutral-800 uppercase">
                              {card.date} • {card.category}
                            </span>
                          </div>

                          {/* Card Body: Title, Subtitle, Framed Artwork, Tags */}
                          <div className="py-5 flex flex-col gap-4">
                            <div>
                              <h3 className="font-akira font-black uppercase text-xl sm:text-2xl lg:text-3xl leading-tight text-neutral-950">
                                {card.title}
                              </h3>
                              <p className="mt-1.5 text-xs sm:text-sm font-poppins-light font-light text-neutral-800 line-clamp-2">
                                {card.subtitle}
                              </p>
                            </div>

                            {/* Framed Thumbnail with Washi Tape */}
                            <div
                              onClick={() => setActiveProject(card)}
                              className="relative overflow-hidden border-3 sm:border-4 border-white bg-neutral-950 aspect-[16/10] w-full cursor-pointer group/thumb shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-xs my-1"
                            >
                              <img
                                src={card.thumbnail}
                                alt={card.title}
                                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="px-4 py-2 rounded-full bg-black/90 text-white border border-white/30 text-xs font-poppins-light tracking-wider uppercase">
                                  Inspect Case Study 🔍
                                </span>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5">
                              {card.tags.slice(0, 4).map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="font-poppins-light font-light text-[11px] px-2.5 py-1 uppercase tracking-wide bg-white/90 text-neutral-950 border border-black/15 rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                              {card.tags.length > 4 && (
                                <span className="font-poppins-light font-light text-[11px] px-2 py-1 text-neutral-800">
                                  +{card.tags.length - 4}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Bottom Row CTA */}
                          <div className="pt-3 border-t border-black/15 flex items-center justify-between gap-3">
                            <button
                              onClick={() => setActiveProject(card)}
                              className="font-poppins-light font-light inline-flex items-center gap-2 pb-0.5 border-b-2 border-neutral-950 text-xs sm:text-sm uppercase tracking-[0.18em] cursor-pointer text-neutral-950 hover:text-black/70 font-medium group/cta"
                            >
                              <span>View project</span>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5 group-hover/cta:translate-x-1 transition-transform">
                                <path d="M7 17 17 7M9 7h8v8" />
                              </svg>
                            </button>

                            {card.figmaUrl && (
                              <a
                                href={card.figmaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="font-poppins-light font-light inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/25 bg-black/90 text-white hover:bg-black text-[11px] uppercase tracking-wider"
                              >
                                <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M8 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4 4 4 0 0 0 4-4zm8 0a4 4 0 0 0-4 4v4h4a4 4 0 0 0 0-8zm-8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8zm8 0a4 4 0 0 0-4 4v4a4 4 0 0 0 4-4 4 4 0 0 0 0-4zM8 18a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8z"/>
                                </svg>
                                <span>Figma</span>
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )
                    }

                    // 2. LIST LAYOUT MODE CARD
                    if (layoutMode === 'list') {
                      return (
                        <motion.div
                          key={card.id}
                          layoutId={`project-card-${card.id}`}
                          layout
                          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                          className="relative w-full rounded-2xl border-2 sm:border-3 border-black shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 overflow-hidden select-none hover:translate-x-1.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.18)] transition-all duration-300"
                          style={{ backgroundColor: card.folderColor }}
                        >
                          {/* Left: Project Number, Tab Badge, Title, Subtitle, Tags */}
                          <div className="flex flex-col gap-2 max-w-xl">
                            <div className="flex items-center gap-3">
                              <span className="font-akira font-black text-sm text-black/60">
                                {card.num}
                              </span>
                              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/10 border border-black/15 text-[11px] font-akira font-black uppercase text-neutral-950">
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                                <span>{card.tabTitle}</span>
                              </div>
                              <span className="font-poppins-light font-light text-xs tracking-wider text-neutral-800 uppercase">
                                {card.category}
                              </span>
                            </div>

                            <h3 className="font-akira font-black uppercase text-lg sm:text-2xl text-neutral-950">
                              {card.title}
                            </h3>

                            <p className="text-xs sm:text-sm font-poppins-light font-light text-neutral-800 line-clamp-1">
                              {card.subtitle}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {card.tags.slice(0, 4).map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="font-poppins-light font-light text-[11px] px-2.5 py-0.5 uppercase tracking-wide bg-white/90 text-neutral-950 border border-black/15 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Right: Small Thumbnail & Actions */}
                          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-black/15">
                            <div
                              onClick={() => setActiveProject(card)}
                              className="relative overflow-hidden border-2 border-white bg-neutral-950 w-28 sm:w-36 aspect-[16/10] rounded-xs cursor-pointer group/listThumb shadow-md shrink-0"
                            >
                              <img
                                src={card.thumbnail}
                                alt={card.title}
                                className="w-full h-full object-cover group-hover/listThumb:scale-105 transition-transform duration-300"
                              />
                            </div>

                            <div className="flex flex-col gap-2 items-end">
                              <button
                                onClick={() => setActiveProject(card)}
                                className="font-poppins-light font-light inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                              >
                                <span>Inspect</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3 w-3">
                                  <path d="M7 17 17 7M9 7h8v8" />
                                </svg>
                              </button>

                              {card.figmaUrl && (
                                <a
                                  href={card.figmaUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="font-poppins-light font-light text-[11px] underline uppercase tracking-wider text-neutral-900 hover:text-black"
                                >
                                  Figma File ↗
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )
                    }

                    // 3. STACK LAYOUT MODE CARD (EACH FILE OWNS ITS PHYSICAL BOOKMARK TAB, MOVING TOGETHER)
                    return (
                      <motion.div
                        key={card.id}
                        layoutId={`project-card-${card.id}`}
                        layout={layoutMode !== 'stack'}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          ...posStyle,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        drag={isTop && layoutMode === 'stack' ? 'x' : false}
                        dragDirectionLock={true}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={isMobile ? 0.6 : 0.85}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ scale: 1.015, cursor: 'grabbing' }}
                        className={`absolute inset-x-0 top-10 sm:top-14 w-full select-none touch-pan-y transform-gpu will-change-transform ${
                          isTop ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                        }`}
                        style={{
                          zIndex: posStyle.zIndex,
                        }}
                      >
                        {/* Physical Manila Bookmark / Tab attached directly to THIS file */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation()
                            if (!isDragging) {
                              setActiveTabIdx(card.originalIndex)
                            }
                          }}
                          className={`absolute -top-9 sm:-top-12 z-20 inline-flex items-center gap-1 sm:gap-2 px-2.5 xs:px-3 sm:px-6 py-2 sm:py-3 rounded-t-xl sm:rounded-t-3xl border-t-2 sm:border-t-3 border-x-2 sm:border-x-3 border-black font-akira font-black text-[9px] xs:text-[10px] sm:text-xs md:text-[13px] uppercase tracking-wider cursor-pointer select-none transition-all shadow-[0_-4px_12px_rgba(0,0,0,0.15)] ${
                            isTop
                              ? 'text-black shadow-[0_-6px_16px_rgba(0,0,0,0.22)]'
                              : 'text-neutral-900 opacity-95 hover:opacity-100 hover:-translate-y-0.5'
                          }`}
                          style={{
                            ...getTabStyle(card.originalIndex),
                            backgroundColor: card.folderColor,
                            borderBottom: `3.5px solid ${card.folderColor}`,
                            marginBottom: '-3.5px',
                          }}
                          title={`Open ${card.title} file`}
                        >
                          {/* Active Tab Mascot Eyes Icon or Dot */}
                          {isTop ? (
                            <span className="flex items-center -space-x-0.5 shrink-0">
                              <span className="w-2.5 h-3 bg-black rounded-full border border-white flex items-center justify-center">
                                <span className="w-1 h-1 bg-white rounded-full translate-x-0.5 -translate-y-0.5" />
                              </span>
                              <span className="w-2.5 h-3 bg-black rounded-full border border-white flex items-center justify-center">
                                <span className="w-1 h-1 bg-white rounded-full translate-x-0.5 -translate-y-0.5" />
                              </span>
                            </span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-black/60 shrink-0" />
                          )}
                          <span className="hidden sm:inline whitespace-nowrap">{card.tabTitle}</span>
                          <span className="sm:hidden whitespace-nowrap">{card.num} {card.tabTitle.split(' ')[0]}</span>
                        </div>

                        {/* Manila Folder Body Canvas */}
                        <div
                          className={`relative w-full rounded-2xl sm:rounded-[40px] border-2 sm:border-3 border-black overflow-hidden transition-colors duration-300 p-5 sm:p-10 lg:p-12 min-h-[500px] sm:min-h-[540px] flex flex-col justify-between ${
                            isTop
                              ? 'shadow-[0_12px_32px_rgba(0,0,0,0.22)] sm:shadow-[0_25px_80px_rgba(0,0,0,0.35)]'
                              : 'shadow-[0_6px_16px_rgba(0,0,0,0.12)]'
                          }`}
                          style={{ backgroundColor: card.folderColor }}
                        >
                          {!isTop ? (
                            /* Lightweight shell for background cards: zero images, zero heavy DOM, instant GPU rendering */
                            <div
                              className="absolute inset-0 z-30 bg-black/[0.08] hover:bg-black/[0.03] transition-colors cursor-pointer flex flex-col justify-between p-5 sm:p-10"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (!isDragging) {
                                  setActiveTabIdx(card.originalIndex)
                                }
                              }}
                              title={`Bring ${card.title} to front`}
                            >
                              <div className="w-full flex items-center justify-between text-xs sm:text-sm font-akira font-black uppercase tracking-wider text-black/70 pb-4 border-b border-black/15">
                                <span className="font-poppins-light font-light text-xs tracking-widest uppercase text-neutral-800">
                                  FOLDER // 0{card.originalIndex + 1}
                                </span>
                                <span className="font-poppins-light font-light text-xs uppercase tracking-wider text-neutral-800">
                                  {card.category}
                                </span>
                              </div>
                              <div className="flex-1 flex items-center justify-center pointer-events-none px-2">
                                <span className="font-akira text-black/15 text-2xl xs:text-3xl sm:text-5xl font-black uppercase select-none truncate max-w-full text-center">
                                  {card.displayTitle || card.title}
                                </span>
                              </div>
                              <div className="w-full pt-4 border-t border-black/15 flex items-center justify-between text-xs font-poppins-light text-neutral-800 tracking-wider uppercase">
                                <span>Click bookmark or file to bring to front</span>
                                <span>0{card.originalIndex + 1}</span>
                              </div>
                            </div>
                          ) : (
                            /* Full interactive contents ONLY for the active top card */
                            <>
                              {/* Retro Cartoon Mascot Stickers on the Right of Folder */}
                              <div className="absolute top-10 sm:top-14 -right-2 sm:right-6 z-10 pointer-events-none select-none -rotate-[8deg] hover:rotate-0 transition-transform hidden sm:block">
                                <HandMascot className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-[0_4px_14px_rgba(0,0,0,0.15)]" />
                              </div>

                              <div className="absolute bottom-3 sm:bottom-5 right-4 sm:right-8 z-10 pointer-events-none select-none rotate-[10deg] hover:rotate-0 transition-transform hidden sm:block">
                                <StarburstMascot className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_6px_16px_rgba(0,0,0,0.2)]" />
                              </div>

                              {/* Folder Top Metadata Row */}
                              <div className="w-full flex items-center justify-between text-xs sm:text-sm font-akira font-black uppercase tracking-wider text-black/80 pb-3 sm:pb-4 border-b border-black/15 z-10">
                                <div className="flex items-center gap-2.5 sm:gap-3">
                                  <span className="bg-black/10 px-3 py-1 rounded-full border border-black/15 text-neutral-950 font-poppins-light font-light text-[11px] sm:text-xs tracking-widest inline-flex items-center gap-1.5 sm:gap-2">
                                    <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-neutral-950" />
                                    {card.date}
                                  </span>
                                  <span className="font-poppins-light font-light text-xs tracking-widest uppercase text-neutral-800 hidden sm:inline-block">
                                    FOLDER // 0{card.originalIndex + 1}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-poppins-light font-light text-[11px] sm:text-xs uppercase tracking-wider text-neutral-800">
                                    {card.category}
                                  </span>
                                </div>
                              </div>

                              {/* Main 2-Column Content Layout (On mobile: artwork at top order-1, text below order-2) */}
                              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 sm:gap-10 lg:gap-12 py-3 sm:py-8 items-center text-left">
                                {/* Details Column: Title, Subtitle, Full Description, Actions, Tags (order-2 on mobile, order-1 on desktop) */}
                                <div className="order-2 lg:order-1 flex flex-col justify-between h-full">
                                  <div>
                                    <h2 className="font-akira font-black uppercase text-lg xs:text-xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px] leading-[1.1] tracking-tight text-neutral-950">
                                      {card.title}
                                    </h2>

                                    <p className="mt-1 sm:mt-2 text-xs xs:text-sm sm:text-base font-poppins-light font-light tracking-wider uppercase text-neutral-800">
                                      {card.subtitle}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="mt-3.5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                                      <button
                                        onClick={(e) => {
                                          if (isDragging) return
                                          e.stopPropagation()
                                          setActiveProject(card)
                                        }}
                                        className="font-poppins-light font-light inline-flex items-center gap-2 pb-1 border-b-2 border-neutral-950 text-xs sm:text-sm uppercase tracking-[0.2em] cursor-pointer text-neutral-950 hover:text-black/70 transition-all group/cta font-medium"
                                      >
                                        View project
                                        <svg
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2.4"
                                          className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover/cta:translate-x-1 transition-transform"
                                          aria-hidden="true"
                                        >
                                          <path d="M7 17 17 7M9 7h8v8" />
                                        </svg>
                                      </button>

                                      {card.figmaUrl && (
                                        <a
                                          href={card.figmaUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="font-poppins-light font-light inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-black/25 bg-black/90 text-white hover:bg-black transition-all text-xs uppercase tracking-wider group/figma shadow-sm"
                                          title="Open design file in Figma"
                                        >
                                          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4 4 4 0 0 0 4-4zm8 0a4 4 0 0 0-4 4v4h4a4 4 0 0 0 0-8zm-8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8zm8 0a4 4 0 0 0-4 4v4a4 4 0 0 0 4-4 4 4 0 0 0 0-4zM8 18a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8z"/>
                                          </svg>
                                          <span>Figma File</span>
                                          <svg className="w-3 h-3 group-hover/figma:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M7 17 17 7M9 7h8v8" />
                                          </svg>
                                        </a>
                                      )}
                                    </div>
                                  </div>

                                  {/* Tags Badges */}
                                  <div className="mt-3.5 sm:mt-8 flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                                    {card.tags.map((tag, tIdx) => (
                                      <span
                                        key={tIdx}
                                        className="font-poppins-light font-light text-[10px] xs:text-[11px] sm:text-sm px-2 sm:px-3.5 py-0.5 sm:py-1.5 uppercase tracking-wide bg-white/95 text-neutral-950 border border-black/15 rounded-md shadow-xs"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Artwork Column: Framed Thumbnail Artwork with Washi Tape Mounts (order-1 on mobile, order-2 on desktop) */}
                                <div className="order-1 lg:order-2 relative mt-1.5 sm:mt-0">
                                  <span
                                    aria-hidden="true"
                                    className="washi-tape absolute -left-4 sm:-left-5 -top-2.5 sm:-top-3 z-20 h-5 sm:h-6 w-20 sm:w-24 -rotate-[9deg] shadow-[0_1px_3px_rgba(17,18,18,0.25)] pointer-events-none"
                                  />
                                  <span
                                    aria-hidden="true"
                                    className="washi-tape absolute -right-4 sm:-right-5 -top-2.5 sm:-top-3 z-20 h-5 sm:h-6 w-20 sm:w-24 rotate-[9deg] shadow-[0_1px_3px_rgba(17,18,18,0.25)] pointer-events-none"
                                  />

                                  <div
                                    onClick={(e) => {
                                      if (isDragging) return
                                      e.stopPropagation()
                                      setActiveProject(card)
                                    }}
                                    className="relative overflow-hidden border-3 sm:border-6 border-white bg-neutral-950 aspect-[4/3] sm:aspect-[16/11] md:aspect-[4/3] w-full cursor-pointer group/thumb shadow-[0_14px_36px_rgba(0,0,0,0.22)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.28)] rounded-xs"
                                    title="Inspect Case Study"
                                  >
                                    <div className="relative overflow-hidden h-full w-full bg-neutral-900">
                                      <img
                                        src={card.thumbnail}
                                        alt={card.title}
                                        draggable="false"
                                        className="absolute inset-0 h-full w-full object-contain sm:object-cover group-hover/thumb:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                                      />
                                    </div>

                                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                      <span className="px-5 py-2.5 rounded-full bg-black/90 text-white border border-white/30 text-xs font-poppins-light tracking-widest uppercase shadow-2xl">
                                        Inspect Case Study 🔍
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Folder Bottom Row */}
                              <div className="w-full pt-3 sm:pt-4 border-t border-black/15 z-10 flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-poppins-light text-neutral-900 tracking-wider uppercase gap-2">
                                <span className="truncate max-w-[260px] xs:max-w-[300px] sm:max-w-none">{card.bulletSummary}</span>
                                <span className="font-semibold text-neutral-800 hidden sm:inline">
                                  Swipe on trackpad or drag file to flip • Press ← →
                                </span>
                                <span className="font-semibold text-neutral-800 sm:hidden">
                                  Swipe file to flip
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )

                  })}
                </AnimatePresence>
              </div>
            </LayoutGroup>

            {/* Left & Right Circular Arrow Navigation Controls (in Stack mode) */}
            {layoutMode === 'stack' && (
              <>
                <button
                  onClick={() => setActiveTabIdx((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1))}
                  className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-13 sm:h-13 min-w-[36px] min-h-[36px] sm:min-w-[52px] sm:min-h-[52px] rounded-full bg-white text-black border-2 sm:border-3 border-black shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Previous project"
                  aria-label="Previous project"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => setActiveTabIdx((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0))}
                  className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-13 sm:h-13 min-w-[36px] min-h-[36px] sm:min-w-[52px] sm:min-h-[52px] rounded-full bg-white text-black border-2 sm:border-3 border-black shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Next project"
                  aria-label="Next project"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Quick Project Switcher & Pagination Dots below Folder (in Stack mode) */}
          {layoutMode === 'stack' && (
            <div className="mt-12 flex flex-col items-center justify-center gap-4 z-10 relative">
              {/* Pagination Dots matching morphing-card-stack */}
              <div className="flex items-center justify-center gap-2">
                {projectsData.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveTabIdx(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer border border-black ${
                      idx === activeTabIdx
                        ? 'w-8 bg-black shadow-sm'
                        : 'w-2.5 bg-neutral-300 hover:bg-neutral-500'
                    }`}
                    aria-label={`Go to ${p.title}`}
                    title={`Go to ${p.title}`}
                  />
                ))}
              </div>

              {/* Project Pill Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {projectsData.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveTabIdx(idx)}
                    className={`px-4 sm:px-5 py-2 rounded-full border-2 border-black font-poppins text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      idx === activeTabIdx
                        ? 'bg-black text-white shadow-lg scale-105'
                        : 'bg-white text-neutral-800 hover:bg-neutral-100 hover:border-black'
                    }`}
                  >
                    0{idx + 1} {p.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY DETAIL MODAL */}
      {/* ========================================================================= */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={() => setActiveProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} Case Study`}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#101015] border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-5 sm:p-8 lg:p-10 my-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex flex-col gap-1">
                <div className="font-poppins-light font-light inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeProject.accentColor }} />
                  <span>{activeProject.num} / 0{projectsData.length} • {activeProject.category}</span>
                </div>
                <h3 className="font-akira font-black uppercase text-xl sm:text-3xl tracking-tight text-white">
                  {activeProject.title}
                </h3>
                <p className="font-poppins-light font-light text-neutral-300 text-xs sm:text-sm">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-neutral-300 hover:text-white transition-all cursor-pointer focus:outline-none shrink-0"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 pt-6">
              {/* Left Column: Full Project Narrative */}
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-poppins-light font-light text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    Project Overview
                  </h4>
                  <p className="font-poppins font-normal text-sm sm:text-base text-neutral-200 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-poppins-light font-light text-xs uppercase tracking-widest text-neutral-400 mb-2">
                    Key Highlights &amp; Insights
                  </h4>
                  <p className="font-poppins font-normal text-sm sm:text-base text-neutral-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                    {activeProject.highlights}
                  </p>
                </div>

                <div>
                  <h4 className="font-poppins-light font-light text-xs uppercase tracking-widest text-neutral-400 mb-3">
                    Core Deliverables
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {activeProject.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="font-poppins font-normal text-xs sm:text-sm text-neutral-300 flex items-start gap-3">
                        <span className="text-white mt-1 shrink-0">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-poppins-light font-light text-xs uppercase tracking-widest text-neutral-400 mb-2.5">
                    Tools &amp; Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tools.map((tool, toolIdx) => (
                      <span
                        key={toolIdx}
                        className="font-poppins-light font-light text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white uppercase tracking-wider"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {activeProject.figmaUrl && (
                  <div className="pt-2">
                    <a
                      href={activeProject.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-poppins-light font-light inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 transition-all font-semibold text-xs uppercase tracking-wider shadow-lg"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4 4 4 0 0 0 4-4zm8 0a4 4 0 0 0-4 4v4h4a4 4 0 0 0 0-8zm-8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8zm8 0a4 4 0 0 0-4 4v4a4 4 0 0 0 4-4 4 4 0 0 0 0-4zM8 18a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8z"/>
                      </svg>
                      <span>Open Live Figma Design File</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column: Full Resolution Artwork with Zoom Trigger */}
              <div className="flex flex-col gap-4">
                <div
                  className="relative group/modalImg overflow-hidden rounded-xl border border-white/20 bg-black cursor-zoom-in shadow-2xl"
                  onClick={() => setActiveImageZoom(activeProject.thumbnail)}
                  title="Click to view full-resolution artwork"
                >
                  <img
                    src={activeProject.thumbnail}
                    alt={`${activeProject.title} Full Artwork`}
                    className="w-full h-auto max-h-[500px] object-contain group-hover/modalImg:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/modalImg:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="font-poppins-light font-light text-xs px-4 py-2 rounded-full bg-black/80 text-white border border-white/30 tracking-wider uppercase">
                      Click to Expand 🔍
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProject.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-poppins-light font-light text-xs px-3 py-1 rounded bg-white/5 border border-white/10 text-neutral-300 uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL RESOLUTION IMAGE ZOOM LIGHTBOX */}
      {/* ========================================================================= */}
      {activeImageZoom && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn cursor-zoom-out"
          onClick={() => setActiveImageZoom(null)}
          role="dialog"
          aria-label="Full-resolution image preview"
        >
          <div className="relative max-w-7xl max-h-[95vh] flex items-center justify-center">
            <img
              src={activeImageZoom}
              alt="Zoomed artwork inspection"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_0_80px_rgba(255,255,255,0.15)]"
            />
            <button
              onClick={() => setActiveImageZoom(null)}
              className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/70 hover:bg-black active:scale-95 text-white border border-white/30 transition-all cursor-pointer"
              aria-label="Close zoom"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
