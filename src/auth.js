"use server";
import NextAuth from "next-auth";
import { authConfig } from "./utils/auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/zodSchema/schema";
import { getUserByEmailOrUsername } from "./lib/serverActions/userActions";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {},
                email: {},
                password: {},
            },
            async authorize(credentials) {
                console.log("authorization: " + credentials);
                let userDetails = null;

                const parsedCredentials = LoginSchema.safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, username, password } =
                        parsedCredentials.data;
                    const userByEmail = await getUserByEmailOrUsername(email);
                    const userByUsername =
                        await getUserByEmailOrUsername(username);
                    console.log("A user found");

                    if (!userByEmail && !userByUsername) return null;
                    else {
                        try {
                            userDetails = userByEmail || userByUsername;

                            const isMatch = await bcrypt.compare(
                                password,
                                userDetails.password
                            );

                            isMatch ? userDetails : null;
                            return userDetails;
                        } catch (error) {
                            console.log(error.message);
                            return null;
                        }
                    }
                }
                console.log("Invalid credentials");
                return userDetails;
            },
        }),
    ],
});
