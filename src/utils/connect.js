import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToDataBase = async () => {
    if (isConnected) {
        console.log("DB connected already");
        return;
    } else {
        mongoose.Promise = global.Promise;
        const URL = "mongodb://0.0.0.0:27017/LandPulse";
        try {
            await mongoose.connect(URL);
            isConnected = true;
            console.log("DB connected successfully");
        } catch (error) {
            console.error("Error connecting to database:", error);
        }
    }
};
