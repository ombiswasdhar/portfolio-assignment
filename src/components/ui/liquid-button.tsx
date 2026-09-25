"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { Liquid, RED_LIQUID_COLORS } from "./liquid-gradient"

export interface LiquidButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode
  colors?: Record<string, string>
  isActive?: boolean
  isLightBg?: boolean
  hoverScale?: number
  tapScale?: number
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      children,
      className,
      colors = RED_LIQUID_COLORS,
      isActive = false,
      isLightBg = false,
      hoverScale = 1,
      tapScale = 0.98,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true)
      onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false)
      onMouseLeave?.(e)
    }

    const isEngaged = isHovered || isActive

    return (
      <motion.button
        ref={ref}
        type="button"
        whileTap={{ scale: tapScale }}
        whileHover={{ scale: hoverScale }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden inline-flex items-center justify-center cursor-pointer select-none transition-colors duration-300 group",
          className
        )}
        {...props}
      >
        {/* Glow blur layer behind button */}
        <motion.div
          className="absolute inset-0 pointer-events-none filter blur-[12px] opacity-70"
          initial={false}
          animate={{ opacity: isEngaged ? 0.75 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          <Liquid isHovered={isEngaged} colors={colors} idPrefix="btn-glow" />
        </motion.div>

        {/* Dynamic Liquid Gradient Surface */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden select-none"
          initial={false}
          animate={{
            opacity: isEngaged ? 1 : 0,
          }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          {/* Base contrast backing */}
          <span className="absolute inset-0 bg-[#0A0A0E]" />

          {/* 7-Layered Swirling SVG Liquid Radial Gradient */}
          <Liquid isHovered={isEngaged} colors={colors} idPrefix="btn-surface" />

          {/* Liquid surface glass shimmers */}
          {[1, 2, 3].map((num) => (
            <span
              key={`liquid-spark-${num}`}
              className={cn(
                "absolute inset-0 border-solid border-[2px] border-white/20 mix-blend-overlay filter pointer-events-none",
                num <= 2 ? "blur-[2px]" : "blur-[4px]"
              )}
            />
          ))}

          {/* Warm ambient depth spotlight */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[85%] h-[55%] filter blur-[14px] bg-[#660000]/60 pointer-events-none" />
        </motion.div>

        {/* Foreground Content (always on top, ensures text is never obscured) */}
        <span
          className={cn(
            "relative z-20 flex items-center justify-center w-full h-full pointer-events-none transition-colors duration-200",
            isEngaged
              ? "text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
              : isLightBg
              ? "text-black group-hover:text-white"
              : "text-neutral-200 group-hover:text-white"
          )}
        >
          {children}
        </span>
      </motion.button>
    )
  }
)

LiquidButton.displayName = "LiquidButton"
export default LiquidButton
