import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import KineticMatrix from '@/components/ui/kinetic-matrix'
import frame41 from '../assets/hero/frame41.png'
import halftone from '../assets/hero/halftone.png'
import portfolioText from '../assets/hero/portfolio_text.svg'
import centerLogo from '../assets/hero/center_logo.svg'
import topLogo from '../assets/hero/top_logo.svg'
import smiley from '../assets/hero/smiley_rendered.png'
import crown from '../assets/hero/crown_rendered.png'
import doodle from '../assets/hero/doodle_rendered.png'
import barcode from '../assets/hero/barcode.png'
import arrowLogo from '../assets/hero/arrowLogo_rendered.png'
import HeroCD from './HeroCD'
import ClickToPlayBadge from './ClickToPlayBadge'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )
  const [arrowPos, setArrowPos] = useState({ x: 0, y: 0, rot: 0, ready: false })
  const heroRef = useRef(null)
  const anchorRef = useRef(null)
  const anchorDocPos = useRef(null)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const updateAnchorDocPos = () => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect()
      anchorDocPos.current = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width || (isDesktop ? 48 : 28),
        height: rect.height || (isDesktop ? 48 : 28),
      }
    }
  }

  const updateArrowPosition = () => {
    if (!anchorDocPos.current) {
      updateAnchorDocPos()
    }
    if (!anchorDocPos.current) return

    const { left, top, width, height } = anchorDocPos.current
    const currentScrollY = window.scrollY

    const dockMarginRight = isDesktop ? 24 : 16
    const dockMarginBottom = isDesktop ? 36 : 24
    const dockX = window.innerWidth - dockMarginRight - width
    const dockY = window.innerHeight - dockMarginBottom - height

    // Progress from 0 (top of page) to 1 (scrolled past 200px)
    const rawProgress = Math.min(1, Math.max(0, currentScrollY / 200))
    // Cubic smoothstep for extra silky ease-in and ease-out
    const p = rawProgress * rawProgress * (3 - 2 * rawProgress)

    // Ensure arrow is always clearly visible on the hero section even on compact viewport heights
    const maxHeroY = window.innerHeight - dockMarginBottom - height
    const heroY = Math.min(top, maxHeroY)

    // Smooth continuous interpolation between hero anchor and fixed corner dock
    const x = left + (dockX - left) * p
    const y = (heroY - currentScrollY) * (1 - p) + dockY * p
    const rot = p * 45

    setArrowPos({ x, y, rot, ready: true })
  }

  useLayoutEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768
      setIsDesktop(desktop)
      updateAnchorDocPos()
      updateArrowPosition()
    }

    updateAnchorDocPos()
    updateArrowPosition()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isDesktop])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          updateArrowPosition()
          ticking = false
        })
        ticking = true
      }
    }

    // Double-check anchor after fonts / layout settles
    const timer = setTimeout(() => {
      updateAnchorDocPos()
      updateArrowPosition()
    }, 120)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isDesktop])

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window
    const x = ((e.clientX / innerWidth) - 0.5) * 16
    const y = ((e.clientY / innerHeight) - 0.5) * 16
    setMousePos({ x, y })
  }

  const bannerScale = Math.max(0.95, 1 - (scrollY / 3000))
  const bannerOpacity = Math.max(0.85, 1 - (scrollY / 4000))

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Hero section"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#050507] text-white select-none overflow-hidden pt-20 sm:pt-24 md:pt-28"
    >
      {/* Background: NedDev Kinetic Matrix */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
        <KineticMatrix
          title=""
          className="w-full h-full bg-[#06070a] [&_header]:hidden [&_main]:hidden"
        />
      </div>

      {/* Cinematic Edge Vignette to blend into section boundaries */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-[1]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(5, 5, 7, 0.75) 100%)',
        }}
        aria-hidden="true"
      />

      {/* 1440x940 Canvas Container */}
      <div className="relative w-full max-w-[1440px] mx-auto aspect-[1440/940] min-h-[500px] sm:min-h-[580px] md:min-h-[740px] lg:min-h-[860px] pointer-events-none">
        {/* Semantic SEO Primary Heading */}
        <h1 className="sr-only">OMİs Brain — Om Biswas Portfolio | Visual &amp; Product Designer</h1>
        
        {/* ================= TOP ROW ================= */}
        {/* 2026 - Akira Expanded font */}
        <div
          className="absolute left-4 sm:left-6 md:left-[2.29%] top-3 sm:top-4 md:top-[3%] z-20 flex items-center"
          title="Year 2026"
        >
          <span className="font-akira font-black text-lg sm:text-2xl md:text-[28px] leading-none tracking-[0.08em] text-white">
            2026
          </span>
        </div>

        {/* brain - Handwritten cursive script */}
        <div
          className="absolute left-1/2 top-3 sm:top-4 md:top-[3%] -translate-x-1/2 z-20 flex items-center pointer-events-none"
        >
          <span className="font-script text-2xl sm:text-3xl md:text-[34px] font-normal leading-none tracking-wide text-white lowercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-center">
            brain
          </span>
        </div>

        {/* Top-Right OM Badge */}
        <div
          className="absolute right-4 sm:right-6 md:right-auto md:left-[92.29%] md:-translate-x-1/2 top-3 sm:top-4 md:top-[3%] z-20 flex items-center pointer-events-auto"
        >
          <img
            src={topLogo}
            alt="Om Biswas Monogram"
            className="w-9 sm:w-12 md:w-[76px] h-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-md"
          />
        </div>

        {/* ================= VERTICAL ACCENT LINES ================= */}
        {/* Line 6 (Left) */}
        <div
          className="absolute left-[2.50%] top-[38.28%] h-[23.14%] w-[1px] bg-white/40 hidden md:block pointer-events-none"
          aria-hidden="true"
        />

        {/* Line 7 (Right) */}
        <div
          className="absolute left-[97.71%] top-[38.28%] h-[23.14%] w-[1px] bg-white/40 hidden md:block pointer-events-none"
          aria-hidden="true"
        />

        {/* ================= CENTERPIECE BANNER ================= */}
        {/* Banner Area: responsive width on mobile, exact Figma coordinate on desktop */}
        <div
          className="absolute left-[4%] sm:left-[6%] md:left-[9.17%] top-[25%] sm:top-[25.5%] md:top-[25.88%] w-[92%] sm:w-[88%] md:w-[81.67%] h-[46%] md:h-[47.75%] z-10"
          style={{
            transform: `perspective(1200px) rotateX(${-mousePos.y * 0.35}deg) rotateY(${mousePos.x * 0.35}deg) scale(${bannerScale})`,
            opacity: bannerOpacity,
            transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
            willChange: 'transform, opacity',
          }}
        >
          {/* Base Rounded Banner (Red background + Lucy anime + Halftone) */}
          <div className="relative w-full h-full rounded-[20px] sm:rounded-[32px] md:rounded-[50px] overflow-hidden bg-[#BA1F1F] shadow-[0_20px_60px_rgba(186,31,31,0.25)]">
            {/* Cyberpunk Lucy Anime Illustration (Left portion) */}
            <img
              src={frame41}
              alt=""
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-auto object-cover object-left pointer-events-none select-none"
            />

            {/* Halftone Dot Overlay */}
            <img
              src={halftone}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-55 pointer-events-none select-none"
            />
          </div>

          {/* ================= BANNER OVERLAYS & STICKERS ================= */}

          {/* 1. Metallic Smiley Sticker (top-left, breaking out of banner) */}
          <div
            className="absolute -left-[4%] sm:-left-[5.87%] -top-[14%] sm:-top-[16.36%] w-[17%] sm:w-[14.65%] z-30 group cursor-pointer transition-transform duration-300 ease-out hover:scale-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] pointer-events-auto"
            title="Smiley sticker"
            style={{
              transform: `translate3d(${mousePos.x * 0.9}px, ${mousePos.y * 0.9}px, 0)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            <img
              src={smiley}
              alt="Smiley sticker"
              className="hero-spin-layer w-full h-auto object-contain origin-center animate-spin-slow select-none pointer-events-none"
              style={{
                animation: 'spin-slow 8s linear infinite',
                transformOrigin: 'center center',
              }}
            />
          </div>

          {/* 1b. Sunflower Instrumental CD Music Player (top-right, opposite corner of smiley) */}
          <HeroCD mousePos={mousePos} />

          {/* 1c. Click to play in Fredoka dotted Nothing font with twirling arrow pointing to CD */}
          <ClickToPlayBadge mousePos={mousePos} />

          {/* 2. Custom Typography: "PORTFOLIO" Vector Art & Center OM Badge */}
          <div
            className="absolute -left-[3.23%] top-[23.72%] w-[106.41%] h-[52.15%] z-20 pointer-events-none flex items-center justify-center"
          >
            {/* Aspect-locked container matching portfolio_text.svg (1262 x 267) */}
            <div className="relative w-full aspect-[1262/267] max-h-full">
              {/* PORTFOLIO typography SVG */}
              <img
                src={portfolioText}
                alt="PORTFOLIO"
                className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] select-none pointer-events-none"
              />

              {/* Center OM Badge (replacing the 'O' in PORTFOLiO, centered between 'F' and 'L') */}
              <div
                className="absolute left-[57.73%] top-[48.69%] -translate-x-1/2 -translate-y-1/2 w-[11.25%] z-25 group cursor-pointer pointer-events-auto"
                title="OM Logo"
              >
                <img
                  src={centerLogo}
                  alt="OM Center Badge"
                  className="w-full h-auto object-contain transition-all duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_24px_rgba(186,31,31,0.85)] drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)] select-none"
                />
              </div>

              {/* Crown Doodle (perched on top of the center OM badge) */}
              <div
                className="absolute left-[62.5%] -top-[16%] w-[9.2%] z-30 group cursor-pointer pointer-events-auto"
                title="Crown doodle"
                style={{
                  transform: `translate3d(${-mousePos.x * 0.7}px, ${-mousePos.y * 0.7}px, 0)`,
                  transition: 'transform 0.2s ease-out',
                }}
              >
                <img
                  src={crown}
                  alt="Crown sticker"
                  className="w-full h-auto object-contain animate-float-gentle transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-12 drop-shadow-md select-none pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* 5. Double Exclamation Action Doodle (above the letter 'L' / 'i') */}
          <div
            className="absolute left-[81.12%] top-[11.66%] w-[7.5%] md:w-[7.24%] z-30 group cursor-pointer pointer-events-auto"
            title="Action marks doodle"
            style={{
              transform: `translate3d(${mousePos.x * 0.6}px, ${-mousePos.y * 0.6}px, 0)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            <img
              src={doodle}
              alt="Action marks doodle"
              className="w-full h-auto object-contain animate-float-reverse transition-transform duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-2 drop-shadow-md"
            />
          </div>

          

        </div>

        {/* ================= DESKTOP BOTTOM ROW (md and up) ================= */}
        <div className="hidden md:flex absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-14 left-[2.50%] right-[2.50%] items-center justify-between z-20 pointer-events-none">
          {/* Left: Symbiosis Institute of Design */}
          <div className="max-w-[280px]">
            <p className="font-fredoka font-normal text-base lg:text-[20px] leading-snug text-white">
              Symbiosis Institute
              <br />
              of Design
            </p>
          </div>

          {/* Center: Barcode - center-aligned horizontally */}
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center pointer-events-none">
            <img
              src={barcode}
              alt="Barcode"
              className="h-10 lg:h-12 w-auto object-contain filter invert brightness-200 pointer-events-none"
            />
          </div>

          {/* Right: OM BISWAS (Opposite Symbiosis Institute of Design) + Arrow Monogram Logo Anchor */}
          <div className="flex items-center justify-end gap-3 lg:gap-4 pointer-events-auto">
            <span className="font-fredoka font-bold text-base lg:text-[20px] leading-snug text-white uppercase whitespace-nowrap">
              OM BISWAS
            </span>
            <div
              ref={isDesktop ? anchorRef : null}
              className="h-10 lg:h-12 w-10 lg:w-12 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ================= MOBILE BOTTOM ROW (< md) ================= */}
        <div className="md:hidden absolute bottom-5 sm:bottom-7 left-0 right-0 px-3 sm:px-6 z-20 flex items-center justify-between gap-2 pointer-events-none">
          {/* Left: Symbiosis Institute of Design text */}
          <div className="shrink-0 max-w-[130px] sm:max-w-[180px]">
            <p className="font-fredoka font-normal text-[10px] sm:text-xs leading-tight text-neutral-300">
              Symbiosis Institute
              <br />
              of Design
            </p>
          </div>

          {/* Center: Barcode - center-aligned horizontally */}
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center pointer-events-none">
            <img
              src={barcode}
              alt="Barcode"
              className="h-6 sm:h-7 w-auto object-contain filter invert brightness-200 pointer-events-none"
            />
          </div>

          {/* Right: OM BISWAS + Arrow Monogram Logo Anchor */}
          <div className="shrink-0 flex items-center justify-end gap-2 pointer-events-auto">
            <span className="font-fredoka font-bold text-[10px] sm:text-xs leading-tight text-white uppercase whitespace-nowrap">
              OM BISWAS
            </span>
            <div
              ref={!isDesktop ? anchorRef : null}
              className="h-6 sm:h-7 w-6 sm:w-7 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

      </div>

      {/* Symmetrical White Line Divider below barcode */}
      <div className="w-full flex flex-col items-center justify-center mt-2 sm:mt-3 md:mt-4 mb-2 sm:mb-3 md:mb-4">
        <div
          className="w-[88%] sm:w-[75%] md:w-[60.28%] max-w-[868px] h-[1px] bg-white/20"
          aria-hidden="true"
        />
      </div>

      {/* Floating Back-to-Top Arrow: pure white arrow, smoothly turns up and fixes into place */}
      <button
        onClick={scrollToTop}
        title="Scroll to top"
        aria-label="Scroll to top"
        className="fixed left-0 top-0 z-50 p-2 -m-2 bg-transparent border-0 cursor-pointer pointer-events-auto select-none flex items-center justify-center focus:outline-none"
        style={{
          transform: `translate3d(${arrowPos.x}px, ${arrowPos.y}px, 0)`,
          willChange: 'transform',
          opacity: arrowPos.ready ? 1 : 0,
          transition: 'opacity 0.2s ease-out',
        }}
      >
        <img
          src={arrowLogo}
          alt="Scroll to top"
          style={{
            transform: `rotate(${arrowPos.rot}deg)`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out',
          }}
          className={`${
            isDesktop ? 'h-10 lg:h-12' : 'h-6 sm:h-7'
          } w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_0_22px_rgba(186,31,31,1)] hover:brightness-125 transition-[filter,transform] duration-200 hover:scale-115 active:scale-95 pointer-events-none`}
        />
      </button>
  </section>
  )
}
