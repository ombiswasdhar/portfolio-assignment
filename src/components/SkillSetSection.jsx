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
import { FloatingIconsHero } from '@/components/ui/floating-icons-hero-section'
import HelixChronoMatrix from '@/components/ui/helix-chrono-matrix'
import SoftwareLogosSpiral3D from './SoftwareLogosSpiral3D'
import FloatingGreenMatSkills from './FloatingGreenMatSkills'

// Floating ambient draggable icons using actual skill set app icons
// Scaled down, positioned along open perimeter margins with ZERO element overlap
// Fully interactive: users can drag and place them anywhere!
const floatingAppIcons = [
  {
    id: 1,
    icon: ProcreateIcon,
    className: 'top-[3.5%] left-[3%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto',
  },
  {
    id: 2,
    icon: SketchbookIcon,
    // Relocated to open upper-right perimeter pocket safely below monogram and above row 1
    className: 'top-[13%] right-[2.5%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto',
  },
  {
    id: 3,
    icon: FigmaIcon,
    className: 'top-[23%] left-[1.5%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto',
  },
  {
    id: 4,
    icon: PremierProIcon,
    className: 'top-[27%] right-[2%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto',
  },
  {
    id: 5,
    icon: BlenderIcon,
    className: 'top-[43%] left-[1.5%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto hidden sm:block',
  },
  {
    id: 6,
    icon: PhotoshopIcon,
    className: 'top-[47%] right-[2%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto hidden sm:block',
  },
  {
    id: 7,
    icon: IllustratorIcon,
    className: 'top-[63%] left-[2%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto',
  },
  {
    id: 8,
    icon: InShotIcon,
    className: 'top-[67%] right-[2.5%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto',
  },
  {
    id: 9,
    icon: CanvaIcon,
    className: 'bottom-[16%] left-[2.5%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto',
  },
  {
    id: 10,
    icon: AutocadIcon,
    className: 'bottom-[14%] right-[3%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto hidden sm:block',
  },
  {
    id: 11,
    icon: ProcreateDreamsIcon,
    // Relocated to open bottom-left perimeter pocket with zero overlap with Other skills column 2
    className: 'bottom-[3.5%] left-[5%] scale-[0.52] sm:scale-[0.62] md:scale-[0.68] opacity-35 hover:opacity-100 transition-opacity duration-300 filter grayscale-[50%] hover:grayscale-0 pointer-events-auto',
  },
]

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

const allAppsList = [
  { name: 'Procreate', Icon: ProcreateIcon, glow: 'hover:shadow-[0_14px_32px_rgba(181,23,158,0.45)]', color: '#b5179e' },
  { name: 'Sketchbook', Icon: SketchbookIcon, glow: 'hover:shadow-[0_14px_32px_rgba(233,91,61,0.45)]', color: '#e95b3d' },
  { name: 'Figma', Icon: FigmaIcon, glow: 'hover:shadow-[0_14px_32px_rgba(162,89,255,0.45)]', color: '#a259ff' },
  { name: 'Premier Pro', Icon: PremierProIcon, glow: 'hover:shadow-[0_14px_32px_rgba(30,58,138,0.45)]', color: '#1e3a8a' },
  { name: 'Blender', Icon: BlenderIcon, glow: 'hover:shadow-[0_14px_32px_rgba(234,118,0,0.45)]', color: '#ea7600' },
  { name: 'Photoshop', Icon: PhotoshopIcon, glow: 'hover:shadow-[0_14px_32px_rgba(49,168,255,0.45)]', color: '#31a8ff' },
  { name: 'Illustrator', Icon: IllustratorIcon, glow: 'hover:shadow-[0_14px_32px_rgba(255,154,0,0.45)]', color: '#ff9a00' },
  { name: 'InShot', Icon: InShotIcon, glow: 'hover:shadow-[0_14px_32px_rgba(255,42,84,0.45)]', color: '#ff2a54' },
  { name: 'Canva', Icon: CanvaIcon, glow: 'hover:shadow-[0_14px_32px_rgba(0,196,204,0.45)]', color: '#00c4cc' },
  { name: 'Autocad', Icon: AutocadIcon, glow: 'hover:shadow-[0_14px_32px_rgba(216,23,84,0.45)]', color: '#d81754' },
  { name: 'Procreate Dreams', Icon: ProcreateDreamsIcon, glow: 'hover:shadow-[0_14px_32px_rgba(0,229,255,0.45)]', color: '#00e5ff' },
]

