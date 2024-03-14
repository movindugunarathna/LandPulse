import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmailOrUsername } from "@/actions/userActions";
import { LoginSchema } from "@/lib/zodSchema/schema";
import { comparePasswords } from "@/utils/bcrypt";
import clientPromise from "@/utils/connect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const options = {
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/login",
    signOut: "/login",
    newUser: "/dashboard",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnCreate = nextUrl.pathname.endsWith("/create");
      const isOnLogin = nextUrl.pathname.endsWith("/login");
      if (isOnDashboard || isOnCreate) {
        return isLoggedIn ? true : false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isOnLogin) {
        return !isLoggedIn
          ? false
          : Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
    async session({ session, token }) {
      session.user = token.user;
      console.log("\n\nSession Method: \n", "session: ", session);
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
      }
      console.log("\n\nJWT Method: \n", "token: ", token);

      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: "Annabel",
        email: "example@example.com",
        password: "password",
      },
      async authorize(credentials) {
        let userDetails = null;

        const parsedCredentials = LoginSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, username, password } = parsedCredentials.data;
          const userByEmail = await getUserByEmailOrUsername(email);
          const userByUsername = await getUserByEmailOrUsername(username);

          if (!userByEmail && !userByUsername) {
            throw new Error(
              JSON.stringify({
                error: "User does not exist",
                status: false,
              })
            );
          } else {
            try {
              userDetails = userByEmail || userByUsername;

              const isMatch = await comparePasswords(
                password,
                userDetails.password
              );

              if (isMatch) {
                return {
                  id: userDetails._id,
                  username: userDetails.username,
                  email: userDetails.email,
                  userDetails: JSON.stringify(userDetails),
                };
              }
            } catch (error) {
              console.error(error.message);
              throw new Error(
                JSON.stringify({
                  error: error.message,
                  status: false,
                })
              );
            }
          }
        }
        console.log("Invalid credentials");
        throw new Error(
          JSON.stringify({
            error: "Invalid credentials",
            status: false,
          })
        );
      },
    }),
  ],
};
