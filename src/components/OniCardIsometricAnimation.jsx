import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import oniCardFront from '../assets/work/oni-card-front.png'
import oniCardBack from '../assets/work/oni-card-back.png'
import oniCard2Front from '../assets/work/oni-card-2-front.png'
import oniCard2Back from '../assets/work/oni-card-2-back.png'

/**
 * OniCardIsometricAnimation
 * 
 * Dual-Mode Business Card Showcase for Oni Design Studios:
 * 
 * Edition 01 (Cyberpunk Lilac):
 * - 3D Isometric tabletop setup with smooth non-intersecting side-by-side shuffle.
 * - Distinct, offset trajectory lanes to prevent any edge grazing or collision.
 * 
 * Edition 02 (Cosmic Oni Mask / Om Biswas):
 * - Direct 1:1 reproduction of the 3D floating flip video: https://pin.it/4ShinExsz
 * - Card floats in 3D studio space with realistic depth and specular sheen.
 * - Smoothly flips 180° in 3D around its vertical axis to reveal Om Biswas's artist details & QR code.
 * 
 * Features:
 * - Smooth cinematic transition between the two editions.
 * - Fast auto-cycle every 3.8 seconds, pausing on hover.
 * - Interactive glassmorphism edition toggle pills.
 * - Typography: Studio branding in Akira Expanded, spec tags in Fredoka.
 */
