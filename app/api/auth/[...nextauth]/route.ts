import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Admin Authentication Setup
 * Using Credentials provider for email/password authentication
 */

// Admin credentials (in production, use database)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "faran.bsce40@iiu.edu.pk";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@123secure";

const handler = NextAuth({
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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        // Check if credentials match admin
        if (
          credentials.email === ADMIN_EMAIL &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return {
            id: "1",
            email: ADMIN_EMAIL,
            name: "Admin",
            role: "admin",
          };
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },

  callbacks: {
    /**
     * JWT callback - runs when user logs in
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        token.email = user.email;
      }
      return token;
    },

    /**
     * Session callback - runs when session is accessed
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    /**
     * SignIn callback - authorization checks
     */
    async signIn({ user }) {
      // Allow only admin email
      if (user.email === ADMIN_EMAIL) {
        return true;
      }
      return false;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true, // For Vercel deployment
});

export { handler as GET, handler as POST };
