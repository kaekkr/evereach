"use client";

import { ScrollTwistFooter } from "@/components/layout/scroll-twist-footer";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface FooterProps {
  onContactClick?: () => void;
}

export function Footer({ onContactClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      <ScrollTwistFooter />

      <div className="pb-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-base opacity-60 gap-4">
        <div>© {currentYear} EveReach. ALL RIGHTS RESERVED. EU</div>

        <div className="flex gap-6 items-center">
          <MagneticButton
            text="CONTACT"
            showDot={false}
            onClick={onContactClick}
          />
        </div>
      </div>
    </footer>
  );
}
