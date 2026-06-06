import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@phardev/db/client";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
import { findUserByEmail } from "@phardev/db/repositories";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await findUserByEmail(email);

          if (!user) return null;

          // Hash verification avec argon2 — implémenté au démarrage du projet dérivé
          // const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
          // if (passwordsMatch) return user;

          // Temporaire pour le développement
          if (user.passwordHash === password) return user;
        }

        return null;
      },
    }),
  ],
});