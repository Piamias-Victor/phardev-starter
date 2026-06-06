import type { PrismaClient, User } from "@repo/db";
import type { UpdateProfileInput } from "@repo/validators";
import { NotFoundError } from "../../errors/index.js";

export async function updateProfile(
  prisma: PrismaClient,
  id: string,
  input: UpdateProfileInput,
): Promise<User> {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new NotFoundError(`User ${id} not found`);

  return prisma.user.update({ where: { id }, data: { name: input.name } });
}
