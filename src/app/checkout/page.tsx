import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="mb-10">
        <p className="eyebrow mb-4">Checkout</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Almost there
        </h1>
      </div>
      <CheckoutForm />
    </div>
  );
}
