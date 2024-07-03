import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status: false,
  },
  reducers: {
    allPostsRed: (state, action) => {
      state.posts = action.payload.posts;
      state.status = action.payload.status;
    },
    
  },
});

export const { allPostsRed } = postSlice.actions;
export default postSlice.reducer;
