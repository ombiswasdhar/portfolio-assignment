import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import AboutMarquee from '../components/AboutMarquee'
import AboutSection from '../components/AboutSection'
import SkillSetSection from '../components/SkillSetSection'
import MarqueeBar from '../components/MarqueeBar'
import ContentsSection from '../components/ContentsSection'
import CVSection from '../components/CVSection'
import ScrollProgressBar from '../components/ScrollProgressBar'
import ConstellationGrid from '@/components/ui/constellation-grid'

export default function Home() {
  const location = useLocation()
  const isInitialMount = useRef(true)

  // Handle initial page load and hash scrolling
  useEffect(() => {
    // 1. Force manual scroll restoration so browsers do not restore prior scrolled offsets
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const initialHash = window.location.hash || location.hash

    // 2. If no hash, immediately scroll to top (Hero section)
    if (!initialHash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    // 3. Allow initial mount to settle and scroll to target if hash was provided
    const timer = setTimeout(() => {
      isInitialMount.current = false
      if (initialHash) {
        const targetId = initialHash.replace('#', '')
        const el = document.getElementById(targetId) || (targetId === 'work' ? document.getElementById('featured-works') : null)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }, 120)

    return () => clearTimeout(timer)
  }, [])

  // Allow smooth hash scrolling when hash changes after initial mount
  useEffect(() => {
    if (isInitialMount.current) return

    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const el = document.getElementById(targetId) || (targetId === 'work' ? document.getElementById('featured-works') : null)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location.hash])

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-red-600 selection:text-white overflow-x-clip">
      {/* Dynamic Constellation Grid Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-60 [&_.mix-blend-difference]:opacity-0"
        aria-hidden="true"
      >
        <ConstellationGrid />
      </div>

      <ScrollProgressBar />
      <Nav />
      <main className="w-full relative z-10 flex flex-col">
        <Hero />
        <AboutMarquee />
        <AboutSection />
        <MarqueeBar variant="roles" className="border-t border-b border-black relative z-10" />
        <SkillSetSection />
        <MarqueeBar direction="right" className="border-t border-black relative z-10" />
        <ContentsSection />
        <CVSection />
      </main>
    </div>
  )
}

