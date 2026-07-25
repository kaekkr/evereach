"use client";

import { useState, useEffect } from "react";
import { useSpring } from "framer-motion";

import { Project } from "@/data/portfolioData";
import { Curtain } from "@/components/ui/curtain";
import { FloatingPreview } from "@/components/ui/floating-preview";
import { Header } from "@/components/layout/header";
import { ScrollTwistFooter } from "@/components/layout/scroll-twist-footer";
import { ContactDrawer } from "@/components/layout/contact-drawer";
import { ProjectEstimator } from "@/components/calculator/project-estimator";
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
  const springX = useSpring(mousePos.x, { stiffness: 200, damping: 20 });
  const springY = useSpring(mousePos.y, { stiffness: 200, damping: 20 });

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
  }, [mousePos, springX, springY]);

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
    <div className="min-h-screen bg-[#080808] text-white font-mono relative overflow-x-hidden antialiased">
      <Curtain />
      <FloatingPreview
        hoveredProject={hoveredProject}
        springX={springX}
        springY={springY}
      />

      <Header time={time} onOpenDrawer={() => setDrawerOpen(true)} />
      {/* Glass overlay background spanning full screen height of header */}
      <div className="fixed top-0 left-0 w-full h-30 z-30 backdrop-blur-md pointer-events-none" />

      <div className="relative z-20 mix-blend-difference text-white">
        <Hero />
        <Work onHoverProject={setHoveredProject} />
        <Capabilities />

        <ScrollTwistFooter />

        <footer className="pb-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs opacity-60 gap-4">
          <div>© 2026 EveReach. ALL RIGHTS RESERVED. EU</div>
          <div className="flex gap-6 items-center">
            {/*<button
              onClick={() => setEstimatorOpen(true)}
              className="hover:opacity-100 transition-opacity text-white font-medium"
            >
              ESTIMATOR
            </button>*/}
            <button
              onClick={() => setDrawerOpen(true)}
              className="hover:opacity-100 transition-opacity"
            >
              CONTACT
            </button>
            {/*<button
              onClick={() => setCmdOpen(true)}
              className="hover:opacity-100 transition-opacity border border-white/20 px-2 py-0.5 rounded text-[10px]"
            >
              ⌘K
            </button>*/}
          </div>
        </footer>
      </div>

      <ContactDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/*<ProjectEstimator
        isOpen={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
      />*/}

      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onOpenEstimator={() => setEstimatorOpen(true)}
        onOpenContact={() => setDrawerOpen(true)}
      />
    </div>
  );
}
