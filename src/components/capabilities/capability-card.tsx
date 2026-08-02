"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface Capability {
  title: string;
  desc: string;
}

interface CapabilityCardProps {
  capability: Capability;
  index: number;
}

export function CapabilityCard({ capability, index }: CapabilityCardProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const content = (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-mono opacity-50">0{index + 1}</span>
        <Sparkles className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="text-lg font-sans font-medium mb-2">
        {capability.title}
      </h3>
      <p className="text-base opacity-70 leading-relaxed font-sans">
        {capability.desc}
      </p>
    </>
  );

  if (isMobile === null || isMobile) {
    return (
      <div className="border border-white/20 p-6 rounded-xl transition-all group bg-white/[0.02] backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="border border-white/20 p-6 rounded-xl transition-all group bg-white/[0.02] backdrop-blur-sm"
    >
      {content}
    </motion.div>
  );
}
