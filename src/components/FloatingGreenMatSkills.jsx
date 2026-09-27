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
    <div className="w-full max-w-[1140px] mx-auto px-2 sm:px-4">
      {/* 3 Separate Floating Cutting Mats using the new A4 Craft Mat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-items-center">
        
        {/* ================= MAT 1: LEFT CROP (60° & Inch Ruler) ================= */}
        <div
          className={`group relative w-full max-w-[340px] rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.025] cursor-default select-none animate-float-gentle ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transitionDelay: '80ms',
            boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(19, 67, 55, 0.4)',
            transform: 'perspective(1000px) rotateY(2.5deg) rotateZ(-1deg)',
          }}
        >
          {/* Authentic Cutting Mat Texture Background (Left Crop) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group1.bgPosition,
              filter: 'contrast(1.05) brightness(0.96)',
            }}
          />

          {/* Directional Studio Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/25 to-white/12 pointer-events-none" />

          {/* Surface Specular Highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.16)_0%,transparent_60%)] pointer-events-none" />

          {/* Beveled Cutting-Mat Rim & Inner Shadow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1c5541]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Card Content Inscribed onto Mat */}
          <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full min-h-[340px]">
            {/* Header with ruler coordinates */}
            <div className="flex items-center justify-between border-b border-[#7ec4b0]/30 pb-3">
              <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[#94d6c4] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {group1.coord}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#7ec4b0] opacity-80 group-hover:animate-ping" />
            </div>

            {/* List of Skills */}
            <div className="py-4 space-y-3 my-auto">
              {group1.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between group/item px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-[#08221a]/70 hover:backdrop-blur-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7ec4b0]/60 group-hover/item:bg-[#7ec4b0] transition-colors" />
                    <span className="font-serif-display text-base sm:text-lg text-[#edf7f4] tracking-tight transition-colors duration-200 group-hover/item:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#82c9b6]/75 group-hover/item:text-[#a8ebd9] transition-colors whitespace-nowrap pl-2">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-[#7ec4b0]/25 flex items-center justify-between">
              <span className="font-sans text-[11px] text-[#94d6c4] uppercase tracking-wider font-semibold">
                {group1.title}
              </span>
              <span className="text-[10px] font-mono text-[#7ec4b0]/70">{group1.badge}</span>
            </div>
          </div>
        </div>

        {/* ================= MAT 2: CENTER CROP (45° & Center Grid) ================= */}
        <div
          className={`group relative w-full max-w-[340px] rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.03] cursor-default select-none animate-float-reverse ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transitionDelay: '180ms',
            boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(19, 67, 55, 0.45)',
            transform: 'perspective(1000px) rotateY(0deg) translateY(-6px)',
          }}
        >
          {/* Authentic Cutting Mat Texture Background (Center Crop) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group2.bgPosition,
              filter: 'contrast(1.06) brightness(0.94)',
            }}
          />

          {/* Directional Studio Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/25 to-white/15 pointer-events-none" />

          {/* Surface Specular Highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.2)_0%,transparent_65%)] pointer-events-none" />

          {/* Beveled Cutting-Mat Rim & Inner Shadow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1c5541]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Card Content Inscribed onto Mat */}
          <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full min-h-[340px]">
            {/* Header with ruler coordinates */}
            <div className="flex items-center justify-between border-b border-[#7ec4b0]/30 pb-3">
              <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[#94d6c4] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {group2.coord}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#7ec4b0] opacity-80 group-hover:animate-ping" />
            </div>

            {/* List of Skills */}
            <div className="py-4 space-y-2.5 my-auto">
              {group2.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between group/item px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-[#08221a]/70 hover:backdrop-blur-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7ec4b0]/60 group-hover/item:bg-[#7ec4b0] transition-colors" />
                    <span className="font-serif-display text-base sm:text-lg text-[#edf7f4] tracking-tight transition-colors duration-200 group-hover/item:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#82c9b6]/75 group-hover/item:text-[#a8ebd9] transition-colors whitespace-nowrap pl-2">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-[#7ec4b0]/25 flex items-center justify-between">
              <span className="font-sans text-[11px] text-[#94d6c4] uppercase tracking-wider font-semibold">
                {group2.title}
              </span>
              <span className="text-[10px] font-mono text-[#7ec4b0]/70">{group2.badge}</span>
            </div>
          </div>
        </div>

        {/* ================= MAT 3: RIGHT CROP (A4 Badge & CM Ruler) ================= */}
        <div
          className={`group relative w-full max-w-[340px] rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.025] cursor-default select-none animate-float-gentle ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            animationDelay: '1.2s',
            transitionDelay: '260ms',
            boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(19, 67, 55, 0.4)',
            transform: 'perspective(1000px) rotateY(-2.5deg) rotateZ(1deg)',
          }}
        >
          {/* Authentic Cutting Mat Texture Background (Right Crop) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group3.bgPosition,
              filter: 'contrast(1.05) brightness(0.96)',
            }}
          />

          {/* Directional Studio Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/25 to-white/12 pointer-events-none" />

          {/* Surface Specular Highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(255,255,255,0.16)_0%,transparent_60%)] pointer-events-none" />

          {/* Beveled Cutting-Mat Rim & Inner Shadow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1c5541]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Card Content Inscribed onto Mat */}
          <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full min-h-[340px]">
            {/* Header with ruler coordinates */}
            <div className="flex items-center justify-between border-b border-[#7ec4b0]/30 pb-3">
              <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[#94d6c4] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {group3.coord}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#7ec4b0] opacity-80 group-hover:animate-ping" />
            </div>

            {/* List of Skills */}
            <div className="py-4 space-y-3 my-auto">
              {group3.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between group/item px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-[#08221a]/70 hover:backdrop-blur-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7ec4b0]/60 group-hover/item:bg-[#7ec4b0] transition-colors" />
                    <span className="font-serif-display text-base sm:text-lg text-[#edf7f4] tracking-tight transition-colors duration-200 group-hover/item:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#82c9b6]/75 group-hover/item:text-[#a8ebd9] transition-colors whitespace-nowrap pl-2">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-[#7ec4b0]/25 flex items-center justify-between">
              <span className="font-sans text-[11px] text-[#94d6c4] uppercase tracking-wider font-semibold">
                {group3.title}
              </span>
              <span className="text-[10px] font-mono text-[#7ec4b0]/70">{group3.badge}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
