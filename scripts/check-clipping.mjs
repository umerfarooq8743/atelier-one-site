// Finds text that spills outside its own box (e.g. a long word in a narrow card).
import { chromium } from "playwright-core";
const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const routes = (process.argv[2] ?? "/,/features,/modules,/workflows,/screenshots,/reports,/technology,/about,/contact").split(",");
const widths = [360, 390, 768, 1024, 1200, 1440];
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
let issues = 0;
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.addInitScript(() => sessionStorage.setItem("ao-splash", "1")); // skip intro splash
  for (const r of routes) {
    await page.goto(BASE + r.replace(/^route:/, ""), { waitUntil: "networkidle" });
    const found = await page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll("main *")) {
        if (el.closest(".mk, svg, [aria-hidden='true'], .marquee, [role='tablist'], [role='group'], nav")) continue;
        const cs = getComputedStyle(el);
        if (cs.overflowX !== "visible" || cs.display === "inline" || !el.clientWidth) continue;
        const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (hasText && el.scrollWidth > el.clientWidth + 2) out.push(`${el.tagName} "${el.textContent.trim().slice(0, 40)}" ${el.scrollWidth}>${el.clientWidth}`);
      }
      return out.slice(0, 5);
    });
    for (const f of found) { issues++; console.log(`${r} @${w}: ${f}`); }
  }
  await page.close();
}
await browser.close();
console.log(issues ? `${issues} clipping issue(s)` : "no text clipping found");
process.exit(issues ? 1 : 0);
