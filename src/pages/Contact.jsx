import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import ContactFloatingElements from '../components/ContactFloatingElements'

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
      actionLabel: 'Click to copy phone number',
    },
    {
      id: 2,
      num: '(2)',
      label: 'EMAIL',
      value: 'OMBISWASDHAR@GMAIL.COM',
      href: 'mailto:ombiswasdhar@gmail.com',
      isUnderlined: false,
      onAction: () => copyToClipboard('ombiswasdhar@gmail.com', 'email address'),
      actionLabel: 'Click to copy email address',
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
    <div className="relative min-h-screen ca-dotted-grid-bg bg-white text-neutral-900 selection:bg-[#DE2020] selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Dotted Grid Paper Pattern */}
      <div className="ca-dotted-grid-pattern" aria-hidden="true" />

      {/* Light-theme Header Nav */}
      <Nav />

      {/* Floating Background Stickers & Doodles */}
      <ContactFloatingElements />



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

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-48 sm:pt-52 md:pt-40 lg:pt-36 pb-20 flex-1 flex flex-col justify-start md:justify-center">
        {/* Ruled Black Paper Canvas */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 transition-all mt-2 sm:mt-0">
          <div className="relative z-10 w-full flex flex-col">
            {/* Topmost baseline ruled line */}
            <div className="w-full h-px bg-black/15" />

            {contactRows.map((row) => (
              <div
                key={row.id}
                className="relative group min-h-[80px] sm:min-h-[96px] md:min-h-[114px] lg:min-h-[128px] flex flex-col justify-end pb-3 sm:pb-4.5 transition-colors"
              >
                {/* Horizontal Ruled Black Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-black/15 group-hover:bg-[#DE2020]/60 transition-colors" />

                {/* Row Content Flexbox */}
                <div className="relative flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pr-2 sm:pr-8">
                  {/* Left Column: Bold Number + Label */}
                  <div className="flex items-baseline gap-2.5 sm:gap-4 cursor-default select-none">
                    <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-black transition-transform duration-200 group-hover:translate-x-1.5">
                      {row.num}
                    </span>
                    <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-black transition-transform duration-200 group-hover:translate-x-1.5">
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
                        className="inline-block font-myfont text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide text-neutral-900 hover:text-[#DE2020] transition-colors relative cursor-pointer"
                        title={row.actionLabel}
                      >
                        <span className={row.isUnderlined ? 'underline underline-offset-6 sm:underline-offset-8 decoration-2 decoration-neutral-800 hover:decoration-[#DE2020]' : ''}>
                          {row.value}
                        </span>
                      </a>
                    ) : row.onAction ? (
                      <button
                        type="button"
                        onClick={row.onAction}
                        className="inline-block text-left sm:text-right font-myfont text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide text-neutral-900 hover:text-[#DE2020] transition-colors relative cursor-pointer active:scale-95"
                        title={row.actionLabel}
                      >
                        <span className={row.isUnderlined ? 'underline underline-offset-6 sm:underline-offset-8 decoration-2 decoration-neutral-800 hover:decoration-[#DE2020]' : ''}>
                          {row.value}
                        </span>
                      </button>
                    ) : (
                      <a
                        href={row.href}
                        className="inline-block font-myfont text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide text-neutral-900 hover:text-[#DE2020] transition-colors relative cursor-pointer"
                        title={row.actionLabel}
                      >
                        <span className={row.isUnderlined ? 'underline underline-offset-6 sm:underline-offset-8 decoration-2 decoration-neutral-800 hover:decoration-[#DE2020]' : ''}>
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
        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/15 bg-neutral-50 hover:bg-black hover:text-white text-neutral-700 text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow"
          >
            <span>← Return to Home</span>
          </Link>
        </div>
      </main>

      {/* Clean Paper-style Footer */}
      <footer className="relative z-10 border-t border-black/10 py-6 text-center text-xs text-neutral-500 font-mono tracking-wider bg-white/70 backdrop-blur-sm">
        OM BISWAS • SHILLONG, INDIA • DESIGN PORTFOLIO
      </footer>
    </div>
  )
}
