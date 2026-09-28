import Link from "next/link";
import { destinations } from "@/lib/destinations";
import { categories, categoryLabels } from "@/lib/products";
import type { ProductFilters } from "@/lib/catalog";
import { shopHref } from "@/lib/shop-url";
import { SortSelect } from "./sort-select";

export function ShopFilters({ filters, total }: { filters: ProductFilters; total: number }) {
  const activeDestination = destinations.find((d) => d.slug === filters.destination);
  const hasFilters = Boolean(filters.category || filters.destination);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Link
          href={shopHref(filters, { category: undefined })}
          className={`chip ${!filters.category ? "chip-active" : ""}`}
          aria-current={!filters.category ? "true" : undefined}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={shopHref(filters, { category: c })}
            className={`chip ${filters.category === c ? "chip-active" : ""}`}
            aria-current={filters.category === c ? "true" : undefined}
          >
            {categoryLabels[c]}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-ink-mute">
            {total} {total === 1 ? "piece" : "pieces"}
          </span>
          {activeDestination && (
            <Link
              href={shopHref(filters, { destination: undefined })}
              className="chip chip-active gap-1.5"
              aria-label={`Remove ${activeDestination.name} filter`}
            >
              {activeDestination.name}
              <span aria-hidden="true">×</span>
            </Link>
          )}
          {hasFilters && (
            <Link href="/shop" className="text-ink-mute underline-offset-4 hover:text-ink hover:underline">
              Clear all
            </Link>
          )}
        </div>
        <SortSelect filters={filters} />
      </div>

      {!activeDestination && (
        <details className="group text-sm">
          <summary className="cursor-pointer list-none font-medium text-ink-soft hover:text-ink">
            Filter by destination
            <span className="ml-1 inline-block transition-transform group-open:rotate-180" aria-hidden="true">
              ▾
            </span>
          </summary>
          <div className="mt-3 flex flex-wrap gap-2">
            {destinations.map((d) => (
              <Link key={d.slug} href={shopHref(filters, { destination: d.slug })} className="chip">
                {d.name}
              </Link>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
