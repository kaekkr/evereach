"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { useScrollSkew } from "@/hooks/use-scroll-skew";
import { Hero } from "@/components/hero/hero";
import { Work } from "@/components/work/work";
import { Capabilities } from "@/components/capabilities/capabilities";
import { BackgroundAtmosphere } from "@/components/ui/background-atmosphere";
import { Footer } from "@/components/layout/footer";
import { ContactDrawer } from "@/components/contact-drawer/contact-drawer";

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const skewY = useScrollSkew();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#05050a] text-white font-mono relative overflow-x-hidden antialiased selection:bg-purple-500 selection:text-white">
      <BackgroundAtmosphere />
      <ContactDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Header onOpenDrawer={() => setDrawerOpen(true)} />

      <motion.div
        style={{ skewY }}
        className="relative z-20 text-white transform-gpu origin-center"
      >
        <Hero onStartProject={() => setDrawerOpen(true)} />
        <Work />
        <Capabilities />
      </motion.div>

      <Footer onContactClick={() => setDrawerOpen(true)} />
    </div>
  );
}
