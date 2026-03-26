import { MetadataRoute } from "next";
import { getAllArticles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://parpercision.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    // Pillar pages — highest priority
    { url: `${baseUrl}/best-golf-simulators`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/best-launch-monitors`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    // Category pages — high priority
    { url: `${baseUrl}/best-golf-simulators-small-spaces`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/best-budget-golf-simulators`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/best-portable-launch-monitors`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/best-overhead-launch-monitors`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    // Index pages
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/golf-tips`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    // Info pages
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    // Legal
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Original Next.js review pages (nested under /reviews/)
  const reviewSlugs = [
    "skytrak-plus", "garmin-approach-r10", "bushnell-launch-pro", "flightscope-mevo-plus",
  ];
  const reviewPages: MetadataRoute.Sitemap = reviewSlugs.map((slug) => ({
    url: `${baseUrl}/reviews/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Original guides
  const guideSlugs = [
    "golf-simulator-room-dimensions", "golf-simulator-cost", "how-to-build-golf-simulator",
  ];
  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Original comparisons
  const comparisonSlugs = ["garmin-r10-vs-skytrak-plus"];
  const comparisonPages: MetadataRoute.Sitemap = comparisonSlugs.map((slug) => ({
    url: `${baseUrl}/comparisons/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Original golf tips
  const tipSlugs = ["how-to-fix-a-slice", "how-to-increase-clubhead-speed"];
  const tipPages: MetadataRoute.Sitemap = tipSlugs.map((slug) => ({
    url: `${baseUrl}/golf-tips/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // All migrated WordPress articles (flat URLs at /)
  const allArticles = getAllArticles();
  const wpMigratedSlugs = new Set([
    "trackman-io-vs-trackman-4", "what-launch-monitor-does-bryson-dechambeau-use",
    "best-retractable-golf-simulators", "best-golf-simulators-for-small-spaces",
    "foresight-sports-gc3s-vs-gc3", "trackman-io-home-vs-complete",
    "foresight-sports-gchawk", "best-golf-simulators-for-business",
    "golf-swing-drills", "trackman-io-review", "protee-vx-review",
    "garmin-r50-vs-gc3", "golf-simulator-turf", "uneekor-eye-mini-lite",
    "uneekor-eye-xo2", "how-profitable-are-golf-simulators",
    "best-golf-simulators-for-garage-use", "hd-golf-simulator-ultimate-entertainment-package-review",
    "best-golf-launch-monitors-under-1000", "uneekor-qed", "foresight-falcon-review",
    "best-golf-simulators-for-the-money", "uneekor-eye-mini", "foresight-sports-gc3s",
    "garmin-approach-r50", "foresight-sports-gcquad", "best-golf-simulator-software",
    "basement-golf-simulator", "best-golf-simulators-for-home",
    "how-much-space-is-needed-for-a-golf-simulator", "foresight-sports-gc3",
    "what-is-the-best-golf-simulator", "best-swingbay-golf-simulators",
    "trugolf-apogee-review", "golf-swing-drill-for-beginners", "full-swing-kit-review",
    "bushnell-lpi", "best-golf-simulators-for-left-and-right-handed-use",
    "skytrak-vs-skytrak-plus-differences", "launch-monitor-vs-golf-simulator",
    "foresight-quadmax-review", "golf-simulator-cost-2026", "hd-golf-simulator",
    "bushnell-launch-pro-vs-skytrak-plus", "best-golf-launch-monitors",
    "why-are-golf-simulators-so-expensive", "what-is-the-most-accurate-launch-monitor",
    "what-launch-monitor-do-pros-use", "how-accurate-is-the-skytrak-plus",
    "best-golf-simulators-under-10000", "best-portable-golf-launch-monitors",
    "what-launch-monitor-does-tiger-woods-use", "skytrak-plus-for-beginners",
    "is-it-worth-buying-a-golf-launch-monitor", "launch-monitor-pros-use",
    "best-overhead-launch-monitors-review", "how-much-does-a-golf-launch-monitor-cost-find-out-here",
    "how-to-build-a-golf-simulator-2", "do-golf-simulators-improve-your-game",
    "golf-simulator-setup", "how-to-build-a-golf-simulator-mancave",
    "how-to-set-up-a-golf-simulator-in-a-small-room",
  ]);

  const wpPages: MetadataRoute.Sitemap = Array.from(wpMigratedSlugs).map((slug) => {
    const article = allArticles.find((a) => a.slug === slug);
    return {
      url: `${baseUrl}/${slug}`,
      lastModified: article ? new Date(article.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    };
  });

  return [
    ...staticPages,
    ...reviewPages,
    ...guidePages,
    ...comparisonPages,
    ...tipPages,
    ...wpPages,
  ];
}
