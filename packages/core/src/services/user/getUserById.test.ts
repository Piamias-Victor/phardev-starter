import { afterEach, describe, expect, it } from "vitest";
import { getTestPrisma, cleanDatabase } from "../../test/prisma.js";
import { getUserById } from "./getUserById.js";
import { NotFoundError } from "../../errors/index.js";

const prisma = getTestPrisma();

afterEach(async () => {
  await cleanDatabase(prisma);
});

describe("getUserById", () => {
  it("returns the User when found", async () => {
    const created = await prisma.user.create({
      data: { email: "alice@example.com", name: "Alice" },
    });

    const user = await getUserById(prisma, created.id);

    expect(user.id).toBe(created.id);
    expect(user.email).toBe("alice@example.com");
  });

  it("throws NotFoundError when User does not exist", async () => {
    await expect(getUserById(prisma, "nonexistent-id")).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
