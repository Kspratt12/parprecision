import { NewsletterForm } from "@/components/NewsletterForm";
import { CheckCircle, BookOpen, Bell, Gift } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Golf Simulator Buying Guide — Par Precision Newsletter",
  description:
    "Get our free golf simulator buying guide plus weekly deals, new reviews, and expert tips. Get our free golf simulator buying guide plus weekly deals, new reviews, and expert tips.",
  alternates: { canonical: "https://parpercision.com/newsletter" },
};

const benefits = [
  {
    icon: BookOpen,
    title: "Free Buying Guide",
    description: "Our complete golf simulator buying guide with comparison charts, cost breakdowns, and room setup checklists.",
  },
  {
    icon: Bell,
    title: "New Review Alerts",
    description: "Be the first to know when we publish new hands-on reviews and comparison articles.",
  },
  {
    icon: Gift,
    title: "Exclusive Deals",
    description: "We partner with top brands to share deals and discount codes you won't find anywhere else.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
          Newsletter
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
          Get the Free Golf Simulator<br />Buying Guide
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
          Get our free guide to find the perfect golf simulator setup for your space and budget.
          Plus, get weekly deals and new review alerts straight to your inbox.
        </p>
        <div className="flex justify-center">
          <NewsletterForm variant="hero" />
        </div>
        <p className="text-sm text-muted mt-4">No spam, ever. Unsubscribe anytime.</p>
      </div>

      {/* What you get */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="bg-white border border-border rounded-2xl p-8 text-center"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <benefit.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* What's in the guide */}
      <div className="bg-accent border border-primary/20 rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          What&apos;s Inside the Buying Guide
        </h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {[
            "Complete simulator package comparison chart",
            "Room dimension requirements for every setup",
            "Cost breakdown from $500 to $50,000+",
            "Launch monitor accuracy rankings",
            "Best projector and screen pairings",
            "Setup checklist (don't miss a step)",
            "Our top picks for every budget",
            "Common mistakes to avoid",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
