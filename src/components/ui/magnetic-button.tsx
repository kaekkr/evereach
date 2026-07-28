"use client";
import { useRef, useState, useEffect, MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  text: string;
  onClick?: () => void;
  showDot?: boolean;
  strength?: number;
  className?: string;
}

export function MagneticButton({
  text,
  onClick,
  showDot = true,
  strength = 0.35,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (isMobile) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-2 border border-white/40 px-3.5 py-1.5 rounded-full hover:bg-white hover:text-black transition-all group cursor-pointer ${className}`}
      >
        {showDot && (
          <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:bg-black transition-colors" />
        )}
        <span className="font-medium tracking-wide text-sm">{text}</span>
      </button>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      <button
        onClick={onClick}
        className="flex items-center gap-2 border border-white/40 px-3.5 py-1.5 rounded-full hover:bg-white hover:text-black transition-all group cursor-pointer"
      >
        {showDot && (
          <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:bg-black transition-colors" />
        )}
        <span className="font-medium tracking-wide text-sm">{text}</span>
      </button>
    </motion.div>
  );
}
