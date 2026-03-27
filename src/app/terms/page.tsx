import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Par Precision terms of service. Read our terms and conditions for using the website.",
  alternates: { canonical: "https://parpercision.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
      <p className="text-muted mb-4">Last updated: March 21, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Par Precision (&quot;parpercision.com&quot;), you accept and agree
            to be bound by these Terms of Service. If you do not agree with any part of these terms,
            please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Use of Content</h2>
          <p>
            All content on Par Precision, including text, images, graphics, and reviews, is for
            informational purposes only. Our reviews and recommendations represent our honest opinions
            based on our testing and research.
          </p>
          <p className="mt-3">You may not:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Reproduce, distribute, or republish our content without written permission</li>
            <li>Use our content for commercial purposes without authorization</li>
            <li>Modify or alter our content in any way</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Affiliate Relationships</h2>
          <p>
            Par Precision is a participant in various affiliate marketing programs. This means we may
            earn commissions on qualifying purchases made through links on our website. This does not
            affect the price you pay or our editorial independence.
          </p>
          <p className="mt-3">
            For complete details, please see our{" "}
            <a href="/affiliate-disclosure" className="text-primary hover:underline">Affiliate Disclosure</a> page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Product Reviews & Recommendations</h2>
          <p>
            Our product reviews are based on our personal testing and experience. Product specifications,
            prices, and availability are subject to change by manufacturers and retailers. We make every
            effort to keep our content accurate and up-to-date, but we cannot guarantee the accuracy of
            all information at all times.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Disclaimer of Warranties</h2>
          <p>
            Par Precision is provided &quot;as is&quot; and &quot;as available&quot; without any
            warranties of any kind, either express or implied. We do not warrant that:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>The website will be uninterrupted or error-free</li>
            <li>All information on the website is accurate, complete, or current</li>
            <li>Products recommended will meet your specific needs or expectations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Limitation of Liability</h2>
          <p>
            Par Precision and its owners shall not be liable for any direct, indirect, incidental,
            consequential, or punitive damages arising from your use of the website or reliance on
            any information provided on the website. This includes, but is not limited to, damages
            from purchasing products based on our reviews or recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Third-Party Links</h2>
          <p>
            Our website contains links to third-party websites and affiliate partners. We are not
            responsible for the content, privacy policies, or practices of these external sites.
            We encourage you to review the terms and privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Intellectual Property</h2>
          <p>
            All content, trademarks, logos, and intellectual property displayed on Par Precision are
            the property of their respective owners. Product names and brands mentioned in our reviews
            are trademarks of their respective companies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective
            immediately upon posting to this page. Your continued use of the website after changes
            are posted constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">10. Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href="mailto:kelvin@listingflare.com" className="text-primary hover:underline">
              kelvin@listingflare.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
