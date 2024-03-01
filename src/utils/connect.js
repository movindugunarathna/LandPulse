import mongoose from "mongoose";

let isConnected = false;

export const connectToDataBase = async () => {
    if (isConnected) {
        console.log("DB connected already");
        return;
    } else {
        mongoose.Promise = global.Promise;

        try {
            await mongoose.connect(process.env.DB_HOST);
            isConnected = true;
            console.log("DB connected successfully");
        } catch (error) {
            console.error("Error connecting to database:", error);
            throw new Error("Error connecting to database:", error.message);
        }
    }
};

export default mongoose.connection;
