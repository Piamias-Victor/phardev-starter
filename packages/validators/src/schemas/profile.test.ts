import { describe, expect, it } from "vitest";
import { updateProfileSchema } from "./profile.js";

describe("updateProfileSchema", () => {
  it("accepts valid input", () => {
    const result = updateProfileSchema.safeParse({ name: "Alice" });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = updateProfileSchema.safeParse({ name: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("name");
  });

  it("rejects name longer than 100 chars", () => {
    const result = updateProfileSchema.safeParse({ name: "a".repeat(101) });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("name");
  });
});
