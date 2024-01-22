import { NextAuthOptions, NextAuthCallback, NextAuthJwtCallback } from "next-auth";

interface AuthConfigCallbacks {
  jwt: NextAuthJwtCallback;
  session: NextAuthCallback;
  authorized: ({ auth, request }: { auth: any; request: any }) => boolean | Promise<boolean>;
}

interface AuthConfig {
  pages: {
    signIn: string;
  };
  providers: any[]; // You might want to replace 'any' with the actual type
  callbacks: AuthConfigCallbacks;
}

export const authConfig: AuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
      if (isOnBlogPage && !user) {
        return false;
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && user) {
        return false; // Assuming you want to prevent authenticated users from accessing the login page
      }

      return true;
    },
  },
};

export default authConfig;
