export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  image: string;
  link?: string;
}

export interface Capability {
  title: string;
  desc: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "I-Know",
    category: "Education",
    year: "2025",
    summary:
      "Digital Pre-School Assistant — a unified platform connecting educators, parents, and administrators around the child.",
    image:
      "/I_Know_Digital_Assistant.png",
    link: "https://www.behance.net/gallery/237908041/I-Know-SaaS-Landing-Page-Design"
  },
  {
    id: "02",
    title: "Spalena 53",
    category: "Marketplace",
    year: "2025",
    summary:
      "A platform for discovering and acquiring books, antiquarian items, and rare collectibles.",
    image:
      "/spalena.png",
    link: "https://www.behance.net/gallery/240460149/Spalena-53-E-commerce-UXUI-Redesign"
  },
  {
    id: "03",
    title: "Kudagi",
    category: "E-commerce",
    year: "2025",
    summary:
      "Mobile-first clothing ordering app built with React Native (PWA-ready), including a full admin panel for inventory and order management.",
    image:
      "/kudagi.png",
    link: ""
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
