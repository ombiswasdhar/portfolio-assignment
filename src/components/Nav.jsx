import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const screenItems = [
  {
    name: 'Home',
    path: '/',
    id: 'home',
    number: '01',
    screenIndex: 0,
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M4 10.5L12 3.5L20 10.5V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V10.5Z" />
        <line x1="12" y1="16" x2="12" y2="18.5" />
      </svg>
    ),
  },
  {
    name: 'About Me',
    path: '/#about',
    id: 'about',
    number: '02',
    screenIndex: 1,
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="7.5" r="4" />
        <path d="M5 20.5C5 16.5 8.2 14 12 14C15.8 14 19 16.5 19 20.5" />
      </svg>
    ),
  },
  {
    name: 'Skills',
    path: '/#skills',
    id: 'skills',
    number: '03',
    screenIndex: 2,
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2L2 7L12 12L22 7L12 2Z" />
        <path d="M2 17L12 22L22 17" />
        <path d="M2 12L12 17L22 12" />
      </svg>
    ),
  },
  {
    name: 'Work',
    path: '/#work',
    id: 'work',
    number: '04',
    screenIndex: 3,
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect x="2.5" y="7" width="19" height="13.5" rx="2.5" />
        <path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7" />
        <line x1="12" y1="12" x2="12" y2="14" />
      </svg>
    ),
  },
]

const pageItems = [
  {
    name: 'CV / Resume',
    path: '/cv',
    id: 'cv',
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    name: 'Contact',
    path: '/contact',
    id: 'contact',
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M21 15C21 16.1 20.1 17 19 17H7L3 21V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V15Z" />
        <line x1="8" y1="9" x2="16" y2="9" />
        <line x1="8" y1="13" x2="13" y2="13" />
      </svg>
    ),
  },
]

