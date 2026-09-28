import type { Metadata } from "next";
import { DestinationCard } from "@/components/destination-card";
import { destinations } from "@/lib/destinations";
import type { Region } from "@/lib/types";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Browse Hyperlocal merch by destination, from Lisbon to Patagonia.",
};

const regionOrder: Region[] = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
];

export default function DestinationsPage() {
  const byRegion = regionOrder
    .map((region) => ({
      region,
      items: destinations.filter((d) => d.region === region),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="container-page py-14 md:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow mb-4">Destinations</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {destinations.length} places, each with its own line.
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Every destination gets a palette, a motif and a small run of pieces designed with
          someone who lives there.
        </p>
      </div>

      <div className="mt-14 space-y-16">
        {byRegion.map(({ region, items }) => (
          <section key={region} aria-labelledby={`region-${region}`}>
            <h2 id={`region-${region}`} className="eyebrow mb-6">
              {region}
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((d) => (
                <DestinationCard key={d.slug} destination={d} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
