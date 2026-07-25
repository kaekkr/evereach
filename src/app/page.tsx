"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

import { Project } from "@/data/portfolioData";
import { Curtain } from "@/components/ui/curtain";
import { FloatingPreview } from "@/components/ui/floating-preview";
import { Header } from "@/components/layout/header";
import { ScrollTwistFooter } from "@/components/layout/scroll-twist-footer";
import { ContactDrawer } from "@/components/layout/contact-drawer";
import { CommandPalette } from "@/components/command-menu/command-palette";

import { Hero } from "@/components/hero/hero";
import { Work } from "@/components/work/work";
import { Capabilities } from "@/components/capabilities/capabilities";

export default function EvereachApp() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  // Global Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // 1. LIQUID SPRING PHYSICS: Low stiffness + smooth damping gives fluid weight/drag
  const springX = useSpring(mousePos.x, {
    stiffness: 45,
    damping: 18,
    mass: 1.2,
  });
  const springY = useSpring(mousePos.y, {
    stiffness: 45,
    damping: 18,
    mass: 1.2,
  });

  // Secondary delayed spring for a dual-stage liquid trail effect
  const trailX = useSpring(mousePos.x, { stiffness: 20, damping: 25, mass: 2 });
  const trailY = useSpring(mousePos.y, { stiffness: 20, damping: 25, mass: 2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    springX.set(mousePos.x);
    springY.set(mousePos.y);
    trailX.set(mousePos.x);
    trailY.set(mousePos.y);
  }, [mousePos, springX, springY, trailX, trailY]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour12: false, timeZone: "UTC" }) +
          " UTC",
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#05050a] text-white font-mono relative overflow-x-hidden antialiased">
      {/* 1. ATMOSPHERIC BACKGROUND: EXPANDED LIQUID SPOTLIGHT + GRID */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05050a]">
        {/* Outer Liquid Trail (Larger, slow fluid aura) */}
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

        {/* Primary Liquid Spotlight (Expanded radius + silky fluid motion) */}
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

        {/* Static Ambient Background Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] opacity-60 md:opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(88, 28, 135, 0.4) 0%, rgba(30, 27, 75, 0.2) 50%, transparent 75%)",
          }}
        />

        {/* Technical Perspective Grid */}
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

      {/*<Curtain />*/}

      <FloatingPreview
        hoveredProject={hoveredProject}
        springX={springX}
        springY={springY}
      />

      <Header time={time} onOpenDrawer={() => setDrawerOpen(true)} />

      {/* Glass overlay background spanning top navigation bar */}
      <div className="fixed top-0 left-0 w-full h-30 z-30 backdrop-blur-md pointer-events-none" />

      <div className="relative z-20 mix-blend-difference text-white">
        <Hero />
        <Work onHoverProject={setHoveredProject} />
        <Capabilities />

        <ScrollTwistFooter />

        <footer className="pb-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-base opacity-60 gap-4">
          <div>© 2026 EveReach. ALL RIGHTS RESERVED. EU</div>
          <div className="flex gap-6 items-center">
            <button
              onClick={() => setDrawerOpen(true)}
              className="hover:opacity-100 transition-opacity"
            >
              CONTACT
            </button>
          </div>
        </footer>
      </div>

      <ContactDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onOpenEstimator={() => setEstimatorOpen(true)}
        onOpenContact={() => setDrawerOpen(true)}
      />
    </div>
  );
}
