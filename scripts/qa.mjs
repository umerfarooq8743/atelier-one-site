// End-to-end QA against a running server (default http://localhost:3100).
//   node scripts/qa.mjs            → full run
//   QA_QUICK=1 node scripts/qa.mjs → fewer widths
// Checks: HTTP status, console errors, horizontal overflow, broken internal
// links, SEO tags, headings, and the interactive features.
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ROUTES = ["/", "/features", "/modules", "/workflows", "/screenshots", "/reports", "/technology", "/about", "/contact"];
const WIDTHS = process.env.QA_QUICK ? [360, 768, 1440] : [360, 390, 480, 640, 768, 900, 1024, 1200, 1440, 1920];
const EXPECT_WA = process.env.EXPECT_WHATSAPP; // digits, when the build was configured with a number

const results = [];
const fail = (name, detail) => results.push({ ok: false, name, detail });
const pass = (name, detail = "") => results.push({ ok: true, name, detail });
const check = (cond, name, detail) => (cond ? pass(name, detail) : fail(name, detail));

const browser = await chromium.launch({ executablePath: CHROME });

async function newPage(width, theme = "dark", opts = {}) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: opts.reducedMotion ?? "no-preference" });
  await ctx.addInitScript((t) => { try { sessionStorage.setItem("ao-splash", "1"); if (!sessionStorage.getItem("qa-seeded")) { localStorage.setItem("ao-theme", t); sessionStorage.setItem("qa-seeded", "1"); } } catch {} }, theme);
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(e.message));
  return { ctx, page, errors };
}

// ── 1. Responsive sweep: every route × width × theme ─────────────────────────
for (const theme of ["dark", "light"]) {
  for (const width of WIDTHS) {
    const { ctx, page, errors } = await newPage(width, theme);
    for (const route of ROUTES) {
      const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const label = `${route} @${width} ${theme}`;
      if (res?.status() !== 200) fail(`status ${label}`, res?.status());
      if (overflow > 1) {
        const culprit = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const el = [...document.querySelectorAll("body *")].find((e) => e.getBoundingClientRect().right > vw + 1 && getComputedStyle(e).position !== "fixed");
          return el ? `${el.tagName}.${String(el.className).slice(0, 80)}` : "?";
        });
        fail(`overflow ${label}`, `${overflow}px — ${culprit}`);
      }
    }
    if (errors.length) fail(`console errors @${width} ${theme}`, errors.slice(0, 3).join(" | "));
    await ctx.close();
  }
}
pass("responsive sweep complete", `${ROUTES.length} routes × ${WIDTHS.length} widths × 2 themes`);

// ── 2. SEO and structure per route ───────────────────────────────────────────
{
  const { ctx, page } = await newPage(1440);
  const titles = new Set();
  const links = new Set();
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    const info = await page.evaluate(() => ({
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
      og: document.querySelector('meta[property="og:title"]')?.content ?? "",
      ogImage: document.querySelector('meta[property="og:image"]')?.content ?? "",
      twitter: document.querySelector('meta[name="twitter:card"]')?.content ?? "",
      h1: document.querySelectorAll("h1").length,
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { JSON.parse(s.textContent); return true; } catch { return false; } }),
      imgsNoAlt: [...document.querySelectorAll("img:not([alt])")].length,
      links: [...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href")),
      headingSkip: (() => {
        const levels = [...document.querySelectorAll("main h1, main h2, main h3, main h4")].map((h) => Number(h.tagName[1]));
        return levels.some((l, i) => i > 0 && l - levels[i - 1] > 1);
      })(),
    }));
    check(info.title && !titles.has(info.title), `unique title ${route}`, info.title);
    titles.add(info.title);
    check(info.desc.length > 50, `description ${route}`, info.desc.length);
    check(info.canonical.endsWith(route === "/" ? "/" : route) || info.canonical.endsWith(route), `canonical ${route}`, info.canonical);
    check(info.og && info.ogImage && info.twitter, `open graph/twitter ${route}`);
    check(info.h1 === 1, `single h1 ${route}`, info.h1);
    check(info.jsonld.length > 0 && info.jsonld.every(Boolean), `valid JSON-LD ${route}`, info.jsonld.length);
    check(info.imgsNoAlt === 0, `img alt ${route}`);
    check(!info.headingSkip, `heading order ${route}`);
    info.links.forEach((l) => links.add(l.split("#")[0] || "/"));
  }
  for (const l of links) {
    const r = await page.request.get(BASE + l);
    check(r.status() === 200, `internal link ${l}`, r.status());
  }
  for (const p of ["/sitemap.xml", "/robots.txt", "/opengraph-image", "/icon.svg"]) {
    const r = await page.request.get(BASE + p);
    check(r.status() === 200, `asset ${p}`, r.status());
  }
  const r404 = await page.request.get(BASE + "/does-not-exist");
  check(r404.status() === 404, "404 page", r404.status());
  await ctx.close();
}

