import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import SkillSetSection from '../components/SkillSetSection'
import ContentsSection from '../components/ContentsSection'
import ScrollProgressBar from '../components/ScrollProgressBar'
import ScreenDeckLayout from '../components/ScreenDeckLayout'
import ConstellationGrid from '@/components/ui/constellation-grid'

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.hash === '#cv') {
      navigate('/cv', { replace: true })
      return
    }

    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [location, navigate])

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Dynamic Constellation Grid Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-60 [&_.mix-blend-difference]:opacity-0"
        aria-hidden="true"
      >
        <ConstellationGrid />
      </div>

      <ScrollProgressBar />
      <Nav />
      <main className="w-full relative z-10">
        <ScreenDeckLayout activeHash={location.hash}>
          <Hero />
          <AboutSection />
          <SkillSetSection />
          <ContentsSection />
        </ScreenDeckLayout>
      </main>
    </div>
  )
}

