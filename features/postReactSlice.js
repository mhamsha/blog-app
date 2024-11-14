import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postsReact: {
    postId: {
      likesCount: 0,
      dislikesCount: 0,
      comments: [],
    },
  },
};

const postReactSlice = createSlice({
  name: "postReact",
  initialState,
  reducers: {
    addReactionRed(state, action) {
      const { postId, likesCount, dislikesCount, comments } = action.payload;
      if (!state.postsReact[postId]) {
        state.postsReact[postId] = {
          likesCount: likesCount || 0,
          dislikesCount: dislikesCount || 0,
          comments: [],
        };
      }
      // console.log(comments)
      if (Array.isArray(comments)) {
        comments.forEach(processComment);
      } else {
        processComment(comments);
      }
      function processComment(comment) {
        state.postsReact[postId].comments.push({
          commentId: comment.$id || null,
          commentUserId: comment.userID || null,
          commentParentId: comment.parentID || null,
          commentNestNum: comment.nestNumber || null,
          commentText: comment.commentText || null,
          commentAuthor: comment.author || null,
          commentDate: comment.date || null,
          commentDocument: comment.documentId || null,
        });
      }
    },

    deleteCommentRed: (state, action) => {
      const { postId, commentId } = action.payload;
      const post = state.postsReact[postId];
      if (post) {
        post.comments = post.comments.filter(
          (comment) => comment.commentId !== commentId,
        );
      }
    },
    editCommentRed: (state, action) => {
      const { postId, commentId, commentText } = action.payload;
      const post = state.postsReact[postId];
      if (post) {
        const comment = post.comments.find(
          (comment) => comment.commentId === commentId,
        );
        if (comment) {
          comment.commentText = commentText;

        }
      }
    },
    likeIncrementRed: (state, action) => {
      const { postId } = action.payload;
      const post = state.postsReact[postId];
      if (post) {
        post.likesCount += 1;
      }
    },
    likeDecrementRed: (state, action) => {
      const { postId } = action.payload;
      const post = state.postsReact[postId];
      if (post) {
        post.likesCount -= 1;
      }
    },
    dislikeIncrementRed: (state, action) => {
      const { postId } = action.payload;
      const post = state.postsReact[postId];
      if (post) {
        post.dislikesCount += 1;
      }
    },
    dislikeDecrementRed: (state, action) => {
      const { postId } = action.payload;
      const post = state.postsReact[postId];
      if (post) {
        post.dislikesCount -= 1;
      }
    },
  },
});

// Selector functions
export const selectCommentsByPostId = (state, postId) =>
  state.postReact?.postsReact[postId]?.comments || [];
export const selectLikesCountByPostId = (state, postId) =>
  state.postReact.postsReact[postId]?.likesCount || 0;
export const selectDislikesCountByPostId = (state, postId) =>
  state.postReact.postsReact[postId]?.dislikesCount || 0;

export const {
  addReactionRed,
  editCommentRed,
  deleteCommentRed,
  likeIncrementRed,
  likeDecrementRed,
  dislikeIncrementRed,
  dislikeDecrementRed,
} = postReactSlice.actions;
export default postReactSlice.reducer;
