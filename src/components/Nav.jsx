import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import monogramTopRight from '../assets/skills/monogram_top_right.png'

const navItems = [
  { id: 'home', number: '01', name: 'Home', path: '/' },
  { id: 'about', number: '02', name: 'About', path: '/#about' },
  { id: 'skills', number: '03', name: 'Skills', path: '/#skills' },
  { id: 'work', number: '04', name: 'Work', path: '/#work' },
  { id: 'cv', number: '05', name: 'CV', path: '/cv' },
  { id: 'contact', number: '06', name: 'Contact', path: '/contact' },
]

export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()

  const [scrollSection, setScrollSection] = useState('home')

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
        setScrollSection('home')
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

    if (item.id === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.pushState(null, '', '/')
        setScrollSection('home')
      } else {
        navigate('/')
      }
      return
    }

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
      {/* DESKTOP LEFT SIDEBAR DOCK (KRIS NORD STYLE CAPSULES) - SHOWN ON LG+ */}
      {/* ========================================================================= */}
      <aside
        aria-label="Sidebar Navigation"
        className="hidden lg:flex fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-50 flex-col items-start gap-2 select-none pointer-events-auto"
      >
        {/* Top Branding / Monogram Card */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              window.history.pushState(null, '', '/')
              setScrollSection('home')
            }
          }}
          className="w-[154px] h-[46px] rounded-[22px] bg-[#0E0E12]/90 hover:bg-[#15151C] backdrop-blur-xl border border-white/15 hover:border-white/30 px-3.5 flex items-center justify-between shadow-lg shadow-black/60 group transition-all duration-300 ease-out active:scale-95 mb-1 cursor-pointer"
          title="Om Biswas — Back to top"
        >
          <div className="flex items-center gap-2">
            <img
              src={monogramTopRight}
              alt="Om Biswas Monogram"
              className="w-4 h-4 object-contain filter invert opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all"
            />
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold group-hover:text-white transition-colors">
              OM BISWAS
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          </div>
        </Link>

        {/* Column of Numbered Pill Tabs (01 Home ... 06 Contact) */}
        <nav className="flex flex-col gap-1.5 w-[154px]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={(e) => handleClick(e, item)}
                className={`group relative w-full h-[46px] rounded-[22px] px-4 flex items-center justify-between no-underline select-none transition-all duration-300 ease-out ${
                  isActive
                    ? 'bg-white text-black shadow-[0_6px_25px_rgba(255,255,255,0.25)] border border-white scale-[1.02] translate-x-1 font-bold z-10'
                    : 'bg-[#0E0E12]/80 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 hover:border-white/25 backdrop-blur-xl hover:translate-x-1.5 active:scale-95 shadow-md shadow-black/40'
                }`}
                aria-label={`${item.number} ${item.name}`}
              >
                {/* Left: Number */}
                <span
                  className={`font-mono text-xs transition-colors ${
                    isActive ? 'text-black font-bold' : 'text-neutral-500 group-hover:text-neutral-300 font-semibold'
                  }`}
                >
                  {item.number}
                </span>

                {/* Center: Label */}
                <span
                  className={`font-display text-xs tracking-wide transition-colors ${
                    isActive ? 'text-black font-bold' : 'text-neutral-200 group-hover:text-white font-medium'
                  }`}
                >
                  {item.name}
                </span>

                {/* Right: Toggle / Dot Indicator (Kris Nord signature element) */}
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#BA1F1F] shadow-[0_0_8px_rgba(186,31,31,0.85)] scale-100'
                      : 'bg-white/20 group-hover:bg-white/60 opacity-40 group-hover:opacity-100 scale-75 group-hover:scale-100'
                  }`}
                />
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET FLOATING DOCK (KRIS NORD PHONE MENU) - SHOWN ON < LG */}
      {/* ========================================================================= */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="lg:hidden fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-20px)] sm:max-w-md p-1.5 rounded-[26px] bg-[#0E0E12]/92 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex items-center justify-center gap-1 overflow-x-auto no-scrollbar pointer-events-auto select-none"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={(e) => handleClick(e, item)}
              className={`group shrink-0 h-9 rounded-[18px] px-3 flex items-center gap-1.5 no-underline transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? 'bg-white text-black font-bold shadow-md shadow-white/20 scale-105'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10 font-medium'
              }`}
              aria-label={`${item.number} ${item.name}`}
            >
              <span
                className={`font-mono text-[10px] transition-colors ${
                  isActive ? 'text-neutral-600 font-bold' : 'text-neutral-500'
                }`}
              >
                {item.number}
              </span>
              <span
                className={`font-display text-xs tracking-wide ${
                  isActive ? 'text-black font-bold' : 'text-neutral-300'
                }`}
              >
                {item.name}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#BA1F1F] shrink-0" />
              )}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
