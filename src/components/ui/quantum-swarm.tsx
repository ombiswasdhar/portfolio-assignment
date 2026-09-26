"use client"

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react"
import { Play, Pause, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SwarmParticle {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  angle: number
  distance: number
  size: number
  excitation: number
}

export interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  strength: number
}

export interface PointerState {
  x: number
  y: number
  isDown: boolean
  radius: number
  shockwaves: Shockwave[]
}

export interface QuantumSwarmHandle {
  triggerPulse: (x?: number, y?: number) => void
  toggleRunning: () => void
  setIsRunning: (running: boolean) => void
  isRunning: boolean
}

export interface QuantumSwarmProps {
  headline?: string
  tagline?: string
  className?: string
  particleCount?: number
  transparent?: boolean
  showControls?: boolean
  showHeadline?: boolean
  theme?: "auto" | "dark" | "light"
  accentColor?: string
  particleColor?: string
  interactive?: boolean
}

export const QuantumSwarm = forwardRef<QuantumSwarmHandle, QuantumSwarmProps>(
  (
    {
      headline = "QUANTUM",
      tagline = "SWARM DYNAMICS",
      className = "",
      particleCount = 280,
      transparent = false,
      showControls = true,
      showHeadline = true,
      theme = "auto",
      accentColor,
      particleColor,
      interactive = true,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isRunning, setIsRunning] = useState<boolean>(true)

    const pointerRef = useRef<PointerState>({
      x: -2000,
      y: -2000,
      isDown: false,
      radius: 160,
      shockwaves: [],
    })

    const particlesRef = useRef<SwarmParticle[]>([])
    const boundsRef = useRef({ width: 0, height: 0, cx: 0, cy: 0 })

    // Initialize phyllotaxis / golden-angle spiral distribution
    const initParticles = useCallback(() => {
      const { width, height, cx, cy } = boundsRef.current
      if (width === 0 || height === 0) return

      const particles: SwarmParticle[] = []
      const goldenRatio = (1 + Math.sqrt(5)) / 2
      const goldenAngle = Math.PI * 2 * goldenRatio
      const maxRadius = Math.max(width, height) * 0.48

      for (let i = 0; i < particleCount; i++) {
        const distance = Math.pow(i / (particleCount - 1), 0.6) * maxRadius
        const angle = i * goldenAngle

        particles.push({
          x: cx + Math.cos(angle) * distance,
          y: cy + Math.sin(angle) * distance,
          vx: 0,
          vy: 0,
          baseX: 0,
          baseY: 0,
          angle,
          distance,
          size: Math.random() * 1.6 + 0.65,
          excitation: 0,
        })
      }
      particlesRef.current = particles
    }, [particleCount])

    // Imperative API
    useImperativeHandle(
      ref,
      () => ({
        triggerPulse: (customX?: number, customY?: number) => {
          const { cx, cy, width, height } = boundsRef.current
          pointerRef.current.shockwaves.push({
            x: typeof customX === "number" ? customX : cx,
            y: typeof customY === "number" ? customY : cy,
            radius: 10,
            maxRadius: Math.max(width, height) * 0.85,
            strength: 1.6,
          })
        },
        toggleRunning: () => {
          setIsRunning((prev) => !prev)
        },
        setIsRunning: (running: boolean) => {
          setIsRunning(running)
        },
        isRunning,
      }),
      [isRunning]
    )

    // Resize observer
    useEffect(() => {
      const container = containerRef.current
      const canvas = canvasRef.current
      if (!container || !canvas) return

      const ctx = canvas.getContext("2d", { alpha: transparent })
      if (!ctx) return

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          const dpr = Math.min(window.devicePixelRatio || 1, 2)

          boundsRef.current = {
            width,
            height,
            cx: width / 2,
            cy: height / 2,
          }

          canvas.width = width * dpr
          canvas.height = height * dpr
          canvas.style.width = `${width}px`
          canvas.style.height = `${height}px`

          ctx.setTransform(1, 0, 0, 1, 0, 0)
          ctx.scale(dpr, dpr)

          initParticles()
        }
      })

      observer.observe(container)
      return () => observer.disconnect()
    }, [initParticles, transparent])

    // Main animation render loop
    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d", { alpha: transparent })
      if (!ctx) return

      let animId = 0
      let rotation = 0

      const render = () => {
        if (!isRunning) {
          animId = requestAnimationFrame(render)
          return
        }

        rotation += 0.002
        const { width, height, cx, cy } = boundsRef.current
        const particles = particlesRef.current
        const pointer = pointerRef.current

        // Determine color palette
        const isDark =
          theme === "dark" ||
          (theme === "auto" &&
            (document.documentElement.classList.contains("dark") ||
              (typeof document !== "undefined" && document.body?.classList.contains("dark")) ||
              (typeof window !== "undefined" &&
                window.matchMedia?.("(prefers-color-scheme: dark)").matches)))

        const bgFill = transparent ? null : isDark ? "#09090b" : "#fafafa"
        const defaultParticleColor = particleColor || (isDark ? "#ffffff" : "#1a1a1a")
        const rgbConstellation = isDark ? "255, 255, 255" : "30, 30, 30"
        const accent = accentColor || (isDark ? "#ffffff" : "#ba1f1f")

        // Clear frame
        if (transparent) {
          ctx.clearRect(0, 0, width, height)
        } else if (bgFill) {
          ctx.fillStyle = bgFill
          ctx.fillRect(0, 0, width, height)
        }

        // Update shockwaves
        for (let i = pointer.shockwaves.length - 1; i >= 0; i--) {
          const sw = pointer.shockwaves[i]
          sw.radius += 14
          sw.strength *= 0.93

          // Draw visual shockwave ring
          ctx.save()
          ctx.beginPath()
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
          ctx.strokeStyle = accent
          ctx.globalAlpha = Math.min(1, sw.strength * 0.75)
          ctx.lineWidth = Math.max(1, sw.strength * 2.5)
          ctx.stroke()
          ctx.restore()

          if (sw.radius > sw.maxRadius || sw.strength < 0.01) {
            pointer.shockwaves.splice(i, 1)
          }
        }

        // Update particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const currentAngle = p.angle + rotation * (1 + 100 / (p.distance + 100))

          p.baseX = cx + Math.cos(currentAngle) * p.distance
          p.baseY = cy + Math.sin(currentAngle) * p.distance

          const dx = p.baseX - p.x
          const dy = p.baseY - p.y
          p.vx += dx * 0.02
          p.vy += dy * 0.02

          // Pointer repulsion / attraction
          const pdx = p.x - pointer.x
          const pdy = p.y - pointer.y
          const dist = Math.sqrt(pdx * pdx + pdy * pdy)

          if (dist < pointer.radius && dist > 0) {
            const force = (pointer.radius - dist) / pointer.radius
            const sign = pointer.isDown ? -0.6 : 1.6
            p.vx += (pdx / dist) * force * sign
            p.vy += (pdy / dist) * force * sign
            p.excitation = Math.max(p.excitation, force)
          }

          // Shockwave deflection
          for (let j = 0; j < pointer.shockwaves.length; j++) {
            const sw = pointer.shockwaves[j]
            const swdx = p.x - sw.x
            const swdy = p.y - sw.y
            const swDist = Math.sqrt(swdx * swdx + swdy * swdy)
            const delta = Math.abs(swDist - sw.radius)

            if (delta < 32) {
              const push = (1 - delta / 32) * sw.strength * 16
              p.vx += (swdx / (swDist || 1)) * push
              p.vy += (swdy / (swDist || 1)) * push
              p.excitation = Math.max(p.excitation, 1)
            }
          }

          p.vx *= 0.88
          p.vy *= 0.88
          p.x += p.vx
          p.y += p.vy
          p.excitation *= 0.95
        }

        // Render constellation connection lines
        const maxConnectDistSq = 3600 // 60px distance squared
        ctx.lineWidth = 0.65

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i]
          const neighborLimit = Math.min(particles.length, i + 15)

          for (let j = i + 1; j < neighborLimit; j++) {
            const p2 = particles[j]
            const ldx = p1.x - p2.x
            const ldy = p1.y - p2.y
            const distSq = ldx * ldx + ldy * ldy

            if (distSq < maxConnectDistSq) {
              const d = Math.sqrt(distSq)
              const proximityAlpha = 1 - d / 60
              const maxExcitation = Math.max(p1.excitation, p2.excitation)
              const finalAlpha = Math.min(1, proximityAlpha * 0.22 + maxExcitation * 0.5)

              ctx.strokeStyle = `rgba(${rgbConstellation}, ${finalAlpha})`
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }

        // Render particles & excitation glow auras
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const renderSize = p.size + p.excitation * 2.5

          ctx.fillStyle = p.excitation > 0.4 ? accent : defaultParticleColor

          if (p.excitation > 0.25) {
            ctx.save()
            ctx.globalAlpha = p.excitation * 0.45
            ctx.fillStyle = accent
            ctx.beginPath()
            ctx.arc(p.x, p.y, renderSize * 3, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }

          ctx.beginPath()
          ctx.arc(p.x, p.y, renderSize, 0, Math.PI * 2)
          ctx.fill()
        }

        animId = requestAnimationFrame(render)
      }

      animId = requestAnimationFrame(render)
      return () => cancelAnimationFrame(animId)
    }, [isRunning, transparent, theme, accentColor, particleColor])

    // Mouse / Pointer handlers
    const handlePointerMove = (
      e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
    ) => {
      if (!interactive) return
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      pointerRef.current.x = e.clientX - rect.left
      pointerRef.current.y = e.clientY - rect.top
    }

    const handlePointerDown = (
      e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
    ) => {
      if (!interactive) return
      const container = containerRef.current
      if (!container) return
      pointerRef.current.isDown = true
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      pointerRef.current.shockwaves.push({
        x,
        y,
        radius: 10,
        maxRadius: 220,
        strength: 0.85,
      })
    }

    const handlePointerUp = () => {
      pointerRef.current.isDown = false
    }

    const handlePointerLeave = () => {
      pointerRef.current.x = -2000
      pointerRef.current.y = -2000
      pointerRef.current.isDown = false
    }

    const triggerCentralPulse = () => {
      const { cx, cy, width, height } = boundsRef.current
      pointerRef.current.shockwaves.push({
        x: cx,
        y: cy,
        radius: 10,
        maxRadius: Math.max(width, height) * 0.85,
        strength: 1.5,
      })
    }

    return (
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerLeave}
        className={cn(
          "group relative flex h-full w-full select-none flex-col justify-between overflow-hidden rounded-2xl",
          !transparent &&
            "border border-neutral-200 bg-neutral-50 shadow-sm transition-colors duration-700 dark:border-neutral-800 dark:bg-[#09090b]",
          className
        )}
      >
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute inset-0 block h-full w-full",
            interactive ? "cursor-crosshair pointer-events-auto" : "pointer-events-none"
          )}
        />

        {(showControls || showHeadline) && (
          <div className="relative z-20 flex h-full w-full flex-col justify-between p-5 md:p-8 pointer-events-none">
            {/* Top Header Controls */}
            {showControls ? (
              <header className="flex w-full items-center justify-between font-mono text-[11px] text-neutral-600 dark:text-neutral-400 pointer-events-auto">
                <div className="flex items-center gap-3">
                  <span className="relative flex size-2">
                    {isRunning && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-900 opacity-60 dark:bg-white" />
                    )}
                    <span className="relative inline-flex size-2 rounded-full bg-neutral-900 dark:bg-white" />
                  </span>
                  <span className="font-semibold tracking-wider text-neutral-900 uppercase dark:text-neutral-100">
                    {tagline}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={triggerCentralPulse}
                    className="flex items-center gap-1 rounded-lg border border-neutral-300/80 bg-white/70 px-2.5 py-1.5 backdrop-blur-md transition-all hover:bg-neutral-100 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:bg-neutral-800 cursor-pointer"
                    title="Trigger Shockwave"
                  >
                    <Zap className="size-3 text-neutral-800 dark:text-neutral-200" />
                    <span className="hidden sm:inline font-mono text-[10px]">PULSE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRunning((prev) => !prev)}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-300/80 bg-white/70 px-2.5 py-1.5 backdrop-blur-md transition-all hover:bg-neutral-100 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:bg-neutral-800 cursor-pointer"
                  >
                    {isRunning ? <Pause className="size-3" /> : <Play className="size-3" />}
                    <span className="font-mono text-[10px]">{isRunning ? "FREEZE" : "RUN"}</span>
                  </button>
                </div>
              </header>
            ) : (
              <div />
            )}

            {/* Center Headline */}
            {showHeadline && (
              <main className="flex flex-col items-center justify-center text-center mix-blend-difference opacity-90 dark:mix-blend-normal">
                <h1 className="font-mono text-5xl font-black tracking-tighter uppercase sm:text-7xl md:text-9xl text-neutral-900 dark:text-white pointer-events-none">
                  {headline}
                </h1>
              </main>
            )}

            <div className="h-4 w-full" />
          </div>
        )}
      </div>
    )
  }
)

QuantumSwarm.displayName = "QuantumSwarm"

export default QuantumSwarm