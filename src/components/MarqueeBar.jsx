import React from 'react'
import mentorsityLogo from '../assets/nav/mentorsity_logo.png'
import playStaplesLogo from '../assets/nav/play_staples_logo.png'

export default function MarqueeBar({ className = '' }) {
  // A single repeating pair: Mentorsity Logo cell + Play Staples Logo cell
  const renderLogoPair = (key) => (
    <React.Fragment key={key}>
      {/* Mentorsity Logo Cell */}
      <div
        className="flex items-center justify-center px-6 sm:px-10 h-full border-r border-black/15 hover:bg-neutral-100/70 transition-all duration-200 group/logo cursor-pointer shrink-0"
        title="Mentorsity"
      >
        <img
          src={mentorsityLogo}
          alt="Mentorsity"
          className="h-4.5 sm:h-5 w-auto object-contain transition-transform duration-300 group-hover/logo:scale-105"
        />
      </div>

      {/* Play Staples Logo Cell */}
      <div
        className="flex items-center justify-center px-6 sm:px-10 h-full border-r border-black/15 hover:bg-neutral-100/70 transition-all duration-200 group/logo cursor-pointer shrink-0"
        title="Play Staples"
      >
        <img
          src={playStaplesLogo}
          alt="Play Staples"
          className="h-4.5 sm:h-5 w-auto object-contain transition-transform duration-300 group-hover/logo:scale-105"
        />
      </div>
    </React.Fragment>
  )

  // Repeat the 2-logo pair 8 times per half for a completely seamless infinite loop
  const loopCount = 8
  const loopIndexes = Array.from({ length: loopCount }, (_, i) => i)

  return (
    <div
      aria-label="Partner Logos Animated Marquee Bar"
      className={`relative w-full h-9 bg-white text-black border-b border-black select-none flex items-stretch overflow-hidden shadow-xs ${className}`}
    >
      {/* Soft edge gradient fades for smooth edge entry and exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 z-10 bg-gradient-to-l from-white to-transparent" />

      {/* Infinite Scrolling Track (Duplicated 2-half loop for seamless translateX -50%) */}
      <div className="relative w-full overflow-hidden h-full flex items-center">
        <div className="animate-marquee-scroll flex items-center h-full">
          {/* Half 1 */}
          <div className="flex items-center h-full shrink-0">
            {loopIndexes.map((idx) => renderLogoPair(`h1-${idx}`))}
          </div>

          {/* Half 2 (Exact duplicate for seamless infinite loop) */}
          <div className="flex items-center h-full shrink-0" aria-hidden="true">
            {loopIndexes.map((idx) => renderLogoPair(`h2-${idx}`))}
          </div>
        </div>
      </div>
    </div>
  )
}
