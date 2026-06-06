import { publicProcedure, router } from "../trpc.js";

export const helloRouter = router({
  greet: publicProcedure.query(() => ({
    message: "Hello from tRPC!",
  })),
});
