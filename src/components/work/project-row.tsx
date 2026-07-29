"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { useEffect, useState } from "react";

interface ProjectRowProps {
  project: Project;
  onHover: (project: Project | null) => void;
  onSelect: (project: Project) => void; // ← new
  index?: number;
}

export function ProjectRow({
  project,
  onHover,
  onSelect,
  index = 0,
}: ProjectRowProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const content = (
    <>
      <div className="flex items-baseline gap-6 md:w-5/12">
        <span className="text-base font-mono opacity-60">{project.id}</span>
        <h3 className="text-2xl md:text-3xl font-sans font-normal group-hover:translate-x-3 transition-transform duration-300">
          {project.title}
        </h3>
      </div>

      <div className="md:w-4/12 pr-4">
        <p className="opacity-70 font-sans text-sm line-clamp-2">
          {project.summary}
        </p>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 text-base md:w-3/12">
        <span className="border border-white/30 px-2.5 py-1 rounded text-xs font-mono">
          {project.category}
        </span>
        <span className="opacity-60 text-sm font-mono">{project.year}</span>
        <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
      </div>
    </>
  );

  const sharedProps = {
    onMouseEnter: () => onHover(project),
    onMouseLeave: () => onHover(null),
    onClick: () => onSelect(project),
    className:
      "group py-8 px-2 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:opacity-80 transition-opacity rounded-lg w-full",
  };

  if (isMobile === null || isMobile) {
    return <div {...sharedProps}>{content}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      {...sharedProps}
    >
      {content}
    </motion.div>
  );
}
