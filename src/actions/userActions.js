"use server";
import User from "@/models/userModel";
import { hashPassword } from "@/utils/bcrypt";

export const signUp = async (userData) => {
  try {
    const { username, email, contact, password, address, profile } = userData;

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

    return JSON.stringify(user);
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserById(id) {
  try {
    const user = await User.findOne(id).select("-password");
    return user;
  } catch (error) {
    console.error("Error while fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
}
