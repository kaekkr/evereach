import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const dm_sans = DM_Sans({ weight: "400" });

export const metadata: Metadata = {
  title: "EveReach — Digital Product Studio",
  description: "Crafting modern software, web platforms, and AI systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dm_sans.className} bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
