"use client";

import { useEffect } from "react";
import { useSpring } from "framer-motion";

export function useMousePhysics() {
  // Viscous Fluid Liquid Physics (Fast)
  const springX = useSpring(-100, { stiffness: 45, damping: 18, mass: 1.2 });
  const springY = useSpring(-100, { stiffness: 45, damping: 18, mass: 1.2 });

  // Heavy Trailing Liquid Aura (Slow)
  const trailX = useSpring(-100, { stiffness: 20, damping: 25, mass: 2 });
  const trailY = useSpring(-100, { stiffness: 20, damping: 25, mass: 2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct update to motion values, no React state re-render needed
      springX.set(e.clientX);
      springY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY, trailX, trailY]);

  return { springX, springY, trailX, trailY };
}
