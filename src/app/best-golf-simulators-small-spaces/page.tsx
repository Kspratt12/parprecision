import { getArticleBySlug } from "@/content/articles";
import { ArticlePage } from "@/components/ArticlePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const article = getArticleBySlug("best-golf-simulators-small-spaces");

export const metadata: Metadata = article
  ? {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
      alternates: { canonical: "https://parprecision.com/best-golf-simulators-small-spaces" },
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
  name: "Best Golf Simulators for Small Spaces 2026",
  description: "Golf simulator packages tested and ranked for low ceilings and tight rooms.",
  numberOfItems: 3,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Uneekor EYE MINI LITE SIG8 Golf Simulator Package",
        description: "Best overhead simulator for small spaces. No floor space needed, works in 8-foot ceilings.",
        brand: { "@type": "Brand", name: "Uneekor" },
        offers: { "@type": "AggregateOffer", lowPrice: "4800", highPrice: "9300", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "96", bestRating: "5" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "SkyTrak MAX SIG10 Golf Simulator Package",
        description: "Best floor-mount simulator for tight rooms. Camera-based, no space behind ball needed.",
        brand: { "@type": "Brand", name: "SkyTrak" },
        offers: { "@type": "AggregateOffer", lowPrice: "4645", highPrice: "7700", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "324", bestRating: "5" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "FlightScope Mevo Gen2 SwingBay Golf Simulator Package",
        description: "Compact SwingBay enclosure for small spaces. Portable launch monitor for dual use.",
        brand: { "@type": "Brand", name: "FlightScope" },
        offers: { "@type": "Offer", price: "5099", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" }, author: { "@type": "Organization", name: "Par Precision" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.3", reviewCount: "142", bestRating: "5" },
      },
    },
  ],
};

export default function SmallSpacesPage() {
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
