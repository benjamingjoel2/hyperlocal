"use client";

import { useRouter } from "next/navigation";
import type { ProductFilters } from "@/lib/catalog";
import { shopHref } from "@/lib/shop-url";

const options = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name" },
] as const;

export function SortSelect({ filters }: { filters: ProductFilters }) {
  const router = useRouter();
  const value = filters.sort ?? "featured";
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-ink-mute">Sort</span>
      <select
        value={value}
        onChange={(e) => router.push(shopHref(filters, { sort: e.target.value }))}
        className="field w-auto py-1.5 pr-8"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
