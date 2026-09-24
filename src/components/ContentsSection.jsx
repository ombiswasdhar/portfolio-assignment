import React, { useState, useEffect, useRef } from 'react'
import projectCardsImg from '../assets/work/project_cards.jpg'
import projectAureausImg from '../assets/work/project_aureaus.png'
import projectMelodyImg from '../assets/work/project_melody.jpg'
import projectPlaystaplesImg from '../assets/work/project_playstaples.png'
import charThinkingImg from '../assets/about/char_thinking_perfect.png'
import charPointingImg from '../assets/about/char_pointing_perfect.png'
import smileyImg from '../assets/hero/smiley_rendered.png'
import crownImg from '../assets/hero/crown_rendered.png'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { HandwritingText } from '@/components/ui/handwriting-text'
import Auralis from '@/components/ui/auralis'
import MarqueeBar from './MarqueeBar'

/* ========================================================================= */
/* RETRO CARTOON MASCOT CHARACTERS MATCHING REFERENCE IMAGE */
/* ========================================================================= */

// Pink Fluffy Cloud Mascot with Cartoon Eyes (Top-Left of Folder)
function CloudMascot({ className = 'w-16 h-16' }) {
  return (
    <svg viewBox="0 0 100 90" className={className} fill="none" aria-hidden="true">
      <path
        d="M25 65 C15 65 10 55 12 45 C10 32 20 25 32 28 C38 15 55 12 65 22 C75 16 88 24 88 36 C95 44 94 56 86 64 C80 70 70 68 65 65 C55 72 35 72 25 65 Z"
        fill="#FF6584"
        stroke="#111"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Left Cartoon Eye */}
      <ellipse cx="42" cy="42" rx="6.5" ry="8.5" fill="#FFF" stroke="#111" strokeWidth="2.5" />
      <ellipse cx="43.5" cy="40" rx="3.5" ry="4.5" fill="#111" />
      <circle cx="45" cy="38" r="1.5" fill="#FFF" />
      {/* Right Cartoon Eye */}
      <ellipse cx="58" cy="42" rx="6.5" ry="8.5" fill="#FFF" stroke="#111" strokeWidth="2.5" />
      <ellipse cx="59.5" cy="40" rx="3.5" ry="4.5" fill="#111" />
      <circle cx="61" cy="38" r="1.5" fill="#FFF" />
      {/* Cute Smile */}
      <path d="M46 54 Q50 58 54 54" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
      {/* Little Hands Clutched */}
      <ellipse cx="50" cy="62" rx="5" ry="3.5" fill="#FF8DA1" stroke="#111" strokeWidth="2" />
    </svg>
  )
}

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

