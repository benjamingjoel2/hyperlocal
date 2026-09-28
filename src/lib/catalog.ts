import { destinations } from "./destinations";
import { categoryLabels, products } from "./products";
import type { Category, Destination, Product } from "./types";

export type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export interface ProductFilters {
  category?: string;
  destination?: string;
  sort?: string;
}

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsForDestination(slug: string): Product[] {
  return products.filter((p) => p.destinationSlug === slug);
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((d) => d.featured);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function isCategory(value: string): value is Category {
  return value in categoryLabels;
}

export function isSortOption(value: string): value is SortOption {
  return ["featured", "price-asc", "price-desc", "name"].includes(value);
}

/** Filter and sort the catalog. Unknown filter values are ignored. */
export function queryProducts(filters: ProductFilters = {}): Product[] {
  let result = products.slice();

  if (filters.category && isCategory(filters.category)) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.destination && getDestination(filters.destination)) {
    result = result.filter((p) => p.destinationSlug === filters.destination);
  }

  const sort: SortOption =
    filters.sort && isSortOption(filters.sort) ? filters.sort : "featured";

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "featured":
      // Featured first, then keep catalog order.
      result.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
      break;
  }

  return result;
}

/** Products that share a destination or category, excluding the product itself. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameDestination = products.filter(
    (p) => p.slug !== product.slug && p.destinationSlug === product.destinationSlug,
  );
  const sameCategory = products.filter(
    (p) =>
      p.slug !== product.slug &&
      p.destinationSlug !== product.destinationSlug &&
      p.category === product.category,
  );
  return [...sameDestination, ...sameCategory].slice(0, limit);
}
