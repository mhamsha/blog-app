import { ContainerComp, PostCardComp } from "../components";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

function YourPostsPg() {
  const isUserData = (state) => state.auth.userData;


  const postsSelector = (state) => state.post.posts;
  const postInfoSelector = createSelector([postsSelector, isUserData], (posts, data) => ({
    allPostsStore: posts,
    userData: data,
  }));
  const { allPostsStore, userData } = useSelector(postInfoSelector);
  // console.log(userData)

  return (
    <ContainerComp>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPostsStore.map(
          (post) =>
            post?.userID == userData?.$id && (
              <div key={post.$id} >
                <PostCardComp {...post} />
              </div>
            )
        )} 
      </div>
    </ContainerComp>
  );
}

export default YourPostsPg;
