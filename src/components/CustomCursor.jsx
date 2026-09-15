import React, { useEffect, useRef } from 'react'

/**
 * CustomCursor
 * 
 * High-performance, 144Hz smooth custom cursor with an authentic cyberpunk crimson aesthetic.
 * Features:
 * - Instantaneous central red dot
 * - Fluid interpolated (lerp) outer glowing magnetic ring
 * - Interactive morphing & scaling over clickable links, buttons, stickers, and cards
 * - Zero React re-renders during mouse movement (direct RAF ref transformation)
 * - Safely disabled on touch devices (@media pointer: fine)
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse/trackpad)
    if (typeof window === 'undefined') return
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let isHovered = false
    let isMouseDown = false
    let isVisible = false
    let animId = null

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }

      // Check if mouse is hovering an interactive element
      const target = e.target
      const isInteractive = Boolean(
        target &&
        (target.closest('a') ||
         target.closest('button') ||
         target.closest('[role="button"]') ||
         target.closest('.cursor-pointer') ||
         target.closest('input') ||
         target.closest('textarea') ||
         target.closest('.comic-overlay-bubble') ||
         target.closest('.group'))
      )

      if (isInteractive !== isHovered) {
        isHovered = isInteractive
        if (isHovered) {
          ring.classList.add('cursor-ring--hover')
          dot.classList.add('cursor-dot--hover')
        } else {
          ring.classList.remove('cursor-ring--hover')
          dot.classList.remove('cursor-dot--hover')
        }
      }
    }

    const handleMouseDown = () => {
      isMouseDown = true
      ring.classList.add('cursor-ring--click')
      dot.classList.add('cursor-dot--click')
    }

    const handleMouseUp = () => {
      isMouseDown = false
      ring.classList.remove('cursor-ring--click')
      dot.classList.remove('cursor-dot--click')
    }

    const handleMouseLeave = () => {
      isVisible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      isVisible = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    // High-performance animation loop (linear interpolation for smooth trailing)
    const render = () => {
      // Direct instant position for the center dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`

      // Smooth easing (lerp) for the outer trailing ring
      const ease = 0.2
      ringX += (mouseX - ringX) * ease
      ringY += (mouseY - ringY) * ease
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`

      animId = window.requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })

    animId = window.requestAnimationFrame(render)

    return () => {
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
      {/* 1. Fast Central Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 -ml-[4px] -mt-[4px] w-2 h-2 rounded-full bg-[#BA1F1F] shadow-[0_0_10px_#ff4d4d,0_0_20px_#ba1f1f] z-[9999] opacity-0 transition-opacity duration-200 will-change-transform"
      />

      {/* 2. Trailing Interpolated Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 -ml-[18px] -mt-[18px] w-9 h-9 rounded-full border border-red-500/50 bg-red-500/5 backdrop-blur-[0.5px] z-[9998] opacity-0 transition-opacity duration-300 will-change-transform flex items-center justify-center"
      >
        {/* Subtle internal crosshair action accent */}
        <div className="w-1.5 h-1.5 rounded-full border border-red-400/40 opacity-40 scale-75 transition-transform duration-200" />
      </div>
    </>
  )
}
