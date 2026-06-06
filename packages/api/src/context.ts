import type { User } from "@repo/core";

/**
 * Services injected into every tRPC context (ADR-0001: no Prisma in @repo/api).
 * Each service is pre-bound with its PrismaClient by the caller (Next.js route
 * handler), so @repo/api never imports Prisma.
 */
export type Services = {
  getUserById: (id: string) => Promise<User>;
};

export type Session = {
  user: { id: string; email: string; name?: string | null };
  expires: string;
};

/** tRPC context created per-request by the Next.js route handler. */
export type Context = {
  session: Session | null;
  services: Services;
};
