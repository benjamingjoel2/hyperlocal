import Link from "next/link";
import { getDestination } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import { categoryLabels } from "@/lib/products";
import type { Badge, Product } from "@/lib/types";
import { ProductArt } from "./product-art";

const badgeLabels: Record<Badge, string> = {
  new: "New",
  bestseller: "Bestseller",
  limited: "Limited",
};

export function ProductCard({ product }: { product: Product }) {
  const destination = getDestination(product.destinationSlug);
  if (!destination) return null;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <ProductArt
          product={product}
          destination={destination}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold tracking-wide text-ink uppercase shadow-card">
            {badgeLabels[product.badge]}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium leading-snug group-hover:text-terracotta">{product.name}</h3>
          <p className="mt-0.5 text-sm text-ink-mute">
            {destination.name} · {categoryLabels[product.category]}
          </p>
        </div>
        <p className="shrink-0 text-sm font-medium tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
