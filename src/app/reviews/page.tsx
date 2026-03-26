import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { articles } from "@/content/articles";
import { StarRating } from "@/components/StarRating";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golf Launch Monitor & Simulator Reviews — Par Precision",
  description:
    "In-depth, hands-on reviews of every major golf launch monitor and simulator. SkyTrak+, Garmin R10, Bushnell Launch Pro, FlightScope Mevo+, and more.",
  alternates: { canonical: "https://parpercision.com/reviews" },
};

export default function ReviewsIndexPage() {
  const reviews = articles.filter(
    (a) => a.category === "launch-monitors" || a.category === "simulators"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
          Reviews
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Golf Simulator & Launch Monitor Reviews
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          Every review is based on hands-on testing in our own simulator setup. We measure
          accuracy against TrackMan benchmarks so you get real data, not just opinions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <Link
            key={review.slug}
            href={`/${review.slug}`}
            className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={review.coverImage}
                alt={review.coverImageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                {review.categoryLabel}
              </span>
            </div>
            <div className="p-6">
              <StarRating rating={review.featured ? 5 : 4} />
              <h2 className="text-lg font-bold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors leading-snug">
                {review.title}
              </h2>
              <p className="text-sm text-muted line-clamp-2">{review.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted">{review.readingTime}</span>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  Read review <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
