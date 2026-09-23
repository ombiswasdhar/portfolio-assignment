import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import omMonogramImg from '../assets/nav/om_monogram.png'

const navItems = [
  { id: 'about', number: '01', name: 'About', path: '/#about' },
  { id: 'skills', number: '02', name: 'Skills', path: '/#skills' },
  { id: 'work', number: '03', name: 'Work', path: '/#work' },
  { id: 'cv', number: '04', name: 'CV', path: '/cv' },
  { id: 'contact', number: '05', name: 'Contact', path: '/contact' },
]

// Miniature Linocut Sun Icon inspired directly by the woodblock floral stamp
function LinocutSunBadge({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Central circular core */}
      <circle cx="50" cy="50" r="16" />
      {/* Radiating linocut block petals */}
      <path d="M 50 8 C 45 20, 44 26, 50 30 C 56 26, 55 20, 50 8 Z" />
      <path d="M 50 92 C 45 80, 44 74, 50 70 C 56 74, 55 80, 50 92 Z" />
      <path d="M 8 50 C 20 45, 26 44, 30 50 C 26 56, 20 55, 8 50 Z" />
      <path d="M 92 50 C 80 45, 74 44, 70 50 C 74 56, 80 55, 92 50 Z" />
      <path d="M 20 20 C 31 29, 34 33, 38 38 C 33 34, 29 31, 20 20 Z" />
      <path d="M 80 80 C 69 71, 66 67, 62 62 C 67 66, 71 69, 80 80 Z" />
      <path d="M 80 20 C 71 31, 67 34, 62 38 C 66 33, 69 29, 80 20 Z" />
      <path d="M 20 80 C 29 69, 33 66, 38 62 C 34 67, 31 71, 20 80 Z" />
    </svg>
  )
}

