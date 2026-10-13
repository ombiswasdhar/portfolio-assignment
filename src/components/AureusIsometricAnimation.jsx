import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, Play, Pause, ExternalLink, X, ChevronRight, Eye } from 'lucide-react'

import uiDiscover from '../assets/work/aureus/aureus-ui-discover.png'
import uiProducts from '../assets/work/aureus/aureus-ui-products.png'
import uiDetail from '../assets/work/aureus/aureus-ui-product-detail.png'
import uiCart from '../assets/work/aureus/aureus-ui-cart.png'

export const AUREUS_UI_PAGES = [
  {
    id: 'discover',
    num: '01',
    title: 'Sony WH Noise Cancelling • Hero Landing',
    shortTitle: 'Discover Hero',
    route: 'aureus-audio.com/discover',
    category: 'Editorial Hero & Audio Teaser',
    description: 'Dynamic editorial hero showcase featuring Sony WH Noise Cancelling flagship acoustics, ambient lookbook, and sleek discovery navigation.',
    image: uiDiscover,
    accent: '#E84A4A',
    theme: 'crimson',
    tag: 'HERO LANDING',
  },
  {
    id: 'products',
    num: '02',
    title: 'Acoustic Collection • Product Catalog Grid',
    shortTitle: 'Products Catalog',
    route: 'aureus-audio.com/products',
    category: 'E-Commerce Catalog & Filtering',
    description: 'Minimalist product grid showcasing 6 flagship headphone models with quick wishlisting, switchable color toggles, and instant cart additions.',
    image: uiProducts,
    accent: '#4A5568',
    theme: 'light',
    tag: 'CATALOG GRID',
  },
  {
    id: 'product-detail',
    num: '03',
    title: 'Sony WH-CH720N • Product Detail & Specs',
    shortTitle: 'Product Detail',
    route: 'aureus-audio.com/products/wh-ch720n',
    category: 'Interactive Hardware Showcase',
    description: 'Deep-dive product page with 40mm drivers spec breakdown, 35-hour battery metric, tactile 360° colorways, and purchase funnel.',
    image: uiDetail,
    accent: '#F08264',
    theme: 'light',
    tag: 'PRODUCT DETAIL',
  },
  {
    id: 'cart',
    num: '04',
    title: 'Cart Breakdown • Streamlined Checkout Funnel',
    shortTitle: 'Cart & Checkout',
    route: 'aureus-audio.com/cart',
    category: 'Checkout & Conversion Flow',
    description: 'Frictionless checkout summary with quantity stepper, dynamic coupon validator, order totals tally, and single-click checkout CTA.',
    image: uiCart,
    accent: '#8B7DE8',
    theme: 'light',
    tag: 'CART & CHECKOUT',
  },
]

