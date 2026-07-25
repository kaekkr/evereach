"use client";

import { motion, AnimatePresence, MotionValue } from "framer-motion";
import Image from "next/image";
import { Project } from "@/data/portfolioData";

interface FloatingPreviewProps {
  hoveredProject: Project | null;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

export function FloatingPreview({ hoveredProject, springX, springY }: FloatingPreviewProps) {
  return (
    <AnimatePresence>
      {hoveredProject && (
        <motion.div
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 pointer-events-none z-60 hidden md:flex flex-col justify-between -translate-x-1/2 -translate-y-1/2 w-80 h-52 rounded-xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-[#0d0d0d] overflow-hidden"
        >
          <div className="absolute inset-0 z-0 bg-neutral-900">
            <Image
              src={hoveredProject.image}
              alt={hoveredProject.title}
              fill
              sizes="320px"
              className="object-cover opacity-90 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
          </div>

          <div className="relative z-10 p-4 flex justify-between items-center text-[10px] text-white">
            <span className="font-mono tracking-widest bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
              // {hoveredProject.id}
            </span>
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 text-[9px] font-mono uppercase tracking-wider text-white">
              {hoveredProject.category}
            </span>
          </div>

          <div className="relative z-10 p-4 pt-0">
            <div className="text-white font-sans font-medium text-lg tracking-tight drop-shadow-md">
              {hoveredProject.title}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
