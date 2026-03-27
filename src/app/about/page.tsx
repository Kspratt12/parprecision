import Image from "next/image";
import Link from "next/link";
import { Target, BarChart3, Shield, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Par Precision",
  description:
    "Par Precision is your trusted source for independent golf simulator and launch monitor reviews. We test every product hands-on so you can make informed decisions.",
  alternates: { canonical: "https://parpercision.com/about" },
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
              url: "https://parpercision.com",
              description:
                "Independent golf simulator and launch monitor review site.",
              foundingDate: "2023",
              founder: {
                "@type": "Person",
                name: "Kelvin Spratt",
                jobTitle: "Golf Technology Writer",
                url: "https://parpercision.com/about",
              },
            },
          }),
        }}
      />

      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Par Precision</h1>

      <div className="relative aspect-[3/1] rounded-2xl overflow-hidden mb-10 shadow-lg">
        <Image
          src="/hero.png"
          alt="Golf simulator and launch monitor setup"
          fill
          className="object-cover"
          sizes="896px"
        />
      </div>

      <div className="prose max-w-none space-y-6 text-gray-700 leading-relaxed text-lg">
        <p>
          Par Precision started in late 2023 because we couldn&apos;t find honest, detailed reviews
          that actually compared golf simulators and launch monitors side-by-side with real data.
          Most &quot;reviews&quot; out there were just rewritten spec sheets with affiliate links
          slapped on.
        </p>

        <p>
          We decided to do it differently. We started researching, comparing, and documenting
          everything we learned about golf simulators and launch monitors so other golfers
          wouldn&apos;t have to dig through the same noise we did.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Our Testing Philosophy</h2>

        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
          {[
            {
              icon: Target,
              title: "In-Depth Research",
              desc: "Every product we cover gets thorough research - specs, real user feedback, and accuracy data compared across models.",
            },
            {
              icon: BarChart3,
              title: "Data-Driven Comparisons",
              desc: "We dig into the actual accuracy data and specs, not just subjective opinions. You can see exactly how each product stacks up.",
            },
            {
              icon: Shield,
              title: "Editorially Independent",
              desc: "We call it like we see it. Our recommendations are based on value and performance, never on who pays more commission.",
            },
            {
              icon: Zap,
              title: "Constantly Updated",
              desc: "Golf tech moves fast. We update our guides regularly so the info you read is current, not outdated.",
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
          <a href="mailto:hello@parpercision.com" className="text-primary hover:underline font-medium">
            hello@parpercision.com
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
