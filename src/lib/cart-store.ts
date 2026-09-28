import {
  CART_STORAGE_KEY,
  cartReducer,
  parseStoredCart,
  type CartAction,
} from "./cart";
import type { CartLine } from "./types";

/**
 * A tiny external store for the cart, backed by localStorage and consumed via
 * useSyncExternalStore. The server snapshot is always the empty, un-hydrated cart,
 * so server and client markup match; the client swaps in the stored cart right
 * after hydration.
 */

export interface CartSnapshot {
  lines: CartLine[];
  hydrated: boolean;
}

const EMPTY: CartSnapshot = { lines: [], hydrated: false };

let snapshot: CartSnapshot | null = null;
const listeners = new Set<() => void>();

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? parseStoredCart(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

function writeStorage(lines: CartLine[]) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage can be unavailable (private mode, quota). The cart still works in memory.
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function onStorage(event: StorageEvent) {
  if (event.key !== CART_STORAGE_KEY && event.key !== null) return;
  snapshot = { lines: readStorage(), hydrated: true };
  emit();
}

export function getCartSnapshot(): CartSnapshot {
  if (snapshot === null) {
    snapshot = { lines: readStorage(), hydrated: true };
  }
  return snapshot;
}

export function getCartServerSnapshot(): CartSnapshot {
  return EMPTY;
}

export function subscribeCart(listener: () => void): () => void {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function dispatchCart(action: CartAction) {
  const current = getCartSnapshot();
  const lines = cartReducer(current.lines, action);
  if (lines === current.lines) return;
  snapshot = { lines, hydrated: true };
  writeStorage(lines);
  emit();
}
