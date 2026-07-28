"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroTitle } from "./hero-title";
import { HeroMeta } from "./hero-meta";

interface HeroProps {
  onStartProject?: () => void;
}

export function Hero({ onStartProject }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);

  return (
    <motion.section
      ref={containerRef}
      style={{
        opacity: isMobile ? 1 : heroOpacity,
        scale: isMobile ? 1 : heroScale,
      }}
      className="pt-28 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-between min-h-[80vh] sm:min-h-[85vh] relative z-10"
    >
      <HeroTitle onStartProject={onStartProject} />
      <HeroMeta />
    </motion.section>
  );
}
