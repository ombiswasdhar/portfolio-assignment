import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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

export default function Nav() {
  const location = useLocation()
  const navigate = useNavigate()

  const [scrollSection, setScrollSection] = useState('')
  const [isLightBg, setIsLightBg] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const MARQUEE_HEIGHT = 36 // height in px of the top MarqueeBar
  const marqueeOffset = Math.min(scrollY, MARQUEE_HEIGHT)

  // Derive active section directly based on route or scroll position
  const activeSection =
    location.pathname === '/contact'
      ? 'contact'
      : scrollSection

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
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

      if (cvEl && cvEl.getBoundingClientRect().top <= threshold) {
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
      if (location.pathname === '/contact') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
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
            ? 'bg-[#F4F3EF]/95 border-b border-black text-black backdrop-blur-md'
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
            setMobileMenuOpen(false)
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

        {/* Mobile Action Controls (< md): Quick Contact Pill + Hamburger Button */}
        <div className="md:hidden flex items-center pr-3 gap-2 shrink-0">
          <Link
            to="/contact"
            onClick={(e) => {
              handleClick(e, { id: 'contact' })
              setMobileMenuOpen(false)
            }}
            className={`px-3 py-1 rounded-none text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
              activeSection === 'contact'
                ? 'bg-[#DE2020] text-white'
                : isLightBg
                ? 'bg-black text-white hover:bg-[#DE2020]'
                : 'bg-white text-black hover:bg-[#DE2020] hover:text-white'
            }`}
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`min-w-[44px] min-h-[44px] p-2 rounded-lg border transition-colors flex items-center justify-center cursor-pointer active:scale-95 ${
              isLightBg
                ? 'border-black/30 hover:bg-black/5 text-black'
                : 'border-white/30 hover:bg-white/10 text-white'
            }`}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
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

      {/* Mobile Slide-Down Dropdown Menu & Backdrop (< md) */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-12 md:hidden bg-black/60 backdrop-blur-sm z-[-1] animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            className={`md:hidden w-full flex flex-col border-b shadow-2xl transition-all duration-300 animate-fadeIn ${
              isLightBg
                ? 'bg-[#F4F3EF]/98 border-black text-black backdrop-blur-xl'
                : 'bg-[#0A0A0E]/98 border-white/20 text-white backdrop-blur-xl'
            }`}
          >
          {primaryNavItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={(e) => {
                  handleClick(e, item)
                  setMobileMenuOpen(false)
                }}
                className={`w-full py-3.5 px-6 flex items-center justify-between border-b text-left transition-colors cursor-pointer ${
                  isLightBg ? 'border-black/10' : 'border-white/10'
                } ${
                  isActive
                    ? 'bg-[#DE2020] text-white font-bold'
                    : isLightBg
                    ? 'hover:bg-black/5 text-neutral-900 active:bg-black/10'
                    : 'hover:bg-white/5 text-neutral-100 active:bg-white/10'
                }`}
              >
                <span className="font-myfont text-2xl tracking-wide">
                  {item.name}
                </span>
                <span className="text-xs font-mono opacity-60">
                  {isActive ? '● VIEWING' : '→'}
                </span>
              </Link>
            )
          })}

          <Link
            to="/contact"
            onClick={(e) => {
              handleClick(e, { id: 'contact' })
              setMobileMenuOpen(false)
            }}
            className={`w-full py-4 px-6 flex items-center justify-between cursor-pointer font-bold transition-colors ${
              activeSection === 'contact'
                ? 'bg-[#DE2020] text-white'
                : isLightBg
                ? 'bg-black text-white hover:bg-[#DE2020] hover:text-white'
                : 'bg-white text-black hover:bg-[#DE2020] hover:text-white'
            }`}
          >
            <SparklesText
              sparklesCount={5}
              colors={{ first: '#FFFFFF', second: '#FFA8A8' }}
              className="font-myfont text-2xl tracking-wide"
            >
              Get in Touch
            </SparklesText>
            <span className="text-base">✉️</span>
          </Link>
        </div>
        </>
      )}
    </header>
  )
}
