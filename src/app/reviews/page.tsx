import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { articles } from "@/content/articles";
import { StarRating } from "@/components/StarRating";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golf Simulator & Launch Monitor Reviews (2026)",
  description:
    "Independent reviews of SkyTrak, TrackMan, Foresight, Garmin, Uneekor, Bushnell, and more. Real accuracy data, honest recommendations, and side-by-side comparisons to help you choose.",
  alternates: { canonical: "https://parpercision.com/reviews" },
};

export default function ReviewsIndexPage() {
  const reviews = articles.filter(
    (a) => a.category === "launch-monitors" || a.category === "simulators"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 max-w-3xl">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
          Reviews
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Golf Simulator & Launch Monitor Reviews
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-4">
          We cover every major golf launch monitor and simulator brand including <strong>SkyTrak</strong>, <strong>TrackMan</strong>, <strong>Foresight Sports</strong>, <strong>Garmin</strong>, <strong>Uneekor</strong>, <strong>Bushnell</strong>, and <strong>FlightScope</strong>. Each review includes accuracy data, software compatibility, setup requirements, and honest value assessments.
        </p>
        <p className="text-muted leading-relaxed">
          Whether you are looking for the <Link href="/best-golf-simulators-for-home" className="text-primary underline underline-offset-2">best home golf simulator</Link>, comparing <Link href="/trackman-io-vs-trackman-4" className="text-primary underline underline-offset-2">TrackMan iO vs TrackMan 4</Link>, or trying to decide between <Link href="/bushnell-launch-pro-vs-skytrak-plus" className="text-primary underline underline-offset-2">Bushnell Launch Pro and SkyTrak+</Link>, start here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Link
            key={review.slug}
            href={`/${review.slug}`}
            className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={review.coverImage}
                alt={review.coverImageAlt}
                fill
                loading="lazy"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                {review.categoryLabel}
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
                {review.title}
              </h2>
              <p className="text-sm text-muted line-clamp-2">{review.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted">{review.readingTime}</span>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
