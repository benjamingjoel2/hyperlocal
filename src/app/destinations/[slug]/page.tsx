import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import { PosterArt } from "@/components/product-art";
import { getDestination, getProductsForDestination } from "@/lib/catalog";
import { destinations } from "@/lib/destinations";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return { title: "Destination not found" };
  return {
    title: `${destination.name} collection`,
    description: `${destination.tagline} Merch inspired by ${destination.name}, ${destination.country}.`,
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const products = getProductsForDestination(destination.slug);

  return (
    <div>
      <section style={{ backgroundColor: destination.palette.bg }}>
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div style={{ color: destination.palette.fg }}>
            <Link
              href="/destinations"
              className="mb-6 inline-block text-xs font-semibold tracking-[0.18em] uppercase opacity-70 hover:opacity-100"
            >
              ← All destinations
            </Link>
            <p className="text-sm font-medium opacity-80">
              {destination.country} · {destination.region}
            </p>
            <h1 className="font-display mt-2 text-5xl leading-none font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              {destination.name}
            </h1>
            <p className="font-display mt-4 text-2xl italic opacity-90">{destination.tagline}</p>
            <p className="mt-6 max-w-lg text-base leading-relaxed opacity-85">
              {destination.description}
            </p>
          </div>
          <div className="mx-auto w-full max-w-xs md:max-w-sm">
            <div className="rotate-2 overflow-hidden rounded-xl shadow-card">
              <PosterArt destination={destination} className="block w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            The {destination.name} line
          </h2>
          <p className="text-sm text-ink-mute">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-ink-soft">This line is in the works. Check back soon.</p>
        )}
      </section>
    </div>
  );
}
