import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Skills from './pages/Skills'
import CV from './pages/CV'
import Contact from './pages/Contact'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/resume" element={<CV />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
