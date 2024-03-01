"use server";
import NextAuth from "next-auth";
import { authConfig } from "./utils/auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/zodSchema/schema";
import { getUserByEmailOrUsername } from "./lib/serverActions/userActions";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
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
                    const { email, username, password } =
                        parsedCredentials.data;
                    const userByEmail = await getUserByEmailOrUsername(email);
                    const userByUsername =
                        await getUserByEmailOrUsername(username);

                    if (!userByEmail && !userByUsername) return null;
                    else {
                        try {
                            userDetails = userByEmail || userByUsername;

                            const isMatch = await bcrypt.compare(
                                password,
                                userDetails.password
                            );

                            isMatch ? userDetails : null;
                            return userDetails?._id;
                        } catch (error) {
                            console.error(error.message);
                            return null;
                        }
                    }
                }
                console.log("Invalid credentials");
                return userDetails?._id;
            },
        }),
    ],
});
