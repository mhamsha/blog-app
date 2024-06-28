import { createSlice } from "@reduxjs/toolkit";

 const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    status: false,
  },
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.status = true;
    },
    logout: (state) => {
      state.userData = null;
      state.status = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;