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
import oniAssignmentFullImg from '../assets/work/oni_assignment_full.jpg'
import projectPlaystaplesImg from '../assets/work/project_playstaples.png'
import kaaliPeeliHoverImg from '../assets/playstaples/kaali-peeli-hover.png'
import previewMelodyImg from '../assets/work/preview_melody.png'
import melodyCheckout from '../assets/work/melody/melody_checkout.png'
import melodyEvents from '../assets/work/melody/melody_events.jpg'
import melodyAbout from '../assets/work/melody/melody_about.jpg'
import melodyArtists from '../assets/work/melody/melody_artists.png'
import OniCardIsometricAnimation from './OniCardIsometricAnimation'
import AureusIsometricAnimation from './AureusIsometricAnimation'
import AureusShowcase from './AureusShowcase'
import Melody3DWall from './Melody3DWall'
import ProjectCaseStudyModal from './ProjectCaseStudyModal'
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

// PlayStaples full Behance UX Case Study presentation boards
// https://www.behance.net/gallery/249987899/Play-Staples-Ux-Case-Study
import psCase01Img from '../assets/playstaples/case-study/playstaples_case_01.webp'
import psCase02Img from '../assets/playstaples/case-study/playstaples_case_02.webp'
import psCase03Img from '../assets/playstaples/case-study/playstaples_case_03.webp'
import psCase04Img from '../assets/playstaples/case-study/playstaples_case_04.webp'
import psCase05Img from '../assets/playstaples/case-study/playstaples_case_05.webp'
import psCase06Img from '../assets/playstaples/case-study/playstaples_case_06.webp'
import psCase07Img from '../assets/playstaples/case-study/playstaples_case_07.webp'
import psCase08Img from '../assets/playstaples/case-study/playstaples_case_08.webp'
import psCase09Img from '../assets/playstaples/case-study/playstaples_case_09.webp'
import psCase10Img from '../assets/playstaples/case-study/playstaples_case_10.webp'
import psCase11Img from '../assets/playstaples/case-study/playstaples_case_11.webp'
import playStaplesMoodboardImg from '../assets/playstaples/case-study/playstaples_moodboard.png'


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
export const projectsData = [
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
    subtitle: 'E-Commerce UX Case Study & Handcrafted Collectible Brand Experience',
    category: 'UX Case Study & Toy Design',
    bulletSummary: 'UX Case Study • Ideation & Moodboard • IA & Design System • 3D Craft',
    description:
      'PlayStaples is an end-to-end e-commerce UX case study and collectible brand experience celebrating iconic Indian street culture. Grounded in Jakob Nielsen\'s usability heuristics, user research, and wireframe prototyping, the project overhauls the digital retail journey—from discovery and 360° product exploration to frictionless checkout—while spotlighting "Kaali Peeli", a handcrafted wooden Premier Padmini taxi collectible.',
    thumbnail: projectPlaystaplesImg,
    hoverImage: kaaliPeeliHoverImg,
    previewPhotos: [
      psCase01Img,
      psCase02Img,
      psCase03Img,
      psCase04Img,
      psCase05Img,
      psCase06Img,
      psCase07Img,
      psCase08Img,
      psCase09Img,
      psCase10Img,
      psCase11Img,
      playStaplesMoodboardImg,
    ],
    tags: ['UX Case Study', 'Moodboard', 'Heuristic Evaluation', 'UI Design System', 'E-Commerce', '3D Modeling'],
    deliverables: [
      'Visual ideation & moodboard: 3-layer aesthetic exploration (Maggie, Airborne, Buttermax)',
      'Heuristic evaluation across 10 usability principles & user interview synthesis',
      'Information architecture overhaul, sitemap & low-to-high fidelity wireframes',
      'Design system: typography hierarchy, color tokens & reusable UI component library',
      'High-fidelity e-commerce experience: homepage, catalog filters, 360° PDP & drawer cart',
      'Full end-to-end checkout funnel redesign reducing drop-off friction',
      'Physical "Kaali Peeli" Premier Padmini wooden collectible 3D CAD modeling & packaging',
    ],
    highlights:
      'Complete ground-up UX overhaul published on Behance, merging heuristic research and intuitive digital e-commerce with nostalgic Indian toy craftsmanship.',
    tools: ['Figma', 'UX Research', 'Design System', '3D CAD', 'Photoshop'],
    behanceUrl: 'https://www.behance.net/gallery/249987899/Play-Staples-Ux-Case-Study',
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
    subtitle: 'Personal Branding & Print Design Showcase',
    category: 'Brand Identity & Print Design',
    bulletSummary: 'Ideation & Sketching • 3 Card Directions • Split-Mask & Monogram • 3D Mockups',
    description:
      'ONI / OM Business Card is a personal branding and print design showcase detailing the ideation, visual development, and physical translation of three distinct business card directions. Beginning with rough pencil sketches exploring Oni mask motifs and monogram placements, the project develops into three tactile concepts: a horizontal split-face Oni mask set over bold magenta and swirled cosmic textures, a sleek minimalist monogram with speckled monochrome paper stock, and an airy pastel lilac vertical layout featuring an anime character cutout, geometric color bars, and corner QR code integration—concluding in floating 3D perspective mockups for physical print production.',
    thumbnail: projectCardsImg,
    hoverImage: projectCardsImg,
    isIsometricCards: true,
    previewPhotos: [
      oniAssignmentFullImg,
      oniCard2FrontImg,
      oniCard2BackImg,
      oniCardFrontImg,
      oniCardBackImg,
    ],
    tags: ['Brand Identity', 'Print Design', 'Character Illustration', 'Figma', 'Procreate', 'Typography'],
    deliverables: [
      'Ideation & sketching: pencil concepts exploring Oni mask motifs & monogram placement',
      'Concept 1 (Split-Mask Illustration): horizontal layout with cosmic marble & half-face Oni art',
      'Concept 2 (Minimalist Monogram): sleek monochrome card with speckled texture & spaced typography',
      'Concept 3 (Vertical Character Cutout): pastel lilac layout with geometric color bars & QR code',
      'Tactile print production specs: high-contrast color palettes, card stock textures & bleeds',
      '3D perspective mockups: floating angled staging demonstrating physical print translation',
    ],
    highlights:
      'Explored three distinct design languages for a personal brand identity—from high-energy split-mask character illustration to minimalist monochrome typography, packaged with production-ready print specifications and floating 3D mockups.',
    tools: ['Figma', 'Procreate', 'Illustrator', 'Print Production'],
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
      uiDiscover,
      uiProducts,
      uiDetail,
      uiCart,
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
    folderColor: '#8B7DE8', // Lavender Periwinkle
    tabColor: '#8B7DE8',
    accentColor: '#FF6584',
    date: 'JAN 12, 2026',
    title: 'Melody Tickets',
    subtitle: 'Live Concert Ticketing & End-to-End Desktop UX',
    category: 'UI/UX & Desktop Journey',
    bulletSummary: 'Live Music Discovery • Split-Theme Lineups • 2-Column Checkout • 3D Wall',
    isMelody3D: true,
    hoverImage: projectMelodyImg,
    description:
      'Melody is an immersive web UI/UX design concept for a live music and concert ticketing platform, engineered as an end-to-end desktop user journey. Contrasting sleek, dark-mode stage interfaces against a vibrant periwinkle backdrop accented with floating 3D spheres and circular "MELODY." typography, the platform bridges festival energy with frictionless utility—guiding fans seamlessly from atmospheric concert discovery and split-theme artist lineups into a focused two-column checkout and celebratory confirmation.',
    thumbnail: projectMelodyImg,
    previewPhotos: [
      projectMelodyImg,
      melodyEvents,
      melodyArtists,
      melodyCheckout,
      melodyAbout,
    ],
    tags: ['UI/UX Design', 'User Journey', 'Concert Ticketing', 'Figma', 'Visual Direction'],
    deliverables: [
      'Complete end-to-end desktop user journey: event discovery to post-purchase celebration',
      'Dark, atmospheric hero section featuring high-impact concert & rock act poster cards',
      'Split-theme event detail page pairing moody stage headers with clean artist photo grids',
      'Focused two-column checkout flow integrating real-time order summary & card payment form',
      'Celebratory "Thank You For Your Purchase!!" confirmation screen & crowd-backed About section',
      'Promotional presentation staging with vibrant periwinkle framing, 3D spheres & orbital typography',
    ],
    highlights:
      'Reimagined live music ticketing by pairing atmospheric dark-mode concert discovery with an airy, split-theme artist lineup and a frictionless two-column checkout—turning booking anxiety into pre-show excitement.',
    tools: ['Figma', 'UI/UX Design', 'User Journey Mapping', 'Visual Direction'],
  },
]

