import React, { useState, useRef } from 'react'
import aboutRightCollage from '../assets/about/about_right_collage.png'
import collagePolaroid from '../assets/about/collage_polaroid_clean.png'

/**
 * AnimatedCollage
 * 
 * Renders the authentic collage with an interactive 3D tilting
 * and swaying Polaroid photo card ("AGE: 21 YEARS").
 * All other collage stickers and graphics remain in their original form.
 */
export default function AnimatedCollage({ className = '' }) {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false, px: 0.5, py: 0.5 })

  // Interactive 3D tilt tracking for the Polaroid card
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    // Calculate subtle 3D tilt angles
    const tiltX = (py - 0.5) * -14
    const tiltY = (px - 0.5) * 14

    setTilt({ x: tiltX, y: tiltY, isHovered: true, px, py })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false, px: 0.5, py: 0.5 })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full aspect-[504/738] select-none rounded-[20px] overflow-hidden ${className}`}
      style={{ perspective: '1000px' }}
      role="region"
      aria-label="About Me collage with interactive Polaroid - Om: Age 21 Years, Graphics Designer"
    >
      {/* ================= BASE COLLAGE GRAPHIC ================= */}
      <img
        src={aboutRightCollage}
        alt="About Me - Om, 21 years old Graphics Designer collage"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-0"
      />

      {/* ================= 3D INTERACTIVE TILTING POLAROID CARD ================= */}
      <div
        className={`absolute z-10 cursor-pointer transition-shadow duration-300 ${
          tilt.isHovered ? '' : 'animate-polaroid-sway'
        }`}
        style={{
          left: '22.62%',
          top: '18.7%',
          width: '63.89%',
          height: '57.18%',
          transformOrigin: '50% 14px',
          transform: tilt.isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.035)`
            : undefined,
          filter: tilt.isHovered
            ? 'drop-shadow(0 24px 45px rgba(0, 0, 0, 0.9))'
            : 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.75))',
          transition: tilt.isHovered
            ? 'transform 0.08s ease-out, filter 0.25s ease'
            : 'transform 0.6s ease-out, filter 0.4s ease',
        }}
        tabIndex={0}
        aria-label="Om's Polaroid Photo: 21 Years Old, Graphics Designer. Move cursor to tilt in 3D."
      >
        <div className="relative w-full h-full">
          <img
            src={collagePolaroid}
            alt="Om - Polaroid photograph: 21 Years Old"
            className="w-full h-full object-contain select-none pointer-events-none"
          />

          {/* Dynamic Specular Sheen Light Reflection across the Glossy Photo Surface */}
          {tilt.isHovered && (
            <div
              className="absolute inset-[8%_3%_3%_3%] rounded-[6px] pointer-events-none mix-blend-overlay transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${(tilt.px || 0.5) * 100}% ${(tilt.py || 0.5) * 100}%, rgba(255,255,255,0.45) 0%, transparent 65%)`,
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  )
}
