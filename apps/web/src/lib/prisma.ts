import { PrismaClient } from "@repo/db";

// Singleton PrismaClient for apps/web — shared by auth, tRPC route handler,
// and RSC pages. Prevents connection pool exhaustion from multiple instances.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env["NODE_ENV"] !== "production") globalForPrisma.prisma = prisma;
