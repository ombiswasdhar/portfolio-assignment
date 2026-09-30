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
import antigravitySvg from '../assets/skills/antigravity.svg'
import aftereffectsSvg from '../assets/skills/aftereffects.svg'

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

export function VSCodeIcon({ className = 'w-12 h-12' }) {
  return (
    <div
      title="VS Code"
      aria-label="VS Code"
      className={`relative rounded-[22%] overflow-hidden bg-[#1e1e1e] shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none flex items-center justify-center p-[10%] ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain pointer-events-none"
      >
        <mask id="vsc-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <path d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7452L6.86933 74.7541C8.35363 76.1043 10.589 76.2036 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z" fill="white"/>
        </mask>
        <g mask="url(#vsc-mask)">
          <path d="M96.4614 10.7962L75.8569 0.875542C73.4719 -0.272773 70.6217 0.211611 68.75 2.08333L1.35669 63.5765C-0.455765 65.231 -0.453684 68.0876 1.36125 69.7392L6.86813 74.7484C8.35315 76.0989 10.5894 76.1984 12.1878 74.985L96.4614 10.7962Z" fill="#0065A9"/>
          <g filter="url(#vsc-filter0)">
            <path d="M96.4614 89.2038L75.8569 99.1245C73.4719 100.273 70.6217 99.7884 68.75 97.9167L1.35669 36.4235C-0.455765 34.769 -0.453684 31.9124 1.36125 30.2608L6.86813 25.2516C8.35315 23.9011 10.5894 23.8016 12.1878 25.015L96.4614 89.2038Z" fill="#007ACC"/>
          </g>
          <g filter="url(#vsc-filter1)">
            <path d="M75.8578 99.1263C73.4721 100.274 70.6219 99.7885 68.75 97.9166C71.0564 100.223 75 98.5895 75 95.3278V4.67213C75 1.41039 71.0564 -0.223106 68.75 2.08329C70.6219 0.211402 73.4721 -0.273666 75.8578 0.87367L96.4587 10.7804C98.6234 11.8215 100 14.0112 100 16.4132V83.5869C100 85.9889 98.6234 88.1786 96.4588 89.2196L75.8578 99.1263Z" fill="#1E8AD2"/>
          </g>
          <rect x="0" y="0" width="100" height="100" fill="url(#vsc-paint0)" opacity="0.25"/>
        </g>
        <defs>
          <filter id="vsc-filter0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="bg"/>
            <feBlend in="SourceGraphic" in2="bg"/>
          </filter>
          <filter id="vsc-filter1" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="bg"/>
            <feBlend in="SourceGraphic" in2="bg"/>
          </filter>
          <linearGradient id="vsc-paint0" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function AntigravityIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-[22%] overflow-hidden bg-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none flex items-center justify-center p-[14%] ${className}`}>
      <img
        src={antigravitySvg}
        alt="Antigravity"
        className="w-full h-full object-contain pointer-events-none"
        loading="eager"
      />
    </div>
  )
}

export function AfterEffectsIcon({ className = 'w-12 h-12' }) {
  return (
    <div className={`relative rounded-[22%] overflow-hidden bg-[#00005B] shadow-[0_4px_14px_rgba(0,0,0,0.18)] shrink-0 select-none ${className}`}>
      <img
        src={aftereffectsSvg}
        alt="After Effects"
        className="w-full h-full object-contain pointer-events-none"
        loading="eager"
      />
    </div>
  )
}

/**
 * Official vector icons for Contact & Social channels in CVSection
 */
export function InstagramIcon({ className = 'w-4 h-4 shrink-0' }) {
  return (
    <span className={`inline-flex items-center justify-center overflow-hidden rounded-[4px] shrink-0 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="cv-ig-gradient" cx="20%" cy="110%" r="130%">
            <stop offset="0%" stopColor="#ffdc80" />
            <stop offset="25%" stopColor="#fcaf45" />
            <stop offset="50%" stopColor="#f77737" />
            <stop offset="75%" stopColor="#f56040" />
            <stop offset="90%" stopColor="#e1306c" />
            <stop offset="100%" stopColor="#c13584" />
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="5.5" fill="url(#cv-ig-gradient)" />
        <rect x="4.8" y="4.8" width="14.4" height="14.4" rx="4" stroke="#ffffff" strokeWidth="1.7" fill="none" />
        <circle cx="12" cy="12" r="3.4" stroke="#ffffff" strokeWidth="1.7" fill="none" />
        <circle cx="15.8" cy="8.2" r="1" fill="#ffffff" />
      </svg>
    </span>
  )
}

export function PhoneIcon({ className = 'w-4 h-4 shrink-0' }) {
  return (
    <span className={`w-4 h-4 rounded-[4px] bg-white flex items-center justify-center shrink-0 shadow-sm ${className}`}>
      <svg className="w-2.5 h-2.5 text-[#5066db]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.57 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.61c0-.55-.45-1-.99-1z" />
      </svg>
    </span>
  )
}

export function MailIcon({ className = 'w-4 h-4 shrink-0' }) {
  return (
    <span className={`w-4 h-4 rounded-[4px] bg-[#00C4FE] flex items-center justify-center shrink-0 shadow-sm ${className}`}>
      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    </span>
  )
}

export function BehanceIcon({ className = 'w-4 h-4 shrink-0' }) {
  return (
    <span className={`w-4 h-4 rounded-[4px] bg-[#0057ff] text-white flex items-center justify-center text-[8.5px] font-black shrink-0 shadow-sm ${className}`}>
      Bē
    </span>
  )
}
