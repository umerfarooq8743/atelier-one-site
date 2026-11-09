import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@/styles/mockups.css";
import "@/styles/splash.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Splash } from "@/components/layout/Splash";
import { Providers } from "@/components/ui/Providers";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { MockupDefs } from "@/components/mockups/primitives";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { siteConfig } from "@/config/site";
import { JsonLd, organizationJsonLd, softwareJsonLd, websiteJsonLd } from "@/lib/seo";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Atelier One — Tailoring & Fabric Business Management Software",
    template: "%s · Atelier One",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.owner, url: siteConfig.repository }],
  creator: siteConfig.owner,
  openGraph: { type: "website", siteName: siteConfig.name, locale: "en" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
  ],
};

// Runs before first paint: applies the saved (or system) theme with no flash,
// and shows the intro splash once per browser session (never with reduced
// motion). The splash ends ~2.6 s after the page is parsed, on click, or on Escape.
const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.dataset.theme=t}catch(e){}
var show=0;try{if(!sessionStorage.getItem("ao-splash")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){sessionStorage.setItem("ao-splash","1");show=1}}catch(e){}
if(!show)return;d.classList.add("splash");var done=0;function end(){if(done)return;done=1;d.classList.add("splash-out");setTimeout(function(){d.classList.remove("splash","splash-out")},700)}
function go(){setTimeout(end,2600)}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();addEventListener("keydown",function(e){if(e.key==="Escape")end()});addEventListener("click",function(e){var x=e.target;if(x&&x.closest&&x.closest("[data-splash]"))end()})})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" className={`${outfit.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Splash />
        <a href="#main" className="skip-link">Skip to content</a>
        <MockupDefs />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), softwareJsonLd()]} />
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <RevealObserver />
      </body>
    </html>
  );
}
