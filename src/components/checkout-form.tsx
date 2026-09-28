"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "./cart-provider";
import { resolveLines, shippingFor } from "@/lib/cart";
import { formatPrice } from "@/lib/money";

interface Fields {
  email: string;
  name: string;
  address: string;
  city: string;
  postal: string;
  country: string;
}

const initial: Fields = {
  email: "",
  name: "",
  address: "",
  city: "",
  postal: "",
  country: "United States",
};

function makeOrderNumber(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(Math.random() * 1296).toString(36).toUpperCase().padStart(2, "0");
  return `HL-${stamp}${rand}`;
}

export function CheckoutForm() {
  const { lines, hydrated, subtotal, clear } = useCart();
  const [fields, setFields] = useState<Fields>(initial);
  const [order, setOrder] = useState<{ number: string; total: number; email: string } | null>(null);

  const resolved = resolveLines(lines);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  function update<K extends keyof Fields>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (resolved.length === 0) return;
    // No payment provider is wired up yet. This records a demo confirmation
    // client-side and empties the cart so the flow can be exercised end to end.
    setOrder({ number: makeOrderNumber(), total, email: fields.email });
    clear();
  }

  if (order) {
    return (
      <div className="max-w-xl rounded-2xl border border-line bg-white p-8">
        <p className="eyebrow mb-3">Order {order.number}</p>
        <h2 className="font-display text-3xl font-semibold">Thanks. It&apos;s on its way to the press.</h2>
        <p className="mt-4 text-ink-soft">
          We&apos;ve sent a confirmation to <span className="font-medium text-ink">{order.email}</span>.
          Printed-to-order pieces ship within five business days.
        </p>
        <p className="mt-2 text-sm text-ink-mute">Total charged: {formatPrice(order.total)}</p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Keep browsing
        </Link>
      </div>
    );
  }

  if (!hydrated) {
    return <div className="h-40 animate-pulse rounded-2xl bg-cream-deep" aria-busy="true" />;
  }

  if (resolved.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line p-12 text-center">
        <p className="font-display text-2xl font-semibold">Nothing to check out.</p>
        <Link href="/shop" className="btn btn-primary mt-6">
          Back to the shop
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="space-y-8">
        <section>
          <h2 className="font-display mb-4 text-xl font-semibold">Contact</h2>
          <div className="grid gap-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                className="field"
                value={fields.email}
                onChange={update("email")}
              />
            </label>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-4 text-xl font-semibold">Shipping address</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium">Full name</span>
              <input
                required
                autoComplete="name"
                className="field"
                value={fields.name}
                onChange={update("name")}
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium">Street address</span>
              <input
                required
                autoComplete="street-address"
                className="field"
                value={fields.address}
                onChange={update("address")}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">City</span>
              <input
                required
                autoComplete="address-level2"
                className="field"
                value={fields.city}
                onChange={update("city")}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Postal code</span>
              <input
                required
                autoComplete="postal-code"
                className="field"
                value={fields.postal}
                onChange={update("postal")}
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium">Country</span>
              <select className="field" value={fields.country} onChange={update("country")}>
                {["United States", "Canada", "United Kingdom", "Australia", "Germany", "Portugal", "Japan", "Mexico"].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  ),
                )}
              </select>
            </label>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-4 text-xl font-semibold">Payment</h2>
          <div className="rounded-xl border border-dashed border-line bg-cream-deep/50 p-5 text-sm text-ink-soft">
            Payment isn&apos;t connected yet. Placing this order records a demo confirmation only,
            no card is charged. Hook up a payment provider in{" "}
            <code className="rounded bg-cream-deep px-1 py-0.5 text-xs">checkout-form.tsx</code> to go live.
          </div>
        </section>
      </div>

      <aside className="rounded-2xl bg-cream-deep/70 p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-semibold">Order</h2>
        <ul className="mt-4 divide-y divide-line text-sm">
          {resolved.map((line) => (
            <li key={line.key} className="flex justify-between gap-4 py-2">
              <span>
                {line.quantity} × {line.product.name}
                {line.size || line.color ? (
                  <span className="block text-xs text-ink-mute">
                    {[line.color, line.size].filter(Boolean).join(" · ")}
                  </span>
                ) : null}
              </span>
              <span className="tabular-nums">{formatPrice(line.subtotal)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
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
        <button type="submit" className="btn btn-primary mt-6 w-full">
          Place order
        </button>
        <Link href="/cart" className="mt-3 block text-center text-xs text-ink-mute hover:text-ink">
          Back to cart
        </Link>
      </aside>
    </form>
  );
}
