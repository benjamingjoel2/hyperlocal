import Link from "next/link";
import { destinations } from "@/lib/destinations";
import { categories, categoryLabels } from "@/lib/products";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-cream-deep/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
            Small-batch merch inspired by the places worth going back to. Designed on the
            road, printed close to home.
          </p>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c}>
                <Link href={`/shop?category=${c}`} className="hover:text-terracotta">
                  {categoryLabels[c]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Destinations</h3>
          <ul className="space-y-2 text-sm">
            {destinations.slice(0, 7).map((d) => (
              <li key={d.slug}>
                <Link href={`/destinations/${d.slug}`} className="hover:text-terracotta">
                  {d.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/destinations" className="font-medium hover:text-terracotta">
                All destinations →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Postcards</h3>
          <p className="mb-3 text-sm text-ink-soft">
            One email when a new destination drops. Nothing else.
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-line/70">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Hyperlocal. All rights reserved.</p>
          <p>Prices in USD. Free shipping over $75.</p>
        </div>
      </div>
    </footer>
  );
}
