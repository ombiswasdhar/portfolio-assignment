import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  {
    name: 'Home',
    path: '/',
    id: 'home',
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
    name: 'CV',
    path: '/#cv',
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
    name: 'Work',
    path: '/work',
    id: 'work',
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

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname.replace('/', ''))
      return
    }

    // Scroll spy: check if scrolled down to #about, #skills, or #cv
    const handleScroll = () => {
      const cvEl = document.getElementById('cv')
      const skillsEl = document.getElementById('skills')
      const aboutEl = document.getElementById('about')

      if (cvEl && cvEl.getBoundingClientRect().top <= 350) {
        setActiveSection('cv')
      } else if (skillsEl && skillsEl.getBoundingClientRect().top <= 350) {
        setActiveSection('skills')
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= 350) {
        setActiveSection('about')
      } else {
        setActiveSection('home')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location])

  const handleClick = (e, item) => {
    if (item.id === 'about') {
      e.preventDefault()
      if (location.pathname === '/') {
        const el = document.getElementById('about')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          window.history.pushState(null, '', '/#about')
          setActiveSection('about')
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
        }
      } else {
        navigate('/#skills')
      }
      return
    }

    if (item.id === 'cv') {
      e.preventDefault()
      if (location.pathname === '/') {
        const el = document.getElementById('cv')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          window.history.pushState(null, '', '/#cv')
          setActiveSection('cv')
        }
      } else {
        navigate('/#cv')
      }
      return
    }

    if (item.id === 'home') {
      if (location.pathname === '/') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.pushState(null, '', '/')
        setActiveSection('home')
      }
    }
  }

  return (
    <header className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto flex flex-col items-center gap-1.5 sm:gap-2 rounded-full bg-black/85 backdrop-blur-xl p-1.5 sm:p-2 shadow-[0_16px_40px_rgba(0,0,0,0.8)] border border-white/15 ring-1 ring-white/5 transition-all duration-300"
      >
        {navItems.map((item) => {
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
                  ? 'bg-[#BA1F1F] text-white shadow-[0_4px_16px_rgba(186,31,31,0.5)] scale-105'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10 active:scale-95'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

              {/* Tooltip on the left of each nav icon */}
              <span className="pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-950/95 text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-0 translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 shadow-xl border border-white/15 backdrop-blur-md hidden sm:block">
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
