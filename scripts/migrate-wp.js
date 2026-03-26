/**
 * WordPress to Next.js Migration Script
 * Parses wp_posts.csv and wp_postmeta.csv to extract all published articles
 * and converts WordPress block markup to clean HTML.
 */

const fs = require("fs");
const path = require("path");

// ── CSV Parsing ──────────────────────────────────────────────────────────────

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Split into records respecting quoted fields with newlines
  const records = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (ch === '"') {
      if (inQuotes && content[i + 1] === '"') {
        current += '""';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      current += ch;
    } else if (ch === "\n" && !inQuotes) {
      records.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) records.push(current);

  // Parse header
  const header = parseCSVRow(records[0]);

  // Parse rows
  const rows = [];
  for (let i = 1; i < records.length; i++) {
    const fields = parseCSVRow(records[i]);
    const row = {};
    for (let j = 0; j < header.length; j++) {
      row[header[j]] = fields[j] || "";
    }
    rows.push(row);
  }
  return rows;
}

function parseCSVRow(row) {
  const fields = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      if (inQ && row[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQ = !inQ;
      }
    } else if (ch === "," && !inQ) {
      fields.push(field);
      field = "";
    } else {
      field += ch;
    }
  }
  fields.push(field);
  return fields;
}

// ── WordPress Block Markup Stripper ──────────────────────────────────────────

function stripWPBlocks(html) {
  if (!html) return "";

  let clean = html;

  // Remove all WordPress block comments: <!-- wp:anything --> and <!-- /wp:anything -->
  clean = clean.replace(/<!--\s*\/?wp:[^>]*-->/g, "");

  // Remove Kadence/Stackable wrapper divs with data attributes
  // Remove style tags embedded in blocks
  clean = clean.replace(/<style>[^<]*<\/style>/g, "");

  // Remove complex div wrappers from page builders
  // Keep content inside but remove the wrapper divs with block-builder classes
  clean = clean.replace(
    /<div[^>]*class="[^"]*(?:wp-block-|stk-|kt-|kb-|kadence-)[^"]*"[^>]*>/gi,
    ""
  );
  // Remove corresponding closing divs (approximate - we'll clean up later)

  // Remove span wrappers from Stackable
  clean = clean.replace(
    /<span[^>]*class="[^"]*(?:stk-|wp-block-stackable)[^"]*"[^>]*>/gi,
    ""
  );

  // Remove figure wrappers but keep img tags
  clean = clean.replace(/<figure[^>]*>/gi, "");
  clean = clean.replace(/<\/figure>/gi, "");

  // Clean up data attributes
  clean = clean.replace(/\s*data-[a-z-]+="[^"]*"/gi, "");
  clean = clean.replace(/\s*data-[a-z-]+='[^']*'/gi, "");

  // Remove empty divs and spans
  clean = clean.replace(/<div[^>]*>\s*<\/div>/gi, "");
  clean = clean.replace(/<span[^>]*>\s*<\/span>/gi, "");

  // Remove orphaned closing tags from stripped wrappers
  // Do multiple passes to catch nested structures
  for (let i = 0; i < 5; i++) {
    clean = clean.replace(/<div[^>]*>\s*<\/div>/gi, "");
    clean = clean.replace(/<span[^>]*>\s*<\/span>/gi, "");
  }

  // Clean up remaining builder-specific divs (be aggressive)
  clean = clean.replace(
    /<div[^>]*class="[^"]*(?:inner-column|stk-row|stk-inner|stk-block-content|stk-button-group|stk-content-align|kt-inside-inner-col|alignfull|alignwide)[^"]*"[^>]*>/gi,
    ""
  );

  // Convert Kadence/Stackable buttons to regular links
  // <a class="stk-link stk-button..." href="..."><span class="stk-button__inner-text">Text</span></a>
  clean = clean.replace(
    /<a[^>]*class="[^"]*stk-button[^"]*"[^>]*href="([^"]*)"[^>]*>[\s\S]*?<span[^>]*class="[^"]*stk-button__inner-text[^"]*"[^>]*>([\s\S]*?)<\/span>[\s\S]*?<\/a>/gi,
    '<p><a href="$1"><strong>$2</strong></a></p>'
  );

  // Convert Kadence buttons similarly
  clean = clean.replace(
    /<a[^>]*class="[^"]*kt-button[^"]*"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    '<p><a href="$1"><strong>$2</strong></a></p>'
  );

  // Clean up Stackable price blocks
  clean = clean.replace(
    /<div[^>]*class="[^"]*stk-block-price[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
    ""
  );

  // Remove remaining orphaned closing divs/spans
  // Count opens vs closes and remove extras
  let openDivs = (clean.match(/<div[\s>]/gi) || []).length;
  let closeDivs = (clean.match(/<\/div>/gi) || []).length;
  while (closeDivs > openDivs) {
    clean = clean.replace(/<\/div>/, "");
    closeDivs--;
  }
  while (openDivs > closeDivs) {
    clean = clean.replace(/<div[^>]*>/, "");
    openDivs--;
  }

  let openSpans = (clean.match(/<span[\s>]/gi) || []).length;
  let closeSpans = (clean.match(/<\/span>/gi) || []).length;
  while (closeSpans > openSpans) {
    clean = clean.replace(/<\/span>/, "");
    closeSpans--;
  }
  while (openSpans > closeSpans) {
    clean = clean.replace(/<span[^>]*>/, "");
    openSpans--;
  }

  // Fix image tags - ensure they have alt text
  clean = clean.replace(/<img([^>]*)alt=""\s*/gi, '<img$1alt="Golf equipment" ');
  clean = clean.replace(/<img([^>]*)alt=''\s*/gi, "<img$1alt='Golf equipment' ");

  // Remove class attributes from standard HTML elements (clean output)
  clean = clean.replace(
    /(<(?:p|ul|ol|li|h[1-6]|blockquote|table|thead|tbody|tr|th|td|div|span|a|img|em|strong))\s+class="[^"]*"/gi,
    "$1"
  );

  // Remove id attributes from headings (we'll regenerate in Next.js)
  clean = clean.replace(/(<h[1-6])\s+id="[^"]*"/gi, "$1");

  // Clean up excessive whitespace
  clean = clean.replace(/\n{4,}/g, "\n\n\n");
  clean = clean.replace(/^\s+$/gm, "");

  // Remove any remaining empty tags
  clean = clean.replace(/<p>\s*<\/p>/gi, "");
  clean = clean.replace(/<li>\s*<\/li>/gi, "");

  // Final cleanup - trim lines
  clean = clean
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim();

  return clean;
}

