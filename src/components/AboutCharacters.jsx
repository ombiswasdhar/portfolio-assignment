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
  // Left Card sits at left: 71, top: 98, width: 483, height: 615
  const desktopCoords = {
    hello: {
      left: '11.01%',
      top: '16.58%',
      width: '12.05%',
      height: '17.59%',
    },
    thinking: {
      left: '36.07%',
      top: '19.24%',
      width: '14.57%',
      height: '24.07%',
    },
    pointing: {
      left: '11.44%',
      top: '49.56%',
      width: '11.62%',
      height: '17.47%',
    },
  }

  // Mobile coordinate mappings (card container relative to 2720 x 3460)
  const mobileCoords = {
    hello: {
      left: '8.64%',
      top: '4.77%',
      width: '25.55%',
      height: '21.97%',
    },
    thinking: {
      left: '61.76%',
      top: '8.09%',
      width: '30.88%',
      height: '30.06%',
    },
    pointing: {
      left: '9.56%',
      top: '45.95%',
      width: '24.63%',
      height: '21.82%',
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
