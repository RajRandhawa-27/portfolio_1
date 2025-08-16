"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import HeroBackground from "@/components/hero-background";
import { heroData } from "@/data/heroData";
import { contactData } from "@/data/contactData";
import { projectsData } from "@/data/projectsData";
import { storyData } from "@/data/storyData";
import { skillsData } from "@/data/skillsData";

interface HeroSectionProps {
  onEnter: () => void;
}

export default function HeroSection({ onEnter }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Early return if data not available
  if (!heroData || heroData?.isRequired === false) {
    return null;
  }

  const textVariants = {
    hidden: {
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
    },
    visible: (i: number) => ({
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const handleClick = () => {
    onEnter();
  };

  const isNextSectionAvailable =
    (contactData && contactData.isRequired) ||
    (projectsData && projectsData.isRequired) ||
    (storyData && storyData.isRequired) ||
    (skillsData && skillsData.isRequired);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="relative min-h-screen"
    >
      <HeroBackground />

      <div className="relative z-30 h-full flex items-center justify-center">
        <div className="text-center max-w-6xl mx-auto px-8">
          {(heroData.title || heroData.subtitle) && (
            <motion.div className="mb-12">
              {heroData.title && (
                <motion.h1
                  custom={0}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-8xl md:text-9xl lg:text-[12rem] font-light tracking-tighter leading-none mb-4"
                  style={{
                    textShadow: "0 0 80px rgba(0,0,0,0.8)",
                  }}
                >
                  {heroData.title}
                </motion.h1>
              )}
              {heroData.subtitle && (
                <motion.h1
                  custom={1}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-8xl md:text-9xl lg:text-[12rem] font-light tracking-tighter leading-none"
                  style={{
                    textShadow: "0 0 80px rgba(0,0,0,0.8)",
                  }}
                >
                  {heroData.subtitle}
                </motion.h1>
              )}
            </motion.div>
          )}

          {heroData.description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1, ease: "easeOut" }}
              className="text-xl md:text-2xl text-zinc-300 mb-16 tracking-wide max-w-2xl mx-auto leading-relaxed"
              style={{ textShadow: "0 0 40px rgba(0,0,0,0.9)" }}
            >
              {heroData.description}
            </motion.p>
          )}

          <motion.button
            onClick={handleClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(251, 191, 36, 0.1)",
              borderColor: "rgb(251, 191, 36)",
              boxShadow: "0 0 30px rgba(251, 191, 36, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-16 py-5 border border-white/20 rounded-full text-lg tracking-[0.2em] transition-all duration-500 overflow-hidden backdrop-blur-sm mb-8"
            disabled={!isNextSectionAvailable}
            aria-disabled={!isNextSectionAvailable}
            style={{
              opacity: isNextSectionAvailable ? 1 : 0.5,
              cursor: isNextSectionAvailable ? "pointer" : "not-allowed",
            }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              layoutId="button-bg"
            />
            <span className="relative z-10 font-light">ENTER PORTFOLIO</span>
          </motion.button>
        </div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/5 z-20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/5 z-20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/5 z-20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/5 z-20" />
    </motion.section>
  );
}
