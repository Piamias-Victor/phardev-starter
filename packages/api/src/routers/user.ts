import { z } from "zod";
import { updateProfileSchema } from "@repo/validators";
import { protectedProcedure, router } from "../trpc.js";

export const userRouter = router({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => ctx.services.getUserById(input.id)),

  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(({ ctx, input }) =>
      ctx.services.updateProfile(ctx.session.user.id, input),
    ),
});
