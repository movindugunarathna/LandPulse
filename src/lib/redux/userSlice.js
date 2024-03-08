// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: { firstName: "", lastName: "", email: "", phoneNumber: "" },
    },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
        },
        // Add other reducers as needed
        // logOut: (state) => {
        //   state.data = { name: "", email: "", phoneNumber: "" };
        // },
    },
});

export const { setUser } = userSlice.actions;
// export const selectUserData = (state) => state.user.data;
export default userSlice.reducer;
