import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CustomCursor from './components/CustomCursor'
import ConstellationGrid from '@/components/ui/constellation-grid'
import MusicPlayer from './components/MusicPlayer'
import { MusicProvider } from './context/MusicContext'
import { getDeviceTier } from './utils/deviceTier'
import AugePreloader from './components/AugePreloader'

const Work = lazy(() => import('./pages/Work'))
const About = lazy(() => import('./pages/About'))
const Skills = lazy(() => import('./pages/Skills'))
const CV = lazy(() => import('./pages/CV'))
const Contact = lazy(() => import('./pages/Contact'))
const Sketchbook = lazy(() => import('./pages/Sketchbook'))
const AureusPage = lazy(() => import('./pages/Aureus'))
const QuantumSwarmDemo = lazy(() => import('./components/examples/quantum-swarm-demo'))
const HelixChronoMatrixDemo = lazy(() => import('./components/examples/helix-chrono-matrix-demo'))
const MengToSketchbookScene = lazy(() => import('./components/MengToSketchbookScene'))

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
          <Suspense fallback={null}>
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
            <Route path="/sketchbook" element={<Sketchbook />} />
            <Route path="/aureus" element={<AureusPage />} />
            <Route path="/aureaus" element={<AureusPage />} />
            <Route path="/demo" element={<ConstellationGrid />} />
            <Route path="/constellation" element={<ConstellationGrid />} />
            <Route path="/quantum-swarm" element={<QuantumSwarmDemo />} />
            <Route path="/helix-chrono-matrix" element={<HelixChronoMatrixDemo />} />
            <Route path="/sketchbook/threeui" element={<MengToSketchbookScene />} />
            <Route path="/threeui-sketchbook" element={<MengToSketchbookScene />} />
          </Routes>
          </Suspense>
        </div>
      </MusicProvider>
    </BrowserRouter>
  )
}

export default App
