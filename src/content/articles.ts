export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: "simulators" | "launch-monitors" | "guides" | "comparisons" | "golf-tips";
  categoryLabel: string;
  keywords: string[];
  readingTime: string;
  coverImage: string;
  coverImageAlt: string;
  content: string;
  featured?: boolean;
}

import { wpReviewArticles } from "./wp-reviews";
import { wpComparisonArticles } from "./wp-comparisons";
import { wpSimulatorArticles } from "./wp-simulators";
import { wpGolfTipArticles } from "./wp-golf-tips";
import { wpGuideArticles } from "./wp-guides";

export const articles: Article[] = [
  ...wpReviewArticles,
  ...wpComparisonArticles,
  ...wpSimulatorArticles,
  ...wpGolfTipArticles,
  ...wpGuideArticles,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
