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

  // On opening, loading, or reloading, guarantee the Hero section is the first view
  useEffect(() => {
    // 1. Force manual scroll restoration so browsers do not restore prior scrolled offsets
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // 2. Immediately scroll to top (Hero section)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // 3. Clear any stale URL hash on fresh reload/load
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }

    // 4. Double-check on tick to counteract any delayed image/font layout shifts
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      isInitialMount.current = false
    }, 80)

    return () => clearTimeout(timer)
  }, [])

  // Allow smooth hash scrolling ONLY after the page has finished its initial mount
  useEffect(() => {
    if (isInitialMount.current) return

    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const el = document.getElementById(targetId)
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
        <SkillSetSection />
        <MarqueeBar direction="right" className="border-t border-black relative z-10" />
        <ContentsSection />
        <CVSection />
      </main>
    </div>
  )
}

