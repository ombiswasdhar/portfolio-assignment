import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Layers, Grid3X3, LayoutList } from 'lucide-react'
import projectCardsImg from '../assets/work/project_cards.jpg'
import projectAureausImg from '../assets/work/project_aureaus.png'
import projectMelodyImg from '../assets/work/project_melody.jpg'
import projectPlaystaplesImg from '../assets/work/project_playstaples.png'
import oniCardFrontImg from '../assets/work/oni-card-front.png'
import oniCardBackImg from '../assets/work/oni-card-back.png'
import oniCard2FrontImg from '../assets/work/oni-card-2-front.png'
import oniCard2BackImg from '../assets/work/oni-card-2-back.png'
import oniCardsHoverImg from '../assets/work/headphone-mockup.png'
import kaaliPeeliHoverImg from '../assets/playstaples/kaali-peeli-hover.png'
import OniCardIsometricAnimation from './OniCardIsometricAnimation'

// The 14 replacement PlayStaples images from Downloads/playstaples/New folder.
import psCycle01Img from '../assets/playstaples/user-cycle/01.jpg'
import psCycle01BombayImg from '../assets/playstaples/user-cycle/01_Bombay.jpg'
import psCycle03Img from '../assets/playstaples/user-cycle/03.jpg'
import psCycle129Img from '../assets/playstaples/user-cycle/129.jpg'
import psCycle131Img from '../assets/playstaples/user-cycle/131.jpg'
import psCycle132Img from '../assets/playstaples/user-cycle/132.jpg'
import psCycle19Img from '../assets/playstaples/user-cycle/19.jpg'
import psCycle22Img from '../assets/playstaples/user-cycle/22.jpg'
import psCycle23Img from '../assets/playstaples/user-cycle/23.jpg'
import psCycle35Img from '../assets/playstaples/user-cycle/35.jpg'
import psCycleBd01Img from '../assets/playstaples/user-cycle/BD_01.jpg'
import psCycleCorbett04Img from '../assets/playstaples/user-cycle/corbett 04.jpg'
import psCyclePost1303Img from '../assets/playstaples/user-cycle/Post 13_03.jpg'
import psCycleRetroRohtakImg from '../assets/playstaples/user-cycle/Retro Rohtak_PS.jpg'

import { useScrollReveal } from '../hooks/useScrollReveal'
import { HandwritingText } from '@/components/ui/handwriting-text'
import Auralis from '@/components/ui/auralis'
import MarqueeBar from './MarqueeBar'

function CyclingProjectImage({ images, alt, className, onImageClick }) {
  const [imageIndex, setImageIndex] = React.useState(0)
  const imageList = images?.length ? images : []
  const imageListKey = imageList.join('|')

  React.useEffect(() => {
    if (imageList.length < 2 || imageList.every((image) => image === imageList[0])) return undefined

    setImageIndex(0)
    let currentIndex = 0
    let cycleTimer
    let isActive = true

    const scheduleNext = () => {
      cycleTimer = window.setTimeout(() => {
        const nextIndex = (currentIndex + 1) % imageList.length
        const preloadedImage = new Image()
        let didFinishLoading = false
        const beginFade = () => {
          if (didFinishLoading || !isActive) return
          didFinishLoading = true
          currentIndex = nextIndex
          setImageIndex(nextIndex)
          scheduleNext()
        }
        preloadedImage.onload = beginFade
        preloadedImage.onerror = () => {
          if (!isActive) return
          currentIndex = nextIndex
          scheduleNext()
        }
        preloadedImage.src = imageList[nextIndex]
        if (preloadedImage.complete) beginFade()
      }, 500)
    }

    scheduleNext()
    return () => {
      isActive = false
      window.clearTimeout(cycleTimer)
    }
  }, [imageListKey])

  const src = imageList[imageIndex] || imageList[0]
  const handleClick = (event, imageSrc) => onImageClick?.(event, imageSrc)

  return (
    <span className="relative block h-full w-full overflow-hidden">
      <img src={src} alt={alt} className={`absolute inset-0 ${className}`} onClick={(event) => handleClick(event, src)} />
    </span>
  )
}

