"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactForm, FormStatus } from "./contact-form";
import { DrawerHeader } from "./drawer-header";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM = { name: "", email: "", details: "", website: "" };

export function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setForm(EMPTY_FORM);
        setStatus("idle");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0d0d0d] border-l border-neutral-800 p-8 pt-6 z-[100] flex flex-col justify-between overflow-y-auto text-white" // z-[100] ensures it stays ABOVE the site navbar
          >
            <div>
              <DrawerHeader label="CONTACT DRAWER" onClose={onClose} />

              <h3 className="text-2xl font-sans font-light text-white mb-6">
                Let&apos;s build a system together.
              </h3>

              <ContactForm
                form={form}
                setForm={setForm}
                status={status}
                setStatus={setStatus}
                onSuccess={onClose}
              />
            </div>

            <div className="pt-8 text-[10px] text-neutral-600 border-t border-neutral-800 font-mono">
              Direct Contact: hello@evereach.com
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
