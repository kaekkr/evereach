"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CornerDownRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="pt-40 pb-24 px-6 max-w-6xl mx-auto flex flex-col justify-between min-h-[85vh]"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 text-[11px] border border-white/30 px-3 py-1 rounded-full"
        >
          <CornerDownRight className="w-3 h-3 opacity-60" />
          <span>Product Thinking • Visual Direction • Technical Execution</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tighter leading-[1.08]"
        >
          Digital products, <br />
          interfaces and systems— <br />
          shaped from first idea to working form.
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-white/20 text-base">
        <div>
          <span className="block opacity-60 mb-1">POSITION</span>
          <p className="font-medium">Independent Studio & Engineering</p>
        </div>
        <div>
          <span className="block opacity-60 mb-1">AVAILABILITY</span>
          <p className="font-medium">Accepting Q3/Q4 Projects</p>
        </div>
        <div>
          <span className="block opacity-60 mb-1">STACK</span>
          <p className="font-medium">
            Next.js • TypeScript • Tailwind • Motion
          </p>
        </div>
      </div>
    </motion.section>
  );
}
