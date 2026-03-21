import Image from "next/image";
import Link from "next/link";
import { Target, BarChart3, Shield, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Par Precision",
  description:
    "Par Precision is your trusted source for independent golf simulator and launch monitor reviews. We test every product hands-on so you can make informed decisions.",
  alternates: { canonical: "https://parprecision.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "Organization",
              name: "Par Precision",
              url: "https://parprecision.com",
              description:
                "Independent golf simulator and launch monitor review site with hands-on testing.",
              foundingDate: "2025",
            },
          }),
        }}
      />

      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Par Precision</h1>

      <div className="relative aspect-[3/1] rounded-2xl overflow-hidden mb-10 shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1550707227-6140ec0a5044?w=1200&h=400&fit=crop"
          alt="Golf simulator testing setup"
          fill
          className="object-cover"
          sizes="896px"
        />
      </div>

      <div className="prose max-w-none space-y-6 text-gray-700 leading-relaxed text-lg">
        <p>
          Par Precision was born out of frustration. When we started building our home golf simulator
          in 2025, we couldn&apos;t find honest, detailed reviews that actually compared products
          side-by-side with real data. Most &quot;reviews&quot; were just rewritten spec sheets with
          affiliate links slapped on.
        </p>

        <p>
          We decided to do it differently. We built a dedicated testing space, purchased (yes,
          purchased — not received for free) multiple launch monitors and simulator packages, and
          started documenting everything.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Our Testing Philosophy</h2>

        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
          {[
            {
              icon: Target,
              title: "Real Testing, Not Speculation",
              desc: "Every product is tested with 500+ shots across driver, irons, and wedges. We measure accuracy against TrackMan benchmarks.",
            },
            {
              icon: BarChart3,
              title: "Data-Driven Comparisons",
              desc: "We publish the actual accuracy data, not just subjective opinions. You can see exactly how each product performs.",
            },
            {
              icon: Shield,
              title: "Editorially Independent",
              desc: "We purchase most products ourselves. When a manufacturer sends a unit, we disclose it. Our recommendations are never for sale.",
            },
            {
              icon: Zap,
              title: "Constantly Updated",
              desc: "We re-test and update our guides quarterly. Golf tech moves fast, and our content stays current.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">How We Make Money</h2>
        <p>
          Par Precision earns revenue through affiliate commissions. When you click a product link
          and make a purchase, we may earn a small commission at no extra cost to you. This is how we
          fund our testing and keep the site free.
        </p>
        <p>
          Importantly, <strong>our reviews are never influenced by commissions.</strong> We recommend
          products based purely on performance and value. If a product with a lower commission is
          better, that&apos;s what we recommend. Period.
        </p>
        <p>
          Read our full{" "}
          <Link href="/affiliate-disclosure" className="text-primary hover:underline font-medium">
            Affiliate Disclosure
          </Link>{" "}
          for complete transparency.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Get in Touch</h2>
        <p>
          Have a question, product suggestion, or just want to talk golf? We&apos;d love to hear
          from you. Reach out at{" "}
          <a href="mailto:hello@parprecision.com" className="text-primary hover:underline font-medium">
            hello@parprecision.com
          </a>{" "}
          or visit our{" "}
          <Link href="/contact" className="text-primary hover:underline font-medium">
            Contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
