import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    status: false,
    // otpStatus: false,
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
    // otpCheck: (state,action) => {
    //   state.otpStatus = action.payload;
    // },
  },
});

export const getUserStatus = (state) => state.auth.status;
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
