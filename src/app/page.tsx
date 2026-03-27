import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Trophy, Shield, BarChart3, BookOpen, Search } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { StarRating } from "@/components/StarRating";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Par Percision | Best Golf Simulators & Launch Monitors Reviewed (2026)",
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
  },
  {
    title: "Best Launch Monitors 2026",
    description: "Radar vs camera-based - we break down accuracy, features, and value for every budget.",
    href: "/best-golf-launch-monitors",
    image: "/wp-content/uploads/2025/02/GolfboyMain1_27c5571306.png",
    tag: "Most Popular",
  },
  {
    title: "TrackMan iO vs TrackMan 4",
    description: "Same accuracy, very different ownership. We break down what actually matters.",
    href: "/trackman-io-vs-trackman-4",
    image: "/wp-content/uploads/2025/01/Family-playing-bullseye_72-dpi-1024x683-1.jpg",
    tag: "Top Comparison",
  },
];

const browseLinks = [
  { label: "Best Golf Simulators", href: "/best-golf-simulators-for-home" },
  { label: "Best Launch Monitors", href: "/best-golf-launch-monitors" },
  { label: "Best Overhead Monitors", href: "/best-overhead-launch-monitors-review" },
  { label: "Best Portable Monitors", href: "/best-portable-golf-launch-monitors" },
  { label: "Best for Small Spaces", href: "/best-golf-simulators-for-small-spaces" },
  { label: "Best for the Money", href: "/best-golf-simulators-for-the-money" },
  { label: "Golf Simulator Costs", href: "/golf-simulator-cost-2026" },
  { label: "Room Dimensions Guide", href: "/how-much-space-is-needed-for-a-golf-simulator" },
];

