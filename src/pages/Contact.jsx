import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

// Sticker Assets
import ufoCowImg from '../assets/contact/ufo_cow.png'
import flamingHeartImg from '../assets/contact/flaming_heart.png'
import dancingLadybugsImg from '../assets/contact/dancing_ladybugs.png'
import whiteDiceImg from '../assets/contact/white_dice.png'
import patch777Img from '../assets/contact/patch_777.png'

/**
 * Interactive Googly Eyes Component
 * Pupils realistically follow mouse coordinates across the viewport.
 */
function GooglyEyes({ className = '' }) {
  const leftEyeRef = useRef(null)
  const rightEyeRef = useRef(null)
  const [pupilPos, setPupilPos] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } })
  const [isWiggling, setIsWiggling] = useState(false)

  useEffect(() => {
    const handlePointerMove = (e) => {
      const calcOffset = (eyeEl) => {
        if (!eyeEl) return { x: 0, y: 0 }
        const rect = eyeEl.getBoundingClientRect()
        const eyeCenterX = rect.left + rect.width / 2
        const eyeCenterY = rect.top + rect.height / 2
        const dx = e.clientX - eyeCenterX
        const dy = e.clientY - eyeCenterY
        const angle = Math.atan2(dy, dx)
        const distance = Math.hypot(dx, dy)
        // Max travel distance for pupil inside the eye
        const maxOffset = rect.width * 0.22
        const offset = Math.min(distance * 0.12, maxOffset)
        return {
          x: Math.cos(angle) * offset,
          y: Math.sin(angle) * offset,
        }
      }

      setPupilPos({
        left: calcOffset(leftEyeRef.current),
        right: calcOffset(rightEyeRef.current),
      })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  const triggerWiggle = () => {
    setIsWiggling(true)
    setTimeout(() => setIsWiggling(false), 600)
  }

  return (
    <div
      onClick={triggerWiggle}
      className={`inline-flex items-center gap-2 select-none cursor-pointer group ${className} ${
        isWiggling ? 'animate-bounce' : ''
      }`}
      title="Click to jiggle googly eyes!"
    >
      {/* Left Eye */}
      <div
        ref={leftEyeRef}
        className="relative w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_2px_5px_rgba(0,0,0,0.15)] border-2 border-neutral-300 flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105"
      >
        {/* Plastic Dome Glare */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/70 pointer-events-none" />
        <div className="absolute top-1.5 right-2 w-2.5 h-2.5 rounded-full bg-white/90 blur-[0.4px] pointer-events-none" />

        {/* Pupil */}
        <div
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-75 ease-out relative"
          style={{
            transform: `translate3d(${pupilPos.left.x}px, ${pupilPos.left.y}px, 0)`,
          }}
        >
          {/* Pupil light reflection dot */}
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/95" />
        </div>
      </div>

      {/* Right Eye */}
      <div
        ref={rightEyeRef}
        className="relative w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_2px_5px_rgba(0,0,0,0.15)] border-2 border-neutral-300 flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105"
      >
        {/* Plastic Dome Glare */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/70 pointer-events-none" />
        <div className="absolute top-1.5 right-2 w-2.5 h-2.5 rounded-full bg-white/90 blur-[0.4px] pointer-events-none" />

        {/* Pupil */}
        <div
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-75 ease-out relative"
          style={{
            transform: `translate3d(${pupilPos.right.x}px, ${pupilPos.right.y}px, 0)`,
          }}
        >
          {/* Pupil light reflection dot */}
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/95" />
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimeoutRef = useRef(null)

  const showToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToastMessage(msg)
    setToastVisible(true)
    toastTimeoutRef.current = setTimeout(() => {
      setToastVisible(false)
    }, 2400)
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(
      () => showToast(`Copied ${label} to clipboard!`),
      () => showToast(`Selected: ${text}`)
    )
  }

  const contactRows = [
    {
      id: 1,
      num: '(1)',
      label: 'PHONE',
      value: '+91 - 93830 - 49271',
      href: 'tel:+919383049271',
      isUnderlined: false,
      onAction: () => copyToClipboard('+919383049271', 'phone number'),
      actionLabel: 'Click to copy phone',
    },
    {
      id: 2,
      num: '(2)',
      label: 'EMAIL',
      value: 'OMBISWASDHAR@GMAIL.COM',
      href: 'mailto:ombiswasdhar@gmail.com',
      isUnderlined: false,
      onAction: () => copyToClipboard('ombiswasdhar@gmail.com', 'email address'),
      actionLabel: 'Click to copy email',
    },
    {
      id: 3,
      num: '(3)',
      label: 'LINKEDIN',
      value: 'WWW.LINKEDIN.COM',
      href: 'https://linkedin.com/in/om-biswas',
      isUnderlined: true,
      isExternal: true,
      actionLabel: 'Open LinkedIn profile',
    },
    {
      id: 4,
      num: '(4)',
      label: 'INSTAGRAM',
      value: '@JKITSNOAH',
      href: 'https://instagram.com/jkitsnoah',
      isUnderlined: true,
      isExternal: true,
      actionLabel: 'Open Instagram profile',
    },
    {
      id: 5,
      num: '(5)',
      label: 'REFERENCES',
      value: 'UPON REQUEST',
      href: 'mailto:ombiswasdhar@gmail.com?subject=Reference%20Request',
      isUnderlined: false,
      onAction: () => showToast('References available upon request!'),
      actionLabel: 'Request references',
    },
  ]

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-neutral-900 selection:bg-[#DE2020] selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Light-theme Header Nav */}
      <Nav />

      {/* Floating Copied Toast Alert */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
          toastVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        <div className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-mono font-medium shadow-2xl flex items-center gap-2 border border-white/20">
          <span className="text-[#DE2020]">✓</span>
          <span>{toastMessage}</span>
        </div>
      </div>

      {/* Main Poster Collage Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-16 flex-1 flex flex-col justify-center">
        {/* Collage Artboard Canvas with Notebook Ruling */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 transition-all">
          {/* ================= STICKER LAYER ================= */}

          {/* Sticker 1: Dancing Ladybugs with Floating Musical Notes (Above Row 1 PHONE) */}
          <div className="absolute top-2 sm:top-4 left-6 sm:left-14 md:left-24 z-20 pointer-events-auto group">
            {/* Animated Musical Notes */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-neutral-800 font-serif select-none pointer-events-none">
              <span className="inline-block text-xs sm:text-sm animate-pulse" style={{ animationDelay: '0ms' }}>
                ♫
              </span>
              <span className="inline-block text-sm sm:text-base -translate-y-1 animate-pulse" style={{ animationDelay: '250ms' }}>
                ♬
              </span>
              <span className="inline-block text-xs sm:text-sm animate-pulse" style={{ animationDelay: '500ms' }}>
                ♩
              </span>
              <span className="inline-block text-sm sm:text-base -translate-y-1 animate-pulse" style={{ animationDelay: '750ms' }}>
                ♪
              </span>
            </div>
            <img
              src={dancingLadybugsImg}
              alt="Dancing Ladybugs"
              className="w-14 sm:w-18 md:w-22 h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6 cursor-pointer"
              title="Dancing ladybugs playing tunes"
            />
          </div>

          {/* Sticker 2: Interactive Googly Eyes (Top Right above Phone Row) */}
          <div className="absolute top-4 sm:top-6 right-6 sm:right-12 md:right-16 z-20">
            <GooglyEyes />
          </div>

          {/* Sticker 3: Retro Green UFO with Tractor Beam & Abducted Cow (Center-Right) */}
          <div
            className="absolute top-0 md:-top-6 right-4 sm:right-16 md:right-28 lg:right-48 w-44 sm:w-64 md:w-80 lg:w-[410px] pointer-events-none z-10 select-none animate-float-gentle opacity-90 sm:opacity-95"
            style={{ animationDuration: '6s' }}
          >
            <img
              src={ufoCowImg}
              alt="UFO Abducting Cow in Green Tractor Beam"
              className="w-full h-auto object-contain drop-shadow-[0_12px_28px_rgba(40,160,80,0.22)]"
            />
          </div>

          {/* Sticker 4: Flaming Red Heart (Tractor Beam Left Edge, Near Row 2/3) */}
          <div className="absolute top-[32%] sm:top-[30%] right-[32%] sm:right-[38%] md:right-[40%] lg:right-[43%] z-20 pointer-events-auto group">
            <img
              src={flamingHeartImg}
              alt="Flaming Heart Sticker"
              className="w-14 sm:w-20 md:w-24 lg:w-28 h-auto object-contain filter drop-shadow-[0_6px_14px_rgba(222,32,32,0.3)] transition-transform duration-300 group-hover:scale-120 group-hover:-rotate-12 cursor-pointer active:scale-95"
              title="Flaming Heart"
              onClick={() => showToast('Warm vibes and burning passion for design!')}
            />
          </div>

          {/* Sticker 5: White Gaming Dice (Bottom Left under Row 5 REFERENCES) */}
          <div className="absolute -bottom-2 sm:-bottom-4 left-4 sm:left-10 md:left-14 z-20 pointer-events-auto group">
            <img
              src={whiteDiceImg}
              alt="White Gaming Dice with Black Dots"
              className="w-16 sm:w-22 md:w-28 lg:w-32 h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:scale-115 group-hover:rotate-12 cursor-pointer active:scale-90"
              title="Feeling lucky? Roll the dice!"
              onClick={() => showToast('Rolled a double six! 🎲✨')}
            />
          </div>

          {/* Sticker 6: Green Diamond "777 Luck" Embroidered Patch (Bottom Right) */}
          <div className="absolute -bottom-3 sm:-bottom-4 right-4 sm:right-10 md:right-16 z-20 pointer-events-auto group">
            <img
              src={patch777Img}
              alt="777 Luck Embroidered Patch"
              className="w-16 sm:w-22 md:w-28 lg:w-32 h-auto object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6 cursor-pointer active:scale-95"
              title="777 Luck Embroidered Badge"
              onClick={() => showToast('Good luck unlocked: 777! 🍀')}
            />
          </div>

          {/* ================= NOTEBOOK RULED CONTENT TABLE ================= */}
          <div className="relative z-15 w-full flex flex-col pt-10 sm:pt-14 pb-8">
            {/* Topmost baseline line */}
            <div className="w-full h-px bg-[#F1B2B2]/60" />

            {contactRows.map((row) => (
              <div
                key={row.id}
                className="relative group min-h-[72px] sm:min-h-[88px] md:min-h-[104px] lg:min-h-[116px] flex flex-col justify-end pb-3 sm:pb-4 transition-colors"
              >
                {/* Horizontal Ruled Notebook Pink Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F1B2B2]/70 group-hover:bg-[#DE2020]/40 transition-colors" />

                {/* Row Content Flexbox */}
                <div className="relative flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pr-2 sm:pr-8">
                  {/* Left Column: Bold Number + Label */}
                  <div className="flex items-baseline gap-2 sm:gap-3 cursor-default select-none">
                    <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-black transition-transform duration-200 group-hover:translate-x-1">
                      {row.num}
                    </span>
                    <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-black transition-transform duration-200 group-hover:translate-x-1">
                      {row.label}
                    </span>
                  </div>

                  {/* Right Column: Hand-written / Marker Value */}
                  <div className="sm:self-end sm:text-right mt-1 sm:mt-0">
                    {row.isExternal ? (
                      <a
                        href={row.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-myfont text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide text-neutral-900 hover:text-[#DE2020] transition-colors relative cursor-pointer"
                        title={row.actionLabel}
                      >
                        <span className={row.isUnderlined ? 'underline underline-offset-4 decoration-2 decoration-neutral-800 hover:decoration-[#DE2020]' : ''}>
                          {row.value}
                        </span>
                      </a>
                    ) : row.onAction ? (
                      <button
                        type="button"
                        onClick={row.onAction}
                        className="inline-block text-left sm:text-right font-myfont text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide text-neutral-900 hover:text-[#DE2020] transition-colors relative cursor-pointer active:scale-95"
                        title={row.actionLabel}
                      >
                        <span className={row.isUnderlined ? 'underline underline-offset-4 decoration-2 decoration-neutral-800 hover:decoration-[#DE2020]' : ''}>
                          {row.value}
                        </span>
                      </button>
                    ) : (
                      <a
                        href={row.href}
                        className="inline-block font-myfont text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide text-neutral-900 hover:text-[#DE2020] transition-colors relative cursor-pointer"
                        title={row.actionLabel}
                      >
                        <span className={row.isUnderlined ? 'underline underline-offset-4 decoration-2 decoration-neutral-800 hover:decoration-[#DE2020]' : ''}>
                          {row.value}
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/15 bg-white/70 hover:bg-black hover:text-white text-neutral-700 text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow"
          >
            <span>← Return to Home</span>
          </Link>
        </div>
      </main>

      {/* Subtle Paper-style Footer */}
      <footer className="relative z-10 border-t border-black/10 py-5 text-center text-xs text-neutral-500 font-mono tracking-wider">
        OM BISWAS • SHILLONG, INDIA • DESIGN PORTFOLIO
      </footer>
    </div>
  )
}
