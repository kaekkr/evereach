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

// New Awwwards Feature Components
import { MagneticButton } from "@/components/ui/magnetic-button";
import { KineticText } from "@/components/ui/kinetic-text";
import { LiquidCanvas } from "@/components/ui/liquid-canvas";
import { useScrollSkew } from "@/hooks/use-scroll-skew";

import { Hero } from "@/components/hero/hero";
import { Work } from "@/components/work/work";
import { Capabilities } from "@/components/capabilities/capabilities";
import { DancingDog } from "@/components/ui/dancing-dog";

export default function EvereachApp() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [time, setTime] = useState("");

  const skewY = useScrollSkew();

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

  // Viscous Fluid Liquid Physics
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

  // Heavy Trailing Liquid Aura
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
    <div className="min-h-screen bg-[#05050a] text-white font-mono relative overflow-x-hidden antialiased selection:bg-purple-500 selection:text-white">
      {/* 1. ATMOSPHERIC LIQUID LIGHTING & CANVAS MESH */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05050a]">
        {/* Feature 3: GPU Liquid Mesh Canvas */}
        <LiquidCanvas />

        {/* Feature 4: Dynamic SVG Film Noise Overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay z-50 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Liquid Aura 1 (Heavy Slow Trail) */}
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

        {/* Liquid Aura 2 (Primary Spotlight) */}
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
      <div className="fixed top-0 left-0 w-full h-[120px] z-30 backdrop-blur-md pointer-events-none" />

      {/* Feature 5: Velocity Scroll Skew applied to main content container */}
      <motion.div
        style={{ skewY }}
        className="relative z-20 mix-blend-difference text-white transform-gpu origin-center"
      >
        <Hero onStartProject={() => setDrawerOpen(true)} />

        {/* Kinetic Header Example */}
        <section className="max-w-6xl mx-auto px-6 pt-20">
          <KineticText
            text="FEATURED DIRECTED WORK"
            className="text-sm font-mono tracking-widest text-purple-400 uppercase"
          />
        </section>

        <Work onHoverProject={setHoveredProject} />
        <Capabilities />

        <ScrollTwistFooter />

        <footer className="pb-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-base opacity-60 gap-4">
          <div>© 2026 EveReach. ALL RIGHTS RESERVED. EU</div>
          <div className="flex gap-6 items-center">
            {/* Feature 1: Magnetic Interactive Contact Button */}
            <MagneticButton onClick={() => setDrawerOpen(true)}>
              <span className="hover:opacity-100 transition-opacity cursor-pointer border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                CONTACT
              </span>
            </MagneticButton>
          </div>
        </footer>
      </motion.div>

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
