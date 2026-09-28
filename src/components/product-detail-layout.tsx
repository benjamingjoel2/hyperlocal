"use client";

import { useState, type ReactNode } from "react";
import type { Destination, Product } from "@/lib/types";
import { AddToCart } from "./add-to-cart";
import { ProductArt } from "./product-art";

/**
 * Two-column product layout. It is a Client Component only so the preview can
 * swap garment color when the shopper picks one; the server-rendered `info` and
 * `details` slots are passed through as children.
 */
export function ProductDetailLayout({
  product,
  destination,
  info,
  details,
}: {
  product: Product;
  destination: Destination;
  info: ReactNode;
  details: ReactNode;
}) {
  const [colorHex, setColorHex] = useState<string | undefined>(product.colors[0]?.hex);

  return (
    <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
      <div className="md:sticky md:top-24 md:self-start">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl">
          <ProductArt
            product={product}
            destination={destination}
            colorHex={colorHex}
            className="h-full w-full transition-colors duration-300"
          />
        </div>
      </div>
      <div className="space-y-8">
        <div>{info}</div>
        <AddToCart product={product} onColorChange={setColorHex} />
        {details}
      </div>
    </div>
  );
}
