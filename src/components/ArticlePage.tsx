import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, RefreshCw, User } from "lucide-react";
import type { Article } from "@/content/articles";

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function makeId(text: string): string {
  return stripHtmlTags(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function TableOfContents({ content }: { content: string }) {
  const headingRegex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const headings: { text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const rawText = match[1];
    const cleanText = stripHtmlTags(rawText);
    if (cleanText.length > 0) {
      headings.push({ text: cleanText, id: makeId(rawText) });
    }
  }

  if (headings.length < 2) return null;

  return (
    <nav className="bg-surface border border-border rounded-xl p-6 mb-8">
      <h2 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={`#${h.id}`}
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function addHeadingIds(content: string): string {
  return content.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_, attrs, text) => {
    const id = makeId(text);
    return `<h2 id="${id}"${attrs}>${text}</h2>`;
  });
}

function styleFAQSection(content: string): string {
  const faqPattern = /(<h2[^>]*>[\s\S]*?(?:Frequently Asked Questions|FAQ|FAQs)[\s\S]*?<\/h2>)/i;
  const faqSplit = content.split(faqPattern);
  if (faqSplit.length < 2) return content;

  const beforeFaq = faqSplit[0];
  const faqHeading = faqSplit[1];
  const afterFaqHeading = faqSplit.slice(2).join("");

  const relatedIdx = afterFaqHeading.indexOf("<h2");
  const faqContent = relatedIdx > 0 ? afterFaqHeading.substring(0, relatedIdx) : afterFaqHeading;
  const afterFaq = relatedIdx > 0 ? afterFaqHeading.substring(relatedIdx) : "";

  let styledFaq = faqContent.replace(
    /<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi,
    '<div class="faq-card"><h3>$1</h3><p>$2</p></div>'
  );
  styledFaq = styledFaq.replace(
    /<h4>([\s\S]*?)<\/h4>\s*<p>([\s\S]*?)<\/p>/gi,
    '<div class="faq-card"><h3>$1</h3><p>$2</p></div>'
  );
  styledFaq = styledFaq.replace(
    /<p><strong>([\s\S]*?\?)<\/strong><\/p>\s*<p>([\s\S]*?)<\/p>/gi,
    '<div class="faq-card"><h3>$1</h3><p>$2</p></div>'
  );

  return beforeFaq + faqHeading + styledFaq + afterFaq;
}

function extractFAQs(content: string) {
  // Split on any FAQ heading variation
  const faqParts = content.split(/<h2[^>]*>[\s\S]*?(?:Frequently Asked Questions|FAQ|FAQs)[\s\S]*?<\/h2>/i);
  if (faqParts.length < 2) return [];

  const faqSection = faqParts[1];
  const nextH2 = faqSection.indexOf("<h2");
  const faqOnly = nextH2 > 0 ? faqSection.substring(0, nextH2) : faqSection;

  const faqs: { "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }[] = [];

  // Match h3, h4, and bold patterns
  const patterns = [
    /<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi,
    /<h4>([\s\S]*?)<\/h4>\s*<p>([\s\S]*?)<\/p>/gi,
    /<p><strong>([\s\S]*?\?)<\/strong><\/p>\s*<p>([\s\S]*?)<\/p>/gi,
  ];

  for (const regex of patterns) {
    let match;
    while ((match = regex.exec(faqOnly)) !== null) {
      faqs.push({
        "@type": "Question",
        name: stripHtmlTags(match[1]),
        acceptedAnswer: {
          "@type": "Answer",
          text: stripHtmlTags(match[2]),
        },
      });
    }
  }

  return faqs;
}

export function ArticlePage({ article }: { article: Article }) {
  const processedContent = styleFAQSection(addHeadingIds(article.content));
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const todayISO = new Date().toISOString().split("T")[0];

  // Check if article has any FAQ section
  const hasFAQ = /Frequently Asked Questions|FAQ|FAQs/i.test(article.content);

  return (
    <>
      {/* Article JSON-LD with author */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            image: article.coverImage,
            datePublished: article.date,
            dateModified: todayISO,
            author: {
              "@type": "Person",
              name: "Kelvin Spratt",
              jobTitle: "Golf Technology Writer",
              url: "https://parpercision.com/about",
              worksFor: {
                "@type": "Organization",
                name: "Par Precision",
              },
            },
            publisher: {
              "@type": "Organization",
              name: "Par Precision",
              logo: {
                "@type": "ImageObject",
                url: "https://parpercision.com/Logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://parpercision.com/${article.slug}`,
            },
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://parpercision.com" },
              { "@type": "ListItem", position: 2, name: article.categoryLabel, item: `https://parpercision.com/${article.category === "guides" ? "guides" : article.category === "golf-tips" ? "golf-tips" : "reviews"}` },
              { "@type": "ListItem", position: 3, name: article.title },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      {hasFAQ && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: extractFAQs(article.content),
            }),
          }}
        />
      )}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/${article.category === "guides" ? "guides" : article.category === "golf-tips" ? "golf-tips" : "reviews"}`}
            className="hover:text-primary transition-colors capitalize"
          >
            {article.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{article.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {article.categoryLabel}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            {article.title}
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-6">{article.description}</p>

          {/* Author + dates */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <Link href="/about" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-medium text-foreground">Kelvin Spratt</span>
            </Link>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>Published {formattedDate}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Updated {today}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{article.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-10 shadow-lg">
          <Image
            src={article.coverImage}
            alt={article.coverImageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        {/* Affiliate Disclosure Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-amber-800">
          <strong>Disclosure:</strong> This article may contain affiliate links. We may earn a
          commission if you make a purchase through our links, at no extra cost to you.{" "}
          <Link href="/affiliate-disclosure" className="underline hover:text-amber-900">
            Learn more
          </Link>
        </div>

        {/* Table of Contents */}
        <TableOfContents content={article.content} />

        {/* Article Content */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />

        {/* Author Bio Box */}
        <div className="bg-surface border border-border rounded-2xl p-6 mt-12 flex gap-5 items-start">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div>
            <Link href="/about" className="font-bold text-foreground hover:text-primary transition-colors">
              Kelvin Spratt
            </Link>
            <p className="text-sm text-primary font-medium mb-2">Golf Technology Writer at Par Precision</p>
            <p className="text-sm text-muted leading-relaxed">
              Kelvin has been covering golf simulators and launch monitors since 2023. He researches and compares products from SkyTrak, TrackMan, Foresight Sports, Garmin, Uneekor, and more to help golfers find the right setup for their home.
            </p>
          </div>
        </div>

        {/* Buying Guide CTA */}
        <div className="bg-surface border border-border rounded-2xl p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Golf Simulator Buying Guide
          </h3>
          <p className="text-muted mb-6 max-w-md mx-auto">
            The complete guide to choosing the right simulator for your space and budget. Top picks, room requirements, and money-saving tips.
          </p>
          <a
            href="https://sprattler3.gumroad.com/l/best-golf-simulator-for-home-pdf-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-sm"
          >
            Get the Buying Guide - $19.95
          </a>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </article>
    </>
  );
}