export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('home')
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0)
  const [scrollMode, setScrollMode] = useState('deck') // 'deck' | 'free'
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname.replace('/', ''))
      return
    }

    // Scroll spy: check if scrolled down to #about, #skills, or #work in free scroll
    const handleScroll = () => {
      const workEl = document.getElementById('work')
      const skillsEl = document.getElementById('skills')
      const aboutEl = document.getElementById('about')

      if (workEl && workEl.getBoundingClientRect().top <= 350) {
        setActiveSection('work')
        setCurrentScreenIndex(3)
      } else if (skillsEl && skillsEl.getBoundingClientRect().top <= 350) {
        setActiveSection('skills')
        setCurrentScreenIndex(2)
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= 350) {
        setActiveSection('about')
        setCurrentScreenIndex(1)
      } else {
        setActiveSection('home')
        setCurrentScreenIndex(0)
      }
    }

    const handleDeckScreenChange = (e) => {
      const screenId = e.detail?.screenId
      if (screenId) {
        setActiveSection(screenId === 'hero' ? 'home' : screenId)
      }
      if (e.detail?.screenIndex !== undefined) {
        setCurrentScreenIndex(e.detail.screenIndex)
      }
      if (e.detail?.scrollMode) {
        setScrollMode(e.detail.scrollMode)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('deck-screen-change', handleDeckScreenChange)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('deck-screen-change', handleDeckScreenChange)
    }
  }, [location])

  const handleToggleMode = (e) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('nav-toggle-mode'))
  }

  const handleClick = (e, item) => {
    // Notify ScreenDeckLayout of navigation
    window.dispatchEvent(new CustomEvent('nav-screen-change', { detail: { screenId: item.id } }))

    if (item.id === 'work') {
      e.preventDefault()
      if (location.pathname === '/') {
        const el = document.getElementById('work')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          window.history.pushState(null, '', '/#work')
          setActiveSection('work')
          setCurrentScreenIndex(3)
        }
      } else {
        navigate('/#work')
      }
      return
    }

    if (item.id === 'about') {
      e.preventDefault()
      if (location.pathname === '/') {
        const el = document.getElementById('about')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          window.history.pushState(null, '', '/#about')
          setActiveSection('about')
          setCurrentScreenIndex(1)
        }
      } else {
        navigate('/#about')
      }
      return
    }

    if (item.id === 'skills') {
      e.preventDefault()
      if (location.pathname === '/') {
        const el = document.getElementById('skills')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          window.history.pushState(null, '', '/#skills')
          setActiveSection('skills')
          setCurrentScreenIndex(2)
        }
      } else {
        navigate('/#skills')
      }
      return
    }

    if (item.id === 'cv') {
      if (location.pathname === '/cv') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (item.id === 'home') {
      if (location.pathname === '/') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.pushState(null, '', '/')
        setActiveSection('home')
        setCurrentScreenIndex(0)
      }
    }
  }

  return (
    <header className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none select-none">
      <nav
        aria-label="Unified Navigation and Progress Dock"
        className="pointer-events-auto flex flex-col items-center gap-2 rounded-[26px] sm:rounded-[30px] bg-black/85 backdrop-blur-xl p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/15 ring-1 ring-white/5 transition-all duration-300"
      >
        {/* Mode Switcher Pill (Home page only) */}
        {isHomePage && (
          <button
            type="button"
            onClick={handleToggleMode}
            title={`Toggle view mode: ${scrollMode === 'deck' ? 'Deck Snap' : 'Free Scroll'}`}
            className="group flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 text-[10px] font-mono text-neutral-300 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA1F1F] animate-pulse" />
            <span className="text-[9px] font-bold tracking-wider text-neutral-300 group-hover:text-white">
              {scrollMode === 'deck' ? 'SNAP' : 'FLOW'}
            </span>
          </button>
        )}

        {/* ================= SCREEN ITEMS + VERTICAL LASER PROGRESS BAR ================= */}
        <div className="relative flex flex-col items-center gap-1.5 sm:gap-2">
          {/* Vertical Laser Track along the left side */}
          {isHomePage && (
            <div
              className="absolute left-[3px] top-3.5 bottom-3.5 w-[2px] bg-white/10 rounded-full pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="w-full bg-[#BA1F1F] rounded-full shadow-[0_0_10px_#ba1f1f] transition-all duration-500 ease-out"
                style={{
                  height: `${(currentScreenIndex / (screenItems.length - 1)) * 100}%`,
                }}
              />
            </div>
          )}

          {screenItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleClick(e, item)}
                aria-label={`${item.number} ${item.name}`}
                className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 ease-out no-underline select-none ${
                  isActive
                    ? 'bg-[#BA1F1F] text-white shadow-[0_4px_16px_rgba(186,31,31,0.55)] scale-105'
                    : 'text-neutral-400 hover:text-white hover:bg-white/10 active:scale-95'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

                {/* Tooltip popping to the RIGHT */}
                <span className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-950/95 text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 shadow-xl border border-white/15 backdrop-blur-md hidden sm:flex items-center gap-2 z-50">
                  <span className="text-[#BA1F1F] font-mono text-[10px] font-bold">
                    {item.number}
                  </span>
                  <span className="font-display font-medium text-[11px] tracking-wide">
                    {item.name}
                  </span>
                </span>
              </Link>
            )
          })}
        </div>

        {/* Hairline Divider between screens & external pages */}
        <div className="w-5 h-[1px] bg-white/15 my-0.5" aria-hidden="true" />

        {/* ================= EXTERNAL PAGE ROUTES (Work, Contact) ================= */}
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          {pageItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleClick(e, item)}
                aria-label={item.name}
                className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 ease-out no-underline select-none ${
                  isActive
                    ? 'bg-[#BA1F1F] text-white shadow-[0_4px_16px_rgba(186,31,31,0.55)] scale-105'
                    : 'text-neutral-400 hover:text-white hover:bg-white/10 active:scale-95'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

                {/* Tooltip popping to the RIGHT */}
                <span className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-950/95 text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 shadow-xl border border-white/15 backdrop-blur-md hidden sm:block z-50 font-display text-[11px]">
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Keyboard Navigation Hint (Deck mode only) */}
        {isHomePage && scrollMode === 'deck' && (
          <div className="hidden sm:flex items-center gap-1 pt-1 opacity-50 hover:opacity-100 transition-opacity text-[8px] font-mono text-neutral-400">
            <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↑</kbd>
            <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↓</kbd>
          </div>
        )}
      </nav>
    </header>
  )
}
