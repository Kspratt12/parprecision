import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "parpercision.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  async redirects() {
    return [
      // WordPress URL pattern changes — 301 redirects to preserve SEO equity
      // Old WordPress had trailing slashes, Next.js doesn't — Vercel handles this automatically

      // URLs that changed structure in the Next.js revamp
      { source: "/best-golf-simulators-for-small-spaces", destination: "/best-golf-simulators-small-spaces", permanent: true },
      { source: "/best-golf-simulators-for-small-spaces/:path*", destination: "/best-golf-simulators-small-spaces", permanent: true },

      // WordPress category pages → Next.js equivalents
      { source: "/category/best-golf-simulators", destination: "/best-golf-simulators", permanent: true },
      { source: "/category/best-portable-launch-monitor", destination: "/best-portable-launch-monitors", permanent: true },
      { source: "/category/best-overhead-launch-monitors", destination: "/best-overhead-launch-monitors", permanent: true },
      { source: "/category/golf/:path*", destination: "/blog", permanent: true },

      // WordPress pagination pages
      { source: "/page/:num", destination: "/blog", permanent: true },

      // WordPress author pages
      { source: "/author/:slug", destination: "/about", permanent: true },

      // Old WordPress uploads (images) — keep serving from Hostinger for now
      // { source: "/wp-content/uploads/:path*", destination: "https://your-hostinger-temp-url/wp-content/uploads/:path*", permanent: false },

      // Old about/contact URLs
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },

      // Duplicate content redirects
      { source: "/best-golf-simulators-for-small-spaces-5", destination: "/best-golf-simulators-small-spaces", permanent: true },
      { source: "/best-overhead-launch-monitors-8", destination: "/best-overhead-launch-monitors", permanent: true },
      { source: "/best-overhead-launch-monitors-review", destination: "/best-overhead-launch-monitors", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
