"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour12: false, timeZone: "UTC" }) +
        " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="hidden md:flex items-center gap-8 opacity-80 text-sm">
      <a
        href="#work"
        className="hover:opacity-100 transition-opacity cursor-pointer"
      >
        WORK
      </a>
      <a
        href="#about"
        className="hover:opacity-100 transition-opacity cursor-pointer"
      >
        CAPABILITIES
      </a>
      <span className="opacity-40">|</span>
      <span className="font-mono">{time || "12:00:00 UTC"}</span>
    </nav>
  );
}
