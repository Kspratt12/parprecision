import { getArticleBySlug } from "@/content/articles";
import { ArticlePage } from "@/components/ArticlePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const article = getArticleBySlug("golf-simulator-cost");

export const metadata: Metadata = article
  ? {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
      alternates: { canonical: `https://parprecision.com/guides/golf-simulator-cost` },
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        publishedTime: article.date,
        authors: [article.author],
        images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.coverImageAlt }],
      },
    }
  : {};

export default function SimulatorCostPage() {
  if (!article) return notFound();
  return <ArticlePage article={article} />;
}
