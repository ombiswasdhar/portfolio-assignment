"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"

import layer1Img from "@/assets/hero/layer1.webp"
import layer2Img from "@/assets/hero/layer2.webp"
import layer4Img from "@/assets/hero/layer4.webp"

const PARALLAX_STYLES = `
  .parallax { position: relative; width: 100%; overflow: hidden; background: #000; color: #fff; }
  .parallax__header { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; min-height: 100svh; padding: 6em 1em 10em 1em; }
  .parallax__visuals { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 100%; min-width: 100%; height: 120%; }
  .parallax__black-line-overflow { position: absolute; bottom: -1px; left: 0; z-index: 20; width: 100%; height: 2px; background-color: #000; }
  .parallax__layers { position: absolute; top: 0; left: 0; width: 100%; max-width: none; height: 100%; overflow: hidden; }
  .parallax__layer-img { position: absolute; top: -17.5%; left: 0; width: 100%; max-width: none; height: 117.5%; object-fit: cover; pointer-events: none; }
  .parallax__layer-title { position: absolute; top: 0; left: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100svh; pointer-events: none; }
  .parallax__title { position: relative; margin: 0; font-size: clamp(2.8rem, 10vw, 8.5rem); font-weight: 900; line-height: 0.95; text-align: center; letter-spacing: -0.03em; pointer-events: auto; text-transform: uppercase; }
  .parallax__fade { position: absolute; bottom: 0; left: 0; z-index: 30; width: 100%; height: 32%; background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 60%, #000 100%); pointer-events: none; }
  .parallax__content { position: relative; width: 100%; z-index: 31; }
`

interface ParallaxComponentProps {
  id?: string
  title?: React.ReactNode
  subtitle?: React.ReactNode
  topBadge?: React.ReactNode
  bottomContent?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function ParallaxComponent({
  id = "hero",
  title = "OMİ'S BRAIN",
  subtitle,
  topBadge,
  bottomContent,
  children,
  className = "",
}: ParallaxComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const layersEl = containerRef.current?.querySelector("[data-parallax-layers]")
    
    let ctx = gsap.context(() => {
      if (layersEl) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: layersEl,
            start: "0% 0%",
            end: "100% 0%",
            scrub: 0,
          },
        })

        const layers = [
          { layer: "1", yPercent: 70 },
          { layer: "2", yPercent: 55 },
          { layer: "3", yPercent: 40 },
          { layer: "4", yPercent: 10 },
        ]

        layers.forEach((l, idx) => {
          timeline.to(
            layersEl.querySelectorAll(`[data-parallax-layer="${l.layer}"]`),
            { yPercent: l.yPercent, ease: "none" },
            idx === 0 ? undefined : "<"
          )
        })
      }
    }, containerRef)

    // Lenis smooth inertial scrolling integration
    let lenis: Lenis | null = null
    let tickerCallback: ((time: number) => void) | null = null
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      lenis.on("scroll", ScrollTrigger.update)
      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000)
      }
      gsap.ticker.add(tickerCallback)
      gsap.ticker.lagSmoothing(0)
    } catch (e) {
      console.warn("Lenis init fallback:", e)
    }

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      if (layersEl) gsap.killTweensOf(layersEl)
      if (tickerCallback) gsap.ticker.remove(tickerCallback)
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [])

  return (
    <div id={id} className={`parallax ${className}`} ref={containerRef}>
      <style dangerouslySetInnerHTML={{ __html: PARALLAX_STYLES }} />
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" />
          <div data-parallax-layers className="parallax__layers">
            {/* Layer 1: Distant Sky & Far Peaks */}
            <img
              src={layer1Img}
              loading="eager"
              width="1920"
              height="1080"
              data-parallax-layer="1"
              alt="Distant horizon"
              className="parallax__layer-img"
            />

            {/* Layer 2: Midground Mountain Range */}
            <img
              src={layer2Img}
              loading="eager"
              width="1920"
              height="1080"
              data-parallax-layer="2"
              alt="Midground mountain range"
              className="parallax__layer-img"
            />

            {/* Layer 3: Giant Parallax Hero Title (sandwiched between mountain layers!) */}
            <div data-parallax-layer="3" className="parallax__layer-title">
              {topBadge && (
                <div className="mb-2.5 sm:mb-4 pointer-events-auto">
                  {topBadge}
                </div>
              )}
              <h1 className="parallax__title font-akira drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
                {title}
              </h1>
              {subtitle && (
                <div className="mt-2.5 sm:mt-4 pointer-events-auto max-w-xl text-center px-4">
                  {subtitle}
                </div>
              )}
            </div>

            {/* Layer 4: Foreground Dramatic Mountain Cut (overlaps title on scroll) */}
            <img
              src={layer4Img}
              loading="eager"
              width="1920"
              height="1080"
              data-parallax-layer="4"
              alt="Foreground mountain ridge"
              className="parallax__layer-img"
            />
          </div>

          {/* Smooth dark gradient fade into the content below */}
          <div className="parallax__fade" />

          {/* Ambient Scroll Cue Indicator */}
          <a
            href="#hero-showcase"
            aria-label="Scroll to portfolio centerpiece"
            className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-35 pointer-events-auto flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-all duration-300 group select-none"
          >
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase opacity-75 group-hover:opacity-100 transition-opacity">
              Scroll to explore
            </span>
            <svg
              className="w-4 h-4 animate-bounce text-white/70 group-hover:text-[#BA1F1F] transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="7 13 12 18 17 13" />
              <polyline points="7 6 12 11 17 6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Parallax Content Container */}
      {(children || bottomContent) && (
        <section className="parallax__content">
          {children || bottomContent}
        </section>
      )}
    </div>
  )
}

export default ParallaxComponent
