/**
 * Comprehensive SEO fix script for all 62 articles
 * Fixes: alt text, internal links, keywords
 */
const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "..", "src", "content");
const FILES = ["wp-reviews.ts", "wp-comparisons.ts", "wp-simulators.ts", "wp-golf-tips.ts", "wp-guides.ts"];

// ── Article metadata for internal linking ──
const articleMap = {
  // Reviews
  "foresight-sports-gchawk": { title: "GCHawk Review", category: "launch-monitors", related: ["foresight-falcon-review", "foresight-sports-gcquad", "best-overhead-launch-monitors-review", "foresight-sports-gc3", "best-golf-simulators-for-home"] },
  "trackman-io-review": { title: "TrackMan iO Review", category: "launch-monitors", related: ["trackman-io-vs-trackman-4", "best-overhead-launch-monitors-review", "best-golf-simulators-for-home", "golf-simulator-cost-2026", "how-much-space-is-needed-for-a-golf-simulator"] },
  "protee-vx-review": { title: "ProTee VX Review", category: "launch-monitors", related: ["best-overhead-launch-monitors-review", "foresight-falcon-review", "trugolf-apogee-review", "best-golf-simulators-for-home", "golf-simulator-cost-2026"] },
  "foresight-falcon-review": { title: "Foresight Falcon Review", category: "launch-monitors", related: ["foresight-sports-gchawk", "foresight-sports-gcquad", "best-overhead-launch-monitors-review", "trugolf-apogee-review", "best-golf-simulators-for-home"] },
  "trugolf-apogee-review": { title: "TruGolf Apogee Review", category: "launch-monitors", related: ["foresight-falcon-review", "best-overhead-launch-monitors-review", "protee-vx-review", "best-golf-simulators-for-home", "golf-simulator-cost-2026"] },
  "uneekor-eye-mini-lite": { title: "Uneekor EYE MINI Lite Review", category: "launch-monitors", related: ["uneekor-eye-mini", "uneekor-eye-xo2", "uneekor-qed", "best-golf-launch-monitors", "best-overhead-launch-monitors-review"] },
  "uneekor-eye-xo2": { title: "Uneekor EYE XO2 Review", category: "launch-monitors", related: ["uneekor-eye-mini", "uneekor-eye-mini-lite", "uneekor-qed", "best-overhead-launch-monitors-review", "best-golf-simulators-for-home"] },
  "uneekor-eye-mini": { title: "Uneekor EYE MINI Review", category: "launch-monitors", related: ["uneekor-eye-mini-lite", "uneekor-eye-xo2", "uneekor-qed", "best-overhead-launch-monitors-review", "best-golf-launch-monitors"] },
  "uneekor-qed": { title: "Uneekor QED Review", category: "launch-monitors", related: ["uneekor-eye-mini", "uneekor-eye-xo2", "best-overhead-launch-monitors-review", "best-golf-launch-monitors", "what-is-the-most-accurate-launch-monitor"] },
  "foresight-sports-gcquad": { title: "GCQuad Review", category: "launch-monitors", related: ["foresight-sports-gchawk", "foresight-quadmax-review", "foresight-sports-gc3", "what-is-the-most-accurate-launch-monitor", "best-golf-launch-monitors"] },
  "foresight-sports-gc3": { title: "Foresight GC3 Review", category: "launch-monitors", related: ["foresight-sports-gc3s", "foresight-sports-gc3s-vs-gc3", "foresight-sports-gcquad", "best-golf-launch-monitors", "bushnell-lpi"] },
  "foresight-sports-gc3s": { title: "Foresight GC3S Review", category: "launch-monitors", related: ["foresight-sports-gc3", "foresight-sports-gc3s-vs-gc3", "foresight-sports-gcquad", "best-golf-launch-monitors", "best-portable-golf-launch-monitors"] },
  "foresight-quadmax-review": { title: "Foresight QuadMAX Review", category: "launch-monitors", related: ["foresight-sports-gcquad", "foresight-sports-gc3", "what-is-the-most-accurate-launch-monitor", "best-golf-launch-monitors", "best-portable-golf-launch-monitors"] },
  "garmin-approach-r50": { title: "Garmin Approach R50 Review", category: "launch-monitors", related: ["garmin-r50-vs-gc3", "best-golf-launch-monitors", "best-portable-golf-launch-monitors", "best-golf-simulators-for-home", "golf-simulator-cost-2026"] },
  "bushnell-lpi": { title: "Bushnell LPi Review", category: "launch-monitors", related: ["bushnell-launch-pro-vs-skytrak-plus", "foresight-sports-gc3", "best-golf-launch-monitors", "best-overhead-launch-monitors-review", "golf-simulator-cost-2026"] },
  "full-swing-kit-review": { title: "Full Swing KIT Review", category: "launch-monitors", related: ["what-launch-monitor-does-tiger-woods-use", "best-golf-launch-monitors", "best-portable-golf-launch-monitors", "trackman-io-review", "golf-simulator-cost-2026"] },
  "hd-golf-simulator": { title: "HD Golf Simulator Review", category: "launch-monitors", related: ["hd-golf-simulator-ultimate-entertainment-package-review", "best-golf-simulators-for-business", "golf-simulator-cost-2026", "best-golf-simulators-for-home", "how-profitable-are-golf-simulators"] },
  "hd-golf-simulator-ultimate-entertainment-package-review": { title: "HD Golf Ultimate Package Review", category: "launch-monitors", related: ["hd-golf-simulator", "best-golf-simulators-for-business", "golf-simulator-cost-2026", "best-golf-simulators-for-home", "how-profitable-are-golf-simulators"] },
  "what-launch-monitor-does-bryson-dechambeau-use": { title: "Bryson's Launch Monitor", category: "launch-monitors", related: ["foresight-sports-gcquad", "what-launch-monitor-do-pros-use", "what-launch-monitor-does-tiger-woods-use", "best-golf-launch-monitors", "what-is-the-most-accurate-launch-monitor"] },
  "what-launch-monitor-do-pros-use": { title: "Pro Launch Monitors", category: "launch-monitors", related: ["what-launch-monitor-does-tiger-woods-use", "what-launch-monitor-does-bryson-dechambeau-use", "trackman-io-review", "foresight-sports-gcquad", "best-golf-launch-monitors"] },
  "what-launch-monitor-does-tiger-woods-use": { title: "Tiger's Launch Monitor", category: "launch-monitors", related: ["full-swing-kit-review", "what-launch-monitor-do-pros-use", "what-launch-monitor-does-bryson-dechambeau-use", "best-golf-launch-monitors", "trackman-io-review"] },
  "launch-monitor-pros-use": { title: "Launch Monitors Pros Use", category: "launch-monitors", related: ["what-launch-monitor-do-pros-use", "what-launch-monitor-does-tiger-woods-use", "trackman-io-review", "foresight-sports-gcquad", "best-golf-launch-monitors"] },
  "skytrak-plus-for-beginners": { title: "SkyTrak+ for Beginners", category: "launch-monitors", related: ["skytrak-vs-skytrak-plus-differences", "how-accurate-is-the-skytrak-plus", "best-golf-launch-monitors", "best-golf-simulators-for-home", "golf-simulator-cost-2026"] },
  "best-golf-launch-monitors-under-1000": { title: "Best Launch Monitors Under $1000", category: "launch-monitors", related: ["best-golf-launch-monitors", "best-portable-golf-launch-monitors", "garmin-approach-r50", "is-it-worth-buying-a-golf-launch-monitor", "golf-simulator-cost-2026"] },
  "best-golf-launch-monitors": { title: "Best Golf Launch Monitors", category: "launch-monitors", related: ["best-portable-golf-launch-monitors", "best-overhead-launch-monitors-review", "best-golf-launch-monitors-under-1000", "what-is-the-most-accurate-launch-monitor", "launch-monitor-vs-golf-simulator"] },
  "best-portable-golf-launch-monitors": { title: "Best Portable Launch Monitors", category: "launch-monitors", related: ["best-golf-launch-monitors", "best-golf-launch-monitors-under-1000", "garmin-approach-r50", "foresight-sports-gc3s", "full-swing-kit-review"] },
  "best-overhead-launch-monitors-review": { title: "Best Overhead Launch Monitors", category: "launch-monitors", related: ["foresight-sports-gchawk", "foresight-falcon-review", "trugolf-apogee-review", "uneekor-eye-xo2", "trackman-io-review"] },
  // Comparisons
  "trackman-io-vs-trackman-4": { title: "TrackMan iO vs TrackMan 4", category: "comparisons", related: ["trackman-io-review", "best-golf-launch-monitors", "best-overhead-launch-monitors-review", "golf-simulator-cost-2026", "what-launch-monitor-do-pros-use"] },
  "foresight-sports-gc3s-vs-gc3": { title: "GC3S vs GC3", category: "comparisons", related: ["foresight-sports-gc3", "foresight-sports-gc3s", "foresight-sports-gcquad", "best-golf-launch-monitors", "best-portable-golf-launch-monitors"] },
  "bushnell-launch-pro-vs-skytrak-plus": { title: "Bushnell vs SkyTrak+", category: "comparisons", related: ["bushnell-lpi", "skytrak-plus-for-beginners", "best-golf-launch-monitors", "golf-simulator-cost-2026", "how-accurate-is-the-skytrak-plus"] },
  "trackman-io-home-vs-complete": { title: "TrackMan Home vs Complete", category: "comparisons", related: ["trackman-io-review", "trackman-io-vs-trackman-4", "golf-simulator-cost-2026", "best-golf-simulators-for-home", "best-overhead-launch-monitors-review"] },
  "garmin-r50-vs-gc3": { title: "Garmin R50 vs GC3", category: "comparisons", related: ["garmin-approach-r50", "foresight-sports-gc3", "best-golf-launch-monitors", "best-portable-golf-launch-monitors", "golf-simulator-cost-2026"] },
  "skytrak-vs-skytrak-plus-differences": { title: "SkyTrak vs SkyTrak Plus", category: "comparisons", related: ["skytrak-plus-for-beginners", "how-accurate-is-the-skytrak-plus", "best-golf-launch-monitors", "best-golf-simulators-for-home", "bushnell-launch-pro-vs-skytrak-plus"] },
  "launch-monitor-vs-golf-simulator": { title: "Launch Monitor vs Simulator", category: "comparisons", related: ["best-golf-launch-monitors", "best-golf-simulators-for-home", "golf-simulator-cost-2026", "is-it-worth-buying-a-golf-launch-monitor", "how-much-space-is-needed-for-a-golf-simulator"] },
  // Simulators
  "best-golf-simulators-for-home": { title: "Best Golf Simulators for Home", category: "simulators", related: ["golf-simulator-cost-2026", "how-much-space-is-needed-for-a-golf-simulator", "best-golf-simulators-for-small-spaces", "best-golf-simulators-for-the-money", "how-to-build-a-golf-simulator-2"] },
  "best-golf-simulators-for-small-spaces": { title: "Best Simulators for Small Spaces", category: "simulators", related: ["how-much-space-is-needed-for-a-golf-simulator", "best-golf-simulators-for-home", "basement-golf-simulator", "best-golf-simulators-for-the-money", "golf-simulator-cost-2026"] },
  "best-golf-simulators-for-business": { title: "Best Simulators for Business", category: "simulators", related: ["how-profitable-are-golf-simulators", "best-golf-simulators-for-home", "golf-simulator-cost-2026", "hd-golf-simulator", "trackman-io-review"] },
  "best-golf-simulators-for-garage-use": { title: "Best Simulators for Garage", category: "simulators", related: ["how-much-space-is-needed-for-a-golf-simulator", "best-golf-simulators-for-home", "best-golf-simulators-for-small-spaces", "how-to-build-a-golf-simulator-2", "golf-simulator-cost-2026"] },
  "best-golf-simulators-for-the-money": { title: "Best Simulators for the Money", category: "simulators", related: ["best-golf-simulators-for-home", "golf-simulator-cost-2026", "best-golf-simulators-under-10000", "best-golf-launch-monitors-under-1000", "best-golf-simulators-for-small-spaces"] },
  "best-golf-simulators-for-left-and-right-handed-use": { title: "Best for Left & Right Handed", category: "simulators", related: ["best-golf-simulators-for-home", "best-overhead-launch-monitors-review", "foresight-sports-gchawk", "uneekor-eye-xo2", "golf-simulator-cost-2026"] },
  "best-golf-simulators-under-10000": { title: "Best Simulators Under $10K", category: "simulators", related: ["best-golf-simulators-for-the-money", "best-golf-simulators-for-home", "golf-simulator-cost-2026", "best-golf-launch-monitors-under-1000", "how-to-build-a-golf-simulator-2"] },
  "best-retractable-golf-simulators": { title: "Best Retractable Simulators", category: "simulators", related: ["best-golf-simulators-for-small-spaces", "best-golf-simulators-for-garage-use", "best-golf-simulators-for-home", "how-much-space-is-needed-for-a-golf-simulator", "golf-simulator-cost-2026"] },
  "best-swingbay-golf-simulators": { title: "Best SwingBay Simulators", category: "simulators", related: ["best-golf-simulators-for-home", "best-golf-simulators-for-the-money", "golf-simulator-cost-2026", "how-to-build-a-golf-simulator-2", "how-much-space-is-needed-for-a-golf-simulator"] },
  // Golf tips
  "golf-swing-drills": { title: "Golf Swing Drills", category: "golf-tips", related: ["golf-swing-drill-for-beginners", "do-golf-simulators-improve-your-game", "best-golf-simulators-for-home", "best-golf-launch-monitors", "is-it-worth-buying-a-golf-launch-monitor"] },
  "golf-swing-drill-for-beginners": { title: "Golf Drills for Beginners", category: "golf-tips", related: ["golf-swing-drills", "do-golf-simulators-improve-your-game", "skytrak-plus-for-beginners", "best-golf-launch-monitors-under-1000", "is-it-worth-buying-a-golf-launch-monitor"] },
  // Guides
  "golf-simulator-cost-2026": { title: "Golf Simulator Cost Guide", category: "guides", related: ["best-golf-simulators-for-home", "best-golf-simulators-for-the-money", "how-to-build-a-golf-simulator-2", "best-golf-simulators-under-10000", "how-much-space-is-needed-for-a-golf-simulator"] },
  "how-much-space-is-needed-for-a-golf-simulator": { title: "Room Dimensions Guide", category: "guides", related: ["best-golf-simulators-for-small-spaces", "basement-golf-simulator", "best-golf-simulators-for-garage-use", "how-to-build-a-golf-simulator-2", "golf-simulator-cost-2026"] },
  "golf-simulator-room-dimensions": { title: "Room Dimensions", category: "guides", related: ["how-much-space-is-needed-for-a-golf-simulator", "best-golf-simulators-for-small-spaces", "basement-golf-simulator", "how-to-build-a-golf-simulator-2", "golf-simulator-cost-2026"] },
  "how-to-build-a-golf-simulator-2": { title: "How to Build a Simulator", category: "guides", related: ["golf-simulator-cost-2026", "how-much-space-is-needed-for-a-golf-simulator", "best-golf-simulators-for-home", "best-golf-simulator-software", "golf-simulator-turf"] },
  "how-to-build-a-golf-simulator-mancave": { title: "Mancave Simulator Guide", category: "guides", related: ["how-to-build-a-golf-simulator-2", "basement-golf-simulator", "how-much-space-is-needed-for-a-golf-simulator", "golf-simulator-cost-2026", "best-golf-simulators-for-home"] },
  "how-to-set-up-a-golf-simulator-in-a-small-room": { title: "Small Room Setup Guide", category: "guides", related: ["best-golf-simulators-for-small-spaces", "how-much-space-is-needed-for-a-golf-simulator", "how-to-build-a-golf-simulator-2", "golf-simulator-cost-2026", "best-golf-simulators-for-home"] },
  "basement-golf-simulator": { title: "Basement Simulator Guide", category: "guides", related: ["how-much-space-is-needed-for-a-golf-simulator", "how-to-build-a-golf-simulator-2", "best-golf-simulators-for-garage-use", "golf-simulator-cost-2026", "best-golf-simulators-for-home"] },
  "golf-simulator-turf": { title: "Golf Simulator Turf Guide", category: "guides", related: ["how-to-build-a-golf-simulator-2", "golf-simulator-cost-2026", "best-golf-simulators-for-home", "best-golf-simulator-software", "how-much-space-is-needed-for-a-golf-simulator"] },
  "golf-simulator-setup": { title: "Simulator Setup Guide", category: "guides", related: ["how-to-build-a-golf-simulator-2", "how-much-space-is-needed-for-a-golf-simulator", "golf-simulator-cost-2026", "best-golf-simulators-for-home", "golf-simulator-turf"] },
  "best-golf-simulator-software": { title: "Best Simulator Software", category: "guides", related: ["best-golf-simulators-for-home", "how-to-build-a-golf-simulator-2", "golf-simulator-cost-2026", "trackman-io-review", "foresight-sports-gchawk"] },
  "how-profitable-are-golf-simulators": { title: "Golf Simulator Profitability", category: "guides", related: ["best-golf-simulators-for-business", "golf-simulator-cost-2026", "hd-golf-simulator", "best-golf-simulators-for-home", "how-to-build-a-golf-simulator-2"] },
  "why-are-golf-simulators-so-expensive": { title: "Why Simulators Are Expensive", category: "guides", related: ["golf-simulator-cost-2026", "best-golf-simulators-for-the-money", "best-golf-simulators-under-10000", "best-golf-launch-monitors-under-1000", "best-golf-simulators-for-home"] },
  "what-is-the-best-golf-simulator": { title: "Best Golf Simulator Guide", category: "guides", related: ["best-golf-simulators-for-home", "best-golf-simulators-for-the-money", "golf-simulator-cost-2026", "best-golf-launch-monitors", "how-to-build-a-golf-simulator-2"] },
  "what-is-the-most-accurate-launch-monitor": { title: "Most Accurate Launch Monitors", category: "guides", related: ["foresight-sports-gcquad", "trackman-io-review", "how-accurate-is-the-skytrak-plus", "best-golf-launch-monitors", "what-launch-monitor-do-pros-use"] },
  "how-accurate-is-the-skytrak-plus": { title: "SkyTrak+ Accuracy", category: "guides", related: ["skytrak-plus-for-beginners", "skytrak-vs-skytrak-plus-differences", "bushnell-launch-pro-vs-skytrak-plus", "what-is-the-most-accurate-launch-monitor", "best-golf-launch-monitors"] },
  "is-it-worth-buying-a-golf-launch-monitor": { title: "Worth Buying a Launch Monitor?", category: "guides", related: ["best-golf-launch-monitors", "best-golf-launch-monitors-under-1000", "launch-monitor-vs-golf-simulator", "do-golf-simulators-improve-your-game", "golf-simulator-cost-2026"] },
  "how-much-does-a-golf-launch-monitor-cost-find-out-here": { title: "Launch Monitor Cost Guide", category: "guides", related: ["golf-simulator-cost-2026", "best-golf-launch-monitors-under-1000", "best-golf-launch-monitors", "is-it-worth-buying-a-golf-launch-monitor", "best-portable-golf-launch-monitors"] },
  "do-golf-simulators-improve-your-game": { title: "Do Simulators Improve Your Game?", category: "guides", related: ["golf-swing-drills", "golf-swing-drill-for-beginners", "is-it-worth-buying-a-golf-launch-monitor", "best-golf-simulators-for-home", "best-golf-launch-monitors"] },
};