// ── 3. Functional tests ──────────────────────────────────────────────────────
{
  const { ctx, page, errors } = await newPage(1440, "dark");
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  // Theme toggle + persistence
  await page.getByRole("button", { name: /switch to light theme/i }).click();
  check((await page.evaluate(() => document.documentElement.dataset.theme)) === "light", "theme toggle switches to light");
  await page.reload({ waitUntil: "networkidle" });
  check((await page.evaluate(() => document.documentElement.dataset.theme)) === "light", "theme persists after reload");
  await page.getByRole("button", { name: /switch to dark theme/i }).click();

  // Header product menu
  await page.getByRole("button", { name: "Product" }).click();
  await page.getByRole("link", { name: /Reports 13 reports/ }).click();
  await page.waitForURL("**/reports");
  pass("header product menu navigates");
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Product" }).click();
  await page.keyboard.press("Escape");
  check((await page.getByRole("button", { name: "Product" }).getAttribute("aria-expanded")) === "false", "product menu closes on Escape");

  // Header CTA
  await page.getByRole("banner").getByRole("link", { name: "Talk to Our Team" }).click();
  await page.waitForURL("**/contact");
  pass("header CTA goes to contact");

  // Hero CTAs
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Explore Atelier One" }).click();
  await page.waitForURL("**/modules");
  pass("hero primary CTA");

  // Module tabs (click + keyboard)
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const tabs = page.getByRole("tab");
  check((await tabs.count()) === 9, "module tabs render", await tabs.count());
  await tabs.nth(2).click();
  check((await tabs.nth(2).getAttribute("aria-selected")) === "true", "module tab click selects");
  await page.keyboard.press("ArrowDown");
  check((await tabs.nth(3).getAttribute("aria-selected")) === "true", "module tabs arrow-key navigation");

  // Solution flow
  const flowBtn = page.getByRole("button", { name: /Payments$/ }).first();
  await flowBtn.click();
  check((await flowBtn.getAttribute("aria-pressed")) === "true", "solution flow node selects");

  // Order lifecycle demo
  await page.getByRole("button", { name: "Mark ready" }).first().click();
  await page.getByRole("button", { name: "Mark delivered" }).first().click();
  check(await page.getByRole("button", { name: "Done" }).first().isDisabled(), "order item reaches Delivered");
  await page.getByRole("button", { name: /Receive final payment/ }).click();
  check(await page.getByText("PKR 0", { exact: true }).first().isVisible(), "final payment clears balance");

  // Dashboard period + theme switch
  await page.getByRole("group", { name: "Dashboard period" }).getByRole("button", { name: "Year" }).click();
  check(await page.getByText("Yearly Sales").first().isVisible(), "dashboard period switch updates KPIs");
  await page.getByRole("group", { name: "Preview theme" }).getByRole("button", { name: "Light" }).click();
  pass("dashboard preview theme switch");

  // Workspace switcher
  await page.getByRole("group", { name: "Choose a company" }).getByRole("button", { name: "Company B" }).click();
  check(await page.getByText(/A user of Company B sees only Company B/).isVisible(), "workspace switcher");

  // FAQ accordion
  const faq = page.locator("details").first();
  await faq.locator("summary").click();
  check(await faq.evaluate((d) => d.open), "FAQ opens");
  await faq.locator("summary").focus();
  await page.keyboard.press("Enter");
  check(!(await faq.evaluate((d) => d.open)), "FAQ toggles with keyboard");

  // Measurement explorer
  await page.goto(BASE + "/modules", { waitUntil: "networkidle" });
  await page.getByRole("group", { name: "Garment variant" }).getByRole("button", { name: "Coat", exact: true }).click();
  check(await page.getByText(/Coat: 13 body measurements · collar/).isVisible(), "measurement variant switch");

  // Gallery filters + lightbox keyboard
  await page.goto(BASE + "/screenshots", { waitUntil: "networkidle" });
  const filters = page.getByRole("group", { name: /Filter screens/ });
  await filters.getByRole("button", { name: /^Reports/ }).click();
  await page.waitForTimeout(500);
  check((await page.getByRole("button", { name: /^Open preview/ }).count()) === 3, "gallery filter (Reports = 3)");
  await filters.getByRole("button", { name: /^All/ }).click();
  await page.waitForTimeout(500);
  check((await page.getByRole("button", { name: /^Open preview/ }).count()) === 26, "gallery shows all 26");
  await page.getByRole("button", { name: /^Open preview/ }).first().click();
  const dialog = page.getByRole("dialog");
  check(await dialog.isVisible(), "lightbox opens");
  const t1 = await dialog.locator("#lb-title").textContent();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(450);
  const t2 = await dialog.locator("#lb-title").textContent();
  check(t1 !== t2, "lightbox next via ArrowRight", `${t1} → ${t2}`);
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(450);
  check((await dialog.locator("#lb-title").textContent()) === t1, "lightbox previous via ArrowLeft");
  await page.getByRole("button", { name: "Next screen" }).click();
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  check(!(await dialog.isVisible().catch(() => false)), "lightbox closes on Escape");
  check(await page.evaluate(() => document.activeElement?.getAttribute("aria-haspopup") === "dialog"), "focus returns to gallery item");

  // Contact form validation
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Continue in WhatsApp/ }).click();
  check((await page.locator('[aria-invalid="true"]').count()) === 5, "contact: required fields flagged", await page.locator('[aria-invalid="true"]').count());
  check(await page.evaluate(() => document.activeElement?.getAttribute("name") === "name"), "contact: focus moves to first error");
  await page.getByLabel(/Full name/).fill("Ahmed Khan");
  await page.getByLabel(/Business name/).fill("Khan Tailors & Co");
  await page.getByLabel(/Phone number/).fill("+92 300 1234567");
  await page.getByLabel(/Email address/).fill("not-an-email");
  await page.getByLabel(/Business type/).selectOption("Tailoring Shops");
  await page.getByLabel(/Interested module/).selectOption("Measurements");
  await page.getByLabel(/Message/).fill("We have 4 tailors.\nNeed measurements.");
  await page.getByRole("button", { name: /Continue in WhatsApp/ }).click();
  check(await page.getByText("Please enter a valid email address.").isVisible(), "contact: invalid email rejected");
  await page.getByLabel(/Email address/).fill("ahmed@example.com");

  const popupPromise = page.waitForEvent("popup", { timeout: 4000 }).catch(() => null);
  await page.getByRole("button", { name: /Continue in WhatsApp/ }).click();
  const popup = await popupPromise;
  if (EXPECT_WA) {
    check(popup !== null, "contact: WhatsApp opens in new tab");
    if (popup) {
      const url = popup.url();
      const u = new URL(url.startsWith("https://wa.me") ? url : (await popup.evaluate(() => location.href)));
      pass("contact: popup url", url.slice(0, 90));
      check(url.includes(`wa.me/${EXPECT_WA}`) || url.includes(`phone=${EXPECT_WA}`) || url.includes(EXPECT_WA), "contact: WhatsApp number", url.slice(0, 80));
      const text = new URL(url).searchParams.get("text") ?? decodeURIComponent(u.search);
      check(/Name: Ahmed Khan/.test(text) && /Business: Khan Tailors & Co/.test(text) && /Interested In: Measurements/.test(text), "contact: message content encoded");
      await popup.close();
    }
    check(await page.getByText(/WhatsApp opened in a new tab/).isVisible(), "contact: honest success message");
  } else {
    check(popup === null, "contact: no WhatsApp when unconfigured");
    check(await page.getByText(/WhatsApp isn't set up for this site yet, so nothing was sent/).isVisible(), "contact: unconfigured message (no fake success)");
  }
  if (errors.length) fail("console errors during functional tests", errors.slice(0, 3).join(" | "));
  await ctx.close();
}

// ── 4. Mobile navigation ─────────────────────────────────────────────────────
{
  const { ctx, page } = await newPage(390, "light");
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  const drawer = page.getByRole("dialog", { name: "Site menu" });
  check(await drawer.isVisible(), "mobile drawer opens");
  check(await page.evaluate(() => document.body.style.overflow === "hidden"), "mobile drawer locks scroll");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(450);
  check(!(await drawer.isVisible().catch(() => false)), "mobile drawer closes on Escape");
  await page.getByRole("button", { name: "Open menu" }).click();
  await drawer.getByRole("link", { name: "Technology" }).click();
  await page.waitForURL("**/technology");
  pass("mobile drawer navigates");
  await ctx.close();
}

// ── 5. Keyboard + reduced motion ─────────────────────────────────────────────
{
  const { ctx, page } = await newPage(1440, "dark", { reducedMotion: "reduce" });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  check(await page.evaluate(() => document.activeElement?.textContent?.includes("Skip to content")), "skip link is first focus");
  const dur = await page.evaluate(() => getComputedStyle(document.querySelector(".marquee")).animationDuration);
  check(parseFloat(dur) < 0.01, "reduced motion disables marquee animation", dur);
  const focusVisible = await page.evaluate(() => {
    const a = document.querySelector("header a");
    a.focus();
    return getComputedStyle(a).outlineStyle !== "none";
  });
  check(focusVisible, "visible focus outline");
  await ctx.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
for (const r of results) if (!r.ok || process.env.QA_VERBOSE) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail !== undefined && r.detail !== "" ? `  — ${r.detail}` : ""}`);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
