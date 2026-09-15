import React, { useState } from 'react'

const screens = [
  { id: 'hero', number: '01', title: 'HERO', label: 'Cover Canvas' },
  { id: 'about', number: '02', title: 'ABOUT', label: 'Who Am I' },
  { id: 'skills', number: '03', title: 'SKILLS', label: 'Digital Tools' },
  { id: 'cv', number: '04', title: 'CV', label: 'Curriculum Vitae' },
]

/**
 * ScreenHud
 * A minimalist Cyberpunk / Editorial vertical mini-map and presentation controller
 * floating along the right edge of the viewport.
 */
export default function ScreenHud({
  currentScreen = 0,
  onSelectScreen = () => {},
  scrollMode = 'deck', // 'deck' | 'free'
  onToggleMode = () => {},
  totalScreens = 4,
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      {/* ================= DESKTOP VERTICAL HUD RAIL (Left Edge) ================= */}
      <aside
        aria-label="Screen presentation navigation"
        className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start gap-3 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Mode Switcher Pill */}
        <button
          type="button"
          onClick={onToggleMode}
          title={`Switch scroll mode (Current: ${scrollMode === 'deck' ? 'Deck Snap' : 'Free Scroll'})`}
          className="hud-glass group flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-neutral-300 hover:text-white hover:border-[#BA1F1F]/60 transition-all duration-300 active:scale-95 mb-2 shadow-lg cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#BA1F1F] animate-pulse" />
          <span className="text-neutral-400 group-hover:text-neutral-200">
            {scrollMode === 'deck' ? 'Deck View' : 'Free Scroll'}
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 group-hover:bg-[#BA1F1F]/20 group-hover:text-red-300 transition-colors">
            {scrollMode === 'deck' ? 'SNAP' : 'FLOW'}
          </span>
        </button>

        {/* Screen Dots & Labels Container */}
        <div className="hud-glass relative flex flex-col items-start gap-5 p-3 sm:p-3.5 rounded-2xl">
          {/* Vertical Connecting Track Line (Aligned with dots center) */}
          <div
            className="absolute left-[22px] top-6 bottom-6 w-[1.5px] bg-white/10 pointer-events-none"
            aria-hidden="true"
          >
            {/* Dynamic Active Progress Track */}
            <div
              className="w-full bg-[#BA1F1F] shadow-[0_0_8px_#ba1f1f] transition-all duration-500 ease-out"
              style={{
                height: `${(currentScreen / (totalScreens - 1)) * 100}%`,
              }}
            />
          </div>

          {screens.map((screen, idx) => {
            const isActive = currentScreen === idx
            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => onSelectScreen(idx)}
                className={`group flex items-center gap-3 transition-all duration-300 cursor-pointer ${
                  isActive ? 'opacity-100' : 'opacity-50 hover:opacity-90'
                }`}
                aria-label={`Go to screen ${screen.number}: ${screen.title}`}
                aria-current={isActive ? 'step' : undefined}
              >
                {/* Indicator Dot */}
                <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-3.5 h-3.5 bg-[#BA1F1F] shadow-[0_0_12px_#ba1f1f,0_0_20px_rgba(186,31,31,0.6)] scale-110'
                        : 'w-2 h-2 bg-neutral-600 group-hover:bg-neutral-300 group-hover:scale-125'
                    }`}
                  />
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border border-red-500/60 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Number Badge */}
                <span
                  className={`text-[10px] font-mono transition-colors duration-200 ${
                    isActive ? 'text-[#BA1F1F] font-bold' : 'text-neutral-400'
                  }`}
                >
                  {screen.number}
                </span>

                {/* Expanded Title / Tooltip on Hover or Active */}
                <div
                  className={`flex flex-col items-start text-left transition-all duration-300 pointer-events-none ${
                    isActive || isHovered
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2'
                  }`}
                >
                  <span
                    className={`text-[11px] font-bold font-display tracking-widest ${
                      isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                    }`}
                  >
                    {screen.title}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 leading-tight whitespace-nowrap">
                    {screen.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Keyboard Quick Navigation Hint (Visible in Deck Mode) */}
        {scrollMode === 'deck' && (
          <div className="text-[9px] font-mono text-neutral-500 tracking-wider flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 text-[8px]">
              ↑
            </kbd>
            <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 text-[8px]">
              ↓
            </kbd>
            <span>keys</span>
          </div>
        )}
      </aside>

      {/* ================= MOBILE BOTTOM-RIGHT HUD TOGGLE BADGE ================= */}
      <div className="md:hidden fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleMode}
          className="hud-glass flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-neutral-300 active:scale-95 shadow-lg cursor-pointer"
          title="Toggle view mode"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#BA1F1F]" />
          <span>{scrollMode === 'deck' ? 'Deck' : 'Scroll'}</span>
        </button>
        <div className="hud-glass px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-neutral-300">
          0{currentScreen + 1} / 0{totalScreens}
        </div>
      </div>
    </>
  )
}
