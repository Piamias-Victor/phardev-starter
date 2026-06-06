// Server Component — reads data directly (ADR-0003: RSC → Service direct).
// No tRPC call here; tRPC is for Client Components and mutations.
import Link from "next/link";
import { auth } from "@/auth";
import { getUserById } from "@repo/core";
import { prisma } from "@/lib/prisma";
import { HelloClient } from "@/components/hello-client";
import { AuthButton } from "@/components/auth-button";

export default async function HomePage() {
  // RSC read: call Service directly — no tRPC (ADR-0003)
  const session = await auth();
  const user = session?.user?.id
    ? await getUserById(prisma, session.user.id).catch(() => null)
    : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold">phardev-starter</h1>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs uppercase tracking-widest text-gray-400">
          RSC path (direct service call)
        </p>
        {user ? (
          <p className="text-lg">
            Welcome back, <strong>{user.name ?? user.email}</strong>
          </p>
        ) : (
          <p className="text-gray-500">Sign in to see your profile here.</p>
        )}
        {user && (
          <Link href="/profile" className="text-sm text-blue-600 underline">
            Edit profile →
          </Link>
        )}
      </div>

      <AuthButton />

      <HelloClient />
    </main>
  );
}