export default function SkillSetSection() {
  const [hoveredApp, setHoveredApp] = useState(null)
  const [isSpiralMode, setIsSpiralMode] = useState(true)
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  return (
    <section
      id="skills"
      aria-label="My Skill Set section"
      className="relative w-full bg-black/75 text-white select-none overflow-hidden pt-0 pb-0"
    >
      {/* Container aligned flush with AboutSection card */}
      <div
        ref={sectionRef}
        className={`relative w-full max-w-[1440px] mx-auto px-2 sm:px-4 md:px-6 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
        }`}
      >
        
        {/* ================= POSTER CARD (Pure black background) ================= */}
        <div
          style={{ backgroundColor: '#000000' }}
          className="relative w-full max-w-[1440px] mx-auto rounded-none overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.9)] border-b border-x border-white/10 !bg-black text-white px-6 sm:px-12 md:px-16 pt-10 sm:pt-14 md:pt-16 pb-6 sm:pb-8 md:pb-10 transition-all duration-500 hover:border-white/20"
        >
          {/* ================= NEDDEV HELIX CHRONO MATRIX BACKGROUND ANIMATION ================= */}
          {/* Glowing red while spiral is active, normal subtle animation in grid mode */}
          <div
            className={`absolute inset-0 w-full h-full z-0 overflow-hidden transition-all duration-700 ${
              isSpiralMode
                ? 'opacity-90 pointer-events-auto shadow-[inset_0_0_28px_rgba(239,68,68,0.22)] bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.18),_transparent_55%)]'
                : 'opacity-40 pointer-events-auto hover:opacity-60 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_60%)]'
            }`}
            aria-hidden="true"
          >
            <HelixChronoMatrix
              headline=""
              lineColor={isSpiralMode ? 'red' : 'soft-red'}
              transparentBg={true}
              className="w-full h-full !bg-transparent [&_header]:hidden [&_main]:hidden"
            />
          </div>

          {/* NedDev Floating Icons Hero Component - Visible in grid mode, seamlessly part of 3D spiral animation in spiral mode */}
          <FloatingIconsHero
            className={`absolute inset-0 w-full h-full min-h-0 !h-full !bg-transparent overflow-hidden z-20 pointer-events-none select-none [&>div.relative.z-10]:hidden transition-opacity duration-500 ${
              isSpiralMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            title=""
            subtitle=""
            ctaText=""
            ctaHref="#"
            icons={floatingAppIcons}
          />

          {/* ================= TOP ROW: TITLE & CORNER MONOGRAM ================= */}
          <div className="relative z-10 w-full flex items-center justify-center">
            <h2 className="font-thunder text-5xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[98px] font-semibold text-center tracking-wide uppercase text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)] leading-none">
              My Skill Set
            </h2>

            {/* Top-Right Angular Monogram (Rotated 180° with 360° hover spin) */}
            <div className="absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 pointer-events-auto">
              <img
                src={arrowLogo}
                alt="Monogram"
                title="Monogram"
                className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain filter brightness-0 invert opacity-85 rotate-180 hover:rotate-[360deg] hover:scale-125 active:scale-95 transition-all duration-700 ease-out cursor-pointer"
              />
            </div>
          </div>

          {/* ================= SOFTWARE SKILLS SECTION ================= */}
          <div className="relative z-10 w-full mt-6 sm:mt-8 md:mt-10">
            {/* Conditional Display: 3D Helical Spiral Orbit OR Original 2D Grid Layout */}
            {isSpiralMode ? (
              <div className="w-full max-w-[1360px] mx-auto animate-fadeIn transition-all duration-500">
                <SoftwareLogosSpiral3D
                  apps={allAppsList}
                  onIconClick={(clickedApp) => {
                    setIsSpiralMode(false)
                    if (clickedApp?.name) {
                      setHoveredApp(clickedApp.name)
                      setTimeout(() => setHoveredApp(null), 2400)
                    }
                  }}
                />
              </div>
            ) : (
              /* The Exact Original 2D Grid Layout */
              <div className="max-w-[760px] md:max-w-[820px] mx-auto animate-fadeIn transition-all duration-500">
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
                      <span className="mt-2 text-xs md:text-sm font-normal text-neutral-300 text-center tracking-tight transition-all duration-200 group-hover:text-white group-hover:font-medium group-hover:scale-105">
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
                      <span className="mt-2 text-xs md:text-sm font-normal text-neutral-300 text-center tracking-tight transition-all duration-200 group-hover:text-white group-hover:font-medium group-hover:scale-105">
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
                  <span className="mt-2 text-xs md:text-sm font-normal text-neutral-300 text-center tracking-tight transition-all duration-200 group-hover:text-white group-hover:font-medium group-hover:scale-105 whitespace-nowrap">
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
                  <div className="relative overflow-hidden w-full max-w-[270px] sm:max-w-[290px] md:max-w-[310px] rounded-xl sm:rounded-2xl border border-white/20 bg-neutral-900/80 backdrop-blur-sm px-4 md:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-[0_4px_14px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_28px_rgba(220,38,38,0.2)] hover:border-white/40 hover:-translate-y-1 transition-all duration-300 group/big3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-fredoka font-normal text-xl sm:text-2xl tracking-normal text-white whitespace-nowrap leading-none">
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
                    <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/big3:animate-[shimmer-sweep_1.2s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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
                        <span className="mt-1.5 text-xs font-normal text-neutral-300 text-center tracking-tight">
                          {app.name}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Mobile Big 3 Card */}
                <div className="w-full flex justify-center pt-2">
                  <div className="relative overflow-hidden w-full max-w-[280px] rounded-xl border border-white/20 bg-neutral-900/80 px-4 py-2.5 flex items-center justify-between shadow-sm hover:border-white/40 transition-all">
                    <div className="flex items-center gap-1.5">
                      <span className="font-fredoka font-normal text-xl tracking-normal text-white leading-none">
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

              {/* Return to 3D Orbit Button rendered in user's MyFont with NO surrounding bar */}
              <div className="w-full flex justify-center mt-10">
                <button
                  type="button"
                  onClick={() => setIsSpiralMode(true)}
                  className="font-myfont text-xl sm:text-2xl md:text-3xl text-neutral-300 hover:text-white transition-all duration-300 cursor-pointer tracking-wider flex items-center gap-2.5 bg-transparent border-0 p-0 select-none group/back hover:scale-105 active:scale-95 drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse group-hover/back:scale-125 transition-transform" />
                  <span>click to return to 3d spiral orbit</span>
                </button>
              </div>
            </div>
          )}
        </div>

          {/* ================= OTHER SECTION WITH FLOATING GREEN CUTTING MAT ================= */}
          <div className="relative z-10 w-full mt-14 sm:mt-18 md:mt-24 mb-6">
            {/* Section Heading written in user's MyFont with NO surrounding pill bar */}
            <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
              <h3 className="font-myfont text-4xl sm:text-5xl md:text-6xl text-white font-medium tracking-wide text-center drop-shadow-[0_2px_14px_rgba(255,255,255,0.25)] lowercase select-none">
                other
              </h3>
            </div>

            {/* Floating Green Cutting Mat with the rest of the skills */}
            <FloatingGreenMatSkills isVisible={isVisible} />
          </div>

          {/* ================= BOTTOM-RIGHT CORNER MONOGRAM ================= */}
          <div className="relative z-10 w-full flex justify-end mt-4 sm:mt-6 md:mt-8">
            <div className="sm:absolute sm:right-2 md:right-4 sm:bottom-0 pointer-events-auto">
              <img
                src={arrowLogo}
                alt="Monogram"
                title="Monogram"
                className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain filter brightness-0 invert opacity-85 hover:rotate-90 hover:scale-125 active:scale-95 transition-all duration-500 ease-out cursor-pointer"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
