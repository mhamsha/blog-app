import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addReactionRed, deleteCommentRed } from "../features/postReactSlice";

import { CommentComp } from "../components/index";
import { InputComp, ButtonComp } from "../components/index";
import appwriteConfigService from "../appwrite/appwriteConfig";

function CommentPg() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, reset } = useForm({});
  let parentIdVar = null;
  let nestNumVar = null;

  const createComment = async (data) => {
    reset();
    const isCreated = await appwriteConfigService.createEntity("comment", {
      userID: userData.$id,
      author: userData.name,
      commentText: data.comment,
      documentID: slug,
      date: new Date().toLocaleDateString("en-GB"),
      parentID: parentIdVar,
      nestNumVar: nestNumVar,
    });
    // console.log(isCreated);
    if (isCreated) {
      dispatch(addReactionRed({ postId: slug, comments: { ...isCreated } }));
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      const isDeleted = await appwriteConfigService.deleteEntity(
        "comment",
        commentId,
      );
      if (isDeleted) {
        dispatch(deleteCommentRed({ postId: slug, commentId }));
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-md bg-slate-50 px-2 py-2 dark:bg-transparent dark:text-white">
        <h3 className="-mt-0 mb-4 text-lg font-semibold text-gray-900">
          Comments
        </h3>
        <form onSubmit={handleSubmit(createComment)}>
          <InputComp
            label="Comment"
            name="comment"
            {...register("comment")}
            required
          />
          <ButtonComp type="submit" className="mt-3 w-12">
            Submit
          </ButtonComp>
        </form>

        <CommentComp
          onDeleteComment={handleDeleteComment}
          // onUpdateComment={handleUpdateComment}
        />
      </div>
    </>
  );
}

export default CommentPg;
