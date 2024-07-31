import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import userReducer from "./userslice";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
    }
})