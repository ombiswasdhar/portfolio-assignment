import React from 'react'
import cuttingMatImg from '../assets/skills/cutting_mat.png'

const group1 = {
  title: 'Ideation & Form',
  coord: '60° ANGLE // 1-7 INCH',
  badge: '01 / 03',
  bgPosition: '8% center',
  skills: [
    { name: 'Sketching', mark: '60° GUIDE' },
    { name: 'Animation', mark: '21 CM' },
    { name: 'Product design', mark: '18 CM' },
    { name: 'Mood boarding', mark: '15 CM' },
  ],
}

const group2 = {
  title: 'Design & Logic',
  coord: '45° AXIS // CENTER GRID',
  badge: '02 / 03',
  bgPosition: '50% center',
  skills: [
    { name: 'Painting', mark: '45° LINE' },
    { name: 'Ui/Ux design', mark: 'GRID 08' },
    { name: '3d design', mark: 'CENTER' },
    { name: 'Mind Mapping', mark: 'GRID 10' },
    { name: 'Information Collection', mark: '14 CM' },
  ],
}

const group3 = {
  title: 'Visual & User',
  coord: 'A4 MATRIX // 1-17 CM',
  badge: '03 / 03',
  bgPosition: '92% center',
  skills: [
    { name: 'Character design', mark: 'A4 // 01' },
    { name: 'Graphic design', mark: 'A4 // 02' },
    { name: 'Animation', mark: 'A4 // 03' },
    { name: 'User Personas', mark: 'A4 // 04' },
  ],
}

