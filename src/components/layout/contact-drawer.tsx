"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0d0d0d] border-l border-neutral-800 p-8 z-50 flex flex-col justify-between overflow-y-auto text-white"
          >
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
                <span className="text-base uppercase tracking-widest text-neutral-400">
                  // CONTACT DRAWER
                </span>
                <button
                  onClick={onClose}
                  className="p-1 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-2xl font-sans font-light text-white mb-6">
                Let's build a system together.
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] text-neutral-500 block mb-1">
                    NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-base text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-500 block mb-1">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-base text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-500 block mb-1">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Scope, timeline, and requirements..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-base text-white focus:outline-none focus:border-white resize-none transition-colors"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-white text-black font-medium text-base rounded hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  Submit Inquiry <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </form>
            </div>

            <div className="pt-8 text-[10px] text-neutral-600 border-t border-neutral-800">
              Direct Contact: hello@evereach.com
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
