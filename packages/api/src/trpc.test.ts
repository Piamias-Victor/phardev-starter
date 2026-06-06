import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { NotFoundError, ForbiddenError, ConflictError } from "@repo/core";
import {
  publicProcedure,
  protectedProcedure,
  router,
  createCallerFactory,
} from "./trpc.js";
import type { Context } from "./context.js";

// Minimal context — error middleware tests don't need session or real services
const noSessionCtx: Context = {
  session: null,
  services: {
    getUserById: () => Promise.reject(new Error("not used")),
    updateProfile: () => Promise.reject(new Error("not used")),
  },
};

function makeThrowingRouter(thrower: () => never) {
  const r = router({
    probe: publicProcedure.query(() => thrower()),
  });
  return createCallerFactory(r)({ ...noSessionCtx });
}

describe("domain error middleware", () => {
  it("maps NotFoundError to TRPCError NOT_FOUND", async () => {
    const caller = makeThrowingRouter(() => {
      throw new NotFoundError("thing not found");
    });
    await expect(caller.probe()).rejects.toMatchObject({
      code: "NOT_FOUND",
      message: "thing not found",
    });
  });

  it("maps ForbiddenError to TRPCError FORBIDDEN", async () => {
    const caller = makeThrowingRouter(() => {
      throw new ForbiddenError("no access");
    });
    await expect(caller.probe()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("maps ConflictError to TRPCError CONFLICT", async () => {
    const caller = makeThrowingRouter(() => {
      throw new ConflictError("already exists");
    });
    await expect(caller.probe()).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("passes through non-domain errors unchanged", async () => {
    const caller = makeThrowingRouter(() => {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "boom" });
    });
    await expect(caller.probe()).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
    });
  });
});

describe("protectedProcedure", () => {
  it("rejects unauthenticated caller with UNAUTHORIZED", async () => {
    const r = router({
      secret: protectedProcedure.query(() => "ok"),
    });
    const caller = createCallerFactory(r)({ ...noSessionCtx });
    await expect(caller.secret()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
  });
});
