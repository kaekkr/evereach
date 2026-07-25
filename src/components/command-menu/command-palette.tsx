"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, Zap, Mail, ArrowRight, Command } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEstimator: () => void;
  onOpenContact: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenEstimator,
  onOpenContact,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null; // Toggle handle managed in root
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    {
      id: "estimator",
      label: "Open Budget Estimator",
      icon: Zap,
      action: () => {
        onClose();
        onOpenEstimator();
      },
    },
    {
      id: "contact",
      label: "Start a Project / Send Inquiry",
      icon: Mail,
      action: () => {
        onClose();
        onOpenContact();
      },
    },
    {
      id: "work",
      label: "Jump to Selected Work",
      icon: Folder,
      action: () => {
        onClose();
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "capabilities",
      label: "Jump to Capabilities",
      icon: Command,
      action: () => {
        onClose();
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-60"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-[#0d0d0d] border border-neutral-800 rounded-xl p-3 shadow-2xl z-60 text-white font-mono"
          >
            <div className="flex items-center gap-3 px-3 py-2 border-b border-neutral-800">
              <Search className="w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-base text-white placeholder-neutral-500 focus:outline-none"
                autoFocus
              />
              <span className="text-[10px] text-neutral-600 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded">
                ESC
              </span>
            </div>

            <div className="mt-2 space-y-1 max-h-60 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg text-base hover:bg-neutral-800/70 text-neutral-300 hover:text-white transition-colors group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-base text-neutral-600">
                  No matching commands found.
                </div>
              )}
            </div>

            <div className="mt-2 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-600 px-2">
              <span>Navigation Shortcut</span>
              <span className="flex items-center gap-1 font-sans">
                <kbd className="bg-neutral-900 border border-neutral-800 px-1 rounded">
                  ⌘
                </kbd>
                <kbd className="bg-neutral-900 border border-neutral-800 px-1 rounded">
                  K
                </kbd>
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
