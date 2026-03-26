import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Par Precision privacy policy. Learn how we collect, use, and protect your information.",
  alternates: { canonical: "https://parpercision.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
      <p className="text-muted mb-4">Last updated: March 21, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p>When you visit Par Precision (&quot;parpercision.com&quot;), we may collect certain information automatically, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Usage Data:</strong> Pages viewed, time spent on pages, referring URLs, browser type, device type, and IP address.</li>
            <li><strong>Email Address:</strong> When you voluntarily subscribe to our newsletter or download a guide, we collect the email address you provide.</li>
            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to analyze traffic and personalize your experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Provide and maintain our website content</li>
            <li>Send you newsletters and buying guides you requested</li>
            <li>Analyze website usage to improve our content and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Affiliate Links & Third-Party Services</h2>
          <p>
            Par Precision participates in affiliate marketing programs. When you click on affiliate links
            on our site and make a purchase, we may earn a commission at no additional cost to you.
            These affiliate partners may use cookies to track your purchases.
          </p>
          <p className="mt-3">Third-party services we use include:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Google Analytics:</strong> For website traffic analysis</li>
            <li><strong>Affiliate Networks:</strong> Commission tracking for product links</li>
            <li><strong>Email Service Provider:</strong> For newsletter delivery</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Cookies</h2>
          <p>
            We use cookies to understand how visitors interact with our website. You can control cookies
            through your browser settings. Disabling cookies may limit some website functionality.
          </p>
          <p className="mt-3">Types of cookies we use:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Affiliate Cookies:</strong> Track referrals from our affiliate links</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share
            aggregated, non-personally identifiable information with our partners for analytics purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. However,
            no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Unsubscribe from our email list at any time via the unsubscribe link in every email</li>
            <li>Request deletion of any personal data we have collected</li>
            <li>Opt out of analytics tracking via your browser settings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Children&apos;s Privacy</h2>
          <p>
            Our website is not directed to individuals under the age of 13. We do not knowingly
            collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes
            by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at{" "}
            <a href="mailto:hello@parpercision.com" className="text-primary hover:underline">
              hello@parpercision.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
