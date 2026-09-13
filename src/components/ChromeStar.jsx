import React from 'react'

/**
 * Chrome 4-point Sparkle Star with Orbit Ring
 * Uses mixBlendMode: 'difference' so that it dynamically inverts colors
 * between dark backgrounds (pure white) and white paper backgrounds (pure black).
 */
export default function ChromeStar({ className = '', style = {} }) {
  return (
    <div
      className={`relative select-none pointer-events-none transition-transform duration-300 ${className}`}
      style={{
        mixBlendMode: 'difference',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer orbital thin ring */}
        <circle
          cx="50"
          cy="50"
          r="38"
          stroke="white"
          strokeWidth="2.5"
        />

        {/* 4-pointed curved chrome sparkle with sharp tips extending past circle */}
        <path
          d="M 50 3 C 50 32 32 50 3 50 C 32 50 50 68 50 97 C 50 68 68 50 97 50 C 68 50 50 32 50 3 Z"
          fill="white"
        />
      </svg>
    </div>
  )
}
