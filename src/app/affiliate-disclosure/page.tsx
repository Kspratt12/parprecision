import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Par Precision affiliate disclosure. Transparency about how we earn commissions from product recommendations.",
  alternates: { canonical: "https://parpercision.com/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-foreground mb-8">Affiliate Disclosure</h1>
      <p className="text-muted mb-8">Last updated: March 21, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <div className="bg-accent border border-primary/20 rounded-xl p-6 mb-8">
          <p className="text-foreground font-medium">
            <strong>In short:</strong> Some links on Par Precision are affiliate links. If you click
            one and buy something, we may earn a small commission — at no extra cost to you. This
            helps us keep the site running and free for everyone.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">How We Make Money</h2>
          <p>
            Par Precision is an independently operated review website. We earn revenue through
            affiliate marketing programs, which means we may receive a commission when you purchase
            a product through one of our links.
          </p>
          <p className="mt-3">We participate in the following affiliate programs:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Rain or Shine Golf:</strong> We earn commissions on qualifying purchases through our links.</li>
            <li><strong>Shop Indoor Golf:</strong> We earn commissions on qualifying purchases through our links.</li>
            <li><strong>Other Affiliate Networks:</strong> We work with select affiliate partners to bring you the best deals on golf tech.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Editorial Independence</h2>
          <p>
            <strong>Our reviews and recommendations are never influenced by affiliate commissions.</strong>{" "}
            We follow strict editorial guidelines:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>We test every product we review in our own setup</li>
            <li>We will recommend a product that pays lower (or zero) commission if it is genuinely better</li>
            <li>We clearly state the pros AND cons of every product — no product is perfect</li>
            <li>We update our reviews when new information or products become available</li>
            <li>We never accept payment from manufacturers for positive reviews</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What This Means for You</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No extra cost:</strong> You pay the exact same price whether you use our affiliate link or go directly to the store.</li>
            <li><strong>You support us:</strong> Your purchases through our links help us keep testing new products and creating free content.</li>
            <li><strong>Honest recommendations:</strong> We only recommend products we genuinely believe provide good value.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Identifying Affiliate Links</h2>
          <p>
            On Par Precision, affiliate links are typically found in product reviews, comparison
            articles, and &quot;best of&quot; roundup posts. Buttons like &quot;Check Price,&quot;
            &quot;Buy Here,&quot; or &quot;View Deal&quot; are affiliate links.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">FTC Compliance</h2>
          <p>
            This disclosure is provided in accordance with the Federal Trade Commission&apos;s 16 CFR
            Part 255, &quot;Guides Concerning the Use of Endorsements and Testimonials in Advertising.&quot;
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Questions?</h2>
          <p>
            If you have any questions about our affiliate relationships, please contact us at{" "}
            <a href="mailto:kelvin@listingflare.com" className="text-primary hover:underline">
              kelvin@listingflare.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
