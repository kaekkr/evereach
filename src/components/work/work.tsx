"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, CATEGORIES, Project } from "@/data/portfolioData";

interface WorkProps {
  onHoverProject: (project: Project | null) => void;
}

export function Work({ onHoverProject }: WorkProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects =
    activeCategory === "ALL"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="work"
      className="py-20 px-6 max-w-6xl mx-auto border-t border-white/20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 text-base opacity-70">
        <span className="uppercase tracking-widest">// SELECTED INDEX</span>

        <div className="flex items-center gap-2 border border-white/30 p-1 rounded-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-3 py-1 rounded-full text-[11px] transition-colors ${
                activeCategory === cat ? "text-black" : "text-white"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full -z-0"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="divide-y divide-white/20 border-b border-white/20"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => onHoverProject(project)}
              onMouseLeave={() => onHoverProject(null)}
              className="group py-8 px-2 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:opacity-80 transition-opacity rounded-lg"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-base font-mono opacity-60">
                  {project.id}
                </span>
                <h3 className="text-2xl md:text-3xl font-sans font-normal group-hover:translate-x-3 transition-transform duration-300">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 text-base">
                <span className="hidden sm:inline-block max-w-xs opacity-70 font-sans">
                  {project.summary}
                </span>
                <span className="border border-white/30 px-2.5 py-1 rounded">
                  {project.category}
                </span>
                <span className="opacity-60">{project.year}</span>
                <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
