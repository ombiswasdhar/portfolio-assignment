import React from 'react'
import charPointing from '../assets/about/char_pointing_perfect.png'
import charThinking from '../assets/about/char_thinking_perfect.png'
import textHelloImOm from '../assets/about/text_hello_im_om.png'

/**
 * AboutCharacters
 * 
 * Smooth, natural floating animations for:
 * 1. "Hello, i'm OM."
 * 2. Thinking Character (Top Right)
 * 3. Pointing Character (Middle Left)
 * 
 * Retains 100% of authentic properties, sizes, and colors with zero glow.
 */
export default function AboutCharacters({ isMobile = false }) {
  // Desktop coordinate mappings (1024 x 768 frame)
  const desktopCoords = {
    hello: {
      left: '11.04%',
      top: '16.67%',
      width: '11.91%',
      height: '17.32%',
    },
    thinking: {
      left: '35.94%',
      top: '19.27%',
      width: '14.65%',
      height: '24.09%',
    },
    pointing: {
      left: '11.13%',
      top: '48.83%',
      width: '12.70%',
      height: '18.88%',
    },
  }

  // Mobile coordinate mappings (480 x 590 left card)
  const mobileCoords = {
    hello: {
      left: '8.75%',
      top: '0.51%',
      width: '25.42%',
      height: '22.54%',
    },
    thinking: {
      left: '61.88%',
      top: '3.90%',
      width: '31.25%',
      height: '31.36%',
    },
    pointing: {
      left: '8.96%',
      top: '42.37%',
      width: '27.08%',
      height: '24.58%',
    },
  }

  const coords = isMobile ? mobileCoords : desktopCoords

  return (
    <>
      {/* ================= 1. "HELLO, I'M OM." FLOATING ================= */}
      <div
        className="absolute z-20 pointer-events-none select-none anim-float-hello"
        style={coords.hello}
        aria-hidden="true"
      >
        <img
          src={textHelloImOm}
          alt="Hello, i'm OM."
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </div>

      {/* ================= 2. THINKING CHARACTER (TOP RIGHT) FLOATING ================= */}
      <div
        className="absolute z-20 pointer-events-none select-none anim-float-thinking"
        style={coords.thinking}
        aria-hidden="true"
      >
        <img
          src={charThinking}
          alt="Thinking character in suit"
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </div>

      {/* ================= 3. POINTING CHARACTER (MIDDLE LEFT) FLOATING ================= */}
      <div
        className="absolute z-20 pointer-events-none select-none anim-float-pointing"
        style={coords.pointing}
        aria-hidden="true"
      >
        <img
          src={charPointing}
          alt="Pointing character with glasses"
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </div>
    </>
  )
}
