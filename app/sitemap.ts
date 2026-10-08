import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/our-craft", "/kits", "/kits/sangam", "/kits/trimbak", "/faq", "/contact"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route.startsWith("/kits") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/kits") ? 0.9 : 0.7,
  }));
}
