import React from 'react'
import { Marquee } from '@/components/ui/3d-testimonails'
import melodyCheckout from '../assets/work/melody/melody_checkout.png'
import melodyEvents from '../assets/work/melody/melody_events.jpg'
import melodyAbout from '../assets/work/melody/melody_about.jpg'
import melodyArtists from '../assets/work/melody/melody_artists.png'

const col1 = [
  { id: 'c1-1', title: 'Upcoming Events', tag: 'Live Stage', img: melodyEvents },
  { id: 'c1-2', title: 'Order & Checkout', tag: 'Funnel', img: melodyCheckout },
  { id: 'c1-3', title: 'Metallica Lineup', tag: 'Artists', img: melodyArtists },
  { id: 'c1-4', title: 'Confirmation & About', tag: 'Celebration', img: melodyAbout },
]

const col2 = [
  { id: 'c2-1', title: 'Metallica Lineup', tag: 'Artists', img: melodyArtists },
  { id: 'c2-2', title: 'Confirmation & About', tag: 'Celebration', img: melodyAbout },
  { id: 'c2-3', title: 'Upcoming Events', tag: 'Live Stage', img: melodyEvents },
  { id: 'c2-4', title: 'Order & Checkout', tag: 'Funnel', img: melodyCheckout },
]

const col3 = [
  { id: 'c3-1', title: 'Order & Checkout', tag: 'Funnel', img: melodyCheckout },
  { id: 'c3-2', title: 'Upcoming Events', tag: 'Live Stage', img: melodyEvents },
  { id: 'c3-3', title: 'Confirmation & About', tag: 'Celebration', img: melodyAbout },
  { id: 'c3-4', title: 'Metallica Lineup', tag: 'Artists', img: melodyArtists },
]

const col4 = [
  { id: 'c4-1', title: 'Confirmation & About', tag: 'Celebration', img: melodyAbout },
  { id: 'c4-2', title: 'Metallica Lineup', tag: 'Artists', img: melodyArtists },
  { id: 'c4-3', title: 'Order & Checkout', tag: 'Funnel', img: melodyCheckout },
  { id: 'c4-4', title: 'Upcoming Events', tag: 'Live Stage', img: melodyEvents },
]

function MelodyCard({ item }) {
  return (
    <div className="w-[120px] sm:w-[140px] md:w-[155px] rounded-xl overflow-hidden border border-white/20 bg-neutral-900/90 shadow-[0_10px_25px_rgba(0,0,0,0.65)] backdrop-blur-xs transition-transform duration-300 hover:scale-105 shrink-0 group/card">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between gap-1 pointer-events-none">
          <span className="text-[9.5px] font-fredoka font-semibold text-white truncate drop-shadow-md">
            {item.title}
          </span>
          <span className="text-[8px] font-fredoka font-bold text-[#FF6584] uppercase tracking-wider bg-black/70 px-1 py-0.5 rounded shrink-0 border border-white/10">
            {item.tag}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Melody3DWall({ className = '', isPaused = false }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[#0a0812] flex items-center justify-center [perspective:320px] select-none ${className}`}
    >
      {/* Dynamic concert stage lighting aura in background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50 -z-0"
        style={{
          background:
            'radial-gradient(circle at 45% 35%, rgba(139,125,232,0.45) 0%, transparent 60%), radial-gradient(circle at 75% 70%, rgba(255,101,132,0.35) 0%, transparent 55%)',
        }}
      />

      {/* 3D Angled Wall Transform matching uncodeui 3d-testimonails */}
      <div
        className="flex flex-row items-center gap-2.5 sm:gap-3.5 z-10 shrink-0"
        style={{
          transform:
            'translateX(-20px) translateY(0px) translateZ(-45px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
        }}
      >
        {/* Column 1: Downwards */}
        <Marquee
          vertical
          pauseOnHover
          repeat={4}
          className={`[--duration:26s] [--gap:0.75rem] ${isPaused ? '[&_[data-slot]]:[animation-play-state:paused]' : ''}`}
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
          className={`[--duration:22s] [--gap:0.75rem] ${isPaused ? '[&_[data-slot]]:[animation-play-state:paused]' : ''}`}
        >
          {col2.map((item) => (
            <MelodyCard key={item.id} item={item} />
          ))}
        </Marquee>

        {/* Column 3: Downwards */}
        <Marquee
          vertical
          pauseOnHover
          repeat={4}
          className={`[--duration:28s] [--gap:0.75rem] ${isPaused ? '[&_[data-slot]]:[animation-play-state:paused]' : ''}`}
        >
          {col3.map((item) => (
            <MelodyCard key={item.id} item={item} />
          ))}
        </Marquee>

        {/* Column 4: Upwards (reverse) */}
        <Marquee
          vertical
          pauseOnHover
          reverse
          repeat={4}
          className={`[--duration:24s] [--gap:0.75rem] ${isPaused ? '[&_[data-slot]]:[animation-play-state:paused]' : ''}`}
        >
          {col4.map((item) => (
            <MelodyCard key={item.id} item={item} />
          ))}
        </Marquee>
      </div>

      {/* Vignette Overlays matching 3d-testimonails */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0a0812] via-[#0a0812]/70 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0812] via-[#0a0812]/70 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0a0812] via-[#0a0812]/60 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0a0812] via-[#0a0812]/60 to-transparent z-20" />
    </div>
  )
}
