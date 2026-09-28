"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export function CartBadge() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition hover:bg-cream-deep"
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 7h12l-1 13H7L6 7z" />
        <path d="M9 10V6a3 3 0 0 1 6 0v4" />
      </svg>
      <span className="hidden sm:inline">Cart</span>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[11px] font-semibold text-cream">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
