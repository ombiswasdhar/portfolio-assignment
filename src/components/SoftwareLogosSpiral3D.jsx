import React, { useEffect, useRef, useState, useMemo } from 'react'

export default function SoftwareLogosSpiral3D({
  apps,
  onIconClick,
  className = '',
}) {
  const containerRef = useRef(null)
  const animFrameRef = useRef(null)
  const hoveredAppRef = useRef(null)
  const [angle, setAngle] = useState(0)
  const [hoveredApp, setHoveredApp] = useState(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [containerWidth, setContainerWidth] = useState(1200)

  // Track container width for responsive radius & height
  useEffect(() => {
    if (!containerRef.current) return
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth || 1200)
      }
    }
    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Keep the orbit smooth when idle, but yield to page scrolling.
  useEffect(() => {
    let lastTime = performance.now()
    let lastFrameTime = 0
    let isInView = false
    let isScrolling = false
    let scrollTimeout = 0
    const frameInterval = 1000 / 60
    const container = containerRef.current

    const scheduleLoop = () => {
      if (!animFrameRef.current && isInView && !isScrolling && !document.hidden) {
        animFrameRef.current = requestAnimationFrame(loop)
      }
    }

    const loop = (currentTime) => {
      animFrameRef.current = null
      if (!isInView || isScrolling || document.hidden) return

      if (currentTime - lastFrameTime < frameInterval) {
        scheduleLoop()
        return
      }
      lastFrameTime = currentTime
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1)
      lastTime = currentTime

      // Smooth orbital speed (~14s per revolution), slows down on hover
      const speed = hoveredAppRef.current ? 0.1 : 0.42
      setAngle((prev) => (prev + speed * delta) % (Math.PI * 2))

      scheduleLoop()
    }

    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting
      if (isInView) scheduleLoop()
      else if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
    }, { rootMargin: '80px' })
    if (container) observer.observe(container)

    const handleScroll = () => {
      isScrolling = true
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
      window.clearTimeout(scrollTimeout)
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false
        lastTime = performance.now()
        scheduleLoop()
      }, 120)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      } else {
        lastTime = performance.now()
        scheduleLoop()
      }
    }

    document.addEventListener('scroll', handleScroll, { passive: true, capture: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    scheduleLoop()

    return () => {
      observer.disconnect()
      document.removeEventListener('scroll', handleScroll, true)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.clearTimeout(scrollTimeout)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
    }
  }, [])

  // Mouse move handler for interactive 3D pitch/yaw parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1 // -1 to 1
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1 // -1 to 1
    setPointer({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY)),
    })
  }

  const handleMouseLeave = () => {
    setPointer({ x: 0, y: 0 })
    hoveredAppRef.current = null
    setHoveredApp(null)
  }

  // Responsive dimensions
  const isMobile = containerWidth < 640
  const isTablet = containerWidth >= 640 && containerWidth < 1024

  // Three tiers of orbital radii:
  // 1. Core central spiral helix
  const radiusPrimary = isMobile ? 125 : isTablet ? 178 : 221
  // 2. Mid-range companion orbit
  const radiusMid = isMobile ? 170 : isTablet ? 254 : 330
  // 3. Wide side-flank floating orbits: reaching all the way to the sides of the screen to fill the space!
  const radiusSides = isMobile ? 215 : isTablet ? 370 : 510

  const heightSpan = isMobile ? 220 : 295
  const stageHeight = isMobile ? '460px' : '530px'

  const totalApps = apps.length
  // Keep every logo in the main helix, but use fewer repeated companions.
  // This cuts down DOM updates and layered shadows while preserving the orbit effect.
  const companionApps = useMemo(() => apps.filter((_, index) => index % 4 === 0), [apps])

  // ================= 1. PRIMARY INNER SPIRAL ICONS =================
  const primaryItems = useMemo(() => {
    return apps.map((app, index) => {
      const progress = index / (totalApps - 1)
      const normalizedY = progress - 0.5

      const turns = 2.2
      const itemAngle = angle + progress * (Math.PI * 2 * turns)
      const r = radiusPrimary * (1.06 - progress * 0.12)

      const x = Math.cos(itemAngle) * r
      const z = Math.sin(itemAngle) * r
      const y = normalizedY * heightSpan + Math.sin(itemAngle) * (isMobile ? 12 : 20)

      const zNorm = (z + radiusPrimary) / (2 * radiusPrimary)
      const scale = isMobile ? 0.72 + zNorm * 0.44 : 0.76 + zNorm * 0.48
      const opacity = 0.58 + zNorm * 0.42
      const zIndex = Math.round(150 + zNorm * 200)

      return {
        id: `primary-${app.name}`,
        app,
        x,
        y,
        z,
        zNorm,
        scale,
        opacity,
        zIndex,
        tier: 'primary',
      }
    })
  }, [apps, angle, radiusPrimary, heightSpan, totalApps, isMobile])

  // ================= 2. MID-RANGE COMPANION FLOATING ICONS =================
  const midCompanionItems = useMemo(() => {
    return companionApps.map((app, index) => {
      const progress = 1 - index / Math.max(companionApps.length - 1, 1)
      const normalizedY = progress - 0.5

      const turns = 2.2
      const itemAngle = angle + progress * (Math.PI * 2 * turns) + Math.PI // 180° offset
      const r = radiusMid * (1.04 - progress * 0.08)

      const floatY = Math.sin(angle * 2.2 + index * 1.3) * (isMobile ? 10 : 16)
      const floatX = Math.cos(angle * 1.7 + index * 0.8) * (isMobile ? 6 : 10)
      const floatRot = Math.sin(angle * 1.4 + index * 1.1) * 7

      const x = Math.cos(itemAngle) * r + floatX
      const z = Math.sin(itemAngle) * r
      const y = normalizedY * heightSpan * 0.95 + Math.sin(itemAngle) * (isMobile ? 14 : 22) + floatY

      const zNorm = (z + radiusMid) / (2 * radiusMid)
      const scale = isMobile ? 0.62 + zNorm * 0.38 : 0.68 + zNorm * 0.42
      const opacity = 0.48 + zNorm * 0.48
      const zIndex = Math.round(120 + zNorm * 200)

      return {
        id: `mid-${app.name}`,
        app,
        x,
        y,
        z,
        zNorm,
        scale,
        opacity,
        zIndex,
        floatRot,
        tier: 'mid',
      }
    })
  }, [companionApps, angle, radiusMid, heightSpan, isMobile])

  // ================= 3. WIDE SIDE-FLANK FLOATING ICONS (SIDES OF SCREEN) =================
  // Orbiting wide to populate the left and right sides of the screen so it looks completely filled!
  const sideFlankFloatingItems = useMemo(() => {
    return companionApps.map((app, index) => {
      // Staggered distribution across the outer sides
      const progress = (index * 0.61803398875) % 1 // Golden ratio distribution for natural organic spread
      const normalizedY = (index / Math.max(companionApps.length - 1, 1)) - 0.5

      // Wide orbit with alternating left/right phase
      const sidePhase = index % 2 === 0 ? 0 : Math.PI
      const itemAngle = angle * 0.85 + (index / companionApps.length) * Math.PI * 2 + sidePhase

      // Expanded outer radius spanning to the sides of the screen
      const r = radiusSides * (0.92 + (index % 3) * 0.08)

      // Floating wave physics
      const floatY = Math.sin(angle * 2.6 + index * 1.6) * (isMobile ? 12 : 22)
      const floatX = Math.cos(angle * 1.9 + index * 1.2) * (isMobile ? 8 : 14)
      const floatRot = Math.sin(angle * 1.2 + index * 0.9) * 10

      const x = Math.cos(itemAngle) * r + floatX
      const z = Math.sin(itemAngle) * (r * 0.65) // Slightly elliptical in Z to keep focus forward
      const y = normalizedY * (heightSpan * 1.15) + floatY

      const zNorm = (z + radiusSides) / (2 * radiusSides)
      const scale = isMobile ? 0.58 + zNorm * 0.34 : 0.64 + zNorm * 0.38
      const opacity = 0.42 + zNorm * 0.50
      const zIndex = Math.round(90 + zNorm * 180)

      return {
        id: `side-${app.name}`,
        app,
        x,
        y,
        z,
        zNorm,
        scale,
        opacity,
        zIndex,
        floatRot,
        tier: 'side',
      }
    })
  }, [companionApps, angle, radiusSides, heightSpan, isMobile])

  // Combine three tiers into a lighter field (main icons plus fewer repeats).
  const all3DItems = useMemo(() => {
    return [...sideFlankFloatingItems, ...midCompanionItems, ...primaryItems]
  }, [sideFlankFloatingItems, midCompanionItems, primaryItems])

  // Parallax rotation angles
  const pitchDeg = pointer.y * -14
  const yawDeg = pointer.x * 18

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full select-none overflow-visible flex flex-col items-center justify-center ${className}`}
      style={{
        minHeight: stageHeight,
        perspective: '1350px',
      }}
      role="region"
      aria-label="3D revolving spiral of software skill logos with full-screen floating companion icons. Click any logo to view standard grid."
    >
      {/* ================= 3D ROTATING RED HELIX RINGS & LIGHT CORE ================= */}
      <div
        className="absolute z-10 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          width: radiusSides * 1.6,
          height: heightSpan * 1.5,
          transform: `rotateX(${pitchDeg * 0.6}deg) rotateY(${yawDeg * 0.6}deg)`,
          transformStyle: 'preserve-3d',
        }}
        aria-hidden="true"
      >
        {/* Outer Rotating Red Spiral Orbital Ring */}
        <div
          className="absolute inset-0 rounded-full border border-red-600/35 opacity-45 animate-spin-slow"
          style={{
            transform: 'rotateX(72deg) scale(1.15)',
          }}
        />
        {/* Mid Dashed Red Rotating Orbital Ring */}
        <div
          className="absolute inset-10 rounded-full border border-dashed border-red-500/40 opacity-40"
          style={{
            transform: 'rotateX(72deg) scale(0.92)',
          }}
        />
        {/* Inner Red Rotating Orbital Ring */}
        <div
          className="absolute inset-20 rounded-full border border-red-500/30 opacity-35"
          style={{
            transform: 'rotateX(72deg) scale(0.72)',
          }}
        />
        {/* Core Glowing Red Axis Light Beam */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-tr from-red-600/20 via-rose-500/12 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* ================= 3D PERSPECTIVE ORBITAL STAGE ================= */}
      <div
        className="relative z-0 w-full flex items-center justify-center pointer-events-auto transition-transform duration-300 ease-out"
        style={{
          height: stageHeight,
          transform: `rotateX(${pitchDeg}deg) rotateY(${yawDeg}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {all3DItems.map((item) => {
          const { id, app, x, y, z, zNorm, scale, opacity, zIndex, tier, floatRot } = item
          const IconComponent = app.Icon
          const isHovered = hoveredApp === id
          const isSide = tier === 'side'
          const isMid = tier === 'mid'

          return (
            <div
              key={id}
              onClick={() => onIconClick(app)}
              onMouseEnter={() => {
                hoveredAppRef.current = id
                setHoveredApp(id)
              }}
              onMouseLeave={() => {
                hoveredAppRef.current = null
                setHoveredApp(null)
              }}
              className="absolute cursor-pointer flex flex-col items-center group/orbit"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${floatRot || 0}deg) scale(${isHovered ? scale * 1.35 : scale * 1.08})`,
                zIndex: isHovered ? 999 : zIndex,
                opacity: isHovered ? 1 : opacity,
                transformStyle: 'preserve-3d',
              }}
              tabIndex={0}
              role="button"
              aria-label={`${app.name}${isSide ? ' (floating side)' : isMid ? ' (floating companion)' : ''} logo in 3D orbit. Click to return to original grid layout.`}
            >
              {/* Icon Container with dynamic 3D depth shadow & brand glow */}
              <div
                className={`relative rounded-2xl transition-all duration-300 ${
                  isSide
                    ? 'p-1.5 sm:p-2 border border-red-500/15 shadow-[0_8px_20px_rgba(0,0,0,0.08)]'
                    : isMid
                    ? 'p-1.5 sm:p-2 border border-neutral-900/10'
                    : 'p-1.5 sm:p-2'
                } ${
                  isHovered
                    ? 'shadow-[0_22px_48px_rgba(220,38,38,0.3)] ring-2 ring-red-600 -translate-y-1'
                    : zNorm > 0.65
                    ? 'shadow-[0_12px_28px_rgba(0,0,0,0.14)]'
                    : 'shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
                }`}
                style={{
                  backgroundColor: zNorm > 0.5
                    ? (isSide ? 'rgba(255, 255, 255, 0.88)' : isMid ? 'rgba(255, 255, 255, 0.90)' : 'rgba(255, 255, 255, 0.96)')
                    : (isSide ? 'rgba(255, 255, 255, 0.60)' : isMid ? 'rgba(255, 255, 255, 0.68)' : 'rgba(255, 255, 255, 0.75)'),
                  boxShadow: isHovered && app.color
                    ? `0 18px 40px ${app.color}77`
                    : undefined,
                }}
              >
                <IconComponent
                  className={`${
                    isSide
                      ? 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'
                      : isMid
                      ? 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'
                      : 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9'
                  } transition-transform duration-300 group-hover/orbit:scale-110`}
                />

                {/* Shimmer sweep on hovered icon */}
                {isHovered && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="w-full h-full animate-[shimmer-sweep_1s_ease-in-out] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  </div>
                )}
              </div>

              {/* Floating Tooltip / App Label — only on primary tier (no tags on duplicates) */}
              {tier === 'primary' && (
                <div
                  className={`mt-2 flex flex-col items-center pointer-events-none transition-all duration-200 ${
                    isHovered
                      ? 'opacity-100 scale-105 translate-y-0'
                      : zNorm > 0.78
                      ? 'opacity-85 scale-95'
                      : 'opacity-0 scale-90'
                  }`}
                >
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-950/85 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium tracking-tight shadow-md whitespace-nowrap flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: app.color || '#BA1F1F' }}
                    />
                    {app.name}
                  </span>

                  {isHovered && (
                    <span className="mt-1 text-[9px] text-neutral-600 font-normal bg-white/85 px-2 py-0.5 rounded-full border border-red-500/20 shadow-xs whitespace-nowrap">
                      Click to arrange in grid ⊞
                    </span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Helpful Call-to-Action rendered in user's MyFont with surrounding bar removed */}
      <div className="relative z-20 mt-5 mb-2 flex items-center justify-center">
        <button
          type="button"
          onClick={() => onIconClick(null)}
          className="font-myfont text-xl sm:text-2xl md:text-3xl text-neutral-300 hover:text-white transition-all duration-300 cursor-pointer tracking-wider text-center flex items-center gap-2.5 bg-transparent border-0 p-0 select-none group/cta hover:scale-105 active:scale-95 drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
          title="Click to restore original 2D grid"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse group-hover/cta:scale-125 transition-transform" />
          <span>click any icon to restore original grid layout</span>
        </button>
      </div>
    </div>
  )
}
