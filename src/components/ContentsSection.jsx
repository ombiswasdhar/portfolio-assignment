import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import contentsFullFrame from '../assets/work/contents_full_frame.png'
import previewBusinessCards from '../assets/work/preview_business_cards.png'
import previewAureaus from '../assets/work/preview_aureaus.png'
import previewMelody from '../assets/work/preview_melody.png'
import arrowLogo from '../assets/hero/arrowLogo_rendered.png'
import halftone from '../assets/hero/halftone.png'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  FigmaIcon,
  IllustratorIcon,
  ProcreateIcon,
  BlenderIcon,
  PhotoshopIcon,
  SketchbookIcon,
} from './SkillIcons'

const projectsData = [
  {
    id: 'business-cards',
    number: '01',
    title: 'BUSINESS CARDS',
    subtitle: 'Brand Research, Character Illustration & Print System',
    category: 'Brand Identity & Illustration',
    themeColor: 'purple',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    cardBorder: 'border-purple-500/20 hover:border-purple-500/60 hover:shadow-[0_20px_50px_rgba(168,85,247,0.18)]',
    gradientBg: 'from-purple-950/30 via-neutral-900/60 to-black',
    previewImg: previewBusinessCards,
    tools: [
      { name: 'Figma', Icon: FigmaIcon },
      { name: 'Illustrator', Icon: IllustratorIcon },
      { name: 'Procreate', Icon: ProcreateIcon },
    ],
    courseworkBrief:
      'Students were given the assignment of researching business card and designing their own card, either as a freelancer or an employee of any brand. Analysis of the brand was done after preparing different iterations which include the logo, colours, typefaces, and dimensions.',
    problem:
      'How do you craft a personal creative identity that simultaneously communicates professional design precision, avant-garde character illustration, and print-production rigor?',
    solution:
      'Developed "Qi Studio" — a dual-tone cybernetic brand anchored by a high-contrast anime character portrait, custom geometric monogram, and interactive QR code linking to digital case studies.',
    deliverables: [
      'Market & competitive brand analysis',
      'Original illustrated character mascot & avatar in Procreate',
      'Typography hierarchy & micro-dimension grid (3.5" x 2" with 0.125" bleed)',
      'Custom vector QR code with print-safe error correction',
    ],
    palette: [
      { name: 'Cyber Lilac', hex: '#B399D4' },
      { name: 'Deep Violet', hex: '#5B21B6' },
      { name: 'Neon Cyan', hex: '#06B6D4' },
      { name: 'Charcoal Noir', hex: '#1C1D21' },
    ],
    featureBadge: 'Interactive Scanline & QR Integrated',
  },
  {
    id: 'aureaus',
    number: '02',
    title: 'AUREAUS',
    subtitle: 'Audiophile Review Platform & 3D Hardware Modeling',
    category: '3D Product Design & Editorial',
    themeColor: 'amber',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    cardBorder: 'border-amber-500/20 hover:border-amber-500/60 hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)]',
    gradientBg: 'from-amber-950/30 via-neutral-900/60 to-black',
    previewImg: previewAureaus,
    tools: [
      { name: 'Blender 3D', Icon: BlenderIcon },
      { name: 'Photoshop', Icon: PhotoshopIcon },
      { name: 'Figma', Icon: FigmaIcon },
    ],
    courseworkBrief:
      'Aureaus is your go-to site for discovering top review headphones made by the best brands for audio in the market. We focus on bringing you a carefully curated range of flawless, high performance headphones that combine superior sound with sleek design.',
    problem:
      'High-end headphone websites often look cluttered with technical specs. The goal was to elevate audio hardware to an editorial art piece with high-fidelity 3D modeling.',
    solution:
      'Constructed detailed 3D studio headphone models with floating pill/spherical geometries in Blender, paired with high-fashion editorial lookbook typography inspired by Japanese audio publications.',
    deliverables: [
      'High-poly 3D headphone modeling, materials & studio lighting in Blender',
      'Editorial lookbook magazine layout ("SOMETHING AUDIO")',
      'Headphone performance radar chart & acoustic telemetry UI',
      'Dark-mode e-commerce landing page design system',
    ],
    palette: [
      { name: 'Amber Glow', hex: '#F59E0B' },
      { name: 'Hardware Gold', hex: '#D97706' },
      { name: 'Matte Obsidian', hex: '#18181B' },
      { name: 'Crisp White', hex: '#FFFFFF' },
    ],
    featureBadge: '3D Turntable & Equalizer Waves',
  },
  {
    id: 'melody',
    number: '03',
    title: 'MELODY',
    subtitle: 'Cinema & Concert Ticket Checkout Journey',
    category: 'UI/UX Design & User Flow',
    themeColor: 'blue',
    badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    cardBorder: 'border-cyan-500/20 hover:border-cyan-500/60 hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)]',
    gradientBg: 'from-blue-950/30 via-neutral-900/60 to-black',
    previewImg: previewMelody,
    tools: [
      { name: 'Figma', Icon: FigmaIcon },
      { name: 'Sketchbook', Icon: SketchbookIcon },
    ],
    courseworkBrief:
      "The task was to develop a website on any subject named 'MELODY,' and demonstrate a user flow for an activity on the site. For instance, outlining the steps of purchasing a movie ticket online or navigating through various sections of a website.",
    problem:
      'Online ticket booking often induces drop-off fatigue during seat selection and payment verification steps due to visual noise.',
    solution:
      'Mapped a 4-step streamlined booking funnel from event discovery to digital ticket receipt, highlighted by tactile 3D floating spheres and dynamic "NEW SEASON TICKETS!!" promotion overlays.',
    deliverables: [
      'Information architecture & full user journey blueprint',
      'Interactive cinema hall seat picker with category pricing tiers',
      'Concert/movie promotion cards with floating 3D bubble art',
      'Instant mobile digital pass ticket confirmation screen',
    ],
    palette: [
      { name: 'Electric Azure', hex: '#3B82F6' },
      { name: 'Neon Cyan', hex: '#06B6D4' },
      { name: 'Sky Cornflower', hex: '#60A5FA' },
      { name: 'Midnight Charcoal', hex: '#0F172A' },
    ],
    featureBadge: 'End-to-End User Flow Prototype',
  },
]