function FlippingBusinessCard({ front, back, alt, className }) {
  const [showBack, setShowBack] = React.useState(false)

  React.useEffect(() => {
    const timer = window.setInterval(() => setShowBack((visible) => !visible), 2800)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className={`relative h-full w-full overflow-hidden [perspective:1000px] ${className}`}>
      <div
        className="relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.75,0.25,1)] [transform-style:preserve-3d]"
        style={{ transform: showBack ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <img src={front} alt={`${alt}, front`} className="absolute inset-0 h-full w-full object-contain [backface-visibility:hidden]" />
        <img src={back} alt={`${alt}, back`} className="absolute inset-0 h-full w-full object-contain [backface-visibility:hidden] [transform:rotateY(180deg)]" />
      </div>
    </div>
  )
}

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
    hoverImage: kaaliPeeliHoverImg,
    previewPhotos: [
      psCycle01Img,
      psCycle01BombayImg,
      psCycle03Img,
      psCycle129Img,
      psCycle131Img,
      psCycle132Img,
      psCycle19Img,
      psCycle22Img,
      psCycle23Img,
      psCycle35Img,
      psCycleBd01Img,
      psCycleCorbett04Img,
      psCyclePost1303Img,
      psCycleRetroRohtakImg,
    ],
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
    thumbnail: oniCardFrontImg,
    hoverImage: oniCardsHoverImg,
    isIsometricCards: true,
    previewPhotos: [oniCardFrontImg, oniCardBackImg, oniCard2FrontImg, oniCard2BackImg, projectCardsImg],
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
  const [activeProject, setActiveProject] = React.useState(null)
  const [activeImageZoom, setActiveImageZoom] = React.useState(null)
  const [hoveredCardId, setHoveredCardId] = React.useState(null)

  const [disclaimerRef, isDisclaimerVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  const [headerRef, isHeaderVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  const [isHandwritingInView, setIsHandwritingInView] = React.useState(false)
  const [handwritingKey, setHandwritingKey] = React.useState(0)
  const handwritingTriggerRef = React.useRef(null)

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProject(null)
        setActiveImageZoom(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  return (
    <div className="relative w-full bg-black text-white selection:bg-black selection:text-white">
      {/* DISCLAIMER HERO BLOCK */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden py-16 px-4 sm:px-6 md:px-8 border-b border-white/10">
        <Auralis height="100%" className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        <div
          ref={disclaimerRef}
          className={`relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center transition-all duration-1000 ${
            isDisclaimerVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-8'
          }`}
        >
          <div className="relative w-full max-w-4xl lg:max-w-5xl mx-auto py-2 select-none flex flex-col items-center text-center">
            <h2 className="font-myfont text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold tracking-wide drop-shadow-[0_2px_20px_rgba(255,255,255,0.25)] mb-4 sm:mb-6 lowercase">
              disclaimer !
            </h2>
            <p className="font-myfont text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] text-neutral-100 font-medium leading-[1.45] sm:leading-[1.4] max-w-3xl lg:max-w-4xl mx-auto lowercase">
              all the projects showcased here are my 2nd year college assignments (4 projects) which i created as part of my coursework.
            </p>
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto my-5 sm:my-7 flex justify-center opacity-45">
              <svg className="w-full h-3 text-neutral-400" viewBox="0 0 500 6" fill="none" preserveAspectRatio="none">
                <path d="M2 3.5 C 90 2, 220 5, 340 3 C 400 2, 460 4.5, 498 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-myfont text-xl sm:text-2xl md:text-3xl lg:text-[34px] text-neutral-200 font-medium lowercase tracking-wide">
              (yes , that's my handwriting , don't judge)
            </p>
          </div>
          <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center">
            <a 
              href="#featured-works" 
              onClick={scrollToWorks} 
              aria-label="Scroll down to explore assignments"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:border-white/50 hover:bg-white/15 hover:translate-y-1 transition-all shadow-lg cursor-pointer focus:outline-none"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300 hover:text-white transition-colors animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <MarqueeBar className="border-t border-black relative z-10" />

      {/* ADOBE PORTFOLIO STYLE FULL-BLEED IMAGE GRID */}
      <div id="work" data-theme="light" className="relative w-full ca-dotted-grid-bg text-neutral-900 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] scroll-mt-14 pb-0">
        <div className="ca-dotted-grid-pattern" aria-hidden="true" />

        <section id="featured-works" className="relative z-10 w-full pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-8 scroll-mt-16">
          <div ref={headerRef} className={`mx-auto flex max-w-4xl flex-col items-center text-center transition-all duration-1000 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
              <svg viewBox="0 0 64 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`mt-1 h-3.5 w-24 sm:w-28 text-[#E84A4A] transition-all duration-700 delay-300 ${isHandwritingInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <path d="M3 4c18-3 40-3 58 0" />
                <path d="M9 9c14-2.5 32-2.5 46 0" />
              </svg>
            </div>
            <h2 className="mt-6 font-akira text-[26px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-neutral-950 uppercase font-black text-center">
              FEATURED WORKS
            </h2>
            <div className="mt-8 max-w-md -rotate-[3.6deg] hover:rotate-0 transition-transform duration-300 mb-8">
              <span className="ca-tape-clip inline-block px-6 py-2.5 text-xs sm:text-sm font-ca-mono font-bold uppercase tracking-wider text-black bg-[#FFE57F] shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-amber-300/60">
                A few products I helped make simpler, calmer, and easier to trust.
              </span>
            </div>
          </div>
        </section>

        <MarqueeBar className="border-t border-black relative z-10" />

        {/* FULL BLEED GRID WITH RED FOOTER TITLE STRIPS & PERFECT ALIGNMENT */}
        <div className="relative z-10 w-full border-t-4 border-b-4 border-black bg-black">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-stretch">
            {projectsData.map((card, idx) => (
              <div 
                key={card.id} 
                className={`group relative cursor-pointer flex flex-col h-full overflow-hidden bg-neutral-950 ${
                  idx < projectsData.length - 1 ? 'border-b-4 border-black' : ''
                } ${
                  idx >= projectsData.length - 2 ? 'md:border-b-0' : ''
                } ${
                  idx % 2 === 0 ? 'md:border-r-4 md:border-black' : ''
                }`}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => setActiveProject(card)}
              >
                {/* PROJECT IMAGE CONTAINER WITH AUTOMATIC IMAGE CYCLING */}
                <div className={`relative w-full aspect-[4/3] flex-1 overflow-hidden ${card.flipImages ? 'bg-[#c99bd8]' : 'bg-neutral-900'}`}>
                  {card.isIsometricCards ? (
                    <OniCardIsometricAnimation isPaused={hoveredCardId === card.id} />
                  ) : card.flipImages ? (
                    <FlippingBusinessCard
                      front={card.flipImages[0]}
                      back={card.flipImages[1]}
                      alt={card.title}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : card.previewPhotos && card.previewPhotos.length > 1 ? (
                    <CyclingProjectImage 
                      images={card.previewPhotos} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105" 
                    />
                  ) : (
                    <img 
                      src={card.thumbnail} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                  )}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 ${card.isIsometricCards || card.id === 'business-cards' || card.id === 'oni-studios' ? 'pointer-events-none' : card.hoverImage ? '' : 'bg-black/50 backdrop-blur-[2px]'}`}>
                    {card.hoverImage && <img src={card.hoverImage} alt={`${card.title} project artwork`} className="absolute inset-0 h-full w-full object-cover" />}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#E84A4A]/35" />
                    {!(card.hoverImage || card.id === 'business-cards' || card.id === 'oni-studios' || card.isIsometricCards) && (
                      <span className="px-5 py-2 rounded-full border-2 border-white text-white font-ca-mono font-bold text-xs md:text-sm tracking-widest uppercase bg-black/60 shadow-xl group-hover:scale-105 transition-transform">
                        View Case Study ↗
                      </span>
                    )}
                  </div>
                </div>

                {/* RED TITLE BAR BELOW THE IMAGE */}
                <div className="w-full bg-[#E84A4A] border-t-4 border-black px-4 py-3 flex items-center justify-center text-center shrink-0 min-h-[3.25rem]">
                  <h3 className="font-akira font-black text-white text-xs sm:text-sm md:text-base tracking-wider uppercase truncate max-w-full">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CASE STUDY DETAIL MODAL */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={() => setActiveProject(null)}
          role="dialog"
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#101015] border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-5 sm:p-8 lg:p-10 my-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
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
              <button
                onClick={() => setActiveProject(null)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-neutral-300 hover:text-white transition-all cursor-pointer focus:outline-none shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 pt-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-poppins-light font-light text-xs uppercase tracking-widest text-neutral-400 mb-2">Project Overview</h4>
                  <p className="font-poppins font-normal text-sm sm:text-base text-neutral-200 leading-relaxed">{activeProject.description}</p>
                </div>
                <div>
                  <h4 className="font-poppins-light font-light text-xs uppercase tracking-widest text-neutral-400 mb-2">Key Highlights &amp; Insights</h4>
                  <p className="font-poppins font-normal text-sm sm:text-base text-neutral-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">{activeProject.highlights}</p>
                </div>
                <div>
                  <h4 className="font-poppins-light font-light text-xs uppercase tracking-widest text-neutral-400 mb-3">Core Deliverables</h4>
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
                  <h4 className="font-poppins-light font-light text-xs uppercase tracking-widest text-neutral-400 mb-2.5">Tools &amp; Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tools.map((tool, toolIdx) => (
                      <span key={toolIdx} className="font-poppins-light font-light text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white uppercase tracking-wider">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                {activeProject.figmaUrl && (
                  <div className="pt-2">
                    <a href={activeProject.figmaUrl} target="_blank" rel="noopener noreferrer" className="font-poppins-light font-light inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 transition-all font-semibold text-xs uppercase tracking-wider shadow-lg">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4 4 4 0 0 0 4-4zm8 0a4 4 0 0 0-4 4v4h4a4 4 0 0 0 0-8zm-8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8zm8 0a4 4 0 0 0-4 4v4a4 4 0 0 0 4-4 4 4 0 0 0 0-4zM8 18a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8z"/></svg>
                      <span>Open Live Figma Design File</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div
                  className="relative group/modalImg overflow-hidden rounded-xl border border-white/20 bg-black cursor-zoom-in shadow-2xl"
                  onClick={() => setActiveImageZoom(activeProject.thumbnail)}
                >
                  <img src={activeProject.thumbnail} alt={`${activeProject.title} Full Artwork`} className="w-full h-auto max-h-[500px] object-contain group-hover/modalImg:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/modalImg:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="font-poppins-light font-light text-xs px-4 py-2 rounded-full bg-black/80 text-white border border-white/30 tracking-wider uppercase">Click to Expand 🔍</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProject.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="font-poppins-light font-light text-xs px-3 py-1 rounded bg-white/5 border border-white/10 text-neutral-300 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL RESOLUTION IMAGE ZOOM LIGHTBOX */}
      {activeImageZoom && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn cursor-zoom-out"
          onClick={() => setActiveImageZoom(null)}
          role="dialog"
        >
          <div className="relative max-w-7xl max-h-[95vh] flex items-center justify-center">
            <img src={activeImageZoom} alt="Zoomed artwork inspection" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_0_80px_rgba(255,255,255,0.15)]" />
            <button
              onClick={() => setActiveImageZoom(null)}
              className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/70 hover:bg-black active:scale-95 text-white border border-white/30 transition-all cursor-pointer"
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
