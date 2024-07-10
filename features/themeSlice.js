import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDarkMode:
    localStorage.getItem("isDarkMode") != undefined
      ? JSON.parse(localStorage.getItem("isDarkMode"))
      : false, //light mode is the default
};
export const themeSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
    },
  },
});
export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
