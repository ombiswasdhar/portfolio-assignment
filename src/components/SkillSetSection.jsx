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

const row1Apps = [
  { name: 'Procreate', Icon: ProcreateIcon, glow: 'hover:shadow-[0_12px_28px_rgba(181,23,158,0.35)]' },
  { name: 'Sketchbook', Icon: SketchbookIcon, glow: 'hover:shadow-[0_12px_28px_rgba(233,91,61,0.35)]' },
  { name: 'Figma', Icon: FigmaIcon, glow: 'hover:shadow-[0_12px_28px_rgba(162,89,255,0.35)]' },
  { name: 'Premier Pro', Icon: PremierProIcon, glow: 'hover:shadow-[0_12px_28px_rgba(0,0,91,0.35)]' },
  { name: 'Blender', Icon: BlenderIcon, glow: 'hover:shadow-[0_12px_28px_rgba(232,125,13,0.35)]' },
]

const row2Apps = [
  { name: 'Photoshop', Icon: PhotoshopIcon, glow: 'hover:shadow-[0_12px_28px_rgba(49,168,255,0.35)]' },
  { name: 'Illustrator', Icon: IllustratorIcon, glow: 'hover:shadow-[0_12px_28px_rgba(255,154,0,0.35)]' },
  { name: 'InShot', Icon: InShotIcon, glow: 'hover:shadow-[0_12px_28px_rgba(255,42,84,0.35)]' },
  { name: 'Canva', Icon: CanvaIcon, glow: 'hover:shadow-[0_12px_28px_rgba(0,196,204,0.35)]' },
  { name: 'Autocad', Icon: AutocadIcon, glow: 'hover:shadow-[0_12px_28px_rgba(216,23,84,0.35)]' },
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

  return (
    <section
      id="skills"
      aria-label="My Skill Set section"
      className="relative w-full bg-black text-white select-none overflow-hidden pt-0 pb-16 sm:pb-20 md:pb-24"
    >
      {/* Container aligned flush with AboutSection card */}
      <div className="relative w-full max-w-[1380px] mx-auto px-3 sm:px-6 md:px-8">
        
        {/* ================= POSTER CARD (Seamless zero gap with AboutSection) ================= */}
        <div className="relative w-full max-w-[1240px] mx-auto rounded-b-[24px] sm:rounded-b-[28px] lg:rounded-b-[36px] rounded-t-none overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.9)] border-b border-x border-white/10 bg-[#F2F0EA] text-neutral-900 px-6 sm:px-12 md:px-16 pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 md:pb-20 transition-all duration-500 hover:border-white/20">
          
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

            {/* Top-Right Angular Monogram (Rotated 180° as in Figma) */}
            <div className="absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2">
              <img
                src={arrowLogo}
                alt=""
                aria-hidden="true"
                className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain filter invert mix-blend-multiply opacity-90 rotate-180 pointer-events-none"
              />
            </div>
          </div>

          {/* ================= DIGITAL SECTION ================= */}
          <div className="w-full mt-8 sm:mt-10 md:mt-12">
            {/* Section Pill Badge */}
            <div className="flex justify-center mb-7 sm:mb-9 md:mb-10">
              <span className="inline-flex items-center px-6 sm:px-8 py-1 sm:py-1.5 rounded-xl border border-neutral-900 bg-white/40 backdrop-blur-sm text-sm sm:text-base md:text-lg font-medium text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                Digital
              </span>
            </div>

            {/* Apps Grid Layout */}
            <div className="max-w-[760px] md:max-w-[820px] mx-auto">
              {/* Desktop / Tablet 5-Column Grid */}
              <div className="hidden sm:grid grid-cols-5 gap-y-8 md:gap-y-10 gap-x-4 sm:gap-x-8 items-start justify-items-center">
                {/* Row 1: Procreate, Sketchbook, Figma, Premier Pro, Blender */}
                {row1Apps.map((app) => {
                  const IconComponent = app.Icon
                  return (
                    <div
                      key={app.name}
                      className="group flex flex-col items-center cursor-pointer"
                      onMouseEnter={() => setHoveredApp(app.name)}
                      onMouseLeave={() => setHoveredApp(null)}
                    >
                      <div className={`transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 rounded-2xl ${app.glow}`}>
                        <IconComponent className="w-13 h-13 sm:w-14 sm:h-14 md:w-[58px] md:h-[58px]" />
                      </div>
                      <span className="mt-2 text-xs md:text-sm font-normal text-neutral-800 text-center tracking-tight transition-colors duration-200 group-hover:text-black">
                        {app.name}
                      </span>
                    </div>
                  )
                })}

                {/* Row 2: Photoshop, Illustrator, InShot, Canva, Autocad */}
                {row2Apps.map((app) => {
                  const IconComponent = app.Icon
                  return (
                    <div
                      key={app.name}
                      className="group flex flex-col items-center cursor-pointer"
                      onMouseEnter={() => setHoveredApp(app.name)}
                      onMouseLeave={() => setHoveredApp(null)}
                    >
                      <div className={`transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 rounded-2xl ${app.glow}`}>
                        <IconComponent className="w-13 h-13 sm:w-14 sm:h-14 md:w-[58px] md:h-[58px]" />
                      </div>
                      <span className="mt-2 text-xs md:text-sm font-normal text-neutral-800 text-center tracking-tight transition-colors duration-200 group-hover:text-black">
                        {app.name}
                      </span>
                    </div>
                  )
                })}

                {/* Row 3: Spacer, Spacer, Procreate Dreams, Big 3 Box (Spanning 2 Columns) */}
                <div aria-hidden="true" />
                <div aria-hidden="true" />

                {/* Procreate Dreams */}
                <div
                  className="group flex flex-col items-center cursor-pointer"
                  onMouseEnter={() => setHoveredApp('Procreate Dreams')}
                  onMouseLeave={() => setHoveredApp(null)}
                >
                  <div className="transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 rounded-2xl hover:shadow-[0_12px_28px_rgba(0,229,255,0.35)]">
                    <ProcreateDreamsIcon className="w-13 h-13 sm:w-14 sm:h-14 md:w-[58px] md:h-[58px]" />
                  </div>
                  <span className="mt-2 text-xs md:text-sm font-normal text-neutral-800 text-center tracking-tight transition-colors duration-200 group-hover:text-black whitespace-nowrap">
                    Procreate Dreams
                  </span>
                </div>

                {/* Big 3 Box */}
                <div className="col-span-2 w-full flex items-center justify-start pl-3 sm:pl-5">
                  <div className="w-full max-w-[270px] sm:max-w-[290px] md:max-w-[310px] rounded-xl sm:rounded-2xl border border-neutral-900 bg-white/40 backdrop-blur-sm px-4 md:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-white/60 transition-all duration-300">
                    <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-neutral-950 whitespace-nowrap">
                      Big 3
                    </span>
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="transition-transform duration-200 hover:scale-110" title="Procreate">
                        <ProcreateIcon className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" />
                      </div>
                      <div className="transition-transform duration-200 hover:scale-110" title="Procreate Dreams">
                        <ProcreateDreamsIcon className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" />
                      </div>
                      <div className="transition-transform duration-200 hover:scale-110" title="Figma">
                        <FigmaIcon className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile View (< sm): Clean 3-Column Flow with Crisp Icons */}
              <div className="sm:hidden flex flex-col gap-8">
                <div className="grid grid-cols-3 gap-y-7 gap-x-4 items-start justify-items-center">
                  {[...row1Apps, ...row2Apps, { name: 'Procreate Dreams', Icon: ProcreateDreamsIcon, glow: '' }].map((app) => {
                    const IconComponent = app.Icon
                    return (
                      <div
                        key={app.name}
                        className="flex flex-col items-center"
                      >
                        <div className="transition-transform duration-200 active:scale-95">
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
                  <div className="w-full max-w-[280px] rounded-xl border border-neutral-900 bg-white/40 px-4 py-2.5 flex items-center justify-between shadow-sm">
                    <span className="text-xl font-bold font-sans tracking-tight text-neutral-950">
                      Big 3
                    </span>
                    <div className="flex items-center gap-2">
                      <ProcreateIcon className="w-8 h-8" />
                      <ProcreateDreamsIcon className="w-8 h-8" />
                      <FigmaIcon className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= OTHER SECTION ================= */}
          <div className="w-full mt-12 sm:mt-16 md:mt-20">
            {/* Section Pill Badge */}
            <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
              <span className="inline-flex items-center px-6 sm:px-8 py-1 sm:py-1.5 rounded-xl border border-neutral-900 bg-white/40 backdrop-blur-sm text-sm sm:text-base md:text-lg font-medium text-neutral-900 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                Other
              </span>
            </div>

            {/* 3 Columns Layout exactly matching Figma matrix */}
            <div className="max-w-[780px] md:max-w-[840px] mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 sm:gap-y-0 gap-x-6 sm:gap-x-10 text-center">
                {/* Column 1: Sketching, Animation, Product design, Mood boarding */}
                <div className="flex flex-col items-center space-y-3.5 sm:space-y-4 md:space-y-4.5">
                  {otherSkillsCol1.map((skill) => (
                    <p
                      key={skill}
                      className="font-sans text-sm sm:text-base font-normal text-neutral-900 tracking-normal transition-all duration-200 hover:text-red-700 hover:scale-105 cursor-default"
                    >
                      {skill}
                    </p>
                  ))}
                </div>

                {/* Column 2: Painting, Ui/Ux design, 3d design, Mind Mapping, Information Collection */}
                <div className="flex flex-col items-center space-y-3.5 sm:space-y-4 md:space-y-4.5">
                  {otherSkillsCol2.map((skill) => (
                    <p
                      key={skill}
                      className="font-sans text-sm sm:text-base font-normal text-neutral-900 tracking-normal transition-all duration-200 hover:text-red-700 hover:scale-105 cursor-default"
                    >
                      {skill}
                    </p>
                  ))}
                </div>

                {/* Column 3: Character design, Graphic design, Animation, User Personas */}
                <div className="flex flex-col items-center space-y-3.5 sm:space-y-4 md:space-y-4.5">
                  {otherSkillsCol3.map((skill) => (
                    <p
                      key={skill}
                      className="font-sans text-sm sm:text-base font-normal text-neutral-900 tracking-normal transition-all duration-200 hover:text-red-700 hover:scale-105 cursor-default"
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM-RIGHT CORNER MONOGRAM ================= */}
          <div className="relative w-full flex justify-end mt-10 sm:mt-12 md:mt-14">
            <div className="sm:absolute sm:right-2 md:right-4 sm:bottom-0">
              <img
                src={arrowLogo}
                alt=""
                aria-hidden="true"
                className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain filter invert mix-blend-multiply opacity-90 pointer-events-none"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
