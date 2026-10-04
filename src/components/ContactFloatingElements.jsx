import React from 'react'
import { motion } from 'framer-motion'
import burstStar from '../assets/work/floating/burst_star.png'
import blueStar from '../assets/work/floating/blue_star.png'
import headphonesSticker from '../assets/work/floating/headphones_sticker.png'
import catPointing from '../assets/work/floating/cat_pointing.png'
import lightningBolt1 from '../assets/work/floating/lightning_bolt_1.png'
import lightningBolt2 from '../assets/work/floating/lightning_bolt_2.png'

export default function ContactFloatingElements() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. TOP-LEFT: Cat with Cap & Glasses pointing down at contact rows */}
      <motion.div
        className="absolute top-[148px] sm:top-[100px] md:top-[110px] left-[1.5%] sm:left-[3%] md:left-[6%] pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: -6 }}
        animate={{
          x: [0, 24, -18, 28, -14, 0],
          y: [0, -20, 16, -14, 22, 0],
          rotate: [-6, 8, -12, 6, -10, -6],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.14,
          rotate: 0,
          filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.22))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={catPointing}
          alt="Floating cat with cap"
          className="w-14 xs:w-18 sm:w-24 md:w-30 lg:w-34 h-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.13)] will-change-transform opacity-90 hover:opacity-100 transition-opacity"
          draggable={false}
        />
      </motion.div>

      {/* 2. TOP-RIGHT: Red Burst Star floating above row 1 */}
      <motion.div
        className="absolute top-[146px] sm:top-[95px] md:top-[105px] right-[1.5%] sm:right-[3%] md:right-[6%] pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: 6 }}
        animate={{
          x: [0, -28, 20, -24, 15, 0],
          y: [0, 22, -18, 24, -16, 0],
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
          filter: 'drop-shadow(0 16px 28px rgba(222,32,32,0.25))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={burstStar}
          alt="Floating burst star"
          className="w-16 xs:w-20 sm:w-26 md:w-32 lg:w-38 h-auto object-contain drop-shadow-[0_10px_22px_rgba(222,32,32,0.15)] will-change-transform opacity-90 hover:opacity-100 transition-opacity"
          draggable={false}
        />
      </motion.div>

      {/* 3. BOTTOM-LEFT: Halftone Headphones Sticker (clear of Return to Home button & mobile dock) */}
      <motion.div
        className="absolute bottom-[13%] sm:bottom-[7%] md:bottom-[9%] left-[2%] sm:left-[5%] md:left-[8%] pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: 10 }}
        animate={{
          x: [0, 26, -22, 18, -14, 0],
          y: [0, -26, 15, -22, 20, 0],
          rotate: [10, -6, 14, -4, 8, 10],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.14,
          rotate: 5,
          filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.2))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={headphonesSticker}
          alt="Floating headphones sticker"
          className="w-14 xs:w-16 sm:w-22 md:w-26 lg:w-32 h-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.13)] will-change-transform opacity-90 hover:opacity-100 transition-opacity"
          draggable={false}
        />
      </motion.div>

      {/* 4. MID-RIGHT: Blue Chalk 8-Pointed Star alongside rows */}
      <motion.div
        className="absolute top-[48%] sm:top-[46%] md:top-[45%] right-[1%] sm:right-[2.5%] md:right-[4%] pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: 0 }}
        animate={{
          x: [0, -24, 18, -26, 12, 0],
          y: [0, -18, 24, -15, 16, 0],
          rotate: [0, 72, 144, 216, 288, 360],
        }}
        transition={{
          x: { duration: 17, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 19, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
        }}
        whileHover={{
          scale: 1.25,
          filter: 'drop-shadow(0 12px 22px rgba(30,60,200,0.3))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={blueStar}
          alt="Floating blue chalk star"
          className="w-11 xs:w-13 sm:w-16 md:w-20 lg:w-24 h-auto object-contain drop-shadow-[0_6px_14px_rgba(20,50,180,0.18)] will-change-transform opacity-85 hover:opacity-100 transition-opacity"
          draggable={false}
        />
      </motion.div>

      {/* 5. BOTTOM-RIGHT: Red & Blue Comic Lightning Bolt */}
      <motion.div
        className="absolute bottom-[13%] sm:bottom-[7%] md:bottom-[9%] right-[2%] sm:right-[5%] md:right-[8%] pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: -14 }}
        animate={{
          x: [0, -22, 26, -15, 18, 0],
          y: [0, 20, -24, 18, -15, 0],
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
          filter: 'drop-shadow(0 14px 26px rgba(222,32,32,0.25))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={lightningBolt1}
          alt="Floating lightning bolt"
          className="w-15 xs:w-18 sm:w-24 md:w-28 lg:w-34 h-auto object-contain drop-shadow-[0_8px_18px_rgba(222,32,32,0.15)] will-change-transform opacity-90 hover:opacity-100 transition-opacity"
          draggable={false}
        />
      </motion.div>

      {/* 6. MID-LEFT: Secondary Mini Blue Star */}
      <motion.div
        className="hidden md:block absolute top-[44%] left-[2%] lg:left-[4%] pointer-events-auto cursor-grab active:cursor-grabbing opacity-75 hover:opacity-100"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: 15 }}
        animate={{
          x: [0, 18, -15, 20, -10, 0],
          y: [0, -15, 20, -12, 15, 0],
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
          filter: 'drop-shadow(0 10px 20px rgba(30,60,200,0.35))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src={blueStar}
          alt="Mini blue star"
          className="w-8 md:w-10 lg:w-12 h-auto object-contain drop-shadow-[0_4px_10px_rgba(20,50,180,0.18)] will-change-transform"
          draggable={false}
        />
      </motion.div>

      {/* 7. LOWER-MIDDLE-RIGHT: Secondary Mini Zig-Zag Lightning Bolt */}
      <motion.div
        className="hidden lg:block absolute bottom-[22%] right-[16%] pointer-events-auto cursor-grab active:cursor-grabbing opacity-65 hover:opacity-100"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        initial={{ x: 0, y: 0, rotate: 8 }}
        animate={{
          x: [0, -15, 16, -10, 12, 0],
          y: [0, 12, -16, 14, -10, 0],
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
          filter: 'drop-shadow(0 10px 20px rgba(222,32,32,0.3))',
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src={lightningBolt2}
          alt="Mini zig-zag lightning bolt"
          className="w-14 sm:w-18 md:w-20 lg:w-24 h-auto object-contain drop-shadow-[0_6px_14px_rgba(222,32,32,0.16)] will-change-transform"
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
