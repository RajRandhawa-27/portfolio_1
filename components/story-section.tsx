"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { storyData } from "@/data/storyData";

// Predefined color schemes for chapters
const predefinedColors = [
  "from-blue-500 to-purple-600",
  "from-purple-500 to-pink-600",
  "from-pink-500 to-red-600",
  "from-amber-500 to-orange-600",
];

// Design placeholder component for chapters without images
const ChapterPlaceholder = ({
  chapter,
  colorIndex,
}: {
  chapter: any;
  colorIndex: number;
}) => {
  const icons = ["📖", "🚀", "⚡", "✨", "🎯", "💫", "🌟", "🔥"];
  const patterns = [
    // Geometric pattern
    <div key="geo" className="absolute inset-0 opacity-20">
      <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white/20 rotate-45"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/10 rounded-full"></div>
    </div>,
    // Abstract lines
    <div key="lines" className="absolute inset-0 opacity-20">
      <svg className="w-full h-full" viewBox="0 0 400 300">
        <path
          d="M0,150 Q100,50 200,150 T400,150"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0,200 Q150,100 300,200 T400,200"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>,
    // Dots pattern
    <div key="dots" className="absolute inset-0 opacity-20">
      <div className="grid grid-cols-8 gap-4 h-full p-8">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 bg-white rounded-full ${
              i % 3 === 0 ? "opacity-60" : "opacity-20"
            }`}
          ></div>
        ))}
      </div>
    </div>,
    // Wave pattern
    <div key="waves" className="absolute inset-0 opacity-20">
      <svg className="w-full h-full" viewBox="0 0 400 300">
        <path
          d="M0,100 Q100,50 200,100 T400,100"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M0,150 Q100,100 200,150 T400,150"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0,200 Q100,150 200,200 T400,200"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>,
  ];

  return (
    <div
      className={`relative h-full w-full bg-gradient-to-br ${predefinedColors[colorIndex]} rounded-2xl overflow-hidden flex items-center justify-center`}
    >
      {patterns[colorIndex % patterns.length]}
      <div className="relative z-10 text-center">
        <div className="text-6xl mb-4">{icons[colorIndex % icons.length]}</div>
        <div className="text-white/80 text-lg font-light px-4">
          {chapter.title || "Chapter"}
        </div>
        <div className="text-white/60 text-sm mt-2">
          {chapter.year || "Story Chapter"}
        </div>
      </div>
    </div>
  );
};

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Early return if data not available
  if (
    !storyData ||
    storyData.isRequired === false ||
    !storyData.chapters ||
    storyData.chapters.length === 0
  ) {
    return null;
  }

  const chapters = storyData.chapters;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChapterChange = (index: number) => {
    setActiveChapter(index);
  };

  const handlePrevChapter = () => {
    setActiveChapter((prev) => (prev > 0 ? prev - 1 : chapters.length - 1));
  };

  const handleNextChapter = () => {
    setActiveChapter((prev) => (prev < chapters.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative py-16 md:py-32 bg-zinc-900">
      {/* Header */}
      {(storyData.title || storyData.subtitle) && (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            {storyData.title && (
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tight mb-4 md:mb-6">
                {storyData.title}
              </h2>
            )}
            {storyData.subtitle && (
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
                {storyData.subtitle}
              </p>
            )}
          </motion.div>
        </div>
      )}

      {/* Desktop Interactive Chapters */}
      {chapters && chapters.length > 0 && (
        <div className="hidden lg:block" ref={containerRef}>
          <div className="relative h-[600px] overflow-hidden">
            <div className="px-8 max-w-7xl mx-auto h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="h-full flex items-center"
                >
                  <div className="grid grid-cols-2 gap-16 h-full w-full items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="flex flex-col justify-center"
                    >
                      {chapters[activeChapter].year && (
                        <motion.div
                          className={`text-sm font-medium bg-gradient-to-r ${
                            predefinedColors[
                              activeChapter % predefinedColors.length
                            ]
                          } bg-clip-text text-transparent mb-4`}
                        >
                          {chapters[activeChapter].year}
                        </motion.div>
                      )}

                      {chapters[activeChapter].title && (
                        <motion.h3
                          className="text-5xl xl:text-6xl font-light mb-6 leading-tight"
                          initial={{ clipPath: "inset(0 100% 0 0)" }}
                          animate={{ clipPath: "inset(0 0% 0 0)" }}
                          transition={{ delay: 0.4, duration: 1 }}
                        >
                          {chapters[activeChapter].title}
                        </motion.h3>
                      )}

                      {chapters[activeChapter].content && (
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.8 }}
                          className="text-lg xl:text-xl text-zinc-300 leading-relaxed max-w-lg"
                        >
                          {chapters[activeChapter].content}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="relative group"
                    >
                      <div className="relative h-[450px] rounded-2xl overflow-hidden">
                        {chapters[activeChapter].image &&
                        chapters[activeChapter].image.trim() !== "" ? (
                          <>
                            <Image
                              src={chapters[activeChapter].image}
                              alt={chapters[activeChapter].title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${
                                predefinedColors[
                                  activeChapter % predefinedColors.length
                                ]
                              } opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                            />
                          </>
                        ) : (
                          <ChapterPlaceholder
                            chapter={chapters[activeChapter]}
                            colorIndex={activeChapter % predefinedColors.length}
                          />
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevChapter}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-zinc-600 rounded-full flex items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300 group"
            >
              <svg
                className="w-5 h-5 group-hover:text-amber-400 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNextChapter}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-zinc-600 rounded-full flex items-center justify-center hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300 group"
            >
              <svg
                className="w-5 h-5 group-hover:text-amber-400 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Chapter Navigation Dots */}
          <div className="flex justify-center mt-12 gap-4">
            {chapters.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeChapter === index
                    ? "bg-amber-400 scale-125"
                    : "bg-zinc-600"
                }`}
                onClick={() => handleChapterChange(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Chapter Cards */}
      {chapters && chapters.length > 0 && (
        <div className="block lg:hidden px-4 sm:px-6">
          <div className="space-y-12">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm"
              >
                {chapter.year && (
                  <div
                    className={`text-sm font-medium bg-gradient-to-r ${
                      predefinedColors[index % predefinedColors.length]
                    } bg-clip-text text-transparent mb-3`}
                  >
                    {chapter.year}
                  </div>
                )}
                {chapter.title && (
                  <h3 className="text-2xl sm:text-3xl font-light mb-4">
                    {chapter.title}
                  </h3>
                )}
                {chapter.content && (
                  <p className="text-zinc-300 leading-relaxed mb-6">
                    {chapter.content}
                  </p>
                )}
                <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden">
                  {chapter.image && chapter.image.trim() !== "" ? (
                    <Image
                      src={chapter.image}
                      alt={chapter.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <ChapterPlaceholder
                      chapter={chapter}
                      colorIndex={index % predefinedColors.length}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
