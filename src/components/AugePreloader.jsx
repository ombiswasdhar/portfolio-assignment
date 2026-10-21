import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import FeaturedWorksFloatingElements from './FeaturedWorksFloatingElements'

/**
 * Auge XP Signature Preloader with Custom Brand Hierarchy
 * Reverse-engineered from https://auge-xp.com/
 * 
 * Typographic Hierarchy:
 * 1. Top: "om biswas" — Akira Expanded font, smaller & refined with wide tracking
 * 2. Center: "portfolio" — User's signature MyFont in massive hero scale,
 *    featuring 4-band slice displacement glitch & cyber scramble reveal
 * 3. Bottom: "Omis brain" — Akira Expanded / sleek uppercase label
 * 
 * Motion Architecture:
 * - Parabolic Curved Arc Curtain Mask (border-radius: 50% / clamp(180px, 22vw, 300px))
 * - Clip-mask reveal for all 3 text layers
 * - Monospace 3-digit counter: 000 -> 100
 * - Synchronous page content shift: translateY(40px) -> 0
 */

const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz'

export default function AugePreloader({
  onComplete,
  topText = 'om biswas',
  portfolioText = 'portfolio',
  bottomText = "Omi's brain"
}) {
  const [isDone, setIsDone] = useState(false)

  // Refs
  const containerRef = useRef(null)
  const backdropRef = useRef(null)
  const maskRef = useRef(null)
  const floatingRef = useRef(null)
  
  const topTextRef = useRef(null)
  const portfolioRef = useRef(null)
  const portfolioGlitchOverlayRef = useRef(null)
  const bottomTextRef = useRef(null)
  
  const counterRef = useRef(null)
  const statusLineRef = useRef(null)

  // State tracker
  const stateRef = useRef({
    counterValue: 0,
    mediaReady: false,
    rampComplete: false,
    counterCompleting: false,
    counterComplete: false,
    exited: false,
    glitchTimer: null,
    glitchIteration: 0
  })

  // Controller to unlock scrolling across mobile and desktop
  const scrollBlockersRef = useRef({
    preventScroll: null,
    enforceTop: null,
  })

  const unlockScroll = useCallback(() => {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    document.documentElement.style.overscrollBehavior = ''
    document.body.style.overscrollBehavior = ''
  }, [])

  // Glitch Shatter (Auge XP createBandGlitch on the user's custom font)
  const triggerBandGlitch = useCallback(() => {
    const overlay = portfolioGlitchOverlayRef.current
    const source = portfolioRef.current
    if (!overlay || !source || stateRef.current.exited) return

    const bands = Array.from(overlay.children)
    if (bands.length !== 4) return

    source.style.opacity = '0'
    overlay.style.visibility = 'visible'

    // 4 horizontal slice cuts with subtle jitter offsets for high readability
    const offsets = [
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * -14,
      (Math.random() - 0.5) * 10
    ]

    bands.forEach((band, idx) => {
      band.style.clipPath = `inset(${idx * 25}% 0% ${(3 - idx) * 25}% 0%)`
      band.style.transform = `translateX(${offsets[idx].toFixed(1)}px)`
    })

    gsap.to(bands, {
      x: 0,
      duration: 0.18,
      ease: 'power2.out',
      onComplete: () => {
        if (!stateRef.current.exited) {
          source.style.opacity = '1'
          overlay.style.visibility = 'hidden'
        }
      }
    })
  }, [])

  // Cyber Scramble Reveal for "portfolio" in MyFont
  const scrambleText = useCallback((targetText, duration = 0.85) => {
    const el = portfolioRef.current
    if (!el) return

    const totalChars = targetText.length
    const startTime = performance.now()

    const updateScramble = (now) => {
      if (stateRef.current.exited) return
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(1, elapsed / duration)

      const revealedCount = Math.floor(progress * totalChars)
      let displayStr = ''

      for (let i = 0; i < totalChars; i++) {
        if (i < revealedCount) {
          displayStr += targetText[i]
        } else if (targetText[i] === ' ') {
          displayStr += ' '
        } else {
          displayStr += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }
      }

      if (el) el.textContent = displayStr

      if (progress < 1) {
        requestAnimationFrame(updateScramble)
      } else if (el) {
        el.textContent = targetText
      }
    }

    requestAnimationFrame(updateScramble)
  }, [])

  // Execute Curtain Exit and Synchronized Page Content Rise
  const executeExit = useCallback(() => {
    const state = stateRef.current
    if (state.exited) return
    state.exited = true

    if (state.glitchTimer) clearTimeout(state.glitchTimer)

    const mask = maskRef.current
    const topEl = topTextRef.current
    const portfolioEl = portfolioRef.current
    const bottomEl = bottomTextRef.current
    const counter = counterRef.current
    const statusLine = statusLineRef.current
    // Hardware accelerate transform properties
    gsap.set([mask, topEl, portfolioEl, bottomEl, counter, statusLine], {
      willChange: 'transform'
    })

    // Phase 1: Texts slide upward into clip bounds
    const textTl = gsap.timeline({
      onComplete: () => {
        gsap.set([topEl, portfolioEl, bottomEl, counter, statusLine], { willChange: 'auto' })
      }
    })

    textTl
      .to(topEl, { yPercent: -130, duration: 0.42, ease: 'expo.inOut' }, 0)
      .to(portfolioEl, { yPercent: -130, duration: 0.46, ease: 'expo.inOut' }, 0.04)
      .to(bottomEl, { yPercent: -130, duration: 0.42, ease: 'expo.inOut' }, 0.08)
      .to(counter, { yPercent: -130, duration: 0.42, ease: 'expo.inOut' }, 0.1)
      .to(statusLine, { opacity: 0, duration: 0.28, ease: 'power2.inOut' }, 0)

    if (floatingRef.current) {
      textTl.to(floatingRef.current, { y: -70, opacity: 0, duration: 0.42, ease: 'expo.inOut' }, 0)
    }

    // Phase 2: Parabolic Curtain sweeps UPWARD to reveal the website
    const curtainTl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        gsap.set(mask, { willChange: 'auto' })
        if (scrollBlockersRef.current.preventScroll) {
          window.removeEventListener('touchmove', scrollBlockersRef.current.preventScroll)
          window.removeEventListener('wheel', scrollBlockersRef.current.preventScroll)
        }
        if (scrollBlockersRef.current.enforceTop) {
          window.removeEventListener('scroll', scrollBlockersRef.current.enforceTop)
        }
        unlockScroll()
        setIsDone(true)
        if (onComplete) onComplete()
      }
    })

    // Curved mask & backdrop sweep up together with extended luxury ease
    curtainTl.to(
      [mask, backdropRef.current].filter(Boolean),
      {
        yPercent: -100,
        y: -40,
        duration: 0.8,
        ease: 'expo.inOut'
      },
      0
    )
  }, [onComplete])

  // Finish Counter to 100% and trigger exit
  const finishCounterAndExit = useCallback(() => {
    const state = stateRef.current
    if (state.counterCompleting || state.counterComplete || state.exited) return
    state.counterCompleting = true

    const counterObj = { value: state.counterValue }

    // Final smooth ramp to 100 with a crisp finish
    gsap.to(counterObj, {
      value: 100,
      duration: 0.35,
      ease: 'power2.out',
      onUpdate: () => {
        state.counterValue = counterObj.value
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counterObj.value)).padStart(3, '0')
        }
      },
      onComplete: () => {
        state.counterComplete = true
        // Brief pause at 100% before curtain sweep
        setTimeout(() => {
          executeExit()
        }, 120)
      }
    })
  }, [executeExit])

  // Skip bypass
  const handleSkip = useCallback(() => {
    stateRef.current.mediaReady = true
    stateRef.current.rampComplete = true
    finishCounterAndExit()
  }, [finishCounterAndExit])

  useEffect(() => {
    // Lock scroll across both mobile (html/body) and desktop
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.overscrollBehavior = 'none'

    // Prevent touch dragging / wheel gestures on mobile
    const preventScroll = (e) => {
      e.preventDefault()
    }

    const enforceTop = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0)
      }
    }

    scrollBlockersRef.current.preventScroll = preventScroll
    scrollBlockersRef.current.enforceTop = enforceTop

    window.scrollTo(0, 0)
    window.addEventListener('touchmove', preventScroll, { passive: false })
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('scroll', enforceTop, { passive: true })

    const mask = maskRef.current
    const backdrop = backdropRef.current
    const topEl = topTextRef.current
    const portfolioEl = portfolioRef.current
    const bottomEl = bottomTextRef.current
    const counter = counterRef.current
    const statusLine = statusLineRef.current

    if (!mask || !topEl || !portfolioEl || !bottomEl || !counter) return

    // 1. Initial GSAP placements
    gsap.set(mask, { yPercent: 0, y: 0, visibility: 'visible' })

    gsap.set([topEl, portfolioEl, bottomEl, counter], {
      visibility: 'visible',
      yPercent: 130
    })
    gsap.set(statusLine, { opacity: 0 })

    const state = stateRef.current

    // 2. Schedule subtle glitch iterations
    const scheduleNextGlitch = () => {
      if (state.exited) return
      const delay = state.glitchIteration === 0 ? 1100 : 2600 + Math.random() * 1200
      state.glitchIteration += 1
      state.glitchTimer = setTimeout(() => {
        triggerBandGlitch()
        scheduleNextGlitch()
      }, delay)
    }

    // 3. Entrance Timeline with more unhurried, graceful easing
    const entranceTl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        if (backdrop) gsap.set(backdrop, { autoAlpha: 0 })
        scheduleNextGlitch()
      }
    })

    // Top: "om biswas" in Akira
    entranceTl.to(
      topEl,
      {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out'
      },
      0
    )

    // Center: "portfolio" in MyFont (bigger size, with 0.7s crisp scramble)
    entranceTl.to(
      portfolioEl,
      {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        onStart: () => {
          scrambleText(portfolioText, 0.7)
        }
      },
      0.18
    )

    // Bottom: "Omis brain" in Akira
    entranceTl.to(
      bottomEl,
      {
        yPercent: 0,
        duration: 1.05,
        ease: 'expo.out'
      },
      0.35
    )

    // Status Line
    entranceTl.to(
      statusLine,
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      },
      0.3
    )

    // Counter
    entranceTl.to(
      counter,
      {
        yPercent: 0,
        duration: 1.0,
        ease: 'expo.out'
      },
      0.4
    )

    // Floating brand stickers fade & scale in
    if (floatingRef.current) {
      entranceTl.fromTo(
        floatingRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        0.2
      )
    }

    // 4. Counter Ramp: Crisp, cinematic progression (0 -> 48 -> 88 -> 100)
    const targetInterim = 87 + Math.floor(Math.random() * 5)
    const counterObj = { value: 0 }

    // Multi-phase timeline for the counter count-up
    const counterTl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        state.rampComplete = true
        if (state.mediaReady) {
          setTimeout(() => {
            finishCounterAndExit()
          }, 120)
        }
      }
    })

    // Phase 1: 000 to ~045 over 0.6s
    counterTl.to(counterObj, {
      value: 45,
      duration: 0.6,
      ease: 'power1.out',
      onUpdate: () => {
        state.counterValue = counterObj.value
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counterObj.value)).padStart(3, '0')
        }
      }
    })

    // Phase 2: 045 to targetInterim (~88) over 0.65s
    counterTl.to(counterObj, {
      value: targetInterim,
      duration: 0.65,
      ease: 'power2.inOut',
      onUpdate: () => {
        state.counterValue = counterObj.value
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counterObj.value)).padStart(3, '0')
        }
      }
    })

    // 5. Readiness check with responsive timing
    const checkReadiness = () => {
      state.mediaReady = true
      if (state.rampComplete) {
        setTimeout(() => {
          finishCounterAndExit()
        }, 80)
      }
    }

    if (document.readyState === 'complete') {
      setTimeout(checkReadiness, 500)
    } else {
      window.addEventListener('load', () => setTimeout(checkReadiness, 300), { once: true })
      setTimeout(checkReadiness, 1000)
    }

    // Safety fallback: guaranteed unblock after 2.4s under ANY device stalls
    const safetyTimer = setTimeout(() => {
      handleSkip()
    }, 2400)

    // Keyboard listener for skip & prevent background scrolling on desktop
    const handleKeyDown = (e) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End']
      if (scrollKeys.includes(e.code)) {
        e.preventDefault()
      }
      if (e.code === 'Space' || e.code === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(safetyTimer)
      window.removeEventListener('keydown', handleKeyDown)
      if (scrollBlockersRef.current.preventScroll) {
        window.removeEventListener('touchmove', scrollBlockersRef.current.preventScroll)
        window.removeEventListener('wheel', scrollBlockersRef.current.preventScroll)
      }
      if (scrollBlockersRef.current.enforceTop) {
        window.removeEventListener('scroll', scrollBlockersRef.current.enforceTop)
      }
      unlockScroll()
      if (state.glitchTimer) clearTimeout(state.glitchTimer)
      counterTl.kill()
      entranceTl.kill()
    }
  }, [finishCounterAndExit, handleSkip, scrambleText, triggerBandGlitch, portfolioText, unlockScroll])

  if (isDone) return null

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[99999] overflow-hidden select-none touch-none overscroll-none cursor-pointer"
      style={{ touchAction: 'none', overscrollBehavior: 'none' }}
      aria-label="Loading site. Tap anywhere to enter immediately."
      role="status"
    >
      {/* 1. Backdrop with White Dotted Grid */}
      <div
        ref={backdropRef}
        data-loader-backdrop="true"
        className="absolute inset-0 bg-[#050507] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.22) 1.25px, transparent 1.25px),
            radial-gradient(ellipse at center, transparent 35%, rgba(5, 5, 7, 0.85) 100%)
          `,
          backgroundSize: '24px 24px, 100% 100%',
        }}
      />

      {/* 2. Signature Auge XP Parabolic Curved Arc Curtain Mask with White Dotted Grid */}
      <div
        ref={maskRef}
        data-loader-mask="true"
        className="absolute pointer-events-none bg-[#050507]"
        style={{
          left: '-50%',
          right: '-50%',
          width: '200%',
          top: '-40px',
          bottom: '-40px',
          borderRadius: '50% / clamp(180px, 22vw, 300px)',
          boxShadow: '0 0 70px rgba(0, 0, 0, 0.95)',
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.22) 1.25px, transparent 1.25px),
            radial-gradient(ellipse at center, transparent 35%, rgba(5, 5, 7, 0.85) 100%)
          `,
          backgroundSize: '24px 24px, 100% 100%',
        }}
      />

      {/* 3. Floating Brand Illustrations (From Featured Works) */}
      <div
        ref={floatingRef}
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none"
        aria-hidden="true"
      >
        <FeaturedWorksFloatingElements />
      </div>

      {/* 4. Center Typography Trio */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 z-20">
        
        {/* ROW 1: "om biswas" — Akira Expanded (crisp, high contrast, bold) */}
        <div className="overflow-hidden py-1 mb-1.5 sm:mb-2.5">
          <div className="overflow-hidden">
            <span
              ref={topTextRef}
              className="block font-akira font-black uppercase text-center text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.24em] text-white leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
            >
              {topText}
            </span>
          </div>
        </div>

        {/* ROW 2: "portfolio" — User's MyFont in massive hero scale with high clarity */}
        <div className="overflow-hidden py-3 sm:py-4 -my-1 sm:-my-2">
          <div className="relative overflow-hidden">
            {/* Base subtitle with clean high-contrast styling */}
            <h1
              ref={portfolioRef}
              className="block font-myfont text-white font-normal text-center leading-[0.92] lowercase text-[clamp(62px,12vw,144px)] tracking-wide px-4 drop-shadow-[0_4px_30px_rgba(255,255,255,0.35)]"
            >
              {portfolioText}
            </h1>

            {/* 4-Band Horizontal Slice Displacement Overlay */}
            <span
              ref={portfolioGlitchOverlayRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 block"
              style={{ visibility: 'hidden' }}
            >
              {[0, 1, 2, 3].map((bandIndex) => (
                <span
                  key={bandIndex}
                  className="absolute inset-0 font-myfont text-white font-normal text-center leading-[0.92] lowercase text-[clamp(62px,12vw,144px)] whitespace-nowrap tracking-wide px-4"
                >
                  {portfolioText}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* ROW 3: "Omi's brain" — Fredoka font with warm, geometric readability */}
        <div className="overflow-hidden py-1 mt-1 sm:mt-2">
          <div className="overflow-hidden">
            <span
              ref={bottomTextRef}
              className="block font-fredoka uppercase text-center text-sm sm:text-base md:text-lg tracking-[0.2em] text-neutral-200 font-bold leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
            >
              {bottomText}
            </span>
          </div>
        </div>

      </div>

      {/* 5. Top Micro Studio Metadata (in Fredoka font) */}
      <div
        ref={statusLineRef}
        className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between text-xs sm:text-[13px] tracking-[0.16em] font-fredoka font-medium uppercase text-neutral-400 pointer-events-none"
      >
        <span>PORTFOLIO // 2026</span>
        <span className="hidden sm:inline">CREATIVE TECHNOLOGY & DESIGN</span>
        <span>SHILLONG, IN</span>
      </div>

      {/* 6. Bottom 3-Digit Monospace Counter & Skip Hint */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none">
        <div className="overflow-hidden">
          <span
            ref={counterRef}
            className="block font-mono text-xs sm:text-sm font-semibold tracking-[0.3em] text-white/90 tabular-nums uppercase leading-none"
          >
            000
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-fredoka uppercase tracking-[0.2em] text-white/40">
          Click or press Space to skip
        </span>
      </div>
    </div>
  )
}
