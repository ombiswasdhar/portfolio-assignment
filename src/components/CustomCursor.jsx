import React, { useEffect, useRef, useState, useCallback } from 'react'
import arrowCursorImg from '../assets/cursor/pink_purple_floral_arrow.png'
import pointerCursorImg from '../assets/cursor/pink_purple_floral_pointer.png'

/**
 * CustomCursor
 * 
 * 1. Cursor Visual: Authentic "Pink and Purple Floral Pattern Cursor" from the user's reference image:
 *    - Default state: Floral Arrow Cursor with hot pink / deep purple split and ornamental damask floral vine flourish
 *    - Hover state: Floral Hand Pointer with pointing index finger for interactive elements
 *    - High performance: Instantaneous 144Hz direct RAF translate3d updates
 * 
 * 2. Click Animation: Exact replica of the "wavy" burst click effect from https://jackiezhang.co.za/:
 *    - 8 radiating squiggly wavy bezier paths (M ... Q ... T ...)
 *    - 0.7s duration with outward travel, strokeDashoffset expansion, strokeWidth taper, and subtle burst rotation
 *    - Dual-tone gradient stroke in matching vibrant pink (#ff2a85) and royal purple (#9333ea)
 */

// 8 radiating directions matching Jackie Zhang's wavy starburst (every 45 degrees)
const WAVY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
const EFFECT_SIZE = 85
const HALF_SIZE = EFFECT_SIZE / 2
const INNER_OFFSET = EFFECT_SIZE * 0.1
const OUTER_OFFSET = EFFECT_SIZE * 0.52
const WAVE_AMPLITUDE = EFFECT_SIZE * 0.06

