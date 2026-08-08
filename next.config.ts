import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/beauty",
        destination: "https://nails-studio-eight.vercel.app",
      },
      {
        source: "/beauty/:path*",
        destination: "https://nails-studio-eight.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
