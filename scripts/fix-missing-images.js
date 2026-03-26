/**
 * Replace only the images that are MISSING from the public folder
 * with Unsplash fallbacks. Keep images that exist locally.
 */
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");
const unsplashFallbacks = [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1621005570352-6418df03796b?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1550707227-6140ec0a5044?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1592919505780-303950717480?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1600783245777-080fd7ff9253?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=500&fit=crop",
];

let counter = 0;
let replaced = 0;
let kept = 0;

const files = [
  "src/content/wp-reviews.ts",
  "src/content/wp-comparisons.ts",
  "src/content/wp-simulators.ts",
  "src/content/wp-golf-tips.ts",
  "src/content/wp-guides.ts",
];

for (const file of files) {
  const filePath = path.join(__dirname, "..", file);
  let content = fs.readFileSync(filePath, "utf8");

  // Find all /wp-content/uploads/... references and check if file exists
  content = content.replace(
    /\/wp-content\/uploads\/[^"'\s)]+/g,
    (match) => {
      const localPath = path.join(publicDir, match);
      if (fs.existsSync(localPath)) {
        kept++;
        return match; // Keep original - file exists locally
      } else {
        const fallback = unsplashFallbacks[counter % unsplashFallbacks.length];
        counter++;
        replaced++;
        return fallback;
      }
    }
  );

  fs.writeFileSync(filePath, content);
}

console.log(`Kept (local file exists): ${kept}`);
console.log(`Replaced with Unsplash (missing): ${replaced}`);
