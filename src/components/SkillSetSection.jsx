import React, { useState } from 'react'
import arrowLogo from '../assets/hero/arrowLogo_rendered.png'
import {
  ProcreateIcon,
  SketchbookIcon,
  FigmaIcon,
  PremierProIcon,
  BlenderIcon,
  PhotoshopIcon,
  IllustratorIcon,
  InShotIcon,
  CanvaIcon,
  AutocadIcon,
  ProcreateDreamsIcon,
} from './SkillIcons'
import { useScrollReveal } from '../hooks/useScrollReveal'

const row1Apps = [
  { name: 'Procreate', Icon: ProcreateIcon, glow: 'hover:shadow-[0_14px_32px_rgba(181,23,158,0.45)]' },
  { name: 'Sketchbook', Icon: SketchbookIcon, glow: 'hover:shadow-[0_14px_32px_rgba(233,91,61,0.45)]' },
  { name: 'Figma', Icon: FigmaIcon, glow: 'hover:shadow-[0_14px_32px_rgba(162,89,255,0.45)]' },
  { name: 'Premier Pro', Icon: PremierProIcon, glow: 'hover:shadow-[0_14px_32px_rgba(30,58,138,0.45)]' },
  { name: 'Blender', Icon: BlenderIcon, glow: 'hover:shadow-[0_14px_32px_rgba(234,118,0,0.45)]' },
]

const row2Apps = [
  { name: 'Photoshop', Icon: PhotoshopIcon, glow: 'hover:shadow-[0_14px_32px_rgba(49,168,255,0.45)]' },
  { name: 'Illustrator', Icon: IllustratorIcon, glow: 'hover:shadow-[0_14px_32px_rgba(255,154,0,0.45)]' },
  { name: 'InShot', Icon: InShotIcon, glow: 'hover:shadow-[0_14px_32px_rgba(255,42,84,0.45)]' },
  { name: 'Canva', Icon: CanvaIcon, glow: 'hover:shadow-[0_14px_32px_rgba(0,196,204,0.45)]' },
  { name: 'Autocad', Icon: AutocadIcon, glow: 'hover:shadow-[0_14px_32px_rgba(216,23,84,0.45)]' },
]

const otherSkillsCol1 = [
  'Sketching',
  'Animation',
  'Product design',
  'Mood boarding',
]

const otherSkillsCol2 = [
  'Painting',
  'Ui/Ux design',
  '3d design',
  'Mind Mapping',
  'Information Collection',
]

const otherSkillsCol3 = [
  'Character design',
  'Graphic design',
  'Animation',
  'User Personas',
]

