import { PrismaClient } from "@repo/db";

// Singleton PrismaClient for tests — DATABASE_URL set by global-setup.ts
// (Testcontainers ephemeral Postgres).
let client: PrismaClient | undefined;

export function getTestPrisma(): PrismaClient {
  if (!client) {
    client = new PrismaClient({
      datasourceUrl: process.env["DATABASE_URL"],
    });
  }
  return client;
}

export async function cleanDatabase(prisma: PrismaClient): Promise<void> {
  // Delete in FK-safe order
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
}
