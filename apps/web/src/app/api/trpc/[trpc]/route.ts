import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@repo/api/router";
import type { Context } from "@repo/api";

function createContext(): Context {
  // Auth + services wired here in ticket #10 (NextAuth + PrismaClient binding).
  // For now: no session, no real services (hello router needs neither).
  return {
    session: null,
    services: {
      getUserById: () => Promise.reject(new Error("not yet wired")),
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
