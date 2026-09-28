import React from 'react'
import cuttingMatImg from '../assets/skills/cutting_mat.png'

const group1 = {
  title: 'Ideation & Form',
  coord: '60° // 1-7 INCH',
  badge: '01 / 03',
  bgPosition: '8% center',
  skills: [
    { name: 'Sketching' },
    { name: 'Animation' },
    { name: 'Product Design' },
    { name: 'Mood Boarding' },
  ],
}

const group2 = {
  title: 'Design & Logic',
  coord: '45° // CENTER',
  badge: '02 / 03',
  bgPosition: '50% center',
  skills: [
    { name: 'Painting' },
    { name: 'Ui/Ux Design' },
    { name: '3D Design' },
    { name: 'Mind Mapping' },
    { name: 'Info Collection' },
  ],
}

const group3 = {
  title: 'Visual & User',
  coord: 'A4 // 1-17 CM',
  badge: '03 / 03',
  bgPosition: '92% center',
  skills: [
    { name: 'Character Design' },
    { name: 'Graphic Design' },
    { name: 'Animation' },
    { name: 'User Personas' },
  ],
}

const groups = [group1, group2, group3]

const matConfigs = [
  {
    perspective: 'perspective(900px) rotateY(3deg) rotateX(1deg)',
    animClass: 'animate-float-gentle',
    delay: '80ms',
    shadow: '0 30px 70px -10px rgba(0,0,0,0.95), 0 0 40px rgba(20,80,60,0.35)',
    num: '01',
  },
  {
    perspective: 'perspective(900px) rotateY(0deg) rotateX(-1deg)',
    animClass: 'animate-float-reverse',
    delay: '180ms',
    shadow: '0 35px 80px -12px rgba(0,0,0,0.95), 0 0 50px rgba(20,80,60,0.40)',
    num: '02',
  },
  {
    perspective: 'perspective(900px) rotateY(-3deg) rotateX(1deg)',
    animClass: 'animate-float-gentle',
    delay: '260ms',
    shadow: '0 30px 70px -10px rgba(0,0,0,0.95), 0 0 40px rgba(20,80,60,0.35)',
    num: '03',
  },
]

/*
 * "Design Toolbox" sticker text — multi-shadow outline technique.
 * 8-directional text-shadow at 3px creates a thick, smooth dark border.
 * Much better rendering than -webkit-text-stroke.
 */
const outlineThick = [
  '-3px -3px 0 #000', '3px -3px 0 #000',
  '-3px  3px 0 #000', '3px  3px 0 #000',
  ' 0   -3px 0 #000', '0    3px 0 #000',
  '-3px  0   0 #000', '3px  0   0 #000',
  '4px 4px 0px rgba(0,0,0,0.35)',
].join(', ')

const outlineMed = [
  '-2px -2px 0 #000', '2px -2px 0 #000',
  '-2px  2px 0 #000', '2px  2px 0 #000',
  ' 0   -2px 0 #000', '0    2px 0 #000',
  '-2px  0   0 #000', '2px  0   0 #000',
  '3px 3px 0px rgba(0,0,0,0.3)',
].join(', ')

const outlineThin = [
  '-1px -1px 0 #000', '1px -1px 0 #000',
  '-1px  1px 0 #000', '1px  1px 0 #000',
  ' 0   -1px 0 #000', '0    1px 0 #000',
  '-1px  0   0 #000', '1px  0   0 #000',
  '2px 2px 0px rgba(0,0,0,0.3)',
].join(', ')

function MatCard({ group, config, isVisible, index }) {
  return (
    /* Outer: float animation */
    <div
      className={config.animClass}
      style={{ animationDelay: index === 2 ? '1.2s' : '0s' }}
    >
      {/* Inner: 3D perspective */}
      <div
        className={`group relative w-full max-w-[370px] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.025] cursor-default select-none ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          transitionDelay: config.delay,
          boxShadow: config.shadow,
          transform: config.perspective,
        }}
      >
        {/* ─── Mat texture ─── */}
        <div
          className="absolute inset-0 w-full h-full bg-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          style={{
            backgroundImage: `url(${cuttingMatImg})`,
            backgroundPosition: group.bgPosition,
            filter: 'contrast(1.08) brightness(0.9) saturate(1.1)',
          }}
        />

        {/* ─── Light overlay — keep the mat grid visible ─── */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/40 pointer-events-none" />

        {/* ─── Vignette ─── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

        {/* ─── Vinyl sheen ─── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at ${index === 0 ? '28% 18%' : index === 1 ? '50% 12%' : '72% 18%'}, rgba(255,255,255,0.1) 0%, transparent 52%)`,
          }}
        />

        {/* ─── Rim ─── */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
          style={{
            border: '1.5px solid rgba(40,120,90,0.5)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.12), inset 0 -2px 6px rgba(0,0,0,0.5)',
          }}
        />

        {/* ─── Card Content ─── */}
        <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full min-h-[380px]">

          {/* ── Header ── */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="font-fredoka text-[13px] sm:text-sm uppercase tracking-[0.08em]"
              style={{
                color: '#fff',
                fontWeight: 600,
                textShadow: outlineMed,
              }}
            >
              {group.coord}
            </span>
            <span
              className="font-fredoka text-[11px] font-semibold px-2 py-0.5 rounded"
              style={{
                color: '#fff',
                fontWeight: 600,
                textShadow: outlineThin,
              }}
            >
              {group.badge}
            </span>
          </div>

          {/* ── Skills — "Design Toolbox" sticker text ── */}
          <div className="flex-1 flex flex-col justify-center gap-1.5 sm:gap-2">
            {group.skills.map((skill) => (
              <div
                key={skill.name}
                className="group/item transition-transform duration-200 cursor-default hover:translate-x-1"
              >
                <span
                  className="font-fredoka uppercase block"
                  style={{
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: 'clamp(14px, 2vw, 18px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                    textShadow: outlineThick,
                  }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          {/* ── Footer ── */}
          <div
            className="mt-4 pt-3 flex items-center justify-between"
            style={{ borderTop: '1.5px solid rgba(255,255,255,0.15)' }}
          >
            <span
              className="font-myfont text-lg sm:text-xl md:text-2xl tracking-wide lowercase"
              style={{
                color: '#ffffff',
                fontWeight: 600,
                textShadow: outlineMed,
              }}
            >
              {group.title}
            </span>
            <span
              className="font-fredoka text-xs sm:text-sm uppercase tracking-[0.15em]"
              style={{
                color: '#ffffff',
                fontWeight: 700,
                textShadow: outlineThin,
              }}
            >
              PART {config.num}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FloatingGreenMatSkills({ isVisible = true }) {
  return (
    <div className="w-full max-w-[1180px] mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start justify-items-center">
        {groups.map((group, index) => (
          <MatCard
            key={group.title}
            group={group}
            config={matConfigs[index]}
            isVisible={isVisible}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
