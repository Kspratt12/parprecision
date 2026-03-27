/**
 * Add review verdict boxes (rating, specs, pros/cons, best-for)
 * to the top of major review articles.
 */
const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "..", "src", "content");

// Review data for each product
const reviewBoxes = {
  "trackman-io-review": {
    rating: "9.4",
    label: "Outstanding",
    bestFor: "Golfers building a permanent indoor simulator room who want the most accurate overhead tracking system available. Not for outdoor use or portable setups.",
    pros: ["Industry-leading indoor accuracy", "Clean ceiling-mounted installation", "Full ball and club data", "TrackMan Performance Studio software", "Seamless left/right-hand play"],
    cons: ["Indoor only - no outdoor use", "Starts at $13,995 (Home package)", "$700-$1,100/year subscription required", "Requires professional installation", "Needs dedicated room"],
    specs: [["Technology", "Overhead Doppler Radar (OERT)"], ["Price Range", "$13,995 - $23,495"], ["Use", "Indoor Only"], ["Ball Data", "Ball speed, spin, launch, carry, flight"], ["Club Data", "Yes (Home Complete+)"], ["Software", "TrackMan Performance Studio"], ["Subscription", "$700-$1,100/year after year 1"]],
  },
  "foresight-sports-gchawk": {
    rating: "9.2",
    label: "Excellent",
    bestFor: "Dedicated simulator rooms where accuracy and multi-sport capability matter. Best for golfers who want Foresight's proven camera technology in a ceiling-mounted system.",
    pros: ["Quadrascopic camera accuracy", "Multi-sport capability", "Seamless left/right-hand play", "FSX software ecosystem", "No floor space needed"],
    cons: ["$19,999 price tag", "Indoor only", "Requires ceiling mounting", "Software subscriptions add up", "Overkill for casual users"],
    specs: [["Technology", "Quadrascopic Camera"], ["Price", "$19,999"], ["Use", "Indoor Only"], ["Ball Data", "Ball speed, spin rate, launch angle, carry"], ["Club Data", "Yes (with add-on)"], ["Software", "FSX Play, GSPro, E6 Connect"], ["Mounting", "Ceiling-mounted"]],
  },
  "protee-vx-review": {
    rating: "8.5",
    label: "Great Value",
    bestFor: "Simulator owners who want reliable overhead tracking at a lower price than the GCHawk or TrackMan iO. Strong choice for dedicated home builds.",
    pros: ["Overhead camera accuracy", "Video replay feature", "Lower price than GCHawk/TrackMan", "GSPro compatible", "Left/right-hand support"],
    cons: ["Indoor only", "Less established software ecosystem", "No outdoor capability", "Requires ceiling installation", "Limited brand recognition vs Foresight/TrackMan"],
    specs: [["Technology", "Overhead Camera"], ["Price", "~$6,500"], ["Use", "Indoor Only"], ["Ball Data", "Ball speed, spin, launch angle, carry"], ["Club Data", "Yes"], ["Software", "GSPro, E6 Connect, ProTee software"], ["Mounting", "Ceiling-mounted"]],
  },
  "foresight-falcon-review": {
    rating: "9.0",
    label: "Excellent",
    bestFor: "The sweet spot between the GC3 and GCHawk. Ideal for dedicated simulator rooms wanting Foresight accuracy without the $20K GCHawk price.",
    pros: ["Foresight camera accuracy", "Overhead design - no floor clutter", "FSX software ecosystem", "Left/right-hand switching", "More affordable than GCHawk"],
    cons: ["Indoor only", "Premium pricing for home use", "Requires ceiling installation", "Software subscriptions extra", "Newer product - less long-term data"],
    specs: [["Technology", "Quadrascopic Camera"], ["Price", "~$14,999"], ["Use", "Indoor Only"], ["Ball Data", "Ball speed, spin, launch, carry"], ["Club Data", "Yes"], ["Software", "FSX Play, GSPro, E6 Connect"], ["Mounting", "Ceiling-mounted"]],
  },
  "trugolf-apogee-review": {
    rating: "8.3",
    label: "Good",
    bestFor: "Golfers who want a ceiling-mounted system with solid accuracy and TruGolf's proprietary software at a mid-range price point.",
    pros: ["Reliable overhead tracking", "TruGolf software included", "Ceiling-mounted convenience", "Mid-range pricing", "Good for dedicated rooms"],
    cons: ["$7,995 price point", "Less accurate than Foresight/TrackMan", "Smaller software ecosystem", "Indoor only", "Limited third-party compatibility"],
    specs: [["Technology", "Overhead Camera"], ["Price", "$7,995"], ["Use", "Indoor Only"], ["Ball Data", "Ball speed, spin, launch angle, carry"], ["Software", "TruGolf proprietary"], ["Mounting", "Ceiling-mounted"]],
  },
  "garmin-approach-r50": {
    rating: "8.8",
    label: "Best All-in-One",
    bestFor: "Golfers who want one device for both indoor simulator play and outdoor range practice. The built-in Home Tee Hero software means no separate computer needed.",
    pros: ["Works indoors AND outdoors", "Built-in simulator (Home Tee Hero)", "42,000+ courses included", "No subscription required", "Easy setup"],
    cons: ["Radar-based (less spin accuracy than camera)", "~$2,499 price", "Graphics not as good as GSPro/E6", "Needs space behind ball for radar", "Limited club data vs premium monitors"],
    specs: [["Technology", "Doppler Radar"], ["Price", "~$2,499"], ["Use", "Indoor + Outdoor"], ["Ball Data", "Ball speed, spin, launch, carry, flight"], ["Club Data", "Club speed, swing tempo"], ["Software", "Home Tee Hero (built-in, 42K courses)"], ["Subscription", "None required"]],
  },
  "foresight-sports-gcquad": {
    rating: "9.5",
    label: "Best Accuracy",
    bestFor: "Professional club fitters, teaching pros, and serious golfers who need the most accurate portable launch monitor available. The industry standard.",
    pros: ["Industry-leading accuracy", "Works indoors and outdoors", "Comprehensive ball + club data", "Used by PGA Tour pros", "Portable design"],
    cons: ["$15,999 starting price", "Club data add-on is extra", "Simulation software extra", "Premium price for home use", "Overkill for casual golfers"],
    specs: [["Technology", "Quadrascopic Camera"], ["Price", "$15,999+"], ["Use", "Indoor + Outdoor"], ["Ball Data", "Ball speed, spin rate/axis, launch, carry"], ["Club Data", "Yes (add-on)"], ["Software", "FSX Play, GSPro, E6 Connect"], ["Portability", "Yes - portable"]],
  },
  "foresight-sports-gc3": {
    rating: "9.0",
    label: "Best Portable Premium",
    bestFor: "Serious golfers and club fitters who want portable Foresight accuracy without the GCQuad price. Best under $10K.",
    pros: ["Triscopic camera accuracy", "Portable indoor/outdoor", "No subscription for core features", "Strong software ecosystem", "Compact design"],
    cons: ["~$7,500 price", "Camera can struggle in bright sun", "Club data limited vs GCQuad", "Simulation software extra", "No built-in display"],
    specs: [["Technology", "Triscopic Camera"], ["Price", "~$7,500"], ["Use", "Indoor + Outdoor"], ["Ball Data", "Ball speed, spin rate, launch angle, carry"], ["Club Data", "Limited"], ["Software", "FSX Play, GSPro, E6, TGC 2019"], ["Subscription", "None for core features"]],
  },
  "foresight-sports-gc3s": {
    rating: "8.5",
    label: "Lower Entry Price",
    bestFor: "Golfers who want Foresight accuracy with a lower upfront cost and don't mind the annual subscription. Best if you plan to use it for 3 years or less.",
    pros: ["Same camera tech as GC3", "Lower upfront cost than GC3", "Portable indoor/outdoor", "Strong accuracy", "Foresight software ecosystem"],
    cons: ["$499/year subscription required", "More expensive than GC3 after 5+ years", "Camera struggles in bright sun", "Subscription locks features", "No upgrade path to GC3"],
    specs: [["Technology", "Triscopic Camera"], ["Price", "~$4,500 + $499/yr"], ["Use", "Indoor + Outdoor"], ["Ball Data", "Ball speed, spin, launch, carry"], ["Club Data", "With subscription"], ["Software", "FSX Play, GSPro, E6"], ["Subscription", "$499/year required"]],
  },
  "bushnell-lpi": {
    rating: "8.7",
    label: "Best Indoor Camera",
    bestFor: "Indoor simulator builders who want Foresight-level accuracy in a fixed mount system at a more accessible price than the GCHawk.",
    pros: ["Foresight camera technology", "Excellent indoor accuracy", "FSX Play included (1 year)", "Left/right-hand support", "More affordable than GCHawk"],
    cons: ["Indoor only", "Fixed mount required", "Subscription after year 1", "No outdoor capability", "Less known brand for launch monitors"],
    specs: [["Technology", "Photometric Camera (Foresight)"], ["Price", "~$3,499"], ["Use", "Indoor Only"], ["Ball Data", "Ball speed, spin rate, launch angle, carry"], ["Software", "FSX Play (1yr included), GSPro, E6"], ["Mounting", "Fixed position"]],
  },
  "full-swing-kit-review": {
    rating: "8.2",
    label: "Tiger's Pick",
    bestFor: "Golfers who want radar-based tracking with swing video features. Good for both indoor practice and outdoor range sessions.",
    pros: ["Radar-based - works outdoors", "Swing video recording/playback", "Tiger Woods endorsement", "Solid accuracy for core metrics", "Simulator compatible"],
    cons: ["Mid-range accuracy for spin", "Needs space behind ball", "Less established software ecosystem", "Brand premium from endorsement", "Video quality varies by setup"],
    specs: [["Technology", "Doppler Radar"], ["Price", "Mid-range"], ["Use", "Indoor + Outdoor"], ["Ball Data", "Ball speed, spin, launch, carry"], ["Club Data", "Club speed"], ["Special Feature", "Swing video recording"], ["Software", "Full Swing app, simulator compatible"]],
  },
  "uneekor-eye-xo2": {
    rating: "8.8",
    label: "Best Value Overhead",
    bestFor: "Dedicated simulator room builds where you want overhead convenience and strong accuracy without paying GCHawk prices.",
    pros: ["Dual camera accuracy", "Ceiling-mounted design", "Significantly cheaper than GCHawk", "Left/right-hand support", "GSPro compatible"],
    cons: ["$11,000 price", "Indoor only", "Requires ceiling installation", "Software ecosystem smaller than Foresight", "Older technology than EYE MINI"],
    specs: [["Technology", "Dual High-Speed Cameras"], ["Price", "~$11,000"], ["Use", "Indoor Only"], ["Ball Data", "Ball speed, spin, launch, carry"], ["Club Data", "Yes"], ["Software", "GSPro, E6, Uneekor software"], ["Mounting", "Ceiling-mounted"]],
  },
  "uneekor-eye-mini": {
    rating: "8.6",
    label: "Great Overhead Value",
    bestFor: "Home simulator builders who want Uneekor's overhead tracking in a more compact and modern package.",
    pros: ["Compact overhead design", "Good accuracy", "Ceiling-mounted convenience", "GSPro compatible", "More modern than QED/XO2"],
    cons: ["Premium price for home use", "Indoor only", "Requires ceiling installation", "Smaller ecosystem than Foresight", "Still newer product"],
    specs: [["Technology", "Overhead Camera"], ["Price", "Premium tier"], ["Use", "Indoor Only"], ["Ball Data", "Ball speed, spin, launch, carry"], ["Software", "GSPro, E6, Uneekor software"], ["Mounting", "Ceiling-mounted"]],
  },
  "uneekor-eye-mini-lite": {
    rating: "8.3",
    label: "Budget Overhead",
    bestFor: "Budget-conscious simulator builders who want overhead convenience without the full EYE MINI price.",
    pros: ["Most affordable Uneekor overhead", "Ceiling-mounted convenience", "Core metrics accurate", "GSPro compatible", "Left/right-hand support"],
    cons: ["Fewer data points than full EYE MINI", "Indoor only", "Requires ceiling installation", "Limited club data", "Entry-level for Uneekor"],
    specs: [["Technology", "Overhead Camera"], ["Price", "Budget overhead tier"], ["Use", "Indoor Only"], ["Ball Data", "Ball speed, spin, launch, carry"], ["Software", "GSPro, E6, Uneekor software"], ["Mounting", "Ceiling-mounted"]],
  },
  "foresight-quadmax-review": {
    rating: "9.5",
    label: "Next-Gen Flagship",
    bestFor: "The next generation of Foresight's flagship. For pros, club fitters, and serious golfers who want the absolute best accuracy available.",
    pros: ["Updated camera technology", "Improved processing speed", "Comprehensive ball + club data", "Indoor/outdoor versatile", "Foresight ecosystem"],
    cons: ["Flagship pricing", "Overkill for casual golfers", "Simulation software extra", "Club data add-on extra", "New product - limited reviews"],
    specs: [["Technology", "Next-gen Quadrascopic Camera"], ["Price", "Premium flagship"], ["Use", "Indoor + Outdoor"], ["Ball Data", "Full ball flight data"], ["Club Data", "Yes (add-on)"], ["Software", "FSX Play, GSPro, E6 Connect"]],
  },
};