// The Iconic Black Cartoon Eyes Badge with Yellow Border
function CartoonEyesBadge({ className = '' }) {
  return (
    <div className={`relative inline-flex items-center justify-center p-1.5 bg-[#EAB854] rounded-full border-2 border-black shadow-[0_4px_12px_rgba(0,0,0,0.25)] select-none ${className}`}>
      <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-black rounded-full">
        {/* Left eye */}
        <div className="w-5 h-6 bg-black rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
          <div className="w-2.5 h-3.5 bg-white rounded-full translate-x-0.5 -translate-y-0.5" />
        </div>
        {/* Right eye */}
        <div className="w-5 h-6 bg-black rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
          <div className="w-2.5 h-3.5 bg-white rounded-full translate-x-0.5 -translate-y-0.5" />
        </div>
      </div>
    </div>
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
    folderColor: '#48C9A8', // Fresh Mint Green (clearly distinct from Oni Studios yellow)
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

export default function ContentsSection() {
  const [activeTabIdx, setActiveTabIdx] = useState(0)
  const [activeProject, setActiveProject] = useState(null)
  const [activeImageZoom, setActiveImageZoom] = useState(null)
  const [disclaimerRef, isDisclaimerVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  const [headerRef, isHeaderVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  // Mobile touch swipe gestures for intuitive project flipping
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)
  const minSwipeDistance = 45

  const handleTouchStart = (e) => {
    setTouchEndX(null)
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return
    const distance = touchStartX - touchEndX
    if (distance > minSwipeDistance) {
      // Swiped Left -> Next project
      setActiveTabIdx((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0))
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Previous project
      setActiveTabIdx((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1))
    }
  }

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
      } else if (!activeProject && !activeImageZoom) {
        if (e.key === 'ArrowRight') {
          setActiveTabIdx((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0))
        } else if (e.key === 'ArrowLeft') {
          setActiveTabIdx((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1))
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeProject, activeImageZoom])

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

  const currentProject = projectsData[activeTabIdx]

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
      <div data-theme="light" className="relative w-full ca-dotted-grid-bg text-neutral-900 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        {/* Dotted Grid Pattern Layer */}
        <div className="ca-dotted-grid-pattern" aria-hidden="true" />

        {/* PART 2: CREATIVE ARTSY SECTION HEADER (WITH LETTER REVEAL) */}
        <section id="featured-works" className="relative z-10 w-full pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-8">
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

        {/* Main Interactive Manila Folder Showcase Container */}
        <div className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-8 pb-20 sm:pb-28">
          {/* ========================================================================= */}
          {/* PHYSICAL MANILA FOLDER COMPONENT (EXACT GEOMETRY FROM IMAGE) */}
          {/* ========================================================================= */}
          <div className="relative w-full">
            {/* Top Folder Tabs Bar */}
            <div className="relative z-20 flex items-end gap-1.5 sm:gap-2 px-3 sm:px-8 -mb-[2.5px] overflow-x-auto no-scrollbar">
              {projectsData.map((p, idx) => {
                const isActive = idx === activeTabIdx
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveTabIdx(idx)}
                    className={`group relative inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-t-2xl sm:rounded-t-3xl border-t-2 sm:border-t-3 border-x-2 sm:border-x-3 border-black font-akira font-black text-xs sm:text-[13px] uppercase tracking-wider cursor-pointer transition-all duration-200 select-none shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'z-30 text-black shadow-[0_-4px_14px_rgba(0,0,0,0.18)]'
                        : 'z-10 text-neutral-900 opacity-90 hover:opacity-100 hover:-translate-y-0.5'
                    }`}
                    style={{
                      backgroundColor: p.folderColor,
                      borderBottom: isActive ? `3.5px solid ${p.folderColor}` : '2.5px solid #000',
                    }}
                    title={`Open ${p.title} folder`}
                  >
                    {/* Active Tab Mascot Eyes Icon */}
                    {isActive ? (
                      <span className="flex items-center -space-x-0.5">
                        <span className="w-2.5 h-3 bg-black rounded-full border border-white flex items-center justify-center">
                          <span className="w-1 h-1 bg-white rounded-full translate-x-0.5 -translate-y-0.5" />
                        </span>
                        <span className="w-2.5 h-3 bg-black rounded-full border border-white flex items-center justify-center">
                          <span className="w-1 h-1 bg-white rounded-full translate-x-0.5 -translate-y-0.5" />
                        </span>
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-black/60 group-hover:bg-black" />
                    )}
                    <span>{p.tabTitle}</span>
                  </button>
                )
              })}
            </div>

            {/* Folder Body Canvas with 2-Column Info & Framed Imagery */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-full rounded-2xl sm:rounded-[40px] border-2 sm:border-3 border-black shadow-[0_25px_80px_rgba(0,0,0,0.4)] overflow-hidden transition-colors duration-500 p-5 sm:p-10 lg:p-12 min-h-[460px] sm:min-h-[540px] flex flex-col justify-between select-none touch-pan-y"
              style={{ backgroundColor: currentProject.folderColor }}
            >
              {/* Retro Cartoon Mascot Stickers on the Right of Folder (Clear of text) */}
              {/* 1. White Cartoon Hand Mascot (Far Right) */}
              <div className="absolute top-10 sm:top-14 -right-2 sm:right-6 z-10 pointer-events-none select-none -rotate-[8deg] hover:rotate-0 transition-transform hidden sm:block">
                <HandMascot className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-[0_4px_14px_rgba(0,0,0,0.15)]" />
              </div>

              {/* 2. Red/Pink Spiky Starburst Mascot (Bottom-Right) */}
              <div className="absolute bottom-3 sm:bottom-5 right-4 sm:right-8 z-10 pointer-events-none select-none rotate-[10deg] hover:rotate-0 transition-transform hidden sm:block">
                <StarburstMascot className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_6px_16px_rgba(0,0,0,0.2)]" />
              </div>

              {/* Folder Top Metadata Row */}
              <div className="w-full flex items-center justify-between text-xs sm:text-sm font-akira font-black uppercase tracking-wider text-black/80 pb-4 border-b border-black/15 z-10">
                <div className="flex items-center gap-3">
                  <span className="bg-black/10 px-3.5 py-1 rounded-full border border-black/15 text-neutral-950 font-poppins-light font-light text-xs tracking-widest inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-neutral-950" />
                    {currentProject.date}
                  </span>
                  <span className="font-poppins-light font-light text-xs tracking-widest uppercase text-neutral-800 hidden sm:inline-block">
                    FOLDER // 0{activeTabIdx + 1}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-poppins-light font-light text-xs uppercase tracking-wider text-neutral-800">
                    {currentProject.category}
                  </span>
                </div>
              </div>

              {/* Main 2-Column Content Layout (from Previous Iteration) */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 sm:gap-10 lg:gap-12 py-6 sm:py-8 items-center text-left">
                {/* Left Column: Title, Subtitle, Full Description, Actions, Tags */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    {/* Massive Title in Akira Expanded */}
                    <h2 className="font-akira font-black uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px] leading-[1.08] tracking-tight text-neutral-950">
                      {currentProject.title}
                    </h2>

                    {/* Subtitle in Poppins Light */}
                    <p className="mt-2 text-sm sm:text-base font-poppins-light font-light tracking-wider uppercase text-neutral-800">
                      {currentProject.subtitle}
                    </p>


                    {/* Action Buttons in Poppins Light */}
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setActiveProject(currentProject)}
                        className="font-poppins-light font-light inline-flex items-center gap-2.5 pb-1 border-b-2 border-neutral-950 text-sm uppercase tracking-[0.2em] cursor-pointer text-neutral-950 hover:text-black/70 transition-all group/cta font-medium"
                      >
                        View project
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          className="h-4 w-4 group-hover/cta:translate-x-1 transition-transform"
                          aria-hidden="true"
                        >
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </button>

                      {currentProject.figmaUrl && (
                        <a
                          href={currentProject.figmaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-poppins-light font-light inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/25 bg-black/90 text-white hover:bg-black transition-all text-xs uppercase tracking-wider group/figma shadow-sm"
                          title="Open design file in Figma"
                        >
                          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4 4 4 0 0 0 4-4V6a4 4 0 0 0-4-4zm8 0a4 4 0 0 0-4 4v4h4a4 4 0 0 0 0-8zm-8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8zm8 0a4 4 0 0 0-4 4v4a4 4 0 0 0 4-4 4 4 0 0 0 0-4zM8 18a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8z"/>
                          </svg>
                          <span>Figma File</span>
                          <svg className="w-3 h-3 group-hover/figma:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M7 17 17 7M9 7h8v8" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tags Badges in Poppins Light */}
                  <div className="mt-8 flex flex-wrap gap-2 pt-2">
                    {currentProject.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-poppins-light font-light text-xs sm:text-sm px-3.5 py-1.5 uppercase tracking-wide bg-white/95 text-neutral-950 border border-black/15 rounded-md shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Framed Thumbnail Artwork with Washi Tape Mounts */}
                <div className="relative">
                  {/* Washi masking tape: Top-Left */}
                  <span
                    aria-hidden="true"
                    className="washi-tape absolute -left-5 -top-3 z-20 h-6 w-24 -rotate-[9deg] shadow-[0_1px_3px_rgba(17,18,18,0.25)] pointer-events-none"
                  />
                  {/* Washi masking tape: Top-Right */}
                  <span
                    aria-hidden="true"
                    className="washi-tape absolute -right-5 -top-3 z-20 h-6 w-24 rotate-[9deg] shadow-[0_1px_3px_rgba(17,18,18,0.25)] pointer-events-none"
                  />

                  {/* Tactile Framed Artwork Box */}
                  <div
                    onClick={() => setActiveProject(currentProject)}
                    className="relative overflow-hidden border-4 sm:border-6 border-white bg-neutral-950 aspect-[4/3] sm:aspect-[16/11] md:aspect-[4/3] w-full cursor-pointer group/thumb shadow-[0_20px_50px_rgba(0,0,0,0.28)] rounded-xs"
                    title="Inspect Case Study"
                  >
                    <div className="relative overflow-hidden h-full w-full">
                      <img
                        src={currentProject.thumbnail}
                        alt={currentProject.title}
                        className="absolute inset-0 h-full w-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Hover Pill */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-5 py-2.5 rounded-full bg-black/90 text-white border border-white/30 text-xs font-poppins-light tracking-widest uppercase shadow-2xl">
                        Inspect Case Study 🔍
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Folder Bottom Row */}
              <div className="w-full pt-4 border-t border-black/15 z-10 flex flex-wrap items-center justify-between text-xs font-poppins-light text-neutral-900 tracking-wider uppercase gap-2">
                <span>{currentProject.bulletSummary}</span>
                <span className="font-semibold text-neutral-800 hidden sm:inline">Press ← → to flip files</span>
                <span className="font-semibold text-neutral-800 sm:hidden">Swipe ← → to flip</span>
              </div>
            </div>

            {/* Left & Right Circular Arrow Navigation Controls */}
            <button
              onClick={() => setActiveTabIdx((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1))}
              className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-13 sm:h-13 min-w-[36px] min-h-[36px] sm:min-w-[52px] sm:min-h-[52px] rounded-full bg-white text-black border-2 sm:border-3 border-black shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
              title="Previous project"
              aria-label="Previous project"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setActiveTabIdx((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0))}
              className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-13 sm:h-13 min-w-[36px] min-h-[36px] sm:min-w-[52px] sm:min-h-[52px] rounded-full bg-white text-black border-2 sm:border-3 border-black shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
              title="Next project"
              aria-label="Next project"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Quick Project Switcher Pill Bar below Folder */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 z-10 relative">
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
                        <path d="M8 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4 4 4 0 0 0 4-4V6a4 4 0 0 0-4-4zm8 0a4 4 0 0 0-4 4v4h4a4 4 0 0 0 0-8zm-8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8zm8 0a4 4 0 0 0-4 4v4a4 4 0 0 0 4-4 4 4 0 0 0 0-4zM8 18a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8z"/>
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
