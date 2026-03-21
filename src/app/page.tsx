import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Trophy, Zap, Shield, Target, BarChart3, BookOpen } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { StarRating } from "@/components/StarRating";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Par Precision — Best Golf Simulator & Launch Monitor Reviews 2026",
  description:
    "Find the perfect golf simulator or launch monitor for your home setup. Expert reviews, head-to-head comparisons, setup guides, and exclusive deals. Trusted by 10,000+ golfers.",
  alternates: {
    canonical: "https://parprecision.com",
  },
};

const featuredReviews = [
  {
    title: "Best Golf Simulators 2026",
    description: "Our top picks after testing 15+ simulators side-by-side. From budget to premium.",
    href: "/best-golf-simulators",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&h=400&fit=crop",
    tag: "Editor's Choice",
    rating: 5,
  },
  {
    title: "Best Launch Monitors 2026",
    description: "Radar vs camera-based — we break down accuracy, features, and value for every budget.",
    href: "/best-launch-monitors",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&h=400&fit=crop",
    tag: "Most Popular",
    rating: 5,
  },
  {
    title: "SkyTrak+ In-Depth Review",
    description: "After 6 months of daily use, here is everything you need to know about the SkyTrak+.",
    href: "/reviews/skytrak-plus",
    image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&h=400&fit=crop",
    tag: "Deep Dive",
    rating: 4,
  },
];

const latestArticles = [
  {
    title: "Golf Simulator Room Dimensions: Complete Guide",
    description: "Minimum ceiling height, width, and depth requirements for every simulator type.",
    href: "/guides/golf-simulator-room-dimensions",
    category: "Setup Guide",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop",
  },
  {
    title: "How Much Does a Golf Simulator Cost in 2026?",
    description: "Full breakdown from $500 budget setups to $50,000+ premium installations.",
    href: "/guides/golf-simulator-cost",
    category: "Buying Guide",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=400&h=250&fit=crop",
  },
  {
    title: "Garmin R10 vs SkyTrak+: Which Should You Buy?",
    description: "Two of the most popular launch monitors compared on accuracy, features, and value.",
    href: "/comparisons/garmin-r10-vs-skytrak-plus",
    category: "Comparison",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400&h=250&fit=crop",
  },
  {
    title: "How to Fix a Slice: 5 Drills That Actually Work",
    description: "Practice these at home with your simulator and see results on the course.",
    href: "/golf-tips/how-to-fix-a-slice",
    category: "Golf Tips",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1632932693472-e3afb9c9b21e?w=400&h=250&fit=crop",
  },
];

const trustSignals = [
  { icon: Trophy, label: "15+ Simulators Tested", description: "Hands-on, unbiased reviews" },
  { icon: Target, label: "10,000+ Readers", description: "Trust our recommendations" },
  { icon: BarChart3, label: "Data-Driven", description: "Real accuracy measurements" },
  { icon: Shield, label: "Independent", description: "No manufacturer sponsorships" },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Par Precision",
            url: "https://parprecision.com",
            description:
              "Expert reviews, comparisons, and buying guides for golf simulators and launch monitors.",
            publisher: {
              "@type": "Organization",
              name: "Par Precision",
              logo: {
                "@type": "ImageObject",
                url: "https://parprecision.com/logo.png",
              },
            },
            potentialAction: {
              "@type": "SearchAction",
              target: "https://parprecision.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-accent to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4 fill-current" />
                Trusted by 10,000+ golfers
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Find Your Perfect{" "}
                <span className="text-primary">Golf Simulator</span> Setup
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed mb-8 max-w-xl">
                Expert reviews, head-to-head comparisons, and honest buying guides.
                We test every simulator and launch monitor so you don&apos;t have to.
              </p>
              <NewsletterForm variant="hero" />
              <p className="text-sm text-muted mt-4">
                Join 2,000+ golfers. Get our free Simulator Buying Guide instantly.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop"
                  alt="Professional golf simulator setup in a home"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating review card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-border max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">#1 Pick: SkyTrak+</p>
                    <div className="flex items-center gap-1">
                      <StarRating rating={5} size={14} />
                      <span className="text-xs text-muted ml-1">Best Overall 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="border-y border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <signal.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">{signal.label}</p>
                  <p className="text-xs text-muted">{signal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Featured Reviews
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Most Popular Guides
              </h2>
            </div>
            <Link
              href="/reviews"
              className="hidden md:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
            >
              View all reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredReviews.map((review) => (
              <Link
                key={review.title}
                href={review.href}
                className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={review.image}
                    alt={review.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    {review.tag}
                  </span>
                </div>
                <div className="p-6">
                  <StarRating rating={review.rating} />
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                    {review.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{review.description}</p>
                  <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4 group-hover:gap-2 transition-all">
                    Read full review <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Par Precision */}
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Why Par Precision
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Real Testing. Honest Reviews. Better Decisions.
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-8">
                We don&apos;t just read spec sheets — we set up every simulator and launch monitor
                in our own testing space. We measure accuracy, compare side-by-side, and give you
                the real data you need to make the right purchase.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: Zap,
                    title: "Hands-On Testing",
                    desc: "Every product reviewed with real balls, real swings, and real data.",
                  },
                  {
                    icon: BarChart3,
                    title: "Accuracy Comparisons",
                    desc: "Side-by-side accuracy tests against TrackMan benchmarks.",
                  },
                  {
                    icon: BookOpen,
                    title: "Complete Setup Guides",
                    desc: "From room dimensions to projector selection — we cover everything.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=800&fit=crop"
                  alt="Golf launch monitor testing setup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Latest Articles
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Guides, Tips & Deep Dives
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
            >
              View all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestArticles.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted">{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted mt-2 line-clamp-2">{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Dream Setup?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Download our free Golf Simulator Buying Guide. Includes our top picks,
            room requirements, and money-saving tips.
          </p>
          <div className="flex justify-center">
            <NewsletterForm variant="hero" />
          </div>
        </div>
      </section>
    </>
  );
}
