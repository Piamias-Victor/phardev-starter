import { initTRPC, TRPCError } from "@trpc/server";
import { NotFoundError, ForbiddenError, ConflictError } from "@repo/core";
import type { Context } from "./context.js";

const t = initTRPC.context<Context>().create();

/**
 * Maps Domain Errors from @repo/core to TRPCError codes (ADR-0001).
 * A Service throws NotFoundError/ForbiddenError/ConflictError;
 * this middleware translates them so the transport layer never leaks
 * domain internals to the client.
 */
const domainErrorMiddleware = t.middleware(async ({ next }) => {
  const result = await next();
  if (!result.ok) {
    const err = result.error.cause;
    if (err instanceof NotFoundError) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: err.message,
        cause: err,
      });
    }
    if (err instanceof ForbiddenError) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: err.message,
        cause: err,
      });
    }
    if (err instanceof ConflictError) {
      throw new TRPCError({
        code: "CONFLICT",
        message: err.message,
        cause: err,
      });
    }
  }
  return result;
});

export const publicProcedure = t.procedure.use(domainErrorMiddleware);

export const protectedProcedure = t.procedure
  .use(domainErrorMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({ ctx: { ...ctx, session: ctx.session } });
  });

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
