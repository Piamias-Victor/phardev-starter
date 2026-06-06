import { describe, expect, it } from "vitest";
import { NotFoundError, ForbiddenError, ConflictError } from "./index.js";

describe("Domain Errors", () => {
  it("NotFoundError is an Error with message", () => {
    const err = new NotFoundError("User not found");
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(NotFoundError);
    expect(err.message).toBe("User not found");
  });

  it("ForbiddenError is distinct from NotFoundError", () => {
    const err = new ForbiddenError("access denied");
    expect(err).toBeInstanceOf(ForbiddenError);
    expect(err).not.toBeInstanceOf(NotFoundError);
    expect(err.name).toBe("ForbiddenError");
  });

  it("ConflictError carries its message", () => {
    const err = new ConflictError("email already taken");
    expect(err).toBeInstanceOf(ConflictError);
    expect(err.message).toBe("email already taken");
  });
});
