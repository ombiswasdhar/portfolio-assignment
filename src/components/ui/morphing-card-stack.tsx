"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { cn } from "@/lib/utils"
import { Grid3X3, Layers, LayoutList } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
  color?: string
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

const SWIPE_THRESHOLD = 50

export function MorphingCardStack({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  if (!cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (_e: any, info: any) => {
    const { offset, velocity } = info
    const swipePower = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipePower < -1000) {
      setCurrentIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipePower > 1000) {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackedCards = () => {
    const stacked = []
    for (let i = 0; i < cards.length; i++) {
      const idx = (currentIndex + i) % cards.length
      stacked.push({ ...cards[idx], stackPosition: i })
    }
    return stacked.reverse()
  }

  const getPositionStyle = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        }
      case "grid":
      case "list":
        return { top: 0, left: 0, zIndex: 1, rotate: 0 }
    }
  }

  const layoutContainerClasses: Record<LayoutMode, string> = {
    stack: "relative h-64 w-64",
    grid: "grid grid-cols-2 gap-3",
    list: "flex flex-col gap-3",
  }

  const displayCards =
    layout === "stack"
      ? getStackedCards()
      : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-center gap-1 rounded-lg bg-secondary/50 p-1 w-fit mx-auto">
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const IconComponent = layoutIcons[mode]
          return (
            <button
              key={mode}
              type="button"
              onClick={() => setLayout(mode)}
              className={cn(
                "rounded-md p-2 transition-all cursor-pointer",
                layout === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
              aria-label={`Switch to ${mode} layout`}
            >
              <IconComponent className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      <LayoutGroup>
        <motion.div layout className={cn(layoutContainerClasses[layout], "mx-auto")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const posStyle = getPositionStyle(card.stackPosition)
              const isSelected = activeCardId === card.id
              const isTop = layout === "stack" && card.stackPosition === 0

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isSelected ? 1.05 : 1,
                    x: 0,
                    ...posStyle,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging) return
                    setActiveCardId(isSelected ? null : card.id)
                    onCardClick?.(card)
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl border border-border bg-card p-4 transition-colors",
                    "hover:border-primary/50",
                    layout === "stack" && "absolute w-56 h-48",
                    layout === "stack" && isTop && "cursor-grab active:cursor-grabbing",
                    layout === "grid" && "w-full aspect-square",
                    layout === "list" && "w-full",
                    isSelected && "ring-2 ring-primary"
                  )}
                  style={{ backgroundColor: card.color || undefined }}
                >
                  <div className="flex items-start gap-3">
                    {card.icon && (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                        {card.icon}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-card-foreground truncate">
                        {card.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground mt-1",
                          layout === "stack" && "line-clamp-3",
                          layout === "grid" && "line-clamp-2",
                          layout === "list" && "line-clamp-1"
                        )}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {isTop && (
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-xs text-muted-foreground/50">
                        Swipe to navigate
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all cursor-pointer",
                i === currentIndex
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { MorphingCardStack as Component }
export default MorphingCardStack
