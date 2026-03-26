import { getArticleBySlug } from "@/content/articles";
import { ArticlePage } from "@/components/ArticlePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const article = getArticleBySlug("how-to-build-golf-simulator");

export const metadata: Metadata = article
  ? {
      title: article.title,
      description: article.description,
      keywords: article.keywords,
      alternates: { canonical: "https://parpercision.com/guides/how-to-build-golf-simulator" },
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        publishedTime: article.date,
        images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.coverImageAlt }],
      },
      twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [article.coverImage] },
    }
  : {};

export default function BuildGuidePage() {
  if (!article) return notFound();
  return <ArticlePage article={article} />;
}
