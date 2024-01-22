import mongoose, { Connection } from "mongoose";
import bcrypt from "bcryptjs";

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

export const connectToDb = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState as number;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    // Handle the error (e.g., log it, throw it, etc.)
    console.error('Error hashing password:', error);
    throw error;
  }
}