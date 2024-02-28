"use server";
import { connectToDataBase } from "../../utils/connect";
import User from "@/models/userModel";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export const authenticate = async (formData) => {
    try {
        await signIn("credentials", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            redirectTo: "/dashboard",
            redirect: true,
        });
    } catch (error) {
        if (isRedirectError(error)) {
            return {
                code: 200,
                message: "Redirect to dashboard",
            };
        }

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        code: 401,
                        message: "Invalid credentials.",
                    };
                default:
                    return {
                        code: 500,
                        message: "Something went wrong.",
                    };
            }
        }
        return {
            code: 500,
            message: error.message,
        };
    }
};

export const signUp = async (userData) => {
    try {
        await connectToDataBase();

        const { username, email, contact, password, address, profile } =
            userData;

        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            console.log("Username or email already exists");
            return { code: 503, message: "Username or email already exists" };
        }

        const newUser = new User({
            username,
            contact,
            password,
            email,
            address,
            profile: profile || null,
        });

        const savedUser = await newUser.save();

        try {
            await signIn("credentials", {
                username,
                email,
                password,
                redirectTo: "/dashboard",
                redirect: true,
            });
        } catch (error) {
            if (isRedirectError(error)) {
                return {
                    code: 200,
                    message: "Redirect to dashboard",
                    data: JSON.stringify(savedUser),
                };
            }

            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return {
                            code: 401,
                            message: "Invalid credentials.",
                        };
                    default:
                        return {
                            code: 500,
                            message: "Something went wrong.",
                        };
                }
            }
            return {
                code: 500,
                message: error.message,
            };
        }
        console.log("User successfully registered!");
        return {
            code: 200,
            message: "User successfully registered!",
            data: JSON.stringify(savedUser),
        };
    } catch (error) {
        console.error(error.message);
        return { code: 500, message: error.message };
    }
};

export async function getUserByEmailOrUsername(identifier) {
    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });
        return user;
    } catch (error) {
        console.error("Error while fetching user:", error);
        throw new Error("Failed to fetch user.");
    }
}
