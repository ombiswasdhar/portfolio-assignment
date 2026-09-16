import React from 'react'
import Nav from '../components/Nav'
import CVSection from '../components/CVSection'

export default function CV() {
  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-red-600 selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Nav />
      <main className="w-full pt-14 sm:pt-16 pb-12 flex-1">
        <CVSection standalone={true} />
      </main>
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-neutral-500 font-mono">
        OM BISWAS • CURRICULUM VITAE • SHILLONG, INDIA
      </footer>
    </div>
  )
}
