"use server";
import { connectToDataBase } from "../../utils/connect";
import User from "@/models/userModel";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const authenticate = async (formData) => {
    try {
        await signIn("credentials", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
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
            profile: { _id: profile.id, ...profile },
        });

        const savedUser = await newUser.save();

        try {
            await signIn("credentials", {
                username,
                email,
                password,
                redirectTo: "/dashboard",
                redirect: false,
            });
        } catch (error) {
            console.log(error);
        }
        console.log("User successfully registered!");
        return {
            code: 200,
            message: "User successfully registered!",
            data: JSON.stringify(savedUser),
        };
    } catch (error) {
        console.log(error.message);
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
