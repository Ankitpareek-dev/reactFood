import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: ["burger", "pizza"],
  },
  reducers: {
    addItem: () => {
      state.items.push(action.payload);
    },
    removeItem: () => {
      state.items.pop;
    },
    clearCart: () => {
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
