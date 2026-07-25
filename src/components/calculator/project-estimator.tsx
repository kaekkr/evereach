"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Calculator } from "lucide-react";
import { ESTIMATOR_CATEGORIES } from "@/data/estimatorData";

interface ProjectEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption?: () => void;
}

export function ProjectEstimator({ isOpen, onClose }: ProjectEstimatorProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState<Record<string, string>>({
    project_type: "landing",
    speed: "standard",
  });

  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling cleanly
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMultiple = (id: string) => {
    setSelectedMultiple((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const setSingle = (categoryId: string, optionId: string) => {
    setSelectedSingle((prev) => ({ ...prev, [categoryId]: optionId }));
  };

  const { totalPrice, totalWeeks } = useMemo(() => {
    let price = 0;
    let weeks = 0;

    Object.entries(selectedSingle).forEach(([catId, optId]) => {
      const cat = ESTIMATOR_CATEGORIES.find((c) => c.id === catId);
      const opt = cat?.options.find((o) => o.id === optId);
      if (opt) {
        price += opt.basePrice;
        weeks += opt.estimatedWeeks;
      }
    });

    selectedMultiple.forEach((optId) => {
      const cat = ESTIMATOR_CATEGORIES.find((c) => c.id === "addons");
      const opt = cat?.options.find((o) => o.id === optId);
      if (opt) {
        price += opt.basePrice;
        weeks += opt.estimatedWeeks;
      }
    });

    if (selectedSingle.speed === "rush") {
      price = Math.round(price * 1.25);
    }

    return { totalPrice: price, totalWeeks: Math.max(1, weeks) };
  }, [selectedSingle, selectedMultiple]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] font-mono pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen h-[100dvh] w-full max-w-xl bg-[#0a0a0a] border-l border-neutral-800 text-white shadow-2xl flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="p-6 md:p-8 pb-4 border-b border-neutral-800 flex items-center justify-between bg-[#0a0a0a] shrink-0">
              <div className="flex items-center gap-2 text-base uppercase tracking-widest text-neutral-400">
                <Calculator className="w-4 h-4 text-white" />
                <span>// SCOPE & BUDGET ESTIMATOR</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div
              className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 overscroll-contain"
              onWheel={(e) => e.stopPropagation()} // Stop smooth-scroll libraries (e.g. Lenis) from hijacking mousewheel
            >
              {ESTIMATOR_CATEGORIES.map((category) => (
                <div key={category.id} className="space-y-3">
                  <h4 className="text-base text-neutral-500 tracking-wider">
                    {category.title}
                  </h4>

                  <div className="grid grid-cols-1 gap-2.5">
                    {category.options.map((opt) => {
                      const isSelected =
                        category.type === "single"
                          ? selectedSingle[category.id] === opt.id
                          : selectedMultiple.includes(opt.id);

                      return (
                        <div
                          key={opt.id}
                          onClick={() =>
                            category.type === "single"
                              ? setSingle(category.id, opt.id)
                              : toggleMultiple(opt.id)
                          }
                          className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-start justify-between gap-4 ${
                            isSelected
                              ? "bg-neutral-900 border-white text-white"
                              : "bg-neutral-950/50 border-neutral-800/80 text-neutral-400 hover:border-neutral-700"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-base font-sans font-medium text-white">
                                {opt.label}
                              </span>
                              {opt.basePrice > 0 && (
                                <span className="text-[10px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                                  +${opt.basePrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] font-sans text-neutral-500 leading-relaxed">
                              {opt.description}
                            </p>
                          </div>

                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? "bg-white border-white text-black"
                                : "border-neutral-700"
                            }`}
                          >
                            {isSelected && (
                              <Check className="w-3 h-3 stroke-[3]" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t border-neutral-800 bg-[#0a0a0a] shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">
                    Estimated Investment
                  </span>
                  <span className="text-2xl font-sans font-semibold text-white">
                    ${totalPrice.toLocaleString()} USD
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-neutral-500 uppercase block">
                    Timeline
                  </span>
                  <span className="text-sm font-medium text-neutral-300">
                    ~ {totalWeeks} {totalWeeks === 1 ? "Week" : "Weeks"}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onClose}
                className="w-full py-3.5 bg-white text-black font-medium text-base rounded hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Proposal with this Scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
