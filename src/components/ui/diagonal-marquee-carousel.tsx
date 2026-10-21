"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  url: string;
  title: string;
}

export interface DiagonalMarqueeCarouselProps {
  cards?: CardItem[];
  angle?: number;
  baseSpeed?: number;
  alternateDirections?: boolean;
  className?: string;
  cardClassName?: string;
  fadeClassName?: string;
}

const u = (id: string) => `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

const DEFAULT_CARDS: CardItem[] = [
  { id: 2, url: u("photo-1506905925346-21bda4d32df4"), title: "Landscape" },
  { id: 3, url: u("photo-1441974231531-c6227db76b6e"), title: "Nature" },
  { id: 4, url: u("photo-1470071459604-3b5ec3a7fe05"), title: "Forest" },
  { id: 5, url: u("photo-1501594907352-04cda38ebc29"), title: "Bridge" },
  { id: 6, url: u("photo-1505142468610-359e7d316be0"), title: "Ocean" },
  { id: 7, url: u("photo-1469474968028-56623f02e42e"), title: "Valley" },
];

const Card = ({ card, className }: { card: CardItem; className?: string }) => {
  return (
    <div
      className={cn(
        "group relative h-[300px] w-[400px] shrink-0 cursor-pointer overflow-hidden rounded-xl shadow-2xl",
        className,
      )}
    >
      <img
        src={card.url}
        alt={card.title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

const MarqueeRow = ({
  cards,
  speed,
  direction,
  cardClassName,
  isPaused,
}: {
  cards: CardItem[];
  speed: number;
  direction: 1 | -1;
  cardClassName?: string;
  isPaused?: boolean;
}) => {
  const animationClass =
    direction === -1 ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 cursor-pointer hover:[animation-play-state:paused]",
          animationClass,
        )}
        style={{
          "--speed": `${speed}s`,
          animationPlayState: isPaused ? "paused" : "running",
        } as React.CSSProperties}
      >
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}`} className="shrink-0 pr-6">
              <Card card={card} className={cardClassName} />
            </div>
          ))}
        </div>
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}-copy`} className="shrink-0 pr-6">
              <Card card={card} className={cardClassName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function DiagonalMarqueeCarousel({
  cards = DEFAULT_CARDS,
  angle = -25,
  baseSpeed = 120,
  alternateDirections = true,
  className = "",
  cardClassName = "",
  fadeClassName = "",
}: DiagonalMarqueeCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "80px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rotationStyle = {
    transform: `rotate(${angle}deg)`,
  };

  // Keep a concise loop of 4 cards per row (8 cards per row with duplicate) for silky 60fps performance
  const displayCards = cards.length > 0 ? cards.slice(0, 4) : DEFAULT_CARDS.slice(0, 4);
  const rowCardsReverse = [...displayCards].reverse();

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden bg-neutral-950",
        className,
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left var(--speed) linear infinite;
          will-change: transform;
        }
        .animate-marquee-right {
          animation: marquee-right var(--speed) linear infinite;
          will-change: transform;
        }
      `,
        }}
      />
      <div
        className="absolute z-0 flex w-[140vw] flex-col gap-6"
        style={rotationStyle}
      >
        <MarqueeRow cards={displayCards} speed={baseSpeed} direction={-1} cardClassName={cardClassName} isPaused={!isInView} />
        <MarqueeRow
          cards={rowCardsReverse}
          speed={baseSpeed - 12 > 20 ? baseSpeed - 12 : 30}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
          isPaused={!isInView}
        />
        <MarqueeRow cards={displayCards} speed={baseSpeed + 12} direction={-1} cardClassName={cardClassName} isPaused={!isInView} />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-neutral-950 to-transparent",
          fadeClassName,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-neutral-950 to-transparent",
          fadeClassName,
        )}
      />
    </div>
  );
}

/**
 * Great UI Component
 *
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 * Designed to be accessible, customizable, and production-ready.
 *
 * Website: https://great-ui.com
 * GitHub: https://github.com/Saurabh-2607/GreatUI
 * X (Great UI): https://x.com/GreatUIHQ
 *
 * Released under the MIT License.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_s
 */
