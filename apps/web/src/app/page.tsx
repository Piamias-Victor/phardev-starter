// Server Component — reads data directly (ADR-0003: RSC → Service direct).
// No tRPC call here; tRPC is for Client Components and mutations.
import { HelloClient } from "@/components/hello-client";
import { AuthButton } from "@/components/auth-button";

export default function HomePage() {
  // RSC path: in a real feature this would call a Service from @repo/core.
  // Today: static greeting to prove the RSC→direct pattern is in place.
  const serverMessage = "Hello from the server (RSC)";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold">phardev-starter</h1>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs uppercase tracking-widest text-gray-400">
          RSC path (direct)
        </p>
        <p className="text-lg">{serverMessage}</p>
      </div>

      <AuthButton />

      <HelloClient />
    </main>
  );
}
