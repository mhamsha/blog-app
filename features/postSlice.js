import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status: false,
    userPosts: [],
    userPostsStatus: false,
    currentPost: null,
  },
  reducers: {
    allPostsRed: (state, action) => {
      state.posts = action.payload.posts;
      state.status = action.payload.status;
    },
    userPostsRed: (state, action) => {
      state.userPosts = action.payload.userPosts;
      state.userPostsStatus = action.payload.userPostsStatus;
    },
    deletePostRed: (state, action) => {
      state.posts = state.posts.filter((post) => post.$id !== action.payload);
      state.userPosts = state.userPosts.filter((post) => post.$id !== action.payload);
    },
    editPostRed: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.$id === action.payload.$id ? action.payload : post
      );
      state.userPosts = state.userPosts.map((post) =>
        post.$id === action.payload.$id ? action.payload : post
      );
      state.currentPost = state.posts.find((post) => post.$id === action.payload.$id) || null;
    },
    currentPostRed: (state, action) => {
      state.currentPost = action.payload;
    },
    logoutPostRed: (state) => {
      state.posts = [];
      state.status = false;
      state.userPosts = [];
      state.userPostsStatus = false;
      state.currentPost = null;
    },
  },
});

export const { allPostsRed, userPostsRed, deletePostRed, editPostRed, currentPostRed,logoutPostRed } =
  postSlice.actions;
export default postSlice.reducer;
