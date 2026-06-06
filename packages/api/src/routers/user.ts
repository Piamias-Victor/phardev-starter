import { updateProfileSchema } from "@repo/validators";
import { protectedProcedure, router } from "../trpc.js";

// Reads go RSC → Service direct (ADR-0003). This router contains mutations only.
export const userRouter = router({
  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(({ ctx, input }) =>
      ctx.services.updateProfile(ctx.session.user.id, input),
    ),
});
