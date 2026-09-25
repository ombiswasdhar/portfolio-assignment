import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Skills from './pages/Skills'
import CV from './pages/CV'
import Contact from './pages/Contact'
import CustomCursor from './components/CustomCursor'
import ConstellationGrid from '@/components/ui/constellation-grid'
import MusicPlayer from './components/MusicPlayer'
import { MusicProvider } from './context/MusicContext'

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
        <ScrollToTop />
        <CustomCursor />
        <MusicPlayer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/resume" element={<CV />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<ConstellationGrid />} />
          <Route path="/constellation" element={<ConstellationGrid />} />
        </Routes>
      </MusicProvider>
    </BrowserRouter>
  )
}

export default App
