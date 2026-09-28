import Link from "next/link";
import { DestinationCard } from "@/components/destination-card";
import { ProductGrid } from "@/components/product-card";
import { PosterArt } from "@/components/product-art";
import { getDestination, getFeaturedDestinations, getFeaturedProducts } from "@/lib/catalog";
import { categories, categoryLabels } from "@/lib/products";

const values = [
  {
    title: "Designed on the road",
    body: "Every line starts with a trip. We sketch in the place, then work with a local illustrator or maker before anything gets printed.",
  },
  {
    title: "Printed in small batches",
    body: "Water-based inks on organic cotton, printed to order in runs of fifty. Nothing sits in a warehouse.",
  },
  {
    title: "A cut goes back",
    body: "Five percent of every destination line goes to a community project in that place. The current partners are listed on each destination page.",
  },
];

export default function HomePage() {
  const featuredDestinations = getFeaturedDestinations();
  const featuredProducts = getFeaturedProducts(8);
  const heroDestinations = ["patagonia", "lisbon", "oaxaca"]
    .map(getDestination)
    .filter((d) => d !== undefined);

  return (
    <>
      {/* Hero */}
      <section className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:py-20 lg:py-24">
        <div className="max-w-xl">
          <p className="eyebrow mb-5">Travel and destination inspired merch</p>
          <h1 className="font-display text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Wear the places you can&apos;t stop talking about.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Small-batch tees, hoodies, totes, posters and pins, each one designed around a
            single destination and the people who know it best.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-primary">
              Shop everything
            </Link>
            <Link href="/destinations" className="btn btn-secondary">
              Browse by destination
            </Link>
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-md items-end justify-center md:max-w-none">
          <div className="grid w-full grid-cols-3 items-end gap-3 sm:gap-4">
            {heroDestinations.map((d, i) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                aria-label={`${d.name} collection`}
                className={`block overflow-hidden rounded-xl shadow-card transition-transform hover:-translate-y-1 ${
                  i === 1 ? "-mt-10 sm:-mt-14" : ""
                }`}
                style={{ transform: `rotate(${i === 0 ? -3 : i === 2 ? 3 : 0}deg)` }}
              >
                <PosterArt destination={d} className="block w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-y border-line bg-cream-deep/50">
        <div className="container-page flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
          {categories.map((c) => (
            <Link key={c} href={`/shop?category=${c}`} className="chip shrink-0">
              {categoryLabels[c]}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured destinations */}
      <section className="container-page py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Destinations</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Places we keep going back to
            </h2>
          </div>
          <Link href="/destinations" className="hidden text-sm font-medium hover:text-terracotta sm:block">
            All destinations →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3">
          {featuredDestinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
        <Link href="/destinations" className="mt-8 block text-sm font-medium hover:text-terracotta sm:hidden">
          All destinations →
        </Link>
      </section>

      {/* Featured products */}
      <section className="container-page pb-16 md:pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Bestsellers and new drops</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              What people are packing
            </h2>
          </div>
          <Link href="/shop" className="hidden text-sm font-medium hover:text-terracotta sm:block">
            Shop all →
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Values */}
      <section className="bg-ink text-cream">
        <div className="container-page grid gap-10 py-16 md:grid-cols-3 md:py-20">
          {values.map((v) => (
            <div key={v.title}>
              <h3 className="font-display text-2xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
