import type { PrismaClient, User } from "@repo/db";
import { NotFoundError } from "../../errors/index.js";

export async function getUserById(
  prisma: PrismaClient,
  id: string,
): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new NotFoundError(`User ${id} not found`);
  return user;
}