export default function AureusIsometricAnimation({
  className = '',
  isPaused: externalPaused = false,
  isCompact = false,
  onOpenZoom = null,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredCardId, setHoveredCardId] = useState(null)
  const [activeZoomImage, setActiveZoomImage] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [themeMode, setThemeMode] = useState('ivory') // 'ivory' (matching reference pin.it/7HbzlQxmW) | 'dark'
  const rafRef = useRef(null)

  const isActuallyPaused = externalPaused || isHovered

  // Duplicate cards for a seamless infinite loop
  const duplicatedCards = [...AUREUS_UI_PAGES, ...AUREUS_UI_PAGES]

  const handleMouseMove = (e) => {
    if (isCompact) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x, y })
    })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setHoveredCardId(null)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setMousePos({ x: 0, y: 0 })
  }

  const handleCardClick = (card, e) => {
    e?.stopPropagation()
    if (onOpenZoom) {
      onOpenZoom(card.image)
    } else {
      setActiveZoomImage(card)
    }
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden transition-colors duration-500 ${
        themeMode === 'ivory' ? 'bg-[#ECE8E1] text-[#0A0A0A]' : 'bg-[#0A0A0D] text-white'
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: isCompact ? 1000 : 1400 }}
    >
      <style>{`
        /* ======================================================== */
        /* AUREUS CONTINUOUS 3D ISOMETRIC CONVEYOR GLIDE            */
        /* (Continuous linear motion until hovered)                 */
        /* ======================================================== */
        @keyframes aureusIsometricConveyor {
          0% {
            transform: translate3d(0, 0%, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }

        .aureus-conveyor-track {
          animation: aureusIsometricConveyor ${isCompact ? '18s' : '26s'} linear infinite;
          will-change: transform;
        }

        .aureus-conveyor-track.is-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* ============================================================ */}
      {/* MASSIVE KINETIC EDITORIAL BACKGROUND TYPOGRAPHY              */}
      {/* (Directly matching Pinterest Pin: pin.it/7HbzlQxmW)           */}
      {/* ============================================================ */}
      <div 
        className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none select-none overflow-hidden leading-[0.82] py-2 z-0"
        aria-hidden="true"
      >
        <div 
          className={`font-akira font-black uppercase text-center tracking-tighter transition-colors duration-500 ${
            themeMode === 'ivory' ? 'text-[#050505] opacity-95' : 'text-white/10'
          } ${isCompact ? 'text-[15vw]' : 'text-[13.5vw] md:text-[14vw] lg:text-[14.5vw]'}`}
        >
          TEMPLATE
        </div>
        <div 
          className={`font-akira font-black uppercase text-center tracking-tighter transition-colors duration-500 ${
            themeMode === 'ivory' ? 'text-[#050505] opacity-95' : 'text-white/10'
          } ${isCompact ? 'text-[15vw]' : 'text-[13.5vw] md:text-[14vw] lg:text-[14.5vw]'}`}
        >
          FEATURED
        </div>
        <div 
          className={`font-akira font-black uppercase text-center tracking-tighter transition-colors duration-500 ${
            themeMode === 'ivory' ? 'text-[#050505] opacity-95' : 'text-white/10'
          } ${isCompact ? 'text-[15vw]' : 'text-[13.5vw] md:text-[14vw] lg:text-[14.5vw]'}`}
        >
          TEMPLATE
        </div>
        <div 
          className={`font-akira font-black uppercase text-center tracking-tighter transition-colors duration-500 ${
            themeMode === 'ivory' ? 'text-[#050505] opacity-95' : 'text-white/10'
          } ${isCompact ? 'text-[15vw]' : 'text-[13.5vw] md:text-[14vw] lg:text-[14.5vw]'}`}
        >
          FEATURED
        </div>
      </div>

      {/* ============================================================ */}
      {/* TOP & BOTTOM CORNER EDITORIAL LABELS (AUTHENTIC 100.SUPPLY)   */}
      {/* ============================================================ */}
      {!isCompact && (
        <>
          {/* Top Left: Webflow brand tag */}
          <div className="absolute top-4 left-5 z-20 pointer-events-none font-ca-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] opacity-80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E84A4A] animate-pulse" />
            <span>WEBFLOW // AUREUS</span>
          </div>

          {/* Top Right: 100.SUPPLY / Agency spec tag */}
          <div className="absolute top-4 right-5 z-20 pointer-events-none font-ca-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] opacity-80 text-right">
            <span>100.SUPPLY</span>
          </div>

          {/* Bottom Left: Screen collection spec */}
          <div className="absolute bottom-4 left-5 z-20 pointer-events-none hidden sm:flex flex-col gap-0.5 font-ca-mono text-[9px] md:text-[10px] tracking-wider opacity-70">
            <span className="font-bold">4 HIGH-FIDELITY VIEWS:</span>
            <span>DISCOVER • PRODUCTS • DETAIL • CART</span>
          </div>

          {/* Bottom Right: Interactive Status Badge & Theme Switcher */}
          <div className="absolute bottom-4 right-5 z-30 flex items-center gap-2.5">
            {/* Theme Toggle Button (Ivory vs Dark) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setThemeMode((prev) => (prev === 'ivory' ? 'dark' : 'ivory'))
              }}
              className={`px-3 py-1.5 rounded-full border text-[10px] font-ca-mono uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer shadow-md active:scale-95 ${
                themeMode === 'ivory'
                  ? 'bg-black/10 hover:bg-black/20 border-black/20 text-black'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
              title="Toggle Editorial Theme"
            >
              {themeMode === 'ivory' ? '☾ Dark Mode' : '☼ Ivory Paper'}
            </button>

            {/* Play/Pause Hover State Indicator */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-ca-mono uppercase tracking-wider backdrop-blur-md shadow-md transition-all ${
                isActuallyPaused
                  ? 'bg-[#E84A4A] text-white border-[#E84A4A]'
                  : themeMode === 'ivory'
                  ? 'bg-black/80 text-white border-black'
                  : 'bg-white/90 text-black border-white'
              }`}
            >
              {isActuallyPaused ? (
                <>
                  <Pause className="w-3 h-3 fill-current" />
                  <span>PAUSED (CLICK TO ZOOM)</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current animate-pulse" />
                  <span>AUTOPLAYING (HOVER TO PAUSE)</span>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* ============================================================ */}
      {/* 3D ISOMETRIC STAGE RIG                                       */}
      {/* Tilted along diagonal plane with seamless flowing conveyor   */}
      {/* ============================================================ */}
      <div
        className="relative w-full h-full flex items-center justify-center z-10 pointer-events-auto"
        style={{
          transform: isCompact
            ? 'rotate(-20deg) scale(0.92)'
            : `rotateX(${14 + (isHovered ? mousePos.y * 10 : 0)}deg) rotateY(${-6 + (isHovered ? mousePos.x * 10 : 0)}deg) rotateZ(${-22 + (isHovered ? mousePos.x * 4 : 0)}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* CONVEYOR COLUMN TRACK */}
        <div
          className={`aureus-conveyor-track flex flex-col items-center ${
            isActuallyPaused ? 'is-paused' : ''
          } ${isCompact ? 'gap-6 w-[85%] max-w-[380px]' : 'gap-10 sm:gap-14 w-[84%] max-w-[560px] md:max-w-[620px] lg:max-w-[680px]'}`}
        >
          {duplicatedCards.map((card, index) => {
            const isThisCardHovered = hoveredCardId === `${card.id}-${index}`

            return (
              <div
                key={`${card.id}-${index}`}
                onMouseEnter={() => setHoveredCardId(`${card.id}-${index}`)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={(e) => handleCardClick(card, e)}
                className={`group/card relative w-full aspect-[1024/697] rounded-[18px] sm:rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 ${
                  isThisCardHovered
                    ? 'scale-[1.03] z-40 shadow-[0_45px_90px_-15px_rgba(0,0,0,0.5),0_0_0_2px_#E84A4A]'
                    : 'shadow-[0_22px_55px_-12px_rgba(0,0,0,0.38),0_2px_6px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.1)]'
                }`}
                style={{
                  transform: isThisCardHovered ? 'translateZ(35px)' : 'translateZ(0px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Browser Pill Header (Minimalist Mockup Bar) */}
                <div 
                  className={`w-full px-3.5 py-2 sm:py-2.5 flex items-center justify-between border-b backdrop-blur-md transition-colors ${
                    card.theme === 'crimson'
                      ? 'bg-[#8F2B2B] border-white/15 text-white'
                      : 'bg-[#F2EFEB]/90 border-black/10 text-neutral-800'
                  }`}
                >
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/20" />
                  </div>

                  {/* Browser URL Pill */}
                  <div className={`px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-ca-mono tracking-wider truncate max-w-[200px] border ${
                    card.theme === 'crimson'
                      ? 'bg-black/20 border-white/10 text-white/90'
                      : 'bg-white/80 border-black/10 text-neutral-700'
                  }`}>
                    {card.route}
                  </div>

                  {/* Screen Number Badge */}
                  <span className={`text-[9px] sm:text-[10px] font-ca-mono font-bold tracking-widest uppercase ${
                    card.theme === 'crimson' ? 'text-white/80' : 'text-neutral-500'
                  }`}>
                    {card.num}
                  </span>
                </div>

                {/* Screenshot Image Container */}
                <div className="relative w-full aspect-[1024/697] bg-white overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.alt}
                    draggable={false}
                    className="w-full h-full object-cover block pointer-events-none transition-transform duration-500 group-hover/card:scale-[1.01]"
                  />

                  {/* Specular Sheen Gradient */}
                  <div 
                    className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/10 via-transparent to-white/15" 
                    aria-hidden="true" 
                  />

                  {/* Hover Inspection Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-4 text-center">
                    <span className="px-4 py-2 rounded-full bg-white text-black font-ca-mono text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-200">
                      <ZoomIn className="w-3.5 h-3.5 text-[#E84A4A]" /> Click to Inspect Screen
                    </span>
                    <span className="mt-2 text-white/90 text-xs font-medium font-ca-mono max-w-[320px] drop-shadow-md hidden sm:block">
                      {card.title}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* HIGH-RES LIGHTBOX MODAL (WHEN ANY SCREEN IS CLICKED)         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeZoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveZoomImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <div 
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col bg-neutral-950 rounded-2xl border border-white/20 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-neutral-900/90 text-white shrink-0">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E84A4A] text-white font-ca-mono text-[10px] font-bold tracking-wider uppercase">
                    {activeZoomImage.num} // {activeZoomImage.tag}
                  </span>
                  <div>
                    <h4 className="font-akira font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                      {activeZoomImage.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs font-ca-mono text-neutral-400">
                      {activeZoomImage.route} • {activeZoomImage.category}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveZoomImage(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-[#E84A4A] hover:text-white text-neutral-300 transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image Preview */}
              <div className="flex-1 overflow-auto p-2 sm:p-4 bg-neutral-950 flex items-center justify-center">
                <img
                  src={activeZoomImage.image}
                  alt={activeZoomImage.alt}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
                />
              </div>

              {/* Lightbox Footer Description */}
              <div className="px-5 py-3 border-t border-white/10 bg-neutral-900/90 text-neutral-300 text-xs font-ca-mono flex items-center justify-between shrink-0">
                <span>{activeZoomImage.description}</span>
                <span className="text-neutral-500 hidden sm:inline">1024 × 697 HI-RES VECTOR MOCKUP</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
