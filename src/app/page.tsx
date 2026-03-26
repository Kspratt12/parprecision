import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Trophy, Zap, Shield, Target, BarChart3, BookOpen } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { StarRating } from "@/components/StarRating";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Par Precision | Best Golf Simulators & Launch Monitors Reviewed (2026)",
  description:
    "Independent golf simulator and launch monitor reviews with real accuracy data. Compare SkyTrak, TrackMan, Foresight, Garmin, Uneekor and more. Find the right setup for your home.",
  alternates: {
    canonical: "https://parpercision.com",
  },
};

const featuredReviews = [
  {
    title: "Best Golf Simulators 2026",
    description: "Our top picks after comparing the best simulators side-by-side. From budget to premium.",
    href: "/best-golf-simulators-for-home",
    image: "/wp-content/uploads/2025/02/homecourse-golfsimulator-vooraanzicht.webp",
    tag: "Editor's Choice",
    rating: 5,
  },
  {
    title: "Best Launch Monitors 2026",
    description: "Radar vs camera-based - we break down accuracy, features, and value for every budget.",
    href: "/best-golf-launch-monitors",
    image: "/wp-content/uploads/2025/02/GolfboyMain1_27c5571306.png",
    tag: "Most Popular",
    rating: 5,
  },
  {
    title: "TrackMan iO vs TrackMan 4",
    description: "Same accuracy, very different ownership. We break down what actually matters between these two.",
    href: "/trackman-io-vs-trackman-4",
    image: "/wp-content/uploads/2025/01/Family-playing-bullseye_72-dpi-1024x683-1.jpg",
    tag: "Top Comparison",
    rating: 5,
  },
];

const latestArticles = [
  {
    title: "Golf Simulator Room Dimensions Guide",
    description: "Minimum ceiling height, width, and depth requirements for every simulator type.",
    href: "/how-much-space-is-needed-for-a-golf-simulator",
    category: "Setup Guide",
    readTime: "8 min read",
    image: "/wp-content/uploads/2025/02/64b85bc637c2d5bffbb57e8b_4.26.2023-PDC-Ballard-Residence-Golf-Simulator-2-Medium-1536x1024-1.jpg",
  },
  {
    title: "Golf Simulator Costs Explained",
    description: "Full breakdown from budget setups to premium installations. What you'll really spend.",
    href: "/golf-simulator-cost-2026",
    category: "Buying Guide",
    readTime: "9 min read",
    image: "/wp-content/uploads/2025/11/SimIntRoom_V11_45deg.webp",
  },
  {
    title: "Bushnell Launch Pro vs SkyTrak+",
    description: "The differences that actually matter between these two popular launch monitors.",
    href: "/bushnell-launch-pro-vs-skytrak-plus",
    category: "Comparison",
    readTime: "6 min read",
    image: "/wp-content/uploads/2025/11/downl3333oad.avif",
  },
  {
    title: "GCHawk Review: Worth $19,999?",
    description: "Everything you need to know before spending on this ceiling-mounted simulator.",
    href: "/foresight-sports-gchawk",
    category: "Review",
    readTime: "7 min read",
    image: "/wp-content/uploads/2025/01/0E7A9652-01-jpg.webp",
  },
];

