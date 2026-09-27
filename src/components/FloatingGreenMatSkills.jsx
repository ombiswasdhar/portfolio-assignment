import React, { useRef, useState } from 'react'
import cuttingMatImg from '../assets/skills/cutting_mat.png'

const skillGroups = [
  {
    category: 'Ideation & Form',
    code: '01 // 60° AXIS',
    align: 'left',
    skills: [
      { name: 'Sketching', tag: '21 CM' },
      { name: 'Animation', tag: '18 CM' },
      { name: 'Product design', tag: '15 CM' },
      { name: 'Mood boarding', tag: '12 CM' },
    ],
  },
  {
    category: 'Design & Logic',
    code: '02 // 45° GRID',
    align: 'center',
    skills: [
      { name: 'Painting', tag: '45° ANGLE' },
      { name: 'Ui/Ux design', tag: 'GRID 08' },
      { name: '3d design', tag: 'CENTER' },
      { name: 'Mind Mapping', tag: 'GRID 10' },
      { name: 'Information Collection', tag: '14 CM' },
    ],
  },
  {
    category: 'Visual & User',
    code: '03 // A4 MATRIX',
    align: 'right',
    skills: [
      { name: 'Character design', tag: 'A4 // 01' },
      { name: 'Graphic design', tag: 'A4 // 02' },
      { name: 'Animation', tag: 'A4 // 03' },
      { name: 'User Personas', tag: 'A4 // 04' },
    ],
  },
]

export default function FloatingGreenMatSkills({ isVisible = true }) {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hoveredSkill, setHoveredSkill] = useState(null)

  // Interactive 3D mouse tilt for realistic floating physics
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1 // -1 to 1
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1 // -1 to 1
    setTilt({
      x: normY * -4.5, // subtle pitch
      y: normX * 5.5,  // subtle yaw
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHoveredSkill(null)
  }

  return (
    <div className="w-full max-w-[1140px] mx-auto px-2 sm:px-4 md:px-6">
      {/* 3D Floating Mat Stage */}
      <div
        style={{ perspective: '1400px' }}
        className="w-full flex justify-center py-4"
      >
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`group relative w-full max-w-[980px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-default select-none transition-all duration-700 ease-out animate-float-gentle ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.97]'
          }`}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
            boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(19, 67, 55, 0.45)',
          }}
          role="region"
          aria-label="Floating A4 green cutting mat containing design and digital skills"
        >
          {/* Authentic Cutting Mat Texture Background */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              filter: 'contrast(1.04) brightness(0.96)',
            }}
          />

          {/* Directional Studio Lighting Overlay (Highlights upper-left, soft falloff) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/15 to-white/12 pointer-events-none" />

          {/* Surface Specular Highlight Sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_25%,rgba(255,255,255,0.16)_0%,transparent_65%)] pointer-events-none" />

          {/* Beveled Cutting-Mat Rim with Dual Edge Highlight & Depth Shadows */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-[#1c5541]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Interior Subtle Grid Frame Accent */}
          <div className="absolute inset-3 sm:inset-4 rounded-xl sm:rounded-2xl border border-[#7ec4b0]/20 pointer-events-none" />

          {/* ================= CONTENT: SKILLS INSCRIBED ACCORDING TO GRID ================= */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[460px] sm:min-h-[500px] md:min-h-[540px]">
            
            {/* Top Coordinate Header Bar */}
            <div className="flex items-center justify-between border-b border-[#7ec4b0]/25 pb-3 sm:pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7ec4b0] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#94d6c4] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  PRECISION WORKBENCH // A4 MATRIX
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#7ec4b0]/80 tracking-wider">
                  25 × 17 CM
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-[#7ec4b0]/50">
                  |
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-[#7ec4b0]/80 tracking-wider">
                  11 × 8 INCH
                </span>
              </div>
            </div>

            {/* 3-Column Skills Grid aligned with cutting mat quadrants */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 my-auto py-6 sm:py-8">
              {skillGroups.map((group, gIdx) => (
                <div
                  key={group.category}
                  className="flex flex-col justify-between rounded-xl p-4 sm:p-5 bg-[#09221b]/45 backdrop-blur-[2px] border border-[#7ec4b0]/15 hover:border-[#7ec4b0]/35 transition-all duration-300"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-[#7ec4b0]/20 pb-2.5 mb-3.5">
                    <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#a5e2d2] tracking-wider uppercase">
                      {group.category}
                    </span>
                    <span className="font-mono text-[9px] text-[#7ec4b0]/70 tracking-widest">
                      {group.code}
                    </span>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2.5">
                    {group.skills.map((skill) => {
                      const isHovered = hoveredSkill === skill.name
                      return (
                        <div
                          key={skill.name}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={`flex items-center justify-between px-3 py-1.5 rounded-lg transition-all duration-200 cursor-default ${
                            isHovered
                              ? 'bg-[#103a2f]/80 translate-x-1 shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
                              : 'hover:bg-[#103a2f]/40'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                isHovered
                                  ? 'bg-[#7ec4b0] scale-125 shadow-[0_0_6px_#7ec4b0]'
                                  : 'bg-[#7ec4b0]/50'
                              }`}
                            />
                            <span className="font-serif-display text-sm sm:text-base md:text-lg text-[#edf7f4] tracking-tight transition-colors duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                              {skill.name}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] sm:text-[10px] text-[#82c9b6]/75 group-hover:text-[#a8ebd9] transition-colors whitespace-nowrap pl-2">
                            {skill.tag}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Column Bottom Coordinate Mark */}
                  <div className="mt-4 pt-2.5 border-t border-[#7ec4b0]/15 flex items-center justify-between text-[9px] font-mono text-[#7ec4b0]/60">
                    <span>SECTOR 0{gIdx + 1}</span>
                    <span>ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Ruler Footer Bar */}
            <div className="flex flex-wrap items-center justify-between border-t border-[#7ec4b0]/25 pt-3 sm:pt-4 text-[10px] font-mono text-[#7ec4b0]/70 gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7ec4b0]/60" />
                <span>SELF-HEALING SURFACE · MULTI-DISCIPLINARY STACK</span>
              </span>
              <span className="tracking-widest uppercase">
                SCALE 1:1 // OM BISWAS
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
