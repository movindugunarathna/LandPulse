import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adSlice from "./adSlice";

export const reduxStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            ad: adSlice,
        },
    });
};
