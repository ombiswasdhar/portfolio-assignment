import React from 'react'
import cuttingMatImg from '../assets/skills/cutting_mat.png'

const group1 = {
  title: 'Ideation & Form',
  coord: '55 // 40 MM',
  bgPosition: 'center 12%',
  skills: [
    { name: 'Sketching', mark: '55 mm' },
    { name: 'Animation', mark: '50 mm' },
    { name: 'Product design', mark: '45 mm' },
    { name: 'Mood boarding', mark: '40 mm' },
  ],
}

const group2 = {
  title: 'Design & Logic',
  coord: '35 // 20 MM',
  bgPosition: 'center 50%',
  skills: [
    { name: 'Painting', mark: '35 mm' },
    { name: 'Ui/Ux design', mark: '30 mm' },
    { name: '3d design', mark: '25 mm' },
    { name: 'Mind Mapping', mark: '20 mm' },
    { name: 'Information Collection', mark: '15 mm' },
  ],
}

const group3 = {
  title: 'Visual & Persona',
  coord: '30° · 45° · 60°',
  bgPosition: 'center 88%',
  skills: [
    { name: 'Character design', mark: '30°' },
    { name: 'Graphic design', mark: '45°' },
    { name: 'Animation', mark: '60°' },
    { name: 'User Personas', mark: '90°' },
  ],
}