const latestArticles = [
  {
    title: "GCHawk Review: Worth $19,999?",
    description: "Everything you need to know before spending on this ceiling-mounted simulator.",
    href: "/foresight-sports-gchawk",
    category: "Review",
    image: "/wp-content/uploads/2025/01/0E7A9652-01-jpg.webp",
  },
  {
    title: "Bushnell Launch Pro vs SkyTrak+",
    description: "The differences that actually matter between these two popular launch monitors.",
    href: "/bushnell-launch-pro-vs-skytrak-plus",
    category: "Comparison",
    image: "/wp-content/uploads/2025/11/downl3333oad.avif",
  },
  {
    title: "Golf Simulator Costs Explained",
    description: "Full breakdown from budget setups to premium installations.",
    href: "/golf-simulator-cost-2026",
    category: "Guide",
    image: "/wp-content/uploads/2025/11/SimIntRoom_V11_45deg.webp",
  },
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
            name: "Par Percision",
            url: "https://parpercision.com",
            logo: { "@type": "ImageObject", url: "https://parpercision.com/Logo.png", width: 300, height: 300 },
            description: "Independent golf simulator and launch monitor reviews with real accuracy data.",
            foundingDate: "2023",
          }),
        }}
      />
      {/* JSON-LD: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Par Percision",
            url: "https://parpercision.com",
            description: "Expert reviews, comparisons, and buying guides for golf simulators and launch monitors.",
            potentialAction: { "@type": "SearchAction", target: "https://parpercision.com/search?q={search_term_string}", "query-input": "required name=search_term_string" },
          }),
        }}
      />
      {/* JSON-LD: ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Best Golf Simulators & Launch Monitors 2026",
            numberOfItems: featuredReviews.length,
            itemListElement: featuredReviews.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.title, url: `https://parpercision.com${r.href}` })),
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
              { "@type": "Question", name: "What is the best golf simulator for home use in 2026?", acceptedAnswer: { "@type": "Answer", text: "The SkyTrak MAX SIG10 ($4,645) is our top pick. For premium buyers, the TrackMan iO ($17,690) delivers tour-level data. Budget shoppers should consider the Garmin Approach R50 or FlightScope Mevo+." } },
              { "@type": "Question", name: "How much does a golf simulator cost?", acceptedAnswer: { "@type": "Answer", text: "Golf simulator costs range from $2,000 for basic setups to $50,000+ for premium builds. A mid-range home simulator typically costs $5,000-$10,000." } },
              { "@type": "Question", name: "What is the difference between a launch monitor and a golf simulator?", acceptedAnswer: { "@type": "Answer", text: "A launch monitor tracks ball and club data. A golf simulator is the full setup including launch monitor, impact screen, projector, enclosure, and software." } },
              { "@type": "Question", name: "How much room do I need for a golf simulator?", acceptedAnswer: { "@type": "Answer", text: "Minimum: 10ft wide, 15ft deep, 9ft ceiling. Ideal: 12ft+ wide, 16-18ft deep, 10ft+ ceiling height." } },
              { "@type": "Question", name: "Are golf simulators accurate?", acceptedAnswer: { "@type": "Answer", text: "Premium simulators like TrackMan iO, Foresight GCQuad, and Uneekor QED match within 1-2% of outdoor results." } },
            ],
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/wp-content/uploads/2025/02/64b85bc637c2d5bffbb57e8b_4.26.2023-PDC-Ballard-Residence-Golf-Simulator-2-Medium-1536x1024-1.jpg"
            alt="Premium home golf simulator room"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              Updated March 2026
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Find the Best <span className="text-primary">Golf Simulators</span>{" "}&amp; Launch Monitors for Home
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-8 max-w-xl">
              Independent reviews of SkyTrak, TrackMan, Foresight, Garmin, Uneekor, Bushnell, and more. Real data, honest recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/best-golf-simulators-for-home"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
              >
                See Our Top Picks <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/80 backdrop-blur-sm text-foreground font-semibold rounded-full border border-border hover:bg-white transition-all"
              >
                Browse All Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Trophy, label: "60+ Articles", desc: "Reviews, comparisons & guides" },
              { icon: Shield, label: "Independent", desc: "No manufacturer sponsorships" },
              { icon: BarChart3, label: "Data-Driven", desc: "Real accuracy data" },
              { icon: Star, label: "Since 2023", desc: "Covering golf tech early" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">{s.label}</p>
                  <p className="text-xs text-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted mb-3 uppercase tracking-wider font-medium">Brands We Cover</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["SkyTrak", "TrackMan", "Foresight Sports", "Garmin", "Uneekor", "Bushnell", "FlightScope", "Full Swing", "ProTee", "TruGolf", "Rapsodo", "HD Golf"].map((brand) => (
                <span key={brand} className="text-sm text-muted font-medium">{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED REVIEWS ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Featured</p>
              <h2 className="text-3xl font-bold text-foreground">Our Most Popular Guides</h2>
            </div>
            <Link href="/reviews" className="hidden md:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
              View all reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <Link
                key={review.title}
                href={review.href}
                className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={review.image} alt={review.title} fill loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">{review.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">{review.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{review.description}</p>
                  <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-3 group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY CATEGORY + WHY US (merged) ── */}
      <section className="bg-surface py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: What we cover + browse links */}
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">What We Cover</p>
              <h2 className="text-3xl font-bold text-foreground mb-4">Golf Simulators & Launch Monitors from Every Brand</h2>
              <p className="text-muted leading-relaxed mb-4">
                We cover <strong>SkyTrak</strong>, <strong>TrackMan</strong>, <strong>Foresight Sports</strong>, <strong>Garmin</strong>, <strong>Uneekor</strong>, <strong>Bushnell</strong>, and <strong>FlightScope</strong> - plus head-to-head comparisons like{" "}
                <Link href="/bushnell-launch-pro-vs-skytrak-plus" className="text-primary underline underline-offset-2">Bushnell vs SkyTrak+</Link> and{" "}
                <Link href="/trackman-io-vs-trackman-4" className="text-primary underline underline-offset-2">TrackMan iO vs TrackMan 4</Link>.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                Every review includes accuracy data, software breakdowns, setup requirements, and honest value assessments. We also publish buying guides covering{" "}
                <Link href="/golf-simulator-cost-2026" className="text-primary underline underline-offset-2">simulator costs</Link>,{" "}
                <Link href="/how-much-space-is-needed-for-a-golf-simulator" className="text-primary underline underline-offset-2">room dimensions</Link>, and{" "}
                <Link href="/how-to-build-a-golf-simulator-2" className="text-primary underline underline-offset-2">how to build a simulator</Link>.
              </p>
              <div className="flex flex-wrap gap-2">
                {browseLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white rounded-full text-sm font-medium text-foreground border border-border hover:border-primary/40 hover:text-primary transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Why us */}
            <div className="bg-white rounded-2xl border border-border p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Why Par Percision?</h3>
              <div className="space-y-5">
                {[
                  { icon: Search, title: "Deep Research", desc: "Real specs, real user data, and honest analysis on every product we cover." },
                  { icon: BarChart3, title: "Side-by-Side Comparisons", desc: "We compare accuracy, spin rates, ball speed, and value across devices." },
                  { icon: BookOpen, title: "Complete Setup Guides", desc: "Room dimensions, projectors, impact screens, software - we cover it all." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                      <p className="text-sm text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST ARTICLES (3 col) ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Latest</p>
              <h2 className="text-3xl font-bold text-foreground">More Reviews & Guides</h2>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={article.image} alt={article.title} fill loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold rounded-full">{article.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">{article.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-surface py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Common Questions</p>
          <h2 className="text-3xl font-bold text-foreground mb-8">Golf Simulator FAQ</h2>

          <div className="space-y-6">
            {[
              {
                q: "What is the best golf simulator for home use in 2026?",
                a: <>The <strong>SkyTrak MAX SIG10</strong> ($4,645) is our top pick for home golf simulators. For premium buyers, the <strong>TrackMan iO</strong> ($17,690) delivers tour-level data. Budget shoppers should look at the <strong>Garmin Approach R50</strong> or <strong>FlightScope Mevo+</strong>. See our full <Link href="/best-golf-simulators-for-home" className="text-primary underline underline-offset-2">best golf simulators</Link> ranking.</>,
              },
              {
                q: "How much does a golf simulator cost?",
                a: <>Costs range from $2,000 for basic setups to $50,000+ for premium builds. A mid-range home simulator typically costs $5,000-$10,000. Read our <Link href="/golf-simulator-cost-2026" className="text-primary underline underline-offset-2">full cost breakdown</Link>.</>,
              },
              {
                q: "What is the difference between a launch monitor and a golf simulator?",
                a: <>A <strong>launch monitor</strong> tracks ball and club data (speed, spin, launch angle). A <strong>golf simulator</strong> is the full setup - launch monitor, impact screen, projector, enclosure, and software. See our <Link href="/best-golf-launch-monitors" className="text-primary underline underline-offset-2">best launch monitors</Link> guide.</>,
              },
              {
                q: "How much room do I need for a golf simulator?",
                a: <>Minimum: 10ft wide, 15ft deep, 9ft ceiling. Ideal: 12ft+ wide, 16-18ft deep, 10ft+ ceiling. Overhead monitors like the <strong>Uneekor EYE MINI</strong> need less depth. See our <Link href="/how-much-space-is-needed-for-a-golf-simulator" className="text-primary underline underline-offset-2">room dimensions guide</Link>.</>,
              },
              {
                q: "Are golf simulators accurate?",
                a: <>Premium simulators like <strong>TrackMan iO</strong>, <strong>Foresight GCQuad</strong>, and <strong>Uneekor QED</strong> match within 1-2% of outdoor results. Mid-range options like <strong>SkyTrak+</strong> and <strong>Bushnell Launch Pro</strong> also deliver excellent accuracy for home use.</>,
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-border p-6">
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Build Your Setup?</h2>
          <p className="text-white/80 mb-8">Get the complete golf simulator buying guide with our top picks, room requirements, and money-saving tips.</p>
          <a
            href="https://sprattler3.gumroad.com/l/best-golf-simulator-for-home-pdf-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg text-base"
          >
            Get the Buying Guide - $19.95
          </a>
        </div>
      </section>
    </>
  );
}
