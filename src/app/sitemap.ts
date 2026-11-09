import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allPages } from "@/data/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPages.map((p) => ({
    url: `${siteConfig.url}${p.href === "/" ? "" : p.href}`,
    changeFrequency: "monthly",
    priority: p.href === "/" ? 1 : p.href === "/contact" ? 0.6 : 0.8,
  }));
}
