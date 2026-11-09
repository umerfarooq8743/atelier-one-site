// Usage: node scripts/screenshot.mjs <path> <width> <outfile> [theme] [fullPage]
import { chromium } from "playwright-core";

const [path = "/", width = "1440", out = "shot.png", theme = "dark", full = "1"] = process.argv.slice(2);
const base = process.env.BASE_URL ?? "http://localhost:3000";
const executablePath = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript((t) => { localStorage.setItem("ao-theme", t); sessionStorage.setItem("ao-splash", "1"); }, theme);
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(base + path.replace(/^route:/, ""), { waitUntil: "networkidle" });
// Wheel-scroll through the page so whileInView reveals run.
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += 500) { await page.mouse.wheel(0, 500); await page.waitForTimeout(90); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1200);
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
await page.screenshot({ path: out, fullPage: full === "1" });
console.log(JSON.stringify({ path, width, overflow, errors }));
await browser.close();
