import { cache } from 'react'
import { prisma } from '@phardev/db/client'

export const createTRPCContext = cache(async (opts?: { headers?: Headers }) => {
  return {
    db: prisma,
    session: null as null | { user: { id: string; role: string } },
    headers: opts?.headers ?? new Headers(),
  }
})

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>