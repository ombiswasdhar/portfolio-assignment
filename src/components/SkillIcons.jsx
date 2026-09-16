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
    <div
      title="Figma"
      aria-label="Figma"
      className={`relative rounded-full bg-black flex items-center justify-center p-[13%] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.22)] shrink-0 select-none ${className}`}
    >
      <svg
        viewBox="0 0 256 384"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain pointer-events-none"
      >
        <path d="M64 384C99.328 384 128 355.328 128 320V256H64C28.672 256 0 284.672 0 320C0 355.328 28.672 384 64 384Z" fill="#0ACF83" />
        <path d="M0 192C0 156.672 28.672 128 64 128H128V256H64C28.672 256 0 227.328 0 192Z" fill="#A259FF" />
        <path d="M0 64C0 28.672 28.672 0 64 0H128V128H64C28.672 128 0 99.328 0 64Z" fill="#F24E1E" />
        <path d="M128 0H192C227.328 0 256 28.672 256 64C256 99.328 227.328 128 192 128H128V0Z" fill="#FF7262" />
        <path d="M256 192C256 227.328 227.328 256 192 256C156.672 256 128 227.328 128 192C128 156.672 156.672 128 192 128C227.328 128 256 156.672 256 192Z" fill="#1ABCFE" />
      </svg>
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
