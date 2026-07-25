"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function Curtain() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setMouseX(window.innerWidth / 2);
    }
  }, []);

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const springX = useSpring(mouseX, { stiffness: 180, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const curtainWidth = useTransform(smoothScrollProgress, [0, 1], ["0px", "100vw"]);

  // Dynamic background color transition from black to white as you scroll
  const curtainColor = useTransform(
    smoothScrollProgress,
    [0, 0.05, 1],
    ["#080808", "#ffffff", "#ffffff"]
  );

  const curtainLeft = useTransform(
    [springX, smoothScrollProgress],
    ([x, progress]: any[]) => {
      const cursorX = typeof x === "number" ? x : 0;
      const prog = typeof progress === "number" ? progress : 0;

      if (typeof window === "undefined") return "50vw";

      const screenCenter = window.innerWidth / 2;
      const blendedX = cursorX + (screenCenter - cursorX) * prog;

      return `${blendedX}px`;
    }
  );

  if (!isMounted) {
    return (
      <div
        style={{ left: "50vw", width: "0px", backgroundColor: "#080808" }}
        className="fixed top-0 bottom-0 z-10 pointer-events-none -translate-x-1/2"
      />
    );
  }

  return (
    <motion.div
      style={{
        left: curtainLeft,
        width: curtainWidth,
        backgroundColor: curtainColor,
      }}
      className="fixed top-0 bottom-0 z-10 pointer-events-none -translate-x-1/2 will-change-[width,left,background-color]"
    />
  );
}
