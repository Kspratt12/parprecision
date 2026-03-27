const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "..", "src", "content");

const missingFaqs = {
  "foresight-sports-gchawk": [
    ["Is the Foresight GCHawk worth $19,999?", "The GCHawk delivers tour-level accuracy with its quadrascopic camera system and ceiling-mounted design. For dedicated simulator rooms where accuracy and seamless left/right-hand play matter, it is one of the best investments. For casual home use, mid-range options like the Falcon or Bushnell LPi offer similar accuracy at a lower price."],
    ["Does the GCHawk work outdoors?", "No. The GCHawk is designed strictly for indoor use. It mounts to the ceiling and uses infrared cameras that require controlled lighting."],
    ["What software works with the GCHawk?", "The GCHawk works with FSX Play, FSX 2020, GSPro, E6 Connect, and TGC 2019. The FSX ecosystem includes 25+ virtual courses."],
  ],
  "uneekor-qed": [
    ["Is the Uneekor QED still worth buying?", "The QED is Uneekor's original overhead launch monitor and still delivers reliable accuracy. The newer EYE MINI offers improved technology, but the QED may be available at a discount."],
    ["How accurate is the Uneekor QED?", "The QED uses dual high-speed cameras for accurate ball tracking including speed, spin, launch angle, and carry distance."],
    ["Does the QED work with GSPro?", "Yes. The QED is fully compatible with GSPro, one of the most popular and affordable simulator software options."],
  ],
  "foresight-falcon-review": [
    ["Is the Foresight Falcon worth the price?", "The Falcon delivers excellent overhead accuracy at a lower price than the GCHawk, making it ideal for dedicated simulator rooms where ceiling-mounting is preferred."],
    ["Does the Falcon support left and right-handed players?", "Yes. Because it is ceiling-mounted, the Falcon tracks both left and right-handed players without any repositioning needed."],
    ["What software is compatible with the Foresight Falcon?", "The Falcon works with FSX Play, FSX 2020, GSPro, E6 Connect, and TGC 2019."],
  ],
  "foresight-sports-gcquad": [
    ["Is the GCQuad the most accurate launch monitor?", "The GCQuad is widely considered one of the most accurate launch monitors available, used by tour pros and top club fitters worldwide."],
    ["Why is the GCQuad so expensive?", "At $15,999, the GCQuad price reflects its tour-level accuracy, dual-use indoor/outdoor capability, comprehensive club data, and professional-grade build quality."],
    ["Can I use the GCQuad for a home simulator?", "Yes. The GCQuad is compatible with FSX Play, E6 Connect, GSPro, and TGC 2019. However, most home users find better value in the GC3 or Bushnell Launch Pro."],
  ],
  "trugolf-apogee-review": [
    ["Is the TruGolf Apogee worth $7,995?", "The Apogee delivers solid overhead tracking with TruGolf's proprietary software. For golfers who want a ceiling-mounted system with reliable performance, it is competitive in the $5,000-$10,000 range."],
    ["How does the Apogee compare to the Foresight Falcon?", "Both are ceiling-mounted systems. The Falcon uses Foresight camera technology with a broader software ecosystem. The Apogee offers TruGolf's proprietary experience."],
    ["Does the TruGolf Apogee require a subscription?", "TruGolf offers software packages that may include subscription components. Check current pricing at authorized retailers."],
  ],
  "best-overhead-launch-monitors-review": [
    ["What is the best overhead launch monitor?", "The Foresight GCHawk leads in accuracy, while the Uneekor EYE MINI offers the best value. The Foresight Falcon is an excellent mid-range option."],
    ["Why choose an overhead launch monitor?", "Overhead monitors eliminate floor space behind the ball, support seamless left/right-hand switching, and deliver consistent accuracy for dedicated simulator rooms."],
    ["How much do overhead launch monitors cost?", "Prices range from approximately $5,000 (ProTee VX) to $19,999 (GCHawk). Mid-range options fall in the $8,000-$12,000 range."],
  ],
  "garmin-r50-vs-gc3": [
    ["Is the Garmin R50 as accurate as the Foresight GC3?", "The GC3 is more accurate for spin data due to its camera technology. The R50 uses radar and is better for outdoor ball flight tracking."],
    ["Which is better for a home simulator?", "Both work for simulators. The R50 includes built-in software (Home Tee Hero) for simpler setup. The GC3 requires separate software but delivers more precise data."],
    ["What is the price difference?", "The Garmin R50 is approximately $2,499 while the Foresight GC3 is approximately $7,500."],
  ],
  "best-retractable-golf-simulators": [
    ["What is a retractable golf simulator?", "A retractable simulator uses a screen and enclosure that fold away when not in use. Ideal for garages and multi-purpose rooms."],
    ["Are retractable simulators as good as permanent setups?", "Yes during play. The trade-off is 5-10 minutes of setup/takedown time. Accuracy and screen quality are the same."],
  ],
  "best-golf-simulators-for-business": [
    ["How much does a commercial golf simulator cost?", "Commercial systems range from $10,000 for basic setups to $70,000+ for premium systems like HD Golf. Most businesses invest $15,000-$30,000 per bay."],
    ["Is an indoor golf business profitable?", "Yes when managed well. A 4-bay venue charging $50/hour can generate $2,000+ daily. Location and marketing are key factors."],
  ],
  "golf-swing-drill-for-beginners": [
    ["What are the best golf drills for beginners?", "The Grip Check Drill, Mirror Posture Drill, and Gate Drill are the best starting points. They build the fundamentals every other skill depends on."],
    ["How often should beginners practice golf drills?", "3-4 times per week for 15-20 minutes each. Consistency matters more than duration. Focus on one or two drills per session."],
  ],
};

const files = ["wp-reviews.ts", "wp-comparisons.ts", "wp-simulators.ts", "wp-golf-tips.ts", "wp-guides.ts"];
let added = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  let content = fs.readFileSync(filePath, "utf8");

  for (const [slug, faqs] of Object.entries(missingFaqs)) {
    const slugMarker = `slug: "${slug}"`;
    const slugIdx = content.indexOf(slugMarker);
    if (slugIdx === -1) continue;

    const nextSlug = content.indexOf('slug: "', slugIdx + 10);
    const section = content.substring(slugIdx, nextSlug > 0 ? nextSlug : content.length);

    if (section.includes("Frequently Asked Questions")) continue;

    const relatedIdx = section.indexOf("<h2>Related Articles</h2>");
    if (relatedIdx === -1) continue;

    let faqHtml = "\n<h2>Frequently Asked Questions</h2>\n";
    for (const [q, a] of faqs) {
      faqHtml += `<h3>${q}</h3>\n<p>${a}</p>\n`;
    }

    const insertPoint = slugIdx + relatedIdx;
    content = content.substring(0, insertPoint) + faqHtml + "\n" + content.substring(insertPoint);
    added++;
  }

  fs.writeFileSync(filePath, content);
}

console.log(`FAQs added to ${added} articles`);
