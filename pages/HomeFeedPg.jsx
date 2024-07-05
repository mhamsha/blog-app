import { useEffect, useCallback } from "react";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ContainerComp, PostCardComp, LoaderComp } from "../components/index";
import { allPostsRed } from "../features/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

function HomeFeedPg() {
  // * useDispatch
  const dispatch = useDispatch();
  const handleDispatch = useCallback(
    (data, stat) => {
      dispatch(allPostsRed({ posts: data, status: stat }));
    },
    [dispatch]
  );

  // * useSelector
  const postStatusSelector = (state) => state.post.status;
  const postsSelector = (state) => state.post.posts;
  const postInfoSelector = createSelector([postStatusSelector, postsSelector], (status, posts) => ({
    isAllPostsStore: status,
    allPostsStore: posts,
  }));
  const { isAllPostsStore, allPostsStore } = useSelector(postInfoSelector);

  // * fetch data from appwrite and dispatch to store
  useEffect(() => {
    
    const fetchData = async () => {
      if (!isAllPostsStore) {
        try {
          const data = await appwriteConfigService.getAllPost();
          handleDispatch(data.documents, true);
        } catch (error) {
          console.error(error);
          handleDispatch([], false);
        }
      }
    };
    fetchData();
  }, [isAllPostsStore, handleDispatch]);

  // * if data is not fetched yet
  if (!isAllPostsStore) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <ContainerComp>
          <LoaderComp />
        </ContainerComp>
      </div>
    );
  }
  // * if data is fetched
  return (
    <ContainerComp>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPostsStore.map((post) => {
          return post.status == "active" ? <PostCardComp key={post.$id} {...post} /> : null;
        })}
      </div>
    </ContainerComp>
  );
}

export default HomeFeedPg;
