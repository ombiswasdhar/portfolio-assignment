import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import omMonogramImg from '../assets/nav/om_monogram.png'
import MarqueeBar from './MarqueeBar'

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

  const MARQUEE_HEIGHT = 36 // height in px of the top MarqueeBar
  const marqueeOffset = Math.min(scrollY, MARQUEE_HEIGHT)

  // Derive active section directly based on route or scroll position
  const activeSection =
    location.pathname === '/contact'
      ? 'contact'
      : scrollSection

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsLightBg(false)
      return
    }

    // Scroll spy: check current section, background, and scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const cvEl = document.getElementById('cv')
      const workEl = document.getElementById('work')
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
    <header
      aria-label="Editorial Top Navigation Bar"
      className="fixed top-0 left-0 right-0 z-50 select-none will-change-transform"
      style={{ transform: `translate3d(0, -${marqueeOffset}px, 0)` }}
    >
      {/* Top Tier: Animated White Marquee Bar (scrolls up and away as page scrolls) */}
      <MarqueeBar />

      {/* Main Tier: Editorial Navigation Bar (sticks to the top when marquee scrolls away) */}
      <div
        className={`w-full flex items-stretch h-12 md:h-13 overflow-x-auto no-scrollbar shadow-[0_2px_15px_rgba(0,0,0,0.12)] transition-colors duration-300 ease-out will-change-[background-color,border-color,color] ${
          isLightBg
            ? 'bg-[#F4F3EF]/95 border-b border-black text-black backdrop-blur-md'
            : 'bg-[#0A0A0E]/90 border-b border-white/20 text-white backdrop-blur-md'
        }`}
      >
        {/* Cell 1: Brand (Om Biswas + Monogram Icon with rich hover responsiveness) */}
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
          className={`group shrink-0 md:flex-[1.3] px-4 sm:px-6 flex items-center justify-between sm:justify-start gap-2.5 transition-colors duration-200 cursor-pointer no-underline active:scale-[0.99] ${
            isLightBg
              ? 'border-r border-black bg-transparent hover:bg-[#EAE8E2] text-black'
              : 'border-r border-white/20 bg-transparent hover:bg-white/10 text-white'
          }`}
          title="Om Biswas — Back to top"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Monogram Icon: Hover Responsive with smooth scale, tilt, and vermilion shadow */}
            <img
              src={omMonogramImg}
              alt="Om Biswas Monogram"
              className="w-4 h-5 sm:w-5 sm:h-6 object-contain transition-all duration-300 ease-out group-hover:scale-125 group-hover:-rotate-6 group-hover:drop-shadow-[0_4px_10px_rgba(222,32,32,0.55)] cursor-pointer will-change-transform"
            />
            <span
              className={`font-myfont text-[22px] sm:text-[25px] md:text-[27px] tracking-wide leading-none pt-1 transition-colors duration-200 ${
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

        {/* Cells 2-5: Middle Navigation Links (About, Work, Skills, CV with hover responsive text and cells) */}
        {primaryNavItems.map((item) => {
          const isActive = activeSection === item.id

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={(e) => handleClick(e, item)}
              className={`shrink-0 md:flex-1 px-4 sm:px-3 flex items-center justify-center text-center transition-all duration-200 no-underline cursor-pointer group active:scale-[0.98] ${
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

        {/* Cell 6: Call To Action (Studio Koba "Get in Touch" solid high-contrast block with hover responsive glow) */}
        <Link
          to="/contact"
          onClick={(e) => handleClick(e, { id: 'contact' })}
          className={`shrink-0 md:flex-[1.2] px-5 sm:px-6 flex items-center justify-center text-center transition-all duration-200 no-underline cursor-pointer group active:scale-[0.98] ${
            activeSection === 'contact'
              ? 'bg-[#DE2020] text-white font-bold'
              : isLightBg
              ? 'bg-black text-white hover:bg-[#DE2020] hover:shadow-[0_4px_15px_rgba(222,32,32,0.4)]'
              : 'bg-white text-black hover:bg-[#DE2020] hover:text-white hover:shadow-[0_4px_15px_rgba(222,32,32,0.4)]'
          }`}
          aria-label="Get in Touch"
        >
          <span className="font-myfont text-[21px] sm:text-[23px] md:text-[25px] tracking-wide leading-none pt-1 font-bold transition-transform duration-200 group-hover:scale-105">
            Get in Touch
          </span>
        </Link>
      </div>
    </header>
  )
}
