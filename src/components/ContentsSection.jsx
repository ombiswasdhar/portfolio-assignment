import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Layers, Grid3X3, LayoutList, Maximize2, Minimize2, ExternalLink, ZoomIn, ArrowUp, X } from 'lucide-react'
import projectCardsImg from '../assets/work/project_cards.jpg'
import projectAureausImg from '../assets/work/project_aureaus.png'
import projectMelodyImg from '../assets/work/project_melody.jpg'
import oniCardFrontImg from '../assets/work/oni-card-front.png'
import oniCardBackImg from '../assets/work/oni-card-back.png'
import oniCard2FrontImg from '../assets/work/oni-card-2-front.png'
import oniCard2BackImg from '../assets/work/oni-card-2-back.png'
import oniCardsHoverImg from '../assets/work/headphone-mockup.png'
import projectPlaystaplesImg from '../assets/work/project_playstaples.png'
import kaaliPeeliHoverImg from '../assets/playstaples/kaali-peeli-hover.png'
import previewMelodyImg from '../assets/work/preview_melody.png'
import OniCardIsometricAnimation from './OniCardIsometricAnimation'
import AureusIsometricAnimation from './AureusIsometricAnimation'
import AureusShowcase from './AureusShowcase'
import AureusCaseStudyModal from './AureusCaseStudyModal'
import PlayStaplesCaseStudyModal from './PlayStaplesCaseStudyModal'
import DiagonalMarqueeCarousel from '@/components/ui/diagonal-marquee-carousel'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import uiDiscover from '../assets/work/aureus/aureus-ui-discover.png'
import uiProducts from '../assets/work/aureus/aureus-ui-products.png'
import uiDetail from '../assets/work/aureus/aureus-ui-product-detail.png'
import uiCart from '../assets/work/aureus/aureus-ui-cart.png'
import aureusIdeationImg from '../assets/work/aureus/aureus-01-ideation.png'
import aureusUserStudyImg from '../assets/work/aureus/aureus-02-user-study.png'
import aureusPainPointsImg from '../assets/work/aureus/aureus-03-pain-points.png'
import aureusPersonaImg from '../assets/work/aureus/aureus-04-persona.png'
import aureusAdvantagesImg from '../assets/work/aureus/aureus-05-advantages.png'

const aureusCarouselCards = [
  { id: 'aureus-1', url: projectAureausImg, title: 'Aureus Audio Flagship Hero' },
  { id: 'aureus-2', url: uiDiscover, title: 'Discover Acoustics & Lookbook' },
  { id: 'aureus-3', url: uiProducts, title: 'Acoustic Collection Product Grid' },
  { id: 'aureus-4', url: uiDetail, title: 'Hardware Specs & Drivers Detail' },
  { id: 'aureus-5', url: uiCart, title: 'Streamlined Checkout Funnel' },
]

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
import FeaturedWorksFloatingElements from './FeaturedWorksFloatingElements'

