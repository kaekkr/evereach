"use client";

export function HeroMeta() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-white/20 text-base">
      <div>
        <span className="block opacity-60 mb-1">PRACTICE</span>
        <p className="font-medium">Independent product studio</p>
      </div>
      <div>
        <span className="block opacity-60 mb-1">AVAILABILITY</span>
        <p className="font-medium">Open for new collaborations</p>
      </div>
      <div>
        <span className="block opacity-60 mb-1">FOCUS</span>
        <p className="font-medium">
          Web & mobile products of any scale
        </p>
      </div>
    </div>
  );
}
