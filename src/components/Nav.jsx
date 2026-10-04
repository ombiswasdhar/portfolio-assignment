import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home,
  User,
  Zap,
  Briefcase,
  FileText,
} from 'lucide-react'
import omMonogramImg from '../assets/nav/om_monogram.png'
import MarqueeBar from './MarqueeBar'
import SparklesText from './ui/sparkles-text'
import LiquidButton from './ui/liquid-button'

const primaryNavItems = [
  { id: 'about', name: 'About', path: '/#about' },
  { id: 'skills', name: 'Skills', path: '/#skills' },
  { id: 'work', name: 'Work', path: '/#work' },
  { id: 'cv', name: 'CV', path: '/#cv' },
]

const mobileNavItems = [
  { id: 'home', name: 'Home', path: '/#hero', icon: Home },
  { id: 'about', name: 'About', path: '/#about', icon: User },
  { id: 'skills', name: 'Skills', path: '/#skills', icon: Zap },
  { id: 'work', name: 'Work', path: '/#work', icon: Briefcase },
  { id: 'cv', name: 'CV', path: '/#cv', icon: FileText },
]

export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()

  const [scrollSection, setScrollSection] = useState('home')
  const [isLightBg, setIsLightBg] = useState(false)
  const [marqueeOffset, setMarqueeOffset] = useState(0)
  const scrollFrameRef = useRef(0)
  const navigationScrollRef = useRef(null)

  const MARQUEE_HEIGHT = 36 // height in px of the top MarqueeBar

  // Derive active section directly based on route or scroll position
  const activeSection =
    location.pathname === '/contact'
      ? 'contact'
      : scrollSection

  useEffect(() => {
    if (location.pathname === '/contact') {
      setIsLightBg(true)
      return
    }

    if (location.pathname !== '/') {
      setIsLightBg(false)
      return
    }

    // Scroll spy: check current section, background, and scroll position
    const finishNavigationScroll = () => {
      if (!navigationScrollRef.current) return
      window.clearTimeout(navigationScrollRef.current)
      navigationScrollRef.current = null
      handleScroll()
    }

    const handleScroll = () => {
      if (navigationScrollRef.current) {
        window.clearTimeout(navigationScrollRef.current)
        navigationScrollRef.current = window.setTimeout(finishNavigationScroll, 180)
      }
      if (scrollFrameRef.current) return

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = 0
        const nextMarqueeOffset = Math.min(window.scrollY, MARQUEE_HEIGHT)
        setMarqueeOffset((current) => current === nextMarqueeOffset ? current : nextMarqueeOffset)

        if (!navigationScrollRef.current) {
          const cvEl = document.getElementById('cv')
          const workEl = document.getElementById('work') || document.getElementById('featured-works')
          const skillsEl = document.getElementById('skills')
          const aboutEl = document.getElementById('about')

          const threshold = window.innerHeight * 0.45
          const isAtBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 80

          let nextSection = 'home'
          if (isAtBottom || (cvEl && cvEl.getBoundingClientRect().top <= threshold)) {
            nextSection = 'cv'
          } else if (workEl && workEl.getBoundingClientRect().top <= threshold) {
            nextSection = 'work'
          } else if (skillsEl && skillsEl.getBoundingClientRect().top <= threshold) {
            nextSection = 'skills'
          } else if (aboutEl && aboutEl.getBoundingClientRect().top <= threshold) {
            nextSection = 'about'
          }
          setScrollSection((current) => current === nextSection ? current : nextSection)
        }

        // Check whether the top header is over the light section.
        const lightSection = document.querySelector('[data-theme="light"], .ca-dotted-grid-bg')
        const isOverLight = lightSection
          ? (() => {
              const rect = lightSection.getBoundingClientRect()
              return rect.top <= 88 && rect.bottom >= 0
            })()
          : false
        setIsLightBg((current) => current === isOverLight ? current : isOverLight)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    window.addEventListener('scrollend', finishNavigationScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('scrollend', finishNavigationScroll)
      if (navigationScrollRef.current) {
        window.clearTimeout(navigationScrollRef.current)
        navigationScrollRef.current = null
      }
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current)
        scrollFrameRef.current = 0
      }
    }
  }, [location.pathname])

  const handleClick = (e, item) => {
    if (item.id === 'home') {
      e.preventDefault()
      if (location.pathname === '/') {
        navigationScrollRef.current = window.setTimeout(() => {
          navigationScrollRef.current = null
        }, 300)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.pushState(null, '', '/')
        setScrollSection('home')
      } else {
        navigate('/')
      }
      return
    }

    // Handling dedicated route pages
    if (item.id === 'contact') {
      e.preventDefault()
      if (location.pathname === '/contact') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/contact')
      }
      return
    }

    e.preventDefault()

    // Scrolling to in-page section on Home
    if (location.pathname === '/') {
      const el = document.getElementById(item.id) || (item.id === 'work' ? document.getElementById('featured-works') : null)
      if (el) {
        navigationScrollRef.current = window.setTimeout(() => {
          navigationScrollRef.current = null
        }, 300)
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
      {/* DESKTOP & MOBILE TOP HEADER BAR (Untouched Desktop Akira Marquee Nav)    */}
      {/* ========================================================================= */}
      <header
        aria-label="Editorial Top Navigation Bar"
        className="fixed top-0 left-0 right-0 z-50 select-none will-change-transform"
        style={{ transform: `translate3d(0, -${marqueeOffset}px, 0)` }}
      >
        {/* Top Tier: Animated White Marquee Bar (scrolls up and away as page scrolls) */}
        <MarqueeBar variant="roles" />

        {/* Main Tier: Editorial Navigation Bar */}
        <div
          className={`w-full flex items-stretch h-12 md:h-13 shadow-[0_2px_15px_rgba(0,0,0,0.12)] transition-colors duration-300 ease-out will-change-[background-color,border-color,color] ${
            isLightBg
              ? 'bg-white/95 border-b border-black text-black backdrop-blur-md'
              : 'bg-[#0A0A0E]/90 border-b border-white/20 text-white backdrop-blur-md'
          }`}
        >
          {/* Cell 1: Brand (Om Biswas + Monogram Icon) */}
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
            className={`group flex-1 md:flex-none md:flex-[1.3] px-3.5 sm:px-6 flex items-center justify-between sm:justify-start gap-2.5 transition-colors duration-200 cursor-pointer no-underline ${
              isLightBg
                ? 'border-r-0 md:border-r border-black bg-transparent hover:bg-[#EAE8E2] text-black'
                : 'border-r-0 md:border-r border-white/20 bg-transparent hover:bg-white/10 text-white'
            }`}
            title="Om Biswas — Back to top"
          >
            <div className="flex items-center gap-2 sm:gap-2.5">
              <img
                src={omMonogramImg}
                alt="Om Biswas Monogram"
                className="w-4 h-5 sm:w-5 sm:h-6 object-contain transition-all duration-300 ease-out group-hover:scale-125 group-hover:-rotate-6 group-hover:drop-shadow-[0_4px_10px_rgba(222,32,32,0.55)] cursor-pointer will-change-transform"
              />
              <span
                className={`font-myfont text-[21px] sm:text-[25px] md:text-[27px] tracking-wide leading-none pt-1 transition-colors duration-200 ${
                  isLightBg
                    ? 'text-black group-hover:text-[#DE2020]'
                    : 'text-white group-hover:text-[#FF4A4A]'
                }`}
              >
                Om Biswas
              </span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DE2020] animate-pulse hidden sm:inline-block ml-auto shadow-[0_0_8px_#DE2020] group-hover:scale-125 group-hover:shadow-[0_0_12px_#DE2020] transition-all duration-300" />
          </Link>

          {/* Desktop Cells 2-5: Middle Navigation Links (About, Work, Skills, CV) */}
          <div className="hidden md:flex flex-1 items-stretch">
            {primaryNavItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={(e) => handleClick(e, item)}
                  className={`flex-1 px-3 flex items-center justify-center text-center transition-colors duration-100 no-underline cursor-pointer group ${
                    isLightBg ? 'border-r border-black' : 'border-r border-white/20'
                  } ${
                    isActive
                      ? 'bg-[#DE2020] text-white shadow-inner font-bold'
                      : isLightBg
                      ? 'bg-transparent hover:bg-[#EAE8E2] text-black hover:text-[#DE2020]'
                      : 'bg-transparent hover:bg-white/10 text-neutral-200 hover:text-[#FF4A4A]'
                  }`}
                  aria-label={item.name}
                >
                  <span className="font-myfont text-[21px] sm:text-[23px] md:text-[25px] tracking-wide leading-none pt-1 transition-transform duration-200 group-hover:scale-105">
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Right Action Cell: Liquid Button + Sparkles Text ("Connect" on mobile, "Get in Touch" on desktop) */}
          <div className="flex items-stretch shrink-0">
            <Link
              to="/contact"
              onClick={(e) => handleClick(e, { id: 'contact' })}
              className="no-underline flex items-stretch h-full"
              aria-label="Connect with Om Biswas"
            >
              <LiquidButton
                isActive={activeSection === 'contact'}
                isLightBg={isLightBg}
                hoverScale={1}
                tapScale={0.98}
                className={`h-full px-4 sm:px-5 md:px-6 rounded-none flex items-center justify-center cursor-pointer select-none border-l transition-colors duration-200 group ${
                  isLightBg ? 'border-black' : 'border-white/20'
                } ${
                  activeSection === 'contact'
                    ? 'text-white font-bold'
                    : isLightBg
                    ? 'text-black'
                    : 'text-neutral-200'
                }`}
              >
                <SparklesText
                  sparklesCount={4}
                  colors={{
                    first: '#FFFFFF',
                    second: '#FFA8A8',
                  }}
                  className="font-myfont text-[16px] sm:text-[20px] md:text-[25px] tracking-wide leading-none pt-1 transition-transform duration-200 group-hover:scale-105"
                >
                  <span className="md:hidden">Connect</span>
                  <span className="hidden md:inline">Get in Touch</span>
                </SparklesText>
              </LiquidButton>
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE SCREEN: EXPANDABLE SEGMENTED PILL DOCK (Fixed Bottom)             */}
      {/* Inspired by reference: https://pin.it/7lNTRz9lW                          */}
      {/* ========================================================================= */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 md:hidden select-none will-change-transform"
        style={{
          bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))',
        }}
      >
        <div className="flex items-center gap-2 p-2 rounded-full bg-[#0A0A0E]/90 backdrop-blur-2xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.75),0_0_1px_rgba(255,255,255,0.2)]">
          {mobileNavItems.map((item) => {
            const isActive = activeSection === item.id
            const Icon = item.icon

            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleClick(e, item)}
                className={`relative h-10 w-10 shrink-0 rounded-full flex items-center justify-center cursor-pointer select-none transition-[transform,background-color,color,box-shadow] duration-200 ease-out ${
                  isActive
                    ? '-translate-y-3 bg-[#DE2020] text-white shadow-[0_6px_20px_rgba(222,32,32,0.45)]'
                    : 'bg-white/[0.05] text-neutral-400 hover:bg-white/[0.1] hover:text-white'
                }`}
                aria-label={item.name}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 transition-[color,transform] duration-200 ${
                    isActive ? 'text-white scale-105' : 'text-neutral-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                {/* Active label floats above the raised tab, like the reference dock. */}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0A0A0E] px-2.5 py-1 font-fredoka text-[11px] font-semibold tracking-wide text-white shadow-lg transition-[top,opacity] duration-200 ease-out ${
                    isActive
                      ? '-top-8 opacity-100'
                      : 'top-0 opacity-0 pointer-events-none'
                  }`}
                >
                  {item.name}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
