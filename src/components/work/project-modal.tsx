"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "@/data/portfolioData";
import Image from "next/image";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-t-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1100px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        <div className="px-6 md:px-10 pb-10 pt-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-sm font-mono opacity-60">{project.id}</span>
            <span className="border border-white/25 px-2.5 py-1 rounded text-xs font-mono">
              {project.category}
            </span>
            <span className="text-sm font-mono opacity-60">{project.year}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-sans font-normal mb-5">
            {project.title}
          </h2>

          <p className="text-base md:text-lg opacity-75 leading-relaxed max-w-2xl">
            {project.summary}
            {/* You can later add project.description for longer text */}
          </p>

          {/* Optional future actions */}
          {/* <div className="mt-8 flex gap-4">
            <button className="...">View Prototype</button>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
}
