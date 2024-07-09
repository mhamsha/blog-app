import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ButtonComp, ContainerComp, LoaderComp } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { deletePostRed, currentPostRed } from "../features/postSlice";
import { createSelector } from "reselect";
import { useEffect, useState } from "react";

export default function PostPg() {
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAllPostsStore = (state) => state.post.posts;
  const isAllUserData = (state) => state.auth.userData;
  const isCurrentPost = (state) => state.post.currentPost;
  const postInfoSelector = createSelector(
    [isAllPostsStore, isAllUserData, isCurrentPost],
    (posts, data, currPost) => ({
      allPostsStore: posts,
      userData: data,
      currentPost: currPost,
    })
  );
  const { allPostsStore, userData, currentPost } = useSelector(postInfoSelector);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!currentPost) {
        setIsLoading(true);
        try {
          const fetchedPost = await appwriteConfigService.getPost(slug);
          setIsAuthor(fetchedPost.userID === userData.$id);
          dispatch(currentPostRed(fetchedPost));
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
        setIsLoading(false);
      } else if (currentPost?.$id === slug) {
        setIsAuthor(currentPost.userID === userData.$id);
      } else {
        const foundPost = allPostsStore?.find((post) => post.$id === slug);
        if (foundPost) {
          dispatch(currentPostRed(foundPost));
          setIsAuthor(foundPost.userID === userData.$id);
        }
      }
    };
    window.scroll(0, 0);
    if (userData) {
      fetchPost();
    }
  }, [allPostsStore, dispatch, slug, userData]);
  const deletePost = () => {
    appwriteConfigService.deleteFile(currentPost?.featuredImage);
    appwriteConfigService.deletePost(currentPost?.$id).then((status) => {
      if (status) {
        dispatch(deletePostRed(currentPost?.$id));
        navigate("/");
      }
    });
  };

  const postCreationData = new Date(currentPost?.$createdAt).toLocaleDateString("en-GB");

  if(isLoading) return <LoaderComp />;
  return currentPost ? (
    <div className="p-6">
      <ContainerComp>
        <div className=" w-full flex justify-center mb-4 relative border rounded-xl ">
          <img
            src={appwriteConfigService.getFilePreview(currentPost?.featuredImage)}
            alt={currentPost?.title}
            className=" h-80 sm:h-96 md:h-[70vh]  w-full rounded-lg opacity-95 hover:opacity-100 transition-opacity duration-500 ease-in-out"
          />
          <footer className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 text-white text-xs md:text-lg lg:text-3xl p-2 rounded-b-lg transition-opacity duration-500 opacity-70 group-hover:opacity-100 ease-in-out flex justify-between ">
            <span>{`${postCreationData}`}</span>
            <span>{`${currentPost?.author}`}</span>
          </footer>

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${currentPost?.$id}`}>
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
          {/* </div> */}
        </div>
        <div className="w-full my-6">
          <h1 className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-center">
            {currentPost?.title}
          </h1>
        </div>
        <div className="browser-css md:text-3xl lg:text-6xl">{parse(currentPost?.content)}</div>
      </ContainerComp>
    </div>
  ) : null
}
