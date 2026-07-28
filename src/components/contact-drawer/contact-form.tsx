"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Check } from "lucide-react";

export type FormStatus = "idle" | "loading" | "success" | "error";

interface ContactFormProps {
  onSuccess: () => void;
  status: FormStatus;
  setStatus: (status: FormStatus) => void;
  form: { name: string; email: string; details: string; website: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; details: string; website: string }>>;
}

const inputCls =
  "w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-base text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors disabled:opacity-50";

export function ContactForm({
  onSuccess,
  status,
  setStatus,
  form,
  setForm,
}: ContactFormProps) {
  const [errorMsg, setErrorMsg] = useState("");

  const isLocked = status === "loading" || status === "success";

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

      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setStatus("success");
      setTimeout(onSuccess, 2000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field for bot prevention */}
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
        <label htmlFor="cd-name" className="text-[10px] text-neutral-500 block mb-1 font-mono">
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
        <label htmlFor="cd-email" className="text-[10px] text-neutral-500 block mb-1 font-mono">
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
        <label htmlFor="cd-details" className="text-[10px] text-neutral-500 block mb-1 font-mono">
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
  );
}
