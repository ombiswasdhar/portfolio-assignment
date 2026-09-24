import React from 'react'
import mentorsityLogo from '../assets/nav/mentorsity_logo.png'
import playStaplesLogo from '../assets/nav/play_staples_logo.png'

const DEFAULT_ROLES = [
  'UI/UX DESIGNER',
  'GRAPHIC DESIGNER',
  'ILLUSTRATOR',
  'CHARACTER DESIGNER',
  'VISUAL ARTIST',
  'PRODUCT DESIGNER',
]

export default function MarqueeBar({
  className = '',
  direction = 'left',
  reverse = false,
  variant = 'logos',
  items,
}) {
  const isReverse = direction === 'right' || reverse
  const isRoles = variant === 'roles'

  const rolesList = items && items.length > 0 ? items : DEFAULT_ROLES

  // Roles cell rendering
  const renderRoleCell = (role, key) => (
    <div
      key={key}
      className="flex items-center gap-3 sm:gap-4 px-5 sm:px-7 h-full border-r border-black/15 hover:bg-neutral-100/80 transition-all duration-200 group/role cursor-pointer shrink-0"
    >
      <span className="font-akira font-black text-[10px] sm:text-[11px] md:text-xs tracking-wider uppercase text-neutral-900 group-hover/role:text-[#DE2020] transition-colors">
        {role}
      </span>
      <span className="text-[#DE2020] text-xs font-bold shrink-0 drop-shadow-[0_0_6px_rgba(222,32,32,0.4)]">
        ✦
      </span>
    </div>
  )

  // Logos cell rendering
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

  // Duplication counts for seamless infinite loop
  const roleCycles = [0, 1, 2] // 3 repeats of the roles array per half
  const logoCycles = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div
      aria-label={isRoles ? 'Creative Roles Animated Marquee Bar' : 'Partner Logos Animated Marquee Bar'}
      className={`relative w-full h-9 bg-white text-black border-b border-black select-none flex items-stretch overflow-hidden shadow-xs ${className}`}
    >
      {/* Soft edge gradient fades for smooth edge entry and exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 z-10 bg-gradient-to-l from-white to-transparent" />

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden h-full flex items-center">
        <div className={`${isReverse ? 'animate-marquee-scroll-reverse' : 'animate-marquee-scroll'} flex items-center h-full`}>
          {/* Half 1 */}
          <div className="flex items-center h-full shrink-0">
            {isRoles
              ? roleCycles.map((cycleIdx) =>
                  rolesList.map((role, rIdx) => renderRoleCell(role, `h1-${cycleIdx}-${rIdx}`))
                )
              : logoCycles.map((idx) => renderLogoPair(`h1-${idx}`))}
          </div>

          {/* Half 2 (Exact duplicate for seamless infinite loop) */}
          <div className="flex items-center h-full shrink-0" aria-hidden="true">
            {isRoles
              ? roleCycles.map((cycleIdx) =>
                  rolesList.map((role, rIdx) => renderRoleCell(role, `h2-${cycleIdx}-${rIdx}`))
                )
              : logoCycles.map((idx) => renderLogoPair(`h2-${idx}`))}
          </div>
        </div>
      </div>
    </div>
  )
}
