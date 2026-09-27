import React, { useEffect, useRef, useState, useMemo } from 'react'

export default function SoftwareLogosSpiral3D({
  apps,
  onIconClick,
  className = '',
}) {
  const containerRef = useRef(null)
  const animFrameRef = useRef(null)
  const [angle, setAngle] = useState(0)
  const [hoveredApp, setHoveredApp] = useState(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [containerWidth, setContainerWidth] = useState(800)

  // Track container width for responsive radius & height
  useEffect(() => {
    if (!containerRef.current) return
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth || 800)
      }
    }
    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Continuous 60/120fps 3D spiral orbit loop
  useEffect(() => {
    let lastTime = performance.now()
    const loop = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1)
      lastTime = currentTime

      // Orbit speed: 0.48 rad/sec (~13 seconds per full orbit), slows down when hovering
      const speed = hoveredApp ? 0.08 : 0.46
      setAngle((prev) => (prev + speed * delta) % (Math.PI * 2))

      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [hoveredApp])

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
    setHoveredApp(null)
  }

  // Responsive spiral parameters
  const isMobile = containerWidth < 640
  const isTablet = containerWidth >= 640 && containerWidth < 800
  const radius = isMobile ? 125 : isTablet ? 175 : 225
  const heightSpan = isMobile ? 180 : 250
  const stageHeight = isMobile ? '400px' : '470px'

  // Compute 3D coordinates for each icon
  const totalApps = apps.length
  const computedItems = useMemo(() => {
    return apps.map((app, index) => {
      // 2.2 helical turns across the 11 items
      const progress = index / (totalApps - 1) // 0 to 1
      const normalizedY = progress - 0.5 // -0.5 (top) to +0.5 (bottom)

      // Phase angle around the cylinder
      const turns = 2.2
      const itemAngle = angle + progress * (Math.PI * 2 * turns)

      // Conical slight flare: top is slightly wider, bottom slightly tighter
      const r = radius * (1.08 - progress * 0.16)

      // 3D coordinates
      const x = Math.cos(itemAngle) * r
      const z = Math.sin(itemAngle) * r // -radius to +radius
      const y = normalizedY * heightSpan + Math.sin(itemAngle) * (isMobile ? 12 : 20)

      // Depth calculations
      // zNorm: 0 (furthest back) to 1 (closest front)
      const zNorm = (z + radius) / (2 * radius)
      const scale = isMobile
        ? 0.72 + zNorm * 0.44 // 0.72x to 1.16x
        : 0.75 + zNorm * 0.50 // 0.75x to 1.25x
      const opacity = 0.52 + zNorm * 0.48 // 0.52 to 1.00
      const zIndex = Math.round(100 + zNorm * 200)

      return {
        app,
        x,
        y,
        z,
        zNorm,
        scale,
        opacity,
        zIndex,
        itemAngle,
      }
    })
  }, [apps, angle, radius, heightSpan, totalApps, isMobile])

  // Parallax rotation angles
  const pitchDeg = pointer.y * -14 // -14deg to +14deg
  const yawDeg = pointer.x * 18 // -18deg to +18deg

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full select-none overflow-visible flex flex-col items-center justify-center ${className}`}
      style={{
        minHeight: stageHeight,
        perspective: '1200px',
      }}
      role="region"
      aria-label="3D revolving spiral of software skill logos. Click any logo to view standard grid."
    >
      {/* 3D Helix Core Decorative Halo Rings in Background */}
      <div
        className="absolute pointer-events-none transition-transform duration-500 ease-out"
        style={{
          width: radius * 2.2,
          height: heightSpan * 1.3,
          transform: `rotateX(${pitchDeg * 0.6}deg) rotateY(${yawDeg * 0.6}deg)`,
          transformStyle: 'preserve-3d',
        }}
        aria-hidden="true"
      >
        {/* Subtle holographic spiral orbital rings */}
        <div
          className="absolute inset-0 rounded-full border border-neutral-900/10 opacity-30 animate-spin-slow"
          style={{
            transform: 'rotateX(72deg) scale(1.1)',
            filter: 'blur(0.5px)',
          }}
        />
        <div
          className="absolute inset-4 rounded-full border border-dashed border-neutral-900/15 opacity-25"
          style={{
            transform: 'rotateX(72deg) scale(0.85)',
          }}
        />
        {/* Glowing central axis light beam */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/10 to-cyan-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 3D Perspective Orbital Stage */}
      <div
        className="relative w-full flex items-center justify-center pointer-events-auto transition-transform duration-300 ease-out"
        style={{
          height: stageHeight,
          transform: `rotateX(${pitchDeg}deg) rotateY(${yawDeg}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {computedItems.map(({ app, x, y, z, zNorm, scale, opacity, zIndex }) => {
          const IconComponent = app.Icon
          const isHovered = hoveredApp === app.name

          return (
            <div
              key={app.name}
              onClick={() => onIconClick(app)}
              onMouseEnter={() => setHoveredApp(app.name)}
              onMouseLeave={() => setHoveredApp(null)}
              className="absolute cursor-pointer flex flex-col items-center group/orbit transition-all duration-100 ease-out will-change-transform"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${isHovered ? scale * 1.22 : scale})`,
                zIndex: isHovered ? 999 : zIndex,
                opacity: isHovered ? 1 : opacity,
                transformStyle: 'preserve-3d',
              }}
              tabIndex={0}
              role="button"
              aria-label={`${app.name} logo in 3D orbit. Click to return to original grid layout.`}
            >
              {/* Icon Container with dynamic 3D depth shadow & brand glow */}
              <div
                className={`relative rounded-2xl p-1.5 sm:p-2 transition-all duration-300 ${
                  isHovered
                    ? 'shadow-[0_20px_45px_rgba(0,0,0,0.35)] ring-2 ring-neutral-950/80 -translate-y-1'
                    : zNorm > 0.65
                    ? 'shadow-[0_12px_28px_rgba(0,0,0,0.18)]'
                    : 'shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                }`}
                style={{
                  backgroundColor: zNorm > 0.5 ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0.65)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: isHovered && app.color
                    ? `0 16px 36px ${app.color}66`
                    : undefined,
                }}
              >
                <IconComponent className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 transition-transform duration-300 group-hover/orbit:scale-110" />

                {/* Shimmer sweep on hovered icon */}
                {isHovered && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="w-full h-full animate-[shimmer-sweep_1s_ease-in-out] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  </div>
                )}
              </div>

              {/* Floating Tooltip / App Label */}
              <div
                className={`mt-2 flex flex-col items-center pointer-events-none transition-all duration-200 ${
                  isHovered
                    ? 'opacity-100 scale-105 translate-y-0'
                    : zNorm > 0.72
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
                  <span className="mt-1 text-[9px] text-neutral-600 font-normal bg-white/70 px-2 py-0.5 rounded-full border border-black/10 shadow-xs whitespace-nowrap">
                    Click to arrange in grid ⊞
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Helpful Ambient Call-to-Action Pill at bottom of 3D Orbit */}
      <div className="relative z-20 mt-4 mb-2 flex items-center justify-center">
        <button
          onClick={() => onIconClick(null)}
          className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-neutral-900/80 bg-white/80 backdrop-blur-md text-neutral-950 text-xs sm:text-sm font-medium shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#BA1F1F] animate-pulse" />
          <span>Click any icon to restore original grid layout</span>
          <span className="text-neutral-400 group-hover:text-white/80 transition-colors">⊞</span>
        </button>
      </div>
    </div>
  )
}
