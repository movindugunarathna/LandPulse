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
                    console.log("A user found");

                    if (!userByEmail && !userByUsername) return null;
                    else {
                        const user = userByEmail || userByUsername;

                        const passwordCheck = await new Promise(
                            (resolve, reject) => {
                                user.comparePassword(
                                    password,
                                    (matchError, isMatch) => {
                                        console.log("isMatch", isMatch);
                                        if (matchError) reject(matchError);
                                        else if (!isMatch)
                                            reject("Password does not match");
                                        else resolve(user);
                                    }
                                );
                            }
                        ).catch((error) => {
                            console.error("Error comparing password:", error);
                            return null;
                        });

                        return passwordCheck;
                    }
                }
                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
