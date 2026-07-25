export interface EstimatorOption {
  id: string;
  label: string;
  description: string;
  basePrice: number;
  estimatedWeeks: number;
}

export interface ServiceCategory {
  id: string;
  title: string;
  type: "single" | "multiple";
  options: EstimatorOption[];
}

export const ESTIMATOR_CATEGORIES: ServiceCategory[] = [
  {
    id: "project_type",
    title: "01 // PROJECT TYPE",
    type: "single",
    options: [
      {
        id: "landing",
        label: "Design & Landing Page",
        description: "High-converting marketing site with custom motion & animations.",
        basePrice: 4500,
        estimatedWeeks: 2,
      },
      {
        id: "web_app",
        label: "Full Web Application",
        description: "Complex Next.js SaaS, dashboard, or client portal with API integrations.",
        basePrice: 12000,
        estimatedWeeks: 5,
      },
      {
        id: "design_system",
        label: "Design System & Rebrand",
        description: "Component library, brand guidelines, and visual identity.",
        basePrice: 6500,
        estimatedWeeks: 3,
      },
    ],
  },
  {
    id: "addons",
    title: "02 // ENHANCEMENTS & ADD-ONS",
    type: "multiple",
    options: [
      {
        id: "3d_webgl",
        label: "3D / WebGL / Canvas",
        description: "Interactive shaders, Three.js scenes, or GPU visual effects.",
        basePrice: 2500,
        estimatedWeeks: 1,
      },
      {
        id: "cms",
        label: "Headless CMS Setup",
        description: "Sanity, Strapi, or Payload integration for full content control.",
        basePrice: 1800,
        estimatedWeeks: 1,
      },
      {
        id: "analytics",
        label: "Telemetry & Performance Audit",
        description: "Lighthouse optimization, event tracking, and conversion funnels.",
        basePrice: 1200,
        estimatedWeeks: 1,
      },
    ],
  },
  {
    id: "speed",
    title: "03 // DELIVERY SPEED",
    type: "single",
    options: [
      {
        id: "standard",
        label: "Standard Pace",
        description: "Regular sprint cycles and structured milestones.",
        basePrice: 0,
        estimatedWeeks: 0,
      },
      {
        id: "rush",
        label: "Accelerated Sprint (+25%)",
        description: "Dedicated priority resources to compress time-to-market.",
        basePrice: 0, // Calculated dynamically
        estimatedWeeks: -1,
      },
    ],
  },
];
