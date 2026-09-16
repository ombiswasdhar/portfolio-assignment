import React, { useState } from 'react'
import charPointing from '../assets/about/char_pointing_perfect.png'
import charThinking from '../assets/about/char_thinking_perfect.png'
import textHelloImOm from '../assets/about/text_hello_im_om.png'

/**
 * AboutCharacters
 * 
 * Renders the 3 authentic About Me illustrated elements with rich animations:
 * 1. "Hello, i'm OM." — Organic float, pulsing cyan/blue glow, spring bounce on hover, and friendly greeting pop.
 * 2. Thinking Character (Top Right) — Mastermind breathing float, sinister giggle vibration on hover with purple/crimson aura and plotting thought bubble.
 * 3. Pointing Character (Middle Left) — Enthusiastic upward bob, anime glasses gleam flash, excited bounce on hover with sparkling tip and comic speech bubble.
 * 
 * Supports both:
 * - Desktop: Coordinates mapped to the 1024x768 Figma frame.
 * - Mobile: Coordinates mapped to the 480x590 left card.
 */
export default function AboutCharacters({ isMobile = false }) {
  const [activeBubble, setActiveBubble] = useState(null) // 'hello' | 'thinking' | 'pointing' | null

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
      {/* ================= 1. "HELLO, I'M OM." ANIMATED COMPONENT ================= */}
      <div
        className="absolute z-20 pointer-events-auto cursor-pointer group/hello select-none transition-transform duration-300 active:scale-95"
        style={coords.hello}
        onMouseEnter={() => setActiveBubble('hello')}
        onMouseLeave={() => setActiveBubble(null)}
        onClick={() => setActiveBubble(activeBubble === 'hello' ? null : 'hello')}
        role="button"
        tabIndex={0}
        aria-label="Hello, i'm OM. Click to interact"
      >
        {/* Floating Wrapper */}
        <div className="relative w-full h-full anim-hello-idle group-hover/hello:scale-105 group-hover/hello:-rotate-1 transition-all duration-300">
          <img
            src={textHelloImOm}
            alt="Hello, i'm OM."
            className="w-full h-full object-contain pointer-events-none select-none anim-blue-glow filter group-hover/hello:brightness-110 transition-all duration-300"
          />

          {/* Comic Greeting Popover */}
          {(activeBubble === 'hello') && (
            <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 anim-pop-bubble z-40 pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-black text-[9px] sm:text-[10px] font-fredoka font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.5)] border border-black/10 whitespace-nowrap">
                <span className="text-sm leading-none">👋</span>
                <span>Glad you're here!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= 2. THINKING CHARACTER (TOP RIGHT) ================= */}
      <div
        className="absolute z-20 pointer-events-auto cursor-pointer group/thinking select-none transition-all duration-300 active:scale-95"
        style={coords.thinking}
        onMouseEnter={() => setActiveBubble('thinking')}
        onMouseLeave={() => setActiveBubble(null)}
        onClick={() => setActiveBubble(activeBubble === 'thinking' ? null : 'thinking')}
        role="button"
        tabIndex={0}
        aria-label="Mastermind thinking character. Click to interact"
      >
        {/* Floating/Giggling Character Wrapper */}
        <div
          className={`relative w-full h-full transition-all duration-300 ${
            activeBubble === 'thinking' ? 'anim-thinking-active' : 'anim-thinking-idle group-hover/thinking:anim-thinking-active'
          }`}
        >
          <img
            src={charThinking}
            alt="Om thinking character in suit with hands clasped"
            className="w-full h-full object-contain pointer-events-none select-none filter transition-all duration-300"
          />

          {/* Comic Thought Bubble */}
          {(activeBubble === 'thinking') && (
            <div className="absolute -top-8 sm:-top-9 right-0 anim-pop-bubble z-40 pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-2xl bg-[#1a1824] text-purple-200 text-[8.5px] sm:text-[10px] font-fredoka font-medium shadow-[0_8px_24px_rgba(0,0,0,0.85)] border border-purple-500/40 whitespace-nowrap backdrop-blur-md">
                <span>🧠</span>
                <span>"Plotting pixel-perfect layouts..."</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= 3. POINTING CHARACTER (MIDDLE LEFT) ================= */}
      <div
        className="absolute z-20 pointer-events-auto cursor-pointer group/pointing select-none transition-all duration-300 active:scale-95"
        style={coords.pointing}
        onMouseEnter={() => setActiveBubble('pointing')}
        onMouseLeave={() => setActiveBubble(null)}
        onClick={() => setActiveBubble(activeBubble === 'pointing' ? null : 'pointing')}
        role="button"
        tabIndex={0}
        aria-label="Pointing character with glasses. Click to interact"
      >
        {/* Bobbing/Excited Pointing Character Wrapper */}
        <div
          className={`relative w-full h-full transition-all duration-300 ${
            activeBubble === 'pointing' ? 'anim-pointing-active' : 'anim-pointing-idle group-hover/pointing:anim-pointing-active'
          }`}
        >
          <img
            src={charPointing}
            alt="Om pointing character with glasses smiling"
            className="w-full h-full object-contain pointer-events-none select-none filter transition-all duration-300"
          />

          {/* Sparkling Fingertip Star on Hover */}
          {(activeBubble === 'pointing') && (
            <span
              className="absolute right-[-2px] top-[14px] text-amber-300 text-xs sm:text-sm animate-ping pointer-events-none"
              aria-hidden="true"
            >
              ✦
            </span>
          )}

          {/* Comic Speech Bubble */}
          {(activeBubble === 'pointing') && (
            <div className="absolute -top-7 sm:-top-8 left-0 anim-pop-bubble z-40 pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-2xl bg-[#14221c] text-emerald-300 text-[8.5px] sm:text-[10px] font-fredoka font-medium shadow-[0_8px_24px_rgba(0,0,0,0.85)] border border-emerald-500/40 whitespace-nowrap backdrop-blur-md">
                <span>☝️</span>
                <span>"Design with curiosity!"</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