export default function OniCardIsometricAnimation({ className = '' }) {
  const [activeEdition, setActiveEdition] = useState(0) // 0: Lilac Shuffle, 1: Cosmic 3D Flip
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Auto-switch between Edition 01 and Edition 02 smoothly & fast
  useEffect(() => {
    if (isHovered) return undefined
    const timer = setInterval(() => {
      setActiveEdition((prev) => (prev === 0 ? 1 : 0))
    }, 3800)
    return () => clearInterval(timer)
  }, [isHovered])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <div
      className={`relative w-full h-full min-h-[320px] flex items-center justify-center overflow-hidden select-none bg-[#0e0e12] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      <style>{`
        /* ======================================================== */
        /* EDITION 01: NON-COLLIDING SIDE-BY-SIDE ISOMETRIC SHUFFLE  */
        /* (Uses offset parallel lanes so edges NEVER graze/touch)   */
        /* ======================================================== */

        /* CARD 1A (FRONT): Lane 1 (Shifted UP-RIGHT, glides out wide) */
        @keyframes oniShuffleCard1Front {
          0%, 16% {
            /* Rest 1: Foreground stack position */
            transform: translate3d(18px, -4px, 0) scale(1);
            filter: blur(0px) brightness(1);
            z-index: 25;
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 32px 64px -8px rgba(0,0,0,0.85), 0 16px 28px -8px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.15);
          }
          32%, 42% {
            /* Full Side-by-Side: Shifted along Lane 1 with complete clearance */
            transform: translate3d(140px, 75px, 0) scale(0.98);
            filter: blur(0px) brightness(1.02);
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 40px 75px -10px rgba(0,0,0,0.9), 0 20px 36px -8px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.18);
          }
          38% {
            /* Switches to background layer while completely separated */
            z-index: 10;
          }
          54%, 68% {
            /* Rest 2: Settled in background stack position behind Card 1B */
            transform: translate3d(-18px, 16px, 0) scale(0.95);
            filter: blur(0.8px) brightness(0.92);
            z-index: 10;
            box-shadow: 0 1px 0 rgba(0,0,0,0.5), 0 16px 32px -10px rgba(0,0,0,0.7), 0 6px 14px -6px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
          }
          82%, 90% {
            /* Full Side-by-Side: Shifted along Lane 1 again */
            transform: translate3d(140px, 75px, 0) scale(0.98);
            filter: blur(0px) brightness(1.02);
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 40px 75px -10px rgba(0,0,0,0.9), 0 20px 36px -8px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.18);
          }
          86% {
            /* Switches to foreground layer while completely separated */
            z-index: 25;
          }
          100% {
            /* Returned to foreground stack position */
            transform: translate3d(18px, -4px, 0) scale(1);
            filter: blur(0px) brightness(1);
            z-index: 25;
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 32px 64px -8px rgba(0,0,0,0.85), 0 16px 28px -8px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.15);
          }
        }

        /* CARD 1B (BACK): Lane 2 (Shifted DOWN-LEFT, glides out wide) */
        @keyframes oniShuffleCard1Back {
          0%, 16% {
            /* Rest 1: Background stack position */
            transform: translate3d(-18px, 16px, 0) scale(0.95);
            filter: blur(0.8px) brightness(0.92);
            z-index: 10;
            box-shadow: 0 1px 0 rgba(0,0,0,0.5), 0 16px 32px -10px rgba(0,0,0,0.7), 0 6px 14px -6px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
          }
          32%, 42% {
            /* Full Side-by-Side: Shifted along Lane 2 with complete clearance */
            transform: translate3d(-140px, -60px, 0) scale(0.98);
            filter: blur(0px) brightness(1.02);
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 40px 75px -10px rgba(0,0,0,0.9), 0 20px 36px -8px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.18);
          }
          38% {
            /* Switches to foreground layer while completely separated */
            z-index: 25;
          }
          54%, 68% {
            /* Rest 2: Settled in foreground stack position in front of Card 1A */
            transform: translate3d(18px, -4px, 0) scale(1);
            filter: blur(0px) brightness(1);
            z-index: 25;
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 32px 64px -8px rgba(0,0,0,0.85), 0 16px 28px -8px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.15);
          }
          82%, 90% {
            /* Full Side-by-Side: Shifted along Lane 2 again */
            transform: translate3d(-140px, -60px, 0) scale(0.98);
            filter: blur(0px) brightness(1.02);
            box-shadow: 0 1px 0 rgba(255,255,255,0.2), 0 2px 0 rgba(0,0,0,0.6), 0 30px 60px -10px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.12);
          }
          86% {
            /* Switches to background layer while completely separated */
            z-index: 10;
          }
          100% {
            /* Returned to background stack position */
            transform: translate3d(-18px, 16px, 0) scale(0.95);
            filter: blur(0.8px) brightness(0.92);
            z-index: 10;
            box-shadow: 0 1px 0 rgba(0,0,0,0.5), 0 16px 32px -10px rgba(0,0,0,0.7), 0 6px 14px -6px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
          }
        }

        .oni-card-1a-anim {
          animation: oniShuffleCard1Front 2.8s cubic-bezier(0.38, 0, 0.2, 1) infinite;
          will-change: transform, filter, box-shadow;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .oni-card-1b-anim {
          animation: oniShuffleCard1Back 2.8s cubic-bezier(0.38, 0, 0.2, 1) infinite;
          will-change: transform, filter, box-shadow;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* ======================================================== */
        /* EDITION 02: 3D FLOATING DUAL-FACE ROTATION (PIN.IT/4SHINEXSZ) */
        /* ======================================================== */
        @keyframes oniCardFloatFlip {
          0%, 15% {
            /* Front Face Showcase: Natural studio floating tilt */
            transform: rotateY(-8deg) rotateX(8deg) rotateZ(-2deg) translate3d(0, -4px, 0);
          }
          32% {
            /* Arcs forward and begins 180° flip */
            transform: rotateY(80deg) rotateX(4deg) rotateZ(1deg) translate3d(0, -18px, 45px) scale(1.06);
          }
          48%, 65% {
            /* Back Face Showcase: Om Biswas, QR Code & Details */
            transform: rotateY(172deg) rotateX(-6deg) rotateZ(2deg) translate3d(0, 4px, 0);
          }
          82% {
            /* Arcs forward and returns */
            transform: rotateY(80deg) rotateX(4deg) rotateZ(1deg) translate3d(0, -18px, 45px) scale(1.06);
          }
          96%, 100% {
            /* Returned to Front Face */
            transform: rotateY(-8deg) rotateX(8deg) rotateZ(-2deg) translate3d(0, -4px, 0);
          }
        }

        .oni-card-2-flip-anim {
          animation: oniCardFloatFlip 3.0s cubic-bezier(0.42, 0, 0.2, 1) infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* Animated Floor Shadow matching Pin.it/4ShinExsz */
        @keyframes oniFloorShadowAnim {
          0%, 15%, 48%, 65%, 96%, 100% {
            transform: scale(1);
            opacity: 0.55;
          }
          32%, 82% {
            transform: scale(0.82);
            opacity: 0.28;
          }
        }

        .oni-floor-shadow {
          animation: oniFloorShadowAnim 3.0s cubic-bezier(0.42, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Atmospheric dark studio background spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(ellipse_at_50%_45%,#261c36_0%,#0e0e12_72%)]" 
        aria-hidden="true" 
      />

      {/* ============================================================ */}
      {/* DYNAMIC STUDIO CORNER MARKINGS (UPDATING PER EDITION)        */}
      {/* ============================================================ */}
      {/* Top Left: Vertical Agency Spec Tag */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-70 hover:opacity-100 transition-opacity z-20">
        <span className="block font-fredoka text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-300 [writing-mode:vertical-lr] rotate-180">
          {activeEdition === 0
            ? 'RAW - IDENTITY // RAW - LOVE, RAW - COLOUR'
            : 'OM BISWAS // IDENTITY // 2026 PRINT SPEC'}
        </span>
      </div>

      {/* Bottom Left: Dimensions & Stock Spec */}
      <div className="absolute bottom-4 left-4 pointer-events-none opacity-70 hover:opacity-100 transition-opacity z-20">
        <div className="flex flex-col gap-0.5">
          <span className="font-fredoka text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-neutral-300">
            DIMENSIONS: 85 x 55mm
          </span>
          <span className="font-fredoka text-[8px] sm:text-[9px] uppercase tracking-[0.12em] text-neutral-400 font-normal">
            {activeEdition === 0
              ? '350GSM MATTE SILK CARDSTOCK'
              : 'COSMIC VELVET SOFT-TOUCH EMBOSS'}
          </span>
        </div>
      </div>

      {/* Top Right: Studio Branding in Akira Expanded & Edition Indicator */}
      <div className="absolute top-4 right-4 pointer-events-none opacity-90 hover:opacity-100 transition-opacity flex flex-col items-end z-20 text-right">
        <span className="font-akira text-[9px] sm:text-[11px] tracking-wider text-white uppercase font-black leading-tight">
          ONI DESIGN STUDIOS
        </span>
        <span className="font-fredoka text-[8px] sm:text-[9px] tracking-widest text-[#E84A4A] uppercase font-semibold mt-0.5">
          {activeEdition === 0 ? 'EDITION 01 • LILAC DUAL' : 'EDITION 02 • COSMIC ONI'}
        </span>
      </div>

      {/* Bottom Right: Season & Edition Tag */}
      <div className="absolute bottom-4 right-4 pointer-events-none opacity-70 hover:opacity-100 transition-opacity text-right z-20">
        <span className="font-fredoka text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-neutral-300 block">
          {activeEdition === 0 ? '2ND YEAR COURSEWORK // 2026' : 'FEATURED IDENTITY // 2026'}
        </span>
      </div>

      {/* ============================================================ */}
      {/* INTERACTIVE EDITION SELECTOR PILL TABS                       */}
      {/* ============================================================ */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-2xl">
        <button
          type="button"
          onClick={() => setActiveEdition(0)}
          className={`px-3 py-1 rounded-full font-fredoka text-[9px] sm:text-[10px] uppercase tracking-wider transition-all duration-300 ${
            activeEdition === 0
              ? 'bg-[#E84A4A] text-white font-semibold shadow-[0_0_12px_rgba(232,74,74,0.6)]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          01 • Shuffle
        </button>
        <button
          type="button"
          onClick={() => setActiveEdition(1)}
          className={`px-3 py-1 rounded-full font-fredoka text-[9px] sm:text-[10px] uppercase tracking-wider transition-all duration-300 ${
            activeEdition === 1
              ? 'bg-[#E84A4A] text-white font-semibold shadow-[0_0_12px_rgba(232,74,74,0.6)]'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          02 • 3D Flip
        </button>
      </div>

      {/* ============================================================ */}
      {/* MAIN ANIMATED STAGE RIG (SMOOTH CROSSFADE BETWEEN EDITIONS)  */}
      {/* ============================================================ */}
      <AnimatePresence mode="wait">
        {activeEdition === 0 ? (
          /* ========================================================== */
          /* EDITION 01: ISOMETRIC DECK SHUFFLE SHOWCASE                */
          /* ========================================================== */
          <motion.div
            key="edition-01-shuffle"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center w-[60%] sm:w-[64%] max-w-[285px] aspect-[601/368]"
            style={{
              transform: `rotateX(${55 + (isHovered ? mousePos.y * 14 : 0)}deg) rotateZ(${-36 + (isHovered ? mousePos.x * 14 : 0)}deg) rotateY(${6 + (isHovered ? mousePos.x * 10 : 0)}deg)`,
              transformStyle: 'flat',
              transition: 'transform 0.22s ease-out',
            }}
          >
            {/* Card 1A: Front (Anime Character + Qi Design Studios) */}
            <div
              className="absolute inset-0 rounded-[16px] sm:rounded-[20px] overflow-hidden cursor-pointer select-none oni-card-1a-anim"
              style={{
                backgroundColor: '#c59ad3',
              }}
            >
              <img
                src={oniCardFront}
                alt="Oni Design Studios Card 1 Front"
                className="w-full h-full object-cover pointer-events-none select-none block"
                draggable={false}
              />
              <div 
                className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/20" 
                aria-hidden="true" 
              />
            </div>

            {/* Card 1B: Back (Qi Monogram + QR Code) */}
            <div
              className="absolute inset-0 rounded-[16px] sm:rounded-[20px] overflow-hidden cursor-pointer select-none oni-card-1b-anim"
              style={{
                backgroundColor: '#c59ad3',
              }}
            >
              <img
                src={oniCardBack}
                alt="Oni Design Studios Card 1 Back"
                className="w-full h-full object-cover pointer-events-none select-none block"
                draggable={false}
              />
              <div 
                className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/20" 
                aria-hidden="true" 
              />
            </div>
          </motion.div>
        ) : (
          /* ========================================================== */
          /* EDITION 02: 3D FLOATING DUAL-FACE FLIP (PIN.IT/4SHINEXSZ)  */
          /* ========================================================== */
          <motion.div
            key="edition-02-flip"
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center w-[72%] sm:w-[75%] max-w-[320px] aspect-[599/366]"
            style={{
              perspective: 1200,
            }}
          >
            {/* Diffused Floor Shadow beneath the floating card */}
            <div
              className="absolute -bottom-10 w-[78%] h-7 rounded-full bg-black/60 blur-xl pointer-events-none oni-floor-shadow"
              aria-hidden="true"
            />

            {/* 3D Rotating Double-Sided Card Body */}
            <div
              className="relative w-full h-full rounded-[16px] sm:rounded-[20px] cursor-pointer select-none oni-card-2-flip-anim"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* FRONT FACE: Cosmic Oni Mask + Qi Design Studios */}
              <div
                className="absolute inset-0 rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#120f18] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.18)]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)',
                }}
              >
                <img
                  src={oniCard2Front}
                  alt="Oni Design Studios Card 2 Front (Cosmic Mask)"
                  className="w-full h-full object-cover pointer-events-none select-none block"
                  draggable={false}
                />
                {/* Specular sheen across front */}
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
                  transform: 'rotateY(180deg)',
                }}
              >
                <img
                  src={oniCard2Back}
                  alt="Oni Design Studios Card 2 Back (Om Biswas Artist)"
                  className="w-full h-full object-cover pointer-events-none select-none block"
                  draggable={false}
                />
                {/* Specular sheen across back */}
                <div 
                  className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/25 via-transparent to-white/25" 
                  aria-hidden="true" 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
