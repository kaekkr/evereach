"use client";

import { useRef } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

export function ScrollTwistFooter() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 35,
    stiffness: 250,
  });

  const rotateX = useTransform(smoothVelocity, [-3000, 3000], [35, -35]);
  const skewX = useTransform(smoothVelocity, [-3000, 3000], [-12, 12]);
  const skewY = useTransform(smoothVelocity, [-3000, 3000], [-6, 6]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-12 my-12 border-t border-white/10 flex items-center justify-center select-none"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{ rotateX, skewX, skewY }}
        className="will-change-transform transform-gpu flex items-center justify-center min-w-max"
      >
        <h2
          style={{ fontSize: "25vw" }}
          className="font-sans font-black tracking-tighter uppercase leading-none whitespace-nowrap text-center"
        >
          EVEREACH
        </h2>
      </motion.div>
    </div>
  );
}
