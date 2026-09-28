import { describe, expect, it } from "vitest";
import { formatPrice } from "../money";

describe("formatPrice", () => {
  it("formats cents as US dollars", () => {
    expect(formatPrice(3800)).toBe("$38.00");
    expect(formatPrice(5)).toBe("$0.05");
    expect(formatPrice(123456)).toBe("$1,234.56");
  });
});
