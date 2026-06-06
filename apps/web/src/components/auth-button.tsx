import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export async function AuthButton() {
  const session = await auth();

  if (session?.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{session.user.email}</span>
          <Button type="submit" variant="outline" size="sm">
            Sign out
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex gap-2">
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button type="submit" variant="outline" size="sm">
          Sign in with GitHub
        </Button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button type="submit" variant="outline" size="sm">
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}
