"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CAPABILITIES } from "@/data/portfolioData";

export function Capabilities() {
  return (
    <section
      id="about"
      className="py-24 px-6 max-w-6xl mx-auto border-t border-white/20"
    >
      <div className="text-base opacity-60 uppercase tracking-widest mb-12">
        // SYSTEM CAPABILITIES
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CAPABILITIES.map((cap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="border border-white/20 p-6 rounded-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-base opacity-50">0{i + 1}</span>
              <Sparkles className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-lg font-sans font-medium mb-2">{cap.title}</h4>
            <p className="text-base opacity-70 leading-relaxed font-sans">
              {cap.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
