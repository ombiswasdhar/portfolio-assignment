import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  User,
  Zap,
  Briefcase,
  FileText,
  Mail,
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
  { id: 'about', name: 'About', path: '/#about', icon: User },
  { id: 'skills', name: 'Skills', path: '/#skills', icon: Zap },
  { id: 'work', name: 'Work', path: '/#work', icon: Briefcase },
  { id: 'cv', name: 'CV', path: '/#cv', icon: FileText },
  { id: 'contact', name: 'Contact', path: '/contact', icon: Mail },
]

export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()

  const [scrollSection, setScrollSection] = useState('')
  const [isLightBg, setIsLightBg] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const MARQUEE_HEIGHT = 36 // height in px of the top MarqueeBar
  const marqueeOffset = Math.min(scrollY, MARQUEE_HEIGHT)

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
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const cvEl = document.getElementById('cv')
      const workEl = document.getElementById('work') || document.getElementById('featured-works')
      const skillsEl = document.getElementById('skills')
      const aboutEl = document.getElementById('about')

      const threshold = window.innerHeight * 0.45
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80

      if (isAtBottom || (cvEl && cvEl.getBoundingClientRect().top <= threshold)) {
        setScrollSection('cv')
      } else if (workEl && workEl.getBoundingClientRect().top <= threshold) {
        setScrollSection('work')
      } else if (skillsEl && skillsEl.getBoundingClientRect().top <= threshold) {
        setScrollSection('skills')
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= threshold) {
        setScrollSection('about')
      } else {
        setScrollSection('')
      }

      // Check whether top header (top 0 to 88px) is over the light section
      const lightSection = document.querySelector('[data-theme="light"], .ca-dotted-grid-bg')
      if (lightSection) {
        const rect = lightSection.getBoundingClientRect()
        // When top of light section has reached the top header and its bottom hasn't scrolled off
        const isOverLight = rect.top <= 88 && rect.bottom >= 0
        setIsLightBg(isOverLight)
      } else {
        setIsLightBg(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [location.pathname])

  const handleClick = (e, item) => {
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
                setScrollSection('')
              }
            }}
            className={`group flex-1 md:flex-none md:flex-[1.3] px-3.5 sm:px-6 flex items-center justify-between sm:justify-start gap-2.5 transition-colors duration-200 cursor-pointer no-underline active:scale-[0.99] ${
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

          {/* Mobile Top Header Action (< md): Status Contact Pill */}
          <div className="md:hidden flex items-center pr-3.5 shrink-0">
            <Link
              to="/contact"
              onClick={(e) => handleClick(e, { id: 'contact' })}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'contact'
                  ? 'bg-[#DE2020] text-white shadow-[0_0_10px_rgba(222,32,32,0.5)]'
                  : isLightBg
                  ? 'bg-black/5 hover:bg-black/10 text-neutral-800 border border-black/10'
                  : 'bg-white/10 hover:bg-white/15 text-neutral-200 border border-white/10'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#DE2020] animate-pulse" />
              <span>CONTACT</span>
            </Link>
          </div>

          {/* Desktop Cells 2-5: Middle Navigation Links (About, Work, Skills, CV) */}
          <div className="hidden md:flex flex-1 items-stretch">
            {primaryNavItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={(e) => handleClick(e, item)}
                  className={`flex-1 px-3 flex items-center justify-center text-center transition-all duration-200 no-underline cursor-pointer group active:scale-[0.98] ${
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

          {/* Desktop Cell 6: Call To Action Get in Touch (Liquid Button + Sparkles Text) */}
          <div className="hidden md:flex items-stretch shrink-0">
            <Link
              to="/contact"
              onClick={(e) => handleClick(e, { id: 'contact' })}
              className="no-underline flex items-stretch h-full"
              aria-label="Get in Touch"
            >
              <LiquidButton
                isActive={activeSection === 'contact'}
                isLightBg={isLightBg}
                hoverScale={1}
                tapScale={0.98}
                className={`h-full px-5 md:px-6 rounded-none flex items-center justify-center cursor-pointer select-none border-l transition-colors duration-200 group ${
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
                  sparklesCount={5}
                  colors={{
                    first: '#FFFFFF',
                    second: '#FFA8A8',
                  }}
                  className="font-myfont text-[21px] sm:text-[23px] md:text-[25px] tracking-wide leading-none pt-1 transition-transform duration-200 group-hover:scale-105"
                >
                  Get in Touch
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
        <div className="flex items-center gap-1.5 p-1.5 rounded-[22px] bg-[#0A0A0E]/90 backdrop-blur-2xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_1px_rgba(255,255,255,0.2)]">
          {mobileNavItems.map((item) => {
            const isActive = activeSection === item.id
            const Icon = item.icon

            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleClick(e, item)}
                className={`relative h-10 min-w-10 rounded-[14px] flex items-center justify-center cursor-pointer select-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-95 ${
                  isActive
                    ? 'max-w-36 px-3.5 bg-[#1B1C24] text-white border border-[#DE2020]/60 shadow-[0_0_16px_rgba(222,32,32,0.3)]'
                    : 'max-w-10 px-0 bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white border border-white/[0.07]'
                }`}
                aria-label={item.name}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                    isActive ? 'text-[#FF4A4A]' : 'text-neutral-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                {/* Animated Expanding Label */}
                <span
                  className={`font-fredoka text-[13px] font-semibold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    isActive
                      ? 'max-w-[70px] opacity-100 ml-1.5'
                      : 'max-w-0 opacity-0 ml-0'
                  }`}
                >
                  {item.name}
                </span>

                {/* Pulsing Crimson Dot on Active */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DE2020] animate-pulse shrink-0 ml-1 shadow-[0_0_6px_#DE2020]" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
