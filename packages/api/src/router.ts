import { router } from "./trpc.js";
import { userRouter } from "./routers/user.js";
import { helloRouter } from "./routers/hello.js";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
