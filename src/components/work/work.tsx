"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/data/portfolioData";
import { FloatingPreview } from "@/components/ui/floating-preview";
import { useMousePhysics } from "@/hooks/use-mouse-physics";
import { ProjectRow } from "./project-row";
import { ProjectModal } from "./project-modal"; // ← new

export function Work() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { springX, springY } = useMousePhysics();

  return (
    <section
      id="work"
      className="relative py-20 px-6 max-w-6xl mx-auto border-t border-white/20"
    >
      <FloatingPreview
        hoveredProject={hoveredProject}
        springX={springX}
        springY={springY}
      />

      <h2 className="mb-12 uppercase tracking-widest font-mono text-base md:text-sm opacity-70">
        // SELECTED WORK
      </h2>

      <div className="divide-y divide-white/20 border-b border-white/20">
        {PROJECTS.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            onHover={setHoveredProject}
            onSelect={setSelectedProject} // ← new
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
