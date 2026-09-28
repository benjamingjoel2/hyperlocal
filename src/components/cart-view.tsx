"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";
import { ProductArt } from "./product-art";
import { getDestination } from "@/lib/catalog";
import { FREE_SHIPPING_THRESHOLD, resolveLines, shippingFor } from "@/lib/cart";
import { formatPrice } from "@/lib/money";

export function CartView() {
  const { lines, hydrated, subtotal, removeLine, setQuantity, clear } = useCart();
  const resolved = resolveLines(lines);

  if (!hydrated) {
    return (
      <div className="animate-pulse space-y-4" aria-busy="true" aria-label="Loading cart">
        <div className="h-24 rounded-2xl bg-cream-deep" />
        <div className="h-24 rounded-2xl bg-cream-deep" />
      </div>
    );
  }

  if (resolved.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line p-12 text-center">
        <p className="font-display text-2xl font-semibold">Your cart is empty.</p>
        <p className="mt-2 text-ink-soft">Nothing packed yet. The shop is right this way.</p>
        <Link href="/shop" className="btn btn-primary mt-6">
          Start shopping
        </Link>
      </div>
    );
  }

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
      <ul className="divide-y divide-line">
        {resolved.map((line) => {
          const destination = getDestination(line.product.destinationSlug);
          const colorHex = line.product.colors.find((c) => c.name === line.color)?.hex;
          return (
            <li key={line.key} className="flex gap-4 py-6 sm:gap-6">
              <Link
                href={`/shop/${line.product.slug}`}
                className="block w-24 shrink-0 overflow-hidden rounded-xl sm:w-28"
              >
                {destination && (
                  <ProductArt
                    product={line.product}
                    destination={destination}
                    colorHex={colorHex}
                    className="aspect-[4/5] w-full"
                  />
                )}
              </Link>
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/shop/${line.product.slug}`} className="font-medium hover:text-terracotta">
                      {line.product.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-ink-mute">
                      {[destination?.name, line.color, line.size].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <p className="text-sm font-medium tabular-nums">{formatPrice(line.subtotal)}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-full border border-line">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.key, line.quantity - 1)}
                      className="h-9 w-9 rounded-l-full hover:bg-cream-deep"
                      aria-label={`Decrease quantity of ${line.product.name}`}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.key, Math.min(20, line.quantity + 1))}
                      className="h-9 w-9 rounded-r-full hover:bg-cream-deep"
                      aria-label={`Increase quantity of ${line.product.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.key)}
                    className="text-sm text-ink-mute underline-offset-4 hover:text-ink hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="rounded-2xl bg-cream-deep/70 p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-semibold">Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Shipping</dt>
            <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatPrice(total)}</dd>
          </div>
        </dl>
        {remaining > 0 ? (
          <p className="mt-3 text-xs text-ink-mute">
            Add {formatPrice(remaining)} more for free shipping.
          </p>
        ) : (
          <p className="mt-3 text-xs text-sea">You&apos;ve got free shipping.</p>
        )}
        <Link href="/checkout" className="btn btn-primary mt-6 w-full">
          Check out
        </Link>
        <button
          type="button"
          onClick={clear}
          className="mt-3 w-full text-center text-xs text-ink-mute underline-offset-4 hover:text-ink hover:underline"
        >
          Empty cart
        </button>
      </aside>
    </div>
  );
}
