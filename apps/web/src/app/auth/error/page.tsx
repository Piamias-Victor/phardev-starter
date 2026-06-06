import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

const errorMessages: Record<string, string> = {
  Configuration: "Server configuration error. Check the server logs.",
  AccessDenied: "Access denied.",
  Verification: "Verification link is invalid or has expired.",
  Default: "An error occurred during sign in.",
};

export default async function AuthErrorPage({ searchParams }: Props) {
  const { error = "Default" } = await searchParams;
  const message = errorMessages[error] ?? errorMessages["Default"]!;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold text-red-600">Sign in error</h1>
      <p className="text-gray-600">{message}</p>
      <Button asChild variant="outline">
        <Link href="/">Go home</Link>
      </Button>
    </main>
  );
}