function buildReviewBox(data) {
  let html = `\n<div class="review-verdict">\n`;
  html += `<div style="display:flex;gap:1rem;align-items:center;margin-bottom:1rem">\n`;
  html += `<div class="rating-badge">${data.rating}</div>\n`;
  html += `<div><div style="font-weight:700;font-size:1.125rem">Our Rating: ${data.rating}/10</div>\n`;
  html += `<div class="rating-label">${data.label}</div></div>\n</div>\n`;

  // Specs table
  html += `<table>\n<tbody>\n`;
  for (const [key, val] of data.specs) {
    html += `<tr><th>${key}</th><td>${val}</td></tr>\n`;
  }
  html += `</tbody>\n</table>\n</div>\n`;

  // Pros/Cons
  html += `<div class="pros-cons">\n`;
  html += `<div class="pros"><h4>What We Like</h4>\n<ul>\n`;
  for (const p of data.pros) html += `<li>${p}</li>\n`;
  html += `</ul></div>\n`;
  html += `<div class="cons"><h4>What Could Be Better</h4>\n<ul>\n`;
  for (const c of data.cons) html += `<li>${c}</li>\n`;
  html += `</ul></div>\n</div>\n`;

  // Best For
  html += `<div class="best-for"><h4>Best For</h4>\n<p>${data.bestFor}</p></div>\n`;

  return html;
}

// Process files
const files = ["wp-reviews.ts", "wp-comparisons.ts", "wp-simulators.ts", "wp-guides.ts"];
let added = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  let content = fs.readFileSync(filePath, "utf8");

  for (const [slug, data] of Object.entries(reviewBoxes)) {
    const slugMarker = `slug: "${slug}"`;
    const slugIdx = content.indexOf(slugMarker);
    if (slugIdx === -1) continue;

    // Check if already has review-verdict
    const nextSlug = content.indexOf('slug: "', slugIdx + 10);
    const section = content.substring(slugIdx, nextSlug > 0 ? nextSlug : content.length);
    if (section.includes("review-verdict")) continue;

    // Find the first <p> in the content and insert after it
    const contentStart = content.indexOf("content: `", slugIdx);
    if (contentStart === -1) continue;

    const firstPEnd = content.indexOf("</p>", contentStart);
    if (firstPEnd === -1) continue;

    const insertPoint = firstPEnd + 4;
    const box = buildReviewBox(data);
    content = content.substring(0, insertPoint) + box + content.substring(insertPoint);
    added++;
    console.log(`Added review box to /${slug}/`);
  }

  fs.writeFileSync(filePath, content);
}

console.log(`\nTotal: ${added} review boxes added`);
