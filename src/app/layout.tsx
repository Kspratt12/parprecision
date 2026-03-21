import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parprecision.com"),
  title: {
    default: "Par Precision — Golf Simulator & Launch Monitor Reviews",
    template: "%s | Par Precision",
  },
  description:
    "Expert reviews, comparisons, and buying guides for golf simulators and launch monitors. Find the perfect setup for your home golf experience.",
  keywords: [
    "best golf simulator",
    "golf launch monitor",
    "golf simulator reviews",
    "home golf simulator",
    "best launch monitor",
    "golf simulator comparison",
    "SkyTrak review",
    "Garmin R10 review",
    "golf simulator setup",
    "golf simulator room dimensions",
  ],
  authors: [{ name: "Par Precision" }],
  creator: "Par Precision",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parprecision.com",
    siteName: "Par Precision",
    title: "Par Precision — Golf Simulator & Launch Monitor Reviews",
    description:
      "Expert reviews, comparisons, and buying guides for golf simulators and launch monitors.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Par Precision - Golf Simulator & Launch Monitor Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Par Precision — Golf Simulator & Launch Monitor Reviews",
    description:
      "Expert reviews, comparisons, and buying guides for golf simulators and launch monitors.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
