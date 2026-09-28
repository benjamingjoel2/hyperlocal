import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-start py-24 md:py-32">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Off the map.
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        We couldn&apos;t find that page. It may have moved, or it may never have existed,
        which happens more than you&apos;d think.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/shop" className="btn btn-secondary">
          Go to the shop
        </Link>
      </div>
    </div>
  );
}
