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
    { name: "Buying Guide", href: "https://sprattler3.gumroad.com/l/best-golf-simulator-for-home-pdf-guide" },
    { name: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            <Image src="/Logo.png" alt="Par Precision" width={32} height={32} className="rounded-lg" />
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
