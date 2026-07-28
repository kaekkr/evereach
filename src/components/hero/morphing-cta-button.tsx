"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MorphingCtaButtonProps {
  onClick?: () => void;
  text?: string;
}

export function MorphingCtaButton({
  onClick,
  text = "START PROJECT",
}: MorphingCtaButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    if (onClick) {
      onClick();
    }
  };

  return (
    <span className="inline-flex items-center align-middle ml-3 sm:ml-5 relative">
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          width: isHovered ? "180px" : "48px",
          backgroundColor: isHovered
            ? "rgba(147, 51, 234, 0.3)"
            : "rgba(255, 255, 255, 0.1)",
          borderColor: isHovered
            ? "rgba(192, 132, 252, 0.6)"
            : "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="relative h-12 w-12 rounded-full border backdrop-blur-md cursor-pointer overflow-hidden font-mono uppercase tracking-widest text-white select-none shrink-0"
        whileTap={{ scale: 0.95 }}
      >
        {/* Collapsed icon state */}
        <motion.span
          animate={{
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0.5 : 1,
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <ArrowRight className="w-5 h-5 stroke-[1.5]" />
        </motion.span>

        {/* Expanded text state */}
        <motion.span
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center gap-1.5 text-[11px] font-medium tracking-tight whitespace-nowrap text-purple-100 pointer-events-none"
        >
          {text}
          <ArrowRight className="w-3.5 h-3.5 stroke-[2] shrink-0" />
        </motion.span>

        {/* Click Ripple effect */}
        {isClicked && (
          <motion.span
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full bg-purple-500/50 pointer-events-none"
          />
        )}
      </motion.button>
    </span>
  );
}
