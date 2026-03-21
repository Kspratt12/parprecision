import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://parprecision.com";

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/best-golf-simulators`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${baseUrl}/best-launch-monitors`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${baseUrl}/best-golf-simulators-small-spaces`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/best-budget-golf-simulators`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/best-portable-launch-monitors`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/best-overhead-launch-monitors`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/golf-tips`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/newsletter`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  // Review pages
  const reviews = [
    "skytrak-plus", "garmin-approach-r10", "bushnell-launch-pro",
    "flightscope-mevo-plus", "rapsodo-mlm2pro", "trackman-io",
    "foresight-gc3", "trugolf-apogee", "uneekor-eye-xo2",
  ];
  const reviewPages = reviews.map((slug) => ({
    url: `${baseUrl}/reviews/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Guide pages
  const guides = [
    "golf-simulator-room-dimensions", "golf-simulator-cost",
    "how-to-build-golf-simulator", "best-golf-simulator-projectors",
    "best-golf-simulator-screens", "best-golf-simulator-mats",
  ];
  const guidePages = guides.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Comparison pages
  const comparisons = [
    "garmin-r10-vs-skytrak-plus", "bushnell-launch-pro-vs-skytrak-plus",
    "skytrak-vs-mevo-plus", "trackman-vs-foresight",
  ];
  const comparisonPages = comparisons.map((slug) => ({
    url: `${baseUrl}/comparisons/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...reviewPages, ...guidePages, ...comparisonPages];
}
