import React from 'react'
import procreateImg from '../assets/skills/procreate.jpg'
import sketchbookImg from '../assets/skills/sketchbook.jpg'
import inshotImg from '../assets/skills/inshot.jpg'
import canvaImg from '../assets/skills/canva.jpg'
import dreamsImg from '../assets/skills/procreate_dreams.jpg'
import premiereSvg from '../assets/skills/premiere.svg'
import photoshopSvg from '../assets/skills/photoshop.svg'
import illustratorSvg from '../assets/skills/illustrator.svg'
import blenderSvg from '../assets/skills/blender.svg'
import figmaSvg from '../assets/skills/figma.svg'
import autocadSvg from '../assets/skills/autocad.svg'

/**
 * Official, high-resolution authentic app icons for the Skill Set section
 */

export function ProcreateIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-[22%] overflow-hidden bg-[#18191C] shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none ${className}`}>
      <img
        src={procreateImg}
        alt="Procreate"
        className="w-full h-full object-cover pointer-events-none"
        loading="eager"
      />
    </div>
  )
}

export function SketchbookIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-[22%] overflow-hidden bg-[#E95B3D] shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none ${className}`}>
      <img
        src={sketchbookImg}
        alt="Sketchbook"
        className="w-full h-full object-cover pointer-events-none"
        loading="eager"
      />
    </div>
  )
}

export function FigmaIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-full bg-black flex items-center justify-center p-[18%] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.22)] shrink-0 select-none ${className}`}>
      <img
        src={figmaSvg}
        alt="Figma"
        className="w-full h-full object-contain pointer-events-none"
        loading="eager"
      />
    </div>
  )
}

export function PremierProIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-[22%] overflow-hidden bg-[#00005B] shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none ${className}`}>
      <img
        src={premiereSvg}
        alt="Premier Pro"
        className="w-full h-full object-contain pointer-events-none"
        loading="eager"
      />
    </div>
  )
}

export function BlenderIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
      <img
        src={blenderSvg}
        alt="Blender"
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_10px_rgba(234,118,0,0.25)]"
        loading="eager"
      />
    </div>
  )
}

export function PhotoshopIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-[22%] overflow-hidden bg-[#001E36] shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none ${className}`}>
      <img
        src={photoshopSvg}
        alt="Photoshop"
        className="w-full h-full object-contain pointer-events-none"
        loading="eager"
      />
    </div>
  )
}

export function IllustratorIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-[22%] overflow-hidden bg-[#330000] shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none ${className}`}>
      <img
        src={illustratorSvg}
        alt="Illustrator"
        className="w-full h-full object-contain pointer-events-none"
        loading="eager"
      />
    </div>
  )
}

export function InShotIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-[22%] overflow-hidden bg-[#FF2A54] shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none ${className}`}>
      <img
        src={inshotImg}
        alt="InShot"
        className="w-full h-full object-cover pointer-events-none"
        loading="eager"
      />
    </div>
  )
}

export function CanvaIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-[22%] overflow-hidden bg-[#00C4CC] shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none ${className}`}>
      <img
        src={canvaImg}
        alt="Canva"
        className="w-full h-full object-cover pointer-events-none"
        loading="eager"
      />
    </div>
  )
}

export function AutocadIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
      <img
        src={autocadSvg}
        alt="AutoCAD"
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_12px_rgba(232,89,132,0.3)]"
        loading="eager"
      />
    </div>
  )
}

export function ProcreateDreamsIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-[22%] overflow-hidden bg-[#18191C] shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none ${className}`}>
      <img
        src={dreamsImg}
        alt="Procreate Dreams"
        className="w-full h-full object-cover pointer-events-none"
        loading="eager"
      />
    </div>
  )
}
