"use client";

import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

export function NewsletterForm({ variant = "inline" }: { variant?: "inline" | "hero" | "sticky" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/xpwrawvy", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, _subject: "New Newsletter Subscriber — Par Precision" }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-primary font-medium">
        <CheckCircle className="w-5 h-5" />
        <span>Check your inbox! Thanks for signing up!.</span>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full pl-12 pr-4 py-4 rounded-full border border-border bg-white text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-base shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-md hover:shadow-lg disabled:opacity-60 text-base whitespace-nowrap"
        >
          {status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Get the Guide →"
          )}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 px-4 py-3 rounded-full border border-border bg-white text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-60 whitespace-nowrap"
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        ) : (
          "Get the Guide"
        )}
      </button>
    </form>
  );
}
