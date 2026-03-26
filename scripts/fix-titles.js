const fs = require("fs");

const titleFixes = {
  "foresight-sports-gchawk": "GCHawk Review: Read This Before Spending $19,999",
  "golf-swing-drills": "Golf Swing Drills: 10 Proven Drills That Truly Improve Your Swing",
  "trackman-io-review": "TrackMan iO Review: Indoor-Only System for Permanent Builds",
  "uneekor-eye-mini-lite": "Uneekor EYE MINI Lite Review: Precision and Value for Indoor Golfers",
  "uneekor-eye-mini": "Uneekor EYE MINI Review: My Road to Better Golf Performance",
  "golf-swing-drill-for-beginners": "10 Best Golf Swing Drills for Beginners (That Build Consistency)",
  "bushnell-lpi": "Bushnell LPi Review: Accurate Data and Simulation for Indoors",
  "what-launch-monitor-do-pros-use": "Pros Like Tiger and Rory Use These Launch Monitors\u2014Why Don\u2019t You?",
  "how-to-build-a-golf-simulator-2": "How to Build a Golf Simulator for Under $8,000 in 6 Easy Steps",
  "how-to-build-a-golf-simulator-mancave": "How to Build a Golf Simulator for Your Mancave in 5 Easy Steps",
  "how-to-set-up-a-golf-simulator-in-a-small-room": "How to Set Up a Golf Simulator in a Small Room on Any Budget",
  "do-golf-simulators-improve-your-game": "Do Golf Simulators Actually Improve Your Game? The Truth in 2025",
  "golf-simulator-setup": "Golf Simulator Setup Guide: Avoid These Costly Mistakes Before You Buy!",
  "skytrak-vs-skytrak-plus-differences": "What\u2019s the Difference Between SkyTrak and SkyTrak Plus? From Someone Who Has Used Both",
  "launch-monitor-vs-golf-simulator": "Launch Monitor vs. Golf Simulator: Don\u2019t Buy Until You Read This!",
  "what-is-the-most-accurate-launch-monitor": "What Is the Most Accurate Golf Launch Monitor? The 9 Best Picks",
  "how-accurate-is-the-skytrak-plus": "How Accurate Is the SkyTrak+ for Real Golf Practice?",
  "how-much-space-is-needed-for-a-golf-simulator": "How Much Space Is Needed for a Golf Simulator? Read This First!",
  "golf-simulator-turf": "How to Choose the Best Golf Simulator Turf for Performance & Durability",
  "basement-golf-simulator": "How to Set Up the Perfect Basement Golf Simulator in 2025",
  "best-golf-simulator-software": "Best Golf Simulator Software: Compare E6, GSPro, and FSX Play",
  "what-is-the-best-golf-simulator": "What Is The Best Golf Simulator? Top Picks for Every Golfer",
  "protee-vx-review": "ProTee VX Review: Overhead Launch Monitor Built for Serious Simulator Owners",
  "foresight-falcon-review": "Foresight Falcon Review: The Mini GCHawk of Overhead Golf Simulators",
  "uneekor-qed": "Uneekor QED Review: Is It Still Worth It For A Home Golf Simulator in 2025?",
  "uneekor-eye-xo2": "Uneekor EYE XO2 Review: Read This Before You Spend $11,000",
  "hd-golf-simulator": "How the HD Golf Simulator Made My Business More Profitable",
  "garmin-approach-r50": "Garmin Approach R50 Review: The Best All-in-One Golf Simulator?",
  "foresight-sports-gc3": "Foresight Sports GC3 Review: The Best Launch Monitor Under $10K?",
  "foresight-sports-gc3s": "Foresight GC3S Review: Is It Better Than the GC3 in 2025?",
  "foresight-sports-gcquad": "GCQuad Review: Is This $15,999 Launch Monitor Really That Good?",
  "skytrak-plus-for-beginners": "Is the SkyTrak+ Suitable for Beginners? (Full Breakdown)",
  "is-it-worth-buying-a-golf-launch-monitor": "Is It Worth Buying a Golf Launch Monitor? Read This First",
  "launch-monitor-pros-use": "Which Launch Monitor Do the Pros Use? The Real Gear PGA Players Trust",
  "best-overhead-launch-monitors-review": "4 Best Overhead Launch Monitors in 2025 (Tested & Reviewed)",
  "how-much-does-a-golf-launch-monitor-cost-find-out-here": "How Much Does a Golf Launch Monitor Cost? Find Out Here",
  "foresight-quadmax-review": "Foresight QuadMAX Review: Is This The Next GCQuad For Serious Practice?",
  "bushnell-launch-pro-vs-skytrak-plus": "Bushnell Launch Pro vs SkyTrak+: The Differences That Actually Matter",
  "trackman-io-home-vs-complete": "Trackman iO Home vs Complete: The Real Difference Explained",
  "full-swing-kit-review": "Full Swing KIT Review: Tested Accuracy and Swing Video Features",
  "what-launch-monitor-does-tiger-woods-use": "Tiger Woods' Launch Monitor in 2025: Why He Trusts the Full Swing KIT",
  "how-profitable-are-golf-simulators": "How Profitable Are Indoor Golf Simulators? Maximizing Your ROI",
  "why-are-golf-simulators-so-expensive": "Why Are Golf Simulators So Expensive? A Breakdown of the Costs",
  "hd-golf-simulator-ultimate-entertainment-package-review": "HD Golf Simulator Ultimate Entertainment Package Review for 2026",
};

const files = [
  "src/content/wp-reviews.ts",
  "src/content/wp-comparisons.ts",
  "src/content/wp-simulators.ts",
  "src/content/wp-golf-tips.ts",
  "src/content/wp-guides.ts",
];

let totalFixes = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  for (const [slug, correctTitle] of Object.entries(titleFixes)) {
    const slugMarker = `slug: "${slug}"`;
    const slugIdx = content.indexOf(slugMarker);
    if (slugIdx === -1) continue;

    // Find the title line within 200 chars after the slug
    const chunk = content.substring(slugIdx, slugIdx + 500);
    const titleMatch = chunk.match(/title: "([^"]*)"/);
    if (!titleMatch) continue;

    const oldTitle = titleMatch[1];
    const escapedTitle = correctTitle.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

    if (oldTitle !== escapedTitle) {
      const oldFull = `title: "${oldTitle}"`;
      const newFull = `title: "${escapedTitle}"`;
      // Replace only in the context near this slug
      const before = content.substring(0, slugIdx);
      const after = content.substring(slugIdx);
      const fixedAfter = after.replace(oldFull, newFull);
      if (fixedAfter !== after) {
        content = before + fixedAfter;
        changed = true;
        totalFixes++;
        console.log(`Fixed: ${slug} -> ${correctTitle.substring(0, 60)}`);
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`  Updated ${file}`);
  }
}

console.log(`\nTotal fixes: ${totalFixes}`);
