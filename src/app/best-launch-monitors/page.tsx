import { getArticleBySlug } from "@/content/articles";
import { ArticlePage } from "@/components/ArticlePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const article = getArticleBySlug("best-launch-monitors");

export const metadata: Metadata = article
  ? {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
      alternates: { canonical: "https://parpercision.com/best-launch-monitors" },
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        publishedTime: article.date,
        authors: [article.author],
        images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.coverImageAlt }],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.description,
        images: [article.coverImage],
      },
    }
  : {};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Golf Launch Monitors 2026",
  description: "Expert-tested golf launch monitors ranked by accuracy, features, and value.",
  numberOfItems: 7,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "SkyTrak MAX",
        description: "Dual Doppler radar + photometric camera launch monitor. Best overall for home simulators.",
        brand: { "@type": "Brand", name: "SkyTrak" },
        offers: { "@type": "Offer", price: "2995", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "324", bestRating: "5" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Garmin Approach R10",
        description: "Budget Doppler radar launch monitor with 15+ data points. Best under $1,000.",
        brand: { "@type": "Brand", name: "Garmin" },
        offers: { "@type": "Offer", price: "599", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "892", bestRating: "5" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Foresight GC3",
        description: "Tri-camera photometric launch monitor. Tour-level accuracy trusted by PGA professionals.",
        brand: { "@type": "Brand", name: "Foresight Sports" },
        offers: { "@type": "Offer", price: "7500", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "203", bestRating: "5" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "FlightScope Mevo Gen2",
        description: "3D Doppler radar + fusion camera. Best portable launch monitor for indoor/outdoor use.",
        brand: { "@type": "Brand", name: "FlightScope" },
        offers: { "@type": "Offer", price: "2199", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.3", reviewCount: "142", bestRating: "5" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Product",
        name: "Bushnell Launch Pro",
        description: "Foresight GC3 hardware at a lower entry price with subscription model.",
        brand: { "@type": "Brand", name: "Bushnell" },
        offers: { "@type": "Offer", price: "3000", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "4.5", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.6", reviewCount: "167", bestRating: "5" },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Product",
        name: "Garmin Approach R50",
        description: "Advanced radar launch monitor with improved spin accuracy. No subscription fees.",
        brand: { "@type": "Brand", name: "Garmin" },
        offers: { "@type": "Offer", price: "3500", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "4.5", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "87", bestRating: "5" },
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "Product",
        name: "Uneekor EYE MINI LITE",
        description: "Overhead-mounted camera launch monitor. Most affordable ceiling-mount option with putting support.",
        brand: { "@type": "Brand", name: "Uneekor" },
        offers: { "@type": "Offer", price: "3200", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "4.5", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "96", bestRating: "5" },
      },
    },
  ],
};

export default function BestLaunchMonitorsPage() {
  if (!article) return notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ArticlePage article={article} />
    </>
  );
}