function CyclingProjectImage({ images, alt, className, onImageClick, isHovered }) {
  const [imageIndex, setImageIndex] = React.useState(0)
  const imageList = images?.length ? images : []

  React.useEffect(() => {
    if (!isHovered || imageList.length < 2) {
      setImageIndex(0)
      return undefined
    }

    let currentIndex = 0
    const interval = window.setInterval(() => {
      currentIndex = (currentIndex + 1) % imageList.length
      setImageIndex(currentIndex)
    }, 750)

    return () => window.clearInterval(interval)
  }, [isHovered, imageList.length])

  const src = imageList[imageIndex] || imageList[0]
  const handleClick = (event, imageSrc) => onImageClick?.(event, imageSrc)

  return (
    <span className="relative block h-full w-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 ${className}`}
        onClick={(event) => handleClick(event, src)}
      />
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
    subtitle: '3D Hardware & UX Case Study Deck',
    category: 'UX Case Study & 3D Design',
    bulletSummary: 'UX Case Study • User Persona • Market Landscape • 3D Hardware',
    isAureusIsometric: true,
    hoverImage: projectAureausImg,
    description:
      'Aureus is your go-to site for discovering top quality headphones made by the best brands for audio in the market. We focus on bringing you a carefully chosen range of luxurious, high performance headphones that combine superior sound with sleek design.',
    thumbnail: projectAureausImg,
    previewPhotos: [
      projectAureausImg,
      aureusIdeationImg,
      aureusUserStudyImg,
      aureusPersonaImg,
      aureusPainPointsImg,
      aureusAdvantagesImg,
    ],
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

const getProjectGallery = (project) => {
  if (!project) return { hero: null, secondary: [] }

  if (project.id === 'playstaples') {
    return {
      hero: {
        img: projectPlaystaplesImg,
        title: 'PlayStaples // Kaali Peeli Premier Padmini Collectible Wooden Toy',
        caption: '3D CAD Product Model & Authentic Mumbai Taxi Livery',
      },
      secondary: [
        {
          img: kaaliPeeliHoverImg,
          title: '02 // Lifestyle Packaging & Staging',
          subtitle: 'Collectible Retail Box Artwork & Scene Staging',
        },
        {
          img: psCycle01BombayImg,
          title: '03 // Cultural Heritage Study',
          subtitle: 'Premier Padmini Archive & Iconic Street Nostalgia',
        },
        {
          img: psCycleBd01Img,
          title: '04 // Tactile Wooden Toy Prototype',
          subtitle: 'Warm Grain Hardwood & Precision Proportions',
        },
        {
          img: psCycleRetroRohtakImg,
          title: '05 // Retail Livery & Typography',
          subtitle: 'Authentic Fare Meter Details & Graphic Treatment',
        },
      ],
    }
  }

  if (project.id === 'business-cards') {
    return {
      hero: {
        img: oniCardsHoverImg,
        title: 'Oni Design Studios // Corporate & Freelance Identity Showcase',
        caption: 'Diagonal Dynamic Layout & Cyberpunk Lilac Colorway',
      },
      secondary: [
        {
          img: oniCardFrontImg,
          title: '02 // Iteration 01 • Front View',
          subtitle: 'Lilac Dual Brand Spec & Mascot Framing',
        },
        {
          img: oniCardBackImg,
          title: '03 // Iteration 01 • Back View',
          subtitle: 'Typography Layout & Integrated QR Code',
        },
        {
          img: oniCard2FrontImg,
          title: '04 // Iteration 02 • Cosmic Oni Mask',
          subtitle: 'Om Biswas Print Spec & Cosmic Velvet Finish',
        },
        {
          img: oniCard2BackImg,
          title: '05 // Iteration 02 • Back View',
          subtitle: 'Embossed Soft-Touch Typography & Dimensions',
        },
      ],
    }
  }

  if (project.id === 'aureaus') {
    return {
      hero: {
        img: projectAureausImg,
        title: 'Aureus Audio // 3D Hardware Telemetry & Audio Lookbook',
        caption: 'Blender 3D Modeling & Editorial Magazine Typography Spread',
      },
      secondary: [
        {
          img: uiDiscover,
          title: '02 // Acoustic Discovery & Lookbook',
          subtitle: 'Magazine Spread Layout & Typography Hierarchy',
        },
        {
          img: uiProducts,
          title: '03 // Acoustic Collection Catalog',
          subtitle: 'Dark Mode Product Grid & Hardware Metrics',
        },
        {
          img: uiDetail,
          title: '04 // Hardware Specifications & Drivers',
          subtitle: 'Driver Telemetry & Modern Audiophile Reviews',
        },
        {
          img: uiCart,
          title: '05 // Streamlined Purchase Funnel',
          subtitle: 'Minimal Cart System & Frictionless Checkout',
        },
      ],
    }
  }

  if (project.id === 'melody') {
    return {
      hero: {
        img: projectMelodyImg,
        title: 'Melody Tickets // Entertainment Ticketing & User Flow Funnel',
        caption: 'Comprehensive Booking Journey Wireframes & UI Prototypes',
      },
      secondary: [
        {
          img: previewMelodyImg,
          title: '02 // Interactive Concert Booking Funnel',
          subtitle: 'Seat Selector Flow & Ticket Confirmation Modal',
        },
        {
          img: projectMelodyImg,
          title: '03 // Campaign Identity & Chromatic Visuals',
          subtitle: 'Promotional Banners & Floating 3D Geometries',
        },
      ],
    }
  }

  return {
    hero: {
      img: project.thumbnail,
      title: project.title,
      caption: project.subtitle,
    },
    secondary: [],
  }
}

export default function ContentsSection() {
  const [activeProject, setActiveProject] = React.useState(null)
  const [activeImageZoom, setActiveImageZoom] = React.useState(null)
  const [hoveredCardId, setHoveredCardId] = React.useState(null)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  // Track browser native fullscreen state
  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }

  const handleOpenProject = (project) => {
    setActiveProject(project)
  }

  const handleCloseProject = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
    setActiveProject(null)
  }

  const [disclaimerRef, isDisclaimerVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  const [headerRef, isHeaderVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  const [isHandwritingInView, setIsHandwritingInView] = React.useState(false)
  const [handwritingKey, setHandwritingKey] = React.useState(0)
  const handwritingTriggerRef = React.useRef(null)

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeImageZoom) {
          setActiveImageZoom(null)
        } else if (activeProject) {
          handleCloseProject()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeProject, activeImageZoom])

  useBodyScrollLock(!!(activeProject || activeImageZoom))

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
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-blue-900/10 blur-[180px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

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
              disclaimer!
            </h2>
            <p className="font-myfont text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] text-neutral-100 font-medium leading-[1.45] sm:leading-[1.4] max-w-3xl lg:max-w-4xl mx-auto lowercase">
              all the projects showcased here are from my 2nd & 3rd year, along with my internship projects.
            </p>
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto my-5 sm:my-7 flex justify-center opacity-45">
              <svg className="w-full h-3 text-neutral-400" viewBox="0 0 500 6" fill="none" preserveAspectRatio="none">
                <path d="M2 3.5 C 90 2, 220 5, 340 3 C 400 2, 460 4.5, 498 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-myfont text-xl sm:text-2xl md:text-3xl lg:text-[34px] text-neutral-200 font-medium lowercase tracking-wide">
              (yes, that's my handwriting, don't judge)
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

        <section id="featured-works" className="relative z-10 w-full pt-16 sm:pt-24 md:pt-28 pb-12 sm:pb-20 md:pb-24 px-4 sm:px-8 scroll-mt-16 overflow-hidden min-h-[440px] sm:min-h-[500px] flex items-center justify-center">
          {/* Dynamic Floating Background Elements */}
          <FeaturedWorksFloatingElements />
          <div ref={headerRef} className={`relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center transition-all duration-1000 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                onClick={() => handleOpenProject(card)}
              >
                {/* PROJECT IMAGE CONTAINER WITH AUTOMATIC IMAGE CYCLING */}
                <div className={`relative w-full aspect-[4/3] flex-1 overflow-hidden ${card.flipImages ? 'bg-[#c99bd8]' : 'bg-neutral-900'}`}>
                  {card.isIsometricCards ? (
                    <OniCardIsometricAnimation isPaused={hoveredCardId === card.id} />
                  ) : card.isAureusIsometric ? (
                    <DiagonalMarqueeCarousel
                      cards={aureusCarouselCards}
                      angle={-22}
                      baseSpeed={80}
                      className="h-full w-full min-h-0 bg-neutral-950"
                      cardClassName="h-[120px] w-[180px] sm:h-[135px] sm:w-[200px] md:h-[145px] md:w-[220px] rounded-lg shadow-xl border border-white/10"
                    />
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
                      isHovered={hoveredCardId === card.id}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105" 
                    />
                  ) : (
                    <img 
                      src={card.thumbnail} 
                      alt={card.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                  )}
                  <div className={`absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 ${card.isIsometricCards || card.isAureusIsometric || card.id === 'business-cards' || card.id === 'oni-studios' || card.id === 'aureaus' || card.id === 'melody' ? 'pointer-events-none' : card.hoverImage ? '' : 'bg-black/50 backdrop-blur-[2px]'}`}>
                    {card.hoverImage && (
                      <img 
                        src={card.hoverImage} 
                        alt={`${card.title} project artwork`} 
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                      />
                    )}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#E84A4A]/35" />
                    {!(card.hoverImage || card.id === 'business-cards' || card.id === 'oni-studios' || card.isIsometricCards || card.isAureusIsometric || card.id === 'aureaus' || card.id === 'melody') && (
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

      {/* CASE STUDY DETAIL MODAL - STUDIO EDITORIAL LAYOUT */}
      {activeProject && (() => {
        const gallery = getProjectGallery(activeProject)
        const otherProjects = projectsData.filter((p) => p.id !== activeProject.id)

        return (
          <div
            className="fixed inset-0 z-[100] w-full h-full bg-[#08080C] text-white flex flex-col overflow-hidden animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            {/* STICKY STUDIO BROWSER HEADER */}
            <header
              style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))' }}
              className="sticky top-0 z-40 bg-[#0C0C12]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 shrink-0 shadow-xl"
            >
              {/* LEFT PILLS: Studio Badge / Menu / Active Project */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="px-3 py-1 rounded-full bg-white text-black font-akira text-[10px] sm:text-xs font-black tracking-wider uppercase shrink-0">
                  OM.STUDIO
                </span>
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white font-ca-mono text-[11px] tracking-wider uppercase">
                  Menu
                </span>
                <div className="hidden md:flex items-center gap-1.5 text-white/60">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-ca-mono uppercase truncate max-w-[200px]">
                    {activeProject.displayTitle || activeProject.title}
                  </span>
                </div>
              </div>

              {/* CENTER BROWSER ADDRESS PILL */}
              <div className="hidden lg:flex items-center justify-center flex-1 max-w-md mx-4">
                <div className="w-full px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-xs font-ca-mono text-white/70">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: activeProject.folderColor || '#FFE500' }}
                  />
                  <span className="text-white/40">studio.ombiswas /</span>
                  <span className="text-white font-medium">{activeProject.id}</span>
                </div>
              </div>

              {/* RIGHT ACTIONS: Fullscreen + Close */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-ca-mono text-white transition-colors cursor-pointer"
                  title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-3.5 h-3.5 text-[#FFE500]" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5 text-[#FFE500]" />
                  )}
                  <span className="hidden md:inline">
                    {isFullscreen ? 'Exit' : 'Fullscreen'}
                  </span>
                </button>

                <button
                  onClick={handleCloseProject}
                  type="button"
                  className="min-w-[36px] min-h-[36px] p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-white/15 hover:bg-[#E84A4A] text-white border border-white/20 transition-all active:scale-95 cursor-pointer text-xs font-ca-mono flex items-center justify-center gap-1.5 shadow-md"
                  title="Close (Esc)"
                  aria-label="Close project"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            </header>

            {/* SCROLLABLE MAIN CONTENT (STUDIO EDITORIAL DUAL COLUMN) */}
            <div
              id="project-fullscreen-container"
              className="flex-1 w-full overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 overscroll-contain"
              style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
            >
              <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[430px_1fr] gap-6 lg:gap-8 items-start">
                {/* LEFT COLUMN: Project Dossier Card + Other Works Switcher */}
                <div className="flex flex-col gap-6">
                  {/* CARD 1: PROJECT DOSSIER */}
                  <div className="bg-[#0F0F16] rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col gap-5">
                    {/* Top Row: Title + Date */}
                    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-ca-mono text-[10px] uppercase tracking-[0.2em] text-[#FFE500]">
                          {activeProject.num || '01'} // CASE STUDY
                        </span>
                        <h2 className="font-akira text-xl sm:text-2xl font-black text-white uppercase tracking-wide leading-tight">
                          {activeProject.title}
                        </h2>
                      </div>
                      <span className="font-ca-mono text-xs font-semibold text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full shrink-0">
                        {activeProject.date ? activeProject.date.split(',')[1]?.trim() || activeProject.date : '2026'}
                      </span>
                    </div>

                    {/* Editorial Narrative / Summary */}
                    <div className="space-y-3">
                      <p className="font-poppins text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                        {activeProject.description}
                      </p>
                      {activeProject.highlights && (
                        <div
                          className="border-l-2 pl-3 py-1 text-xs font-poppins text-neutral-400 italic"
                          style={{ borderColor: activeProject.folderColor || '#FFE500' }}
                        >
                          "{activeProject.highlights}"
                        </div>
                      )}
                    </div>

                    {/* Deliverables / Scope */}
                    {activeProject.deliverables && activeProject.deliverables.length > 0 && (
                      <div className="space-y-2 border-t border-white/10 pt-4">
                        <h3 className="font-ca-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                          Scope & Key Deliverables
                        </h3>
                        <ul className="space-y-1.5">
                          {activeProject.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs font-poppins text-neutral-300">
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                style={{ backgroundColor: activeProject.folderColor || '#FFE500' }}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tools & Tech Stack */}
                    {activeProject.tools && activeProject.tools.length > 0 && (
                      <div className="space-y-2 border-t border-white/10 pt-4">
                        <h3 className="font-ca-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                          Discipline & Tools
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {activeProject.tools.map((tool, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-ca-mono text-neutral-300"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* External Figma Link if present */}
                    {activeProject.figmaUrl && (
                      <a
                        href={activeProject.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-[#E84A4A] hover:bg-[#ff5252] text-white font-akira text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-red-500/20 active:scale-[0.98] cursor-pointer"
                      >
                        Inspect Figma Workspace
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* CARD 2: "TRABALHOS" / OTHER WORKS SWITCHER */}
                  <div className="bg-[#0F0F16] rounded-3xl p-5 sm:p-6 border border-white/10 shadow-2xl flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FFE500]" />
                        <h3 className="font-akira text-xs sm:text-sm font-black uppercase text-white tracking-wider">
                          Other Works
                        </h3>
                      </div>
                      <span className="font-ca-mono text-[10px] text-white/40 tracking-wider">
                        {otherProjects.length} Projects
                      </span>
                    </div>

                    {/* 2-Column Switcher Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {otherProjects.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setActiveProject(p)
                            const container = document.getElementById('project-fullscreen-container')
                            if (container) container.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          className="group text-left flex flex-col gap-2 p-2 rounded-2xl bg-[#14141E] hover:bg-[#1A1A28] border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                        >
                          <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#0A0A0E] relative border border-white/5">
                            <img
                              src={p.thumbnail || p.hoverImage}
                              alt={p.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="font-ca-mono text-[10px] font-bold text-white bg-black/80 px-2 py-1 rounded-full border border-white/20">
                                View ↗
                              </span>
                            </div>
                          </div>
                          <div className="px-1 min-w-0">
                            <p className="font-akira text-[10px] sm:text-[11px] font-bold text-white uppercase truncate group-hover:text-[#FFE500] transition-colors">
                              {p.tabTitle || p.title}
                            </p>
                            <span className="font-ca-mono text-[9px] text-neutral-400 block truncate">
                              {p.category}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Large Hero Card + 2-Column Secondary Visuals */}
                <div className="flex flex-col gap-6">
                  {/* HERO SHOWCASE CARD */}
                  {gallery.hero && (
                    <div className="bg-[#0F0F16] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group transition-all hover:border-white/20 flex flex-col">
                      <div
                        className="relative w-full bg-[#050508] overflow-hidden cursor-zoom-in flex items-center justify-center min-h-[300px] sm:min-h-[440px] lg:min-h-[500px]"
                        onClick={() => setActiveImageZoom(gallery.hero.img)}
                      >
                        <img
                          src={gallery.hero.img}
                          alt={gallery.hero.title}
                          className="w-full h-full object-contain max-h-[640px] group-hover:scale-[1.015] transition-transform duration-500"
                        />

                        {/* Hover Overlay Zoom Pill */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white font-ca-mono text-xs">
                            <ZoomIn className="w-3.5 h-3.5 text-[#FFE500]" />
                            Click to Inspect
                          </span>
                        </div>
                      </div>

                      {/* Hero Info Bar */}
                      <div className="p-4 sm:p-5 bg-[#12121A] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <h3 className="font-ca-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider truncate">
                            {gallery.hero.title}
                          </h3>
                          <p className="font-poppins text-xs text-neutral-400 truncate">
                            {gallery.hero.caption}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveImageZoom(gallery.hero.img)}
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-ca-mono text-white/80 transition-colors cursor-pointer self-start sm:self-auto"
                        >
                          <ZoomIn className="w-3.5 h-3.5 text-[#FFE500]" />
                          Inspect Full Res
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SECONDARY VISUALS 2-COLUMN GRID */}
                  {gallery.secondary && gallery.secondary.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                      {gallery.secondary.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-[#0F0F16] rounded-3xl overflow-hidden border border-white/10 shadow-xl group hover:border-white/25 transition-all flex flex-col"
                        >
                          {/* Image box */}
                          <div
                            className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#07070B] overflow-hidden cursor-zoom-in flex items-center justify-center"
                            onClick={() => setActiveImageZoom(item.img)}
                          >
                            <img
                              src={item.img}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            {/* Hover zoom pill */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-white font-ca-mono text-xs">
                                <ZoomIn className="w-3.5 h-3.5 text-[#FFE500]" />
                                Zoom
                              </span>
                            </div>
                          </div>

                          {/* Caption bar */}
                          <div className="p-4 bg-[#12121A] border-t border-white/10 flex flex-col gap-0.5">
                            <h4 className="font-ca-mono text-xs font-bold text-white uppercase tracking-wider truncate">
                              {item.title}
                            </h4>
                            <p className="font-poppins text-[11px] sm:text-xs text-neutral-400 line-clamp-1">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* FULL RESOLUTION IMAGE ZOOM LIGHTBOX */}
      {activeImageZoom && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn cursor-zoom-out"
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