export default function FloatingGreenMatSkills({ isVisible = true }) {
  return (
    <div className="w-full max-w-[1180px] mx-auto px-2 sm:px-4">
      {/* 3 Separate Floating Cutting Mats with Premium Studio Vibe & Sharp Visibility */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-items-center">
        
        {/* ================= MAT 1: LEFT CROP (60° & Inch Ruler) ================= */}
        <div
          className={`group relative w-full max-w-[360px] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.025] cursor-default select-none animate-float-gentle ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transitionDelay: '80ms',
            boxShadow: '0 28px 65px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(19, 67, 55, 0.4)',
            transform: 'perspective(1000px) rotateY(2deg) rotateZ(-0.8deg)',
          }}
        >
          {/* Authentic A4 Cutting Mat Texture (Vibrant Green) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group1.bgPosition,
              filter: 'contrast(1.06) brightness(1.0)',
            }}
          />

          {/* Balanced Studio Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/15 to-white/15 pointer-events-none" />

          {/* Specular Vinyl Sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.14)_0%,transparent_60%)] pointer-events-none" />

          {/* Beveled Cutting-Mat Rim & Inner Debossed Shadow */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-[#246b55]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Card Content Inscribed onto Mat */}
          <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full min-h-[360px]">
            {/* Header with ruler coordinates */}
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7ec4b0] shadow-[0_0_8px_rgba(126,196,176,0.8)] animate-pulse" />
                <span className="font-mono text-xs sm:text-[13px] font-bold tracking-widest text-[#d2f5eb] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {group1.coord}
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-[#a0e0cd] bg-black/55 px-2 py-0.5 rounded border border-white/10">
                {group1.badge}
              </span>
            </div>

            {/* List of Skills - Sleek Glassmorphic Tiles with Bold White Typography */}
            <div className="py-4 space-y-2.5 my-auto">
              {group1.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/10 hover:border-[#7ec4b0] shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(126,196,176,0.25)] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#7ec4b0] group-hover/item:scale-125 group-hover/item:bg-[#a0f0d6] transition-all duration-300 shadow-[0_0_8px_rgba(126,196,176,0.6)]" />
                    <span className="font-sans font-semibold text-white text-[15px] sm:text-[16px] md:text-[17px] tracking-tight transition-colors duration-200 group-hover/item:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-wider text-[#a0e0cd] bg-white/5 px-2 py-0.5 rounded border border-white/10 group-hover/item:border-[#7ec4b0]/40 group-hover/item:text-white transition-all whitespace-nowrap">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-white/15 flex items-center justify-between">
              <span className="font-sans text-xs sm:text-sm font-bold text-white tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {group1.title}
              </span>
              <span className="text-[10px] font-mono text-[#a0e0cd] uppercase tracking-widest">
                PRECISION // 01
              </span>
            </div>
          </div>
        </div>

        {/* ================= MAT 2: CENTER CROP (45° & Center Grid) ================= */}
        <div
          className={`group relative w-full max-w-[360px] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.03] cursor-default select-none animate-float-reverse ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transitionDelay: '180ms',
            boxShadow: '0 32px 75px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(19, 67, 55, 0.45)',
            transform: 'perspective(1000px) rotateY(0deg) translateY(-6px)',
          }}
        >
          {/* Authentic A4 Cutting Mat Texture */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group2.bgPosition,
              filter: 'contrast(1.06) brightness(0.98)',
            }}
          />

          {/* Balanced Studio Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/15 to-white/15 pointer-events-none" />

          {/* Center Specular Vinyl Highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.18)_0%,transparent_65%)] pointer-events-none" />

          {/* Beveled Cutting-Mat Rim & Inner Shadow */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-[#246b55]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Card Content Inscribed onto Mat */}
          <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full min-h-[360px]">
            {/* Header with ruler coordinates */}
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7ec4b0] shadow-[0_0_8px_rgba(126,196,176,0.8)] animate-pulse" />
                <span className="font-mono text-xs sm:text-[13px] font-bold tracking-widest text-[#d2f5eb] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {group2.coord}
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-[#a0e0cd] bg-black/55 px-2 py-0.5 rounded border border-white/10">
                {group2.badge}
              </span>
            </div>

            {/* List of Skills */}
            <div className="py-4 space-y-2.5 my-auto">
              {group2.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/10 hover:border-[#7ec4b0] shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(126,196,176,0.25)] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#7ec4b0] group-hover/item:scale-125 group-hover/item:bg-[#a0f0d6] transition-all duration-300 shadow-[0_0_8px_rgba(126,196,176,0.6)]" />
                    <span className="font-sans font-semibold text-white text-[15px] sm:text-[16px] md:text-[17px] tracking-tight transition-colors duration-200 group-hover/item:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-wider text-[#a0e0cd] bg-white/5 px-2 py-0.5 rounded border border-white/10 group-hover/item:border-[#7ec4b0]/40 group-hover/item:text-white transition-all whitespace-nowrap">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-white/15 flex items-center justify-between">
              <span className="font-sans text-xs sm:text-sm font-bold text-white tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {group2.title}
              </span>
              <span className="text-[10px] font-mono text-[#a0e0cd] uppercase tracking-widest">
                PRECISION // 02
              </span>
            </div>
          </div>
        </div>

        {/* ================= MAT 3: RIGHT CROP (A4 Badge & CM Ruler) ================= */}
        <div
          className={`group relative w-full max-w-[360px] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.025] cursor-default select-none animate-float-gentle ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            animationDelay: '1.2s',
            transitionDelay: '260ms',
            boxShadow: '0 28px 65px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(19, 67, 55, 0.4)',
            transform: 'perspective(1000px) rotateY(-2deg) rotateZ(0.8deg)',
          }}
        >
          {/* Authentic A4 Cutting Mat Texture */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group3.bgPosition,
              filter: 'contrast(1.06) brightness(1.0)',
            }}
          />

          {/* Balanced Studio Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/15 to-white/15 pointer-events-none" />

          {/* Right Specular Vinyl Sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(255,255,255,0.14)_0%,transparent_60%)] pointer-events-none" />

          {/* Beveled Cutting-Mat Rim & Inner Shadow */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-[#246b55]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Card Content Inscribed onto Mat */}
          <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full min-h-[360px]">
            {/* Header with ruler coordinates */}
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7ec4b0] shadow-[0_0_8px_rgba(126,196,176,0.8)] animate-pulse" />
                <span className="font-mono text-xs sm:text-[13px] font-bold tracking-widest text-[#d2f5eb] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {group3.coord}
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-[#a0e0cd] bg-black/55 px-2 py-0.5 rounded border border-white/10">
                {group3.badge}
              </span>
            </div>

            {/* List of Skills */}
            <div className="py-4 space-y-2.5 my-auto">
              {group3.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/10 hover:border-[#7ec4b0] shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(126,196,176,0.25)] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#7ec4b0] group-hover/item:scale-125 group-hover/item:bg-[#a0f0d6] transition-all duration-300 shadow-[0_0_8px_rgba(126,196,176,0.6)]" />
                    <span className="font-sans font-semibold text-white text-[15px] sm:text-[16px] md:text-[17px] tracking-tight transition-colors duration-200 group-hover/item:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-wider text-[#a0e0cd] bg-white/5 px-2 py-0.5 rounded border border-white/10 group-hover/item:border-[#7ec4b0]/40 group-hover/item:text-white transition-all whitespace-nowrap">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-white/15 flex items-center justify-between">
              <span className="font-sans text-xs sm:text-sm font-bold text-white tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {group3.title}
              </span>
              <span className="text-[10px] font-mono text-[#a0e0cd] uppercase tracking-widest">
                PRECISION // 03
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
