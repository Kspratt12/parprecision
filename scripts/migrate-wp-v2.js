/**
 * WordPress → Next.js Migration Script v2
 * Uses record-boundary parsing instead of CSV field parsing
 * to handle WordPress block content with embedded commas/quotes.
 */

const fs = require("fs");
const path = require("path");

// ── Record Extraction ────────────────────────────────────────────────────────

function extractRecords(csvContent) {
  // Each record starts with "ID","author","date" pattern at start of line
  const regex = /^"(\d+)","(\d+)","(\d{4}-\d{2}-\d{2}[^"]*)"(?=,)/gm;
  const starts = [];
  let match;
  while ((match = regex.exec(csvContent)) !== null) {
    starts.push({ index: match.index, id: match[1], author: match[2], date: match[3] });
  }

  const records = [];
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i].index;
    const end = i + 1 < starts.length ? starts[i + 1].index : csvContent.length;
    const text = csvContent.substring(start, end);
    records.push({ id: starts[i].id, date: starts[i].date, text });
  }
  return records;
}

function extractField(recordText, afterPattern, maxLen = 500) {
  const idx = recordText.indexOf(afterPattern);
  if (idx === -1) return null;
  // Look for the next quoted field value after the pattern
  const sub = recordText.substring(idx);
  const match = sub.match(/^[^"]*"([^"]*(?:""[^"]*)*)"/);
  if (match) return match[1].replace(/""/g, '"');
  return null;
}

// ── WordPress Block Markup Stripper ──────────────────────────────────────────

function stripWPBlocks(html) {
  if (!html) return "";
  let clean = html;

  // Remove all WordPress block comments
  clean = clean.replace(/<!--\s*\/?wp:[^>]*-->/g, "");

  // Remove all <style> tags
  clean = clean.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // Remove complex div/span wrappers from page builders
  clean = clean.replace(/<div[^>]*class="[^"]*(?:wp-block-|stk-|kt-|kb-|kadence-|alignfull|alignwide|inner-column)[^"]*"[^>]*>/gi, "");
  clean = clean.replace(/<span[^>]*class="[^"]*(?:stk-|wp-block-stackable)[^"]*"[^>]*>/gi, "");

  // Remove figure wrappers but keep img
  clean = clean.replace(/<figure[^>]*>/gi, "");
  clean = clean.replace(/<\/figure>/gi, "");

  // Remove data attributes
  clean = clean.replace(/\s*data-[a-z-]+="[^"]*"/gi, "");

  // Convert Stackable buttons to links
  clean = clean.replace(
    /<a[^>]*href="([^"]*)"[^>]*>[\s\S]*?<span[^>]*>([^<]*)<\/span>[\s\S]*?<\/a>/gi,
    (match, href, text) => {
      if (text.trim()) return `<p><a href="${href}"><strong>${text.trim()}</strong></a></p>`;
      return "";
    }
  );

  // Remove price blocks
  clean = clean.replace(/<div[^>]*class="[^"]*stk-block-price[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "");

  // Remove empty class/id attributes
  clean = clean.replace(/\s+class="[^"]*(?:stk-|kt-|kb-|kadence-|wp-block-)[^"]*"/gi, "");
  clean = clean.replace(/\s+class="wp-block-[^"]*"/gi, "");
  clean = clean.replace(/\s+class=""/gi, "");
  clean = clean.replace(/\s+id="[^"]*"/gi, "");

  // Clean remaining class attrs from standard elements
  clean = clean.replace(/(<(?:p|ul|ol|li|h[1-6]|blockquote|table|thead|tbody|tr|th|td))\s+class="[^"]*"/gi, "$1");

  // Remove empty divs/spans (multiple passes)
  for (let i = 0; i < 10; i++) {
    clean = clean.replace(/<div[^>]*>\s*<\/div>/gi, "");
    clean = clean.replace(/<span[^>]*>\s*<\/span>/gi, "");
  }

  // Balance div tags
  let openDivs = (clean.match(/<div[\s>]/gi) || []).length;
  let closeDivs = (clean.match(/<\/div>/gi) || []).length;
  while (closeDivs > openDivs) { clean = clean.replace(/<\/div>/, ""); closeDivs--; }
  while (openDivs > closeDivs) { clean = clean.replace(/<div[^>]*>/, ""); openDivs--; }

  // Balance span tags
  let openSpans = (clean.match(/<span[\s>]/gi) || []).length;
  let closeSpans = (clean.match(/<\/span>/gi) || []).length;
  while (closeSpans > openSpans) { clean = clean.replace(/<\/span>/, ""); closeSpans--; }
  while (openSpans > closeSpans) { clean = clean.replace(/<span[^>]*>/, ""); openSpans--; }

  // Fix empty alt text
  clean = clean.replace(/<img([^>]*)alt="""?\s*/gi, '<img$1alt="Golf equipment" ');

  // Remove empty paragraphs and list items
  clean = clean.replace(/<p>\s*<\/p>/gi, "");
  clean = clean.replace(/<li>\s*<\/li>/gi, "");

  // Clean excessive whitespace
  clean = clean.replace(/\n{4,}/g, "\n\n");
  clean = clean.split("\n").map(l => l.trimEnd()).join("\n").trim();

  return clean;
}

// ── Category Detection ───────────────────────────────────────────────────────

function detectCategory(slug, title) {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();

  if (s.includes("-vs-") || t.includes(" vs ")) return { category: "comparisons", categoryLabel: "Comparison" };

  const reviewProducts = [
    "bushnell-launch-pro", "bushnell-lpi", "foresight-falcon", "foresight-sports-gchawk",
    "foresight-sports-gc3", "foresight-sports-gc3s", "foresight-sports-gcquad", "foresight-sports-quadmax",
    "trugolf-apogee", "protee-vx", "uneekor-eye-mini", "uneekor-eye-mini-lite",
    "uneekor-eye-xo2", "uneekor-qed", "hd-golf-simulator", "garmin-approach-r50",
    "skytrak-plus", "full-swing-kit", "trackman-io",
  ];

  if (s.includes("-review") || t.includes("review") || reviewProducts.some(p => s.startsWith(p) || s === p)) {
    return { category: "launch-monitors", categoryLabel: "Launch Monitor Review" };
  }

  if (s.includes("swing") || s.includes("drill")) return { category: "golf-tips", categoryLabel: "Golf Tips" };

  if (s.includes("how-to") || s.includes("setup") || s.includes("cost") || s.includes("dimension") ||
      s.includes("turf") || s.includes("how-much") || s.includes("how-profitable") || s.includes("why-are") ||
      s.includes("is-it-worth") || s.includes("do-golf-sim") || s.includes("what-is-the") ||
      t.includes("guide") || t.includes("cost") || t.includes("dimensions") || t.includes("how to") ||
      s.includes("basement") || s.includes("mancave") || s.includes("small-room") ||
      s.includes("profitable") || s.includes("expensive") || s.includes("accurate") ||
      s.includes("software")) {
    return { category: "guides", categoryLabel: "Guide" };
  }

  if (s.includes("best") && (s.includes("launch-monitor") || s.includes("portable") || s.includes("overhead"))) {
    return { category: "launch-monitors", categoryLabel: "Launch Monitors" };
  }
  if (s.includes("best") && (s.includes("simulator") || s.includes("golf-sim"))) {
    return { category: "simulators", categoryLabel: "Golf Simulators" };
  }

  if (s.includes("launch-monitor") || s.includes("what-launch")) {
    return { category: "launch-monitors", categoryLabel: "Launch Monitors" };
  }
  if (s.includes("simulator")) {
    return { category: "simulators", categoryLabel: "Golf Simulators" };
  }

  return { category: "guides", categoryLabel: "Guide" };
}

function estimateReadingTime(html) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const words = text.split(" ").filter(w => w.length > 0).length;
  return `${Math.max(3, Math.ceil(words / 200))} min read`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log("=== WordPress → Next.js Migration v2 ===\n");

  const csvContent = fs.readFileSync("C:/Users/kelvink/Desktop/wp_posts.csv", "utf8");
  const metaContent = fs.readFileSync("C:/Users/kelvink/Desktop/wp_postmeta.csv", "utf8");

  // Build SEO meta lookup
  const metaMap = {};
  const metaLines = metaContent.split("\n");
  for (const line of metaLines) {
    const m = line.match(/^"(\d+)","(\d+)","(_yoast_wpseo_(?:title|metadesc|focuskw))","(.*)"\s*$/);
    if (m) {
      const pid = m[2];
      if (!metaMap[pid]) metaMap[pid] = {};
      if (m[3] === "_yoast_wpseo_metadesc") metaMap[pid].seoDescription = m[4];
      if (m[3] === "_yoast_wpseo_focuskw") metaMap[pid].focusKeyword = m[4];
      if (m[3] === "_yoast_wpseo_title") metaMap[pid].seoTitle = m[4];
    }
  }
  console.log(`SEO meta entries: ${Object.keys(metaMap).length}`);

  // Extract all records
  const records = extractRecords(csvContent);
  console.log(`Total records: ${records.length}`);

  // Known slugs from Google Search Console
  const targetSlugs = [
    "best-overhead-launch-monitors", "trackman-io-vs-trackman-4", "what-launch-monitor-does-bryson-dechambeau-use",
    "best-retractable-golf-simulators", "best-golf-simulators-for-small-spaces", "foresight-sports-gc3s-vs-gc3",
    "trugolf-apogee", "trackman-io-home-vs-complete", "foresight-falcon", "foresight-sports-gchawk",
    "best-golf-simulators-for-business", "golf-swing-drills", "trackman-io-review", "protee-vx",
    "protee-vx-review", "garmin-r50-vs-gc3", "golf-simulator-turf", "golf-simulator-room-dimensions",
    "uneekor-eye-mini-lite", "best-golf-simulators", "uneekor-eye-xo2", "how-profitable-are-golf-simulators",
    "best-golf-simulators-for-garage-use", "hd-golf-simulator-ultimate-entertainment-package-review",
    "best-golf-launch-monitors-under-1000", "uneekor-qed", "foresight-falcon-review",
    "best-golf-simulators-for-the-money", "uneekor-eye-mini", "foresight-sports-gc3s", "garmin-approach-r50",
    "foresight-sports-gcquad", "best-golf-simulator-software", "basement-golf-simulator",
    "best-golf-simulators-for-home", "how-much-space-is-needed-for-a-golf-simulator", "foresight-sports-gc3",
    "what-is-the-best-golf-simulator", "best-swingbay-golf-simulators", "trugolf-apogee-review",
    "golf-swing-drill-for-beginners", "full-swing-kit-review", "bushnell-lpi", "foresight-sports-quadmax",
    "bushnell-launch-pro", "best-golf-simulators-for-left-and-right-handed-use", "skytrak-vs-skytrak-plus-differences",
    "launch-monitor-vs-golf-simulator", "foresight-quadmax-review", "golf-simulator-cost-2026",
    "hd-golf-simulator", "skytrak-plus", "bushnell-launch-pro-vs-skytrak-plus", "best-golf-launch-monitors",
    "why-are-golf-simulators-so-expensive", "what-is-the-most-accurate-launch-monitor",
    "what-launch-monitor-do-pros-use", "how-accurate-is-the-skytrak-plus", "best-golf-simulators-under-10000",
    "best-portable-golf-launch-monitors", "what-launch-monitor-does-tiger-woods-use",
    "skytrak-plus-for-beginners", "is-it-worth-buying-a-golf-launch-monitor", "launch-monitor-pros-use",
    "best-overhead-launch-monitors-review", "how-much-does-a-golf-launch-monitor-cost-find-out-here",
    "how-to-build-a-golf-simulator-2", "do-golf-simulators-improve-your-game", "golf-simulator-setup",
    "how-to-build-a-golf-simulator-mancave", "how-to-set-up-a-golf-simulator-in-a-small-room",
    // Additional ones from the first CSV parse
    "best-golf-simulators-for-home", "what-launch-monitor-does-bryson-dechambeau-use"
  ];

  // Slugs already handled by current Next.js site
  const existingSlugs = new Set([
    "best-golf-simulators", "best-golf-simulators-small-spaces", "best-budget-golf-simulators",
    "best-launch-monitors", "best-overhead-launch-monitors", "best-portable-launch-monitors",
    "skytrak-plus", "garmin-approach-r10", "bushnell-launch-pro", "flightscope-mevo-plus",
    "garmin-r10-vs-skytrak-plus", "how-to-fix-a-slice", "how-to-increase-clubhead-speed",
    "golf-simulator-cost", "golf-simulator-room-dimensions", "how-to-build-golf-simulator",
  ]);

  // Find records for each target slug
  const articlesToMigrate = [];
  const slugsProcessed = new Set();

  for (const slug of targetSlugs) {
    if (existingSlugs.has(slug) || slugsProcessed.has(slug)) continue;
    slugsProcessed.add(slug);

    const searchStr = '"' + slug + '"';
    let foundRecord = null;

    for (const rec of records) {
      if (rec.text.includes(searchStr)) {
        foundRecord = rec;
        break;
      }
    }

    if (!foundRecord) {
      console.log(`  NOT FOUND: /${slug}/`);
      continue;
    }

    // Extract title from the record
    // Title is field 5 (post_title). Look for pattern after post_content which ends, then post_title
    // Actually, let's extract title by finding it near the beginning after the date fields
    const text = foundRecord.text;

    // The record format: "ID","author","date","date_gmt","content","title","excerpt","status",...
    // Content can be massive. Let's find the title by looking for the slug's context.
    // Title appears AFTER content field. Let's look for "publish" or "draft" and work backwards.

    // Alternative: find title from the record.
    // The title is between post_content and post_excerpt.
    // post_content ends, then comes post_title as the next quoted field.
    // This is hard to parse due to content...

    // Use a simpler heuristic: search for the slug near the end of the record
    // Format: ...,"title","excerpt","publish",...,"slug",...
    // The slug appears as field 11 (post_name). Working backwards from slug:
    // "password","slug","to_ping","pinged","modified","modified_gmt","filtered","parent","guid","order","type"

    // Let's find the slug position and work backwards to find the title
    const slugIdx = text.indexOf(searchStr);

    // Look for "publish" in the record
    const publishIdx = text.indexOf('"publish"');

    // The title is a few fields before "publish".
    // Fields: content, title, excerpt, status(publish), comment_status, ping_status, password, slug
    // So title is before excerpt which is before publish.

    // Let's try: get the meta for this record ID for the title
    const meta = metaMap[foundRecord.id] || {};

    // Also try to extract title from the text - look for known patterns
    // The post_title is between the end of post_content and "publish"
    // Let's find the section before "publish" and look for the last substantial quoted string

    let title = "";
    if (publishIdx > 0) {
      // Get 2000 chars before publish - title should be in there
      const beforePublish = text.substring(Math.max(0, publishIdx - 2000), publishIdx);
      // Title is a quoted field. Look for the last 2 quoted fields before publish
      // Pattern: ,"title","excerpt","publish"
      // excerpt might be empty: ,"title",,"publish"
      const titleMatch = beforePublish.match(/"([^"]{10,}[^"]*)"(?:,"[^"]*"|,)?\s*$/);
      if (titleMatch) {
        title = titleMatch[1].replace(/""/g, '"');
      }
    }

    // Fallback: check if Yoast has a title
    if (!title && meta.seoTitle) {
      title = meta.seoTitle.replace(/%%sep%%/g, '|').replace(/%%sitename%%/g, 'Par Precision').trim();
    }

    // Fallback: use slug as title
    if (!title) {
      title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }

    // Extract post_content
    // Content starts after the 4th field (date_gmt) and before the title
    // Find the content: after "date_gmt"," we have the content field
    const dateGmtMatch = text.match(/^"[^"]*","[^"]*","[^"]*","([^"]*)","/);
    let contentStart = -1;
    if (dateGmtMatch) {
      contentStart = dateGmtMatch.index + dateGmtMatch[0].length - 1;
    }

    let rawContent = "";
    if (contentStart > 0 && publishIdx > contentStart) {
      // Content is between contentStart and a few fields before publishIdx
      // The content field is quoted. Extract from contentStart.
      const afterDates = text.substring(contentStart);
      // Content is the first quoted field
      let inQ = false;
      let content = "";
      let started = false;
      let fieldEnd = -1;

      for (let i = 0; i < afterDates.length && i < afterDates.length; i++) {
        const ch = afterDates[i];
        if (ch === '"') {
          if (!started) { started = true; continue; }
          if (afterDates[i+1] === '"') { content += '"'; i++; continue; }
          fieldEnd = i;
          break;
        }
        if (started) content += ch;
      }

      rawContent = content;
    }

    // If content extraction failed, grab everything between the date and "publish"
    if (!rawContent || rawContent.length < 100) {
      const startIdx = text.indexOf('",') + 2;
      rawContent = text.substring(startIdx, publishIdx > 0 ? publishIdx : text.length);
    }

    const cleanContent = stripWPBlocks(rawContent);
    const { category, categoryLabel } = detectCategory(slug, title);

    let description = meta.seoDescription || "";
    if (!description) {
      const firstP = cleanContent.match(/<p>([\s\S]*?)<\/p>/);
      if (firstP) description = firstP[1].replace(/<[^>]+>/g, "").substring(0, 160).trim();
    }

    const keywords = [];
    if (meta.focusKeyword) keywords.push(meta.focusKeyword);
    keywords.push(slug.replace(/-/g, " "));

    // Pick a relevant cover image based on category
    const coverImages = {
      "simulators": "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=630&fit=crop",
      "launch-monitors": "https://images.unsplash.com/photo-1621005570352-6418df03796b?w=1200&h=630&fit=crop",
      "comparisons": "https://images.unsplash.com/photo-1550707227-6140ec0a5044?w=1200&h=630&fit=crop",
      "golf-tips": "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&h=630&fit=crop",
      "guides": "https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&h=630&fit=crop",
    };

    articlesToMigrate.push({
      slug,
      title,
      description,
      date: foundRecord.date.substring(0, 10),
      author: "Par Precision",
      category,
      categoryLabel,
      keywords,
      readingTime: estimateReadingTime(cleanContent),
      coverImage: coverImages[category] || coverImages.guides,
      coverImageAlt: title,
      content: cleanContent,
      wpRecordId: foundRecord.id,
    });

    console.log(`  OK: /${slug}/ — "${title.substring(0, 60)}" [${category}] (${estimateReadingTime(cleanContent)})`);
  }

  console.log(`\n=== ${articlesToMigrate.length} articles extracted ===\n`);

  // Save results
  const outputPath = path.join(__dirname, "migrated-articles.json");
  fs.writeFileSync(outputPath, JSON.stringify(articlesToMigrate, null, 2));
  console.log(`Full data: ${outputPath}`);

  // Summary
  const summary = articlesToMigrate.map(a => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    readingTime: a.readingTime,
    contentLength: a.content.length,
    hasDescription: !!a.description,
    hasFocusKeyword: a.keywords.length > 1,
  }));
  fs.writeFileSync(path.join(__dirname, "migration-summary.json"), JSON.stringify(summary, null, 2));

  // Category breakdown
  const cats = {};
  for (const a of articlesToMigrate) {
    cats[a.category] = (cats[a.category] || 0) + 1;
  }
  console.log("\nBy category:");
  for (const [cat, count] of Object.entries(cats)) {
    console.log(`  ${cat}: ${count}`);
  }
}

main();
