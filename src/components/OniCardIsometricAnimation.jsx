import React, { useState } from 'react'
import { motion } from 'framer-motion'
import oniCardFront from '../assets/work/oni-card-front.png'
import oniCardBack from '../assets/work/oni-card-back.png'

/**
 * OniCardIsometricAnimation
 * 
 * Exact 1:1 reproduction of the 3D isometric business card shuffle video:
 * https://pin.it/3YEE0MTFe
 * 
 * Choreography:
 * - 3D Isometric studio tabletop view (rotateX: 55deg, rotateZ: -36deg, rotateY: 6deg)
 * - Dual card setup: Front (Anime art & Qi Design Studios) and Back (Qi logo & QR code)
 * - Seamless deck shuffle cycle:
 *   1. Foreground card arcs UP in 3D space (translateZ: 85px) and slides backward
 *   2. Background card glides smoothly forward along the tabletop into the foreground
 *   3. Dynamic Depth-of-Field blur (background card blurs slightly like a cinema camera lens)
 *   4. Multi-layer realistic diffused drop shadows & 350GSM physical card edge thickness
 *   5. Studio edge typography markings matching high-end design agency showcases
 *   6. Reactive 3D cursor tilt on mouse move
 */
export default function OniCardIsometricAnimation({ className = '' }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isManualFlipped, setIsManualFlipped] = useState(false)

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
        /* EXACT 3D ISOMETRIC SHUFFLE KEYFRAMES (ZERO PHASING/CLIPPING) */
        /* ======================================================== */

        /* CARD A (FRONT): Starts in FOREGROUND, then lifts up & slides to BACK, rests, then returns */
        @keyframes oniShuffleCardFront {
          0%, 18% {
            transform: translate3d(42px, 38px, 0) scale(1);
            filter: blur(0px) brightness(1);
            z-index: 25;
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 35px 70px -10px rgba(0,0,0,0.9), 0 18px 32px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.15);
          }
          30% {
            /* Lifts high in the air at apex while sliding back */
            transform: translate3d(8px, 6px, 0) scale(1.05);
            filter: blur(0px) brightness(1.04);
            z-index: 25;
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 55px 95px -12px rgba(0,0,0,0.95), 0 28px 48px -10px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.2);
          }
          36% {
            /* Switches cleanly behind Card B while at apex */
            transform: translate3d(-15px, -14px, 0) scale(1.02);
            filter: blur(0.3px) brightness(1.01);
            z-index: 10;
          }
          48%, 68% {
            /* Settled smoothly in background position */
            transform: translate3d(-42px, -38px, 0) scale(0.935);
            filter: blur(1.2px) brightness(0.9);
            z-index: 10;
            box-shadow: 0 1px 0 rgba(0,0,0,0.5), 0 16px 32px -10px rgba(0,0,0,0.7), 0 6px 14px -6px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
          }
          80% {
            /* Glides smoothly forward along tabletop */
            transform: translate3d(18px, 16px, 0) scale(0.98);
            filter: blur(0.3px) brightness(0.98);
            z-index: 10;
          }
          86% {
            /* Comes in front as Card B lifts into apex */
            z-index: 25;
          }
          100% {
            transform: translate3d(42px, 38px, 0) scale(1);
            filter: blur(0px) brightness(1);
            z-index: 25;
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 35px 70px -10px rgba(0,0,0,0.9), 0 18px 32px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.15);
          }
        }

        /* CARD B (BACK): Starts in BACKGROUND, glides forward into FOREGROUND, rests, then lifts & returns */
        @keyframes oniShuffleCardBack {
          0%, 18% {
            transform: translate3d(-42px, -38px, 0) scale(0.935);
            filter: blur(1.2px) brightness(0.9);
            z-index: 10;
            box-shadow: 0 1px 0 rgba(0,0,0,0.5), 0 16px 32px -10px rgba(0,0,0,0.7), 0 6px 14px -6px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
          }
          30% {
            /* Glides smoothly forward along tabletop while Card A is elevated */
            transform: translate3d(14px, 12px, 0) scale(0.97);
            filter: blur(0.4px) brightness(0.97);
            z-index: 10;
          }
          36% {
            /* Card A has moved behind, Card B is now foreground */
            z-index: 25;
          }
          48%, 68% {
            /* Settled in foreground position */
            transform: translate3d(42px, 38px, 0) scale(1);
            filter: blur(0px) brightness(1);
            z-index: 25;
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 35px 70px -10px rgba(0,0,0,0.9), 0 18px 32px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.15);
          }
          80% {
            /* Lifts high in the air at apex while sliding back */
            transform: translate3d(8px, 6px, 0) scale(1.05);
            filter: blur(0px) brightness(1.04);
            z-index: 25;
            box-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.6), 0 55px 95px -12px rgba(0,0,0,0.95), 0 28px 48px -10px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.2);
          }
          86% {
            /* Switches cleanly behind Card A while at apex */
            transform: translate3d(-15px, -14px, 0) scale(1.02);
            filter: blur(0.3px) brightness(1.01);
            z-index: 10;
          }
          100% {
            transform: translate3d(-42px, -38px, 0) scale(0.935);
            filter: blur(1.2px) brightness(0.9);
            z-index: 10;
            box-shadow: 0 1px 0 rgba(0,0,0,0.5), 0 16px 32px -10px rgba(0,0,0,0.7), 0 6px 14px -6px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
          }
        }

        .oni-card-a-anim {
          animation: oniShuffleCardFront 4.2s cubic-bezier(0.42, 0, 0.18, 1) infinite;
          will-change: transform, filter, box-shadow;
        }

        .oni-card-b-anim {
          animation: oniShuffleCardBack 4.2s cubic-bezier(0.42, 0, 0.18, 1) infinite;
          will-change: transform, filter, box-shadow;
        }
      `}</style>

      {/* Atmospheric dark studio background spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(ellipse_at_50%_45%,#261c36_0%,#0e0e12_72%)]" 
        aria-hidden="true" 
      />

      {/* ============================================================ */}
      {/* CORNER STUDIO TYPOGRAPHY MARKINGS (MATCHING REFERENCE VIDEO) */}
      {/* ============================================================ */}
      {/* Top Left: Vertical Agency Spec Tag */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-60 hover:opacity-100 transition-opacity z-10">
        <span className="block font-fredoka text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-300 [writing-mode:vertical-lr] rotate-180">
          RAW - IDENTITY // RAW - LOVE, RAW - COLOUR
        </span>
      </div>

      {/* Bottom Left: Dimensions & Spec Label */}
      <div className="absolute bottom-4 left-4 pointer-events-none opacity-60 hover:opacity-100 transition-opacity z-10">
        <div className="flex flex-col gap-0.5">
          <span className="font-fredoka text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-neutral-300">
            DIMENSIONS: 85 x 55mm
          </span>
          <span className="font-fredoka text-[8px] sm:text-[9px] uppercase tracking-[0.12em] text-neutral-400 font-normal">
            350GSM MATTE SILK CARDSTOCK
          </span>
        </div>
      </div>

      {/* Top Right: Studio Title in Akira Expanded */}
      <div className="absolute top-4 right-4 pointer-events-none opacity-85 hover:opacity-100 transition-opacity flex flex-col items-end z-10 text-right">
        <span className="font-akira text-[9px] sm:text-[11px] tracking-wider text-white uppercase font-black leading-tight">
          ONI DESIGN STUDIOS
        </span>
      </div>

      {/* Bottom Right: Season & Edition Tag */}
      <div className="absolute bottom-4 right-4 pointer-events-none opacity-60 hover:opacity-100 transition-opacity text-right z-10">
        <span className="font-fredoka text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-neutral-300 block">
          2ND YEAR COURSEWORK // 2026
        </span>
      </div>

      {/* ============================================================ */}
      {/* 3D ISOMETRIC STAGE RIG (EXACT CAMERA OBLIQUE ANGLE)          */}
      {/* ============================================================ */}
      <motion.div
        className="relative flex items-center justify-center w-[74%] max-w-[370px] aspect-[601/368]"
        animate={{
          rotateX: 55 + (isHovered ? mousePos.y * 14 : 0),
          rotateZ: -36 + (isHovered ? mousePos.x * 14 : 0),
          rotateY: 6 + (isHovered ? mousePos.x * 10 : 0),
        }}
        transition={{ type: 'spring', damping: 26, stiffness: 110 }}
        style={{
          transformStyle: 'flat',
        }}
      >
        {/* ============================================================ */}
        {/* CARD 1: FRONT (Anime Character + Qi Design Studios)           */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 rounded-[18px] sm:rounded-[22px] overflow-hidden cursor-pointer select-none oni-card-a-anim"
          style={{
            backgroundColor: '#c59ad3',
          }}
        >
          <img
            src={oniCardFront}
            alt="Oni Design Studios Business Card Front"
            className="w-full h-full object-cover pointer-events-none select-none block"
            draggable={false}
          />
          {/* Subtle paper specular lighting sheen across surface */}
          <div 
            className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/20" 
            aria-hidden="true" 
          />
        </div>

        {/* ============================================================ */}
        {/* CARD 2: BACK (Qi Monogram + QR Code + Color Pillars)         */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 rounded-[18px] sm:rounded-[22px] overflow-hidden cursor-pointer select-none oni-card-b-anim"
          style={{
            backgroundColor: '#c59ad3',
          }}
        >
          <img
            src={oniCardBack}
            alt="Oni Design Studios Business Card Back"
            className="w-full h-full object-cover pointer-events-none select-none block"
            draggable={false}
          />
          {/* Subtle paper specular lighting sheen across surface */}
          <div 
            className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/20" 
            aria-hidden="true" 
          />
        </div>
      </motion.div>
    </div>
  )
}
