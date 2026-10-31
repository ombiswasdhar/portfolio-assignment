import React, { useState, useEffect, useRef } from 'react'
import oniCardFront from '../assets/work/oni-card-front.png'
import oniCardBack from '../assets/work/oni-card-back.png'
import oniCard2Front from '../assets/work/oni-card-2-front.png'
import oniCard2Back from '../assets/work/oni-card-2-back.png'

/**
 * OniCardIsometricAnimation
 * 
 * High-performance, 60fps GPU-accelerated 3D Showcase for Oni Design Studios.
 * Optimizations:
 * - Direct CSS variables for mouse tracking without triggering React component re-renders.
 * - Hardware-accelerated translate3d animations (zero box-shadow or filter re-rasterization).
 * - Off-screen viewport detection via IntersectionObserver to freeze animations when not visible.
 */
export default function OniCardIsometricAnimation({ className = '', isPaused = false }) {
  const [activeEdition, setActiveEdition] = useState(0) // 0: Lilac Shuffle, 1: Cosmic 3D Flip
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const [animationCycle, setAnimationCycle] = useState(0)
  const containerRef = useRef(null)
  const stageRigRef = useRef(null)
  const wasCardPausedRef = useRef(false)
  const rafRef = useRef(null)

  const isCardPaused = isHovered || isPaused || !isInView

  // Viewport intersection observer to save 100% GPU when off-screen
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { rootMargin: '150px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Restart choreography smoothly after hover ends
  useEffect(() => {
    if (wasCardPausedRef.current && !isCardPaused) {
      setAnimationCycle((cycle) => cycle + 1)
    }
    wasCardPausedRef.current = isCardPaused
  }, [isCardPaused])

  // Auto-switch between Pink Card (Edition 01) and Black Card (Edition 02) only when in view
  useEffect(() => {
    if (!isInView || isHovered) return
    const timer = setInterval(() => {
      setActiveEdition((prev) => (prev === 0 ? 1 : 0))
    }, 4000)
    return () => clearInterval(timer)
  }, [isInView, isHovered])

  // Direct CSS variable mouse tracking - ZERO React re-renders on mousemove
  const handleMouseMove = (e) => {
    if (activeEdition !== 0 || !stageRigRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (stageRigRef.current) {
        stageRigRef.current.style.setProperty('--mx', x.toFixed(3))
        stageRigRef.current.style.setProperty('--my', y.toFixed(3))
      }
    })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (stageRigRef.current) {
      stageRigRef.current.style.setProperty('--mx', '0')
      stageRigRef.current.style.setProperty('--my', '0')
    }
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[320px] flex items-center justify-center overflow-hidden select-none bg-[#0e0e12] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      <style>{`
        /* ======================================================== */
        /* EDITION 01: HARDWARE-ACCELERATED ISOMETRIC SHUFFLE       */
        /* (Pure translate3d transforms for locked 60/120fps)       */
        /* ======================================================== */

        @keyframes oniShuffleCard1Front {
          0%, 16% {
            transform: translate3d(18px, -4px, 0) scale(1);
            z-index: 25;
            opacity: 1;
          }
          32%, 42% {
            transform: translate3d(135px, 72px, 0) scale(0.98);
            z-index: 25;
            opacity: 1;
          }
          43% {
            z-index: 10;
          }
          54%, 68% {
            transform: translate3d(-18px, 16px, 0) scale(0.95);
            z-index: 10;
            opacity: 0.92;
          }
          82%, 90% {
            transform: translate3d(135px, 72px, 0) scale(0.98);
            z-index: 10;
            opacity: 1;
          }
          91% {
            z-index: 25;
          }
          100% {
            transform: translate3d(18px, -4px, 0) scale(1);
            z-index: 25;
            opacity: 1;
          }
        }

        @keyframes oniShuffleCard1Back {
          0%, 16% {
            transform: translate3d(-18px, 16px, 0) scale(0.95);
            z-index: 10;
            opacity: 0.92;
          }
          32%, 42% {
            transform: translate3d(-135px, -58px, 0) scale(0.98);
            z-index: 10;
            opacity: 1;
          }
          43% {
            z-index: 25;
          }
          54%, 68% {
            transform: translate3d(18px, -4px, 0) scale(1);
            z-index: 25;
            opacity: 1;
          }
          82%, 90% {
            transform: translate3d(-135px, -58px, 0) scale(0.98);
            z-index: 25;
            opacity: 1;
          }
          91% {
            z-index: 10;
          }
          100% {
            transform: translate3d(-18px, 16px, 0) scale(0.95);
            z-index: 10;
            opacity: 0.92;
          }
        }

        .oni-card-1a-anim {
          animation: oniShuffleCard1Front 4.8s cubic-bezier(0.38, 0, 0.2, 1) infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .oni-card-1b-anim {
          animation: oniShuffleCard1Back 4.8s cubic-bezier(0.38, 0, 0.2, 1) infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* ======================================================== */
        /* EDITION 02: 3D FLOATING DUAL-FACE ROTATION               */
        /* ======================================================== */
        @keyframes oniCardFloatFlip {
          0%, 15% {
            transform: rotateY(-8deg) rotateX(8deg) rotateZ(-2deg) translate3d(0, -4px, 0);
          }
          32% {
            transform: rotateY(80deg) rotateX(4deg) rotateZ(1deg) translate3d(0, -18px, 45px) scale(1.06);
          }
          48%, 65% {
            transform: rotateY(172deg) rotateX(-6deg) rotateZ(2deg) translate3d(0, 4px, 0);
          }
          82% {
            transform: rotateY(80deg) rotateX(4deg) rotateZ(1deg) translate3d(0, -18px, 45px) scale(1.06);
          }
          96%, 100% {
            transform: rotateY(-8deg) rotateX(8deg) rotateZ(-2deg) translate3d(0, -4px, 0);
          }
        }

        .oni-card-2-flip-anim {
          animation: oniCardFloatFlip 5.8s cubic-bezier(0.42, 0, 0.2, 1) infinite;
          transform-style: preserve-3d;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        @keyframes oniFloorShadowAnim {
          0%, 15%, 48%, 65%, 96%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.55;
          }
          32%, 82% {
            transform: translate3d(0, 0, 0) scale(0.82);
            opacity: 0.28;
          }
        }

        .oni-floor-shadow {
          animation: oniFloorShadowAnim 5.8s cubic-bezier(0.42, 0, 0.2, 1) infinite;
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
        }
      `}</style>

      {/* Atmospheric dark studio background spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(ellipse_at_50%_45%,#261c36_0%,#0e0e12_72%)]" 
        aria-hidden="true" 
      />

      {/* Top Left: Studio Spec Tag */}
      <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 pointer-events-none z-20 flex flex-col items-start">
        <span className="font-fredoka text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-neutral-300 font-medium transition-all duration-300">
          {activeEdition === 0 ? 'RAW IDENTITY' : 'OM BISWAS'}
        </span>
        <span className="font-fredoka text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.12em] text-neutral-400 font-normal transition-all duration-300">
          {activeEdition === 0 ? 'CONCEPT SPEC' : 'ARTIST IDENTITY'}
        </span>
      </div>

      {/* Top Right: Studio Branding */}
      <div className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 pointer-events-none text-right z-20">
        <span className="font-akira font-black text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/90 block">
          ONI STUDIOS
        </span>
        <span className="font-fredoka text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.14em] text-[#FF6584] font-semibold block transition-all duration-300">
          {activeEdition === 0 ? 'EDITION 01 // LILAC' : 'EDITION 02 // 3D FLIP'}
        </span>
      </div>

      {/* Bottom Left: Dimensions & Stock Spec */}
      <div className="absolute bottom-3 sm:bottom-4 left-3.5 sm:left-4 pointer-events-none z-20">
        <div className="flex flex-col gap-0.5 max-w-[120px] sm:max-w-[150px]">
          <span className="font-fredoka text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-neutral-400 font-medium">
            85 x 55mm
          </span>
          <span className="font-fredoka text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.12em] text-neutral-500 font-normal truncate transition-all duration-300">
            {activeEdition === 0 ? '350GSM MATTE SILK' : 'VELVET SOFT-TOUCH'}
          </span>
        </div>
      </div>

      {/* Bottom Right: Season & Edition Tag */}
      <div className="absolute bottom-3 sm:bottom-4 right-3.5 sm:right-4 pointer-events-none text-right z-20">
        <span className="font-fredoka text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-neutral-400 block transition-all duration-300">
          {activeEdition === 0 ? '2ND YEAR // 2026' : 'FEATURED // 2026'}
        </span>
        <span className="font-fredoka text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.12em] text-neutral-500 block transition-all duration-300">
          PRINT PRODUCTION
        </span>
      </div>

      {/* MAIN STAGE RIG */}
      <div key={animationCycle} className="relative w-full h-full flex items-center justify-center -translate-y-2 sm:-translate-y-3">
        {/* EDITION 01: ISOMETRIC DECK SHUFFLE SHOWCASE */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
            activeEdition === 0
              ? 'opacity-100 scale-100 pointer-events-auto z-10'
              : 'opacity-0 scale-95 pointer-events-none z-0'
          }`}
        >
          <div
            ref={stageRigRef}
            className="relative flex items-center justify-center w-[60%] sm:w-[64%] max-w-[285px] aspect-[601/368] will-change-transform"
            style={{
              transform: `rotateX(calc(55deg + var(--my, 0) * 12deg)) rotateZ(calc(-36deg + var(--mx, 0) * 12deg)) rotateY(calc(6deg + var(--mx, 0) * 8deg))`,
              transformStyle: 'flat',
              transition: 'transform 0.12s ease-out',
            }}
          >
            {/* Card 1A: Front */}
            <div
              className="absolute inset-0 rounded-[16px] sm:rounded-[20px] overflow-hidden cursor-pointer select-none oni-card-1a-anim shadow-[0_20px_45px_-8px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.15)]"
              style={{
                backgroundColor: '#c59ad3',
                animationPlayState: activeEdition !== 0 || isCardPaused ? 'paused' : 'running',
              }}
            >
              <img
                src={oniCardFront}
                alt="Oni Design Studios Card 1 Front"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover pointer-events-none select-none block"
                draggable={false}
              />
              <div 
                className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/20" 
                aria-hidden="true" 
              />
            </div>

            {/* Card 1B: Back */}
            <div
              className="absolute inset-0 rounded-[16px] sm:rounded-[20px] overflow-hidden cursor-pointer select-none oni-card-1b-anim shadow-[0_20px_45px_-8px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.15)]"
              style={{
                backgroundColor: '#c59ad3',
                animationPlayState: activeEdition !== 0 || isCardPaused ? 'paused' : 'running',
              }}
            >
              <img
                src={oniCardBack}
                alt="Oni Design Studios Card 1 Back"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover pointer-events-none select-none block"
                draggable={false}
              />
              <div 
                className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/20" 
                aria-hidden="true" 
              />
            </div>
          </div>
        </div>

        {/* EDITION 02: 3D FLOATING DUAL-FACE FLIP */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
            activeEdition === 1
              ? 'opacity-100 scale-100 pointer-events-auto z-10'
              : 'opacity-0 scale-95 pointer-events-none z-0'
          }`}
        >
          <div
            className="relative flex items-center justify-center w-[72%] sm:w-[75%] max-w-[320px] aspect-[599/366]"
            style={{
              perspective: 1200,
            }}
          >
            {/* Diffused Floor Shadow beneath the floating card */}
            <div
              className="absolute -bottom-10 w-[78%] h-7 rounded-full bg-black/60 blur-xl pointer-events-none oni-floor-shadow"
              style={{
                animationPlayState: activeEdition !== 1 || isCardPaused ? 'paused' : 'running',
              }}
              aria-hidden="true"
            />

            {/* 3D Rotating Double-Sided Card Body */}
            <div
              className="relative w-full h-full rounded-[16px] sm:rounded-[20px] cursor-pointer select-none oni-card-2-flip-anim"
              style={{
                transformStyle: 'preserve-3d',
                animationPlayState: activeEdition !== 1 || isCardPaused ? 'paused' : 'running',
              }}
            >
              {/* FRONT FACE: Cosmic Oni Mask */}
              <div
                className="absolute inset-0 rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#120f18] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.18)]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0) rotateY(0deg)',
                }}
              >
                <img
                  src={oniCard2Front}
                  alt="Oni Design Studios Card 2 Front (Cosmic Mask)"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover pointer-events-none select-none block"
                  draggable={false}
                />
                <div 
                  className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/25 via-transparent to-white/25" 
                  aria-hidden="true" 
                />
              </div>

              {/* BACK FACE: Om Biswas / Artist / Details & QR Code */}
              <div
                className="absolute inset-0 rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#120f18] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.18)]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0) rotateY(180deg)',
                }}
              >
                <img
                  src={oniCard2Back}
                  alt="Oni Design Studios Card 2 Back (Om Biswas Artist)"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover pointer-events-none select-none block"
                  draggable={false}
                />
                <div 
                  className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/25 via-transparent to-white/25" 
                  aria-hidden="true" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE EDITION CYCLE BUTTON */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setActiveEdition((prev) => (prev === 0 ? 1 : 0))
        }}
        aria-label="Cycle between card editions"
        title="Cycle between Edition 01 and Edition 02"
        className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/85 hover:bg-[#E84A4A] active:scale-90 border border-white/30 hover:border-[#E84A4A] backdrop-blur-md shadow-2xl transition-all duration-300 group cursor-pointer hover:shadow-[0_0_16px_rgba(232,74,74,0.6)]"
      >
        <svg
          className={`w-4 h-4 text-white transition-transform duration-500 ${
            activeEdition === 1 ? 'rotate-180 text-white' : ''
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
      </button>
    </div>
  )
}
