import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import CVSection from '../components/CVSection'
import ConstellationGrid from '@/components/ui/constellation-grid'

export default function CV() {
  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-[#BA1F1F] selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Constellation Grid Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-60 [&_.mix-blend-difference]:opacity-0"
        aria-hidden="true"
      >
        <ConstellationGrid />
      </div>

      <Nav />

      {/* Top back navigation bar */}
      <header className="relative z-20 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-20 sm:pt-24 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 shadow-sm active:scale-95"
        >
          <span>←</span>
          <span>Back to Portfolio</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#BA1F1F] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Dedicated CV Section
          </span>
        </div>
      </header>

      <main className="w-full relative z-10 pt-2 pb-16 flex-1">
        <CVSection standalone={true} />
      </main>

      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-neutral-500 font-mono">
        OM BISWAS • CURRICULUM VITAE • SHILLONG, INDIA
      </footer>
    </div>
  )
}