// ── Generate descriptive alt text based on article context ──
function generateAltText(slug, nearbyText) {
  const article = articleMap[slug];
  if (!article) return "Golf simulator equipment";

  // Try to extract product name from nearby H2/H3
  const h2Match = nearbyText.match(/<h[23][^>]*>([^<]*)<\/h[23]>/);
  const productName = h2Match ? h2Match[1].replace(/<[^>]*>/g, "").trim() : "";

  if (productName && productName.length > 5 && productName.length < 80) {
    return productName + " golf simulator setup";
  }

  // Fallback based on article title
  return article.title + " product photo";
}

// ── Fix alt text ──
function fixAltText(content, slug) {
  let fixed = 0;
  // Split content into chunks around images
  content = content.replace(/alt="Golf equipment"/g, () => {
    fixed++;
    const article = articleMap[slug];
    const title = article ? article.title : slug.replace(/-/g, " ");
    // Vary alt text so they're not all identical
    const variations = [
      `${title} product photo`,
      `${title} launch monitor setup`,
      `${title} golf simulator`,
      `${title} accuracy data comparison`,
      `${title} indoor golf setup`,
    ];
    return `alt="${variations[fixed % variations.length]}"`;
  });
  return { content, fixed };
}

// ── Add internal links ──
function addInternalLinks(content, slug) {
  const article = articleMap[slug];
  if (!article || !article.related) return { content, added: 0 };

  // Check which related articles are NOT already linked
  const existingLinks = content.match(/href="\/[^"]+"/g) || [];
  const existingSlugs = new Set(existingLinks.map(l => l.replace('href="/', '').replace('"', '')));

  const linksToAdd = article.related.filter(r => !existingSlugs.has(r));
  if (linksToAdd.length === 0) return { content, added: 0 };

  // Build a "Related Articles" section to append before the last </p> or end
  const relatedLinks = linksToAdd.slice(0, 5).map(slug => {
    const related = articleMap[slug];
    if (!related) return null;
    return `<li><a href="/${slug}">${related.title}</a></li>`;
  }).filter(Boolean);

  if (relatedLinks.length === 0) return { content, added: 0 };

  const relatedSection = `
<h2>Related Articles</h2>
<p>Check out these related guides and reviews from Par Precision:</p>
<ul>
${relatedLinks.join("\n")}
</ul>`;

  // Also add 2-3 contextual links within existing content
  let contextualAdded = 0;
  for (const relSlug of linksToAdd.slice(0, 3)) {
    const rel = articleMap[relSlug];
    if (!rel) continue;
    // Find a mention of a keyword that could link to this article
    const keywords = relSlug.split("-").filter(w => w.length > 3);
    for (const kw of keywords) {
      // Find first mention of keyword in a <p> tag that isn't already linked
      const pattern = new RegExp(`(<p>[^<]*)(\\b${kw}\\b)([^<]*<\\/p>)`, "i");
      if (content.match(pattern) && !content.match(new RegExp(`href="/${relSlug}"`))) {
        content = content.replace(pattern, (_, before, word, after) => {
          contextualAdded++;
          return `${before}<a href="/${relSlug}">${word}</a>${after}`;
        });
        break;
      }
    }
  }

  return { content: content + relatedSection, added: relatedLinks.length + contextualAdded };
}

