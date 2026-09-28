import { describe, expect, it } from "vitest";
import {
  getDestination,
  getFeaturedDestinations,
  getFeaturedProducts,
  getProductsForDestination,
  getRelatedProducts,
  queryProducts,
} from "../catalog";
import { destinations } from "../destinations";
import { categories, products } from "../products";

describe("catalog data integrity", () => {
  it("has unique destination and product slugs", () => {
    expect(new Set(destinations.map((d) => d.slug)).size).toBe(destinations.length);
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
  });

  it("points every product at an existing destination", () => {
    for (const p of products) {
      expect(getDestination(p.destinationSlug), p.slug).toBeDefined();
    }
  });

  it("gives every destination at least one product", () => {
    for (const d of destinations) {
      expect(getProductsForDestination(d.slug).length, d.slug).toBeGreaterThan(0);
    }
  });

  it("uses only known categories and positive prices", () => {
    for (const p of products) {
      expect(categories).toContain(p.category);
      expect(p.price).toBeGreaterThan(0);
      expect(Number.isInteger(p.price)).toBe(true);
    }
  });

  it("gives every sized product at least one size", () => {
    for (const p of products) {
      if (p.sizes) expect(p.sizes.length, p.slug).toBeGreaterThan(0);
    }
  });
});

describe("queryProducts", () => {
  it("returns the whole catalog with no filters", () => {
    expect(queryProducts()).toHaveLength(products.length);
  });

  it("filters by category", () => {
    const tees = queryProducts({ category: "tees" });
    expect(tees.length).toBeGreaterThan(0);
    expect(tees.every((p) => p.category === "tees")).toBe(true);
  });

  it("filters by destination", () => {
    const kyoto = queryProducts({ destination: "kyoto" });
    expect(kyoto.every((p) => p.destinationSlug === "kyoto")).toBe(true);
  });

  it("ignores unknown filter values", () => {
    expect(queryProducts({ category: "boats" })).toHaveLength(products.length);
    expect(queryProducts({ destination: "atlantis" })).toHaveLength(products.length);
    expect(queryProducts({ sort: "random" })).toHaveLength(products.length);
  });

  it("sorts by price ascending and descending", () => {
    const asc = queryProducts({ sort: "price-asc" }).map((p) => p.price);
    const desc = queryProducts({ sort: "price-desc" }).map((p) => p.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
  });

  it("sorts by name", () => {
    const names = queryProducts({ sort: "name" }).map((p) => p.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it("puts featured products first by default", () => {
    const result = queryProducts();
    const firstNonFeatured = result.findIndex((p) => !p.featured);
    const lastFeatured = result.map((p) => Boolean(p.featured)).lastIndexOf(true);
    expect(lastFeatured).toBeLessThan(firstNonFeatured);
  });

  it("does not mutate the catalog", () => {
    const before = products.map((p) => p.slug);
    queryProducts({ sort: "price-desc" });
    expect(products.map((p) => p.slug)).toEqual(before);
  });
});

describe("featured and related", () => {
  it("returns only featured items, honoring the limit", () => {
    expect(getFeaturedDestinations().every((d) => d.featured)).toBe(true);
    const featured = getFeaturedProducts(3);
    expect(featured).toHaveLength(3);
    expect(featured.every((p) => p.featured)).toBe(true);
  });

  it("never relates a product to itself and prefers the same destination", () => {
    const product = products.find((p) => p.slug === "kyoto-torii-hoodie")!;
    const related = getRelatedProducts(product, 4);
    expect(related.some((p) => p.slug === product.slug)).toBe(false);
    expect(related[0].destinationSlug).toBe("kyoto");
    expect(related.length).toBeLessThanOrEqual(4);
  });
});

describe("shopHref", () => {
  it("omits empty filters and the default sort", async () => {
    const { shopHref } = await import("../shop-url");
    expect(shopHref({})).toBe("/shop");
    expect(shopHref({ sort: "featured" })).toBe("/shop");
    expect(shopHref({ category: "tees" }, { sort: "price-asc" })).toBe(
      "/shop?category=tees&sort=price-asc",
    );
    expect(shopHref({ category: "tees", destination: "kyoto" }, { category: undefined })).toBe(
      "/shop?destination=kyoto",
    );
  });
});
