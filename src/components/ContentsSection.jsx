import React, { useState, useEffect, useRef } from 'react'
import projectCardsImg from '../assets/work/project_cards.jpg'
import projectAureausImg from '../assets/work/project_aureaus.png'
import projectMelodyImg from '../assets/work/project_melody.jpg'
import projectPlaystaplesImg from '../assets/work/project_playstaples.png'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { HandwritingText } from '@/components/ui/handwriting-text'
import Auralis from '@/components/ui/auralis'
import MarqueeBar from './MarqueeBar'

const projectsData = [
  {
    id: 'business-cards',
    num: '01',
    tabLabel: 'BRANDING',
    tabSlot: 'slot-1',
    folderColor: '#76C689',
    accentColor: '#0F3D1F',
    hasStarburst: true,
    polaroid: {
      side: 'right',
      rotation: 'rotate-[4.5deg]',
      label: 'CAOS / Proof #01',
      img: projectCardsImg,
    },
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
    tabLabel: 'EDITORIAL',
    tabSlot: 'slot-4',
    folderColor: '#FCD36E',
    accentColor: '#422A06',
    hasLeaves: true,
    polaroid: {
      side: 'left',
      rotation: '-rotate-[5deg]',
      label: 'Lookbook Vol. 1',
      img: projectAureausImg,
    },
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
    tabLabel: 'SOCIAL MEDIA',
    tabSlot: 'slot-2',
    folderColor: '#7C8FE5',
    accentColor: '#151F47',
    hasLeaves: true,
    polaroid: {
      side: 'right',
      rotation: 'rotate-[3.5deg]',
      label: 'Live Pass #404',
      img: projectMelodyImg,
    },
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
  {
    id: 'playstaples',
    num: '04',
    tabLabel: 'PACKAGING',
    tabSlot: 'slot-3',
    folderColor: '#F3A1C5',
    accentColor: '#4A152D',
    polaroid: {
      side: 'left',
      rotation: '-rotate-[4deg]',
      label: 'Kaali Peeli Taxi',
      img: projectPlaystaplesImg,
    },
    date: 'FEB 20, 2026',
    title: 'PlayStaples',
    subtitle: 'Kaali Peeli Toy Design & Brand Experience',
    category: 'Toy Design & Branding',
    description:
      'PlayStaples celebrates iconic Indian street culture through tactile collectible design. "Kaali Peeli" reimagines the legendary Mumbai Premier Padmini taxi as a handcrafted wooden toy—celebrating nostalgia "for the ones who carved dreams on the trunk." Developed with 3D product visualization, custom taxi livery, physical packaging, and brand storytelling.',
    thumbnail: projectPlaystaplesImg,
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
        className="relative w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16"
      >
        {/* Auralis WebGL Ambient Background */}
        <Auralis
          height="100%"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        <div
          ref={disclaimerRef}
          className={`relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center transition-all duration-1000 ${
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
              all the projects showcased here are my 2nd year college assignments (4 projects) which i created as part of my coursework.
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

      {/* Editorial Dossier Header matching Reference Image */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-20 mb-8 pt-2">
        <div className="flex items-center justify-between text-xs sm:text-sm font-poppins-light font-light text-neutral-600 lowercase tracking-[0.35em] sm:tracking-[0.45em] pb-3">
          <span>del</span>
          <span>silencio</span>
          <span>a</span>
          <span>la</span>
          <span>forma</span>
        </div>
        <div className="flex items-center justify-between border-b-2 border-black/15 pb-4">
          <span className="font-akira font-black text-xl sm:text-3xl md:text-4xl tracking-tight text-neutral-950 uppercase">
            MIS
          </span>
          <span className="font-poppins-light font-light text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neutral-500 hidden sm:inline-block">
            // 2026 ARCHIVE DOSSIER • 04 CASES
          </span>
          <span className="font-akira font-black text-xl sm:text-3xl md:text-4xl tracking-tight text-neutral-950 uppercase">
            PROYECTOS
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART 3: PHYSICAL FILE FOLDER DOSSIERS (STACKING FOLDER SYSTEM) */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-16 px-4 sm:px-8 lg:px-20 lg:gap-[14vh] pb-36 max-w-[1400px] mx-auto">
        {projectsData.map((proj, idx) => {
          const tabSlotAlign =
            proj.tabSlot === 'slot-1'
              ? 'lg:ml-2 lg:mr-auto'
              : proj.tabSlot === 'slot-2'
              ? 'lg:ml-[25%] lg:mr-auto'
              : proj.tabSlot === 'slot-3'
              ? 'lg:ml-[50%] lg:mr-auto'
              : 'lg:ml-auto lg:mr-2'

          return (
            <article
              key={proj.id}
              id={`project-card-${proj.id}`}
              className="lg:sticky transition-all duration-300 scroll-mt-28"
              style={{
                zIndex: 10 + idx,
                top: `calc(4.5rem + ${idx * 2.6}rem)`,
              }}
            >
              {/* Folder Tab Row Container with Peeking Document Sheet & Polaroid */}
              <div className="relative w-full">
                {/* 1. White Document Paper Sheet peeking from behind the folder */}
                <div
                  className="absolute -top-5 sm:-top-7 inset-x-2 sm:inset-x-6 h-8 sm:h-10 bg-white rounded-t-xl sm:rounded-t-2xl border-t-2 border-x-2 border-black/15 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] pointer-events-none z-0 flex items-center justify-between px-4 sm:px-6"
                >
                  <span className="font-poppins-light font-light text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                    DOSSIER // {proj.category}
                  </span>
                  <span className="font-poppins-light font-light text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                    REF: 2026-F{proj.num}
                  </span>
                </div>

                {/* 2. Optional Botanical Ivy Leaves peeking out (Reference image detail on yellow & blue folders) */}
                {proj.hasLeaves && (
                  <div className="absolute -top-8 sm:-top-11 right-24 sm:right-44 md:right-56 z-10 pointer-events-none select-none opacity-90 hidden sm:block">
                    <svg viewBox="0 0 120 60" className="w-24 h-12 text-[#4E8B56] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" fill="currentColor">
                      <ellipse cx="25" cy="28" rx="11" ry="6" transform="rotate(-30 25 28)" fill="#5C9E65" />
                      <ellipse cx="48" cy="20" rx="13" ry="7" transform="rotate(15 48 20)" fill="#447D4C" />
                      <ellipse cx="72" cy="18" rx="12" ry="6.5" transform="rotate(-15 72 18)" fill="#68AF73" />
                      <ellipse cx="94" cy="16" rx="9" ry="5.5" transform="rotate(20 94 16)" fill="#4E8B56" />
                      <path d="M12 45 Q 45 25 105 14" stroke="#2D5A34" strokeWidth="1.8" fill="none" />
                    </svg>
                  </div>
                )}

                {/* 3. Tilted Mini Polaroid Photo Print peeking out from the opposite shoulder */}
                {proj.polaroid && (
                  <div
                    onClick={() => setActiveProject(proj)}
                    className={`absolute -top-11 sm:-top-16 z-20 cursor-pointer group/polaroid transition-all duration-300 hover:z-30 hover:scale-105 hover:rotate-0 select-none ${
                      proj.polaroid.side === 'right'
                        ? 'right-3 sm:right-10 md:right-16 ' + proj.polaroid.rotation
                        : 'left-3 sm:left-10 md:left-16 ' + proj.polaroid.rotation
                    }`}
                    title={`Inspect ${proj.title} proof`}
                  >
                    <div className="bg-white p-1.5 pb-4 sm:p-2 sm:pb-5 rounded-xs shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-black/15 flex flex-col items-center">
                      <div className="w-16 h-12 sm:w-22 sm:h-16 md:w-26 md:h-18 overflow-hidden bg-neutral-900 border border-black/10">
                        <img
                          src={proj.polaroid.img}
                          alt={proj.polaroid.label}
                          className="w-full h-full object-cover group-hover/polaroid:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <span className="mt-1 sm:mt-1.5 font-myfont text-[10px] sm:text-xs text-neutral-800 tracking-wide font-medium leading-none">
                        {proj.polaroid.label}
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. The Physical Folder Tab */}
                <div className={`relative flex z-10 ${tabSlotAlign}`}>
                  <button
                    onClick={() => scrollToCard(proj.id)}
                    className="group/tab relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-9 py-3 sm:py-4 rounded-t-2xl sm:rounded-t-3xl border-t-2 border-x-2 border-black/20 shadow-[0_-3px_12px_rgba(0,0,0,0.06)] hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer select-none w-full sm:w-auto lg:w-[24%] min-w-[190px] sm:min-w-[220px]"
                    style={{ backgroundColor: proj.folderColor }}
                    title={`Open ${proj.tabLabel} folder`}
                  >
                    {/* Subtle top edge paper gloss highlight */}
                    <span className="absolute inset-x-3 top-1 h-[2px] bg-white/40 rounded-full pointer-events-none" />
                    <span className="font-akira font-black uppercase text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] text-xs sm:text-sm md:text-[15px] tracking-widest">
                      {proj.tabLabel}
                    </span>
                  </button>
                </div>
              </div>

              {/* Card Body (Folder Cover & Interior) */}
              <div
                className="relative overflow-hidden grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:p-12 lg:min-h-[calc(100vh-16rem)] border-2 border-black/20 rounded-2xl sm:rounded-3xl shadow-[0_24px_65px_rgba(0,0,0,0.14),0_6px_20px_rgba(0,0,0,0.06)]"
                style={{ backgroundColor: proj.folderColor }}
              >
                {/* Top Folder Crease line */}
                <div className="absolute inset-x-0 top-0 h-1 bg-black/10 rounded-t-2xl sm:rounded-t-3xl pointer-events-none" />

                {/* Project 01 Mint Green Starburst Graphic from Reference Image */}
                {proj.hasStarburst && (
                  <div className="absolute -bottom-12 -left-12 sm:-bottom-16 sm:-left-16 lg:-bottom-20 lg:-left-20 pointer-events-none z-0 select-none">
                    <svg
                      viewBox="0 0 400 400"
                      className="w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[460px] lg:h-[460px] text-[#F7F2EB] drop-shadow-[0_4px_16px_rgba(0,0,0,0.08)] -rotate-[14deg]"
                      fill="currentColor"
                      stroke="#1c1917"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    >
                      <polygon points="200,12 228,134 332,68 266,172 388,200 266,228 332,332 228,266 200,388 172,266 68,332 134,228 12,200 134,172 68,68 172,134" />
                    </svg>
                  </div>
                )}

                {/* Left Column: Metadata, Title, Description, Link, Tags */}
                <div className="relative z-10 flex flex-col justify-between">
                  <div>
                    {/* Date / Dossier Pill */}
                    <div className="flex items-center gap-3">
                      <span className="font-poppins-light font-light text-xs sm:text-sm uppercase tracking-[0.2em] bg-black/10 text-neutral-900 border border-black/15 px-3.5 py-1 rounded-full inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-neutral-900" />
                        {proj.date}
                      </span>
                      <span className="font-poppins-light font-light text-xs uppercase tracking-[0.2em] text-neutral-800">
                        FOLDER // 0{idx + 1}
                      </span>
                    </div>

                    {/* Massive Title in Akira Expanded */}
                    <h2 className="mt-5 font-akira font-black uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] leading-[1.08] tracking-tight text-neutral-950">
                      {proj.title}
                    </h2>

                    {/* Subtitle in Poppins Light */}
                    <p className="mt-2 text-sm sm:text-base font-poppins-light font-light tracking-wider uppercase text-neutral-800">
                      {proj.subtitle}
                    </p>

                    {/* Description in Poppins Regular */}
                    <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed font-poppins font-normal text-neutral-900/95">
                      {proj.description}
                    </p>

                    {/* View Project & Figma Action Buttons in Poppins Light */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setActiveProject(proj)}
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

                      {proj.figmaUrl && (
                        <a
                          href={proj.figmaUrl}
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

                  {/* Tags in Poppins Light */}
                  <div className="mt-auto flex flex-wrap gap-2 pt-10">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-poppins-light font-light text-xs sm:text-sm px-3.5 py-1.5 uppercase tracking-wide bg-white/95 text-neutral-950 border border-black/15 rounded-md shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Framed Thumbnail with Washi Tape Mounts */}
                <div className="lg:self-center relative z-10">
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="washi-tape absolute -left-5 -top-3 z-10 h-6 w-24 -rotate-[9deg] shadow-[0_1px_3px_rgba(17,18,18,0.25)] pointer-events-none"
                    />
                    <span
                      aria-hidden="true"
                      className="washi-tape absolute -right-5 -top-3 z-10 h-6 w-24 rotate-[9deg] shadow-[0_1px_3px_rgba(17,18,18,0.25)] pointer-events-none"
                    />

                    <div
                      onClick={() => setActiveProject(proj)}
                      className="relative overflow-hidden border-4 sm:border-6 border-white bg-neutral-950 aspect-square w-full lg:aspect-auto lg:h-[calc(100vh-22rem)] cursor-pointer group/thumb shadow-[0_16px_40px_rgba(0,0,0,0.25)] rounded-xs"
                    >
                      <div className="relative overflow-hidden h-full w-full">
                        <img
                          src={proj.thumbnail}
                          alt={proj.title}
                          className="absolute inset-0 h-full w-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 ease-out"
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
                  <h4 className="font-poppins-light font-medium text-xs uppercase tracking-widest text-neutral-300 mb-2">
                    Coursework Brief
                  </h4>
                  <p className="font-poppins font-normal text-xs sm:text-sm text-neutral-200 leading-relaxed">
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

                {/* Tools used & Actions */}
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

                  <div className="flex items-center gap-2.5">
                    {activeProject.figmaUrl && (
                      <a
                        href={activeProject.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#FACC15] text-black font-ca-mono font-bold text-xs uppercase tracking-wider hover:bg-[#EAB308] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-lg"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4 4 4 0 0 0 4-4V6a4 4 0 0 0-4-4zm8 0a4 4 0 0 0-4 4v4h4a4 4 0 0 0 0-8zm-8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8zm8 0a4 4 0 0 0-4 4v4a4 4 0 0 0 4-4 4 4 0 0 0 0-4zM8 18a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8z"/>
                        </svg>
                        <span>Open in Figma</span>
                      </a>
                    )}

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