const trustSignals = [
  { icon: Trophy, label: "60+ In-Depth Articles", description: "Reviews, comparisons, and guides" },
  { icon: Target, label: "Since 2023", description: "Covering golf tech from the start" },
  { icon: BarChart3, label: "Data-Driven", description: "Real accuracy measurements" },
  { icon: Shield, label: "Independent", description: "No manufacturer sponsorships" },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Par Precision",
            url: "https://parpercision.com",
            logo: {
              "@type": "ImageObject",
              url: "https://parpercision.com/logo.png",
              width: 300,
              height: 60,
            },
            description:
              "Independent golf simulator and launch monitor reviews with real accuracy data.",
            foundingDate: "2023",
            sameAs: [
              "https://www.youtube.com/@ParPrecision",
              "https://x.com/parprecision",
              "https://www.facebook.com/parprecision",
            ],
          }),
        }}
      />

      {/* JSON-LD: WebSite with SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Par Precision",
            url: "https://parpercision.com",
            description:
              "Expert reviews, comparisons, and buying guides for golf simulators and launch monitors.",
            publisher: {
              "@type": "Organization",
              name: "Par Precision",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: "https://parpercision.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* JSON-LD: ItemList for featured reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Best Golf Simulators & Launch Monitors 2026",
            description:
              "Our top-rated golf simulator and launch monitor reviews, updated for 2026.",
            numberOfItems: featuredReviews.length,
            itemListElement: featuredReviews.map((review, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: review.title,
              url: `https://parpercision.com${review.href}`,
            })),
          }),
        }}
      />

      {/* JSON-LD: FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the best golf simulator for home use in 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The SkyTrak MAX SIG10 ($4,645) is our top overall pick for home golf simulators in 2026. It combines excellent accuracy with a complete package at a competitive price. For premium buyers, the TrackMan iO ($17,690) delivers tour-level data. Budget shoppers should consider the Garmin Approach R50 or FlightScope Mevo+ for solid performance under $3,000.",
                },
              },
              {
                "@type": "Question",
                name: "How much does a golf simulator cost?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Golf simulator costs range from $2,000 for basic launch monitor setups to $50,000+ for full premium builds. A mid-range home simulator with a quality launch monitor, impact screen, enclosure, and projector typically costs $5,000-$10,000. Budget setups using portable launch monitors like the Garmin Approach R50 start around $2,000-$3,000.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between a launch monitor and a golf simulator?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A launch monitor is the sensor device that tracks your ball and club data (speed, spin, launch angle). A golf simulator is the full setup including the launch monitor, impact screen, projector, enclosure, and software that lets you play virtual golf courses. You can use a launch monitor alone for practice data, but you need the full simulator package for a virtual golf experience.",
                },
              },
              {
                "@type": "Question",
                name: "How much room do I need for a golf simulator?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The minimum recommended space for a golf simulator is 10 feet wide, 15 feet deep, and 9 feet of ceiling height. Ideally, you want 12+ feet wide, 16-18 feet deep, and 10+ feet of ceiling height for a comfortable experience with a full swing. Overhead launch monitors like the Uneekor EYE MINI require slightly less depth than radar-based systems.",
                },
              },
              {
                "@type": "Question",
                name: "Are golf simulators accurate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Premium golf simulators like the TrackMan iO, Foresight GCQuad, and Uneekor QED are extremely accurate, matching within 1-2% of outdoor results for most metrics. Mid-range options like the SkyTrak+ and Bushnell Launch Pro also deliver excellent accuracy. Budget launch monitors are less precise but still useful for practice and general game improvement.",
                },
              },
            ],
          }),
        }}
      />

      {/* Hero Section - Full-width simulator image */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/wp-content/uploads/2025/02/64b85bc637c2d5bffbb57e8b_4.26.2023-PDC-Ballard-Residence-Golf-Simulator-2-Medium-1536x1024-1.jpg"
            alt="Premium home golf simulator room with impact screen and bar seating"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              Updated March 2026
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Find the Best <span className="text-primary">Golf Simulators</span> &amp; Launch Monitors for Home
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed mb-8">
              Independent, data-driven reviews of the best golf simulators and launch monitors from SkyTrak, TrackMan, Foresight Sports, Garmin, Uneekor, Bushnell, and FlightScope. We compare accuracy, software, pricing, and real-world value so you can build the perfect home golf setup without overspending.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/best-golf-simulators-for-home"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl text-base"
              >
                See Our Top Picks <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/golf-simulator-cost-2026"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-foreground font-semibold rounded-full border border-border hover:bg-white transition-all text-base"
              >
                Cost Breakdown Guide
              </Link>
            </div>
            {/* Quick picks */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                { label: "#1 SkyTrak MAX SIG10 - $4,645", href: "/best-golf-simulators-for-home" },
                { label: "Best Premium: TrackMan iO - $17,690", href: "/best-golf-simulators-for-home" },
                { label: "Best Value: Uneekor EYE MINI LITE - $4,800", href: "/best-golf-simulators-for-home" },
              ].map((pick) => (
                <Link
                  key={pick.label}
                  href={pick.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-sm text-foreground border border-border/50 hover:border-primary/30 hover:bg-white transition-all"
                >
                  <Trophy className="w-3.5 h-3.5 text-primary" />
                  {pick.label}
                </Link>
              ))}
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
          <div className="flex items-end justify-between mb-4">
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
          <p className="text-muted text-lg leading-relaxed mb-12 max-w-3xl">
            These are the guides our readers come back to most. Whether you are comparing the best golf simulators for home, choosing between radar and camera-based launch monitors, or deciding between TrackMan and the competition, start here.
          </p>

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
                    loading="lazy"
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

      {/* Popular Reviews & Brands Section */}
      <section className="bg-surface py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              What We Cover
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              In-Depth Golf Simulator &amp; Launch Monitor Reviews
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              We publish detailed, hands-on reviews of the most popular golf simulators and launch monitors on the market. Our coverage includes the <strong>SkyTrak+</strong> and <strong>SkyTrak MAX SIG10</strong>, the <strong>TrackMan iO</strong> and <strong>TrackMan 4</strong>, <strong>Foresight Sports GCQuad</strong> and <strong>GCHawk</strong>, <strong>Garmin Approach R50</strong>, <strong>Uneekor EYE MINI</strong> and <strong>EYE XO2</strong>, <strong>Bushnell Launch Pro</strong>, and <strong>FlightScope Mevo+</strong>.
            </p>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Every review includes real accuracy data, software comparisons, setup requirements, and honest value assessments. We also publish head-to-head comparisons like <Link href="/bushnell-launch-pro-vs-skytrak-plus" className="text-primary underline underline-offset-2 hover:text-primary-dark">Bushnell Launch Pro vs SkyTrak+</Link> and <Link href="/trackman-io-vs-trackman-4" className="text-primary underline underline-offset-2 hover:text-primary-dark">TrackMan iO vs TrackMan 4</Link>, plus comprehensive buying guides covering <Link href="/golf-simulator-cost-2026" className="text-primary underline underline-offset-2 hover:text-primary-dark">golf simulator costs</Link>, <Link href="/how-much-space-is-needed-for-a-golf-simulator" className="text-primary underline underline-offset-2 hover:text-primary-dark">room dimensions</Link>, and <Link href="/how-to-build-a-golf-simulator-2" className="text-primary underline underline-offset-2 hover:text-primary-dark">how to build a golf simulator</Link>.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Best Golf Simulators", href: "/best-golf-simulators-for-home" },
                { label: "Best Launch Monitors", href: "/best-golf-launch-monitors" },
                { label: "Best Overhead Monitors", href: "/best-overhead-launch-monitors-review" },
                { label: "Best Portable Monitors", href: "/best-portable-golf-launch-monitors" },
                { label: "Best for Small Spaces", href: "/best-golf-simulators-for-small-spaces" },
                { label: "Best for the Money", href: "/best-golf-simulators-for-the-money" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground border border-border hover:border-primary/30 hover:text-primary transition-all"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Par Precision */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Why Par Precision
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Deep Research. Honest Reviews. Better Decisions.
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-8">
                We don&apos;t just read spec sheets. We dig into the real data, compare products
                side-by-side, and give you honest recommendations so you can make the right purchase.
                Whether you are looking at a $500 Garmin Approach R50 or a $20,000 Foresight GCHawk,
                we help you understand what you are actually getting for your money.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: Zap,
                    title: "Deep Research",
                    desc: "Every product covered with real specs, real user data, and honest analysis. We test claims from SkyTrak, TrackMan, Uneekor, and others against real-world results.",
                  },
                  {
                    icon: BarChart3,
                    title: "Accuracy Comparisons",
                    desc: "Side-by-side comparisons so you can see exactly how products stack up. We measure spin rates, ball speed, and launch angle consistency across devices.",
                  },
                  {
                    icon: BookOpen,
                    title: "Complete Setup Guides",
                    desc: "From room dimensions to projector selection, impact screens to simulator software - we cover everything you need to build a home golf simulator.",
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
                  src="/wp-content/uploads/2025/01/Golf-Simulator-in-Basement.webp"
                  alt="Home golf simulator setup in a basement with impact screen and projector"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Latest Articles
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Guides, Tips &amp; Deep Dives
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
            >
              View all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-muted text-lg leading-relaxed mb-12 max-w-3xl">
            From understanding golf simulator costs and room requirements to detailed product comparisons between brands like Bushnell, SkyTrak, and Foresight, our latest guides help you make smarter buying decisions.
          </p>

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
                    loading="lazy"
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

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Common Questions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
            Golf Simulator FAQ
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                What is the best golf simulator for home use in 2026?
              </h3>
              <p className="text-muted leading-relaxed">
                The <strong>SkyTrak MAX SIG10</strong> ($4,645) is our top overall pick for home golf simulators in 2026. It combines excellent accuracy with a complete package at a competitive price. For premium buyers, the <strong>TrackMan iO</strong> ($17,690) delivers tour-level data. Budget shoppers should consider the <strong>Garmin Approach R50</strong> or <strong>FlightScope Mevo+</strong> for solid performance under $3,000. See our full <Link href="/best-golf-simulators-for-home" className="text-primary underline underline-offset-2 hover:text-primary-dark">best golf simulators</Link> ranking.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                How much does a golf simulator cost?
              </h3>
              <p className="text-muted leading-relaxed">
                Golf simulator costs range from $2,000 for basic launch monitor setups to $50,000+ for full premium builds. A mid-range home simulator with a quality launch monitor, impact screen, enclosure, and projector typically costs $5,000-$10,000. Budget setups using portable launch monitors like the <strong>Garmin Approach R50</strong> start around $2,000-$3,000. Read our complete <Link href="/golf-simulator-cost-2026" className="text-primary underline underline-offset-2 hover:text-primary-dark">golf simulator cost breakdown</Link>.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                What is the difference between a launch monitor and a golf simulator?
              </h3>
              <p className="text-muted leading-relaxed">
                A launch monitor is the sensor device that tracks your ball and club data (speed, spin, launch angle). Brands like <strong>TrackMan</strong>, <strong>Foresight Sports</strong>, <strong>SkyTrak</strong>, and <strong>Uneekor</strong> make launch monitors. A golf simulator is the full setup including the launch monitor, impact screen, projector, enclosure, and software that lets you play virtual golf courses. You can use a launch monitor alone for practice data, but you need the full simulator package for a virtual golf experience. Browse our <Link href="/best-golf-launch-monitors" className="text-primary underline underline-offset-2 hover:text-primary-dark">best launch monitors</Link> guide.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                How much room do I need for a golf simulator?
              </h3>
              <p className="text-muted leading-relaxed">
                The minimum recommended space is 10 feet wide, 15 feet deep, and 9 feet of ceiling height. Ideally, you want 12+ feet wide, 16-18 feet deep, and 10+ feet of ceiling height for a comfortable full swing. Overhead launch monitors like the <strong>Uneekor EYE MINI</strong> require slightly less depth than radar-based systems like <strong>TrackMan</strong>. Check our detailed <Link href="/how-much-space-is-needed-for-a-golf-simulator" className="text-primary underline underline-offset-2 hover:text-primary-dark">golf simulator room dimensions guide</Link>.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Are golf simulators accurate?
              </h3>
              <p className="text-muted leading-relaxed">
                Premium golf simulators like the <strong>TrackMan iO</strong>, <strong>Foresight GCQuad</strong>, and <strong>Uneekor QED</strong> are extremely accurate, matching within 1-2% of outdoor results for most metrics. Mid-range options like the <strong>SkyTrak+</strong> and <strong>Bushnell Launch Pro</strong> also deliver excellent accuracy for home use. Budget launch monitors are less precise but still useful for practice and general game improvement.
              </p>
            </div>
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
