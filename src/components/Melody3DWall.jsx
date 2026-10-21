import React from 'react'
import { Marquee } from '@/components/ui/3d-testimonails'
import melodyCheckout from '../assets/work/melody/melody_checkout.png'
import melodyEvents from '../assets/work/melody/melody_events.jpg'
import melodyAbout from '../assets/work/melody/melody_about.jpg'
import melodyArtists from '../assets/work/melody/melody_artists.png'

const col1 = [
  { id: 'c1-1', title: 'Upcoming Events', tag: 'Live Stage', img: melodyEvents },
  { id: 'c1-2', title: 'Order & Checkout', tag: 'Fast Funnel', img: melodyCheckout },
  { id: 'c1-3', title: 'Metallica Lineup', tag: 'Artists', img: melodyArtists },
  { id: 'c1-4', title: 'Thank You & About', tag: 'Celebration', img: melodyAbout },
]

const col2 = [
  { id: 'c2-1', title: 'Metallica Lineup', tag: 'Artists', img: melodyArtists },
  { id: 'c2-2', title: 'Thank You & About', tag: 'Celebration', img: melodyAbout },
  { id: 'c2-3', title: 'Upcoming Events', tag: 'Live Stage', img: melodyEvents },
  { id: 'c2-4', title: 'Order & Checkout', tag: 'Fast Funnel', img: melodyCheckout },
]

function MelodyCard({ item }) {
  return (
    <div className="w-[195px] sm:w-[225px] md:w-[255px] rounded-2xl overflow-hidden border border-white/20 bg-neutral-900 shadow-[0_16px_40px_rgba(0,0,0,0.75)] transition-transform duration-300 hover:scale-105 shrink-0 group/card will-change-transform">
      <div className="relative aspect-[16/10.5] w-full overflow-hidden bg-neutral-950">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-500 group-hover/card:scale-105"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
          <span className="text-[11px] sm:text-xs font-fredoka font-semibold text-white truncate drop-shadow-md">
            {item.title}
          </span>
          <span className="text-[9px] font-fredoka font-bold text-[#FF6584] uppercase tracking-wider bg-black/75 px-1.5 py-0.5 rounded shrink-0 border border-white/15">
            {item.tag}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Melody3DWall({ className = '', isPaused = false }) {
  const containerRef = React.useRef(null)
  const [isInView, setIsInView] = React.useState(true)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { rootMargin: '250px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const shouldPause = isPaused || !isInView

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden bg-[#090710] flex items-center justify-center [perspective:420px] select-none ${className}`}
    >
      {/* Dynamic concert stage lighting aura in background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-55 -z-0"
        style={{
          background:
            'radial-gradient(circle at 40% 30%, rgba(139,125,232,0.5) 0%, transparent 60%), radial-gradient(circle at 75% 70%, rgba(255,101,132,0.4) 0%, transparent 55%)',
        }}
      />

      {/* 3D Angled Wall Transform - Zoomed in closer with fewer large screens */}
      <div
        className="flex flex-row items-center gap-3.5 sm:gap-4.5 z-10 shrink-0 will-change-transform"
        style={{
          transform:
            'translateX(-10px) translateY(0px) translateZ(10px) scale(1.15) rotateX(18deg) rotateY(-8deg) rotateZ(16deg)',
        }}
      >
        {/* Column 1: Downwards */}
        <Marquee
          vertical
          pauseOnHover
          repeat={4}
          className={`[--duration:24s] [--gap:0.9rem] ${shouldPause ? '[&_.animate-marquee-vertical]:[animation-play-state:paused]' : ''}`}
        >
          {col1.map((item) => (
            <MelodyCard key={item.id} item={item} />
          ))}
        </Marquee>

        {/* Column 2: Upwards (reverse) */}
        <Marquee
          vertical
          pauseOnHover
          reverse
          repeat={4}
          className={`[--duration:20s] [--gap:0.9rem] ${shouldPause ? '[&_.animate-marquee-vertical]:[animation-play-state:paused]' : ''}`}
        >
          {col2.map((item) => (
            <MelodyCard key={item.id} item={item} />
          ))}
        </Marquee>
      </div>

      {/* Vignette Overlays matching 3d-testimonails */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#090710] via-[#090710]/70 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#090710] via-[#090710]/70 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#090710] via-[#090710]/60 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#090710] via-[#090710]/60 to-transparent z-20" />
    </div>
  )
}
