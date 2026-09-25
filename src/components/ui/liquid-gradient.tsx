"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { RED_LIQUID_COLORS } from "./liquid-colors"

export { RED_LIQUID_COLORS, BLUE_LIQUID_COLORS } from "./liquid-colors"

const svgOrder = ["svg1", "svg2", "svg3", "svg4", "svg3", "svg2", "svg1"]

interface StopDef {
  offset: number
  stopColor: string
}

interface SvgDefinition {
  gradientTransform: string
  stops: StopDef[]
}

const createStopsArray = (
  svgDefs: Record<string, SvgDefinition>,
  order: string[],
  maxStops: number
): StopDef[][] => {
  const stops: StopDef[][] = []
  for (let i = 0; i < maxStops; i++) {
    const stopRow = order.map((key) => {
      const def = svgDefs[key]
      return def.stops[i] || def.stops[def.stops.length - 1]
    })
    stops.push(stopRow)
  }
  return stops
}

interface GradientSvgProps {
  className?: string
  isHovered?: boolean
  colors: Record<string, string>
  gradientId?: string
}

export const GradientSvg: React.FC<GradientSvgProps> = ({
  className,
  isHovered = false,
  colors,
  gradientId = "liquid-radial",
}) => {
  const svgDefs: Record<string, SvgDefinition> = React.useMemo(() => ({
    svg1: {
      gradientTransform:
        "translate(287.5 280) rotate(-29.0546) scale(689.807 1000)",
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.188423, stopColor: colors.color2 },
        { offset: 0.260417, stopColor: colors.color3 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.328992, stopColor: colors.color1 },
        { offset: 0.442708, stopColor: colors.color6 },
        { offset: 0.537556, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.725645, stopColor: colors.color8 },
        { offset: 0.817779, stopColor: colors.color9 },
        { offset: 0.84375, stopColor: colors.color10 },
        { offset: 0.90569, stopColor: colors.color1 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
    svg2: {
      gradientTransform:
        "translate(126.5 418.5) rotate(-64.756) scale(533.444 773.324)",
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.104167, stopColor: colors.color12 },
        { offset: 0.182292, stopColor: colors.color13 },
        { offset: 0.28125, stopColor: colors.color1 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.453125, stopColor: colors.color6 },
        { offset: 0.515625, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.692708, stopColor: colors.color8 },
        { offset: 0.75, stopColor: colors.color14 },
        { offset: 0.817708, stopColor: colors.color9 },
        { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1, stopColor: colors.color1 },
      ],
    },
    svg3: {
      gradientTransform:
        "translate(264.5 339.5) rotate(-42.3022) scale(946.451 1372.05)",
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.188423, stopColor: colors.color2 },
        { offset: 0.307292, stopColor: colors.color1 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.442708, stopColor: colors.color15 },
        { offset: 0.537556, stopColor: colors.color16 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.725645, stopColor: colors.color17 },
        { offset: 0.817779, stopColor: colors.color9 },
        { offset: 0.84375, stopColor: colors.color10 },
        { offset: 0.90569, stopColor: colors.color1 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
    svg4: {
      gradientTransform:
        "translate(860.5 420) rotate(-153.984) scale(957.528 1388.11)",
      stops: [
        { offset: 0.109375, stopColor: colors.color11 },
        { offset: 0.171875, stopColor: colors.color2 },
        { offset: 0.260417, stopColor: colors.color13 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.328992, stopColor: colors.color1 },
        { offset: 0.442708, stopColor: colors.color6 },
        { offset: 0.515625, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.692708, stopColor: colors.color8 },
        { offset: 0.817708, stopColor: colors.color9 },
        { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
  }), [colors])

  const maxStops = React.useMemo(
    () => Math.max(...Object.values(svgDefs).map((o) => o.stops.length)),
    [svgDefs]
  )
  const stopsArray = React.useMemo(
    () => createStopsArray(svgDefs, svgOrder, maxStops),
    [svgDefs, maxStops]
  )
  const transforms = React.useMemo(
    () => svgOrder.map((key) => svgDefs[key].gradientTransform),
    [svgDefs]
  )

  const variants = React.useMemo(
    () => ({
      hovered: {
        gradientTransform: transforms,
        transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
      },
      notHovered: {
        gradientTransform: transforms,
        transition: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
      },
    }),
    [transforms]
  )

  return (
    <svg
      className={className}
      width="1030"
      height="280"
      viewBox="0 0 1030 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1030" height="280" rx="140" fill={`url(#${gradientId})`} />
      <defs>
        <motion.radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          animate={isHovered ? variants.hovered : variants.notHovered}
        >
          {stopsArray.map((stopList, index) => (
            <motion.stop
              key={index}
              initial={{
                offset: stopList[0].offset,
                stopColor: stopList[0].stopColor,
              }}
              animate={{
                offset: stopList.map((s) => s.offset),
                stopColor: stopList.map((s) => s.stopColor),
              }}
              transition={{
                duration: isHovered ? 10 : 30,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}
        </motion.radialGradient>
      </defs>
    </svg>
  )
}

export interface LiquidProps {
  isHovered?: boolean
  colors?: Record<string, string>
  idPrefix?: string
}

export const Liquid: React.FC<LiquidProps> = ({
  isHovered = false,
  colors = RED_LIQUID_COLORS,
  idPrefix = "liquid",
}) => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, idx) => (
        <div
          key={idx}
          className={`absolute pointer-events-none ${
            idx < 3 ? "w-[443px] h-[121px]" : "w-[756px] h-[207px]"
          } ${
            idx === 0
              ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
              : idx === 1
              ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[164.971deg] mix-blend-difference"
              : idx === 2
              ? "top-1/2 left-1/2 -translate-x-[53%] -translate-y-[53%] rotate-[-11.61deg] mix-blend-difference"
              : idx === 3
              ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-[57%] rotate-[-179.012deg] mix-blend-difference"
              : idx === 4
              ? "top-1/2 left-1/2 -translate-x-[57%] -translate-y-1/2 rotate-[-29.722deg] mix-blend-difference"
              : idx === 5
              ? "top-1/2 left-1/2 -translate-x-[62%] -translate-y-[24%] rotate-[160.227deg] mix-blend-difference"
              : "top-1/2 left-1/2 -translate-x-[67%] -translate-y-[29%] rotate-180 mix-blend-hard-light"
          }`}
        >
          <GradientSvg
            className="w-full h-full"
            isHovered={isHovered}
            colors={colors}
            gradientId={`${idPrefix}-radial-${idx}`}
          />
        </div>
      ))}
    </>
  )
}

export default Liquid
