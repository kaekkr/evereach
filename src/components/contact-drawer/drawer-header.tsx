"use client";

import { X } from "lucide-react";

interface DrawerHeaderProps {
  label: string;
  onClose: () => void;
}

export function DrawerHeader({ label, onClose }: DrawerHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
      <span className="text-base uppercase tracking-widest text-neutral-400 font-mono">
        // {label}
      </span>
      <button
        onClick={onClose}
        aria-label="Close drawer"
        className="p-1 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
