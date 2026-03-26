import { getArticleBySlug } from "@/content/articles";
import { ArticlePage } from "@/components/ArticlePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const article = getArticleBySlug("best-budget-golf-simulators");

export const metadata: Metadata = article
  ? {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
      alternates: { canonical: "https://parpercision.com/best-budget-golf-simulators" },
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
  name: "Best Budget Golf Simulators Under $5,000 in 2026",
  description: "Affordable golf simulator packages ranked by value and accuracy.",
  numberOfItems: 3,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "SkyTrak MAX SIG10 Golf Simulator Package",
        description: "Best overall budget simulator. Complete package starting at $4,645.",
        brand: { "@type": "Brand", name: "SkyTrak" },
        offers: { "@type": "AggregateOffer", lowPrice: "4645", highPrice: "7700", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "324", bestRating: "5" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Uneekor EYE MINI LITE SIG8 Golf Simulator Package",
        description: "Most affordable overhead simulator. Starting at $4,800.",
        brand: { "@type": "Brand", name: "Uneekor" },
        offers: { "@type": "AggregateOffer", lowPrice: "4800", highPrice: "9300", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "4.5", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "96", bestRating: "5" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Garmin R10 DIY Golf Simulator Build",
        description: "Build a complete golf simulator for under $2,200 with the Garmin R10.",
        brand: { "@type": "Brand", name: "Garmin" },
        offers: { "@type": "AggregateOffer", lowPrice: "1600", highPrice: "2200", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "892", bestRating: "5" },
      },
    },
  ],
};

export default function BudgetSimulatorsPage() {
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