// Pre-compute 8 wavy paths matching M ${u} ${d} Q ${qx} ${qy} ${m} ${h} T ${f} ${p}
const WAVY_PATHS = WAVY_ANGLES.map((deg) => {
  const rad = (deg * Math.PI) / 180
  const u = HALF_SIZE + INNER_OFFSET * Math.cos(rad)
  const d = HALF_SIZE - INNER_OFFSET * Math.sin(rad)
  const f = HALF_SIZE + OUTER_OFFSET * Math.cos(rad)
  const p = HALF_SIZE - OUTER_OFFSET * Math.sin(rad)
  const m = (u + f) / 2
  const h = (d + p) / 2
  const normalAngle = rad + Math.PI / 2
  const qx = m + WAVE_AMPLITUDE * Math.cos(normalAngle)
  const qy = h - WAVE_AMPLITUDE * Math.sin(normalAngle)
  return `M ${u.toFixed(1)} ${d.toFixed(1)} Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${m.toFixed(1)} ${h.toFixed(1)} T ${f.toFixed(1)} ${p.toFixed(1)}`
})

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const arrowImgRef = useRef(null)
  const pointerImgRef = useRef(null)
  const [bursts, setBursts] = useState([])

  const removeBurst = useCallback((id) => {
    setBursts((prev) => prev.filter((b) => b.id !== id))
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const cursor = cursorRef.current
    const arrowImg = arrowImgRef.current
    const pointerImg = pointerImgRef.current
    if (!cursor) return

    let mouseX = -200
    let mouseY = -200
    let isHovered = false
    let isMouseDown = false
    let isVisible = false
    let animId = null

    // Mark active on first mouse movement
    const enableCustomCursor = () => {
      if (!document.body.classList.contains('custom-cursor-enabled')) {
        document.body.classList.add('custom-cursor-enabled')
      }
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        cursor.style.opacity = '1'
        enableCustomCursor()
      }

      // Detect interactive clickable elements
      const target = e.target
      const interactive = Boolean(
        target &&
        (target.closest('a') ||
         target.closest('button') ||
         target.closest('[role="button"]') ||
         target.closest('.cursor-pointer') ||
         target.closest('input') ||
         target.closest('textarea') ||
         target.closest('select') ||
         target.closest('label') ||
         target.closest('summary') ||
         target.closest('[data-clickable]') ||
         target.closest('.group') ||
         target.closest('.rcard') ||
         target.closest('.comic-overlay-bubble'))
      )

      if (interactive !== isHovered) {
        isHovered = interactive
        if (arrowImg && pointerImg) {
          if (isHovered) {
            arrowImg.style.opacity = '0'
            pointerImg.style.opacity = '1'
            cursor.dataset.type = 'pointer'
          } else {
            arrowImg.style.opacity = '1'
            pointerImg.style.opacity = '0'
            cursor.dataset.type = 'arrow'
          }
        }
      }
    }

    const handleMouseDown = (e) => {
      isMouseDown = true

      // Spawn Jackie Zhang wavy click burst at exact click position
      const newBurst = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        x: e.clientX,
        y: e.clientY,
      }
      setBursts((prev) => [...prev.slice(-12), newBurst])
    }

    const handleMouseUp = () => {
      isMouseDown = false
    }

    const handleMouseLeave = () => {
      isVisible = false
      cursor.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      isVisible = true
      cursor.style.opacity = '1'
      enableCustomCursor()
    }

    // High performance RAF loop
    const render = () => {
      if (isVisible) {
        // Arrow tip hotspot is at (-2px, -1px)
        // Hand pointer index fingertip hotspot is at (-11px, -1px)
        const offsetX = cursor.dataset.type === 'pointer' ? 11 : 2
        const offsetY = 1
        const scale = isMouseDown ? 'scale(0.88)' : 'scale(1)'
        cursor.style.transform = `translate3d(${mouseX - offsetX}px, ${mouseY - offsetY}px, 0) ${scale}`
      }
      animId = window.requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })

    animId = window.requestAnimationFrame(render)

    return () => {
      document.body.classList.remove('custom-cursor-enabled')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (animId) window.cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      {/* 1. Main Custom Cursor (Pink & Purple Floral Pattern) */}
      <div
        ref={cursorRef}
        data-type="arrow"
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999999] opacity-0 will-change-transform select-none"
        style={{
          transition: 'opacity 0.15s ease',
        }}
      >
        {/* Floral Arrow Cursor */}
        <img
          ref={arrowImgRef}
          src={arrowCursorImg}
          alt=""
          className="absolute top-0 left-0 w-[36px] h-[39.6px] object-contain drop-shadow-[0_2px_10px_rgba(147,51,234,0.45)] transition-opacity duration-120"
          style={{ opacity: 1 }}
          draggable="false"
        />

        {/* Floral Pointer Hand Cursor */}
        <img
          ref={pointerImgRef}
          src={pointerCursorImg}
          alt=""
          className="absolute top-0 left-0 w-[33px] h-[44.1px] object-contain drop-shadow-[0_2px_10px_rgba(255,42,133,0.45)] transition-opacity duration-120"
          style={{ opacity: 0 }}
          draggable="false"
        />
      </div>

      {/* 2. Jackie Zhang Wavy Burst Clicking Effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999990] overflow-hidden select-none"
      >
        {bursts.map((burst) => (
          <WavyClickBurst
            key={burst.id}
            id={burst.id}
            x={burst.x}
            y={burst.y}
            onComplete={removeBurst}
          />
        ))}
      </div>
    </>
  )
}

/**
 * Individual Wavy Burst instance reproducing the exact Framer animation from https://jackiezhang.co.za/
 */
function WavyClickBurst({ id, x, y, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(id)
    }, 700)
    return () => clearTimeout(timer)
  }, [id, onComplete])

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: `${EFFECT_SIZE}px`,
        height: `${EFFECT_SIZE}px`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <svg
        viewBox={`0 0 ${EFFECT_SIZE} ${EFFECT_SIZE}`}
        className="w-full h-full overflow-visible animate-wavy-burst"
        style={{
          transformOrigin: 'center center',
        }}
      >
        <defs>
          <linearGradient id={`wavy-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a85" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>

        {WAVY_PATHS.map((pathD, idx) => (
          <path
            key={idx}
            d={pathD}
            stroke={`url(#wavy-grad-${id})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            className="animate-wavy-stroke"
          />
        ))}
      </svg>
    </div>
  )
}
