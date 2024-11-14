/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "reselect";
import { InputComp } from "../components/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCommentRed } from "../features/postReactSlice";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { addReactionRed } from "../features/postReactSlice";

function CommentComp({ onDeleteComment }) {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const commentSelector = (state) =>
    state.postReact?.postsReact[slug]?.comments;
  const commentInfoSelector = createSelector(
    [commentSelector],
    (commentStore) => ({
      comments: commentStore,
    }),
  );
  const { comments } = useSelector(commentInfoSelector);

  const userData = useSelector((state) => state.auth.userData);

  const [editCommentId, setEditCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEdit = (commentId, commentText) => {
    setEditCommentId(commentId);
    setEditedText(commentText);
  };
  const handleUpdate = async (commentId) => {
    await appwriteConfigService.updateEntity("comment", commentId, {
      commentText: editedText,
    });
    dispatch(
      editCommentRed({
        postId: slug,
        commentId,
        commentText: editedText,
      }),
    );

    setEditCommentId(null);
  };

  const handleCancel = () => {
    setEditCommentId(null);
  };

  // * nested comments
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const handleReplySubmit = async (comment, nestNum) => {
    const isCreated = await appwriteConfigService.createEntity("comment", {
      documentID: slug,
      userID: userData.$id,
      commentText: replyText,
      parentID: comment.commentId,
      author: userData.name,
      date: new Date().toLocaleDateString("en-GB"),
      nestNumber: nestNum == null ? 1 : nestNum + 1,
    });
    if (isCreated) {
      dispatch(addReactionRed({ postId: slug, comments: { ...isCreated } }));
    }

    setReplyingTo(null);
    setReplyText("");
  };

  function renderNestedComments(comments, comment) {
    const filteredComments = [...comments]
      .reverse()
      .filter(
        (nestComment) => nestComment.commentParentId === comment.commentId,
      )
      .sort((a, b) => a.commentNestNum - b.commentNestNum);

    return filteredComments.map((filterNestComment, index) => (
      <div key={`parentComment-${index}-${comment.commentId}`}>
        {" "}
        <div
          style={{
            marginLeft: `${filterNestComment.commentNestNum * 40}px`,
          }}
          className={`my-2 flex flex-col bg-gray-100 dark:bg-gray-800 dark:text-white md:flex-row`}
        >
          <div className="m-2 flex-1 rounded-lg border border-gray-300 px-4 py-2 leading-relaxed dark:border-gray-700 sm:px-6 sm:py-4">
            <strong className="text-gray-400">
              {filterNestComment.commentAuthor}
            </strong>{" "}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {filterNestComment.commentDate}
            </span>
            {editCommentId === filterNestComment.commentId ? (
              <div>
                <InputComp
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleUpdate(filterNestComment.commentId)}
                    className="rounded bg-blue-500 px-2 py-1 text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCancel}
                    className="rounded bg-gray-500 px-2 py-1 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {filterNestComment.commentText}
              </p>
            )}
            {replyingTo === filterNestComment.commentId && (
              <div>
                <InputComp
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  className="rounded bg-blue-500 px-2 py-1 text-white"
                  onClick={() =>
                    handleReplySubmit(
                      filterNestComment,
                      filterNestComment.commentNestNum,
                    )
                  }
                >
                  Submit
                </button>
              </div>
            )}
            <div className="mt-4 flex flex-wrap justify-end space-x-2">
              <button
                onClick={() => setReplyingTo(filterNestComment.commentId)}
                className="rounded bg-blue-400 px-2 py-1 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Reply
              </button>
              {/* {userData.$id !== filterNestComment?.commentUserId ? (
                <button className="rounded bg-green-400 px-2 py-1 text-white hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700">
                  Like
                </button>
              ) : null} */}
              {userData.$id === filterNestComment?.commentUserId ? (
                <span className="flex gap-2">
                  <button
                    onClick={() =>
                      handleEdit(
                        filterNestComment.commentId,
                        filterNestComment.commentText,
                      )
                    }
                    className="rounded bg-yellow-400 px-2 py-1 text-white hover:bg-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteComment(filterNestComment.commentId)}
                    className="rounded bg-red-400 px-2 py-1 text-white hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Delete
                  </button>
                </span>
              ) : null}
            </div>
          </div>
        </div>
        {renderNestedComments(comments, filterNestComment)}
      </div>
    ));
  }

  return (
    comments && (
      <>
        {[...comments].reverse().map((comment, index) => {
          if (comment.commentParentId === null) {
            return (
              <div key={`parentComment-${index}-${comment.commentId}`}>
                <div className="my-2 ml-[20px] flex flex-col bg-gray-100 dark:bg-gray-800 dark:text-white md:flex-row">
                  <div className="m-2 flex-1 rounded-lg border border-gray-300 px-4 py-2 leading-relaxed dark:border-gray-700 sm:px-6 sm:py-4">
                    <strong className="text-gray-400">
                      {comment.commentAuthor}
                    </strong>{" "}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.commentDate}
                    </span>
                    {editCommentId === comment.commentId ? (
                      <div>
                        <InputComp
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                        />
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => handleUpdate(comment.commentId)}
                            className="rounded bg-blue-500 px-2 py-1 text-white"
                          >
                            Update
                          </button>
                          <button
                            onClick={handleCancel}
                            className="rounded bg-gray-500 px-2 py-1 text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {comment.commentText}
                      </p>
                    )}
                    {replyingTo === comment.commentId && (
                      <div>
                        <InputComp
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                          className="rounded bg-blue-500 px-2 py-1 text-white"
                          onClick={() =>
                            handleReplySubmit(comment, comment.nestNumber)
                          }
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap justify-end space-x-2">
                      <button
                        onClick={() => setReplyingTo(comment.commentId)}
                        className="rounded bg-blue-400 px-2 py-1 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Reply
                      </button>
                      {/* {userData.$id !== comment?.commentUserId ? (
                        <button className="rounded bg-green-400 px-2 py-1 text-white hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700">
                          Like
                        </button>
                      ) : null} */}
                      {userData.$id === comment?.commentUserId ? (
                        <span className="flex gap-2">
                          <button
                            onClick={() =>
                              handleEdit(comment.commentId, comment.commentText)
                            }
                            className="rounded bg-yellow-400 px-2 py-1 text-white hover:bg-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteComment(comment.commentId)}
                            className="rounded bg-red-400 px-2 py-1 text-white hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                {renderNestedComments(comments, comment)}
              </div>
            );
          }
        })}
      </>
    )
  );
}

export default CommentComp;
