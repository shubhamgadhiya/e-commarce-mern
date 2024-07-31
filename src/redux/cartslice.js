import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);

    },
    cartCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { addToCart, cartCount } = cartSlice.actions;
export default cartSlice.reducer;


export const fetchCartCount = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:4000/api/cartcount');
    dispatch(cartCount(response.data.data));
  } catch (error) {
    console.error('Error fetching cart count', error);
  }
};