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
        "group relative h-[300px] w-[400px] shrink-0 cursor-pointer overflow-hidden rounded-xl shadow-md bg-neutral-900 border border-white/10 will-change-transform",
        className,
      )}
    >
      <img
        src={card.url}
        alt={card.title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-transparent" />
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
        <div className="flex shrink-0" aria-hidden="true">
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
  angle = -22,
  baseSpeed = 60,
  alternateDirections = true,
  className = "",
  cardClassName = "",
  fadeClassName = "",
}: DiagonalMarqueeCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = React.useState(true);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "150px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rotationStyle = {
    transform: `rotate(${angle}deg)`,
  };

  const sourceCards = cards.length > 0 ? cards : DEFAULT_CARDS;
  // Repeat enough to ensure seamless track wrap without overwhelming the GPU
  const rowCards = sourceCards.length >= 6 ? sourceCards : [...sourceCards, ...sourceCards];
  const rowCardsReverse = [...rowCards].reverse();

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-neutral-950 select-none",
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
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .animate-marquee-right {
          animation: marquee-right var(--speed) linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `,
        }}
      />
      <div
        className="absolute z-0 flex w-[220vw] flex-col gap-4 sm:gap-6 will-change-transform"
        style={rotationStyle}
      >
        <MarqueeRow
          cards={rowCards}
          speed={baseSpeed}
          direction={-1}
          cardClassName={cardClassName}
          isPaused={!isInView}
        />
        <MarqueeRow
          cards={rowCardsReverse}
          speed={Math.max(25, baseSpeed - 8)}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
          isPaused={!isInView}
        />
        <MarqueeRow
          cards={rowCards}
          speed={baseSpeed + 6}
          direction={-1}
          cardClassName={cardClassName}
          isPaused={!isInView}
        />
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
