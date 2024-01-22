import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb, hashPassword } from "./utils";
import { signIn, signOut } from 'next-auth/react';
import { AdData, UserData } from "@/types";

export const addPost = async (prevState: any, adData: AdData) => {
  const { title, desc, userId } = adData;

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (adData: AdData) => {
  const { adId } = adData;

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState: any, userData: UserData) => {
  const { username, email, password } = userData;

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (userData: UserData) => {
  const { userId } = userData;

  try {
    connectToDb();

    await Post.deleteMany({ userId });
    await User.findByIdAndDelete(userId);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState: any, userData: UserData) => {
  const { username, email, number, password, passwordRepeat } = userData;

  try {
    if (!password || password?.replace(' ', '')==='' || passwordRepeat?.replace(' ', '')==='') {
      return { error: "Required spaces can't be empty" };
    }
    else if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }
    else {
      
      connectToDb();
  
      const user = await User.findOne({ username });
  
      if (user) {
        return { error: "Username already exists" };
      }
  
      const hashedPassword = await hashPassword(password);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        img,
      });
  
      await newUser.save();
      console.log("saved to db");
  
      return { success: true };
    }
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState: any, userData: UserData) => {
  const { username, password } = userData;

  try {
    await signIn("credentials", { username, password });
  } catch (err:any) {
    console.log(err);

    if (err instanceof Error && "message" in err && err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }    
    throw err;
  }
};

