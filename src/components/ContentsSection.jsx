import React, { useState, useEffect, useRef } from 'react'
import projectCardsImg from '../assets/work/project_cards.jpg'
import projectAureausImg from '../assets/work/project_aureaus.png'
import projectMelodyImg from '../assets/work/project_melody.jpg'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { HandwritingText } from '@/components/ui/handwriting-text'
import MarqueeBar from './MarqueeBar'

const projectsData = [
  {
    id: 'business-cards',
    num: '01',
    tabLabel: 'Project 01',
    tabBg: '#CB9DE2',
    cardBg: '#CB9DE2',
    accentColor: '#8B5CF6',
    isLight: true,
    date: 'MAR 19, 2026',
    title: 'Oni Design Studios',
    subtitle: 'Brand Identity & Print Design',
    category: 'Brand Identity',
    description:
      'Students were given the assignment of researching business cards and designing their own card, either as a freelancer or an employee of any brand. Analysis of the card was done after preparing different iterations which include the logo, colours, typefaces, and dimensions.',
    thumbnail: projectCardsImg,
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
    num: '02',
    tabLabel: 'Project 02',
    tabBg: '#191510',
    cardBg: '#121316',
    accentColor: '#E84A4A',
    date: 'MAR 2, 2026',
    title: 'Aureaus Audio',
    subtitle: '3D Hardware & Editorial UI',
    category: '3D Product Design',
    description:
      'Aureus is your go-to site for discovering top quality headphones made by the best brands for audio in the market. We focus on bringing you a carefully chosen range of luxurious, high performance headphones that combine superior sound with sleek design.',
    thumbnail: projectAureausImg,
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
    num: '03',
    tabLabel: 'Project 03',
    tabBg: '#2563EB',
    cardBg: '#1E3A8A',
    accentColor: '#60A5FA',
    date: 'JAN 12, 2026',
    title: 'Melody Tickets',
    subtitle: 'Entertainment UI/UX & Web Flow',
    category: 'UI/UX & User Flow',
    description:
      'The task was to develop a website on any subject, named "MELODY," and demonstrate a user flow for an activity on the site. For instance, outlining the steps of purchasing a movie ticket online or navigating through various sections of a website.',
    thumbnail: projectMelodyImg,
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
  const [activeProject, setActiveProject] = useState(null)
  const [activeImageZoom, setActiveImageZoom] = useState(null)
  const [disclaimerRef, isDisclaimerVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  const [headerRef, isHeaderVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

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
          // Reset animation whenever scrolled past it (down) or scrolled above it (up)
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

  // ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProject(null)
        setActiveImageZoom(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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

  const scrollToCard = (id) => {
    const el = document.getElementById(`project-card-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToWorks = (e) => {
    e.preventDefault()
    const target = document.getElementById('featured-works')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="work" className="relative w-full bg-[#08080C] text-white select-none overflow-x-clip">
      {/* Ambient background glow orbs */}
      <div
        className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-900/10 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-blue-900/10 blur-[180px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* PART 1: DISCLAIMER PRELUDE (AUTHENTIC SYMBIOSIS HANDWRITING) */}
      {/* ========================================================================= */}
      <section
        aria-label="Coursework Disclaimer"
        className="relative w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16"
      >
        <div
          ref={disclaimerRef}
          className={`relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center transition-all duration-1000 ${
            isDisclaimerVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-8'
          }`}
        >
          {/* Authentic Coursework Disclaimer Typography rendered with user's MyFont */}
          <div className="relative w-full max-w-3xl mx-auto py-2 select-none flex flex-col items-center text-center">
            {/* Title */}
            <h2 className="font-myfont text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-wide drop-shadow-[0_2px_14px_rgba(255,255,255,0.2)] mb-3 sm:mb-4 lowercase">
              disclaimer !
            </h2>

            {/* Main Statement */}
            <p className="font-myfont text-xl sm:text-2xl md:text-[28px] lg:text-[32px] text-neutral-100 font-medium leading-[1.65] max-w-2xl mx-auto lowercase">
              all the projects showcased here are my 2nd year college assignments (3 projects) which i created as part of my coursework.
            </p>

            {/* Hand-drawn Organic Divider Line */}
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

            {/* Handwriting Note */}
            <p className="font-myfont text-sm sm:text-base md:text-lg text-neutral-400 lowercase tracking-wide">
              (yes , that's my handwriting , don't judge)
            </p>
          </div>

          {/* Metadata pill */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-ca-mono text-neutral-400 text-center">
            <span className="text-neutral-300">Handcrafted in Procreate &amp; Figma</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-300">Symbiosis Institute of Design</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="text-neutral-400">2nd Year Coursework</span>
          </div>

          {/* Scroll down button */}
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

      {/* Animated Marquee Bar between Disclaimer and Explore My Work */}
      <MarqueeBar className="border-t border-black relative z-10" />

      {/* ========================================================================= */}
      {/* FEATURED WORKS ONWARDS: DOTTED GRID BACKGROUND CANVAS (WHITE & BLACK DOTS) */}
      {/* ========================================================================= */}
      <div data-theme="light" className="relative w-full ca-dotted-grid-bg text-neutral-900 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        {/* Dotted Grid Pattern Layer */}
        <div className="ca-dotted-grid-pattern" aria-hidden="true" />

        {/* PART 2: CREATIVE ARTSY SECTION HEADER (WITH LETTER REVEAL) */}
        <section id="featured-works" className="relative z-10 w-full pt-12 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-8">
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

      {/* ========================================================================= */}
      {/* PART 3: CREATIVE ARTSY STACKING FOLDER CARDS (EXACT PORTFOLIOFY SCROLL) */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-16 px-4 sm:px-8 lg:px-20 lg:gap-[14vh] pb-32 max-w-[1400px] mx-auto">
        {projectsData.map((proj, idx) => {
          const isFirst = idx === 0
          const isLight = Boolean(proj.isLight)
          // Exact tab offset calculation from portfoliofy.io
          const tabMarginDesktop = isFirst
            ? '0px'
            : `min(calc(${22 * idx}% - 72px), calc(100% - 340px))`

          return (
            <article
              key={proj.id}
              id={`project-card-${proj.id}`}
              className="lg:sticky lg:top-28 transition-all duration-300 scroll-mt-28"
              style={{
                zIndex: 10 + idx,
              }}
            >
              {/* Folder Tab on top of Card */}
              <div
                className="flex transition-all duration-300 ml-0"
                style={{
                  '--tab-offset': tabMarginDesktop,
                }}
              >
                <style>
                  {`
                    @media (min-width: 1024px) {
                      #project-card-${proj.id} > div:first-child {
                        margin-left: ${tabMarginDesktop} !important;
                      }
                    }
                  `}
                </style>
                <button
                  onClick={() => scrollToCard(proj.id)}
                  className={`ca-mono inline-flex items-center gap-2 py-3.5 pr-14 text-xs font-bold uppercase tracking-[0.2em] sm:gap-3.5 sm:py-6 sm:pr-28 sm:text-base cursor-pointer hover:brightness-105 transition-all shadow-[0_-2px_10px_rgba(0,0,0,0.06)] ${
                    isLight ? 'text-[#180A2E]' : 'text-white'
                  } ${
                    isFirst
                      ? 'pl-5 [clip-path:polygon(0_0,calc(100%-44px)_0,100%_100%,0_100%)] sm:pl-9 sm:[clip-path:polygon(0_0,calc(100%-76px)_0,100%_100%,0_100%)]'
                      : 'pl-16 [clip-path:polygon(44px_0,calc(100%-44px)_0,100%_100%,0_100%)] sm:pl-[6.75rem] sm:[clip-path:polygon(76px_0,calc(100%-76px)_0,100%_100%,0_100%)]'
                  }`}
                  style={{ backgroundColor: proj.tabBg }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`h-3 w-3 sm:h-4 sm:w-4 ${isLight ? 'text-[#180A2E]' : 'text-white'}`}
                    aria-hidden="true"
                  >
                    <path d="M12 2c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9Z" />
                  </svg>
                  Project {proj.num}
                </button>
              </div>

              {/* Card Body with Full Viewport Height Stack */}
              <div
                className={`grid grid-cols-1 gap-6 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-14 lg:min-h-[calc(100vh-14rem)] ${
                  isLight
                    ? 'shadow-[0_24px_55px_rgba(110,60,150,0.18),0_4px_16px_rgba(0,0,0,0.06)] border border-purple-900/15'
                    : 'shadow-[0_24px_55px_rgba(0,0,0,0.22),0_4px_16px_rgba(0,0,0,0.08)] border border-white/15'
                }`}
                style={{ backgroundColor: proj.cardBg }}
              >
                {/* Left Column: Metadata, Title, Description, Link, Tags */}
                <div className="flex flex-col justify-between">
                  <div>
                    {/* Date / Pill */}
                    <span className={`ca-mono inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] ${
                      isLight ? 'text-[#2E0854]' : 'text-white'
                    }`}>
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: isLight ? '#2E0854' : '#ffffff' }}
                      />
                      {proj.date}
                    </span>

                    {/* Massive Title */}
                    <h2 className={`mt-6 text-5xl font-semibold tracking-tight sm:text-6xl xl:text-7xl ${
                      isLight ? 'text-[#130722]' : 'text-white'
                    }`}>
                      {proj.title}
                    </h2>

                    {/* Subtitle / Category */}
                    <p className={`mt-2 text-sm sm:text-base font-ca-mono font-semibold ${
                      isLight ? 'text-[#3B1560]' : 'text-neutral-300'
                    }`}>
                      {proj.subtitle}
                    </p>

                    {/* Description */}
                    <p className={`mt-5 max-w-lg text-lg leading-relaxed ${
                      isLight ? 'text-[#240C38]' : 'text-white/90'
                    }`}>
                      {proj.description}
                    </p>

                    {/* View project action link */}
                    <button
                      onClick={() => setActiveProject(proj)}
                      className={`ca-mono mt-8 inline-flex items-center gap-2.5 self-start border-b-2 pb-1 text-sm font-bold uppercase tracking-[0.2em] cursor-pointer transition-all group/cta ${
                        isLight
                          ? 'text-[#180A2E] hover:text-[#180A2E]/70'
                          : 'text-white hover:text-white/80'
                      }`}
                      style={{ borderColor: isLight ? '#180A2E' : '#ffffff' }}
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
                  </div>

                  {/* Polygon Clipped Tags */}
                  <div className="mt-auto flex flex-wrap gap-2.5 pt-12">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`ca-mono px-4 pb-2 pt-2.5 text-base font-bold uppercase tracking-wide [clip-path:polygon(0_28%,12%_0,100%_0,100%_100%,0_100%)] shadow-sm ${
                          isLight
                            ? 'text-[#180A2E] bg-white border border-purple-900/10'
                            : 'text-[var(--ca-ink,#111)] bg-white'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Framed Thumbnail with Washi Tape Mounts */}
                <div className="lg:self-center">
                  <div className="relative">
                    {/* Washi masking tape: Top-Left */}
                    <span
                      aria-hidden="true"
                      className="washi-tape absolute -left-5 -top-3 z-10 h-6 w-24 -rotate-[9deg] shadow-[0_1px_3px_rgba(17,18,18,0.25)] pointer-events-none"
                    />
                    {/* Washi masking tape: Top-Right */}
                    <span
                      aria-hidden="true"
                      className="washi-tape absolute -right-5 -top-3 z-10 h-6 w-24 rotate-[9deg] shadow-[0_1px_3px_rgba(17,18,18,0.25)] pointer-events-none"
                    />

                    {/* Image Border Box */}
                    <div
                      onClick={() => setActiveProject(proj)}
                      className="relative overflow-hidden border-4 border-white bg-black aspect-square w-full lg:aspect-auto lg:h-[calc(100vh-21rem)] cursor-pointer group/thumb shadow-2xl"
                    >
                      <div className="relative overflow-hidden h-full w-full">
                        <img
                          src={proj.thumbnail}
                          alt={proj.title}
                          className="absolute inset-0 h-full w-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Hover Pill */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-4 py-2 rounded-full bg-black/90 text-white border border-white/30 text-xs font-ca-mono tracking-wider shadow-2xl">
                          Click to inspect case study 🔍
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
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
                <div className="inline-flex items-center gap-2 text-xs font-ca-mono font-bold tracking-widest text-neutral-400 uppercase">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeProject.accentColor }} />
                  <span>{activeProject.num} / 03 • {activeProject.category}</span>
                </div>
                <h3 className="font-ca-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm font-ca-mono text-neutral-400">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 sm:p-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-neutral-300 hover:text-white transition-all cursor-pointer focus:outline-none shrink-0"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 sm:gap-8 pt-6 sm:pt-8 items-start">
              {/* Full-resolution Heading Image Preview with Click-to-Zoom */}
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => setActiveImageZoom(activeProject.thumbnail)}
                  className="relative rounded-xl overflow-hidden border-2 border-white/20 shadow-xl bg-black cursor-zoom-in group/zoom"
                  title="Click for full-screen lightbox zoom"
                >
                  <img
                    src={activeProject.thumbnail}
                    alt={activeProject.title}
                    className="w-full h-auto max-h-[500px] object-contain mx-auto"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/zoom:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 text-white border border-white/30 text-xs font-ca-mono flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      <span>Click to expand full lightbox</span>
                    </span>
                  </div>
                </div>
                <p className="text-[11px] font-ca-mono text-neutral-400 text-center">
                  Original Assignment Submission • Symbiosis Institute of Design
                </p>
              </div>

              {/* Case Study Details & Deliverables */}
              <div className="flex flex-col gap-6">
                {/* Coursework Assignment Context */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-ca-mono font-bold uppercase tracking-widest text-neutral-300 mb-2">
                    Coursework Brief
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div>
                  <h4 className="text-xs font-ca-mono font-bold uppercase tracking-widest text-neutral-300 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span>Key Deliverables &amp; Artifacts</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeProject.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <span className="text-[#E84A4A] font-bold shrink-0 mt-0.5">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-ca-mono font-bold uppercase tracking-widest text-neutral-300 mb-2">
                    Design Highlights
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {activeProject.highlights}
                  </p>
                </div>

                {/* Tools used */}
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white/10 text-neutral-200 font-ca-mono text-xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-4 py-2 rounded-xl bg-white text-black font-ca-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL-SCREEN LIGHTBOX ZOOM */}
      {/* ========================================================================= */}
      {activeImageZoom && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-lg animate-fadeIn cursor-zoom-out"
          onClick={() => setActiveImageZoom(null)}
          role="dialog"
          aria-label="Expanded Image Lightbox"
        >
          <div className="relative max-w-7xl max-h-[96vh] flex flex-col items-center justify-center">
            <img
              src={activeImageZoom}
              alt="Expanded high-resolution assignment page"
              className="w-auto h-auto max-h-[92vh] max-w-[95vw] object-contain rounded-lg shadow-2xl border border-white/20"
            />
            <button
              onClick={() => setActiveImageZoom(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2.5 rounded-full bg-black/80 text-white border border-white/30 hover:bg-white hover:text-black transition-colors"
              aria-label="Close full-screen image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
