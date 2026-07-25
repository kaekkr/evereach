"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";

interface HeaderProps {
  time: string;
  onOpenDrawer: () => void;
}

export function Header({ time, onOpenDrawer }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 mix-blend-difference text-white pointer-events-auto border-b border-white/25"
    >
      <div className="w-full flex items-center justify-between text-xs">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="hover:opacity-80 transition-opacity flex items-center group"
        >
          {/* SINGLE LOGO ICON (Scaled up for all screen sizes) */}
          <div className="h-8 w-8 md:h-10 md:w-10 lg:h-22 lg:w-22 relative flex items-center justify-center">
            <Image
              src="/Old_Logo_Inverted.svg"
              alt="Evereach Icon"
              width={48}
              height={48}
              priority
              className="h-full w-full object-contain"
            />
          </div>
        </a>{" "}
        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 opacity-80">
          <a href="#work" className="hover:opacity-100 transition-opacity">
            <ScrambleText text="WORK" />
          </a>
          <a href="#about" className="hover:opacity-100 transition-opacity">
            <ScrambleText text="CAPABILITIES" />
          </a>
          <span className="opacity-40">|</span>
          <span className="font-mono">{time || "12:00:00 UTC"}</span>
        </div>
        {/* CTA BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenDrawer}
          className="flex items-center gap-2 border border-white/40 px-3.5 py-1.5 rounded-full hover:bg-white hover:text-black transition-all group"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:bg-black transition-colors" />
          <span className="font-medium tracking-wide">START PROJECT</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
