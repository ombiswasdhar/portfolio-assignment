import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import oniCardFront from '../assets/work/oni-card-front.png'
import oniCardBack from '../assets/work/oni-card-back.png'

/**
 * OniCardIsometricAnimation
 * 
 * Recreates the 3D isometric business card shuffle animation matching the Pinterest reference:
 * https://pin.it/3YEE0MTFe
 * 
 * Features:
 * - Precise 3D isometric studio angle (rotateX: 54deg, rotateZ: -38deg)
 * - Both Front & Back cards rendered with realistic 350gsm paper thickness & drop shadows
 * - Automatic seamless shuffle / swap cycle every 3.2s
 * - Interactive cursor-reactive 3D tilt tracking
 * - Smooth cubic-bezier spring physics
 */
export default function OniCardIsometricAnimation({ className = '' }) {
  // isFrontInFront: true when Front card is elevated in foreground, false when Back card is in foreground
  const [isFrontInFront, setIsFrontInFront] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Automatic shuffle cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFrontInFront((prev) => !prev)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Offset coordinates along the isometric diagonal
  // Foreground card: shifted forward & down
  // Background card: shifted backward & up
  const fgX = 38
  const fgY = 32
  const bgX = -38
  const bgY = -32

  return (
    <div
      className={`relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden select-none bg-[#0d0d12] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Ambient background studio lighting */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_50%_40%,#2a1f3d_0%,#0d0d12_75%)]" 
        aria-hidden="true" 
      />

      {/* Subtle corner studio branding labels */}
      <div className="absolute top-3.5 left-4 text-[9px] font-ca-mono tracking-widest text-white/35 uppercase pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#EAB854]" />
        <span>ONI STUDIOS • BRAND IDENTITY</span>
      </div>
      <div className="absolute top-3.5 right-4 text-[9px] font-ca-mono tracking-widest text-white/35 uppercase pointer-events-none">
        350GSM MATTE CARDSTOCK
      </div>
      <div className="absolute bottom-3.5 left-4 text-[9px] font-ca-mono tracking-widest text-white/40 uppercase pointer-events-none flex items-center gap-2">
        <span className="text-[10px] text-amber-400 font-bold">3D SHUFFLE</span>
        <span className="text-white/20">|</span>
        <span className="text-white/30 text-[8px]">{isFrontInFront ? 'FRONT VIEW' : 'BACK VIEW'}</span>
      </div>

      {/* 3D ISOMETRIC STAGE RIG */}
      <motion.div
        className="relative flex items-center justify-center w-[74%] max-w-[360px] aspect-[601/368]"
        animate={{
          rotateX: 54 + (isHovered ? mousePos.y * 14 : 0),
          rotateZ: -38 + (isHovered ? mousePos.x * 14 : 0),
          rotateY: isHovered ? mousePos.x * 10 : 0,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 100 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ============================================================ */}
        {/* CARD A: FRONT (Anime Character + Qi Design Studios) */}
        {/* ============================================================ */}
        <motion.div
          className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
          animate={{
            x: isFrontInFront ? fgX : bgX,
            y: isFrontInFront ? fgY : bgY,
            z: isFrontInFront ? 40 : -10,
            scale: isFrontInFront ? 1 : 0.94,
          }}
          transition={{
            duration: 0.9,
            ease: [0.4, 0.0, 0.2, 1], // Smooth snappy transition
          }}
          style={{
            zIndex: isFrontInFront ? 20 : 10,
            transformStyle: 'preserve-3d',
            boxShadow: isFrontInFront
              ? '0 1px 0 #3b2d4f, 0 2px 0 #281e36, 0 35px 65px -12px rgba(0, 0, 0, 0.9), 0 18px 32px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.15)'
              : '0 1px 0 #281e36, 0 18px 36px -10px rgba(0, 0, 0, 0.75), 0 8px 16px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          }}
        >
          <img
            src={oniCardFront}
            alt="Oni Design Studios Business Card Front"
            className="w-full h-full object-cover pointer-events-none select-none block"
            draggable={false}
          />
          {/* Subtle paper specular lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15 pointer-events-none" />
        </motion.div>

        {/* ============================================================ */}
        {/* CARD B: BACK (Qi Monogram + QR Code + Color Pillars) */}
        {/* ============================================================ */}
        <motion.div
          className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
          animate={{
            x: !isFrontInFront ? fgX : bgX,
            y: !isFrontInFront ? fgY : bgY,
            z: !isFrontInFront ? 40 : -10,
            scale: !isFrontInFront ? 1 : 0.94,
          }}
          transition={{
            duration: 0.9,
            ease: [0.4, 0.0, 0.2, 1], // Smooth snappy transition
          }}
          style={{
            zIndex: !isFrontInFront ? 20 : 10,
            transformStyle: 'preserve-3d',
            boxShadow: !isFrontInFront
              ? '0 1px 0 #3b2d4f, 0 2px 0 #281e36, 0 35px 65px -12px rgba(0, 0, 0, 0.9), 0 18px 32px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.15)'
              : '0 1px 0 #281e36, 0 18px 36px -10px rgba(0, 0, 0, 0.75), 0 8px 16px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          }}
        >
          <img
            src={oniCardBack}
            alt="Oni Design Studios Business Card Back"
            className="w-full h-full object-cover pointer-events-none select-none block"
            draggable={false}
          />
          {/* Subtle paper specular lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15 pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* Manual interactive swap button at bottom right */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsFrontInFront((prev) => !prev)
        }}
        className="absolute bottom-3.5 right-4 z-30 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-[10px] font-ca-mono tracking-wider uppercase text-white/80 border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
      >
        <span>Flip Cards</span>
        <span className="text-amber-400 font-bold">⇄</span>
      </button>
    </div>
  )
}
