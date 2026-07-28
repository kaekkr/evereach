"use client";

import { motion } from "framer-motion";
import { LiquidCanvas } from "@/components/ui/liquid-canvas";
import { useMousePhysics } from "@/hooks/use-mouse-physics";

export function BackgroundAtmosphere() {
  const { springX, springY, trailX, trailY } = useMousePhysics();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05050a]">
      <LiquidCanvas />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay z-50 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="hidden md:block absolute w-[110vw] h-[110vw] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          background:
            "radial-gradient(circle at center, rgba(126, 34, 206, 0.28) 0%, rgba(67, 56, 202, 0.12) 45%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />

      <motion.div
        className="hidden md:block absolute w-[85vw] h-[85vw] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: springX,
          y: springY,
          background:
            "radial-gradient(circle at center, rgba(168, 85, 247, 0.35) 0%, rgba(99, 102, 241, 0.18) 40%, transparent 70%)",
          filter: "blur(75px)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 20%, transparent 80%)",
        }}
      />
    </div>
  );
}