// ── Expand keywords ──
function expandKeywords(slug, existingKeywords) {
  const words = slug.replace(/-/g, " ");
  const article = articleMap[slug];
  const title = article ? article.title : words;

  // Generate 4-5 unique keywords
  const keywords = new Set();
  // Original keyword
  if (existingKeywords[0]) keywords.add(existingKeywords[0]);
  // Title as keyword
  keywords.add(title.toLowerCase());
  // Slug as keyword
  keywords.add(words);
  // Variations
  if (words.includes("review")) keywords.add(words.replace("review", "").trim() + " review 2026");
  if (words.includes("best")) keywords.add(words + " 2026");
  if (words.includes("vs")) {
    const parts = words.split(" vs ");
    if (parts.length === 2) {
      keywords.add(parts[0].trim() + " vs " + parts[1].trim());
      keywords.add(parts[1].trim() + " vs " + parts[0].trim());
    }
  }
  // Add "golf simulator" or "launch monitor" if not present
  if (!words.includes("simulator") && !words.includes("monitor") && !words.includes("drill")) {
    keywords.add(words + " golf simulator");
  }
  // Question format
  if (words.startsWith("how") || words.startsWith("what") || words.startsWith("is") || words.startsWith("do")) {
    keywords.add(words + "?");
  }

  return [...keywords].slice(0, 5);
}

