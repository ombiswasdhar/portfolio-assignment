import charThinking from '../assets/about/char_thinking_perfect.png'
import charPointing from '../assets/about/char_pointing_perfect.png'
import wordSince from '../assets/about/word_since.png'
import wordAs from '../assets/about/word_as.png'
import wordFlourishA from '../assets/about/word_flourish_a.png'
import aboutRightCollage from '../assets/about/about_right_collage.png'

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Me section"
      className="relative w-full bg-black text-white select-none overflow-hidden pt-8 pb-20 md:py-24"
    >
      {/* Decorative ambient background glow matching the hero banner */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Top 'portfolio' cursive text */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
          <span className="font-script text-3xl sm:text-4xl md:text-5xl font-normal leading-none tracking-wide text-white lowercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            portfolio
          </span>
        </div>

        {/* ================= MAIN ABOUT CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* LEFT INTERACTIVE CARD (Figma Frame Left Side) */}
          <div className="lg:col-span-6 xl:col-span-6 w-full flex justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-[530px] bg-[#333333] rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 shadow-[0_24px_60px_rgba(0,0,0,0.9)] border border-white/10 flex flex-col justify-between">
              
              {/* Card Header: Title & Thinking Character */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-white leading-none tracking-tight font-sans uppercase">
                    Hello,
                  </h2>
                  <div className="flex items-baseline gap-2 mt-1 sm:mt-2">
                    <span className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white font-sans">
                      i'm
                    </span>
                    <span className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#5694FD] font-sans tracking-tight">
                      OM.
                    </span>
                  </div>
                </div>

                {/* Manga Thinking / Scheming Character */}
                <div className="w-[115px] sm:w-[135px] lg:w-[150px] shrink-0 -mt-3 -mr-2 transition-transform duration-300 hover:scale-105 select-none">
                  <img
                    src={charThinking}
                    alt="Scheming anime character thinking with hands folded"
                    className="w-full h-auto object-contain pointer-events-none drop-shadow-md"
                  />
                </div>
              </div>

              {/* Tagline / Subtitle (Interactive Comic Bubble) */}
              <div className="comic-bubble comic-bubble-tail-left p-3 sm:p-3.5 -mx-1 sm:-mx-2 mt-2 rounded-2xl cursor-default group">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-200 font-fredoka font-normal">
                  <img
                    src={wordFlourishA}
                    alt="a"
                    className="w-[14px] h-[16px] object-contain inline-block shrink-0 -mb-0.5"
                  />
                  <span>
                    ui-ux designer / illustrator / artist based in{' '}
                    <strong className="font-semibold text-white">SHILLONG , INDIA.</strong>
                  </span>
                </div>
              </div>

              {/* Middle Section: Pointing Character (left) + Paras 1 & 2 (right) */}
              <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center my-3 sm:my-4">
                {/* Pointing Character */}
                <div className="col-span-4 flex justify-center items-center">
                  <img
                    src={charPointing}
                    alt="Anime boy character pointing index finger up with enthusiasm"
                    className="w-full max-w-[115px] sm:max-w-[130px] h-auto object-contain select-none pointer-events-none transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Description Paragraph 1 & 2 with Comic Bubble Zoom */}
                <div className="col-span-8 flex flex-col gap-2.5 sm:gap-3">
                  {/* Paragraph 1 */}
                  <div
                    tabIndex={0}
                    role="article"
                    aria-label="Description paragraph 1"
                    className="comic-bubble comic-bubble-tail-left p-3 sm:p-3.5 rounded-2xl cursor-default text-xs sm:text-[13px] lg:text-sm text-neutral-200 font-fredoka font-light leading-snug outline-none focus:scale-105 focus:bg-[#222428] focus:border-white focus:shadow-[4px_4px_0px_#000]"
                  >
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <img
                        src={wordSince}
                        alt="SINCE"
                        className="h-[18px] sm:h-[20px] object-contain inline-block align-baseline -mb-1 shrink-0"
                      />
                      <span>
                        8th grade my knack for{' '}
                        <strong className="font-bold text-white">illustrations</strong> ,{' '}
                        <strong className="font-bold text-white">character design</strong> , and
                        anything related to design has been constantly growing.
                      </span>
                    </div>
                  </div>

                  {/* Paragraph 2 */}
                  <div
                    tabIndex={0}
                    role="article"
                    aria-label="Description paragraph 2"
                    className="comic-bubble comic-bubble-tail-left p-3 sm:p-3.5 rounded-2xl cursor-default text-xs sm:text-[13px] lg:text-sm text-neutral-200 font-fredoka font-light leading-snug outline-none focus:scale-105 focus:bg-[#222428] focus:border-white focus:shadow-[4px_4px_0px_#000]"
                  >
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
              </div>

              {/* Bottom Section: Paragraphs 3, 4, 5 (Each with Comic Text Bubble Zoom) */}
              <div className="flex flex-col gap-2.5 sm:gap-3 mt-1">
                {/* Paragraph 3 */}
                <div
                  tabIndex={0}
                  role="article"
                  aria-label="Description paragraph 3"
                  className="comic-bubble comic-bubble-tail-left p-3 sm:p-3.5 rounded-2xl cursor-default text-xs sm:text-[13px] lg:text-sm text-neutral-200 font-fredoka font-light leading-snug outline-none focus:scale-105 focus:bg-[#222428] focus:border-white focus:shadow-[4px_4px_0px_#000]"
                >
                  <div className="flex items-baseline gap-2">
                    <img
                      src={wordAs}
                      alt="as"
                      className="h-[16px] sm:h-[18px] object-contain inline-block align-baseline -mb-0.5 shrink-0"
                    />
                    <span>
                      a new and curious artist, I'm always exploring different styles and mediums , it's
                      how I learn and evolve.
                    </span>
                  </div>
                </div>

                {/* Paragraph 4 */}
                <div
                  tabIndex={0}
                  role="article"
                  aria-label="Description paragraph 4"
                  className="comic-bubble comic-bubble-tail-left p-3 sm:p-3.5 rounded-2xl cursor-default text-xs sm:text-[13px] lg:text-sm text-neutral-200 font-fredoka font-light leading-snug outline-none focus:scale-105 focus:bg-[#222428] focus:border-white focus:shadow-[4px_4px_0px_#000]"
                >
                  <span>
                    I love experimenting, taking inspiration from everywhere, and turning simple
                    ideas into something visual and expressive.
                  </span>
                </div>

                {/* Paragraph 5 */}
                <div
                  tabIndex={0}
                  role="article"
                  aria-label="Description paragraph 5"
                  className="comic-bubble comic-bubble-tail-left p-3 sm:p-3.5 rounded-2xl cursor-default text-xs sm:text-[13px] lg:text-sm text-neutral-200 font-fredoka font-light leading-snug outline-none focus:scale-105 focus:bg-[#222428] focus:border-white focus:shadow-[4px_4px_0px_#000]"
                >
                  <span>
                    I'm also really into sports and staying active. It helps me keep my energy up
                    and my creativity flowing. I like to think the discipline from sports shows up
                    in my art too.
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLLAGE (Figma Frame Right Side) */}
          <div className="lg:col-span-6 xl:col-span-6 w-full flex justify-center lg:justify-start lg:-ml-6 xl:-ml-10 z-0">
            <div className="relative w-full max-w-[500px] lg:max-w-[540px] drop-shadow-[0_24px_60px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={aboutRightCollage}
                alt="About Me - Om, 21 years old Graphics Designer collage with Polaroid photo, sunburst rays, stickers and anime doodles"
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
            </div>
          </div>

        </div>

        {/* Screen Reader & SEO Metadata */}
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
