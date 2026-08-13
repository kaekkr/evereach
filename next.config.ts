import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const BEAUTY_ORIGIN = isDev
  ? "http://localhost:3001"
  : "https://nails-studio-eight.vercel.app";

const AUTOSERVICE_ORIGIN = isDev
  ? "http://localhost:3002"
  : "https://karaso-organization.vercel.app";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async rewrites() {
    return [
      {
        source: "/beauty",
        destination: `${BEAUTY_ORIGIN}/beauty`,
      },
      {
        source: "/beauty/:path*",
        destination: `${BEAUTY_ORIGIN}/beauty/:path*`,
      },
      {
        source: "/autoservice",
        destination: `${AUTOSERVICE_ORIGIN}/autoservice`,
      },
      {
        source: "/autoservice/:path*",
        destination: `${AUTOSERVICE_ORIGIN}/autoservice/:path*`,
      },

    ];
  },
};

export default nextConfig;
