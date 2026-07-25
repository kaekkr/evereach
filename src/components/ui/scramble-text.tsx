"use client";

import { useState } from "react";

export function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

  const handleMouseEnter = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <span onMouseEnter={handleMouseEnter} className="inline-block cursor-default">
      {displayText}
    </span>
  );
}