export default function FloatingGreenMatSkills({ isVisible = true }) {
  return (
    <div className="w-full max-w-[1140px] mx-auto px-2 sm:px-4">
      {/* 3 Floating Cropped Cutting Mat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-items-center">
        
        {/* ================= CARD 1: TOP MAT CROP (Ideation) ================= */}
        <div
          className={`group relative w-full max-w-[340px] rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-default select-none animate-float-gentle ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transitionDelay: '80ms',
            boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.9), 0 0 35px rgba(14, 56, 43, 0.35)',
            transform: 'perspective(1000px) rotateY(2deg) rotateZ(-1deg)',
          }}
        >
          {/* Authentic Cutting Mat Texture Background (Top Crop) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group1.bgPosition,
              filter: 'contrast(1.05) brightness(0.95)',
            }}
          />

          {/* Ambient Lighting Gradient: Directional Studio Top Light */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/25 to-white/15 pointer-events-none" />

          {/* Surface Vinyl Specular Reflection Sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.18)_0%,transparent_60%)] pointer-events-none" />

          {/* Beveled Cutting-Mat Rim & Inner Shadow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1c5541]/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Card Content Inscribed onto Mat */}
          <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full min-h-[340px]">
            {/* Header with ruler coordinates */}
            <div className="flex items-center justify-between border-b border-[#c2cb74]/35 pb-3">
              <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[#d6e088] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {group1.coord}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#d6e088] opacity-80 group-hover:animate-ping" />
            </div>

            {/* List of Skills formatted like authentic cutting-mat typography */}
            <div className="py-4 space-y-3.5 my-auto">
              {group1.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between group/item px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-black/30 hover:backdrop-blur-xs"
                >
                  <span className="font-serif-display text-base sm:text-lg text-[#f4f1eb] tracking-tight transition-colors duration-200 group-hover/item:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#c2cb74]/75 group-hover/item:text-[#e4ee99] transition-colors">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-[#c2cb74]/25 flex items-center justify-between">
              <span className="font-sans text-[11px] text-[#d6e088]/85 uppercase tracking-wider font-semibold">
                {group1.title}
              </span>
              <span className="text-[10px] font-mono text-[#c2cb74]/60">01 / 03</span>
            </div>
          </div>
        </div>

        {/* ================= CARD 2: CENTER MAT CROP (Design & Logic) ================= */}
        <div
          className={`group relative w-full max-w-[340px] rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.03] cursor-default select-none animate-float-reverse ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transitionDelay: '180ms',
            boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(14, 56, 43, 0.45)',
            transform: 'perspective(1000px) rotateY(0deg) translateY(-6px)',
          }}
        >
          {/* Authentic Cutting Mat Texture Background (Center Crop) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group2.bgPosition,
              filter: 'contrast(1.08) brightness(0.92)',
            }}
          />

          {/* Ambient Lighting Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/25 to-white/18 pointer-events-none" />

          {/* Center Subtle Motto Badge matching user's image */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[85%] py-1.5 px-3 rounded border border-[#c2cb74]/25 bg-[#08241b]/80 backdrop-blur-xs text-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <p className="font-serif-display italic text-[11px] text-[#e8e4d8] tracking-normal drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              "Don't be busy. Be productive."
            </p>
          </div>

          {/* Surface Specular Sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.22)_0%,transparent_65%)] pointer-events-none" />

          {/* Beveled Cutting-Mat Rim */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1c5541]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Card Content */}
          <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full min-h-[340px]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#c2cb74]/35 pb-3">
              <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[#d6e088] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {group2.coord}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#d6e088] opacity-80 group-hover:animate-ping" />
            </div>

            {/* List of Skills */}
            <div className="py-4 mt-7 space-y-2.5 my-auto">
              {group2.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between group/item px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-black/35 hover:backdrop-blur-xs"
                >
                  <span className="font-serif-display text-base sm:text-lg text-[#f4f1eb] tracking-tight transition-colors duration-200 group-hover/item:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#c2cb74]/75 group-hover/item:text-[#e4ee99] transition-colors">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-[#c2cb74]/25 flex items-center justify-between">
              <span className="font-sans text-[11px] text-[#d6e088]/85 uppercase tracking-wider font-semibold">
                {group2.title}
              </span>
              <span className="text-[10px] font-mono text-[#c2cb74]/60">02 / 03</span>
            </div>
          </div>
        </div>

        {/* ================= CARD 3: BOTTOM MAT CROP (Visual & User) ================= */}
        <div
          className={`group relative w-full max-w-[340px] rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-default select-none animate-float-gentle ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            animationDelay: '1.2s',
            transitionDelay: '260ms',
            boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.9), 0 0 35px rgba(14, 56, 43, 0.35)',
            transform: 'perspective(1000px) rotateY(-2deg) rotateZ(1deg)',
          }}
        >
          {/* Authentic Cutting Mat Texture Background (Bottom Crop with 30° 45° 60° guide lines) */}
          <div
            className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${cuttingMatImg})`,
              backgroundPosition: group3.bgPosition,
              filter: 'contrast(1.05) brightness(0.95)',
            }}
          />

          {/* Ambient Lighting Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/25 to-white/15 pointer-events-none" />

          {/* Surface Specular Sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(255,255,255,0.18)_0%,transparent_60%)] pointer-events-none" />

          {/* Beveled Rim */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1c5541]/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

          {/* Card Content */}
          <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full min-h-[340px]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#c2cb74]/35 pb-3">
              <span className="font-mono text-[11px] sm:text-xs tracking-widest text-[#d6e088] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {group3.coord}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#d6e088] opacity-80 group-hover:animate-ping" />
            </div>

            {/* List of Skills */}
            <div className="py-4 space-y-3.5 my-auto">
              {group3.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between group/item px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-black/30 hover:backdrop-blur-xs"
                >
                  <span className="font-serif-display text-base sm:text-lg text-[#f4f1eb] tracking-tight transition-colors duration-200 group-hover/item:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#c2cb74]/75 group-hover/item:text-[#e4ee99] transition-colors">
                    {skill.mark}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Category Label */}
            <div className="pt-3 border-t border-[#c2cb74]/25 flex items-center justify-between">
              <span className="font-sans text-[11px] text-[#d6e088]/85 uppercase tracking-wider font-semibold">
                {group3.title}
              </span>
              <span className="text-[10px] font-mono text-[#c2cb74]/60">03 / 03</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
