"use server";
import NextAuth from "next-auth";
import { authConfig } from "./utils/auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginUpSchema } from "./lib/zodSchema/schema";
import { getUserByEmailOrUsername } from "./lib/serverActions/userActions";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "credentials",
            credentials: {
                username: {},
                email: {},
                password: {},
            },
            async authorize(credentials) {
                console.log("authorization: " + credentials);
                const parsedCredentials = LoginUpSchema.safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, username, password } =
                        parsedCredentials.data;
                    const userByEmail = await getUserByEmailOrUsername(email);
                    const userByUsername =
                        await getUserByEmailOrUsername(username);

                    if (!userByEmail && !userByUsername) return null;
                    else {
                        const user = userByEmail || userByUsername;
                        await user.comparePassword(
                            password,
                            (matchError, isMatch) => {
                                if (matchError) return null;
                                else if (!isMatch) return null;
                                else return null;
                            }
                        );
                    }
                }
                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
