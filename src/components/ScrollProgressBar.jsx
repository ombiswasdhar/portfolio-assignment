import React, { useEffect, useState } from 'react'

/**
 * ScrollProgressBar
 * A sleek, high-precision neon scroll tracker along the top of the viewport
 * with ambient red glow.
 */
export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight
      if (scrollTotal <= 0) {
        setScrollProgress(0)
        return
      }
      const currentScroll = window.scrollY
      const progress = Math.min(100, Math.max(0, (currentScroll / scrollTotal) * 100))
      setScrollProgress(progress)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateScrollProgress()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-red-600 via-[#BA1F1F] to-rose-400 shadow-[0_0_12px_rgba(186,31,31,0.85)] transition-all duration-150 ease-out will-change-[width]"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Glow head point at the right tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ff4d4d,0_0_20px_#ba1f1f]" />
      </div>
    </div>
  )
}
