import React, { useState, useRef } from 'react'
import {
  Search,
  Menu,
  SlidersHorizontal,
  MoreHorizontal,
  Share,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  BookOpen,
  Sparkles,
  Check
} from 'lucide-react'

// Authentic artwork from Om's portfolio for the sketchbook pages
import aureusIdeationImg from '../assets/work/aureus/aureus-01-ideation.png'
import aureusPersonaImg from '../assets/work/aureus/aureus-04-persona.png'
import oniCardFrontImg from '../assets/work/oni-card-front.png'
import oniCard2FrontImg from '../assets/work/oni-card-2-front.png'
import psCycle01BombayImg from '../assets/playstaples/user-cycle/01_Bombay.jpg'
import psCycleBd01Img from '../assets/playstaples/user-cycle/BD_01.jpg'

const SKETCHBOOK_SPREADS = [
  {
    id: 'spread-1',
    spreadNum: '01 / 03',
    leftTitle: 'VISUAL DEVELOPMENT & 3D HARDWARE',
    leftDate: 'MAR 2026 // LAB NOTEBOOK',
    leftNotes: [
      'Initial brainstorming for Aureus Audio flagship headphone lookbook.',
      'Explored isometric angles, tactile floating geometries, and high-contrast editorial magazine typography.',
      'Goal: Fuse industrial luxury aesthetics with audiophile telemetry metrics.'
    ],
    rightImage: aureusIdeationImg,
    rightCaption: 'Aureus Audio • Ideation & Wireframe Telemetry',
    tags: ['Blender 3D', 'Editorial UI', 'Telemetry']
  },
  {
    id: 'spread-2',
    spreadNum: '02 / 03',
    leftTitle: 'CHARACTER MASCOT & PRINT PRODUCTION',
    leftDate: 'MAR 2026 // ONI STUDIOS',
    leftNotes: [
      'Corporate & freelance identity design for Oni Studios.',
      'Illustrated anime mascot studies with cyberpunk lavender and crimson colorways.',
      'Precision dimensions: 3.5" x 2.0" with velvet soft-touch finish and custom vector QR code integration.'
    ],
    rightImage: oniCardFrontImg,
    rightImageSecondary: oniCard2FrontImg,
    rightCaption: 'Oni Studios • Dual Mascot Print Iterations',
    tags: ['Procreate', 'Print Design', 'Character Art']
  },
  {
    id: 'spread-3',
    spreadNum: '03 / 03',
    leftTitle: 'TACTILE COLLECTIBLES & LIIVERY',
    leftDate: 'JAN 2026 // PLAYSTAPLES',
    leftNotes: [
      'Kaali Peeli Mumbai Premier Padmini wooden toy collectible.',
      '"For the ones who carved dreams on the trunk."',
      'Organic hardwood proportions, handcrafted rooftop luggage rack, and authentic taxi meter livery typography.'
    ],
    rightImage: psCycle01BombayImg,
    rightImageSecondary: psCycleBd01Img,
    rightCaption: 'PlayStaples • Heritage Taxi Archive & Prototype',
    tags: ['Toy Design', '3D CAD', 'Packaging']
  }
]