export default function SkillSetSection() {
  const [hoveredApp, setHoveredApp] = useState(null)
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  return (
    <section
      id="skills"
      aria-label="My Skill Set section"
      className="relative w-full bg-black/75 text-white select-none overflow-hidden pt-0 pb-4 sm:pb-6 md:pb-8"
    >
      {/* Container aligned flush with AboutSection card */}
      <div
        ref={sectionRef}
        className={`relative w-full max-w-[1380px] mx-auto px-3 sm:px-6 md:px-8 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
        }`}
      >
        
        {/* ================= POSTER CARD (Seamless zero gap with AboutSection) ================= */}
        <div className="relative w-full max-w-[1240px] mx-auto rounded-b-[24px] sm:rounded-b-[28px] lg:rounded-b-[36px] rounded-t-none overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.9)] border-b border-x border-white/10 bg-[#F2F0EA] text-neutral-900 px-6 sm:px-12 md:px-16 pt-10 sm:pt-14 md:pt-16 pb-6 sm:pb-8 md:pb-10 transition-all duration-500 hover:border-white/20">
          
          {/* Subtle Paper Grain Overlay */}
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.24] mix-blend-multiply select-none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <filter id="paperNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#paperNoise)" />
          </svg>

          {/* ================= TOP ROW: TITLE & CORNER MONOGRAM ================= */}
          <div className="relative w-full flex items-center justify-center">
            <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-center tracking-tight text-neutral-950">
              My Skill Set
            </h2>

            {/* Top-Right Angular Monogram (Rotated 180° with 360° hover spin) */}
            <div className="absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 pointer-events-auto">
              <img
                src={arrowLogo}
                alt="Monogram"
                title="Monogram"
                className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain filter invert mix-blend-multiply opacity-85 rotate-180 hover:rotate-[360deg] hover:scale-125 active:scale-95 transition-all duration-700 ease-out cursor-pointer"
              />
            </div>
          </div>

          {/* ================= DIGITAL SECTION ================= */}
          <div className="w-full mt-8 sm:mt-10 md:mt-12">
            {/* Section Pill Badge with Interactive Hover State & Shimmer */}
            <div className="flex justify-center mb-7 sm:mb-9 md:mb-10">
              <span className="relative overflow-hidden inline-flex items-center px-6 sm:px-8 py-1 sm:py-1.5 rounded-xl border border-neutral-900 bg-white/50 backdrop-blur-sm text-sm sm:text-base md:text-lg font-medium text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:scale-105 transition-all duration-300 cursor-default select-none group/pill">
                <span className="relative z-10">Digital</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover/pill:animate-[shimmer-sweep_1.2s_ease-in-out] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              </span>
            </div>

            {/* Apps Grid Layout */}
            <div className="max-w-[760px] md:max-w-[820px] mx-auto">
              {/* Desktop / Tablet 5-Column Grid */}
              <div className="hidden sm:grid grid-cols-5 gap-y-8 md:gap-y-10 gap-x-4 sm:gap-x-8 items-start justify-items-center">
                {/* Row 1: Procreate, Sketchbook, Figma, Premier Pro, Blender with staggered scroll cascade */}
                {row1Apps.map((app, idx) => {
                  const IconComponent = app.Icon
                  const delay = isVisible ? `${80 + idx * 70}ms` : '0ms'
                  return (
                    <div
                      key={app.name}
                      className={`group flex flex-col items-center cursor-pointer transition-all duration-600 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
                      }`}
                      style={{ transitionDelay: delay }}
                      onMouseEnter={() => setHoveredApp(app.name)}
                      onMouseLeave={() => setHoveredApp(null)}
                    >
                      <div className={`transition-all duration-300 ease-out group-hover:-translate-y-2.5 group-hover:scale-115 active:scale-95 rounded-2xl ${app.glow}`}>
                        <IconComponent className="w-13 h-13 sm:w-14 sm:h-14 md:w-[58px] md:h-[58px]" />
                      </div>
                      <span className="mt-2 text-xs md:text-sm font-normal text-neutral-800 text-center tracking-tight transition-all duration-200 group-hover:text-black group-hover:font-medium group-hover:scale-105">
                        {app.name}
                      </span>
                    </div>
                  )
                })}

                {/* Row 2: Photoshop, Illustrator, InShot, Canva, Autocad with staggered scroll cascade */}
                {row2Apps.map((app, idx) => {
                  const IconComponent = app.Icon
                  const delay = isVisible ? `${440 + idx * 70}ms` : '0ms'
                  return (
                    <div
                      key={app.name}
                      className={`group flex flex-col items-center cursor-pointer transition-all duration-600 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
                      }`}
                      style={{ transitionDelay: delay }}
                      onMouseEnter={() => setHoveredApp(app.name)}
                      onMouseLeave={() => setHoveredApp(null)}
                    >
                      <div className={`transition-all duration-300 ease-out group-hover:-translate-y-2.5 group-hover:scale-115 active:scale-95 rounded-2xl ${app.glow}`}>
                        <IconComponent className="w-13 h-13 sm:w-14 sm:h-14 md:w-[58px] md:h-[58px]" />
                      </div>
                      <span className="mt-2 text-xs md:text-sm font-normal text-neutral-800 text-center tracking-tight transition-all duration-200 group-hover:text-black group-hover:font-medium group-hover:scale-105">
                        {app.name}
                      </span>
                    </div>
                  )
                })}

                {/* Row 3: Spacer, Spacer, Procreate Dreams, Big 3 Box (Spanning 2 Columns) */}
                <div aria-hidden="true" />
                <div aria-hidden="true" />

                {/* Procreate Dreams with staggered reveal */}
                <div
                  className={`group flex flex-col items-center cursor-pointer transition-all duration-600 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
                  }`}
                  style={{ transitionDelay: isVisible ? '790ms' : '0ms' }}
                  onMouseEnter={() => setHoveredApp('Procreate Dreams')}
                  onMouseLeave={() => setHoveredApp(null)}
                >
                  <div className="transition-all duration-300 ease-out group-hover:-translate-y-2.5 group-hover:scale-115 active:scale-95 rounded-2xl hover:shadow-[0_14px_32px_rgba(0,229,255,0.45)]">
                    <ProcreateDreamsIcon className="w-13 h-13 sm:w-14 sm:h-14 md:w-[58px] md:h-[58px]" />
                  </div>
                  <span className="mt-2 text-xs md:text-sm font-normal text-neutral-800 text-center tracking-tight transition-all duration-200 group-hover:text-black group-hover:font-medium group-hover:scale-105 whitespace-nowrap">
                    Procreate Dreams
                  </span>
                </div>

                {/* Big 3 Box with Interactive Shimmer, Lift, and Staggered Reveal */}
                <div
                  className={`col-span-2 w-full flex items-center justify-start pl-3 sm:pl-5 transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
                  }`}
                  style={{ transitionDelay: isVisible ? '860ms' : '0ms' }}
                >
                  <div className="relative overflow-hidden w-full max-w-[270px] sm:max-w-[290px] md:max-w-[310px] rounded-xl sm:rounded-2xl border border-neutral-900/90 bg-white/50 backdrop-blur-sm px-4 md:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] hover:bg-white/80 hover:-translate-y-1 transition-all duration-300 group/big3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-neutral-950 whitespace-nowrap">
                        Big 3
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BA1F1F] animate-pulse" title="Core Stack" />
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="transition-all duration-200 hover:scale-125 hover:-translate-y-0.5 active:scale-90" title="Procreate">
                        <ProcreateIcon className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" />
                      </div>
                      <div className="transition-all duration-200 hover:scale-125 hover:-translate-y-0.5 active:scale-90" title="Procreate Dreams">
                        <ProcreateDreamsIcon className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" />
                      </div>
                      <div className="transition-all duration-200 hover:scale-125 hover:-translate-y-0.5 active:scale-90" title="Figma">
                        <FigmaIcon className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" />
                      </div>
                    </div>
                    {/* Shimmer sweep effect across card */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/big3:animate-[shimmer-sweep_1.2s_ease-in-out] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Mobile View (< sm): Clean 3-Column Flow with Interactive Micro-Animations */}
              <div className="sm:hidden flex flex-col gap-8">
                <div className="grid grid-cols-3 gap-y-7 gap-x-4 items-start justify-items-center">
                  {[...row1Apps, ...row2Apps, { name: 'Procreate Dreams', Icon: ProcreateDreamsIcon, glow: '' }].map((app) => {
                    const IconComponent = app.Icon
                    return (
                      <div
                        key={app.name}
                        className="flex flex-col items-center group active:scale-95 transition-transform"
                      >
                        <div className="transition-transform duration-200 group-hover:scale-110">
                          <IconComponent className="w-12 h-12" />
                        </div>
                        <span className="mt-1.5 text-xs font-normal text-neutral-800 text-center tracking-tight">
                          {app.name}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Mobile Big 3 Card */}
                <div className="w-full flex justify-center pt-2">
                  <div className="relative overflow-hidden w-full max-w-[280px] rounded-xl border border-neutral-900 bg-white/50 px-4 py-2.5 flex items-center justify-between shadow-sm hover:bg-white/80 transition-all">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-bold font-sans tracking-tight text-neutral-950">
                        Big 3
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BA1F1F] animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2">
                      <ProcreateIcon className="w-8 h-8 hover:scale-110 transition-transform" />
                      <ProcreateDreamsIcon className="w-8 h-8 hover:scale-110 transition-transform" />
                      <FigmaIcon className="w-8 h-8 hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= OTHER SECTION ================= */}
          <div className="w-full mt-12 sm:mt-16 md:mt-20">
            {/* Section Pill Badge with Interactive Hover State & Shimmer */}
            <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
              <span className="relative overflow-hidden inline-flex items-center px-6 sm:px-8 py-1 sm:py-1.5 rounded-xl border border-neutral-900 bg-white/50 backdrop-blur-sm text-sm sm:text-base md:text-lg font-medium text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:scale-105 transition-all duration-300 cursor-default select-none group/pill">
                <span className="relative z-10">Other</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover/pill:animate-[shimmer-sweep_1.2s_ease-in-out] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              </span>
            </div>

            {/* 3 Columns Layout exactly matching Figma matrix with interactive tactile chips & scroll cascades */}
            <div className="max-w-[780px] md:max-w-[840px] mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-y-0 gap-x-6 sm:gap-x-10 text-center">
                {/* Column 1: Sketching, Animation, Product design, Mood boarding */}
                <div
                  className={`flex flex-col items-center space-y-2 sm:space-y-3 transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: isVisible ? '920ms' : '0ms' }}
                >
                  {otherSkillsCol1.map((skill) => (
                    <div
                      key={skill}
                      className="group flex items-center justify-center px-3.5 py-1.5 rounded-full transition-all duration-200 hover:bg-black/8 hover:scale-105 cursor-default select-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BA1F1F] opacity-0 group-hover:opacity-100 mr-2 -ml-1 transition-all duration-200 scale-0 group-hover:scale-100 shrink-0" />
                      <span className="font-sans text-sm sm:text-base font-normal text-neutral-900 tracking-normal transition-colors duration-200 group-hover:text-black group-hover:font-medium">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Column 2: Painting, Ui/Ux design, 3d design, Mind Mapping, Information Collection */}
                <div
                  className={`flex flex-col items-center space-y-2 sm:space-y-3 transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: isVisible ? '1000ms' : '0ms' }}
                >
                  {otherSkillsCol2.map((skill) => (
                    <div
                      key={skill}
                      className="group flex items-center justify-center px-3.5 py-1.5 rounded-full transition-all duration-200 hover:bg-black/8 hover:scale-105 cursor-default select-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BA1F1F] opacity-0 group-hover:opacity-100 mr-2 -ml-1 transition-all duration-200 scale-0 group-hover:scale-100 shrink-0" />
                      <span className="font-sans text-sm sm:text-base font-normal text-neutral-900 tracking-normal transition-colors duration-200 group-hover:text-black group-hover:font-medium">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Column 3: Character design, Graphic design, Animation, User Personas */}
                <div
                  className={`flex flex-col items-center space-y-2 sm:space-y-3 transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: isVisible ? '1080ms' : '0ms' }}
                >
                  {otherSkillsCol3.map((skill) => (
                    <div
                      key={skill}
                      className="group flex items-center justify-center px-3.5 py-1.5 rounded-full transition-all duration-200 hover:bg-black/8 hover:scale-105 cursor-default select-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BA1F1F] opacity-0 group-hover:opacity-100 mr-2 -ml-1 transition-all duration-200 scale-0 group-hover:scale-100 shrink-0" />
                      <span className="font-sans text-sm sm:text-base font-normal text-neutral-900 tracking-normal transition-colors duration-200 group-hover:text-black group-hover:font-medium">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM-RIGHT CORNER MONOGRAM ================= */}
          <div className="relative w-full flex justify-end mt-4 sm:mt-6 md:mt-8">
            <div className="sm:absolute sm:right-2 md:right-4 sm:bottom-0 pointer-events-auto">
              <img
                src={arrowLogo}
                alt="Monogram"
                title="Monogram"
                className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain filter invert mix-blend-multiply opacity-85 hover:rotate-90 hover:scale-125 active:scale-95 transition-all duration-500 ease-out cursor-pointer"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
