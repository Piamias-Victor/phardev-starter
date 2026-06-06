import { describe, expect, it, vi } from "vitest";
import { NotFoundError } from "@repo/core";
import type { User } from "@repo/core";
import { router, createCallerFactory } from "../trpc.js";
import { userRouter } from "./user.js";
import type { Context } from "../context.js";

const authedCtx = (
  getUserById: Context["services"]["getUserById"],
): Context => ({
  session: {
    user: { id: "u1", email: "alice@example.com" },
    expires: "2099-01-01",
  },
  services: { getUserById },
});

const appRouter = router({ user: userRouter });
const createCaller = createCallerFactory(appRouter);

describe("user router", () => {
  it("getById returns the User", async () => {
    const fakeUser: User = {
      id: "u1",
      email: "alice@example.com",
      name: "Alice",
      emailVerified: null,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const getUserById = vi.fn().mockResolvedValue(fakeUser);
    const caller = createCaller(authedCtx(getUserById));

    const result = await caller.user.getById({ id: "u1" });

    expect(result).toEqual(fakeUser);
    expect(getUserById).toHaveBeenCalledWith("u1");
  });

  it("getById propagates NotFoundError as NOT_FOUND TRPCError", async () => {
    const getUserById = vi
      .fn()
      .mockRejectedValue(new NotFoundError("User u2 not found"));
    const caller = createCaller(authedCtx(getUserById));

    await expect(caller.user.getById({ id: "u2" })).rejects.toMatchObject({
      code: "NOT_FOUND",
      message: "User u2 not found",
    });
  });
});
