"use client"

import { motion } from "framer-motion"

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-950">
      {/* Elegant Floating Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(251,191,36,0.03) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        <motion.div
          className="absolute top-1/2 left-3/4 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 10,
          }}
        />
      </div>

      {/* Subtle Geometric Lines */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            opacity: [0, 0.3, 0],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent"
          animate={{
            opacity: [0, 0.2, 0],
            scaleX: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Minimal Floating Dots */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/3 w-1 h-1 bg-white/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-amber-400/30 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/5 w-0.5 h-0.5 bg-white/15 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950/70" />

      {/* Center Focus */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-zinc-950/40" />

      {/* Ultra-subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.008] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
