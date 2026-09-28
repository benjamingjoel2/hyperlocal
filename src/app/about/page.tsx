import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hyperlocal makes small-batch merch inspired by single destinations, designed with the people who live there.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow mb-4">About</p>
        <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Souvenirs are usually terrible. We wanted to fix that.
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>
            Hyperlocal started as a folder of sketches from a long trip and a shared
            frustration with airport gift shops. The shirts were bad, the posters were worse,
            and none of it had anything to do with the place we&apos;d actually been.
          </p>
          <p>
            So we make merch the way we&apos;d want to find it: one destination at a time, with a
            palette and a motif drawn from the place itself, printed in small runs on things
            you&apos;d wear anyway.
          </p>
          <p>
            Each line is built with someone who lives there, whether that&apos;s an illustrator in
            Oaxaca, a printmaker in Kyoto or a friend of a friend in Reykjavík who knows which
            colors the harbour houses really are. Five percent of every destination line goes
            back to a community project in that place.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-8 border-t border-line pt-12 md:grid-cols-3">
        <div>
          <h2 className="font-display text-xl font-semibold">Materials</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Organic ring-spun cotton, recycled canvas, archival paper and hard enamel. Water-based
            inks throughout. Details are listed on every product.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">Shipping and returns</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Flat $8 shipping in the US, free over $75. Printed-to-order pieces ship within five
            business days. Returns accepted within 30 days on unworn items.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">Suggest a destination</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            We add a few places a year, usually ones a customer wouldn&apos;t stop emailing us
            about. Write to hello@hyperlocal.example with the case for yours.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <Link href="/destinations" className="btn btn-primary">
          See the destinations
        </Link>
      </div>
    </div>
  );
}