const getProjectGallery = (project) => {
  if (!project) return { hero: null, secondary: [] }

  if (project.id === 'playstaples') {
    return {
      hero: {
        img: psCase01Img,
        title: 'PlayStaples // UX Case Study & Collectible E-Commerce',
        caption: 'Featured UX Case Study: Behance Case Study & Part 2 Ideation Moodboard',
      },
      secondary: [
        {
          img: psCase02Img,
          title: '02 // Research & Problem Discovery',
          subtitle: 'Usability Heuristics, Pain Points & User Persona Mapping',
        },
        {
          img: psCase05Img,
          title: '03 // UI Design System & Component Library',
          subtitle: 'Consistent Typography, Color Tokens & Atomic Components',
        },
        {
          img: psCase06Img,
          title: '04 // High-Fidelity UI Screens & Catalog Flow',
          subtitle: 'Curated Indian Collectibles Discovery & Sticky Navigation',
        },
        {
          img: psCase09Img,
          title: '05 // Kaali Peeli Wooden Toy & Packaging Design',
          subtitle: 'Handcrafted Mumbai Premier Padmini 3D CAD & Retail Box',
        },
        {
          img: playStaplesMoodboardImg,
          title: '06 // Part 2: Ideation & Visual Moodboard',
          subtitle: 'Art Direction Exploration: Abstract, Maggie, Airborne & Buttermax',
        },
      ],
    }
  }

  if (project.id === 'business-cards') {
    return {
      hero: {
        img: oniAssignmentFullImg,
        title: 'ONI Studios // Full Assignment Showcase & Print Design',
        caption: 'Complete Assignment Board: Ideation Sketches, 3 Concepts & 3D Perspective Mockups',
      },
      secondary: [
        {
          img: oniCard2FrontImg,
          title: '02 // Concept 1 • Split-Mask Illustration',
          subtitle: 'Horizontal Split Oni Mask, Swirled Cosmic Texture & Magenta Staging',
        },
        {
          img: oniCard2BackImg,
          title: '03 // Concept 1 Reverse & Print Production',
          subtitle: 'Card Reverse Typography & Production Specifications',
        },
        {
          img: oniCardFrontImg,
          title: '04 // Concept Artwork & Character Framing',
          subtitle: 'Anime-Inspired Persona Illustration & Monogram Lockup',
        },
        {
          img: oniCardBackImg,
          title: '05 // Print Layout & Back Typography',
          subtitle: 'Contact Details, Studio Branding & Scannable QR Integration',
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
        title: 'Melody // Live Concert Ticketing & End-to-End Desktop Journey',
        caption: 'Full Journey Showcase: Atmospheric Dark Mode, Split-Theme Lineup & 3D Periwinkle Staging',
      },
      secondary: [
        {
          img: melodyEvents,
          title: '02 // Upcoming Events & Poster Gallery',
          subtitle: 'Dark Mode Stage Atmosphere with Featured Live Concert Lineups & Headliners',
        },
        {
          img: melodyArtists,
          title: '03 // Metallica Lineup & Performing Artists',
          subtitle: 'Split-Theme Layout: Atmospheric Band Header with Clean Musician Profile Grid',
        },
        {
          img: melodyCheckout,
          title: '04 // Streamlined Order Summary & Payment',
          subtitle: 'Focused Two-Column Checkout with Real-Time Ticket Total and Card Details',
        },
        {
          img: melodyAbout,
          title: '05 // Purchase Confirmation & Brand Story',
          subtitle: 'Celebratory Post-Purchase Flow Backdropped by Immersive Concert Crowd Imagery',
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
                  ) : card.isMelody3D || card.id === 'melody' ? (
                    <Melody3DWall isPaused={hoveredCardId === card.id} />
                  ) : card.flipImages ? (
                    <FlippingBusinessCard
                      front={card.flipImages[0]}
                      back={card.flipImages[1]}
                      alt={card.title}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : card.id === 'playstaples' ? (
                    <img 
                      src={card.thumbnail} 
                      alt={card.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
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

      {/* CASE STUDY DETAIL MODAL - TRIONN PULSE STUDIO LAYOUT */}
      {activeProject && (
        <ProjectCaseStudyModal
          project={activeProject}
          onClose={handleCloseProject}
          allProjects={projectsData}
          onSelectProject={(newProject) => setActiveProject(newProject)}
        />
      )}
    </div>
  )
}
