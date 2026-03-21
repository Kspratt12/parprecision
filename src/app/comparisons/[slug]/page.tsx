import { getArticleBySlug, articles } from "@/content/articles";
import { ArticlePage } from "@/components/ArticlePage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `https://parprecision.com/comparisons/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.coverImageAlt }],
    },
  };
}

export function generateStaticParams() {
  return articles
    .filter((a) => a.category === "comparisons")
    .map((a) => ({ slug: a.slug }));
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return notFound();
  return <ArticlePage article={article} />;
}
