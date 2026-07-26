"use client";

import { motion, Variants } from "framer-motion";

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function KineticText({
  text,
  className = "",
  delay = 0,
}: KineticTextProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -20,
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden mr-[0.25em] py-1"
        >
          <motion.span variants={child} className="inline-block transform-gpu">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
