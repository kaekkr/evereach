"use client";

export function HeroMeta() {
  return (
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
  );
}