// ── Category Detection ───────────────────────────────────────────────────────

function detectCategory(slug, title, content) {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();

  // Comparisons (vs articles)
  if (s.includes("-vs-") || t.includes(" vs ") || t.includes(" vs.")) {
    return { category: "comparisons", categoryLabel: "Comparison" };
  }

  // Reviews (specific product reviews)
  if (
    s.includes("-review") ||
    t.includes("review") ||
    // Single product slugs that are reviews
    [
      "bushnell-launch-pro",
      "bushnell-lpi",
      "foresight-falcon",
      "foresight-sports-gchawk",
      "foresight-sports-gc3",
      "foresight-sports-gc3s",
      "foresight-sports-gcquad",
      "foresight-sports-quadmax",
      "trugolf-apogee",
      "protee-vx",
      "uneekor-eye-mini",
      "uneekor-eye-mini-lite",
      "uneekor-eye-xo2",
      "uneekor-qed",
      "hd-golf-simulator",
      "garmin-approach-r50",
      "skytrak-plus",
    ].includes(s)
  ) {
    return { category: "launch-monitors", categoryLabel: "Launch Monitor Review" };
  }

  // Golf tips
  if (
    s.includes("golf-swing") ||
    s.includes("drill") ||
    t.includes("drill") ||
    t.includes("swing")
  ) {
    return { category: "golf-tips", categoryLabel: "Golf Tips" };
  }

  // Guides
  if (
    s.includes("how-to") ||
    s.includes("setup") ||
    s.includes("cost") ||
    s.includes("room-dimensions") ||
    s.includes("turf") ||
    s.includes("space") ||
    s.includes("how-much") ||
    s.includes("how-profitable") ||
    s.includes("why-are") ||
    s.includes("what-is-the-best") ||
    s.includes("what-is-the-most") ||
    s.includes("is-it-worth") ||
    s.includes("do-golf-simulators") ||
    t.includes("guide") ||
    t.includes("how to") ||
    t.includes("cost") ||
    t.includes("dimensions")
  ) {
    return { category: "guides", categoryLabel: "Guide" };
  }

  // Best-of lists (simulators or launch monitors)
  if (s.includes("launch-monitor") || s.includes("what-launch-monitor")) {
    return { category: "launch-monitors", categoryLabel: "Launch Monitors" };
  }
  if (s.includes("simulator") || s.includes("golf-simulator")) {
    return { category: "simulators", categoryLabel: "Golf Simulators" };
  }

  // Default
  return { category: "guides", categoryLabel: "Guide" };
}

// ── Reading Time Estimation ──────────────────────────────────────────────────

