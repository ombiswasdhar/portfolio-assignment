import React from 'react'
import cuttingMatImg from '../assets/skills/cutting_mat.png'

const group1 = {
  title: 'Ideation & Form',
  coord: '60° ANGLE // 1-7 INCH',
  badge: '01 / 03',
  bgPosition: '6% center',
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
  bgPosition: '94% center',
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
      {/* 3 Separate Floating Cutting Mats with High-Contrast Legibility */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-items-center">
        
        {/* ================= MAT 1: LEFT CROP (60° & Inch Ruler) ================= */}
        <div
          className={`group relative w-full max-w-[360px] rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.025] cursor-default select-none animate-float-gentle ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transitionDelay: '80ms',
            boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(19, 67, 55, 0.45)',
            transform: 'perspective(1000px) rotateY(2.5deg) rotateZ(-1deg)',
          }}
        >
          {/* Authentic Cutting Mat Texture Background */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group1.bgPosition,
              filter: 'contrast(1.08) brightness(0.92)',
            }}
          />

          {/* Vignette Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/70 pointer-events-none" />

          {/* Beveled Cutting-Mat Rim & Inner Shadow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1c5541]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,0,0,0.8)] pointer-events-none" />

          {/* Card Content Inscribed onto Mat */}
          <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full min-h-[360px]">
            {/* Header with ruler coordinates */}
            <div className="flex items-center justify-between border-b border-[#7ec4b0]/40 pb-3">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#5eead4] uppercase bg-black/75 px-2.5 py-1 rounded-md border border-[#5eead4]/35 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {group1.coord}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#5eead4] shadow-[0_0_8px_#5eead4] animate-pulse" />
            </div>

            {/* List of Skills on High-Contrast Frosted Tiles */}
            <div className="py-4 space-y-2.5 my-auto">
              {group1.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between group/item px-3 py-2 rounded-xl transition-all duration-200 bg-neutral-950/80 backdrop-blur-md border border-[#7ec4b0]/35 hover:border-[#5eead4] hover:bg-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#5eead4] shadow-[0_0_6px_#5eead4] group-hover/item:scale-125 transition-transform" />
                    <span className="font-sans font-bold text-base sm:text-lg text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-[#5eead4] bg-[#5eead4]/15 px-2 py-0.5 rounded border border-[#5eead4]/30 tracking-wider whitespace-nowrap pl-2">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-[#7ec4b0]/40 flex items-center justify-between">
              <span className="font-sans text-xs sm:text-sm font-bold text-white uppercase tracking-wider bg-black/75 px-2.5 py-1 rounded border border-[#7ec4b0]/30 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {group1.title}
              </span>
              <span className="font-mono text-xs font-bold text-[#5eead4] bg-black/75 px-2 py-0.5 rounded border border-[#5eead4]/30">
                {group1.badge}
              </span>
            </div>
          </div>
        </div>

        {/* ================= MAT 2: CENTER CROP (45° & Center Grid) ================= */}
        <div
          className={`group relative w-full max-w-[360px] rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.03] cursor-default select-none animate-float-reverse ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transitionDelay: '180ms',
            boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(19, 67, 55, 0.5)',
            transform: 'perspective(1000px) rotateY(0deg) translateY(-6px)',
          }}
        >
          {/* Authentic Cutting Mat Texture Background */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group2.bgPosition,
              filter: 'contrast(1.08) brightness(0.92)',
            }}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/70 pointer-events-none" />

          {/* Beveled Cutting-Mat Rim & Inner Shadow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1c5541]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,0,0,0.8)] pointer-events-none" />

          {/* Card Content Inscribed onto Mat */}
          <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full min-h-[360px]">
            {/* Header with ruler coordinates */}
            <div className="flex items-center justify-between border-b border-[#7ec4b0]/40 pb-3">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#5eead4] uppercase bg-black/75 px-2.5 py-1 rounded-md border border-[#5eead4]/35 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {group2.coord}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#5eead4] shadow-[0_0_8px_#5eead4] animate-pulse" />
            </div>

            {/* List of Skills on High-Contrast Frosted Tiles */}
            <div className="py-4 space-y-2.5 my-auto">
              {group2.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between group/item px-3 py-2 rounded-xl transition-all duration-200 bg-neutral-950/80 backdrop-blur-md border border-[#7ec4b0]/35 hover:border-[#5eead4] hover:bg-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#5eead4] shadow-[0_0_6px_#5eead4] group-hover/item:scale-125 transition-transform" />
                    <span className="font-sans font-bold text-base sm:text-lg text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-[#5eead4] bg-[#5eead4]/15 px-2 py-0.5 rounded border border-[#5eead4]/30 tracking-wider whitespace-nowrap pl-2">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-[#7ec4b0]/40 flex items-center justify-between">
              <span className="font-sans text-xs sm:text-sm font-bold text-white uppercase tracking-wider bg-black/75 px-2.5 py-1 rounded border border-[#7ec4b0]/30 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {group2.title}
              </span>
              <span className="font-mono text-xs font-bold text-[#5eead4] bg-black/75 px-2 py-0.5 rounded border border-[#5eead4]/30">
                {group2.badge}
              </span>
            </div>
          </div>
        </div>

        {/* ================= MAT 3: RIGHT CROP (A4 Badge & CM Ruler) ================= */}
        <div
          className={`group relative w-full max-w-[360px] rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.025] cursor-default select-none animate-float-gentle ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            animationDelay: '1.2s',
            transitionDelay: '260ms',
            boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(19, 67, 55, 0.45)',
            transform: 'perspective(1000px) rotateY(-2.5deg) rotateZ(1deg)',
          }}
        >
          {/* Authentic Cutting Mat Texture Background */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group3.bgPosition,
              filter: 'contrast(1.08) brightness(0.92)',
            }}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/70 pointer-events-none" />

          {/* Beveled Cutting-Mat Rim & Inner Shadow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1c5541]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,0,0,0.8)] pointer-events-none" />

          {/* Card Content Inscribed onto Mat */}
          <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full min-h-[360px]">
            {/* Header with ruler coordinates */}
            <div className="flex items-center justify-between border-b border-[#7ec4b0]/40 pb-3">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#5eead4] uppercase bg-black/75 px-2.5 py-1 rounded-md border border-[#5eead4]/35 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {group3.coord}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#5eead4] shadow-[0_0_8px_#5eead4] animate-pulse" />
            </div>

            {/* List of Skills on High-Contrast Frosted Tiles */}
            <div className="py-4 space-y-2.5 my-auto">
              {group3.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between group/item px-3 py-2 rounded-xl transition-all duration-200 bg-neutral-950/80 backdrop-blur-md border border-[#7ec4b0]/35 hover:border-[#5eead4] hover:bg-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#5eead4] shadow-[0_0_6px_#5eead4] group-hover/item:scale-125 transition-transform" />
                    <span className="font-sans font-bold text-base sm:text-lg text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-[#5eead4] bg-[#5eead4]/15 px-2 py-0.5 rounded border border-[#5eead4]/30 tracking-wider whitespace-nowrap pl-2">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-[#7ec4b0]/40 flex items-center justify-between">
              <span className="font-sans text-xs sm:text-sm font-bold text-white uppercase tracking-wider bg-black/75 px-2.5 py-1 rounded border border-[#7ec4b0]/30 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {group3.title}
              </span>
              <span className="font-mono text-xs font-bold text-[#5eead4] bg-black/75 px-2 py-0.5 rounded border border-[#5eead4]/30">
                {group3.badge}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
