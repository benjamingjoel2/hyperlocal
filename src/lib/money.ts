const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** Format a price given in US cents. */
export function formatPrice(cents: number): string {
  return formatter.format(cents / 100);
}
