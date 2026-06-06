import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@repo/api/router";
import { getUserById, updateProfile } from "@repo/core";
import { PrismaClient } from "@repo/db";
import { auth } from "@/auth";
import type { Context } from "@repo/api";

const prisma = new PrismaClient();

async function createContext(): Promise<Context> {
  const session = await auth();

  return {
    // NextAuth Session shape -> tRPC Context Session shape
    session: session?.user?.id
      ? {
          user: {
            id: session.user.id,
            email: session.user.email ?? "",
            name: session.user.name,
          },
          expires: session.expires,
        }
      : null,
    services: {
      // Services pre-bound with prisma (ADR-0001: no Prisma in @repo/api)
      getUserById: (id: string) => getUserById(prisma, id),
      updateProfile: (id: string, input) => updateProfile(prisma, id, input),
    },
  };
}

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
