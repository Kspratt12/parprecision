import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parpercision.com"),
  title: {
    default: "Par Percision | Golf Simulator & Launch Monitor Reviews",
    template: "%s | Par Percision",
  },
  description:
    "Independent golf simulator and launch monitor reviews. Compare SkyTrak, TrackMan, Foresight, Garmin, Uneekor and more. Honest buying guides since 2023.",
  keywords: [
    "best golf simulator",
    "best golf simulator for home",
    "golf launch monitor",
    "golf launch monitor reviews",
    "best launch monitor 2026",
    "golf simulator reviews",
    "home golf simulator",
    "golf simulator comparison",
    "SkyTrak review",
    "TrackMan iO review",
    "Foresight GCQuad review",
    "Garmin Approach R50",
    "Uneekor EYE MINI",
    "golf simulator cost",
    "golf simulator room dimensions",
    "best overhead launch monitor",
    "best portable launch monitor",
  ],
  authors: [{ name: "Par Percision" }],
  creator: "Par Percision",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parpercision.com",
    siteName: "Par Percision",
    title: "Par Percision - Golf Simulator & Launch Monitor Reviews",
    description:
      "Expert reviews, comparisons, and buying guides for golf simulators and launch monitors.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Par Percision - Golf Simulator & Launch Monitor Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Par Percision - Golf Simulator & Launch Monitor Reviews",
    description:
      "Expert reviews, comparisons, and buying guides for golf simulators and launch monitors.",
    images: ["/og-image.png"],
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
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-49DYQHPGQ2" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-49DYQHPGQ2');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