export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()

  const [scrollSection, setScrollSection] = useState('')

  // Derive active section directly based on route or scroll position
  const activeSection =
    location.pathname === '/cv'
      ? 'cv'
      : location.pathname === '/contact'
      ? 'contact'
      : scrollSection

  useEffect(() => {
    if (location.pathname !== '/') return

    // Scroll spy: check if scrolled down to #about, #skills, or #work
    const handleScroll = () => {
      const workEl = document.getElementById('work')
      const skillsEl = document.getElementById('skills')
      const aboutEl = document.getElementById('about')

      const threshold = window.innerHeight * 0.45

      if (workEl && workEl.getBoundingClientRect().top <= threshold) {
        setScrollSection('work')
      } else if (skillsEl && skillsEl.getBoundingClientRect().top <= threshold) {
        setScrollSection('skills')
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= threshold) {
        setScrollSection('about')
      } else {
        setScrollSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname])

  const handleClick = (e, item) => {
    // Handling dedicated route pages
    if (item.id === 'cv') {
      if (location.pathname === '/cv') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (item.id === 'contact') {
      if (location.pathname === '/contact') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    e.preventDefault()

    // Scrolling to in-page section on Home
    if (location.pathname === '/') {
      const el = document.getElementById(item.id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', `/#${item.id}`)
        setScrollSection(item.id)
      }
    } else {
      navigate(`/#${item.id}`)
    }
  }

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP ARTISANAL LINOCUT DOCK - FIXED LEFT - SHOWN ON LG+ */}
      {/* ========================================================================= */}
      <aside
        aria-label="Sidebar Navigation"
        className="hidden lg:flex fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-50 flex-col items-start gap-2 select-none pointer-events-auto"
      >
        {/* Top Header Card: Authentic Monogram Badge + Hand-lettered Name */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              window.history.pushState(null, '', '/')
              setScrollSection('')
            }
          }}
          className="w-[200px] h-[58px] rounded-[26px] bg-[#0E0E14]/95 hover:bg-[#161622] backdrop-blur-2xl border border-white/20 hover:border-[#DE2020]/60 px-4 flex items-center justify-between shadow-xl shadow-black/80 group transition-all duration-300 ease-out active:scale-95 mb-2 cursor-pointer"
          title="Om Biswas — Back to top"
        >
          <div className="flex items-center gap-2.5">
            {/* Om Biswas Monogram Badge */}
            <div className="w-8 h-10 shrink-0 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <img
                src={omMonogramImg}
                alt="Om Biswas Monogram"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(222,32,32,0.35)]"
              />
            </div>
            {/* Hand-lettered Name in User's Font - Large and highly visible */}
            <span className="font-myfont text-[26px] text-white tracking-wide font-medium group-hover:text-[#FF4A4A] transition-colors leading-none pt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Om Biswas
            </span>
          </div>

          {/* Glowing vermilion indicator */}
          <span className="w-2.5 h-2.5 rounded-full bg-[#DE2020] shadow-[0_0_10px_#DE2020] animate-pulse shrink-0" />
        </Link>

        {/* Column of Hand-lettered Linocut Pills (01 About ... 05 Contact) */}
        <nav className="flex flex-col gap-1.5 w-[200px]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={(e) => handleClick(e, item)}
                className={`group relative w-full h-[56px] rounded-[26px] px-4 flex items-center justify-between no-underline select-none transition-all duration-300 ease-out ${
                  isActive
                    ? 'bg-[#DE2020] text-white shadow-[0_8px_25px_rgba(222,32,32,0.5),0_1px_0_rgba(255,255,255,0.4)_inset] border border-white/40 scale-[1.03] translate-x-2 z-10'
                    : 'bg-[#0E0E14]/90 hover:bg-[#181826] text-white border border-white/15 hover:border-[#DE2020]/50 backdrop-blur-xl hover:translate-x-1.5 active:scale-95 shadow-md shadow-black/60'
                }`}
                aria-label={`${item.number} ${item.name}`}
              >
                {/* Left: Number */}
                <span
                  className={`font-mono text-[13px] tracking-wider transition-colors ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-neutral-300 group-hover:text-white font-bold'
                  }`}
                >
                  {item.number}
                </span>

                {/* Center: Hand-lettered Label in User's authentic font - Enlarged and high contrast */}
                <span
                  className={`font-myfont tracking-wide transition-colors leading-none pt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                    isActive
                      ? 'text-white text-[28px] font-bold drop-shadow-md'
                      : 'text-white group-hover:text-[#FF4A4A] text-[27px] font-medium'
                  }`}
                >
                  {item.name}
                </span>

                {/* Right: Linocut Floral Sun Badge when active, or glowing vermilion dot on hover */}
                {isActive ? (
                  <span className="text-white shrink-0 animate-spin-slow">
                    <LinocutSunBadge className="w-4 h-4 text-white" />
                  </span>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30 group-hover:bg-[#DE2020] group-hover:shadow-[0_0_8px_#DE2020] group-hover:scale-125 opacity-60 group-hover:opacity-100 transition-all duration-300 shrink-0" />
                )}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET FLOATING DOCK - ARTISANAL LINOCUT STYLE - SHOWN ON < LG */}
      {/* ========================================================================= */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="lg:hidden fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-20px)] sm:max-w-xl p-1.5 rounded-[30px] bg-[#0E0E14]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar pointer-events-auto select-none"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={(e) => handleClick(e, item)}
              className={`group shrink-0 h-12 rounded-[24px] px-4 flex items-center gap-2 no-underline transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? 'bg-[#DE2020] text-white shadow-md shadow-[#DE2020]/50 scale-105'
                  : 'text-neutral-200 hover:text-white hover:bg-white/10'
              }`}
              aria-label={`${item.number} ${item.name}`}
            >
              <span
                className={`font-mono text-[12px] font-bold ${
                  isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                }`}
              >
                {item.number}
              </span>
              <span
                className={`font-myfont text-[23px] pt-1 leading-none tracking-wide drop-shadow-sm ${
                  isActive ? 'text-white font-bold' : 'text-white font-medium'
                }`}
              >
                {item.name}
              </span>
              {isActive && (
                <span className="text-white shrink-0">
                  <LinocutSunBadge className="w-3.5 h-3.5 text-white" />
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
