import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const categories = [
  {
    title: 'UI / UX Design',
    desc: 'Mobile applications, user flows, and wireframes designed with Figma & Procreate.',
    tag: 'Interface Design',
    color: 'border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]',
  },
  {
    title: 'Character Design & Illustration',
    desc: 'Original expressive character concepts, sketching, and digital art created in Procreate Dreams.',
    tag: 'Concept Art',
    color: 'border-red-500/20 hover:border-red-500/50 hover:shadow-[0_10px_30px_rgba(239,68,68,0.15)]',
  },
  {
    title: '3D Design & Motion',
    desc: 'Exploratory 3D renders and animations modeled in Blender and AutoCAD.',
    tag: '3D & Motion',
    color: 'border-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]',
  },
]

export default function Work() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#BA1F1F] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Nav />

      {/* Decorative ambient background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-950/20 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-24 sm:pt-28 pb-20 w-full flex-1">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-neutral-400 mb-4">
            Portfolio Showcase
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-display text-white">
            SELECTED <span className="text-[#BA1F1F]">WORKS</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-neutral-400 font-fredoka">
            Curated case studies in UI/UX design, visual art, and character design. Case studies and detailed project deep dives are currently being compiled.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl bg-neutral-900/60 border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 ${cat.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                  {cat.tag}
                </span>
                <span className="text-xs font-mono text-neutral-500">0{idx + 1}</span>
              </div>
              <h2 className="text-xl font-bold font-display text-white group-hover:text-red-400 transition-colors">
                {cat.title}
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-fredoka leading-relaxed">
                {cat.desc}
              </p>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 group-hover:text-white transition-colors">
                <span>View project archive</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-14 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 border border-white/10 hover:border-red-500/50 text-sm font-medium text-neutral-300 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <span>← Back to Home</span>
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
