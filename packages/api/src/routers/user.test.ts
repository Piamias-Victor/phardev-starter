import { describe, expect, it, vi } from "vitest";
import { NotFoundError } from "@repo/core";
import type { User } from "@repo/core";
import { router, createCallerFactory } from "../trpc.js";
import { userRouter } from "./user.js";
import type { Context } from "../context.js";

const authedCtx = (
  updateProfile: Context["services"]["updateProfile"],
): Context => ({
  session: {
    user: { id: "u1", email: "alice@example.com" },
    expires: "2099-01-01",
  },
  services: {
    getUserById: () => Promise.reject(new Error("reads go via RSC direct")),
    updateProfile,
  },
});

const appRouter = router({ user: userRouter });
const createCaller = createCallerFactory(appRouter);

const fakeUser: User = {
  id: "u1",
  email: "alice@example.com",
  name: "Alice",
  emailVerified: null,
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("user router", () => {
  it("updateProfile returns updated User", async () => {
    const updateProfile = vi
      .fn()
      .mockResolvedValue({ ...fakeUser, name: "Alice Updated" });
    const caller = createCaller(authedCtx(updateProfile));

    const result = await caller.user.updateProfile({ name: "Alice Updated" });

    expect(result.name).toBe("Alice Updated");
    expect(updateProfile).toHaveBeenCalledWith("u1", { name: "Alice Updated" });
  });

  it("updateProfile propagates NotFoundError as NOT_FOUND", async () => {
    const updateProfile = vi
      .fn()
      .mockRejectedValue(new NotFoundError("User u1 not found"));
    const caller = createCaller(authedCtx(updateProfile));

    await expect(
      caller.user.updateProfile({ name: "x" }),
    ).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });
});
