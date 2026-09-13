import React, { useState, useRef } from 'react'
import aboutRightCollage from '../assets/about/about_right_collage.png'
import collagePolaroid from '../assets/about/collage_polaroid_clean.png'
import collageBlueStar from '../assets/about/collage_blue_star.png'
import collageHashtag from '../assets/about/collage_hashtag.png'
import collageMangaBoy from '../assets/about/collage_manga_boy_clean.png'
import ChromeStar from './ChromeStar'

/**
 * AnimatedCollage (Figma Node 391:26 Reconstructed in Code)
 * 
 * Recreates the animated Figma node 391:26 as an interactive, multi-layered
 * canvas featuring:
 * 1. Continuously spinning 32-beam retro crimson & cream sunburst wheel
 * 2. Authentic Polaroid photo card with wooden pin anchor, natural idle sway,
 *    and interactive 3D perspective mouse-tracking tilt with glossy specular sheen
 * 3. Continuous rotating Chrome 4-point sparkle star with dynamic difference-blend
 * 4. Floating manga character sticker with red explosion spikes and chalk crown
 * 5. Pulsing electric blue 12-point starburst
 * 6. Playful wiggling yellow paper hashtag sticker
 * 7. Interactive sunglasses doodle with comic reaction
 */
export default function AnimatedCollage({ className = '' }) {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false })
  const [dealWithIt, setDealWithIt] = useState(false)
  const [fastSpin, setFastSpin] = useState(false)

  // Interactive 3D tilt tracking for the Polaroid card
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0 to 1
    const py = (e.clientY - rect.top) / rect.height // 0 to 1

    // Calculate subtle 3D tilt angles (-7 to +7 deg)
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
      aria-label="Interactive animated collage (Node 391:26) - Om: Age 21 Years, Graphics Designer"
    >
      {/* ================= LAYER 1: BASE COLLAGE BACKGROUND ================= */}
      <img
        src={aboutRightCollage}
        alt="About Me background graphic"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-0"
      />

      {/* ================= LAYER 2: CONTINUOUSLY SPINNING SUNBURST RAYS ================= */}
      <div
        className="absolute rounded-full pointer-events-none select-none animate-spin-rays z-[5]"
        style={{
          width: '96%',
          height: '66%',
          left: '52.5%',
          top: '40.6%',
          background:
            'repeating-conic-gradient(from 0deg, #9e0a1a 0deg 11.25deg, #f5eedc 11.25deg 22.5deg)',
          filter: 'drop-shadow(0 0 25px rgba(158, 10, 26, 0.4))',
          opacity: 0.96,
        }}
        aria-hidden="true"
      />

      {/* ================= LAYER 3: PULSING ELECTRIC BLUE STARBURST ================= */}
      <div
        className="absolute pointer-events-none z-[10] animate-pulse-gentle transition-transform duration-300"
        style={{
          left: '1.98%',
          top: '37.94%',
          width: '55.55%',
          height: '47.42%',
        }}
      >
        <img
          src={collageBlueStar}
          alt=""
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* ================= LAYER 4: 3D INTERACTIVE TILTING POLAROID CARD ================= */}
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

          {/* Interactive Sunglasses Doodle Hotspot */}
          <button
            type="button"
            onClick={() => setDealWithIt((prev) => !prev)}
            onMouseEnter={() => setDealWithIt(true)}
            onMouseLeave={() => setDealWithIt(false)}
            aria-label="Sunglasses anime doodle - Deal with it"
            className="absolute left-[5%] bottom-[4%] w-[32%] h-[24%] rounded-full cursor-pointer z-30 focus:outline-none"
          >
            {dealWithIt && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-white text-[9px] font-fredoka font-semibold rounded-md border border-white/30 shadow-lg whitespace-nowrap animate-bounce pointer-events-none">
                deal with it 😎
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ================= LAYER 5: CONTINUOUS ROTATING CHROME SPARKLE STAR ================= */}
      <div
        className={`absolute z-[30] cursor-pointer transition-all duration-300 ${
          fastSpin ? 'scale-125' : 'hover:scale-115'
        }`}
        style={{
          left: '12.5%',
          top: '18.5%',
          width: '18.5%',
          height: '12.6%',
        }}
        onMouseEnter={() => setFastSpin(true)}
        onMouseLeave={() => setFastSpin(false)}
        role="button"
        tabIndex={0}
        aria-label="Rotating Chrome Sparkle Star"
      >
        <ChromeStar
          className={`w-full h-full animate-chrome-shine ${
            fastSpin ? 'animate-spin' : 'animate-spin-slow'
          }`}
          style={{
            animationDuration: fastSpin ? '2.5s' : '15s',
          }}
        />
      </div>

      {/* ================= LAYER 6: FLOATING MANGA BOY CHARACTER STICKER ================= */}
      <div
        className="absolute z-[35] cursor-pointer animate-sticker-float transition-transform duration-300 hover:scale-112 hover:rotate-[4deg]"
        style={{
          right: '1.5%',
          top: '6.5%',
          width: '30.5%',
          height: '27.1%',
          filter: 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.7))',
        }}
        role="img"
        aria-label="Manga boy character sticker with red burst and chalk crown"
      >
        <img
          src={collageMangaBoy}
          alt=""
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* ================= LAYER 7: PLAYFUL WIGGLING YELLOW HASHTAG STICKER ================= */}
      <div
        className="absolute z-[40] cursor-pointer animate-hashtag-wiggle transition-all duration-500 hover:scale-135 hover:rotate-180"
        style={{
          right: '6.5%',
          bottom: '14.5%',
          width: '16.8%',
          height: '11.5%',
          filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.6))',
        }}
        role="button"
        tabIndex={0}
        aria-label="Yellow paper hashtag sticker"
      >
        <img
          src={collageHashtag}
          alt=""
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      </div>

    </div>
  )
}
