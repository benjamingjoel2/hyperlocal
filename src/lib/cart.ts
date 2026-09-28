import { getProduct } from "./catalog";
import type { CartLine, Product } from "./types";

export const CART_STORAGE_KEY = "hyperlocal.cart.v1";

export type CartAction =
  | { type: "add"; line: Omit<CartLine, "key"> }
  | { type: "remove"; key: string }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

export function lineKey(line: Omit<CartLine, "key" | "quantity">): string {
  return [line.productSlug, line.size ?? "", line.color ?? ""].join("|");
}

export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.line);
      const quantity = Math.max(1, Math.floor(action.line.quantity));
      const existing = state.find((l) => l.key === key);
      if (existing) {
        return state.map((l) =>
          l.key === key ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...state, { ...action.line, key, quantity }];
    }
    case "remove":
      return state.filter((l) => l.key !== action.key);
    case "setQuantity": {
      const quantity = Math.floor(action.quantity);
      if (quantity <= 0) {
        return state.filter((l) => l.key !== action.key);
      }
      return state.map((l) => (l.key === action.key ? { ...l, quantity } : l));
    }
    case "clear":
      return [];
    case "hydrate":
      return action.lines;
  }
}

export interface ResolvedCartLine extends CartLine {
  product: Product;
  subtotal: number;
}

/** Join cart lines with catalog data, dropping any lines whose product no longer exists. */
export function resolveLines(lines: CartLine[]): ResolvedCartLine[] {
  const resolved: ResolvedCartLine[] = [];
  for (const line of lines) {
    const product = getProduct(line.productSlug);
    if (!product) continue;
    resolved.push({ ...line, product, subtotal: product.price * line.quantity });
  }
  return resolved;
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return resolveLines(lines).reduce((sum, l) => sum + l.subtotal, 0);
}

/** Flat-rate shipping, free over the threshold. Amounts in cents. */
export const FREE_SHIPPING_THRESHOLD = 7500;
export const FLAT_SHIPPING = 800;

export function shippingFor(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
}

/** Validate a value read from storage into a list of cart lines. */
export function parseStoredCart(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const lines: CartLine[] = [];
  for (const item of raw) {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof (item as CartLine).productSlug !== "string" ||
      typeof (item as CartLine).quantity !== "number"
    ) {
      continue;
    }
    const { productSlug, quantity, size, color } = item as CartLine;
    if (quantity <= 0 || !Number.isFinite(quantity)) continue;
    const line = {
      productSlug,
      quantity: Math.floor(quantity),
      size: typeof size === "string" ? size : undefined,
      color: typeof color === "string" ? color : undefined,
    };
    lines.push({ ...line, key: lineKey(line) });
  }
  return lines;
}
