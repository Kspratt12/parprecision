const fs = require("fs");

const coverMap = {
  "trackman-io-vs-trackman-4": "/wp-content/uploads/2025/01/brysonft-scaled-1.avif", // using bryson as fallback - similar golf theme
  "what-launch-monitor-does-bryson-dechambeau-use": "/wp-content/uploads/2025/01/brysonft-scaled-1.avif",
  "best-retractable-golf-simulators": "/wp-content/uploads/2025/01/retractable-garage-sim-build-v0-fb8qtlj5lqob1-scaled.jpg",
  "best-golf-simulators-for-small-spaces": "/wp-content/uploads/2025/01/roslyn-ny-home-golf-sim-4.jpg",
  "foresight-sports-gc3s-vs-gc3": "/wp-content/uploads/2025/01/lifestyle-gc3s-on-course.webp",
  "trackman-io-home-vs-complete": "/wp-content/uploads/2025/11/123.jpg",
  "foresight-sports-gchawk": "/wp-content/uploads/2025/01/0E7A9652-01-jpg.webp",
  "best-golf-simulators-for-business": "/wp-content/uploads/2025/01/TPG-Architecture_The-Vanbarton-Group_425-Lexington_-Photographer-David-Mitchell.webp",
  "golf-swing-drills": "/wp-content/uploads/2025/10/womens-golf-blog.webp",
  "trackman-io-review": "/wp-content/uploads/2025/01/Family-playing-bullseye_72-dpi-1024x683-1.jpg",
  "protee-vx-review": "/wp-content/uploads/2025/01/24693_7445531131993_f0caad0c_b49b_414e_943e_0d213aff05c4.webp",
  "garmin-r50-vs-gc3": "/wp-content/uploads/2025/11/ebdd65c784c84d8d92acf55431f347d1.thumbnail.0000000000-scaled.webp",
  "golf-simulator-turf": "/wp-content/uploads/2025/02/gasdfsd-scaled-1.webp",
  "uneekor-eye-mini-lite": "/wp-content/uploads/2025/01/41-1-scaled.jpeg",
  "uneekor-eye-xo2": "/wp-content/uploads/2025/01/8059f01a16624d5cb06ef1b319940a1c.thumbnail.0000000000_1024x1024.webp",
  "how-profitable-are-golf-simulators": "/wp-content/uploads/2025/02/9550f324-b51d-40f4-b036-f10b54cfeaeb-XGolf1-scaled.webp",
  "best-golf-simulators-for-garage-use": "/wp-content/uploads/2025/01/hide-away-golf-simulator-build-in-my-garage-finally-done-v0-9v2l4zfbvfac1-scaled.jpg",
  "hd-golf-simulator-ultimate-entertainment-package-review": "/wp-content/uploads/2025/02/Banner-Golf-simulator.jpg", // using similar golf sim image
  "best-golf-launch-monitors-under-1000": "/wp-content/uploads/2025/02/NCG-Landscape-4.png",
  "uneekor-qed": "/wp-content/uploads/2025/01/uneekor_qed_hitting_area.jpg",
  "foresight-falcon-review": "/wp-content/uploads/2025/01/AW1A9067-01-1024x683-1.png",
  "best-golf-simulators-for-the-money": "/wp-content/uploads/2025/02/golf-simulator-2-scaled.webp",
  "uneekor-eye-mini": "/wp-content/uploads/2025/01/rain-or-shine-golf-uneekor-eye-mini-launch-monitor-portable-launch-monitor-31209204777033-469490.webp",
  "foresight-sports-gc3s": "/wp-content/uploads/2025/01/GC3S-Lifestyle_foresight-sports-pic-e1736535647642.webp",
  "garmin-approach-r50": "/wp-content/uploads/2025/01/3tmqivPQEMoVYnrooWWgVk.jpg",
  "foresight-sports-gcquad": "/wp-content/uploads/2025/01/image-155.png",
  "best-golf-simulator-software": "/wp-content/uploads/2025/02/TGC2019-4.webp",
  "basement-golf-simulator": "/wp-content/uploads/2025/02/home-golf-simulator-44-web-1.webp",
  "best-golf-simulators-for-home": "/wp-content/uploads/2025/02/homecourse-golfsimulator-vooraanzicht.webp",
  "how-much-space-is-needed-for-a-golf-simulator": "/wp-content/uploads/2025/02/64b85bc637c2d5bffbb57e8b_4.26.2023-PDC-Ballard-Residence-Golf-Simulator-2-Medium-1536x1024-1.jpg",
  "foresight-sports-gc3": "/wp-content/uploads/2025/01/gc3-2_1024x.webp",
  "what-is-the-best-golf-simulator": "/wp-content/uploads/2025/01/Golfsimulator-67-1.webp",
  "best-swingbay-golf-simulators": "/wp-content/uploads/2025/01/7c17ed_7c8bc731b5394c76939d90d75ca6a518mv2.jpeg",
  "trugolf-apogee-review": "/wp-content/uploads/2025/01/MAX_Hero.webp",
  "golf-swing-drill-for-beginners": "/wp-content/uploads/2025/10/ratio3x2_1920.jpg",
  "full-swing-kit-review": "/wp-content/uploads/2025/01/tiger-woods-oneill2jpg.jpg",
  "bushnell-lpi": "/wp-content/uploads/2025/01/Background-LPi.jpg",
  "best-golf-simulators-for-left-and-right-handed-use": "/wp-content/uploads/2025/01/5_1024x.webp",
  "skytrak-vs-skytrak-plus-differences": "/wp-content/uploads/2025/11/XM-Newsletter.webp",
  "launch-monitor-vs-golf-simulator": "/wp-content/uploads/2025/01/launch-monitors-hero-v3-scaled.webp",
  "foresight-quadmax-review": "/wp-content/uploads/2025/01/GC7UktAagAANxpX-scaled.jpg",
  "golf-simulator-cost-2026": "/wp-content/uploads/2025/11/SimIntRoom_V11_45deg.webp",
  "hd-golf-simulator": "/wp-content/uploads/2025/02/Banner-Golf-simulator.jpg",
  "bushnell-launch-pro-vs-skytrak-plus": "/wp-content/uploads/2025/11/downl3333oad.avif",
  "best-golf-launch-monitors": "/wp-content/uploads/2025/02/GolfboyMain1_27c5571306.png",
  "why-are-golf-simulators-so-expensive": "/wp-content/uploads/2025/02/4_SIM_006_SimSpace_GardenRoom-scaled.webp",
  "what-is-the-most-accurate-launch-monitor": "/wp-content/uploads/2025/02/Garmin-Approach-R10-Featured.webp",
  "what-launch-monitor-do-pros-use": "/wp-content/uploads/2025/02/rain-or-shine-golf-full-swing-kit-practice-package-golf-simulator-practice-31137563607113-675765_1600x_8ae64a0e-74f7-416b-9bb8-635ee01ad9ba.webp",
  "how-accurate-is-the-skytrak-plus": "/wp-content/uploads/2025/11/AP22141717673800-e1655312228565.webp",
  "best-golf-simulators-under-10000": "/wp-content/uploads/2025/02/Uk-Garage-V2-GC3-View-4-01.webp",
  "best-portable-golf-launch-monitors": "/wp-content/uploads/2025/02/GBN-1-1-1024x576-1.jpg",
  "what-launch-monitor-does-tiger-woods-use": "/wp-content/uploads/2025/02/112185834_original-scaled.jpg",
  "skytrak-plus-for-beginners": "/wp-content/uploads/2025/11/9182KTYiP8L.jpg",
  "is-it-worth-buying-a-golf-launch-monitor": "/wp-content/uploads/2025/02/man-swinging-golf-course.jpg",
  "launch-monitor-pros-use": "/wp-content/uploads/2025/11/image-1.png",
  "best-overhead-launch-monitors-review": "/wp-content/uploads/2025/01/image-255.png",
  "how-much-does-a-golf-launch-monitor-cost-find-out-here": "/wp-content/uploads/2025/02/tiger-woods-celebrates-587657b23df78c17b6107c69.jpg",
  "how-to-build-a-golf-simulator-2": "/wp-content/uploads/2025/02/3.jpg",
  "do-golf-simulators-improve-your-game": "/wp-content/uploads/2025/02/golf-simulator-guide-12.webp",
  "golf-simulator-setup": "/wp-content/uploads/2025/02/1738260919616.avif",
  "how-to-build-a-golf-simulator-mancave": "/wp-content/uploads/2025/01/CineID_2382F_FL.webp",
  "how-to-set-up-a-golf-simulator-in-a-small-room": "/wp-content/uploads/2025/01/Golf-Simulator-in-Basement.webp",
};

const files = [
  "src/content/wp-reviews.ts",
  "src/content/wp-comparisons.ts",
  "src/content/wp-simulators.ts",
  "src/content/wp-golf-tips.ts",
  "src/content/wp-guides.ts",
];

let updated = 0;
for (const f of files) {
  let content = fs.readFileSync(f, "utf8");

  for (const [slug, coverPath] of Object.entries(coverMap)) {
    const slugMarker = `slug: "${slug}"`;
    const idx = content.indexOf(slugMarker);
    if (idx === -1) continue;

    // Find coverImage within next 1500 chars
    const searchEnd = Math.min(idx + 1500, content.length);
    const chunk = content.substring(idx, searchEnd);
    const coverMatch = chunk.match(/coverImage: "[^"]*"/);
    if (coverMatch) {
      const oldCover = coverMatch[0];
      const newCover = `coverImage: "${coverPath}"`;
      if (oldCover !== newCover) {
        content = content.substring(0, idx) + chunk.replace(oldCover, newCover) + content.substring(searchEnd);
        updated++;
      }
    }
  }

  fs.writeFileSync(f, content);
}

console.log(`Updated ${updated} cover images`);
