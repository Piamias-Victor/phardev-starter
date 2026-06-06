// RSC → Service direct (ADR-0003). No tRPC call for reads.
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserById } from "@repo/core";
import { PrismaClient } from "@repo/db";
import { ProfileForm } from "@/components/profile-form";

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const user = await getUserById(prisma, session.user.id);

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>
      <p className="mb-2 text-sm text-gray-500">{user.email}</p>
      <ProfileForm userId={user.id} currentName={user.name ?? ""} />
    </main>
  );
}
