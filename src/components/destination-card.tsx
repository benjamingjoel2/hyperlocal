import Link from "next/link";
import { getProductsForDestination } from "@/lib/catalog";
import type { Destination } from "@/lib/types";
import { PosterArt } from "./product-art";

export function DestinationCard({
  destination,
  size = "default",
}: {
  destination: Destination;
  size?: "default" | "large";
}) {
  const count = getProductsForDestination(destination.slug).length;
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
    >
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ backgroundColor: destination.palette.bg }}
      >
        <PosterArt
          destination={destination}
          className={`block w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
            size === "large" ? "" : ""
          }`}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-semibold leading-tight group-hover:text-terracotta">
            {destination.name}
          </h3>
          <p className="mt-0.5 text-sm text-ink-mute">{destination.tagline}</p>
        </div>
        <p className="shrink-0 text-xs font-medium tracking-wide text-ink-mute uppercase">
          {count} {count === 1 ? "piece" : "pieces"}
        </p>
      </div>
    </Link>
  );
}
