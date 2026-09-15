import React, { useState } from 'react'
import aboutFullFrame from '../assets/about/about_full_frame.png'
import aboutLeftCard from '../assets/about/about_left_card.png'
import wordSince from '../assets/about/word_since.png'
import wordAs from '../assets/about/word_as.png'
import wordFlourishA from '../assets/about/word_flourish_a.png'
import AnimatedCollage from './AnimatedCollage'

export default function AboutSection() {
  const [activeMobileBubble, setActiveMobileBubble] = useState(null)

  return (
    <section
      id="about"
      aria-label="About Me section"
      className="relative w-full bg-black text-white select-none overflow-hidden pt-0 pb-0"
    >
      {/* Decorative ambient background glow matching the hero banner */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[1380px] mx-auto px-3 sm:px-6 md:px-8">
        
        {/* ================= DESKTOP / TABLET VIEW (md and up) ================= */}
        <div className="hidden md:block w-full">
          <div className="relative w-full max-w-[1240px] mx-auto aspect-[1024/768] rounded-t-[28px] lg:rounded-t-[36px] rounded-b-none overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.9)] border-t border-x border-white/10 group transition-all duration-500 hover:border-white/20">
            {/* Original Figma Frame - untouched in original form and place */}
            <img
              src={aboutFullFrame}
              alt="About Me - Om, UI/UX Designer, Illustrator, Artist based in Shillong, India. Age 21 Years."
              className="w-full h-full object-cover lg:object-contain object-center select-none pointer-events-none"
            />

            {/* Interactive Animated Overlays: 3D Tilting Polaroid & Graphics Designer Marquee Tape */}
            <div
              className="absolute z-10 pointer-events-auto"
              style={{
                left: '50.78%',
                top: '3.91%',
                width: '49.22%',
                height: '96.09%',
              }}
            >
              <AnimatedCollage className="w-full h-full" standalone={false} />
            </div>

            {/* Interactive Comic Text Bubbles Overlay for each Paragraph */}
            {/* Tagline */}
            <div
              className="comic-overlay-bubble comic-bubble-tail-left"
              style={{ left: '10.16%', top: '39.32%', width: '24.41%', minHeight: '6.25%' }}
              tabIndex={0}
              role="article"
              aria-label="Tagline: ui-ux designer / illustrator / artist based in SHILLONG , INDIA."
            >
              <div className="w-full h-full p-2.5 flex items-center gap-2 text-[10px] lg:text-xs text-neutral-200 font-fredoka font-normal">
                <img
                  src={wordFlourishA}
                  alt="a"
                  className="w-[12px] h-[14px] object-contain inline-block shrink-0 -mb-0.5"
                />
                <span>
                  ui-ux designer / illustrator / artist based in{' '}
                  <strong className="font-semibold text-white">SHILLONG , INDIA.</strong>
                </span>
              </div>
            </div>

            {/* Paragraph 1: SINCE 8th grade... */}
            <div
              className="comic-overlay-bubble comic-bubble-tail-left"
              style={{ left: '23.24%', top: '46.88%', width: '27.34%', minHeight: '10.42%' }}
              tabIndex={0}
              role="article"
              aria-label="Description paragraph 1"
            >
              <div className="w-full h-full p-2.5 lg:p-3 text-[10px] sm:text-[11px] lg:text-[13px] text-neutral-200 font-fredoka font-light leading-snug">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <img
                    src={wordSince}
                    alt="SINCE"
                    className="h-[15px] lg:h-[18px] object-contain inline-block align-baseline -mb-0.5 shrink-0"
                  />
                  <span>
                    8th grade my knack for{' '}
                    <strong className="font-bold text-white">illustrations</strong> ,{' '}
                    <strong className="font-bold text-white">character design</strong> , and
                    anything related to design has been constantly growing.
                  </span>
                </div>
              </div>
            </div>

            {/* Paragraph 2: For a long time I was into character designing... */}
            <div
              className="comic-overlay-bubble comic-bubble-tail-left"
              style={{ left: '23.24%', top: '57.03%', width: '27.34%', minHeight: '13.67%' }}
              tabIndex={0}
              role="article"
              aria-label="Description paragraph 2"
            >
              <div className="w-full h-full p-2.5 lg:p-3 text-[10px] sm:text-[11px] lg:text-[13px] text-neutral-200 font-fredoka font-light leading-snug">
                <span>
                  For a long time I was into character designing , then started exploring other
                  areas , such as (
                  <strong className="font-bold text-white">
                    Ui-Ux design / graphic design / illustrations / video editing / 3d design / product design / etc
                  </strong>
                  ).
                </span>
              </div>
            </div>

            {/* Paragraph 3: as a new and curious artist... */}
            <div
              className="comic-overlay-bubble comic-bubble-tail-left"
              style={{ left: '10.16%', top: '70.83%', width: '40.43%', minHeight: '6.51%' }}
              tabIndex={0}
              role="article"
              aria-label="Description paragraph 3"
            >
              <div className="w-full h-full p-2.5 lg:p-3 text-[10px] sm:text-[11px] lg:text-[13px] text-neutral-200 font-fredoka font-light leading-snug flex items-baseline gap-2">
                <img
                  src={wordAs}
                  alt="as"
                  className="h-[14px] lg:h-[16px] object-contain inline-block align-baseline -mb-0.5 shrink-0"
                />
                <span>
                  a new and curious artist, I'm always exploring different styles and mediums , it's
                  how I learn and evolve.
                </span>
              </div>
            </div>

            {/* Paragraph 4: I love experimenting... */}
            <div
              className="comic-overlay-bubble comic-bubble-tail-left"
              style={{ left: '10.16%', top: '77.60%', width: '40.43%', minHeight: '6.51%' }}
              tabIndex={0}
              role="article"
              aria-label="Description paragraph 4"
            >
              <div className="w-full h-full p-2.5 lg:p-3 text-[10px] sm:text-[11px] lg:text-[13px] text-neutral-200 font-fredoka font-light leading-snug">
                <span>
                  I love experimenting, taking inspiration from everywhere, and turning simple ideas
                  into something visual and expressive.
                </span>
              </div>
            </div>

            {/* Paragraph 5: I'm also really into sports... */}
            <div
              className="comic-overlay-bubble comic-bubble-tail-left"
              style={{ left: '10.16%', top: '84.38%', width: '40.43%', minHeight: '7.29%' }}
              tabIndex={0}
              role="article"
              aria-label="Description paragraph 5"
            >
              <div className="w-full h-full p-2.5 lg:p-3 text-[10px] sm:text-[11px] lg:text-[13px] text-neutral-200 font-fredoka font-light leading-snug">
                <span>
                  I'm also really into sports and staying active. It helps me keep my energy up and
                  my creativity flowing. I like to think the discipline from sports shows up in my
                  art too.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE VIEW (Stacked column in original form) ================= */}
        <div className="md:hidden flex flex-col items-center gap-6 sm:gap-8 w-full max-w-[500px] mx-auto">
          {/* Top 'portfolio' cursive text with mobile tap hint */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-script text-3xl sm:text-4xl font-normal leading-none tracking-wide text-white lowercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              portfolio
            </span>
            <span className="text-[10px] font-fredoka uppercase tracking-widest text-neutral-400/90">
              Tap any paragraph to zoom in
            </span>
          </div>

          {/* Left Card - Clean, authentic Figma art with tap-to-zoom bubbles */}
          <div className="relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.8)] border border-white/10">
            <img
              src={aboutLeftCard}
              alt="Hello, i'm OM. UI/UX designer, illustrator, artist based in Shillong, India."
              className="w-full h-auto object-contain select-none pointer-events-none"
            />

            {/* Mobile Tagline */}
            <div
              onClick={() => setActiveMobileBubble(activeMobileBubble === 0 ? null : 0)}
              className={`comic-overlay-bubble comic-bubble-tail-left ${
                activeMobileBubble === 0
                  ? '!opacity-100 !scale-105 !bg-[#1e2024] !border-white shadow-[4px_4px_0px_#ba1f1f,0_16px_36px_rgba(0,0,0,0.9)] !z-50'
                  : ''
              }`}
              style={{ left: '6.88%', top: '30.00%', width: '52.08%', minHeight: '8.14%' }}
              tabIndex={0}
              role="article"
            >
              <div className="w-full h-full p-2.5 flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-100 font-fredoka">
                <img src={wordFlourishA} alt="a" className="w-[11px] h-[13px] object-contain shrink-0" />
                <span>
                  ui-ux designer / illustrator / artist based in{' '}
                  <strong className="font-semibold text-white">SHILLONG , INDIA.</strong>
                </span>
              </div>
            </div>

            {/* Mobile Paragraph 1 */}
            <div
              onClick={() => setActiveMobileBubble(activeMobileBubble === 1 ? null : 1)}
              className={`comic-overlay-bubble comic-bubble-tail-left ${
                activeMobileBubble === 1
                  ? '!opacity-100 !scale-105 !bg-[#1e2024] !border-white shadow-[4px_4px_0px_#ba1f1f,0_16px_36px_rgba(0,0,0,0.9)] !z-50'
                  : ''
              }`}
              style={{ left: '34.79%', top: '39.83%', width: '58.33%', minHeight: '13.56%' }}
              tabIndex={0}
              role="article"
            >
              <div className="w-full h-full p-2.5 text-[11px] sm:text-xs text-neutral-100 font-fredoka font-light leading-snug">
                <div className="flex items-baseline gap-1 flex-wrap">
                  <img src={wordSince} alt="SINCE" className="h-[14px] object-contain shrink-0" />
                  <span>
                    8th grade my knack for{' '}
                    <strong className="font-bold text-white">illustrations</strong> ,{' '}
                    <strong className="font-bold text-white">character design</strong> , and anything related to design has been constantly growing.
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Paragraph 2 */}
            <div
              onClick={() => setActiveMobileBubble(activeMobileBubble === 2 ? null : 2)}
              className={`comic-overlay-bubble comic-bubble-tail-left ${
                activeMobileBubble === 2
                  ? '!opacity-100 !scale-105 !bg-[#1e2024] !border-white shadow-[4px_4px_0px_#ba1f1f,0_16px_36px_rgba(0,0,0,0.9)] !z-50'
                  : ''
              }`}
              style={{ left: '34.79%', top: '53.05%', width: '58.33%', minHeight: '17.80%' }}
              tabIndex={0}
              role="article"
            >
              <div className="w-full h-full p-2.5 text-[11px] sm:text-xs text-neutral-100 font-fredoka font-light leading-snug">
                <span>
                  For a long time I was into character designing , then started exploring other areas , such as (
                  <strong className="font-bold text-white">
                    Ui-Ux design / graphic design / illustrations / video editing / 3d design / product design / etc
                  </strong>
                  ).
                </span>
              </div>
            </div>

            {/* Mobile Paragraph 3 */}
            <div
              onClick={() => setActiveMobileBubble(activeMobileBubble === 3 ? null : 3)}
              className={`comic-overlay-bubble comic-bubble-tail-left ${
                activeMobileBubble === 3
                  ? '!opacity-100 !scale-105 !bg-[#1e2024] !border-white shadow-[4px_4px_0px_#ba1f1f,0_16px_36px_rgba(0,0,0,0.9)] !z-50'
                  : ''
              }`}
              style={{ left: '6.88%', top: '71.02%', width: '86.25%', minHeight: '8.47%' }}
              tabIndex={0}
              role="article"
            >
              <div className="w-full h-full p-2.5 text-[11px] sm:text-xs text-neutral-100 font-fredoka font-light leading-snug flex items-baseline gap-1.5">
                <img src={wordAs} alt="as" className="h-[13px] object-contain shrink-0" />
                <span>
                  a new and curious artist, I'm always exploring different styles and mediums , it's how I learn and evolve.
                </span>
              </div>
            </div>

            {/* Mobile Paragraph 4 */}
            <div
              onClick={() => setActiveMobileBubble(activeMobileBubble === 4 ? null : 4)}
              className={`comic-overlay-bubble comic-bubble-tail-left ${
                activeMobileBubble === 4
                  ? '!opacity-100 !scale-105 !bg-[#1e2024] !border-white shadow-[4px_4px_0px_#ba1f1f,0_16px_36px_rgba(0,0,0,0.9)] !z-50'
                  : ''
              }`}
              style={{ left: '6.88%', top: '79.83%', width: '86.25%', minHeight: '8.47%' }}
              tabIndex={0}
              role="article"
            >
              <div className="w-full h-full p-2.5 text-[11px] sm:text-xs text-neutral-100 font-fredoka font-light leading-snug">
                <span>
                  I love experimenting, taking inspiration from everywhere, and turning simple ideas into something visual and expressive.
                </span>
              </div>
            </div>

            {/* Mobile Paragraph 5 */}
            <div
              onClick={() => setActiveMobileBubble(activeMobileBubble === 5 ? null : 5)}
              className={`comic-overlay-bubble comic-bubble-tail-left ${
                activeMobileBubble === 5
                  ? '!opacity-100 !scale-105 !bg-[#1e2024] !border-white shadow-[4px_4px_0px_#ba1f1f,0_16px_36px_rgba(0,0,0,0.9)] !z-50'
                  : ''
              }`}
              style={{ left: '6.88%', top: '88.64%', width: '86.25%', minHeight: '9.49%' }}
              tabIndex={0}
              role="article"
            >
              <div className="w-full h-full p-2.5 text-[11px] sm:text-xs text-neutral-100 font-fredoka font-light leading-snug">
                <span>
                  I'm also really into sports and staying active. It helps me keep my energy up and my creativity flowing. I like to think the discipline from sports shows up in my art too.
                </span>
              </div>
            </div>
          </div>

          {/* Right Collage - Animated Polaroid & Scrolling Ticker Tape */}
          <div className="w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <AnimatedCollage standalone={true} />
          </div>
        </div>

        {/* ================= SCREEN READER / SEO METADATA ================= */}
        <div className="sr-only">
          <h2>About Me — Hello, i'm OM.</h2>
          <p>ui-ux designer / illustrator / artist based in SHILLONG , INDIA.</p>
          <p>
            SINCE 8th grade my knack for illustrations , character design , and anything related to
            design has been constantly growing.
          </p>
          <p>
            For a long time I was into character designing , then started exploring other areas ,
            such as (Ui-Ux design / graphic design / illustrations / video editing / 3d design / product design / etc).
          </p>
          <p>
            as a new and curious artist, I'm always exploring different styles and mediums , it's how
            I learn and evolve.
          </p>
          <p>
            I love experimenting, taking inspiration from everywhere, and turning simple ideas into
            something visual and expressive.
          </p>
          <p>
            I'm also really into sports and staying active. It helps me keep my energy up and my
            creativity flowing. I like to think the discipline from sports shows up in my art too.
          </p>
          <p>Profile: Age 21 Years | Graphics Designer</p>
        </div>

      </div>
    </section>
  )
}
