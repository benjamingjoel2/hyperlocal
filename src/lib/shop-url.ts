import type { ProductFilters } from "./catalog";

/** Build a /shop URL from the current filters with some of them replaced. */
export function shopHref(current: ProductFilters, patch: Partial<ProductFilters> = {}): string {
  const next = { ...current, ...patch };
  const params = new URLSearchParams();
  if (next.category) params.set("category", next.category);
  if (next.destination) params.set("destination", next.destination);
  if (next.sort && next.sort !== "featured") params.set("sort", next.sort);
  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
}
