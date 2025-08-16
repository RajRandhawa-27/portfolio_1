"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { skillsData } from "@/data/skillsData";

// Predefined color schemes for skills
const predefinedColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-pink-500 to-rose-600",
  "from-amber-500 to-yellow-600",
];

// General technology icons that work universally
const generalTechIcons = ["⚙️", "🔧", "💻", "🖥️", "📱", "🌐", "⚡", "🚀"];

const getTechnologyIcon = (index: number): string => {
  return generalTechIcons[index % generalTechIcons.length];
};

export default function ProcessSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  // Early return if data not available
  if (
    !skillsData ||
    skillsData.isRequired === false ||
    !skillsData.skills ||
    skillsData.skills.length === 0
  ) {
    return null;
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const skills = skillsData.skills;
  const technologies = skillsData.technologies || [];
  const timeline = skillsData.timeline || [];

  return (
    <section ref={containerRef} className="relative py-32 bg-zinc-900">
      <div className="container mx-auto px-8">
        {(skillsData.title || skillsData.subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {skillsData.title && (
              <h2 className="text-6xl md:text-8xl font-light tracking-tight mb-6">
                {skillsData.title}
              </h2>
            )}
            {skillsData.subtitle && (
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                {skillsData.subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Skills Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          {skills && skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-light mb-12">Core Skills</h3>
              <div className="space-y-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    onMouseEnter={() => setActiveSkill(index)}
                    onMouseLeave={() => setActiveSkill(null)}
                    className="group"
                  >
                    {(skill.name || skill.percentage) && (
                      <div className="flex justify-between items-center mb-3">
                        {skill.name && (
                          <span className="text-lg font-medium">
                            {skill.name}
                          </span>
                        )}
                        {skill.percentage && (
                          <span className="text-zinc-400">
                            {skill.percentage}%
                          </span>
                        )}
                      </div>
                    )}
                    {skill.percentage && (
                      <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${
                            predefinedColors[index % predefinedColors.length]
                          } rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            duration: 1.2,
                            ease: "easeOut",
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-full"
                          initial={{ x: "-100%" }}
                          animate={{
                            x: activeSkill === index ? "100%" : "-100%",
                          }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {technologies && technologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-light mb-12">Technologies</h3>
              <div className="grid grid-cols-2 gap-6">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    }}
                    className="p-6 border border-zinc-700 rounded-xl text-center group cursor-pointer"
                    data-cursor="pointer"
                  >
                    <motion.div
                      className="text-3xl mb-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {getTechnologyIcon(index)}
                    </motion.div>
                    {tech.name && (
                      <span className="text-sm font-medium group-hover:text-amber-400 transition-colors duration-300">
                        {tech.name}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Timeline Section */}
        {timeline && timeline.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-light mb-12 text-center">
              Journey Timeline
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-amber-400 to-orange-500 h-full"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              <div className="space-y-16">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className={`flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-5/12 ${
                        index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                      }`}
                    >
                      {item.title && (
                        <motion.div
                          className="text-2xl font-light mb-2"
                          initial={{ clipPath: "inset(0 100% 0 0)" }}
                          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                          transition={{
                            delay: index * 0.2 + 0.3,
                            duration: 0.8,
                          }}
                        >
                          {item.title}
                        </motion.div>
                      )}
                      {item.description && (
                        <p className="text-zinc-400">{item.description}</p>
                      )}
                    </div>

                    <motion.div
                      className="w-2/12 flex justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                    >
                      <div className="w-4 h-4 bg-amber-400 rounded-full relative z-10">
                        <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75" />
                      </div>
                    </motion.div>

                    <div
                      className={`w-5/12 ${
                        index % 2 === 0 ? "text-left pl-8" : "text-right pr-8"
                      }`}
                    >
                      {item.year && (
                        <motion.div
                          className="text-4xl font-light text-amber-400"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{
                            delay: index * 0.2 + 0.6,
                            duration: 0.8,
                          }}
                        >
                          {item.year}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
