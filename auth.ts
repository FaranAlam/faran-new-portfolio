import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { User } from "next-auth";
import { verifyPassword } from "./lib/password";

/**
 * Admin Authentication Configuration
 * Using Credentials provider for email/password authentication
 * IMPORTANT: Set ADMIN_EMAIL and ADMIN_PASSWORD_HASH in .env.local
 */

const getAdminCredentials = () => {
  return {
    email: process.env.ADMIN_EMAIL,
    passwordHash: process.env.ADMIN_PASSWORD_HASH,
  };
};

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
        const { email: adminEmail, passwordHash: adminPasswordHash } = getAdminCredentials();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        // Check if credentials are configured
        if (!adminEmail || !adminPasswordHash) {
          throw new Error("Admin credentials not configured");
        }

        // Check if email matches
        if (credentials.email !== adminEmail) {
          // Add small delay to prevent timing attacks
          await new Promise(resolve => setTimeout(resolve, 100));
          throw new Error("Invalid email or password");
        }

        // Verify password using bcrypt
        const isValidPassword = await verifyPassword(
          credentials.password as string,
          adminPasswordHash
        );

        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        return {
          id: "1",
          email: adminEmail,
          name: "Admin",
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
      }
      return session;
    },

    async signIn({ user }: { user?: User }) {
      // Allow only admin email
      if (user?.email === process.env.ADMIN_EMAIL) {
        return true;
      }
      return false;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days (reduced from 30 for security)
    updateAge: 24 * 60 * 60, // 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
