import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/content/articles";
import { ArticlePage } from "@/components/ArticlePage";
import type { Metadata } from "next";

// All WordPress-migrated article slugs
const wpSlugs = new Set(["trackman-io-vs-trackman-4","what-launch-monitor-does-bryson-dechambeau-use","best-retractable-golf-simulators","best-golf-simulators-for-small-spaces","foresight-sports-gc3s-vs-gc3","trackman-io-home-vs-complete","foresight-sports-gchawk","best-golf-simulators-for-business","golf-swing-drills","trackman-io-review","protee-vx-review","garmin-r50-vs-gc3","golf-simulator-turf","uneekor-eye-mini-lite","uneekor-eye-xo2","how-profitable-are-golf-simulators","best-golf-simulators-for-garage-use","hd-golf-simulator-ultimate-entertainment-package-review","best-golf-launch-monitors-under-1000","uneekor-qed","foresight-falcon-review","best-golf-simulators-for-the-money","uneekor-eye-mini","foresight-sports-gc3s","garmin-approach-r50","foresight-sports-gcquad","best-golf-simulator-software","basement-golf-simulator","best-golf-simulators-for-home","how-much-space-is-needed-for-a-golf-simulator","foresight-sports-gc3","what-is-the-best-golf-simulator","best-swingbay-golf-simulators","trugolf-apogee-review","golf-swing-drill-for-beginners","full-swing-kit-review","bushnell-lpi","best-golf-simulators-for-left-and-right-handed-use","skytrak-vs-skytrak-plus-differences","launch-monitor-vs-golf-simulator","foresight-quadmax-review","golf-simulator-cost-2026","hd-golf-simulator","bushnell-launch-pro-vs-skytrak-plus","best-golf-launch-monitors","why-are-golf-simulators-so-expensive","what-is-the-most-accurate-launch-monitor","what-launch-monitor-do-pros-use","how-accurate-is-the-skytrak-plus","best-golf-simulators-under-10000","best-portable-golf-launch-monitors","what-launch-monitor-does-tiger-woods-use","skytrak-plus-for-beginners","is-it-worth-buying-a-golf-launch-monitor","launch-monitor-pros-use","best-overhead-launch-monitors-review","how-much-does-a-golf-launch-monitor-cost-find-out-here","how-to-build-a-golf-simulator-2","do-golf-simulators-improve-your-game","golf-simulator-setup","how-to-build-a-golf-simulator-mancave","how-to-set-up-a-golf-simulator-in-a-small-room"]);

export async function generateStaticParams() {
  return Array.from(wpSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title + " | Par Precision",
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://parpercision.com/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.coverImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.coverImage],
    },
    alternates: {
      canonical: `https://parpercision.com/${article.slug}`,
    },
  };
}

export default async function WPArticlePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  if (!wpSlugs.has(slug)) {
    notFound();
  }

  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  return <ArticlePage article={article} />;
}
