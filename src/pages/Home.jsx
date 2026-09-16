import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import SkillSetSection from '../components/SkillSetSection'
import ContentsSection from '../components/ContentsSection'
import ScrollProgressBar from '../components/ScrollProgressBar'
import ScreenDeckLayout from '../components/ScreenDeckLayout'

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
    <div className="min-h-screen bg-black text-white relative selection:bg-red-600 selection:text-white">
      <ScrollProgressBar />
      <Nav />
      <main className="w-full">
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

