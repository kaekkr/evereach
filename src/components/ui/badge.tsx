import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "purple" | "emerald" | "indigo";
}

export function Badge({ children, variant = "purple" }: BadgeProps) {
  const styles = {
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  };

  return (
    <span className={`text-[10px] font-mono border px-2 py-0.5 rounded ${styles[variant]}`}>
      {children}
    </span>
  );
}
