import { afterEach, describe, expect, it } from "vitest";
import { getTestPrisma, cleanDatabase } from "../../test/prisma.js";
import { updateProfile } from "./updateProfile.js";
import { NotFoundError } from "../../errors/index.js";

const prisma = getTestPrisma();

afterEach(async () => {
  await cleanDatabase(prisma);
});

describe("updateProfile", () => {
  it("updates the user name and returns updated User", async () => {
    const created = await prisma.user.create({
      data: { email: "bob@example.com", name: "Bob" },
    });

    const updated = await updateProfile(prisma, created.id, { name: "Robert" });

    expect(updated.name).toBe("Robert");
    expect(updated.id).toBe(created.id);
  });

  it("throws NotFoundError when user does not exist", async () => {
    await expect(
      updateProfile(prisma, "no-such-id", { name: "Ghost" }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
