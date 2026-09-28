import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="mb-10">
        <p className="eyebrow mb-4">Cart</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          What you&apos;re packing
        </h1>
      </div>
      <CartView />
    </div>
  );
}
