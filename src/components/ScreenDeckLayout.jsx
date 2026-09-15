import React, { useState, useEffect, useRef, useCallback } from 'react'

const SCREEN_IDS = ['hero', 'about', 'skills', 'cv']
const SCREEN_TITLES = ['HERO', 'ABOUT ME', 'SKILL SET', 'CURRICULUM VITAE']

/**
 * ScreenDeckLayout
 * 
 * Orchestrates the portfolio screens into:
 * 1. Deck View: A 3D physical card deck with magnetic screen transitions,
 *    keyboard shortcuts (↑/↓), mouse wheel gestures, and touch swipe.
 * 2. Free Scroll: A continuous vertical stream with 3D stacking depth.
 */
export default function ScreenDeckLayout({
  children,
  activeHash = '',
  onScreenChange = () => {},
}) {
  const [activeScreen, setActiveScreen] = useState(0)
  const [scrollMode, setScrollMode] = useState('deck') // 'deck' | 'free'
  const touchStartY = useRef(0)
  const lastWheelTime = useRef(0)
  const containerRef = useRef(null)

  // Screen transition handler
  const goToScreen = useCallback((targetIndex, updateHash = true) => {
    const nextIdx = Math.max(0, Math.min(SCREEN_IDS.length - 1, targetIndex))
    setActiveScreen(nextIdx)
    onScreenChange(nextIdx, SCREEN_IDS[nextIdx])

    const targetId = SCREEN_IDS[nextIdx]
    if (updateHash) {
      window.history.replaceState(null, '', targetId === 'hero' ? '/' : `/#${targetId}`)
    }
    window.dispatchEvent(new CustomEvent('deck-screen-change', {
      detail: { screenId: targetId, screenIndex: nextIdx, scrollMode }
    }))

    if (scrollMode === 'free') {
      const el = document.getElementById(SCREEN_IDS[nextIdx])
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [onScreenChange, scrollMode])

  // Map hash to screen index
  const getIndexFromHash = useCallback((hash) => {
    const clean = hash.replace('#', '').toLowerCase()
    const idx = SCREEN_IDS.indexOf(clean)
    return idx >= 0 ? idx : 0
  }, [])

  // Sync hash from URL if changed
  useEffect(() => {
    if (activeHash) {
      const targetIdx = getIndexFromHash(activeHash)
      goToScreen(targetIdx, false)
    }
  }, [activeHash, getIndexFromHash, goToScreen])

  // Listen to navigation events from Nav component
  useEffect(() => {
    const handleNavScreenChange = (e) => {
      const screenId = e.detail?.screenId
      if (screenId) {
        const targetIdx = SCREEN_IDS.indexOf(screenId === 'home' ? 'hero' : screenId)
        if (targetIdx >= 0) {
          goToScreen(targetIdx, false)
        }
      }
    }

    window.addEventListener('nav-screen-change', handleNavScreenChange)
    return () => window.removeEventListener('nav-screen-change', handleNavScreenChange)
  }, [goToScreen])

  // Keyboard navigation for Deck View
  useEffect(() => {
    if (scrollMode !== 'deck') return

    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault()
        goToScreen(activeScreen + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault()
        goToScreen(activeScreen - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goToScreen(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goToScreen(SCREEN_IDS.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollMode, activeScreen, goToScreen])

  // Mouse wheel gesture handler for Deck View
  useEffect(() => {
    if (scrollMode !== 'deck') return

    const handleWheel = (e) => {
      // Check if user is scrolling inside an element with internal scroll
      const target = e.target
      const scrollableParent = target.closest('.allow-internal-scroll')
      if (scrollableParent && scrollableParent.scrollHeight > scrollableParent.clientHeight) {
        const atTop = scrollableParent.scrollTop <= 0
        const atBottom = scrollableParent.scrollTop + scrollableParent.clientHeight >= scrollableParent.scrollHeight - 5
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          return // Let inner container scroll
        }
      }

      const now = Date.now()
      // Debounce wheel events (450ms lockout for buttery discrete screen transitions)
      if (now - lastWheelTime.current < 450) {
        e.preventDefault()
        return
      }

      const threshold = 25
      if (Math.abs(e.deltaY) > threshold) {
        e.preventDefault()
        lastWheelTime.current = now

        if (e.deltaY > 0) {
          goToScreen(activeScreen + 1)
        } else {
          goToScreen(activeScreen - 1)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [scrollMode, activeScreen, goToScreen])

  // Touch swipe gestures for Deck View (Mobile & Tablet)
  const handleTouchStart = (e) => {
    if (scrollMode !== 'deck') return
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (scrollMode !== 'deck') return
    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY

    if (Math.abs(deltaY) > 45) {
      if (deltaY > 0) {
        // Swipe Up -> Next screen
        goToScreen(activeScreen + 1)
      } else {
        // Swipe Down -> Prev screen
        goToScreen(activeScreen - 1)
      }
    }
  }

  // Free scroll spy to keep HUD synchronized
  useEffect(() => {
    if (scrollMode !== 'free') return

    const handleScroll = () => {
      const scrollY = window.scrollY + 350
      for (let i = SCREEN_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SCREEN_IDS[i])
        if (el && el.offsetTop <= scrollY) {
          if (activeScreen !== i) {
            setActiveScreen(i)
            onScreenChange(i, SCREEN_IDS[i])
          }
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollMode, activeScreen, onScreenChange])

  // Toggle between Deck View and Free Scroll
  const toggleMode = useCallback(() => {
    const nextMode = scrollMode === 'deck' ? 'free' : 'deck'
    setScrollMode(nextMode)
    window.dispatchEvent(new CustomEvent('deck-screen-change', {
      detail: { screenId: SCREEN_IDS[activeScreen], screenIndex: activeScreen, scrollMode: nextMode }
    }))

    // Smooth transition between modes
    setTimeout(() => {
      const el = document.getElementById(SCREEN_IDS[activeScreen])
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }, [scrollMode, activeScreen])

  // Listen to toggle mode from Nav component
  useEffect(() => {
    const handleNavToggleMode = () => toggleMode()
    window.addEventListener('nav-toggle-mode', handleNavToggleMode)
    return () => window.removeEventListener('nav-toggle-mode', handleNavToggleMode)
  }, [toggleMode])

  // Broadcast initial mode and screen index on mount
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('deck-screen-change', {
      detail: { screenId: SCREEN_IDS[activeScreen], screenIndex: activeScreen, scrollMode }
    }))
  }, [])

  const childrenArray = React.Children.toArray(children)

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-screen bg-black text-white"
    >

      {/* Floating Active Screen Title Pill (Deck Mode) */}
      {scrollMode === 'deck' && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full hud-glass text-[11px] font-mono tracking-wider text-neutral-300 transition-all duration-300 shadow-xl"
        >
          <span className="text-[#BA1F1F] font-bold">0{activeScreen + 1}</span>
          <span className="text-neutral-500">/</span>
          <span className="text-neutral-400">0{SCREEN_IDS.length}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span className="text-white font-bold tracking-widest">{SCREEN_TITLES[activeScreen]}</span>
        </div>
      )}

      {/* Floating Prev / Next Navigation Arrows (Deck Mode) */}
      {scrollMode === 'deck' && (
        <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 select-none">
          <button
            type="button"
            disabled={activeScreen === 0}
            onClick={() => goToScreen(activeScreen - 1)}
            aria-label="Previous screen"
            className="hud-glass w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:border-red-500/50 hover:bg-neutral-900 transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <button
            type="button"
            disabled={activeScreen === SCREEN_IDS.length - 1}
            onClick={() => goToScreen(activeScreen + 1)}
            aria-label="Next screen"
            className="hud-glass w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:border-red-500/50 hover:bg-neutral-900 transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}

      {/* ================= MODE 1: DECK VIEW (3D Magnetic Screen Stack) ================= */}
      {scrollMode === 'deck' ? (
        <div className="deck-viewport relative w-full min-h-screen overflow-hidden">
          {childrenArray.map((child, index) => {
            const isActive = index === activeScreen
            const isPrev = index < activeScreen
            const isNext = index > activeScreen
            const diff = index - activeScreen

            // Calculate 3D card deck transforms
            let transform = 'translate3d(0, 0, 0) scale(1)'
            let opacity = 1
            let filter = 'blur(0px)'
            let zIndex = 20

            if (isActive) {
              transform = 'translate3d(0, 0, 0) scale(1)'
              opacity = 1
              filter = 'blur(0px)'
              zIndex = 30
            } else if (isPrev) {
              // Tucked back & scaled down
              transform = `translate3d(0, ${diff * 60}px, ${diff * 120}px) scale(${1 - Math.abs(diff) * 0.06}) rotateX(${Math.abs(diff) * 4}deg)`
              opacity = Math.max(0, 0.4 - Math.abs(diff) * 0.2)
              filter = 'blur(3px)'
              zIndex = 10 - Math.abs(diff)
            } else if (isNext) {
              // Waiting below
              transform = `translate3d(0, 100%, 0) scale(0.96)`
              opacity = 0
              filter = 'blur(2px)'
              zIndex = 10 - Math.abs(diff)
            }

            return (
              <div
                key={SCREEN_IDS[index] || index}
                id={SCREEN_IDS[index]}
                className={`absolute inset-0 w-full h-full overflow-y-auto allow-internal-scroll deck-card-transition ${
                  isActive ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                style={{
                  transform,
                  opacity,
                  filter,
                  zIndex,
                }}
              >
                <div className="w-full min-h-full flex flex-col justify-center py-10 sm:py-14 md:py-16">
                  {child}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* ================= MODE 2: FREE SCROLL (Continuous Fluid Parallax Flow) ================= */
        <div className="relative w-full flex flex-col gap-12 sm:gap-16 md:gap-20">
          {childrenArray.map((child, index) => (
            <div
              key={SCREEN_IDS[index] || index}
              id={SCREEN_IDS[index]}
              className="w-full transition-all duration-500"
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
