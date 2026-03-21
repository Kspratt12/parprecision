import { MetadataRoute } from "next";
import { getAllArticles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://parprecision.com";

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

  // Individual reviews
  const reviewSlugs = [
    "skytrak-plus", "garmin-approach-r10", "bushnell-launch-pro", "flightscope-mevo-plus",
  ];
  const reviewPages: MetadataRoute.Sitemap = reviewSlugs.map((slug) => ({
    url: `${baseUrl}/reviews/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Guides
  const guideSlugs = [
    "golf-simulator-room-dimensions", "golf-simulator-cost", "how-to-build-golf-simulator",
  ];
  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Comparisons
  const comparisonSlugs = ["garmin-r10-vs-skytrak-plus"];
  const comparisonPages: MetadataRoute.Sitemap = comparisonSlugs.map((slug) => ({
    url: `${baseUrl}/comparisons/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Golf tips
  const tipSlugs = ["how-to-fix-a-slice", "how-to-increase-clubhead-speed"];
  const tipPages: MetadataRoute.Sitemap = tipSlugs.map((slug) => ({
    url: `${baseUrl}/golf-tips/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...reviewPages, ...guidePages, ...comparisonPages, ...tipPages];
}
