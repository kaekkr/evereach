"use client";

import { Logo } from "@/components/ui/logo";
import { Navbar } from "@/components/layout/navbar";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface HeaderProps {
  onOpenDrawer: () => void;
}

export function Header({ onOpenDrawer }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full h-16 md:h-20 z-50 px-6 bg-slate-950/40 backdrop-blur-md border-b border-white/10 text-white flex items-center justify-between">
      <Logo />
      <Navbar />
      <MagneticButton
        text="START PROJECT"
        showDot={true}
        onClick={onOpenDrawer}
      />
    </header>
  );
}
