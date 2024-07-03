import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ButtonComp, ContainerComp } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { allPostsRed } from "../features/postSlice";
import { createSelector } from "reselect";

export default function PostPg() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAllPostsStore = (state) => state.post.posts;
  const isAllUserData = (state) => state.auth.userData;
  const postInfoSelector = createSelector([isAllPostsStore, isAllUserData], (posts, data) => ({
    allPostsStore: posts,
    userData: data,
  }));
  const { allPostsStore, userData } = useSelector(postInfoSelector);
  const post = allPostsStore.find((post) => post.$id === slug);
  const isAuthor = post && userData ? post.userID === userData.$id : false;

  const deletePost = () => {
    appwriteConfigService.deleteFile(post.featuredImage);
    appwriteConfigService.deletePost(post.$id).then((status) => {
      if (status) {
        const allPostsStoreUpdated = allPostsStore.filter(
          (postStore) => postStore.$id !== post.$id
        );
        dispatch(allPostsRed({ posts: allPostsStoreUpdated, status: true }));
        navigate("/your-posts");
      }
    });
  };

  return post ? (
    <div className="p-6">
      <ContainerComp>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteConfigService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full md:h-[80vh]   "
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <ButtonComp>Edit</ButtonComp>
              </Link>
              <ButtonComp
                bgColor="bg-red-500"
                hover="hover:bg-red-600"
                className="mt-2 flex flex-auto "
                onClick={deletePost}
              >
                Delete
              </ButtonComp>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </ContainerComp>
    </div>
  ) : null;
}
