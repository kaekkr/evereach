import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { AnimatedBackground } from "@/components/ui/animated-background";

const inter = DM_Sans({ subsets: ["latin"] });

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
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white`}
      >
        <SmoothScroll>
          <AnimatedBackground />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
