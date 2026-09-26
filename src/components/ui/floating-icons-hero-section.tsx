"use client"

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface IconProps {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string;
}

export interface FloatingIconsHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  icons: IconProps[];
}

const DraggableIcon = ({
  iconData,
  index,
  containerRef,
}: {
  iconData: IconProps;
  index: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) => {
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <motion.div
      key={iconData.id}
      drag
      dragMomentum={false}
      dragElastic={0.08}
      dragConstraints={containerRef}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.15, zIndex: 70 }}
      whileDrag={{
        scale: 1.28,
        zIndex: 100,
        cursor: 'grabbing',
      }}
      className={cn(
        'absolute cursor-grab active:cursor-grabbing pointer-events-auto select-none touch-none transition-shadow',
        isDragging && 'z-[100] drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]',
        iconData.className
      )}
      title="Drag and place me anywhere!"
    >
      <motion.div
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-card/85 backdrop-blur-md border border-border/15 hover:border-black/20 dark:hover:border-white/30"
        animate={{
          y: [0, -7, 0, 7, 0],
          x: [0, 5, 0, -5, 0],
          rotate: [0, 4, 0, -4, 0],
        }}
        transition={{
          duration: 5.5 + (index % 4) * 1.2,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <iconData.icon className="w-8 h-8 md:w-10 md:h-10 text-foreground transition-transform duration-200" />
      </motion.div>
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps
>(({ className, title, subtitle, ctaText, ctaHref, icons, ...props }, ref) => {
  const innerContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-background pointer-events-none',
        className
      )}
      {...props}
    >
      <div ref={innerContainerRef} className="absolute inset-0 w-full h-full pointer-events-none">
        {icons.map((iconData, index) => (
          <DraggableIcon
            key={iconData.id}
            iconData={iconData}
            index={index}
            containerRef={innerContainerRef}
          />
        ))}
      </div>

      {(title || subtitle || ctaText) && (
        <div className="relative z-10 text-center px-4 pointer-events-auto">
          {title && (
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">{subtitle}</p>
          )}
          {ctaText && (
            <div className="mt-10">
              <Button asChild size="lg" className="px-8 py-6 text-base font-semibold">
                <a href={ctaHref}>{ctaText}</a>
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
});

FloatingIconsHero.displayName = 'FloatingIconsHero';
export { FloatingIconsHero };
export default FloatingIconsHero;
