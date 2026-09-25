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
      left: '10.65%',
      top: '9.12%',
      width: '10.84%',
      height: '18.91%',
    },
    thinking: {
      left: '31.05%',
      top: '12.30%',
      width: '15.68%',
      height: '25.70%',
    },
    pointing: {
      left: '11.03%',
      top: '43.24%',
      width: '12.99%',
      height: '23.47%',
    },
  }

  // Mobile coordinate mappings (804 x 1024 left card)
  const mobileCoords = {
    hello: {
      left: '8.83%',
      top: '4.88%',
      width: '25.12%',
      height: '21.48%',
    },
    thinking: {
      left: '56.09%',
      top: '8.50%',
      width: '36.32%',
      height: '29.20%',
    },
    pointing: {
      left: '9.70%',
      top: '43.65%',
      width: '30.10%',
      height: '26.66%',
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
