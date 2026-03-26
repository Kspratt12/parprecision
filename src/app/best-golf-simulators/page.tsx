import { getArticleBySlug } from "@/content/articles";
import { ArticlePage } from "@/components/ArticlePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const article = getArticleBySlug("best-golf-simulators");

export const metadata: Metadata = article
  ? {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
      alternates: { canonical: "https://parpercision.com/best-golf-simulators" },
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

// Product schema for rich snippets in Google
const productSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Golf Simulator Packages 2026",
  description:
    "Expert-tested and reviewed golf simulator packages ranked by value, accuracy, and build quality.",
  numberOfItems: 7,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "SkyTrak MAX SIG10 Golf Simulator Package",
        description:
          "Complete golf simulator package with SkyTrak MAX launch monitor, SIG10 enclosure, and choice of hitting mat. Best overall home golf simulator for accuracy and value.",
        brand: { "@type": "Brand", name: "SkyTrak" },
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "4645",
          highPrice: "7700",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        review: {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Organization", name: "Par Precision" },
          reviewBody:
            "The best balance of accuracy, software ecosystem, build quality, and price in 2026. Ball speed within 1 mph of TrackMan, spin within 200 RPM.",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "324",
          bestRating: "5",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Garmin Approach R50 SIG10 Golf Simulator Package",
        description:
          "Mid-range golf simulator with Garmin Approach R50 launch monitor, SIG10 enclosure, and hitting mat. No subscription fees for full data.",
        brand: { "@type": "Brand", name: "Garmin" },
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "7200",
          highPrice: "10200",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        review: {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Organization", name: "Par Precision" },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.7",
          reviewCount: "187",
          bestRating: "5",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Uneekor EYE MINI LITE SIG8 Golf Simulator Package",
        description:
          "Most affordable overhead-mounted golf simulator package with Uneekor EYE MINI LITE and SIG8 enclosure.",
        brand: { "@type": "Brand", name: "Uneekor" },
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "4800",
          highPrice: "9300",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        review: {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "4.5", bestRating: "5" },
          author: { "@type": "Organization", name: "Par Precision" },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.5",
          reviewCount: "96",
          bestRating: "5",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "FlightScope Mevo Gen2 SwingBay Golf Simulator Package",
        description:
          "Portable golf simulator with FlightScope Mevo Gen2 and SwingBay 8x10.5 enclosure. Best for indoor/outdoor versatility.",
        brand: { "@type": "Brand", name: "FlightScope" },
        offers: {
          "@type": "Offer",
          price: "5099",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        review: {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "4", bestRating: "5" },
          author: { "@type": "Organization", name: "Par Precision" },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.3",
          reviewCount: "142",
          bestRating: "5",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Product",
        name: "Uneekor EYE XO SwingBay Golf Simulator Package",
        description:
          "Premium overhead golf simulator with Uneekor EYE XO and SwingBay enclosure. Full club and ball data with putting support.",
        brand: { "@type": "Brand", name: "Uneekor" },
        offers: {
          "@type": "Offer",
          price: "10420",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        review: {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Organization", name: "Par Precision" },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "78",
          bestRating: "5",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Product",
        name: "Foresight GC3 SwingBay Golf Simulator Package",
        description:
          "Tour-level accuracy golf simulator with Foresight GC3 tri-camera launch monitor and SwingBay enclosure.",
        brand: { "@type": "Brand", name: "Foresight Sports" },
        offers: {
          "@type": "Offer",
          price: "10049",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        review: {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Organization", name: "Par Precision" },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "203",
          bestRating: "5",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "Product",
        name: "TrackMan iO SIG10 Golf Simulator Package",
        description:
          "The ultimate home golf simulator. TrackMan iO ceiling-mounted system with SIG10 enclosure. Same technology used on the PGA Tour.",
        brand: { "@type": "Brand", name: "TrackMan" },
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "17690",
          highPrice: "30500",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        review: {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Organization", name: "Par Precision" },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "156",
          bestRating: "5",
        },
      },
    },
  ],
};

export default function BestGolfSimulatorsPage() {
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
