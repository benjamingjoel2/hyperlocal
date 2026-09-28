import type { Metadata } from "next";
import { ProductGrid } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { getDestination, isCategory, queryProducts, type ProductFilters } from "@/lib/catalog";
import { categoryLabels } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "All Hyperlocal tees, hoodies, hats, totes, posters, pins, stickers and mugs.",
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const raw = await searchParams;
  const filters: ProductFilters = {
    category: first(raw.category),
    destination: first(raw.destination),
    sort: first(raw.sort),
  };
  const products = queryProducts(filters);

  const destination = filters.destination ? getDestination(filters.destination) : undefined;
  const heading =
    filters.category && isCategory(filters.category)
      ? categoryLabels[filters.category]
      : "Everything";

  return (
    <div className="container-page py-14 md:py-20">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow mb-4">Shop</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {heading}
          {destination ? ` from ${destination.name}` : ""}
        </h1>
      </div>

      <ShopFilters filters={filters} total={products.length} />

      <div className="mt-10">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-2xl border border-dashed border-line p-12 text-center">
            <p className="font-display text-2xl font-semibold">Nothing here yet.</p>
            <p className="mt-2 text-ink-soft">
              We haven&apos;t made that combination. Try another category or destination.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
