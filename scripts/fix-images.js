/**
 * Replace broken WordPress image references with relevant Unsplash stock photos.
 * Maps image context to golf-related Unsplash photos.
 */

const fs = require("fs");
const path = require("path");

// Golf-related Unsplash images categorized by topic
const stockImages = {
  // Golf simulators / indoor setups
  simulator: [
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1592919505780-303950717480?w=800&h=500&fit=crop",
  ],
  // Launch monitors / tech equipment
  equipment: [
    "https://images.unsplash.com/photo-1621005570352-6418df03796b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1550707227-6140ec0a5044?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=500&fit=crop",
  ],
  // Golf course / outdoor golf
  course: [
    "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1600783245777-080fd7ff9253?w=800&h=500&fit=crop",
  ],
  // Golf swing / practice
  swing: [
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1592919505780-303950717480?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop",
  ],
  // Generic golf
  generic: [
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1621005570352-6418df03796b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1550707227-6140ec0a5044?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1592919505780-303950717480?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1600783245777-080fd7ff9253?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=500&fit=crop",
  ],
};

// Counter for cycling through images
let imageCounter = 0;

function getReplacementImage(originalUrl, articleSlug) {
  // Pick from generic pool, cycling through to avoid all articles having same image
  const pool = stockImages.generic;
  const img = pool[imageCounter % pool.length];
  imageCounter++;
  return img;
}

const files = [
  "src/content/wp-reviews.ts",
  "src/content/wp-comparisons.ts",
  "src/content/wp-simulators.ts",
  "src/content/wp-golf-tips.ts",
  "src/content/wp-guides.ts",
];

let totalReplacements = 0;
let totalImgTagsRemoved = 0;

for (const file of files) {
  const filePath = path.join(__dirname, "..", file);
  let content = fs.readFileSync(filePath, "utf8");

  // Strategy: Replace <img> tags that reference WordPress uploads with clean versions
  // Pattern: <img src="https://parpercision.com/wp-content/uploads/..." .../>
  content = content.replace(
    /<img[^>]*src="https:\/\/parpercision\.com\/wp-content\/uploads\/[^"]*"[^>]*\/?>/gi,
    (match) => {
      const img = stockImages.generic[totalReplacements % stockImages.generic.length];
      totalReplacements++;
      return `<img src="${img}" alt="Golf equipment and simulator setup" style="max-width:100%;height:auto;border-radius:8px" />`;
    }
  );

  // Also replace any remaining bare WordPress upload URLs in src attributes
  content = content.replace(
    /src="https:\/\/parpercision\.com\/wp-content\/uploads\/[^"]*"/gi,
    () => {
      const img = stockImages.generic[totalReplacements % stockImages.generic.length];
      totalReplacements++;
      return `src="${img}"`;
    }
  );

  // Remove any broken image references that might still have WordPress paths
  content = content.replace(
    /https:\/\/parpercision\.com\/wp-content\/uploads\/[^"'\s)]+/gi,
    () => {
      const img = stockImages.generic[totalReplacements % stockImages.generic.length];
      totalReplacements++;
      return img;
    }
  );

  fs.writeFileSync(filePath, content);
  console.log(`Processed ${file}`);
}

console.log(`\nTotal image replacements: ${totalReplacements}`);
