import { ContainerComp, PostFormComp } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

function EditPost() {
  const { slug } = useParams();
  const isAllPostsStore = (state) => state.post.posts;
  const postInfoSelector = createSelector([isAllPostsStore], (posts) => ({
    allPostsStore: posts,
  }));
  const { allPostsStore } = useSelector(postInfoSelector);
  const post = allPostsStore.find((post) => post.$id === slug);

  return post ? (
    <div className="py-8">
      <ContainerComp>
        <PostFormComp post={post} />
      </ContainerComp>
    </div>
  ) : null;
}

export default EditPost;
