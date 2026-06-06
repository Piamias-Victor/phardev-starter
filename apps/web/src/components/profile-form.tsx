"use client";

import { useState } from "react";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";

interface ProfileFormProps {
  userId: string;
  currentName: string;
}

export function ProfileForm({ currentName }: ProfileFormProps) {
  const [name, setName] = useState(currentName);
  const [saved, setSaved] = useState(false);

  const mutation = trpc.user.updateProfile.useMutation({
    onSuccess: () => setSaved(true),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    mutation.mutate({ name });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Display name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </div>

      {mutation.error && (
        <p className="text-sm text-red-500">{mutation.error.message}</p>
      )}
      {saved && <p className="text-sm text-green-600">Saved!</p>}

      <Button type="submit" disabled={mutation.isPending} size="sm">
        {mutation.isPending ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
