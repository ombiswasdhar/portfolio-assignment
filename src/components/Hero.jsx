import frame41 from '../assets/hero/frame41.png'
import halftone from '../assets/hero/halftone.png'
import portfolioText from '../assets/hero/portfolio_text.svg'
import centerLogo from '../assets/hero/center_logo.svg'
import topLogo from '../assets/hero/top_logo.svg'
import smiley from '../assets/hero/smiley_rendered.png'
import crown from '../assets/hero/crown_rendered.png'
import doodle from '../assets/hero/doodle_rendered.png'
import barcode from '../assets/hero/barcode.png'
import arrowLogo from '../assets/hero/arrowLogo_rendered.png'

export default function Hero() {
  return (
    <section
      aria-label="Hero section"
      className="relative w-full bg-black text-white select-none overflow-hidden"
    >
      {/* 1440x1024 Canvas Container */}
      <div className="relative w-full max-w-[1440px] mx-auto aspect-[1440/1024] min-h-[580px] sm:min-h-[720px] md:min-h-[850px] lg:min-h-[1024px]">
        
        {/* ================= TOP ROW ================= */}
        {/* 2025 - Akira / Unbounded font */}
        <div
          className="absolute left-[2.29%] top-[3.81%] z-20 flex items-center"
          title="Year 2025"
        >
          <span className="font-display font-black text-xl sm:text-2xl md:text-[28px] leading-none tracking-[0.08em] text-white">
            2025
          </span>
        </div>

        {/* portfolio - Handwritten cursive script */}
        <div
          className="absolute left-[45.49%] top-[4.00%] -translate-x-1/2 z-20 flex items-center pointer-events-none"
        >
          <span className="font-script text-2xl sm:text-3xl md:text-[34px] font-normal leading-none tracking-wide text-white lowercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            portfolio
          </span>
        </div>

        {/* Top-Right OM Badge */}
        <div
          className="absolute left-[92.29%] top-[4.00%] -translate-x-1/2 z-20 flex items-center"
        >
          <img
            src={topLogo}
            alt="Om Biswas Monogram"
            className="w-10 sm:w-14 md:w-[76px] h-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-md"
          />
        </div>

        {/* ================= VERTICAL ACCENT LINES ================= */}
        {/* Line 6 (Left) */}
        <div
          className="absolute left-[2.50%] top-[38.28%] h-[23.14%] w-[1px] bg-white/40 hidden md:block pointer-events-none"
          aria-hidden="true"
        />

        {/* Line 7 (Right) */}
        <div
          className="absolute left-[97.71%] top-[38.28%] h-[23.14%] w-[1px] bg-white/40 hidden md:block pointer-events-none"
          aria-hidden="true"
        />

        {/* ================= CENTERPIECE BANNER ================= */}
        {/* Banner Area: left: 9.17%, top: 25.88%, width: 81.67%, height: 47.75% */}
        <div
          className="absolute left-[9.17%] top-[25.88%] w-[81.67%] h-[47.75%] z-10"
        >
          {/* Base Rounded Banner (Red background + Lucy anime + Halftone) */}
          <div className="relative w-full h-full rounded-[24px] sm:rounded-[36px] md:rounded-[50px] overflow-hidden bg-[#BA1F1F] shadow-[0_20px_60px_rgba(186,31,31,0.25)]">
            {/* Cyberpunk Lucy Anime Illustration (Left portion) */}
            <img
              src={frame41}
              alt=""
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-auto object-cover object-left pointer-events-none select-none"
            />

            {/* Halftone Dot Overlay */}
            <img
              src={halftone}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-55 pointer-events-none select-none"
            />
          </div>

          {/* ================= BANNER OVERLAYS & STICKERS ================= */}

          {/* 1. Metallic Smiley Sticker (top-left, breaking out of banner) */}
          {/* In Figma: left -5.87%, top -16.36%, w: 14.65%, h: 34.65% relative to banner */}
          <div
            className="absolute -left-[5.87%] -top-[16.36%] w-[14.65%] z-30 group cursor-pointer"
            title="Smiley sticker"
          >
            <img
              src={smiley}
              alt="Smiley sticker"
              className="w-full h-auto object-contain transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* 2. Custom Typography: "PORTFOLIO" Vector Art */}
          {/* In Figma: left -3.23%, top 23.72%, w: 106.41%, h: 52.15% relative to banner */}
          <div
            className="absolute -left-[3.23%] top-[23.72%] w-[106.41%] h-[52.15%] z-20 pointer-events-none flex items-center justify-center"
          >
            <img
              src={portfolioText}
              alt="PORTFOLIO"
              className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* 3. Center OM Badge (replacing the 'O' in PORTFOLiO) */}
          {/* In Figma: left 53.49%, top 32.11%, w: 10.54%, h: 36.03% relative to banner */}
          <div
            className="absolute left-[53.49%] top-[32.11%] w-[10.54%] z-25 group cursor-pointer"
            title="OM Logo"
          >
            <img
              src={centerLogo}
              alt="OM Center Badge"
              className="w-full h-auto object-contain transition-transform duration-300 ease-out group-hover:scale-105 drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* 4. Crown Doodle (perched on top of the center OM badge) */}
          {/* In Figma: left 59.95%, top 14.93%, w: 9.11%, h: 22.22% relative to banner */}
          <div
            className="absolute left-[59.95%] top-[14.93%] w-[9.11%] z-30 group cursor-pointer pointer-events-auto"
            title="Crown doodle"
          >
            <img
              src={crown}
              alt="Crown sticker"
              className="w-full h-auto object-contain transition-transform duration-300 ease-out group-hover:scale-115 group-hover:rotate-6 drop-shadow-md"
            />
          </div>

          {/* 5. Double Exclamation Action Doodle (above the letter 'L' / 'i') */}
          {/* In Figma: left 81.12%, top 11.66%, w: 7.24%, h: 18.96% relative to banner */}
          <div
            className="absolute left-[81.12%] top-[11.66%] w-[7.24%] z-30 group cursor-pointer pointer-events-auto"
            title="Action marks doodle"
          >
            <img
              src={doodle}
              alt="Action marks doodle"
              className="w-full h-auto object-contain transition-transform duration-300 ease-out group-hover:scale-115 group-hover:-rotate-6 drop-shadow-md"
            />
          </div>

          {/* 6. OM BISWAS Text (bottom-right under banner) */}
          {/* In Figma: left 81.38%, top 101.64%, w: 22.45% relative to banner */}
          <div
            className="absolute right-0 top-[101.64%] z-20 pt-2 sm:pt-3 text-right"
          >
            <span className="font-fredoka font-bold text-lg sm:text-2xl md:text-[32px] leading-none tracking-normal text-white uppercase whitespace-nowrap">
              OM BISWAS
            </span>
          </div>

        </div>

        {/* ================= BOTTOM ROW ================= */}
        {/* Left: Symbiosis School of Planning, Architecture and Design */}
        {/* In Figma: left 2.50%, top 90.92%, w: 18.68% */}
        <div
          className="absolute left-[2.50%] top-[90.92%] max-w-[280px] z-20"
        >
          <p className="font-fredoka font-normal text-xs sm:text-sm md:text-base lg:text-[20px] leading-snug text-white">
            Symbiosis School of Planning,
            <br />
            Architecture and Design
          </p>
        </div>

        {/* Center: Barcode */}
        {/* In Figma: left 41.81%, top 90.43%, w: 16.32% */}
        <div
          className="absolute left-[41.81%] top-[90.43%] w-[16.32%] z-20 flex justify-center items-center"
        >
          <img
            src={barcode}
            alt="Barcode"
            className="w-full max-w-[235px] h-auto object-contain filter invert brightness-200 pointer-events-none"
          />
        </div>

        {/* Right: Arrow Monogram Logo */}
        {/* In Figma: left 92.22%, top 88.09%, w: 5.49% */}
        <div
          className="absolute left-[92.22%] top-[88.09%] w-[5.49%] z-20 flex items-center justify-end"
        >
          <img
            src={arrowLogo}
            alt="Arrow monogram"
            className="w-full max-w-[79px] h-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </div>

        {/* Bottom Line (Line 4 in Figma) */}
        <div
          className="absolute left-[19.86%] bottom-0 w-[60.28%] h-[1px] bg-white/20 pointer-events-none"
          aria-hidden="true"
        />

      </div>
    </section>
  )
}
