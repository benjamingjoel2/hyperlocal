import { describe, expect, it } from "vitest";
import {
  cartCount,
  cartReducer,
  cartSubtotal,
  FLAT_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  lineKey,
  parseStoredCart,
  resolveLines,
  shippingFor,
} from "../cart";
import { getProduct } from "../catalog";
import type { CartLine } from "../types";

const tee = getProduct("lisbon-tram-28-tee")!;
const pin = getProduct("kyoto-lantern-pin")!;

describe("cartReducer", () => {
  it("adds a new line with a stable key", () => {
    const state = cartReducer([], {
      type: "add",
      line: { productSlug: tee.slug, quantity: 1, size: "M", color: "Navy" },
    });
    expect(state).toHaveLength(1);
    expect(state[0].key).toBe(lineKey({ productSlug: tee.slug, size: "M", color: "Navy" }));
    expect(state[0].quantity).toBe(1);
  });

  it("merges quantities for the same product and options", () => {
    let state = cartReducer([], {
      type: "add",
      line: { productSlug: tee.slug, quantity: 1, size: "M", color: "Navy" },
    });
    state = cartReducer(state, {
      type: "add",
      line: { productSlug: tee.slug, quantity: 2, size: "M", color: "Navy" },
    });
    expect(state).toHaveLength(1);
    expect(state[0].quantity).toBe(3);
  });

  it("keeps different sizes of the same product as separate lines", () => {
    let state = cartReducer([], {
      type: "add",
      line: { productSlug: tee.slug, quantity: 1, size: "M", color: "Navy" },
    });
    state = cartReducer(state, {
      type: "add",
      line: { productSlug: tee.slug, quantity: 1, size: "L", color: "Navy" },
    });
    expect(state).toHaveLength(2);
  });

  it("clamps added quantity to at least one", () => {
    const state = cartReducer([], {
      type: "add",
      line: { productSlug: pin.slug, quantity: 0 },
    });
    expect(state[0].quantity).toBe(1);
  });

  it("removes a line when quantity is set to zero", () => {
    let state = cartReducer([], { type: "add", line: { productSlug: pin.slug, quantity: 2 } });
    const key = state[0].key;
    state = cartReducer(state, { type: "setQuantity", key, quantity: 0 });
    expect(state).toHaveLength(0);
  });

  it("updates quantity and removes by key", () => {
    let state = cartReducer([], { type: "add", line: { productSlug: pin.slug, quantity: 2 } });
    const key = state[0].key;
    state = cartReducer(state, { type: "setQuantity", key, quantity: 5 });
    expect(state[0].quantity).toBe(5);
    state = cartReducer(state, { type: "remove", key });
    expect(state).toHaveLength(0);
  });

  it("clears and hydrates", () => {
    const lines: CartLine[] = [{ key: "k", productSlug: pin.slug, quantity: 1 }];
    expect(cartReducer(lines, { type: "clear" })).toEqual([]);
    expect(cartReducer([], { type: "hydrate", lines })).toBe(lines);
  });
});

describe("totals", () => {
  const lines: CartLine[] = [
    { key: "a", productSlug: tee.slug, quantity: 2, size: "M", color: "Navy" },
    { key: "b", productSlug: pin.slug, quantity: 1 },
    { key: "c", productSlug: "does-not-exist", quantity: 3 },
  ];

  it("counts every unit, including unresolvable lines", () => {
    expect(cartCount(lines)).toBe(6);
  });

  it("drops lines whose product no longer exists when resolving", () => {
    const resolved = resolveLines(lines);
    expect(resolved.map((l) => l.productSlug)).toEqual([tee.slug, pin.slug]);
    expect(resolved[0].subtotal).toBe(tee.price * 2);
  });

  it("sums subtotals of resolvable lines only", () => {
    expect(cartSubtotal(lines)).toBe(tee.price * 2 + pin.price);
  });
});

describe("shippingFor", () => {
  it("is free for an empty cart", () => {
    expect(shippingFor(0)).toBe(0);
  });
  it("charges the flat rate under the threshold", () => {
    expect(shippingFor(FREE_SHIPPING_THRESHOLD - 1)).toBe(FLAT_SHIPPING);
  });
  it("is free at and above the threshold", () => {
    expect(shippingFor(FREE_SHIPPING_THRESHOLD)).toBe(0);
    expect(shippingFor(FREE_SHIPPING_THRESHOLD * 2)).toBe(0);
  });
});

describe("parseStoredCart", () => {
  it("returns an empty cart for anything that is not an array", () => {
    expect(parseStoredCart(null)).toEqual([]);
    expect(parseStoredCart({})).toEqual([]);
    expect(parseStoredCart("[]")).toEqual([]);
  });

  it("keeps well-formed lines and recomputes their keys", () => {
    const parsed = parseStoredCart([
      { key: "stale", productSlug: tee.slug, quantity: 2.7, size: "M", color: "Navy" },
    ]);
    expect(parsed).toEqual([
      {
        key: lineKey({ productSlug: tee.slug, size: "M", color: "Navy" }),
        productSlug: tee.slug,
        quantity: 2,
        size: "M",
        color: "Navy",
      },
    ]);
  });

  it("skips malformed lines", () => {
    const parsed = parseStoredCart([
      null,
      42,
      { productSlug: 7, quantity: 1 },
      { productSlug: pin.slug, quantity: 0 },
      { productSlug: pin.slug, quantity: Number.NaN },
      { productSlug: pin.slug, quantity: 1, size: 12 },
    ]);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].size).toBeUndefined();
  });
});
