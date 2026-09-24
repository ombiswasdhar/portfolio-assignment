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
    id: 'business-cards',
    num: '01',
    tabTitle: 'Oni Studios',
    displayTitle: 'ONI STUDIOS ©',
    folderColor: '#EAB854', // Mustard Manila Yellow (from Mellow folder!)
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
    num: '02',
    tabTitle: 'Aureaus Audio',
    displayTitle: 'AUREAUS ©',
    folderColor: '#F08264', // Coral Peach (from Tab 2 "Safe"!)
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
    num: '03',
    tabTitle: 'Melody Tickets',
    displayTitle: 'MELODY ©',
    folderColor: '#8B7DE8', // Lavender Purple (from Tab 3 "Caring Teachers"!)
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
  {
    id: 'playstaples',
    num: '04',
    tabTitle: 'PlayStaples',
    displayTitle: 'PLAYSTAPLES ©',
    folderColor: '#C4A576', // Warm Kraft Khaki (from Tab 4 "Learning"!)
    tabColor: '#C4A576',
    accentColor: '#EAB854',
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
]

export default function ContentsSection() {
  const [activeTabIdx, setActiveTabIdx] = useState(0)
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
      {/* PART 2: ELECTRIC PURPLE MANILA FILE FOLDER SHOWCASE (MATCHING IMAGE) */}
      {/* ========================================================================= */}
      <section
        id="featured-works"
        className="relative w-full bg-[#5E17EB] text-neutral-900 py-16 sm:py-24 md:py-28 px-4 sm:px-8 overflow-hidden"
      >
        {/* Giant White Background Typography: "PROJECTS" sitting behind folder like "Child Edu" */}
        <div
          className="absolute top-6 sm:top-10 md:top-12 inset-x-0 flex justify-center pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <span className="font-akira font-black text-white text-[16vw] sm:text-[14vw] md:text-[12.5vw] uppercase tracking-tighter opacity-95 leading-none whitespace-nowrap drop-shadow-[0_4px_30px_rgba(0,0,0,0.18)]">
            PROJECTS
          </span>
        </div>

        {/* Floating Photo Tiles in Purple Background Canvas (from reference image) */}
        {/* Top-Left Floating Photo */}
        <div className="absolute top-8 sm:top-12 left-4 sm:left-10 md:left-16 z-0 pointer-events-none select-none hidden sm:block -rotate-[7deg] hover:rotate-0 transition-transform">
          <div className="w-20 sm:w-28 md:w-36 aspect-[4/3] rounded-2xl border-2 sm:border-3 border-black bg-black shadow-2xl overflow-hidden">
            <img src={projectCardsImg} alt="Thumbnail preview" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Top-Right Floating Photo */}
        <div className="absolute top-8 sm:top-12 right-4 sm:right-10 md:right-16 z-0 pointer-events-none select-none hidden sm:block rotate-[6deg] hover:rotate-0 transition-transform">
          <div className="w-20 sm:w-28 md:w-36 aspect-[4/3] rounded-2xl border-2 sm:border-3 border-black bg-black shadow-2xl overflow-hidden">
            <img src={projectAureausImg} alt="Thumbnail preview" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Mid-Left Floating Photo Peeking from Screen Edge */}
        <div className="absolute top-1/2 -left-6 sm:-left-4 z-0 pointer-events-none select-none hidden md:block rotate-[10deg]">
          <div className="w-24 sm:w-32 aspect-[4/3] rounded-2xl border-2 sm:border-3 border-black bg-black shadow-2xl overflow-hidden">
            <img src={projectMelodyImg} alt="Thumbnail preview" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Mid-Right Floating Photo Peeking from Screen Edge */}
        <div className="absolute top-1/2 -right-6 sm:-right-4 z-0 pointer-events-none select-none hidden md:block -rotate-[8deg]">
          <div className="w-24 sm:w-32 aspect-[4/3] rounded-2xl border-2 sm:border-3 border-black bg-black shadow-2xl overflow-hidden">
            <img src={projectPlaystaplesImg} alt="Thumbnail preview" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Bottom-Left Floating Photo Peeking */}
        <div className="absolute -bottom-6 left-8 sm:left-24 z-0 pointer-events-none select-none hidden lg:block rotate-[8deg]">
          <div className="w-24 sm:w-32 aspect-[4/3] rounded-2xl border-2 sm:border-3 border-black bg-black shadow-2xl overflow-hidden">
            <img src={projectCardsImg} alt="Thumbnail preview" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Main Interactive Manila Folder Container */}
        <div className="relative z-10 max-w-5xl mx-auto mt-16 sm:mt-24 md:mt-28">
          {/* Header cursive subtitle & sticker above folder */}
          <div
            ref={headerRef}
            className={`mx-auto mb-6 flex flex-col items-center text-center transition-all duration-700 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div ref={handwritingTriggerRef} className="flex flex-col items-center">
              <div className="font-myfont text-2xl sm:text-3xl text-white font-medium tracking-wide flex items-center justify-center min-h-[2rem]">
                {isHandwritingInView ? (
                  <HandwritingText
                    key={handwritingKey}
                    text="click the tabs to flip folders!"
                    fontUrl="/fonts/Myfont-Regular.ttf"
                    height="1.15em"
                    duration={1.5}
                    delay={0.1}
                    strokeWidth={1.8}
                    className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                  />
                ) : (
                  <span className="opacity-0">click the tabs to flip folders!</span>
                )}
              </div>
            </div>
          </div>

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
                    className={`group relative inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-t-2xl sm:rounded-t-3xl border-t-2 sm:border-t-3 border-x-2 sm:border-x-3 border-black font-akira font-black text-xs sm:text-[13px] uppercase tracking-wider cursor-pointer transition-all duration-200 select-none ${
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

            {/* Folder Body Canvas */}
            <div
              className="relative w-full rounded-3xl sm:rounded-[40px] border-2 sm:border-3 border-black shadow-[0_25px_80px_rgba(0,0,0,0.4)] overflow-hidden transition-colors duration-500 p-6 sm:p-10 md:p-14 min-h-[500px] sm:min-h-[580px] md:min-h-[640px] flex flex-col justify-between items-center text-center select-none"
              style={{ backgroundColor: currentProject.folderColor }}
            >
              {/* Retro Cartoon Mascot Stickers on the Folder (Matching Reference Image) */}

              {/* 1. Pink Fluffy Cloud Mascot (Top-Left) */}
              <div className="absolute top-4 sm:top-7 left-4 sm:left-8 z-10 pointer-events-none select-none hover:scale-110 transition-transform">
                <CloudMascot className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]" />
              </div>

              {/* 2. White Cartoon Hand Mascot (Right Shoulder) */}
              <div className="absolute top-1/3 -right-2 sm:right-6 md:right-10 z-10 pointer-events-none select-none -rotate-[8deg] hover:rotate-0 transition-transform">
                <HandMascot className="w-16 h-16 sm:w-22 sm:h-22 drop-shadow-[0_4px_14px_rgba(0,0,0,0.15)]" />
              </div>

              {/* 3. Thinking Cartoon Mascot Peeking (Bottom-Left) */}
              <div className="absolute bottom-2 sm:bottom-4 left-3 sm:left-7 z-10 pointer-events-none select-none">
                <img
                  src={charThinkingImg}
                  alt="Cartoon mascot"
                  className="w-16 sm:w-20 md:w-24 h-auto drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* 4. Red/Pink Spiky Starburst Mascot (Bottom-Right) */}
              <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-10 pointer-events-none select-none rotate-[10deg] hover:rotate-0 transition-transform">
                <StarburstMascot className="w-18 h-18 sm:w-24 sm:h-24 drop-shadow-[0_6px_16px_rgba(0,0,0,0.2)]" />
              </div>

              {/* Folder Top Metadata Row */}
              <div className="w-full flex items-center justify-between text-xs sm:text-sm font-akira font-black uppercase tracking-wider text-black/70 pb-4 border-b border-black/15 z-10">
                <span className="bg-black/10 px-3 py-1 rounded-full border border-black/15">
                  FOLDER // 0{activeTabIdx + 1}
                </span>
                <span className="font-poppins-light font-medium tracking-widest text-[11px] sm:text-xs">
                  {currentProject.category} • {currentProject.date}
                </span>
              </div>

              {/* Center Main Composition */}
              <div className="relative z-10 my-auto py-8 sm:py-10 flex flex-col items-center justify-center max-w-3xl mx-auto">
                {/* Floating Tilted Artwork Chip 1: Top-Left of Title */}
                <div
                  onClick={() => setActiveProject(currentProject)}
                  className="absolute -top-6 sm:-top-8 left-0 sm:left-4 md:-left-4 z-20 cursor-pointer -rotate-[8deg] hover:rotate-0 hover:scale-105 transition-all group/chip"
                  title="Inspect artwork"
                >
                  <div className="w-24 sm:w-36 md:w-44 aspect-[4/3] rounded-xl sm:rounded-2xl border-2 sm:border-3 border-black bg-black shadow-xl overflow-hidden">
                    <img
                      src={currentProject.thumbnail}
                      alt={currentProject.title}
                      className="w-full h-full object-cover group-hover/chip:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Tilted Artwork Chip 2: Centered near Title */}
                <div
                  onClick={() => setActiveProject(currentProject)}
                  className="absolute -bottom-8 sm:-bottom-10 right-4 sm:right-12 md:right-8 z-20 cursor-pointer rotate-[6deg] hover:rotate-0 hover:scale-105 transition-all group/chip"
                  title="Inspect artwork"
                >
                  <div className="w-24 sm:w-36 md:w-44 aspect-[4/3] rounded-xl sm:rounded-2xl border-2 sm:border-3 border-black bg-black shadow-xl overflow-hidden">
                    <img
                      src={currentProject.thumbnail}
                      alt={currentProject.title}
                      className="w-full h-full object-cover group-hover/chip:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Massive Display Title (like "MELLOW ©") */}
                <h2 className="font-akira font-black uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] px-4">
                  {currentProject.displayTitle}
                </h2>

                {/* Iconic Mascot Eyes Pill Badge (Direct from Reference Image) */}
                <div className="my-4 sm:my-5">
                  <CartoonEyesBadge />
                </div>

                {/* Action Buttons: Pill "Inspect Case Study" & "Figma File" */}
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveProject(currentProject)}
                    className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-black text-white hover:bg-neutral-900 active:scale-95 transition-all font-poppins text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-[0_8px_24px_rgba(0,0,0,0.3)] inline-flex items-center gap-2.5 cursor-pointer group/cta"
                  >
                    <span>Inspect Case Study</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform"
                    >
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </button>

                  {currentProject.figmaUrl && (
                    <a
                      href={currentProject.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-black border-2 border-black hover:bg-neutral-100 active:scale-95 transition-all font-poppins text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Figma File</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom Metadata Summary: Safe • Caring Teachers • Play-Based Learning */}
              <div className="w-full pt-4 border-t border-black/15 z-10">
                <p className="font-poppins-light font-medium text-xs sm:text-sm text-neutral-900 tracking-wider uppercase">
                  {currentProject.bulletSummary}
                </p>
              </div>
            </div>

            {/* Left & Right Circular Arrow Navigation Controls */}
            <button
              onClick={() => setActiveTabIdx((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1))}
              className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white text-black border-2 sm:border-3 border-black shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
              title="Previous project"
              aria-label="Previous project"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setActiveTabIdx((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0))}
              className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white text-black border-2 sm:border-3 border-black shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
              title="Next project"
              aria-label="Next project"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Quick Project Switcher Pill Bar below Folder */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 z-10 relative">
            {projectsData.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`px-4 sm:px-5 py-2 rounded-full border-2 border-black font-poppins text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  idx === activeTabIdx
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-black/40 text-white/80 hover:bg-black/60 hover:text-white'
                }`}
              >
                0{idx + 1} {p.title}
              </button>
            ))}
          </div>
        </div>
      </section>

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
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-all cursor-pointer focus:outline-none shrink-0"
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
              className="absolute top-4 right-4 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/30 transition-all cursor-pointer"
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
