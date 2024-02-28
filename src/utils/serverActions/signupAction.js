"use server";
import { connectToDataBase } from "../connect";
import User from "@/models/userModel";

export const signUpHere = async (userData) => {
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
