"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { CornerDownRight, ArrowRight, Sparkles } from "lucide-react";

interface ProductPreview {
  id: string;
  src: string;
  alt: string;
  href: string;
}

interface HeroProps {
  onStartProject?: () => void;
  previews?: ProductPreview[];
}

const DEFAULT_PREVIEWS: ProductPreview[] = [
  {
    id: "preview-1",
    src: "/meyirzhan.jpg", // Исправлено: путь от корня public/
    alt: "Product Preview 1",
    href: "https://www.linkedin.com/in/meiirzhan-amangeldi",
  },
  {
    id: "preview-2",
    src: "/lesha.jpg", // Исправлено: путь от корня public/
    alt: "Product Preview 2",
    href: "https://www.linkedin.com/in/aleks-hrabovskyi/",
  },
  {
    id: "preview-3",
    src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=200&auto=format&fit=crop",
    alt: "Product Preview 3",
    href: "https://www.linkedin.com/in/karassay-raushanbek/",
  },
];

export function Hero({
  onStartProject,
  previews = DEFAULT_PREVIEWS,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    if (onStartProject) {
      onStartProject();
    }
  };

  const hoverRotations = [-4, 4, -2];

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="pt-40 pb-24 px-6 max-w-6xl mx-auto flex flex-col justify-between min-h-[85vh] relative"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 text-[11px] border border-white/30 px-3 py-1 rounded-full"
        >
          <CornerDownRight className="w-3 h-3 opacity-60" />
          <span>Product Thinking • Visual Direction • Technical Execution</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tighter leading-[1.12]"
        >
          {/* --- 3 INLINE STACKED LINKED IMAGES --- */}
          <span className="mix-blend-difference">Digital products</span>

          <span className="inline-flex items-center gap-1.5 sm:gap-2 mx-2 align-middle -translate-y-1">
            {previews.slice(0, 3).map((item, index) => {
              const isExternal = item.href.startsWith("http");

              return (
                <motion.span
                  key={item.id}
                  whileHover={{
                    scale: 1.15,
                    rotate: hoverRotations[index] || 0,
                    zIndex: 30,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  className={`inline-block w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/20 shadow-xl relative bg-neutral-900 cursor-pointer ${
                    index > 0 ? "-ml-3 sm:-ml-5" : ""
                  }`}
                >
                  <Link
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={item.alt}
                    className="block w-full h-full relative"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 32px, (max-width: 768px) 48px, 56px"
                      className="object-cover"
                      priority
                    />
                  </Link>
                </motion.span>
              );
            })}
          </span>
          <br />
        
          <span className="mix-blend-difference">
            interfaces and systems <br />
            shaped from first idea <br />
            to working form
          </span>
          {/* --- PERFECTLY CIRCULAR MORPHING BUTTON --- */}
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
  {/* Иконка в свёрнутом состоянии */}
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

  {/* Текст + стрелка в раскрытом состоянии */}
  <motion.span
    animate={{
      opacity: isHovered ? 1 : 0,
      scale: isHovered ? 1 : 0.8,
    }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
    className="absolute inset-0 flex items-center justify-center gap-1.5 text-[11px] font-medium tracking-tight whitespace-nowrap text-purple-100 pointer-events-none"
  >
    START PROJECT
    <ArrowRight className="w-3.5 h-3.5 stroke-[2] shrink-0" />
  </motion.span>

  {/* Ripple */}
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
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-white/20 text-base">
        <div>
          <span className="block opacity-60 mb-1">POSITION</span>
          <p className="font-medium">Independent Studio & Engineering</p>
        </div>
        <div>
          <span className="block opacity-60 mb-1">AVAILABILITY</span>
          <p className="font-medium">Accepting Q3/Q4 Projects</p>
        </div>
        <div>
          <span className="block opacity-60 mb-1">STACK</span>
          <p className="font-medium">
            Next.js • TypeScript • Tailwind • Motion
          </p>
        </div>
      </div>
    </motion.section>
  );
}
