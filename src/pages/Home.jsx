import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash === '#about') {
      const timer = setTimeout(() => {
        const el = document.getElementById('about')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [location])

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-red-600 selection:text-white">
      <Nav />
      <main className="w-full">
        <Hero />
        <AboutSection />
      </main>
    </div>
  )
}

