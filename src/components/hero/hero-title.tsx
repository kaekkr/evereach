"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CornerDownRight } from "lucide-react";
import { TeamAvatars } from "./team-avatars";
import { MorphingCtaButton } from "./morphing-cta-button";

interface HeroTitleProps {
  onStartProject?: () => void;
}

export function HeroTitle({ onStartProject }: HeroTitleProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const content = (
    <>
      <span className="inline">Digital products</span>{" "}
      <span className="inline-block align-middle my-1">
        <TeamAvatars />
      </span>{" "}
      <span className="inline">
        interfaces and systems <br className="hidden sm:inline" />
        shaped from first idea <br className="hidden sm:inline" />
        to working form
      </span>{" "}
      <span className="hidden sm:inline-block align-middle my-1">
        <MorphingCtaButton onClick={onStartProject} />
      </span>
    </>
  );

  if (isMobile === null) {
    return (
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] border border-white/30 px-3 py-1 rounded-full text-neutral-300">
          <CornerDownRight className="w-3 h-3 opacity-60 shrink-0" />
          <span className="truncate">
            Product Thinking • Visual Direction • Technical Execution
          </span>
        </div>
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-normal tracking-tighter leading-tight text-white block">
          {content}
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        key={`badge-${isMobile}`}
        initial={isMobile ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] border border-white/30 px-3 py-1 rounded-full text-neutral-300"
      >
        <CornerDownRight className="w-3 h-3 opacity-60 shrink-0" />
        <span className="truncate">
          Product Thinking • Visual Direction • Technical Execution
        </span>
      </motion.div>

      <motion.h1
        key={`heading-${isMobile}`}
        initial={isMobile ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-6xl md:text-7xl font-normal tracking-tighter leading-tight text-white block transform-gpu"
      >
        {content}
      </motion.h1>
    </div>
  );
}
