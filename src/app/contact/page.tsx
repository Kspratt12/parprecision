"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xpwrawvy", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
      <p className="text-lg text-muted mb-10">
        Have a question about golf simulators or launch monitors? Want to suggest a product for
        review? We&apos;d love to hear from you.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: Mail,
            title: "Email",
            desc: "kelvin@listingflare.com",
            href: "mailto:kelvin@listingflare.com",
          },
          {
            icon: MessageSquare,
            title: "Response Time",
            desc: "Usually within 24 hours",
            href: null,
          },
          {
            icon: Send,
            title: "Product Reviews",
            desc: "We're always looking for new products to test",
            href: null,
          },
        ].map((item) => (
          <div key={item.title} className="bg-surface border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
            {item.href ? (
              <a href={item.href} className="text-sm text-primary hover:underline">
                {item.desc}
              </a>
            ) : (
              <p className="text-sm text-muted">{item.desc}</p>
            )}
          </div>
        ))}
      </div>

      {status === "sent" ? (
        <div className="bg-accent border border-primary/20 rounded-2xl p-8 text-center">
          <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h2>
          <p className="text-muted">We&apos;ll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option>General Question</option>
              <option>Product Review Request</option>
              <option>Correction or Update</option>
              <option>Business Inquiry</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              placeholder="How can we help?"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">Something went wrong. Please try again or email us directly.</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
