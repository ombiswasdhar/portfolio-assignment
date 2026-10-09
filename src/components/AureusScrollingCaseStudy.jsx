import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown, Sparkles, X } from 'lucide-react'

import aureusIdeationImg from '../assets/work/aureus/aureus-01-ideation.png'
import aureusUserStudyImg from '../assets/work/aureus/aureus-02-user-study.png'
import aureusPainPointsImg from '../assets/work/aureus/aureus-03-pain-points.png'
import aureusPersonaImg from '../assets/work/aureus/aureus-04-persona.png'
import aureusAdvantagesImg from '../assets/work/aureus/aureus-05-advantages.png'
import projectAureausImg from '../assets/work/project_aureaus.png'

export const AUREUS_FRAMES = [
  {
    id: 'frame-01',
    num: '01',
    title: 'Ideation & Brand Vision',
    subtitle: 'High-performance audio discovery platform & curated luxury catalog',
    image: aureusIdeationImg,
    alt: 'Aureus Ideation and Vision slide',
  },
  {
    id: 'frame-02',
    num: '02',
    title: 'User Study & Target Demographics',
    subtitle: 'Primary (tech-savvy & frequent travelers) and secondary (casual listeners & professionals)',
    image: aureusUserStudyImg,
    alt: 'Aureus User Study target audience slide',
  },
  {
    id: 'frame-03',
    num: '03',
    title: 'User Study & Persona (Ayush)',
    subtitle: 'Student persona mapping daily listening habits, acoustic clarity, and ANC needs',
    image: aureusPersonaImg,
    alt: 'Aureus User Persona Ayush slide',
  },
  {
    id: 'frame-04',
    num: '04',
    title: 'Pain Points & Market Landscape',
    subtitle: 'Multi-Brand vs. Single-Brand sites: navigation, inventory, identity, and pricing',
    image: aureusPainPointsImg,
    alt: 'Aureus Pain Points multi-brand comparison slide',
  },
  {
    id: 'frame-05',
    num: '05',
    title: 'Multi-Brand Platform Advantages',
    subtitle: 'Broader catalog appeal, friction-free side-by-side comparison, and organic reach',
    image: aureusAdvantagesImg,
    alt: 'Aureus Platform Advantages slide',
  },
]

export default function AureusScrollingCaseStudy({ onClose }) {
  const containerRef = useRef(null)

  const scrollToFrame = (frameId) => {
    const el = document.getElementById(frameId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const scrollToTop = () => {
    const el = document.getElementById('aureus-case-study')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="aureus-case-study"
      ref={containerRef}
      className="relative w-full bg-[#08080A] text-white border-t-4 border-b-4 border-black py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-all"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F08264]/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-[500px] h-[300px] bg-[#EAB854]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Case Study Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F08264]/20 border border-[#F08264]/40 text-[#F08264] text-xs font-mono uppercase tracking-widest w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project 03 • Aureus Audio Case Study</span>
            </div>
            <h2 className="font-akira font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white uppercase">
              Aureus Audio Deck
            </h2>
            <p className="font-poppins-light font-light text-neutral-400 text-sm sm:text-base max-w-2xl">
              Complete UX case study presentation — scroll down to explore all 6 research, ideation, user persona, and hardware design frames.
            </p>
          </div>

          {/* Quick Jump Bar & Close Button */}
          <div className="flex items-center gap-3 shrink-0">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-neutral-300 hover:text-white border border-white/20 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                <X className="w-4 h-4" />
                <span>Collapse Case Study</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Jump Frame Pills */}
        <div className="sticky top-16 z-30 py-3 my-4 bg-[#08080A]/90 backdrop-blur-md border-b border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono uppercase text-neutral-400 font-semibold shrink-0 pl-1">
            Jump to:
          </span>
          {AUREUS_FRAMES.map((frame) => (
            <button
              key={frame.id}
              type="button"
              onClick={() => scrollToFrame(frame.id)}
              className="shrink-0 px-3 py-1 rounded-full bg-white/5 hover:bg-[#F08264] hover:text-black text-neutral-300 border border-white/10 hover:border-[#F08264] text-xs font-mono transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              {frame.num}. {frame.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Continuous Scrolling Images Feed */}
        <div className="flex flex-col gap-10 sm:gap-14 pt-6">
          {AUREUS_FRAMES.map((frame, idx) => (
            <motion.article
              id={frame.id}
              key={frame.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 group"
            >
              {/* Frame Label Strip */}
              <div className="flex items-center justify-between px-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-[#F08264]" />
                  <span className="font-bold text-white uppercase tracking-wider">
                    Frame {frame.num} • {frame.title}
                  </span>
                </div>
                <span className="text-neutral-500 text-[11px] hidden sm:inline">
                  {frame.subtitle}
                </span>
              </div>

              {/* High-Resolution Frame Image Container */}
              <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_20px_70px_rgba(0,0,0,0.85)] group-hover:border-[#F08264]/60 transition-colors">
                <img
                  src={frame.image}
                  alt={frame.alt}
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  className="w-full h-auto object-contain block select-none"
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer Navigation Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-400">
            <span>End of Aureus Audio Case Study (6 frames)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#F08264] hover:text-black text-white border border-white/20 hover:border-[#F08264] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top of Deck</span>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E84A4A] hover:bg-[#ff5757] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-lg"
              >
                <X className="w-4 h-4" />
                <span>Close Case Study</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
