import React from 'react'
import { motion } from 'framer-motion'
import burstStar from '../assets/work/floating/burst_star.png'
import blueStar from '../assets/work/floating/blue_star.png'
import headphonesSticker from '../assets/work/floating/headphones_sticker.png'
import catPointing from '../assets/work/floating/cat_pointing.png'
import lightningBolt1 from '../assets/work/floating/lightning_bolt_1.png'
import lightningBolt2 from '../assets/work/floating/lightning_bolt_2.png'

export default function FeaturedWorksFloatingElements() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. TOP-LEFT: Cat with Cap & Glasses pointing */}
      <motion.div
        className="absolute top-[4%] sm:top-[6%] left-[2%] sm:left-[5%] md:left-[8%] pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: -6 }}
        animate={{
          x: [0, 28, -22, 35, -16, 0],
          y: [0, -24, 20, -18, 26, 0],
          rotate: [-6, 8, -12, 6, -10, -6],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.12,
          rotate: 0,
          filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.25))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={catPointing}
          alt="Floating cat with cap"
          className="w-18 xs:w-22 sm:w-28 md:w-36 lg:w-42 h-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.16)] will-change-transform"
          draggable={false}
        />
      </motion.div>

      {/* 2. TOP-RIGHT: Red Burst Star with Blue Chalk Outline */}
      <motion.div
        className="absolute top-[2%] sm:top-[5%] right-[2%] sm:right-[6%] md:right-[9%] pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: 6 }}
        animate={{
          x: [0, -32, 24, -28, 18, 0],
          y: [0, 26, -22, 28, -20, 0],
          rotate: [6, -10, 14, -8, 12, 6],
          scale: [1, 1.05, 0.97, 1.04, 0.98, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.15,
          rotate: 15,
          filter: 'drop-shadow(0 16px 28px rgba(222,32,32,0.3))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={burstStar}
          alt="Floating burst star"
          className="w-20 xs:w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain drop-shadow-[0_10px_22px_rgba(222,32,32,0.18)] will-change-transform"
          draggable={false}
        />
      </motion.div>

      {/* 3. BOTTOM-LEFT: Halftone Headphones Sticker with Red Stars */}
      <motion.div
        className="absolute bottom-[8%] sm:bottom-[10%] md:bottom-[12%] left-[2%] sm:left-[5%] md:left-[8%] pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: 10 }}
        animate={{
          x: [0, 32, -26, 22, -18, 0],
          y: [0, -30, 18, -26, 24, 0],
          rotate: [10, -6, 14, -4, 8, 10],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.12,
          rotate: 5,
          filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.22))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={headphonesSticker}
          alt="Floating headphones sticker"
          className="w-16 xs:w-20 sm:w-26 md:w-32 lg:w-38 h-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.15)] will-change-transform"
          draggable={false}
        />
      </motion.div>

      {/* 4. MID-RIGHT: Blue Chalk 8-Pointed Star */}
      <motion.div
        className="absolute top-[40%] sm:top-[42%] right-[2%] sm:right-[4%] md:right-[6%] pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: 0 }}
        animate={{
          x: [0, -28, 22, -32, 14, 0],
          y: [0, -22, 28, -18, 20, 0],
          rotate: [0, 72, 144, 216, 288, 360],
        }}
        transition={{
          x: { duration: 17, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 19, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
        }}
        whileHover={{
          scale: 1.25,
          filter: 'drop-shadow(0 12px 22px rgba(30,60,200,0.35))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={blueStar}
          alt="Floating blue chalk star"
          className="w-12 xs:w-14 sm:w-18 md:w-22 lg:w-26 h-auto object-contain drop-shadow-[0_6px_14px_rgba(20,50,180,0.22)] will-change-transform"
          draggable={false}
        />
      </motion.div>

      {/* 5. BOTTOM-RIGHT: Red & Blue Comic Lightning Bolt */}
      <motion.div
        className="absolute bottom-[8%] sm:bottom-[10%] md:bottom-[12%] right-[3%] sm:right-[6%] md:right-[9%] pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: -14 }}
        animate={{
          x: [0, -26, 30, -18, 22, 0],
          y: [0, 24, -28, 22, -18, 0],
          rotate: [-14, 4, -18, 6, -8, -14],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.15,
          rotate: -5,
          filter: 'drop-shadow(0 14px 26px rgba(222,32,32,0.3))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={lightningBolt1}
          alt="Floating lightning bolt"
          className="w-16 xs:w-20 sm:w-26 md:w-32 lg:w-38 h-auto object-contain drop-shadow-[0_8px_18px_rgba(222,32,32,0.2)] will-change-transform"
          draggable={false}
        />
      </motion.div>

      {/* 6. UPPER-MIDDLE-LEFT: Secondary Tiny Blue Star (adds visual depth & float) */}
      <motion.div
        className="hidden md:block absolute top-[18%] left-[28%] pointer-events-auto cursor-grab active:cursor-grabbing opacity-75 hover:opacity-100"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: 15 }}
        animate={{
          x: [0, 22, -18, 25, -12, 0],
          y: [0, -18, 24, -15, 18, 0],
          rotate: [15, 85, 155, 225, 295, 375],
        }}
        transition={{
          x: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 17, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 32, repeat: Infinity, ease: 'linear' },
        }}
        whileHover={{
          scale: 1.3,
          opacity: 1,
          filter: 'drop-shadow(0 10px 20px rgba(30,60,200,0.4))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src={blueStar}
          alt="Mini blue star"
          className="w-8 md:w-10 lg:w-12 h-auto object-contain drop-shadow-[0_4px_10px_rgba(20,50,180,0.2)] will-change-transform"
          draggable={false}
        />
      </motion.div>

      {/* 7. LOWER-MIDDLE-RIGHT: Secondary Mini Zig-Zag Lightning Bolt */}
      <motion.div
        className="hidden sm:block absolute bottom-[22%] right-[28%] pointer-events-auto cursor-grab active:cursor-grabbing opacity-70 hover:opacity-100"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: 8 }}
        animate={{
          x: [0, -18, 20, -14, 16, 0],
          y: [0, 16, -20, 18, -14, 0],
          rotate: [8, -8, 14, -6, 10, 8],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.25,
          opacity: 1,
          rotate: 0,
          filter: 'drop-shadow(0 10px 20px rgba(222,32,32,0.35))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src={lightningBolt2}
          alt="Mini zig-zag lightning bolt"
          className="w-14 sm:w-18 md:w-22 lg:w-26 h-auto object-contain drop-shadow-[0_6px_14px_rgba(222,32,32,0.22)] will-change-transform"
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
