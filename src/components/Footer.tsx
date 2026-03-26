import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  "Golf Simulators": [
    { name: "Best Golf Simulators 2026", href: "/best-golf-simulators-for-home" },
    { name: "Best for Small Spaces", href: "/best-golf-simulators-for-small-spaces" },
    { name: "Best Budget Simulators", href: "/best-golf-simulators-for-the-money" },
    { name: "Golf Simulator Cost Guide", href: "/golf-simulator-cost-2026" },
    { name: "Room Dimensions Guide", href: "/how-much-space-is-needed-for-a-golf-simulator" },
  ],
  "Launch Monitors": [
    { name: "Best Launch Monitors 2026", href: "/best-golf-launch-monitors" },
    { name: "Best Portable Options", href: "/best-portable-golf-launch-monitors" },
    { name: "Best Overhead Monitors", href: "/best-overhead-launch-monitors-review" },
    { name: "SkyTrak+ Review", href: "/skytrak-plus-for-beginners" },
    { name: "Garmin R50 Review", href: "/garmin-approach-r50" },
  ],
  "Guides & Tips": [
    { name: "How to Build a Simulator", href: "/how-to-build-a-golf-simulator-2" },
    { name: "Golf Tips", href: "/golf-tips" },
    { name: "All Guides", href: "/guides" },
    { name: "All Reviews", href: "/reviews" },
    { name: "Blog", href: "/blog" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Get the Free Golf Simulator Buying Guide
          </h3>
          <p className="text-muted max-w-2xl mx-auto mb-6">
            Get our free guide to find the perfect golf simulator setup for your space and budget.
            Plus, get weekly deals and new review alerts.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-border bg-white text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-sm whitespace-nowrap"
            >
              Send Me the Guide
            </button>
          </form>
          <p className="text-xs text-muted mt-3">No spam, ever. Unsubscribe anytime.</p>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/Logo.png" alt="Par Precision" width={88} height={29} className="rounded" />
            <span className="font-bold text-foreground">
              Par <span className="text-primary">Precision</span>
            </span>
          </div>
          <p className="text-sm text-muted text-center">
            © {new Date().getFullYear()} Par Precision. All rights reserved. We may earn commissions from qualifying purchases.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted hover:text-primary">
              Privacy
            </Link>
            <Link href="/affiliate-disclosure" className="text-sm text-muted hover:text-primary">
              Disclosure
            </Link>
            <Link href="/contact" className="text-sm text-muted hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
