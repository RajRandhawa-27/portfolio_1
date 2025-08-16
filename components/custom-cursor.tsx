"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Ultra-smooth spring configuration
  const springConfig = { damping: 10, stiffness: 600, mass: 0.05 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      // Precise cursor positioning
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    if (!isMobile) {
      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseenter", handleMouseEnter);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY, isMobile]);

  // Don't render custom cursor on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        scale: 1,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 400 }}
      initial={{ opacity: 1 }}
      whileInView={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Inner dot - always visible */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
        style={{ x: "-50%", y: "-50%" }}
      />
    </motion.div>
  );
}
