import React, { useState, useRef } from 'react'
import aboutRightCollageClean from '../assets/about/about_right_collage_clean.png'
import collagePolaroid from '../assets/about/collage_polaroid_clean.png'
import collageHashtag from '../assets/about/collage_hashtag.png'

/**
 * AnimatedCollage
 * 
 * @param {boolean} standalone - If true (mobile), renders the clean background graphic.
 *                                If false (desktop), background is transparent so the
 *                                seamless aboutFullFrame underneath shows through without
 *                                any black blocks or overlapping rectangles.
 */
export default function AnimatedCollage({ className = '', standalone = false }) {
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
      className={`relative w-full aspect-[504/738] select-none ${className}`}
      style={{ perspective: '1000px' }}
      role="region"
      aria-label="About Me collage with interactive Polaroid - Om: Age 21 Years, Graphics Designer"
    >
      {/* ================= STANDALONE BACKGROUND (Mobile only, zero black strip) ================= */}
      {standalone && (
        <img
          src={aboutRightCollageClean}
          alt="About Me - Om, 21 years old Graphics Designer collage"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-0"
        />
      )}

      {/* ================= ANIMATED GRAPHICS DESIGNER TAPE TICKER ================= */}
      <div
        className="absolute overflow-hidden z-[12] select-none pointer-events-none flex items-center shadow-[0_2px_8px_rgba(0,0,0,0.45)] border-y border-black/10"
        style={{
          left: '22.8%',
          top: '74.8%',
          width: '61.7%',
          height: '3.65%',
          backgroundColor: '#ffffff',
          backgroundImage: 'radial-gradient(#888888 0.75px, transparent 0.75px)',
          backgroundSize: '3.5px 3.5px',
        }}
        aria-label="Graphics Designer animated tape ticker"
      >
        <div className="animate-tape-marquee flex whitespace-nowrap items-center text-[10px] sm:text-[11px] font-display font-black tracking-wider text-black select-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="px-2.5 flex items-center gap-2">
              <span className="text-black/60 font-normal">/</span>
              <span>GRAPHICS DESIGNER</span>
            </span>
          ))}
        </div>
      </div>

      {/* Yellow Hashtag Sticker overlapping the right end of the tape */}
      <div
        className="absolute z-[14] pointer-events-none"
        style={{
          right: '6.5%',
          bottom: '14.5%',
          width: '16.8%',
          height: '11.5%',
        }}
        aria-hidden="true"
      >
        <img
          src={collageHashtag}
          alt=""
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* ================= 3D INTERACTIVE TILTING POLAROID CARD ================= */}
      <div
        className={`absolute z-[20] cursor-pointer transition-shadow duration-300 ${
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