export default function ContentsSection() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
  const [activeTab, setActiveTab] = useState('spotlight') // 'spotlight' | 'grid' | 'poster'
  const [activeProjectModal, setActiveProjectModal] = useState(null)
  const [copiedColor, setCopiedColor] = useState(null)
  const [selectedSpotlightIdx, setSelectedSpotlightIdx] = useState(0)

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex)
    setCopiedColor(hex)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const spotlightProject = projectsData[selectedSpotlightIdx]

  return (
    <section
      id="work"
      aria-label="Selected Works and Coursework Projects"
      className="relative w-full bg-black/75 text-white select-none overflow-hidden pt-8 sm:pt-14 pb-16 sm:pb-24"
    >
      {/* Dynamic Background Atmosphere Glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-red-950/25 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-10 w-[550px] h-[450px] bg-purple-950/20 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-cyan-950/15 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div
        ref={sectionRef}
        className={`relative w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-8 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
        }`}
      >
        {/* ================= TELEMETRY TOP BAR & CONTROLS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-6 sm:mb-8">
          {/* Left: Telemetry Badge */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 text-neutral-300 font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#BA1F1F] animate-pulse" />
              <span>04 // Coursework Archive</span>
            </span>
            <span className="hidden md:inline-block text-[11px] font-mono text-neutral-500">
              SYMBIOSIS B.DES • 2ND YEAR
            </span>
          </div>

          {/* Right: View Mode Switcher */}
          <div className="flex items-center p-1 rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-md shadow-lg">
            <button
              type="button"
              onClick={() => setActiveTab('spotlight')}
              className={`px-3.5 py-1 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer ${
                activeTab === 'spotlight'
                  ? 'bg-[#BA1F1F] text-white font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Spotlight Focus
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('grid')}
              className={`px-3.5 py-1 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-[#BA1F1F] text-white font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              3D Cards Grid
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('poster')}
              className={`px-3.5 py-1 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer ${
                activeTab === 'poster'
                  ? 'bg-[#BA1F1F] text-white font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Figma Poster
            </button>
          </div>
        </div>

        {/* ================= HERO HEADLINE & HANDWRITTEN NOTE STICKER ================= */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-14">
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#BA1F1F] font-bold block mb-2">
                Portfolio Showcase
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-display text-white leading-none">
                SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">WORKS</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-neutral-400 font-fredoka leading-relaxed">
                Three curated design assignments exploring brand identities, high-precision 3D hardware rendering, and frictionless digital user flows.
              </p>
            </div>

            {/* Handcrafted Post-It Note Disclaimer (Elevated from original Figma frame) */}
            <div className="relative group/note self-start md:self-auto shrink-0 max-w-sm">
              <div className="relative p-4 rounded-2xl bg-[#1C1A1F] border border-amber-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] -rotate-1 hover:rotate-0 transition-transform duration-300">
                {/* Decorative Pin */}
                <div className="absolute -top-2.5 left-6 w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-red-700 shadow-md border border-white/30" />

                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-script text-xl font-bold text-amber-300">
                    disclaimer !
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300 ml-auto">
                    coursework
                  </span>
                </div>

                <p className="font-script text-sm sm:text-[15px] text-neutral-200 leading-snug">
                  "all the projects showcased here are my 2nd year college assignments (3 projects) which i created as part of my coursework."
                </p>

                <div className="mt-2 pt-1 border-t border-white/10 flex items-center justify-between">
                  <span className="font-script text-xs text-neutral-400">
                    (see, that's my real handwriting , don't judge 😄)
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">✍️ Om</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= VIEW 1: SPOTLIGHT FOCUS REEL ================= */}
        {activeTab === 'spotlight' && (
          <div className="max-w-5xl mx-auto">
            {/* Spotlight Project Selector Tabs */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-6">
              {projectsData.map((p, idx) => {
                const isSelected = selectedSpotlightIdx === idx
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedSpotlightIdx(idx)}
                    className={`relative text-left p-3 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                      isSelected
                        ? `${p.cardBorder} bg-neutral-900/90 shadow-xl scale-[1.01]`
                        : 'border-white/10 bg-neutral-950/60 hover:border-white/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-neutral-400">
                        0{idx + 1}
                      </span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${p.badgeClass}`}>
                        {p.category.split('&')[0]}
                      </span>
                    </div>
                    <div className="font-display font-bold text-xs sm:text-sm text-white truncate">
                      {p.title}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Main Featured Showcase Card */}
            <div className={`relative rounded-3xl border ${spotlightProject.cardBorder} bg-gradient-to-br ${spotlightProject.gradientBg} p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl transition-all duration-500`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Interactive Visual Canvas */}
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/80 aspect-[16/11] group/art shadow-2xl">
                    <img
                      src={spotlightProject.previewImg}
                      alt={spotlightProject.title}
                      className="w-full h-full object-contain p-4 group-hover/art:scale-105 transition-transform duration-500"
                    />

                    {/* Scanline / Interactive Overlay */}
                    {spotlightProject.id === 'business-cards' && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="w-full h-1 bg-purple-400 shadow-[0_0_15px_#a855f7] animate-scanline opacity-60" />
                      </div>
                    )}

                    {/* Equalizer overlay for Aureaus */}
                    {spotlightProject.id === 'aureaus' && (
                      <div className="absolute bottom-4 right-4 flex items-end gap-1 bg-black/70 px-2.5 py-1.5 rounded-lg border border-amber-500/30 backdrop-blur-md">
                        <span className="text-[9px] font-mono text-amber-400 mr-1.5">AUDIO</span>
                        <div className="w-1 bg-amber-400 rounded-full animate-equalizer-1" />
                        <div className="w-1 bg-amber-400 rounded-full animate-equalizer-2" />
                        <div className="w-1 bg-amber-400 rounded-full animate-equalizer-3" />
                        <div className="w-1 bg-amber-400 rounded-full animate-equalizer-4" />
                        <div className="w-1 bg-amber-400 rounded-full animate-equalizer-5" />
                      </div>
                    )}

                    {/* Flow pill for Melody */}
                    {spotlightProject.id === 'melody' && (
                      <div className="absolute top-4 left-4 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>LIVE TICKET FLOW</span>
                      </div>
                    )}

                    {/* Click to Expand Action Pill */}
                    <button
                      type="button"
                      onClick={() => setActiveProjectModal(spotlightProject)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover/art:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                    >
                      <span className="px-4 py-2 rounded-full bg-white text-black text-xs font-mono font-bold tracking-wider shadow-2xl hover:scale-105 transition-transform flex items-center gap-2">
                        <span>INSPECT DEEP DIVE</span>
                        <span>🔍</span>
                      </span>
                    </button>
                  </div>

                  {/* Feature Tag Under Preview */}
                  <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="text-[11px] text-neutral-400">
                      ⚡ {spotlightProject.featureBadge}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveProjectModal(spotlightProject)}
                      className="text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
                    >
                      Read Full Case Study →
                    </button>
                  </div>
                </div>

                {/* Right Column: Project Details & Deliverables */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    {/* Header meta */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-mono font-bold text-red-500">
                        {spotlightProject.number} // 03
                      </span>
                      <span className="text-xs font-mono text-neutral-500">•</span>
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                        {spotlightProject.category}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight mb-2">
                      {spotlightProject.title}
                    </h3>

                    <p className="text-sm text-neutral-400 font-mono mb-4">
                      {spotlightProject.subtitle}
                    </p>

                    {/* Coursework Assignment Quote Box */}
                    <div className="rounded-2xl bg-black/50 border border-white/10 p-4 mb-5 shadow-inner">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                        Coursework Brief
                      </span>
                      <p className="text-xs sm:text-sm font-fredoka text-neutral-200 leading-relaxed">
                        "{spotlightProject.courseworkBrief}"
                      </p>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="mb-5">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                        Key Deliverables
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-sm font-fredoka text-neutral-300">
                        {spotlightProject.deliverables.slice(0, 3).map((del, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-400 font-mono">✓</span>
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools Used Row */}
                    <div className="mb-6 flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mr-2">
                        Software:
                      </span>
                      {spotlightProject.tools.map((tool) => {
                        const Icon = tool.Icon
                        return (
                          <div
                            key={tool.name}
                            title={tool.name}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200 text-xs font-mono hover:bg-white/10 transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{tool.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveProjectModal(spotlightProject)}
                      className="px-6 py-2.5 rounded-full bg-[#BA1F1F] hover:bg-red-600 text-white font-mono text-xs font-bold tracking-wider shadow-[0_4px_16px_rgba(186,31,31,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Explore Full Dossier ↗
                    </button>
                    <Link
                      to="/cv"
                      className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono tracking-wider transition-all"
                    >
                      View Om's CV
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: 3D CARDS GRID ================= */}
        {activeTab === 'grid' && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.map((project, idx) => (
              <div
                key={project.id}
                className={`group relative rounded-3xl border ${project.cardBorder} bg-gradient-to-b ${project.gradientBg} p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 backdrop-blur-md`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      0{idx + 1}
                    </span>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${project.badgeClass}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Artwork Preview */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 aspect-[16/11] mb-5 shadow-lg group-hover:border-white/30 transition-colors">
                    <img
                      src={project.previewImg}
                      alt={project.title}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white text-black text-[11px] font-mono font-bold shadow-xl">
                        View Dossier →
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-black font-display text-white group-hover:text-red-400 transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-xs font-fredoka text-neutral-300 leading-relaxed line-clamp-3 mb-4">
                    {project.courseworkBrief}
                  </p>
                </div>

                <div>
                  {/* Tools Row */}
                  <div className="pt-3 border-t border-white/10 mb-4 flex items-center gap-1.5 flex-wrap">
                    {project.tools.map((t) => {
                      const Icon = t.Icon
                      return (
                        <div
                          key={t.name}
                          title={t.name}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-300"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{t.name}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(project)}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-[#BA1F1F] text-white text-xs font-mono font-bold tracking-wide transition-all active:scale-95 cursor-pointer shadow-md"
                  >
                    Open Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= VIEW 3: AUTHENTIC FIGMA POSTER ARCHIVE ================= */}
        {activeTab === 'poster' && (
          <div className="max-w-xl mx-auto text-center">
            <div className="rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] bg-[#0E0E12] relative group">
              <img
                src={contentsFullFrame}
                alt="Figma Frame 288-222: 2nd Year College Coursework Contents Poster"
                className="w-full h-auto object-contain select-none"
              />
            </div>
            <p className="mt-4 text-xs font-mono text-neutral-400">
              Authentic vector layout from Figma node 288-222 • Tactile Pinned Board & Risograph Halftone
            </p>
          </div>
        )}

        {/* ================= DEEP DIVE MODAL / CASE STUDY DOSSIER ================= */}
        {activeProjectModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setActiveProjectModal(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#131418] border border-white/20 p-6 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-sm transition-all cursor-pointer active:scale-95"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Header Badge */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-bold text-[#BA1F1F]">
                  PROJECT {activeProjectModal.number}
                </span>
                <span className={`text-[10px] font-mono px-3 py-0.5 rounded-full border ${activeProjectModal.badgeClass}`}>
                  {activeProjectModal.category}
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  Symbiosis 2nd Year Coursework
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 id="modal-project-title" className="text-3xl sm:text-4xl font-black font-display text-white mb-2">
                {activeProjectModal.title}
              </h3>
              <p className="text-sm font-mono text-neutral-400 mb-6">
                {activeProjectModal.subtitle}
              </p>

              {/* Artwork Showcase */}
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/90 p-4 sm:p-6 aspect-[16/10] flex items-center justify-center mb-6 shadow-2xl">
                <img
                  src={activeProjectModal.previewImg}
                  alt={activeProjectModal.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Coursework Assignment Quote */}
              <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-5 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                  Assignment Prompt & Requirements
                </span>
                <p className="text-xs sm:text-sm font-fredoka text-neutral-200 leading-relaxed">
                  "{activeProjectModal.courseworkBrief}"
                </p>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs font-mono font-bold text-rose-400 block mb-1">
                    🎯 Design Challenge
                  </span>
                  <p className="text-xs font-fredoka text-neutral-300 leading-relaxed">
                    {activeProjectModal.problem}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">
                    💡 Creative Solution
                  </span>
                  <p className="text-xs font-fredoka text-neutral-300 leading-relaxed">
                    {activeProjectModal.solution}
                  </p>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                  Completed Deliverables & Specs
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProjectModal.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-neutral-900/60 border border-white/5 text-xs font-fredoka text-neutral-300 flex items-start gap-2"
                    >
                      <span className="text-red-400 font-mono">0{idx + 1}.</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Palette Swatches (Interactive Copy) */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Curated Color Palette (Click to Copy Hex)
                  </span>
                  {copiedColor && (
                    <span className="text-[11px] font-mono text-emerald-400">
                      ✓ Copied {copiedColor}!
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {activeProjectModal.palette.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => copyHex(color.hex)}
                      className="group/swatch p-2 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-white/30 text-left transition-all cursor-pointer flex items-center gap-2.5"
                    >
                      <div
                        className="w-7 h-7 rounded-lg shrink-0 border border-white/20 shadow-inner group-hover/swatch:scale-105 transition-transform"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="truncate">
                        <div className="text-[11px] font-mono text-white truncate">
                          {color.name}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          {color.hex}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
                <a
                  href="mailto:ombiswasdhar@gmail.com?subject=Inquiry%20regarding%20portfolio%20project"
                  className="px-5 py-2 rounded-full bg-[#BA1F1F] hover:bg-red-600 text-white text-xs font-mono font-bold tracking-wide transition-all shadow-md active:scale-95"
                >
                  Inquire About This Project ✉️
                </a>

                <div className="flex items-center gap-2">
                  <Link
                    to="/cv"
                    onClick={() => setActiveProjectModal(null)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-neutral-200 hover:text-white transition-all"
                  >
                    View CV
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(null)}
                    className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= BOTTOM BAR & CV BRIDGING ================= */}
        <div className="relative mt-14 sm:mt-18 pt-6 border-t border-white/10 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          {/* Subtle Halftone Pattern Overlay */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl h-12 opacity-15 pointer-events-none mix-blend-screen bg-repeat-x"
            style={{ backgroundImage: `url(${halftone})`, backgroundSize: 'contain' }}
            aria-hidden="true"
          />

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>OM BISWAS • 2ND YEAR DESIGN COURSEWORK • SYMBIOIS</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cv"
              className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-neutral-200 hover:text-white transition-all text-xs font-mono flex items-center gap-2 shadow-sm"
            >
              <span>View Full Curriculum Vitae</span>
              <span className="text-[#BA1F1F]">→</span>
            </Link>
            <img
              src={arrowLogo}
              alt="Arrow logo"
              className="w-5 h-5 object-contain filter invert opacity-70 hover:opacity-100 hover:rotate-45 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
