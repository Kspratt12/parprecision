import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Star, GitCompareArrows, Lightbulb } from "lucide-react";
import { articles } from "@/content/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golf Simulator Blog — Reviews, Guides & Tips",
  description:
    "Expert golf simulator and launch monitor content. In-depth reviews, buying guides, setup tutorials, comparison articles, and golf improvement tips from real testing data.",
  alternates: { canonical: "https://parpercision.com/blog" },
};

const categoryConfig: Record<string, { label: string; icon: typeof BookOpen; href: string }> = {
  simulators: { label: "Simulators", icon: Star, href: "/best-golf-simulators" },
  "launch-monitors": { label: "Launch Monitors", icon: Star, href: "/reviews" },
  guides: { label: "Guides", icon: BookOpen, href: "/guides" },
  comparisons: { label: "Comparisons", icon: GitCompareArrows, href: "/comparisons" },
  "golf-tips": { label: "Golf Tips", icon: Lightbulb, href: "/golf-tips" },
};

export default function BlogIndexPage() {
  // Sort by date (newest first), feature flagged articles first
  const sorted = [...articles].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const featured = sorted.find((a) => a.featured);
  const rest = sorted.filter((a) => a !== featured);

  function getArticleHref(article: (typeof articles)[number]) {
    if (article.category === "simulators") return `/${article.slug}`;
    if (article.category === "launch-monitors") return `/reviews/${article.slug}`;
    if (article.category === "guides") return `/guides/${article.slug}`;
    if (article.category === "comparisons") return `/comparisons/${article.slug}`;
    if (article.category === "golf-tips") return `/golf-tips/${article.slug}`;
    return `/${article.slug}`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
          Blog
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Golf Simulator Reviews, Guides & Tips
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          Every article is backed by hands-on testing and real data. No fluff, no recycled specs
          — just honest analysis to help you build the perfect simulator setup.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/blog"
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full"
        >
          All Articles
        </Link>
        {Object.entries(categoryConfig).map(([key, config]) => (
          <Link
            key={key}
            href={config.href}
            className="px-4 py-2 bg-gray-100 text-muted text-sm font-medium rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {config.label}
          </Link>
        ))}
      </div>

      {/* Featured article */}
      {featured && (
        <Link
          href={getArticleHref(featured)}
          className="group block bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 mb-12"
        >
          <div className="md:flex">
            <div className="relative md:w-1/2 aspect-[3/2] md:aspect-auto overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featured.coverImageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                Featured
              </span>
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
                {featured.categoryLabel}
              </span>
              <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-muted mb-4 line-clamp-3">{featured.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">{featured.readingTime}</span>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* All articles grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((article) => (
          <Link
            key={article.slug}
            href={getArticleHref(article)}
            className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={article.coverImage}
                alt={article.coverImageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                {article.categoryLabel}
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h2>
              <p className="text-sm text-muted line-clamp-2 mb-4">{article.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">{article.readingTime}</span>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