// ── Main ──
let totalAltFixed = 0;
let totalLinksAdded = 0;
let totalKeywordsExpanded = 0;

for (const file of FILES) {
  const filePath = path.join(CONTENT_DIR, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Process each article in the file
  const slugMatches = [...content.matchAll(/slug: "([^"]*)"/g)];

  for (const match of slugMatches) {
    const slug = match[1];

    // Fix alt text for this article's section
    const { content: fixedContent, fixed } = fixAltText(content, slug);
    content = fixedContent;
    totalAltFixed += fixed;
  }

  // Fix keywords for each article
  content = content.replace(/keywords: \[([^\]]*)\]/g, (match, kwContent) => {
    // Find the slug for this keywords block
    const beforeMatch = content.substring(0, content.indexOf(match));
    const lastSlug = [...beforeMatch.matchAll(/slug: "([^"]*)"/g)].pop();
    if (!lastSlug) return match;

    const slug = lastSlug[1];
    const existing = kwContent.split(",").map(k => k.trim().replace(/"/g, "")).filter(Boolean);
    const expanded = expandKeywords(slug, existing);
    totalKeywordsExpanded++;
    return `keywords: [${expanded.map(k => `"${k}"`).join(", ")}]`;
  });

  // Add internal links to each article's content
  for (const match of slugMatches) {
    const slug = match[1];
    const contentStart = content.indexOf(`slug: "${slug}"`);
    const contentFieldMatch = content.substring(contentStart).match(/content: `\n([\s\S]*?)\n`/);
    if (!contentFieldMatch) continue;

    const articleContent = contentFieldMatch[1];
    const { content: linkedContent, added } = addInternalLinks(articleContent, slug);
    if (added > 0) {
      content = content.replace(articleContent, linkedContent);
      totalLinksAdded += added;
    }
  }

  fs.writeFileSync(filePath, content);
  console.log(`Processed ${file}`);
}

console.log(`\n=== RESULTS ===`);
console.log(`Alt texts fixed: ${totalAltFixed}`);
console.log(`Internal links added: ${totalLinksAdded}`);
console.log(`Keywords expanded: ${totalKeywordsExpanded}`);
