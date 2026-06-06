"use client";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";

export function HelloClient() {
  const { data, isLoading, refetch } = trpc.hello.greet.useQuery();

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
      <p className="text-sm text-gray-500">tRPC Client Component</p>
      {isLoading ? (
        <p className="text-gray-400">Loading…</p>
      ) : (
        <p className="font-semibold">{data?.message}</p>
      )}
      <Button variant="outline" size="sm" onClick={() => void refetch()}>
        Refetch
      </Button>
    </div>
  );
}
