"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { cartCount, cartSubtotal, type CartAction } from "@/lib/cart";
import {
  dispatchCart,
  getCartServerSnapshot,
  getCartSnapshot,
  subscribeCart,
} from "@/lib/cart-store";
import type { CartLine } from "@/lib/types";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** False until the cart has been read from storage on the client. */
  hydrated: boolean;
  dispatch: (action: CartAction) => void;
  addLine: (line: Omit<CartLine, "key">) => void;
  removeLine: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const actions = {
  dispatch: dispatchCart,
  addLine: (line: Omit<CartLine, "key">) => dispatchCart({ type: "add", line }),
  removeLine: (key: string) => dispatchCart({ type: "remove", key }),
  setQuantity: (key: string, quantity: number) =>
    dispatchCart({ type: "setQuantity", key, quantity }),
  clear: () => dispatchCart({ type: "clear" }),
};

export function CartProvider({ children }: { children: ReactNode }) {
  const { lines, hydrated } = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot,
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      hydrated,
      count: cartCount(lines),
      subtotal: cartSubtotal(lines),
      ...actions,
    }),
    [lines, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
