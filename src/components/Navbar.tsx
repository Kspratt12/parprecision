"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Simulators",
    href: "/best-golf-simulators-for-home",
    children: [
      { name: "Best Golf Simulators 2026", href: "/best-golf-simulators-for-home" },
      { name: "Best for Small Spaces", href: "/best-golf-simulators-for-small-spaces" },
      { name: "Best Budget Simulators", href: "/best-golf-simulators-for-the-money" },
      { name: "Simulator Setup Guide", href: "/how-to-build-a-golf-simulator-2" },
      { name: "Room Dimensions Guide", href: "/how-much-space-is-needed-for-a-golf-simulator" },
    ],
  },
  {
    name: "Launch Monitors",
    href: "/best-golf-launch-monitors",
    children: [
      { name: "Best Launch Monitors 2026", href: "/best-golf-launch-monitors" },
      { name: "Best Portable Launch Monitors", href: "/best-portable-golf-launch-monitors" },
      { name: "Best Overhead Launch Monitors", href: "/best-overhead-launch-monitors-review" },
    ],
  },
  {
    name: "Reviews",
    href: "/reviews",
    children: [
      { name: "SkyTrak+ Review", href: "/skytrak-plus-for-beginners" },
      { name: "Garmin Approach R50 Review", href: "/garmin-approach-r50" },
      { name: "Bushnell Launch Pro Review", href: "/bushnell-lpi" },
      { name: "Foresight GC3 Review", href: "/foresight-sports-gc3" },
      { name: "All Reviews →", href: "/reviews" },
    ],
  },
  { name: "Guides", href: "/guides" },
  { name: "Golf Tips", href: "/golf-tips" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/Logo.png"
              alt="Par Precision"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="text-xl font-bold text-foreground tracking-tight">
              Par <span className="text-primary">Precision</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg hover:bg-accent transition-colors"
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-lg border border-border py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-accent hover:text-primary transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:text-primary hover:bg-accent rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/newsletter"
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-sm"
            >
              Free Guide →
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-accent rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-accent rounded-lg"
                  onClick={() => !item.children && setMobileOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-8">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-500 hover:text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 px-4">
              <Link
                href="/newsletter"
                className="block w-full text-center px-5 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get Free Simulator Guide →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
