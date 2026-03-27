import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getArticlesByCategory } from "@/content/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golf Tips - Improve Your Game with Practice Drills",
  description:
    "Practical golf tips backed by launch monitor data. Fix your slice, increase clubhead speed, improve your short game, and lower your scores with drills you can practice at home.",
  alternates: { canonical: "https://parpercision.com/golf-tips" },
};

export default function GolfTipsIndexPage() {
  const tips = getArticlesByCategory("golf-tips");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
          Golf Tips
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Improve Your Game with Practice Drills
        </h1>
        <p className="text-lg text-muted max-w-3xl leading-relaxed">
          Practical golf drills and tips you can practice at home with or without a simulator. From <Link href="/golf-swing-drills" className="text-primary underline underline-offset-2">proven swing drills</Link> to <Link href="/golf-swing-drill-for-beginners" className="text-primary underline underline-offset-2">beginner fundamentals</Link>, these guides help you build consistency and lower your scores.
        </p>
      </div>

      {/* Beginner Golf Swing Blueprint */}
      <div className="bg-accent border border-primary/20 rounded-2xl p-8 mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Guide</p>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              The Beginner Golf Swing Blueprint
            </h2>
            <p className="text-muted mb-6">
              A complete guide to building a consistent, powerful golf swing from scratch. Covers grip, stance, backswing, downswing, and follow-through with step-by-step instructions.
            </p>
            <a
              href="https://sprattler3.gumroad.com/l/beginner-golf-swing-blueprint"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-sm"
            >
              Get the Blueprint
            </a>
          </div>
          <div className="hidden md:block relative aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="/wp-content/uploads/2025/10/womens-golf-blog.webp"
              alt="Golfer practicing swing fundamentals"
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip) => (
          <Link
            key={tip.slug}
            href={`/${tip.slug}`}
            className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={tip.coverImage}
                alt={tip.coverImageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                Golf Tips
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                {tip.title}
              </h2>
              <p className="text-sm text-muted line-clamp-2">{tip.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted">{tip.readingTime}</span>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  Read tips <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
