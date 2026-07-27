"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, Check } from "lucide-react";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

const EMPTY = { name: "", email: "", details: "", website: "" };

export function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Сброс состояния при закрытии — иначе при повторном открытии
  // висит старая надпись "Sent" и заполненные поля
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setForm(EMPTY);
        setStatus("idle");
        setErrorMsg("");
      }, 300); // ждём окончания анимации выезда
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Не удалось отправить");

      setStatus("success");
      setTimeout(onClose, 2000); // сброс формы сделает useEffect выше
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Не удалось отправить");
    }
  };

  const inputCls =
    "w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-base text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors disabled:opacity-50";

  const isLocked = status === "loading" || status === "success";

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
                  aria-label="Close"
                  className="p-1 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-2xl font-sans font-light text-white mb-6">
                Let&apos;s build a system together.
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* honeypot: невидим для людей, боты заполняют */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div>
                  <label htmlFor="cd-name" className="text-[10px] text-neutral-500 block mb-1">
                    NAME
                  </label>
                  <input
                    id="cd-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={isLocked}
                    placeholder="Jane Doe"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label htmlFor="cd-email" className="text-[10px] text-neutral-500 block mb-1">
                    EMAIL
                  </label>
                  <input
                    id="cd-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={isLocked}
                    placeholder="jane@company.com"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label htmlFor="cd-details" className="text-[10px] text-neutral-500 block mb-1">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    id="cd-details"
                    rows={4}
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    required
                    disabled={isLocked}
                    placeholder="Scope, timeline, and requirements..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <motion.button
                  whileHover={!isLocked ? { scale: 1.02 } : undefined}
                  whileTap={!isLocked ? { scale: 0.98 } : undefined}
                  type="submit"
                  disabled={isLocked}
                  className="w-full py-3 bg-white text-black font-medium text-base rounded hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" && (
                    <>
                      Sending <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    </>
                  )}
                  {status === "success" && (
                    <>
                      Sent <Check className="w-3.5 h-3.5" />
                    </>
                  )}
                  {(status === "idle" || status === "error") && (
                    <>
                      Submit Inquiry <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </motion.button>

                <div aria-live="polite" className="min-h-[16px]">
                  {status === "error" && (
                    <p className="text-[11px] text-red-400">{errorMsg}</p>
                  )}
                  {status === "success" && (
                    <p className="text-[11px] text-green-400">
                      Your request has been sent — we will be in touch shortly.                   
                    </p>
                  )}
                </div>
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
