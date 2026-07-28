"use client";

import { CAPABILITIES } from "@/data/portfolioData";
import { CapabilityCard } from "./capability-card";

export function Capabilities() {
  return (
    <section
      id="about"
      className="py-24 px-6 max-w-6xl mx-auto border-t border-white/20"
    >
      <h2 className="mb-12 font-mono text-base md:text-sm opacity-60 uppercase tracking-widest">
        // SYSTEM CAPABILITIES
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CAPABILITIES.map((cap, i) => (
          <CapabilityCard key={cap.title || i} capability={cap} index={i} />
        ))}
      </div>
    </section>
  );
}
