import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@repo/db";

// Single PrismaClient instance for auth (database sessions — ADR-0002)
const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  // trustHost required in local dev and behind reverse proxies (nextauth v5)
  trustHost: true,
  providers: [
    GitHub({
      clientId: process.env["AUTH_GITHUB_ID"]!,
      clientSecret: process.env["AUTH_GITHUB_SECRET"]!,
    }),
    Google({
      clientId: process.env["AUTH_GOOGLE_ID"]!,
      clientSecret: process.env["AUTH_GOOGLE_SECRET"]!,
    }),
  ],
  // No Credentials provider — OAuth only (ADR-0002)
  callbacks: {
    session({ session, user }) {
      // Expose user.id so tRPC context can use it
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
  pages: {
    // Custom error page avoids the built-in one which crashes on Next.js 15
    error: "/auth/error",
  },
});
