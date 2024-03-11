// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: { firstName: "", lastName: "", email: "", phoneNumber: "" },
    },
    reducers: {
        setUser: (state, action) => {
            const { user } = action.payload;
            return { ...state, ...user };
        },
    },
});

export const { setUser } = userSlice.actions;
// export const selectUserData = (state) => state.user.data;
export default userSlice.reducer;
