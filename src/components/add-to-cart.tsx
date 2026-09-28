"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./cart-provider";
import type { Product } from "@/lib/types";

export function AddToCart({
  product,
  onColorChange,
}: {
  product: Product;
  onColorChange?: (hex: string | undefined) => void;
}) {
  const { addLine } = useCart();
  const hasSizes = Boolean(product.sizes?.length);
  const hasColors = product.colors.length > 0;

  const [size, setSize] = useState<string | undefined>(
    hasSizes && product.sizes!.length === 1 ? product.sizes![0] : undefined,
  );
  const [color, setColor] = useState<string | undefined>(product.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2500);
    return () => clearTimeout(timer);
  }, [added]);

  function selectColor(name: string) {
    setColor(name);
    onColorChange?.(product.colors.find((c) => c.name === name)?.hex);
  }

  function submit() {
    if (hasSizes && !size) {
      setError("Pick a size first.");
      return;
    }
    setError(null);
    addLine({ productSlug: product.slug, quantity, size, color });
    setAdded(true);
  }

  return (
    <div className="space-y-6">
      {hasColors && (
        <fieldset>
          <legend className="mb-3 text-sm font-medium">
            Color <span className="text-ink-mute">· {color}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => {
              const selected = c.name === color;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => selectColor(c.name)}
                  aria-pressed={selected}
                  aria-label={c.name}
                  title={c.name}
                  className={`h-9 w-9 rounded-full border-2 transition ${
                    selected ? "border-ink ring-2 ring-cream ring-inset" : "border-line hover:border-ink"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
        </fieldset>
      )}

      {hasSizes && (
        <fieldset>
          <legend className="mb-3 text-sm font-medium">
            Size{" "}
            {size ? <span className="text-ink-mute">· {size}</span> : null}
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes!.map((s) => {
              const selected = s === size;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setError(null);
                  }}
                  aria-pressed={selected}
                  className={`chip min-w-12 justify-center ${selected ? "chip-active" : ""}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-line">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-11 w-11 rounded-l-full text-lg hover:bg-cream-deep"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            className="h-11 w-11 rounded-r-full text-lg hover:bg-cream-deep"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button type="button" onClick={submit} className="btn btn-primary h-11 flex-1 sm:flex-none sm:px-10">
          {added ? "Added to cart ✓" : "Add to cart"}
        </button>
      </div>

      <div aria-live="polite" className="min-h-5 text-sm">
        {error && <p className="text-terracotta-deep">{error}</p>}
        {added && !error && (
          <p className="text-sea">
            Added.{" "}
            <Link href="/cart" className="font-medium underline underline-offset-4">
              View cart
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
