export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  image: string;
}

export interface Capability {
  title: string;
  desc: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Aura Health",
    category: "Product",
    year: "2026",
    summary: "Precision wellness dashboard built for high-throughput tracking & telemetry.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "KuDAGI",
    category: "AI",
    year: "2026",
    summary: "Enterprise vector search engine & automated document indexing agent.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "OmniCRM",
    category: "SaaS",
    year: "2025",
    summary: "Sales analytics platform with customizable pipeline micro-interactions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Vortex Pay",
    category: "Fintech",
    year: "2025",
    summary: "Zero-friction payment flow with real-time currency conversion routing.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
  },
];

export const CAPABILITIES: Capability[] = [
  {
    title: "Product Thinking",
    desc: "Architecture design, user journey mapping, and component design systems.",
  },
  {
    title: "Visual Direction",
    desc: "Editorial layouts, typography composition, dark-mode mastery, and motion design.",
  },
  {
    title: "Technical Execution",
    desc: "Next.js App Router, TypeScript, smooth scroll engines, and low-latency APIs.",
  },
];

export const CATEGORIES = ["ALL", "Product", "AI", "SaaS", "Fintech"];
