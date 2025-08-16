"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 bg-zinc-950 z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-light tracking-wider">
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              className="inline-block"
            >
              PORTFOLIO
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
          className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto max-w-md"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-8 text-zinc-400 tracking-widest text-sm"
        >
          CRAFTING DIGITAL EXPERIENCES
        </motion.p>
      </div>
    </motion.div>
  )
}
