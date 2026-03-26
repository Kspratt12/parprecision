/**
 * Generate Next.js content files from migrated WordPress articles.
 * Creates TypeScript content files and route pages.
 */

const fs = require("fs");
const path = require("path");

const articles = JSON.parse(
  fs.readFileSync(path.join(__dirname, "migrated-articles.json"), "utf8")
);
const titleFixes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "title-fixes.json"), "utf8")
);

const SRC = path.join(__dirname, "..", "src");
const CONTENT_DIR = path.join(SRC, "content");
const APP_DIR = path.join(SRC, "app");

// Apply title fixes
for (const article of articles) {
  if (titleFixes[article.slug]) {
    article.title = titleFixes[article.slug].replace(/&amp;/g, "&");
  }
}

// ── Group articles by category ────────────────────────────────────────────────

const groups = {
  "launch-monitors": { file: "wp-reviews.ts", exportName: "wpReviewArticles", articles: [] },
  comparisons: { file: "wp-comparisons.ts", exportName: "wpComparisonArticles", articles: [] },
  simulators: { file: "wp-simulators.ts", exportName: "wpSimulatorArticles", articles: [] },
  "golf-tips": { file: "wp-golf-tips.ts", exportName: "wpGolfTipArticles", articles: [] },
  guides: { file: "wp-guides.ts", exportName: "wpGuideArticles", articles: [] },
};

for (const article of articles) {
  const group = groups[article.category];
  if (group) group.articles.push(article);
  else groups.guides.articles.push(article);
}

// ── Escape content for TypeScript template literal ────────────────────────────

function escapeForTemplateLiteral(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

// ── Generate content TypeScript files ─────────────────────────────────────────

for (const [category, group] of Object.entries(groups)) {
  if (group.articles.length === 0) continue;

  let ts = `import type { Article } from "./articles";\n\n`;
  ts += `export const ${group.exportName}: Article[] = [\n`;

  for (const article of group.articles) {
    const escapedContent = escapeForTemplateLiteral(article.content);
    const escapedTitle = article.title.replace(/'/g, "\\'").replace(/"/g, '\\"');
    const escapedDesc = (article.description || "").replace(/'/g, "\\'").replace(/"/g, '\\"');
    const escapedCoverAlt = article.coverImageAlt.replace(/'/g, "\\'").replace(/"/g, '\\"');

    ts += `  {\n`;
    ts += `    slug: "${article.slug}",\n`;
    ts += `    title: "${escapedTitle}",\n`;
    ts += `    description:\n`;
    ts += `      "${escapedDesc}",\n`;
    ts += `    date: "${article.date}",\n`;
    ts += `    author: "Par Precision",\n`;
    ts += `    category: "${article.category}",\n`;
    ts += `    categoryLabel: "${article.categoryLabel}",\n`;
    ts += `    keywords: [${article.keywords.map((k) => `"${k.replace(/"/g, '\\"')}"`).join(", ")}],\n`;
    ts += `    readingTime: "${article.readingTime}",\n`;
    ts += `    coverImage: "${article.coverImage}",\n`;
    ts += `    coverImageAlt: "${escapedCoverAlt}",\n`;
    ts += `    content: \`\n${escapedContent}\n\`,\n`;
    ts += `  },\n`;
  }

  ts += `];\n`;

  const filePath = path.join(CONTENT_DIR, group.file);
  fs.writeFileSync(filePath, ts);
  console.log(`Created ${group.file} (${group.articles.length} articles)`);
}

// ── Update articles.ts to import new content files ────────────────────────────

const articlesTs = fs.readFileSync(path.join(CONTENT_DIR, "articles.ts"), "utf8");

// Check which imports already exist
const newImports = [];
const newArrayEntries = [];

for (const [category, group] of Object.entries(groups)) {
  if (group.articles.length === 0) continue;
  const importName = group.exportName;
  const fileName = group.file.replace(".ts", "");

  if (!articlesTs.includes(importName)) {
    newImports.push(`import { ${importName} } from "./${fileName}";`);
    newArrayEntries.push(`  ...${importName},`);
  }
}

if (newImports.length > 0) {
  // Add imports after the last existing import
  const lastImportIdx = articlesTs.lastIndexOf("import ");
  const nextLineIdx = articlesTs.indexOf("\n", lastImportIdx);
  const importBlock = newImports.join("\n");

  let updatedArticlesTs = articlesTs.slice(0, nextLineIdx + 1) + importBlock + "\n" + articlesTs.slice(nextLineIdx + 1);

  // Add to the articles array - find where all articles are combined
  // Look for the articles array definition
  const arrayEntries = newArrayEntries.join("\n");

  // Find the pattern where articles are spread into the array
  const spreadPattern = /\.\.\.buildGuideArticle,?/;
  const spreadMatch = updatedArticlesTs.match(spreadPattern);
  if (spreadMatch) {
    updatedArticlesTs = updatedArticlesTs.replace(
      spreadPattern,
      spreadMatch[0] + "\n" + arrayEntries
    );
  }

  fs.writeFileSync(path.join(CONTENT_DIR, "articles.ts"), updatedArticlesTs);
  console.log("Updated articles.ts with new imports");
}

// ── Generate route pages ──────────────────────────────────────────────────────

// Articles need route pages. Check existing routing patterns.
// Reviews use: /reviews/[slug]/page.tsx
// Comparisons use: /comparisons/[slug]/page.tsx
// Golf tips use: /golf-tips/[slug]/page.tsx
// But WordPress used flat URLs: /slug/

// To preserve Google's indexed URLs, we need FLAT routes matching the WordPress slugs.
// Create /app/[slug]/page.tsx as a catch-all for migrated articles.

const wpSlugs = articles.map((a) => a.slug);

// Create the catch-all page
const catchAllPage = `import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/content/articles";
import ArticlePage from "@/components/ArticlePage";
import type { Metadata } from "next";

// All WordPress-migrated article slugs
const wpSlugs = new Set(${JSON.stringify(wpSlugs)});

export async function generateStaticParams() {
  return Array.from(wpSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title + " | Par Precision",
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      url: \`https://parpercision.com/\${article.slug}\`,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.coverImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.coverImage],
    },
    alternates: {
      canonical: \`https://parpercision.com/\${article.slug}\`,
    },
  };
}

export default async function WPArticlePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  if (!wpSlugs.has(slug)) {
    notFound();
  }

  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  return <ArticlePage article={article} />;
}
`;

// Create the [slug] directory
const slugDir = path.join(APP_DIR, "[slug]");
if (!fs.existsSync(slugDir)) {
  fs.mkdirSync(slugDir, { recursive: true });
}
fs.writeFileSync(path.join(slugDir, "page.tsx"), catchAllPage);
console.log(`Created [slug]/page.tsx catch-all route (${wpSlugs.length} slugs)`);

// ── Summary ──────────────────────────────────────────────────────────────────

console.log("\n=== Generation Complete ===");
console.log(`Content files: ${Object.values(groups).filter((g) => g.articles.length > 0).length}`);
console.log(`Total articles: ${articles.length}`);
console.log(`Route: /[slug]/ catch-all for all migrated articles`);
console.log("\nNext steps:");
console.log("1. Update articles.ts imports manually if auto-update failed");
console.log("2. Add redirects in next.config.ts");
console.log("3. Update sitemap.ts");
console.log("4. Run: npm run build");
