"use server";
import UserModel from "@/models/userModel";
import User from "@/models/userModel";
import { hashPassword } from "@/utils/bcrypt";
import { getAdvertisementByUserId } from "./adActions";

export const signUp = async (userData) => {
    try {
        const { username, email, contact, password, address, profile } =
            userData;

        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            console.log("Username or email already exists");
            return { code: 503, message: "Username or email already exists" };
        }

        const encryptPsswrd = await hashPassword(password);

        const newUser = await User.create({
            username,
            contact,
            password: encryptPsswrd,
            email,
            address,
            profile: profile || null,
        });
        console.log(encryptPsswrd, newUser);

        console.log("User successfully registered!");
        return {
            code: 200,
            message: "User successfully registered!",
            data: JSON.stringify(newUser),
        };
    } catch (error) {
        console.error(error);
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

export async function getUserByID(id) {
    try {
        const user = await UserModel.findOne({ email: id });
        user.posts = await getAdvertisementByUserId(id);

        return JSON.stringify(user);
    } catch (error) {
        console.error("Error while fetching user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export async function getUserContactsById(id) {
    try {
        const contacts = await UserModel.getContactsById(id);
        return {
            contact: contacts.contact,
            email: contacts.email,
        };
    } catch (error) {
        console.error("Error while fetching user:", error);
        throw new Error("Failed to fetch user.");
    }
}
