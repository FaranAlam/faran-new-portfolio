import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { User } from "next-auth";
import { verifyPassword } from "./lib/password";
import {
  getPrimaryAdmin,
  normalizeEmail,
} from "./lib/admin-auth";

/**
 * Admin Authentication Configuration
 * Using Credentials provider for email/password authentication
 * IMPORTANT: Set ADMIN_EMAIL and ADMIN_PASSWORD_HASH in .env.local
 */

// Extend the User type to include role
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user?: {
      id?: string;
      role?: string;
      email?: string;
      name?: string;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
    email?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const inputEmail = normalizeEmail(credentials?.email as string | undefined);
        const inputPassword = (credentials?.password as string | undefined) || "";

        if (!inputEmail || !inputPassword) {
          throw new Error("Invalid email or password");
        }

        // Prefer MongoDB admin account.
        let adminRecord = await getPrimaryAdmin();

        if (!adminRecord) {
          throw new Error("No admin account found. Please create the first admin from signup.");
        }

        if (inputEmail !== normalizeEmail(adminRecord.email)) {
          await new Promise(resolve => setTimeout(resolve, 100));
          throw new Error("Invalid email or password");
        }

        const isValidPassword = await verifyPassword(
          inputPassword,
          adminRecord.passwordHash
        );

        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        return {
          id: adminRecord._id.toString(),
          email: adminRecord.email,
          name: adminRecord.name || "Admin",
          role: "admin",
        } as User;
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },

    async signIn({ user }: { user?: User }) {
      return user?.role === "admin";
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
});