export default function PaperStoreSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSpread, setCurrentSpread] = useState(0)
  const [paperTexture, setPaperTexture] = useState('dots') // 'dots' | 'blank' | 'grid'
  const [toastMessage, setToastMessage] = useState('')
  const [showOptionsPopover, setShowOptionsPopover] = useState(false)
  const [showInfoPopover, setShowInfoPopover] = useState(false)
  const [notebookTitle, setNotebookTitle] = useState('2m 💋 🐷')

  // 3D tilt tracking for closed cover
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const coverRef = useRef(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2400)
  }

  const handleMouseMove = (e) => {
    if (isOpen || !coverRef.current) return
    const rect = coverRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Limit tilt range between -12 and +12 degrees
    const rotateY = (x / (rect.width / 2)) * 12
    const rotateX = -(y / (rect.height / 2)) * 12
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    showToast('Sketchbook link copied to clipboard!')
  }

  const handleResetOrTrash = () => {
    setIsOpen(false)
    setCurrentSpread(0)
    showToast('Sketchbook closed and reset to cover')
  }

  const handleAddPage = () => {
    if (!isOpen) {
      setIsOpen(true)
      showToast('Sketchbook opened!')
    } else {
      if (currentSpread < SKETCHBOOK_SPREADS.length - 1) {
        setCurrentSpread(prev => prev + 1)
        showToast('Turned to next spread!')
      } else {
        showToast('You are on the latest sketchbook spread!')
      }
    }
  }

  const activeSpread = SKETCHBOOK_SPREADS[currentSpread]

  return (
    <section
      id="sketchbook"
      className="w-full relative py-12 sm:py-16 px-4 sm:px-8 overflow-hidden select-none flex flex-col items-center justify-between min-h-[920px] transition-colors duration-500"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #757192 0%, #696584 60%, #595572 100%)'
      }}
    >
      {/* BACKGROUND SUBTLE NOISE / AMBIENT LIGHT */}
      <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />

      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-8 z-50 px-5 py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-ca-mono shadow-2xl flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-[#FFE500]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP IPAD APP HEADER BAR */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between relative z-20 pt-2">
        {/* LEFT: Paper Store Logo Pill */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
            {/* The 3 tally lines icon from Paper by FiftyThree */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-black" fill="currentColor">
              <rect x="5" y="4" width="2.2" height="16" rx="0.5" />
              <rect x="10.5" y="4" width="2.2" height="16" rx="0.5" />
              <path d="M16 4.5L19 19.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-poppins font-medium text-white/95 text-sm sm:text-base tracking-tight">
            Paper Store
          </span>
        </div>

        {/* TOP CENTER: Multitasking dots + Title + Pages count */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center top-0">
          {/* iPad 3 dots window handle */}
          <div className="flex items-center gap-1 mb-1">
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="w-1 h-1 rounded-full bg-white/40" />
          </div>

          {/* Title */}
          <h2 className="font-poppins font-bold text-base sm:text-xl text-white tracking-tight flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity"
            onClick={() => {
              const newTitle = prompt('Rename journal:', notebookTitle)
              if (newTitle) setNotebookTitle(newTitle)
            }}
            title="Click to rename journal"
          >
            <span>{notebookTitle}</span>
          </h2>

          {/* Subtitle with folded page icon */}
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-[11px] sm:text-xs text-white/75 font-poppins cursor-pointer hover:text-white transition-colors mt-0.5"
            title={isOpen ? 'Click to close journal' : 'Click to open journal'}
          >
            {/* Folded paper icon */}
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6l10 10" />
            </svg>
            <span>{isOpen ? `Spread ${currentSpread + 1} of ${SKETCHBOOK_SPREADS.length}` : '3 Pages'}</span>
          </div>
        </div>

        {/* RIGHT: Action Buttons (123, Search, Menu) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* 123 Page Jumper Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true)
              setCurrentSpread(prev => (prev + 1) % SKETCHBOOK_SPREADS.length)
              showToast(`Jumped to Spread ${(currentSpread + 1) % SKETCHBOOK_SPREADS.length + 1}`)
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 text-white/90 text-xs font-bold font-poppins flex items-center justify-center transition-all cursor-pointer shadow-sm"
            title="Page Spreads"
          >
            123
          </button>

          {/* Search Button */}
          <button
            type="button"
            onClick={() => showToast('Search: Visual Development, 3D CAD, Oni Studios')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 text-white/90 flex items-center justify-center transition-all cursor-pointer shadow-sm"
            title="Search Sketchbook"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setShowOptionsPopover(!showOptionsPopover)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 text-white/90 flex items-center justify-center transition-all cursor-pointer shadow-sm"
            title="Sketchbook Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ASSISTIVETOUCH FLOATING WIDGET (ICONIC IPAD ACCENT) */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex w-12 h-12 rounded-2xl bg-black/30 hover:bg-black/45 backdrop-blur-md border border-white/15 absolute left-10 top-36 cursor-pointer items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 z-20 group"
        title="AssistiveTouch Shortcut: Toggle Notebook"
      >
        <div className="w-7 h-7 rounded-full bg-white/20 border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          <div className="w-3.5 h-3.5 rounded-full bg-white/80 shadow-inner" />
        </div>
      </div>

      {/* OPTIONS POPOVER MODAL */}
      {showOptionsPopover && (
        <div className="absolute top-20 right-6 sm:right-16 z-40 bg-[#16161E]/95 backdrop-blur-xl border border-white/15 p-4 rounded-2xl shadow-2xl w-64 flex flex-col gap-2.5 animate-fadeIn text-white text-xs font-poppins">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-semibold text-white/90">Journal Settings</span>
            <button onClick={() => setShowOptionsPopover(false)} className="text-white/50 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            onClick={() => {
              setIsOpen(!isOpen)
              setShowOptionsPopover(false)
            }}
            className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between"
          >
            <span>{isOpen ? 'Close Notebook' : 'Open Notebook'}</span>
            <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
          </button>
          <div className="border-t border-white/10 pt-2 flex flex-col gap-1.5">
            <span className="text-[10px] text-white/50 font-ca-mono uppercase">Paper Texture</span>
            <div className="grid grid-cols-3 gap-1.5">
              {['dots', 'blank', 'grid'].map(tex => (
                <button
                  key={tex}
                  onClick={() => {
                    setPaperTexture(tex)
                    showToast(`Paper switched to ${tex}`)
                  }}
                  className={`py-1 rounded text-center uppercase text-[10px] font-ca-mono border transition-all ${
                    paperTexture === tex ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {tex}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CENTER STAGE: THE 3D MOLESKINE NOTEBOOK */}
      <div className="my-auto py-8 sm:py-12 flex flex-col items-center justify-center relative z-10 w-full max-w-5xl">
        {!isOpen ? (
          /* ================= CLOSED NOTEBOOK (EXACT REPLICA OF PINTEREST PIN) ================= */
          <div
            ref={coverRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer transition-transform duration-200 ease-out group"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* AMBIENT DROP SHADOW BENEATH THE FLOATING BOOK */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-14 bg-black/55 blur-2xl rounded-full pointer-events-none transition-all duration-300 group-hover:scale-105 group-hover:bg-black/65"
            />

            {/* THE TACTILE MOLESKINE BOOK COVER */}
            <div
              className="relative w-[300px] xs:w-[330px] sm:w-[380px] h-[410px] xs:h-[450px] sm:h-[510px] bg-[#242429] rounded-r-[26px] sm:rounded-r-[30px] rounded-l-[3px] border-t border-r border-b border-white/10 overflow-hidden transition-all duration-300 group-hover:shadow-[0_45px_85px_-15px_rgba(15,10,30,0.8)] shadow-[0_35px_70px_-15px_rgba(20,15,40,0.7)]"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              {/* SPECULAR SHEEN LIGHTING ON COVER */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity"
                style={{
                  background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${50 - tilt.x * 3}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)`
                }}
              />

              {/* LEFT SPINE BINDING TAPE */}
              <div className="absolute top-0 bottom-0 left-0 w-[42px] sm:w-[48px] bg-[#16161A] border-r border-black/60 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.5)] flex flex-col justify-between py-6">
                <div className="w-full h-8 border-b border-black/30" />
                <div className="w-full h-8 border-t border-black/30" />
              </div>

              {/* COVER RIGHT EDGE SUBTLE EMBOSS / CREASE */}
              <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />

              {/* COVER TOP-RIGHT SLIDERS / ADJUSTMENT BUTTON (EXACT PINTEREST PIN DETAIL) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowOptionsPopover(true)
                }}
                className="absolute top-4 right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#18181D] hover:bg-[#202026] active:scale-95 border border-white/15 text-white/80 flex items-center justify-center transition-all cursor-pointer shadow-md"
                title="Customize Notebook"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>

              {/* CENTER "CLICK TO OPEN" BADGE */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white font-ca-mono text-xs shadow-2xl flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                  <BookOpen className="w-3.5 h-3.5 text-[#FFE500]" />
                  <span>Click to Open Journal</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= OPEN TWO-PAGE SKETCHBOOK SPREAD ================= */
          <div className="w-full max-w-4xl relative animate-fadeIn flex flex-col items-center">
            {/* SPREAD TOOLBAR (PREV / NEXT / CLOSE) */}
            <div className="w-full flex items-center justify-between mb-3 px-2 text-white/90 font-poppins text-xs">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white transition-all cursor-pointer active:scale-95 shadow-md"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close Cover</span>
              </button>

              <div className="flex items-center gap-2 font-ca-mono text-xs">
                <span>Spread {currentSpread + 1} of {SKETCHBOOK_SPREADS.length}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-white/60">{activeSpread.leftTitle.slice(0, 24)}...</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentSpread === 0}
                  onClick={() => setCurrentSpread(prev => Math.max(0, prev - 1))}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-30 border border-white/20 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  title="Previous spread"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  type="button"
                  disabled={currentSpread === SKETCHBOOK_SPREADS.length - 1}
                  onClick={() => setCurrentSpread(prev => Math.min(SKETCHBOOK_SPREADS.length - 1, prev + 1))}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-30 border border-white/20 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  title="Next spread"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* OPEN BOOK SPREAD CONTAINER */}
            <div
              className="w-full bg-[#FAF7F0] text-neutral-900 rounded-3xl shadow-[0_45px_95px_-20px_rgba(15,10,35,0.75)] border border-black/10 overflow-hidden relative flex flex-col md:flex-row min-h-[460px] sm:min-h-[520px]"
              style={{
                backgroundImage:
                  paperTexture === 'dots'
                    ? 'radial-gradient(#C5BFB0 1.1px, transparent 1.1px)'
                    : paperTexture === 'grid'
                    ? 'linear-gradient(to right, #ECE6D8 1px, transparent 1px), linear-gradient(to bottom, #ECE6D8 1px, transparent 1px)'
                    : 'none',
                backgroundSize: paperTexture === 'dots' ? '18px 18px' : '20px 20px'
              }}
            >
              {/* CENTER SPINE CREASE / SHADOW */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/15 via-black/25 to-black/15 pointer-events-none z-10 shadow-inner" />

              {/* LEFT PAGE: EDITORIAL NOTES & SKETCHES */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/10 relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-black/10 pb-3">
                    <span className="font-ca-mono text-[10px] tracking-widest uppercase text-neutral-500 font-semibold">
                      {activeSpread.leftDate}
                    </span>
                    <span className="font-ca-mono text-xs font-bold text-neutral-400">
                      p. {currentSpread * 2 + 1}
                    </span>
                  </div>

                  <h3 className="font-akira text-base sm:text-lg font-black text-neutral-900 uppercase tracking-wide leading-snug">
                    {activeSpread.leftTitle}
                  </h3>

                  <div className="space-y-3 pt-2">
                    {activeSpread.leftNotes.map((note, idx) => (
                      <p key={idx} className="font-poppins text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                        • {note}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/10 flex flex-wrap gap-1.5 items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {activeSpread.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-ca-mono text-neutral-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-ca-mono text-[10px] text-neutral-400">
                    OM BISWAS SKETCH ARCHIVE
                  </span>
                </div>
              </div>

              {/* RIGHT PAGE: HIGH-RES ARTWORK & VISUAL DISPLAY */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-black/[0.015] relative">
                <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
                  <span className="font-ca-mono text-[10px] tracking-widest uppercase text-neutral-500 font-semibold">
                    VISUAL SPECIFICATION
                  </span>
                  <span className="font-ca-mono text-xs font-bold text-neutral-400">
                    p. {currentSpread * 2 + 2}
                  </span>
                </div>

                {/* Primary Artwork */}
                <div className="w-full flex-1 flex flex-col items-center justify-center rounded-2xl overflow-hidden bg-white/70 border border-black/10 shadow-sm p-3 relative group">
                  <img
                    src={activeSpread.rightImage}
                    alt={activeSpread.rightCaption}
                    className="max-h-[300px] w-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  {activeSpread.rightImageSecondary && (
                    <div className="mt-3 w-full flex justify-center gap-2">
                      <img
                        src={activeSpread.rightImageSecondary}
                        alt="Secondary preview"
                        className="h-16 object-contain rounded border border-black/10 shadow-xs"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between text-neutral-500 font-ca-mono text-[11px]">
                  <span className="truncate">{activeSpread.rightCaption}</span>
                  <span className="shrink-0 text-neutral-400">300 DPI // 1:1</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM ACTION BAR: 4 CIRCULAR WHITE BUTTONS (EXACT PINTEREST PIN REPLICA) */}
      <div className="w-full flex flex-col items-center relative z-20 pb-2">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* 1. More Options (...) */}
          <button
            type="button"
            onClick={() => setShowOptionsPopover(!showOptionsPopover)}
            className="w-12 h-12 rounded-full bg-white hover:bg-neutral-100 active:scale-95 text-black flex items-center justify-center transition-all cursor-pointer shadow-lg hover:shadow-xl"
            title="More Options"
          >
            <MoreHorizontal className="w-5 h-5 text-neutral-800" />
          </button>

          {/* 2. Share / Export (↑) */}
          <button
            type="button"
            onClick={handleShare}
            className="w-12 h-12 rounded-full bg-white hover:bg-neutral-100 active:scale-95 text-black flex items-center justify-center transition-all cursor-pointer shadow-lg hover:shadow-xl"
            title="Share Journal"
          >
            <Share className="w-4 h-4 text-neutral-800" />
          </button>

          {/* 3. Trash / Reset (🗑) */}
          <button
            type="button"
            onClick={handleResetOrTrash}
            className="w-12 h-12 rounded-full bg-white hover:bg-neutral-100 active:scale-95 text-black flex items-center justify-center transition-all cursor-pointer shadow-lg hover:shadow-xl"
            title="Close & Reset Journal"
          >
            <Trash2 className="w-4 h-4 text-neutral-800" />
          </button>

          {/* 4. Add / New Page (+) */}
          <button
            type="button"
            onClick={handleAddPage}
            className="w-12 h-12 rounded-full bg-white hover:bg-neutral-100 active:scale-95 text-black flex items-center justify-center transition-all cursor-pointer shadow-lg hover:shadow-xl"
            title="Add Page / Turn Page"
          >
            <Plus className="w-5 h-5 text-neutral-800" />
          </button>
        </div>

        {/* IPAD HOME INDICATOR BAR (EXACT PINTEREST PIN REPLICA) */}
        <div className="w-36 sm:w-44 h-1 sm:h-1.5 bg-black/85 rounded-full mt-7" />
      </div>
    </section>
  )
}
