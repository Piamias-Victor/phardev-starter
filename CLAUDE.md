## Architecture & boundaries

### Reference pattern — profile feature (`apps/web/src/app/profile/`, `@repo/core/src/services/user/`)

Every feature follows this shape:

**Read (RSC → Service direct, ADR-0003)**

```ts
// app/some-feature/page.tsx (Server Component)
import { getSomething } from "@repo/core";
const data = await getSomething(prisma, id);
```

**Write (tRPC mutation, Client Component)**

```ts
// components/some-form.tsx
"use client";
const mutation = trpc.someFeature.doSomething.useMutation();
```

**Service (business logic, @repo/core)**

```ts
// packages/core/src/services/feature/doSomething.ts
export async function doSomething(
  prisma: PrismaClient,
  id: string,
  input: SomeInput,
): Promise<SomeType> {
  const record = await prisma.model.findUnique({ where: { id } });
  if (!record) throw new NotFoundError(`... not found`);
  return prisma.model.update({ where: { id }, data: input });
}
```

**Router (transport only, @repo/api)**

```ts
// packages/api/src/routers/feature.ts
doSomething: protectedProcedure
  .input(someSchema) // schema from @repo/validators
  .mutation(({ ctx, input }) =>
    ctx.services.doSomething(ctx.session.user.id, input),
  );
```

**Rules for agents:**

- Prisma only in `@repo/core` services — never in routers or pages (ADR-0001)
- RSC reads: call service directly, no tRPC (ADR-0003)
- Client Component writes: always via `trpc.*.useMutation()`
- Every exported service must have an integration test against Postgres (Testcontainers)
- Validators (Zod schemas) live in `@repo/validators`, shared by router `.input()` and form validation

## Agent skills

### Issue tracker

Issues are tracked in this repo's GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default canonical labels (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
