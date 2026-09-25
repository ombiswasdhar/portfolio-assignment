"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface LiquidButtonProps extends HTMLMotionProps<"button"> {
  delay?: string
  fillHeight?: string
  hoverScale?: number
  tapScale?: number
  liquidColor?: string
  liquidBackgroundColor?: string
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      delay = "0.3s",
      fillHeight = "3.5px",
      hoverScale = 1.04,
      tapScale = 0.96,
      liquidColor = "#BA1F1F",
      liquidBackgroundColor = "transparent",
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: tapScale }}
        whileHover={{
          scale: hoverScale,
          "--liquid-button-fill-width": "100%",
          "--liquid-button-fill-height": "100%",
          "--liquid-button-delay": delay,
          transition: {
            "--liquid-button-fill-width": { duration: 0 },
            "--liquid-button-fill-height": { duration: 0 },
            "--liquid-button-delay": { duration: 0 },
          },
        }}
        style={
          {
            "--liquid-button-color": liquidColor,
            "--liquid-button-background-color": liquidBackgroundColor,
            "--liquid-button-fill-width": "-1%",
            "--liquid-button-fill-height": fillHeight,
            "--liquid-button-delay": "0s",
            background:
              "linear-gradient(var(--liquid-button-color) 0 0) no-repeat calc(200% - var(--liquid-button-fill-width, -1%)) 100% / 200% var(--liquid-button-fill-height, 3.5px)",
            backgroundColor: "var(--liquid-button-background-color)",
            transition: `background ${delay} var(--liquid-button-delay, 0s), color ${delay} ${delay}, background-position ${delay} calc(${delay} - var(--liquid-button-delay, 0s))`,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "relative overflow-hidden inline-flex items-center justify-center cursor-pointer select-none transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

LiquidButton.displayName = "LiquidButton"
export default LiquidButton
