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
      // === Post-Vercel articles removed — redirect to WP equivalents ===
      { source: "/best-golf-simulators", destination: "/best-golf-simulators-for-home", permanent: true },
      { source: "/best-golf-simulators-small-spaces", destination: "/best-golf-simulators-for-small-spaces", permanent: true },
      { source: "/best-budget-golf-simulators", destination: "/best-golf-simulators-for-the-money", permanent: true },
      { source: "/best-launch-monitors", destination: "/best-golf-launch-monitors", permanent: true },
      { source: "/best-portable-launch-monitors", destination: "/best-portable-golf-launch-monitors", permanent: true },
      { source: "/best-overhead-launch-monitors", destination: "/best-overhead-launch-monitors-review", permanent: true },
      { source: "/guides/golf-simulator-cost", destination: "/golf-simulator-cost-2026", permanent: true },
      { source: "/guides/golf-simulator-room-dimensions", destination: "/how-much-space-is-needed-for-a-golf-simulator", permanent: true },
      { source: "/guides/how-to-build-golf-simulator", destination: "/how-to-build-a-golf-simulator-2", permanent: true },

      // === WordPress category pages ===
      { source: "/category/best-golf-simulators", destination: "/best-golf-simulators-for-home", permanent: true },
      { source: "/category/best-portable-launch-monitor", destination: "/best-portable-golf-launch-monitors", permanent: true },
      { source: "/category/best-overhead-launch-monitors", destination: "/best-overhead-launch-monitors-review", permanent: true },
      { source: "/category/golf/:path*", destination: "/blog", permanent: true },

      // WordPress pagination pages
      { source: "/page/:num", destination: "/blog", permanent: true },

      // WordPress author pages
      { source: "/author/:slug", destination: "/about", permanent: true },

      // Old about/contact URLs
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },

      // Duplicate content redirects
      { source: "/best-golf-simulators-for-small-spaces-5", destination: "/best-golf-simulators-for-small-spaces", permanent: true },
      { source: "/best-overhead-launch-monitors-8", destination: "/best-overhead-launch-monitors-review", permanent: true },

      // Removed corny Next.js review articles — redirect to WP equivalents
      { source: "/reviews/skytrak-plus", destination: "/skytrak-plus-for-beginners", permanent: true },
      { source: "/reviews/bushnell-launch-pro", destination: "/bushnell-lpi", permanent: true },
      { source: "/reviews/garmin-approach-r10", destination: "/garmin-approach-r50", permanent: true },
      { source: "/reviews/flightscope-mevo-plus", destination: "/best-golf-launch-monitors", permanent: true },

      // Removed corny Next.js comparison articles — redirect to WP equivalents
      { source: "/comparisons/garmin-r10-vs-skytrak-plus", destination: "/bushnell-launch-pro-vs-skytrak-plus", permanent: true },

      // Removed corny Next.js golf tip articles — redirect to WP equivalents
      { source: "/golf-tips/how-to-fix-a-slice", destination: "/golf-swing-drills", permanent: true },
      { source: "/golf-tips/how-to-increase-clubhead-speed", destination: "/golf-swing-drills", permanent: true },

      // Next.js list pages → WP equivalents
      { source: "/reviews/best-launch-monitors", destination: "/best-golf-launch-monitors", permanent: true },
      { source: "/reviews/best-overhead-launch-monitors", destination: "/best-overhead-launch-monitors-review", permanent: true },
      { source: "/reviews/best-portable-launch-monitors", destination: "/best-portable-golf-launch-monitors", permanent: true },
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
