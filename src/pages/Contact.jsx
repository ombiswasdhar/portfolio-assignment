import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const socialLinks = [
  { name: 'Instagram', handle: '@om.biswas', url: 'https://instagram.com' },
  { name: 'LinkedIn', handle: 'Om Biswas', url: 'https://linkedin.com' },
  { name: 'Behance', handle: 'ombiswas', url: 'https://behance.net' },
  { name: 'Email', handle: 'ombiswasdhar@gmail.com', url: 'mailto:ombiswasdhar@gmail.com' },
]

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#BA1F1F] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Nav />

      {/* Decorative ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-24 sm:pt-28 pb-20 w-full flex-1 flex flex-col items-center justify-center text-center">
        {/* Header Tag */}
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-neutral-400 mb-4">
          Get in Touch
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-display text-white">
          LET'S CREATE <br />
          <span className="text-[#BA1F1F]">SOMETHING DOPE.</span>
        </h1>

        <p className="mt-4 max-w-lg text-sm sm:text-base text-neutral-400 font-fredoka leading-relaxed">
          Whether you're looking for UI/UX product designs, custom character illustrations, brand graphics, or simply want to chat design — my inbox is always open.
        </p>

        {/* Primary Action Button */}
        <div className="mt-8">
          <a
            href="mailto:ombiswasdhar@gmail.com"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#BA1F1F] hover:bg-red-600 text-white font-bold text-sm sm:text-base shadow-[0_8px_30px_rgba(186,31,31,0.5)] hover:shadow-[0_12px_40px_rgba(186,31,31,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 select-none"
          >
            <span>Say Hello</span>
            <span className="group-hover:translate-x-1 transition-transform">✉️</span>
          </a>
        </div>

        {/* Social Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-xl">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-3.5 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-red-500/40 hover:bg-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-xs font-mono uppercase text-neutral-400 group-hover:text-white transition-colors">
                {item.name}
              </span>
              <span className="mt-1 text-[11px] font-fredoka text-neutral-500 group-hover:text-red-400 transition-colors truncate max-w-full">
                {item.handle}
              </span>
            </a>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wide text-neutral-400 hover:text-white transition-colors"
          >
            <span>← Return to Home</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-neutral-500 font-mono">
        OM BISWAS • SHILLONG, INDIA
      </footer>
    </div>
  )
}
