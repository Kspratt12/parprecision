import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Page Not Found
      </h2>
      <p className="text-muted mb-10 text-lg">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Check out our most popular guides instead:
      </p>

      <div className="grid gap-3 text-left max-w-md mx-auto mb-10">
        {[
          {
            href: "/best-golf-simulators-for-home",
            label: "7 Best Golf Simulators for Home in 2026",
          },
          {
            href: "/best-golf-launch-monitors",
            label: "Best Golf Launch Monitors Reviewed",
          },
          {
            href: "/golf-simulator-cost-2026",
            label: "Golf Simulator Cost Guide",
          },
          {
            href: "/how-much-space-is-needed-for-a-golf-simulator",
            label: "Room Dimensions Guide",
          },
          {
            href: "/best-golf-simulators-for-small-spaces",
            label: "Best Simulators for Small Spaces",
          },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-lg hover:border-primary hover:text-primary transition-colors text-foreground font-medium"
          >
            <span className="text-primary">&#8594;</span>
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  );
}
