import { z } from "zod";
import { protectedProcedure, router } from "../trpc.js";

export const userRouter = router({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => ctx.services.getUserById(input.id)),
});
