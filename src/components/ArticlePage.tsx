import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
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
  // Match h2 tags with any attributes or nested HTML (like <strong>)
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
  // Match any FAQ heading variation
  const faqPattern = /(<h2[^>]*>[\s\S]*?(?:Frequently Asked Questions|FAQ|FAQs)[\s\S]*?<\/h2>)/i;
  const faqSplit = content.split(faqPattern);
  if (faqSplit.length < 2) return content;

  const beforeFaq = faqSplit[0];
  const faqHeading = faqSplit[1];
  const afterFaqHeading = faqSplit.slice(2).join("");

  // Find next H2 (Related Articles or other section) to know where FAQ ends
  const relatedIdx = afterFaqHeading.indexOf("<h2");
  const faqContent = relatedIdx > 0 ? afterFaqHeading.substring(0, relatedIdx) : afterFaqHeading;
  const afterFaq = relatedIdx > 0 ? afterFaqHeading.substring(relatedIdx) : "";

  // Wrap each H3+P pair in a card div
  // Also handle cases where the question is just bold text in a paragraph
  let styledFaq = faqContent.replace(
    /<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi,
    '<div class="faq-card"><h3>$1</h3><p>$2</p></div>'
  );

  // Also catch pattern: <p><strong>Question?</strong></p><p>Answer</p> (WordPress FAQ style)
  styledFaq = styledFaq.replace(
    /<p><strong>([\s\S]*?\?)<\/strong><\/p>\s*<p>([\s\S]*?)<\/p>/gi,
    '<div class="faq-card"><h3>$1</h3><p>$2</p></div>'
  );

  return beforeFaq + faqHeading + styledFaq + afterFaq;
}

export function ArticlePage({ article }: { article: Article }) {
  const processedContent = styleFAQSection(addHeadingIds(article.content));
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Article JSON-LD */}
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
            dateModified: article.date,
            author: {
              "@type": "Organization",
              name: "Par Precision",
              url: "https://parpercision.com",
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

      {/* FAQ Schema if FAQ section exists */}
      {article.content.includes("Frequently Asked Questions") && (
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
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
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
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <div className="flex items-center gap-1.5">
              <Image src="/Logo.png" alt="Par Precision" width={24} height={24} className="rounded" />
              <span className="font-medium text-foreground">{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>{formattedDate}</time>
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

        {/* Newsletter CTA */}
        <div className="bg-surface border border-border rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Get Our Free Golf Simulator Buying Guide
          </h3>
          <p className="text-muted mb-6 max-w-md mx-auto">
            Our complete guide helps you choose the right simulator for your space and budget.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
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

function extractFAQs(content: string) {
  const faqSection = content.split("Frequently Asked Questions")[1];
  if (!faqSection) return [];

  const faqs: { "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }[] = [];
  const h3Regex = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g;
  let match;

  while ((match = h3Regex.exec(faqSection)) !== null) {
    faqs.push({
      "@type": "Question",
      name: match[1],
      acceptedAnswer: {
        "@type": "Answer",
        text: match[2].replace(/<[^>]*>/g, ""),
      },
    });
  }

  return faqs;
}
