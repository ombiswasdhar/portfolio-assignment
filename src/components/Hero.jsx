import React, { useState, useEffect } from 'react'
import ParallaxComponent from './ui/parallax-scrolling'
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

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window
    const x = ((e.clientX / innerWidth) - 0.5) * 16
    const y = ((e.clientY / innerHeight) - 0.5) * 16
    setMousePos({ x, y })
  }

  const bannerScale = Math.max(0.95, 1 - (scrollY / 3000))
  const bannerOpacity = Math.max(0.85, 1 - (scrollY / 4000))

  return (
    <ParallaxComponent
      id="hero"
      title={<>OM<span className="text-[#BA1F1F]">İ</span>'S BRAIN</>}
      topBadge={
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[11px] sm:text-xs tracking-[0.2em] uppercase font-mono text-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          <span className="w-2 h-2 rounded-full bg-[#BA1F1F] animate-pulse" />
          PORTFOLIO // 2026
        </div>
      }
      subtitle={
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-xs sm:text-sm md:text-base font-fredoka font-normal tracking-widest uppercase text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Visual &amp; Product Designer • Coursework Portfolio
          </p>
          <span className="text-[10px] sm:text-xs font-mono text-neutral-300/80 tracking-widest uppercase">
            Scroll to dive into the work ↓
          </span>
        </div>
      }
    >
      <section
        id="hero-showcase"
        aria-label="Portfolio centerpiece showcase"
        onMouseMove={handleMouseMove}
        className="relative w-full bg-[#050507] text-white select-none overflow-hidden pt-8 sm:pt-12 md:pt-16 pb-8"
      >
      {/* 1. Dynamic Parallax Ambient Crimson Glow (tracking cursor) */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(900px circle at calc(50% + ${mousePos.x * 16}px) calc(46% + ${mousePos.y * 16}px), rgba(186, 31, 31, 0.18) 0%, rgba(90, 12, 22, 0.08) 38%, transparent 72%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Secondary Atmospheric Nebula Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[750px] bg-gradient-to-b from-[#BA1F1F]/10 via-[#3a0814]/15 to-transparent blur-[140px] rounded-full pointer-events-none opacity-80"
        aria-hidden="true"
      />

      {/* 3. Cyberpunk Geometric Matrix & Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen select-none"
        style={{
          maskImage: 'radial-gradient(circle at 50% 48%, black 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 48%, black 30%, transparent 78%)',
        }}
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyberGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
              <circle cx="0" cy="0" r="1.2" fill="rgba(255,255,255,0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyberGrid)" />
        </svg>
      </div>

      {/* 4. Analog Film Grain & Paper Noise Texture Overlay */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.15] mix-blend-overlay select-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="heroNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroNoise)" />
      </svg>

      {/* 5. Soft Cinematic Edge Vignette */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.8) 100%)',
        }}
        aria-hidden="true"
      />

      {/* 1440x940 Canvas Container */}
      <div className="relative w-full max-w-[1440px] mx-auto aspect-[1440/940] min-h-[500px] sm:min-h-[580px] md:min-h-[740px] lg:min-h-[860px]">
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

        {/* portfolio - Handwritten cursive script */}
        <div
          className="absolute left-1/2 top-3 sm:top-4 md:top-[3%] -translate-x-1/2 z-20 flex items-center pointer-events-none"
        >
          <span className="font-script text-2xl sm:text-3xl md:text-[34px] font-normal leading-none tracking-wide text-white lowercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-center">
            portfolio
          </span>
        </div>

        {/* Top-Right OM Badge */}
        <div
          className="absolute right-4 sm:right-6 md:right-auto md:left-[92.29%] md:-translate-x-1/2 top-3 sm:top-4 md:top-[3%] z-20 flex items-center"
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
            className="absolute -left-[4%] sm:-left-[5.87%] -top-[14%] sm:-top-[16.36%] w-[17%] sm:w-[14.65%] z-30 group cursor-pointer transition-transform duration-300 ease-out hover:scale-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            title="Smiley sticker"
            style={{
              transform: `translate3d(${mousePos.x * 0.9}px, ${mousePos.y * 0.9}px, 0)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            <img
              src={smiley}
              alt="Smiley sticker"
              className="w-full h-auto object-contain origin-center animate-spin-slow will-change-transform select-none pointer-events-none"
              style={{
                animation: 'spin-slow 8s linear infinite',
                transformOrigin: 'center center',
              }}
            />
          </div>

          {/* 2. Custom Typography: "PORTFOLIO" Vector Art */}
          <div
            className="absolute -left-[3.23%] top-[23.72%] w-[106.41%] h-[52.15%] z-20 pointer-events-none flex items-center justify-center"
          >
            <img
              src={portfolioText}
              alt="PORTFOLIO"
              className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* 3. Center OM Badge (replacing the 'O' in PORTFOLiO) */}
          <div
            className="absolute left-[53.49%] top-[32.11%] w-[11%] md:w-[10.54%] z-25 group cursor-pointer"
            title="OM Logo"
          >
            <img
              src={centerLogo}
              alt="OM Center Badge"
              className="w-full h-auto object-contain transition-all duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_24px_rgba(186,31,31,0.85)] drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* 4. Crown Doodle (perched on top of the center OM badge) */}
          <div
            className="absolute left-[59.95%] top-[14.93%] w-[10%] md:w-[9.11%] z-30 group cursor-pointer pointer-events-auto"
            title="Crown doodle"
            style={{
              transform: `translate3d(${-mousePos.x * 0.7}px, ${-mousePos.y * 0.7}px, 0)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            <img
              src={crown}
              alt="Crown sticker"
              className="w-full h-auto object-contain animate-float-gentle transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-12 drop-shadow-md"
            />
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

          {/* 6. OM BISWAS Text (bottom-right under banner) */}
          <div
            className="absolute right-0 top-[102%] z-20 pt-1 sm:pt-2 md:pt-3 text-right"
          >
            <span className="font-fredoka font-bold text-base sm:text-xl md:text-[32px] leading-none tracking-normal text-white uppercase whitespace-nowrap">
              OM BISWAS
            </span>
          </div>

        </div>

        {/* ================= DESKTOP BOTTOM ROW (md and up) ================= */}
        <div className="hidden md:flex absolute bottom-4 lg:bottom-6 left-[2.50%] right-[2.50%] items-center justify-between z-20 pointer-events-none">
          {/* Left: Symbiosis Institute of Design */}
          <div className="max-w-[280px]">
            <p className="font-fredoka font-normal text-base lg:text-[20px] leading-snug text-white">
              Symbiosis Institute
              <br />
              of Design
            </p>
          </div>

          {/* Center: Barcode - sized identically to Symbiosis Institute of Design text height */}
          <div className="flex justify-center items-center">
            <img
              src={barcode}
              alt="Barcode"
              className="h-10 lg:h-12 w-auto object-contain filter invert brightness-200 pointer-events-none"
            />
          </div>

          {/* Right: Arrow Monogram Logo */}
          <div className="flex items-center justify-end pointer-events-auto">
            <img
              src={arrowLogo}
              alt="Arrow monogram"
              className="h-10 lg:h-12 w-auto object-contain hover:scale-120 hover:rotate-45 active:scale-95 transition-all duration-300 cursor-pointer"
            />
          </div>
        </div>

        {/* ================= MOBILE BOTTOM ROW (< md) ================= */}
        <div className="md:hidden absolute bottom-3 sm:bottom-4 left-0 right-0 px-3 sm:px-6 z-20 flex items-center justify-between gap-2 pointer-events-none">
          {/* Left: Symbiosis Institute of Design text */}
          <div className="shrink-0 max-w-[130px] sm:max-w-[180px]">
            <p className="font-fredoka font-normal text-[10px] sm:text-xs leading-tight text-neutral-300">
              Symbiosis Institute
              <br />
              of Design
            </p>
          </div>

          {/* Center: Barcode - sized identically to Symbiosis Institute text height */}
          <div className="flex-1 flex justify-center items-center px-1">
            <img
              src={barcode}
              alt="Barcode"
              className="h-6 sm:h-7 w-auto object-contain filter invert brightness-200 pointer-events-none"
            />
          </div>

          {/* Right: Arrow Monogram Logo */}
          <div className="shrink-0 flex items-center justify-end pointer-events-auto">
            <img
              src={arrowLogo}
              alt="Arrow monogram"
              className="h-6 sm:h-7 w-auto object-contain hover:scale-120 hover:rotate-45 active:scale-95 transition-all duration-300 cursor-pointer"
            />
          </div>
        </div>

      </div>

      {/* Symmetrical White Line Divider below barcode with animated scroll down cue */}
      <div className="w-full flex flex-col items-center justify-center mt-2 sm:mt-3 md:mt-4 mb-2 sm:mb-3 md:mb-4">
        <div
          className="w-[88%] sm:w-[75%] md:w-[60.28%] max-w-[868px] h-[1px] bg-white/20"
          aria-hidden="true"
        />
        
        {/* Subtle Animated Scroll Indicator */}
        <a
          href="#about"
          className="group flex flex-col items-center gap-1 mt-2 text-neutral-400 hover:text-white transition-colors duration-300 pointer-events-auto select-none"
          aria-label="Scroll down to About Me section"
        >
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
            Scroll to explore
          </span>
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-scroll-cue text-neutral-400 group-hover:text-[#BA1F1F] transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="7 13 12 18 17 13" />
            <polyline points="7 6 12 11 17 6" />
          </svg>
        </a>
      </div>
    </section>
  </ParallaxComponent>
  )
}
