import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { getDestination, getProduct, getRelatedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";
import { categoryLabels, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  const destination = getDestination(product.destinationSlug);
  return {
    title: `${product.name}${destination ? ` · ${destination.name}` : ""}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const destination = getDestination(product.destinationSlug);
  if (!destination) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <div className="container-page py-10 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-mute">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/shop" className="hover:text-ink">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/shop?category=${product.category}`} className="hover:text-ink">
              {categoryLabels[product.category]}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/destinations/${destination.slug}`} className="hover:text-ink">
              {destination.name}
            </Link>
          </li>
        </ol>
      </nav>

      <ProductDetailLayout
        product={product}
        destination={destination}
        info={
          <>
            <p className="eyebrow mb-3">
              {destination.name}, {destination.country}
            </p>
            <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl tabular-nums">{formatPrice(product.price)}</p>
            <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>
          </>
        }
        details={
          <div className="space-y-6 border-t border-line pt-6">
            <div>
              <h2 className="mb-2 text-sm font-semibold">Details</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-ink-soft">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold">Shipping and returns</h2>
              <p className="text-sm text-ink-soft">
                Flat $8 US shipping, free over $75. Printed-to-order pieces ship within five
                business days. Returns within 30 days on unworn items.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold">About the {destination.name} line</h2>
              <p className="text-sm text-ink-soft">{destination.description}</p>
              <Link
                href={`/destinations/${destination.slug}`}
                className="mt-2 inline-block text-sm font-medium hover:text-terracotta"
              >
                See the whole line →
              </Link>
            </div>
          </div>
        }
      />

      {related.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="font-display mb-8 text-2xl font-semibold tracking-tight">You might also pack</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
