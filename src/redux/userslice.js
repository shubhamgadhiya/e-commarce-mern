import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
    name: "user",
    initialState: {
        user: {},
        isAuth: false,
    
    },
    reducers:{
        addUser: (state, action) => {
            return {
                ...state,
                user: action.payload,
                isAuth: true,
            }
        },
        logOut: (state, action) => {
            return {
                ...state,
                user: {},
                isAuth: false,
            }
        }
    }
});

export const {addUser, logOut} = userslice.actions;
export default userslice.reducer;
