import Image from "next/image";
import Link from "next/link";
import { Target, BarChart3, Shield, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kelvin Spratt & Par Percision",
  description:
    "Par Percision is your trusted source for independent golf simulator and launch monitor reviews. Founded by Kelvin Spratt, we test every product hands-on so you can make informed decisions.",
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
              name: "Par Percision",
              url: "https://parpercision.com",
              email: "kelvin@parpercision.com",
              description:
                "Independent golf simulator and launch monitor review site with hands-on testing and real accuracy data.",
              foundingDate: "2023",
              founder: {
                "@type": "Person",
                name: "Kelvin Spratt",
                jobTitle: "Golf Technology Writer",
                url: "https://parpercision.com/about",
                sameAs: [
                  "https://www.linkedin.com/in/kelvinspratt",
                  "https://x.com/kelvinspratt",
                ],
              },
            },
          }),
        }}
      />

      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Par Percision</h1>

      <div className="relative aspect-[3/1] rounded-2xl overflow-hidden mb-10 shadow-lg">
        <Image
          src="/hero.png"
          alt="Golf simulator and launch monitor testing setup"
          fill
          className="object-cover"
          sizes="896px"
        />
      </div>

      <div className="prose max-w-none space-y-6 text-gray-700 leading-relaxed text-lg">

        {/* Author intro with photo */}
        <div className="flex items-start gap-5 not-prose bg-surface border border-border rounded-2xl p-6 my-8">
          <Image
            src="/kelvin.jpg"
            alt="Kelvin Spratt, founder of Par Percision"
            width={80}
            height={80}
            className="rounded-full object-cover flex-shrink-0"
          />
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Kelvin Spratt</h2>
            <p className="text-sm text-primary font-medium mb-3">Founder & Golf Technology Writer</p>
            <p className="text-sm text-muted leading-relaxed">
              I started Par Percision in late 2023 after spending months trying to find honest golf simulator reviews that weren&apos;t just rewritten spec sheets. Since then, I&apos;ve tested and compared dozens of launch monitors and simulator packages hands-on - logging thousands of shots across home garages, basements, and commercial bays to give you the real data that matters.
            </p>
          </div>
        </div>

        <p>
          Par Percision exists because most &quot;reviews&quot; out there were just affiliate links slapped on manufacturer descriptions. We decided to do it differently - researching, comparing, and documenting everything so other golfers wouldn&apos;t have to dig through the same noise.
        </p>

        <p>
          Today, we cover every major brand in the space including SkyTrak, TrackMan, Foresight Sports, Garmin, Uneekor, FlightScope, Bushnell, ProTee, and more. With 60+ in-depth articles and guides, Par Percision has become a go-to resource for golfers building their first home simulator or upgrading an existing setup.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">How We Test & Review</h2>

        <p>
          Every simulator and launch monitor we cover goes through a hands-on evaluation. We compare accuracy data across models, test in real home environments, and document our findings with actual shot data - not manufacturer claims. Our process includes:
        </p>

        <ul className="space-y-2">
          <li><strong>Real accuracy testing</strong> - comparing ball speed, spin rate, and launch angle readings against reference units</li>
          <li><strong>Space requirement validation</strong> - measuring actual room dimensions needed, not just what the spec sheet says</li>
          <li><strong>Software compatibility checks</strong> - testing with GSPro, E6 Connect, FSX Play, TGC 2019, and other popular platforms</li>
          <li><strong>Long-term reliability</strong> - following up on products over months, not just initial impressions</li>
        </ul>

        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
          {[
            {
              icon: Target,
              title: "Hands-On Testing",
              desc: "Every product we cover gets tested with real shots in real home environments - garages, basements, and dedicated sim rooms.",
            },
            {
              icon: BarChart3,
              title: "Data-Driven Comparisons",
              desc: "We compare actual accuracy data across models - ball speed, spin, launch angle - not just subjective opinions.",
            },
            {
              icon: Shield,
              title: "Editorially Independent",
              desc: "Our recommendations are based on performance and value, never on who pays more commission. If a cheaper product is better, we say so.",
            },
            {
              icon: Zap,
              title: "Constantly Updated",
              desc: "Golf tech moves fast. We update our guides and reviews regularly so the information you read is current.",
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
          Par Percision earns revenue through affiliate commissions. When you click a product link
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
          <a href="mailto:kelvin@parpercision.com" className="text-primary hover:underline font-medium">
            kelvin@parpercision.com
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
