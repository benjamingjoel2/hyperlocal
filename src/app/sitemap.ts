import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";
import { products } from "@/lib/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/shop", "/destinations", "/about"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const destinationUrls = destinations.map((d) => ({
    url: `${siteUrl}/destinations/${d.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const productUrls = products.map((p) => ({
    url: `${siteUrl}/shop/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...statics, ...destinationUrls, ...productUrls];
}
