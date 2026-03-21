import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { getArticlesByCategory } from "@/content/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golf Simulator Guides — Setup, Cost, Room Dimensions & More",
  description:
    "Complete guides for building your home golf simulator. Room dimensions, cost breakdowns, projector selection, mat guides, and step-by-step setup instructions.",
  alternates: { canonical: "https://parprecision.com/guides" },
};

export default function GuidesIndexPage() {
  const guides = getArticlesByCategory("guides");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
          Guides
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Golf Simulator Setup Guides
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          Everything you need to know about building a home golf simulator — from room
          dimensions and costs to projector selection and installation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex gap-6 bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden hidden sm:block">
              <Image
                src={guide.coverImage}
                alt={guide.coverImageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="192px"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">{guide.categoryLabel}</span>
                <span className="text-xs text-muted">· {guide.readingTime}</span>
              </div>
              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                {guide.title}
              </h2>
              <p className="text-sm text-muted line-clamp-2">{guide.description}</p>
              <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-3 group-hover:gap-2 transition-all">
                Read guide <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
