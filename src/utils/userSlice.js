import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => (state = action.payload),
    removeUser: () => null,
  },
});
export const { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
