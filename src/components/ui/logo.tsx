"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      href="#"
      onClick={scrollToTop}
      className={`hover:opacity-80 transition-opacity flex items-center group ${className}`}
    >
      <div className="h-8 w-28 md:h-10 md:w-36 relative flex items-center justify-start">
        <Image
          src="/Old_Logo_Inverted.svg"
          alt="Evereach Logo"
          fill
          priority
          className="object-contain object-left"
        />
      </div>
    </a>
  );
}
