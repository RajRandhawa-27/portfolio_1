"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/hero-section";
import StorySection from "@/components/story-section";
import ProjectShowcase from "@/components/project-showcase";
import ProcessSkills from "@/components/process-skills";
import ContactSection from "@/components/contact-section";
import CustomCursor from "@/components/custom-cursor";
import LoadingScreen from "@/components/loading-screen";

// Import all data files
import { heroData } from "@/data/heroData";
import { storyData } from "@/data/storyData";
import { projectsData } from "@/data/projectsData";
import { skillsData } from "@/data/skillsData";
import { contactData } from "@/data/contactData";

// Check if each section should render
const shouldRenderHero = heroData && heroData.isRequired === true;
const shouldRenderStory = storyData && storyData.isRequired === true;
const shouldRenderProjects = projectsData && projectsData.isRequired === true;
const shouldRenderSkills = skillsData && skillsData.isRequired === true;
const shouldRenderContact = contactData && contactData.isRequired === true;

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterPortfolio = () => {
    setHasEntered(true);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <CustomCursor />

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {/* Hero Section */}
      <AnimatePresence mode="wait">
        {!isLoading && !hasEntered && shouldRenderHero && (
          <HeroSection key="hero" onEnter={handleEnterPortfolio} />
        )}
      </AnimatePresence>

      {/* Main Portfolio Content */}
      <AnimatePresence mode="wait">
        {!isLoading && hasEntered && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative"
          >
            {shouldRenderStory && <StorySection />}
            {shouldRenderProjects && <ProjectShowcase />}
            {shouldRenderSkills && <ProcessSkills />}
            {shouldRenderContact && <ContactSection />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      {hasEntered && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      )}
    </div>
  );
}
