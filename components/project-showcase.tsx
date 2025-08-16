"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { projectsData } from "@/data/projectsData";

// Predefined color schemes for projects
const predefinedColors = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
];

// Project placeholder component based on category
const ProjectPlaceholder = ({
  project,
  colorIndex,
}: {
  project: any;
  colorIndex: number;
}) => {
  const getCategoryIcon = (category: string) => {
    const cat = category?.toLowerCase() || "";
    if (cat.includes("e-commerce") || cat.includes("platform")) return "🛍️";
    if (cat.includes("ai") || cat.includes("art")) return "🎨";
    if (
      cat.includes("data") ||
      cat.includes("dashboard") ||
      cat.includes("visualization")
    )
      return "📊";
    if (cat.includes("interactive") || cat.includes("media")) return "🎭";
    if (cat.includes("web") || cat.includes("design")) return "💻";
    if (cat.includes("mobile") || cat.includes("app")) return "📱";
    return "🚀";
  };

  const getPatternByCategory = (category: string) => {
    const cat = category?.toLowerCase() || "";

    if (cat.includes("e-commerce") || cat.includes("platform")) {
      // Shopping/commerce pattern
      return (
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-6 gap-4 h-full p-8">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded ${
                  i % 4 === 0 ? "bg-white/40" : "bg-white/10"
                }`}
              ></div>
            ))}
          </div>
        </div>
      );
    }

    if (cat.includes("ai") || cat.includes("art")) {
      // Neural network pattern
      return (
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            <circle cx="100" cy="100" r="3" fill="currentColor" />
            <circle cx="200" cy="80" r="3" fill="currentColor" />
            <circle cx="300" cy="120" r="3" fill="currentColor" />
            <circle cx="150" cy="200" r="3" fill="currentColor" />
            <circle cx="250" cy="220" r="3" fill="currentColor" />
            <line
              x1="100"
              y1="100"
              x2="200"
              y2="80"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="200"
              y1="80"
              x2="300"
              y2="120"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="100"
              x2="150"
              y2="200"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              x1="300"
              y1="120"
              x2="250"
              y2="220"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
      );
    }

    if (cat.includes("data") || cat.includes("dashboard")) {
      // Chart/data pattern
      return (
        <div className="absolute inset-0 opacity-20 p-8">
          <div className="w-full h-full flex items-end justify-around">
            <div className="w-8 h-16 bg-white/30 rounded-t"></div>
            <div className="w-8 h-24 bg-white/40 rounded-t"></div>
            <div className="w-8 h-12 bg-white/20 rounded-t"></div>
            <div className="w-8 h-20 bg-white/35 rounded-t"></div>
            <div className="w-8 h-8 bg-white/25 rounded-t"></div>
          </div>
        </div>
      );
    }

    // Default geometric pattern
    return (
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-2 border-white/20 rounded-lg rotate-12"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 border-2 border-white/20 rounded-full"></div>
      </div>
    );
  };

  return (
    <div
      className={`relative h-full w-full bg-gradient-to-br ${predefinedColors[colorIndex]} rounded-2xl overflow-hidden flex items-center justify-center`}
    >
      {getPatternByCategory(project.category || "")}
      <div className="relative z-10 text-center">
        <div className="text-6xl mb-4">
          {getCategoryIcon(project.category || "")}
        </div>
        <div className="text-white/80 text-lg font-light px-4">
          {project.title || "Project"}
        </div>
        <div className="text-white/60 text-sm mt-2">
          {project.category || "Creative Project"}
        </div>
      </div>
    </div>
  );
};

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Early return if data not available
  if (
    !projectsData ||
    projectsData.isRequired === false ||
    !projectsData.projects ||
    projectsData.projects.length === 0
  ) {
    return null;
  }

  const projects = projectsData.projects;

  return (
    <section ref={containerRef} className="relative py-16 md:py-32 bg-zinc-950">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {(projectsData.title || projectsData.subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            {projectsData.title && (
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tight mb-4 md:mb-6">
                {projectsData.title}
              </h2>
            )}
            {projectsData.subtitle && (
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
                {projectsData.subtitle}
              </p>
            )}
          </motion.div>
        )}

        {projects && projects.length > 0 && (
          <div className="space-y-16 md:space-y-32">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <motion.div
                  className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                  whileHover={{ x: index % 2 === 1 ? -10 : 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {(project.year || project.category) && (
                    <motion.div
                      className={`text-sm font-medium bg-gradient-to-r ${
                        predefinedColors[index % predefinedColors.length]
                      } bg-clip-text text-transparent mb-4`}
                    >
                      {project.year && project.category
                        ? `${project.year} • ${project.category}`
                        : project.year || project.category}
                    </motion.div>
                  )}

                  {project.title && (
                    <motion.h3
                      className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 md:mb-6 leading-tight"
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 1.2 }}
                    >
                      {project.title}
                    </motion.h3>
                  )}

                  {project.description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 0.6, duration: 0.8 }}
                      className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6 md:mb-8 max-w-lg"
                    >
                      {project.description}
                    </motion.p>
                  )}

                  <motion.button
                    data-cursor="pointer"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(251, 191, 36, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-6 md:px-8 py-3 border border-zinc-600 rounded-full text-sm tracking-widest transition-all duration-300 hover:border-amber-400"
                  >
                    <span className="group-hover:text-amber-400 transition-colors duration-300">
                      VIEW PROJECT
                    </span>
                  </motion.button>
                </motion.div>

                <motion.div
                  className={`relative group ${
                    index % 2 === 1 ? "lg:col-start-1" : ""
                  }`}
                  data-cursor="magnifier"
                  whileHover={{
                    scale: 1.02,
                    rotateY: index % 2 === 1 ? -2 : 2,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-2xl overflow-hidden">
                    {project.image && project.image.trim() !== "" ? (
                      <>
                        <Image
                          src={project.image}
                          alt={project.title || "Project"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${
                            predefinedColors[index % predefinedColors.length]
                          } opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                        />

                        {/* Hover overlay */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileHover={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-12 h-12 md:w-16 md:h-16 border-2 border-white rounded-full flex items-center justify-center"
                          >
                            <svg
                              className="w-4 h-4 md:w-6 md:h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </motion.div>
                        </motion.div>
                      </>
                    ) : (
                      <ProjectPlaceholder
                        project={project}
                        colorIndex={index % predefinedColors.length}
                      />
                    )}
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
