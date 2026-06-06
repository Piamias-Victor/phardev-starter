import { createTRPCRouter, publicProcedure } from "./trpc";

export const requireAuth = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new Error("UNAUTHORIZED"); // Should be TRPCError, but for now, a generic Error
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export { createTRPCRouter };