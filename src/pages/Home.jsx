import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import SkillSetSection from '../components/SkillSetSection'
import CVSection from '../components/CVSection'
import ScrollProgressBar from '../components/ScrollProgressBar'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
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
  }, [location])

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-red-600 selection:text-white">
      <ScrollProgressBar />
      <Nav />
      <main className="w-full">
        <Hero />
        <AboutSection />
        <SkillSetSection />
        <CVSection />
      </main>
    </div>
  )
}