function estimateReadingTime(html) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const words = text.split(" ").filter((w) => w.length > 0).length;
  const minutes = Math.max(3, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// ── Main Migration ───────────────────────────────────────────────────────────

function main() {
  console.log("=== WordPress → Next.js Migration ===\n");

  // Parse CSVs
  console.log("Parsing wp_posts.csv...");
  const posts = parseCSV("C:/Users/kelvink/Desktop/wp_posts.csv");
  console.log(`  Found ${posts.length} total records`);

  console.log("Parsing wp_postmeta.csv...");
  const postmeta = parseCSV("C:/Users/kelvink/Desktop/wp_postmeta.csv");
  console.log(`  Found ${postmeta.length} meta records`);

  // Build meta lookup: post_id -> { title, description, focuskw }
  const metaMap = {};
  for (const meta of postmeta) {
    const pid = meta.post_id;
    if (!metaMap[pid]) metaMap[pid] = {};

    if (meta.meta_key === "_yoast_wpseo_title") {
      metaMap[pid].seoTitle = meta.meta_value;
    }
    if (meta.meta_key === "_yoast_wpseo_metadesc") {
      metaMap[pid].seoDescription = meta.meta_value;
    }
    if (meta.meta_key === "_yoast_wpseo_focuskw") {
      metaMap[pid].focusKeyword = meta.meta_value;
    }
  }

  // Filter published posts and pages with content
  const published = posts.filter(
    (p) =>
      p.post_status === "publish" &&
      (p.post_type === "post" || p.post_type === "page") &&
      p.post_name &&
      p.post_content &&
      p.post_content.length > 200 // Skip empty/tiny entries
  );

  console.log(`\nFound ${published.length} published posts/pages with content\n`);

  // Slugs already in the Next.js site (don't overwrite these)
  const existingSlugs = new Set([
    "best-golf-simulators",
    "best-golf-simulators-small-spaces",
    "best-budget-golf-simulators",
    "best-launch-monitors",
    "best-overhead-launch-monitors",
    "best-portable-launch-monitors",
    "skytrak-plus",
    "garmin-approach-r10",
    "bushnell-launch-pro",
    "flightscope-mevo-plus",
    "garmin-r10-vs-skytrak-plus",
    "how-to-fix-a-slice",
    "how-to-increase-clubhead-speed",
    "golf-simulator-cost",
    "golf-simulator-room-dimensions",
    "how-to-build-golf-simulator",
  ]);

  // Skip non-content pages
  const skipSlugs = new Set([
    "about-us",
    "contact-us",
    "privacy-policy",
    "affiliate-disclosure",
    "parprecision",
    "cropped-parprecision-png",
    "navigation",
    "blocksy-child",
    "blocksy",
    "home",
  ]);

  const articlesToMigrate = [];

  for (const post of published) {
    const slug = post.post_name;

    if (existingSlugs.has(slug) || skipSlugs.has(slug)) {
      console.log(`  SKIP (exists): /${slug}/`);
      continue;
    }

    // Get SEO meta
    const meta = metaMap[post.ID] || {};

    // Detect category
    const { category, categoryLabel } = detectCategory(
      slug,
      post.post_title,
      post.post_content
    );

    // Strip WordPress block markup
    const cleanContent = stripWPBlocks(post.post_content);

    // Generate description from Yoast or first paragraph
    let description = meta.seoDescription || "";
    if (!description) {
      const firstP = cleanContent.match(/<p>([\s\S]*?)<\/p>/);
      if (firstP) {
        description = firstP[1]
          .replace(/<[^>]+>/g, "")
          .substring(0, 160)
          .trim();
      }
    }

    // Generate keywords from focus keyword + slug
    const keywords = [];
    if (meta.focusKeyword) {
      keywords.push(meta.focusKeyword);
    }
    // Add slug words as keywords
    const slugWords = slug.replace(/-/g, " ");
    if (!keywords.includes(slugWords)) keywords.push(slugWords);

    const article = {
      slug,
      title: post.post_title,
      description,
      date: post.post_date ? post.post_date.substring(0, 10) : "2025-01-18",
      author: "Par Precision",
      category,
      categoryLabel,
      keywords,
      readingTime: estimateReadingTime(cleanContent),
      coverImage: `https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=630&fit=crop`,
      coverImageAlt: post.post_title,
      content: cleanContent,
    };

    articlesToMigrate.push(article);
    console.log(
      `  MIGRATE: /${slug}/ — "${post.post_title}" [${category}] (${article.readingTime})`
    );
  }

  console.log(`\n=== ${articlesToMigrate.length} articles to migrate ===\n`);

  // Write migrated articles to a JSON file for review
  const outputPath = path.join(__dirname, "migrated-articles.json");
  fs.writeFileSync(outputPath, JSON.stringify(articlesToMigrate, null, 2));
  console.log(`Written to ${outputPath}`);

  // Also output a summary
  const summary = articlesToMigrate.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    readingTime: a.readingTime,
    hasDescription: !!a.description,
    contentLength: a.content.length,
  }));

  const summaryPath = path.join(__dirname, "migration-summary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`Summary written to ${summaryPath}`);
}

main();
