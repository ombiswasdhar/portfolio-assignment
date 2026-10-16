import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Skills from './pages/Skills'
import CV from './pages/CV'
import Contact from './pages/Contact'
import AureusPage from './pages/Aureus'
import CustomCursor from './components/CustomCursor'
import ConstellationGrid from '@/components/ui/constellation-grid'
import QuantumSwarmDemo from './components/examples/quantum-swarm-demo'
import HelixChronoMatrixDemo from './components/examples/helix-chrono-matrix-demo'
import MusicPlayer from './components/MusicPlayer'
import { MusicProvider } from './context/MusicContext'
import { getDeviceTier } from './utils/deviceTier'
import AugePreloader from './components/AugePreloader'

// Initialize device performance tier & attributes immediately
if (typeof window !== 'undefined') {
  getDeviceTier()
}

// Ensure browser does not auto-restore scrolled positions on reload
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <MusicProvider>
        <AugePreloader topText="om biswas" portfolioText="portfolio" bottomText="Omi's brain" />
        <ScrollToTop />
        <CustomCursor />
        <MusicPlayer />
        <div className="relative min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/featured-works" element={<Work />} />
            <Route path="/featured-work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/resume" element={<CV />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-in-touch" element={<Contact />} />
            <Route path="/connect" element={<Contact />} />
            <Route path="/aureus" element={<AureusPage />} />
            <Route path="/aureaus" element={<AureusPage />} />
            <Route path="/demo" element={<ConstellationGrid />} />
            <Route path="/constellation" element={<ConstellationGrid />} />
            <Route path="/quantum-swarm" element={<QuantumSwarmDemo />} />
            <Route path="/helix-chrono-matrix" element={<HelixChronoMatrixDemo />} />
          </Routes>
        </div>
      </MusicProvider>
    </BrowserRouter>
  )
}

export default App
