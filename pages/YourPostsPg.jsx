import { useEffect, useCallback, useState } from "react";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ContainerComp, PostCardComp, LoaderComp } from "../components/index";
import { userPostsRed } from "../features/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { debounce } from "lodash";
import { useIntersection } from "@mantine/hooks";
import { Query } from "appwrite";
let totalItems = null;
let lastDocumentId = null;

function YourPostPg() {
  const [isLoading, setIsLoading] = useState(false);
  // * useDispatch
  const dispatch = useDispatch();
  const handleDispatch = useCallback(
    (data, stat) => {
      dispatch(userPostsRed({ userPosts: data, userPostsStatus: stat }));
    },
    [dispatch]
  );

  // * useSelector
  const userPostsSelector = (state) => state.post.userPosts;
  const userDataSelector = (state) => state.auth.userData;

  const postInfoSelector = createSelector([userPostsSelector, userDataSelector], (posts, data) => ({
    userPostsStore: posts,
    userData: data,
  }));
  const { userPostsStore, userData } = useSelector(postInfoSelector);
  // * fetch data from appwrite and dispatch to store on initial render for the all Posts
  useEffect(() => {
    // console.log("initial data fetching");
    const fetchInitialData = async () => {
      if (userPostsStore.length === 0) {
        setIsLoading(true);
        const page = await appwriteConfigService.getAllPost([
          Query.equal("userID", userData.$id),
          Query.limit(6),
          Query.orderDesc(""),
        ]);
        if (page && page?.documents.length > 0) {
          lastDocumentId = page.documents[page?.documents.length - 1].$id;
          totalItems = page.total;
          handleDispatch(page.documents, true);
        }
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [handleDispatch]);

  async function fetchNextData() {
    // console.log("fetching next data");
    setIsLoading(true);
    if (lastDocumentId) {
      const page = await appwriteConfigService.getAllPost([
        Query.limit(6),
        Query.cursorAfter(lastDocumentId),
        Query.orderDesc(""),
      ]);

      if (page.documents.length !== 0) {
        lastDocumentId = page.documents[page.documents.length - 1].$id;
        handleDispatch([...userPostsStore, ...page.documents], true);
      }
      setIsLoading(false);
    }
  }

  // * intersection observer with debounce
  const [isAllPostsLoaded, setIsAllPostsLoaded] = useState(false);
  const { ref, entry } = useIntersection({
    threshold: 0.1,
  });
  const debouncedFetchNextData = debounce(() => {
    if (entry?.isIntersecting && userPostsStore.length < totalItems) {
      fetchNextData();
    }
  }, 100);

  useEffect(() => {
    if (userPostsStore.length === totalItems) {
      setIsAllPostsLoaded(true);
    }
    if (!isAllPostsLoaded) debouncedFetchNextData();
    return () => debouncedFetchNextData.cancel();
  }, [entry?.isIntersecting]);

  // * if data is not fetched yet
  if (userPostsStore.length < 1 && isLoading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <ContainerComp>
          <LoaderComp />
        </ContainerComp>
      </div>
    );
  }
  if (userPostsStore.length == 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <ContainerComp>
          <h1 className="text-2xl font-bold">No posts found</h1>
        </ContainerComp>
      </div>
    );
  }
  // * if data is fetched
  return (
    <ContainerComp>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userPostsStore?.map((post, index) => {
          const isLastPost = index === userPostsStore.length - 1 && !isAllPostsLoaded;
          return (
            <div
              key={post.$id}
              {...(isLastPost ? { ref: ref } : {})}
              className={isLastPost ? "last-post-class" : ""}
            >
              <PostCardComp {...post} />
            </div>
          );
        })}
      </div>
      {isLoading && <LoaderComp height="h-[20vh]" size="50" />}
    </ContainerComp>
  );
}
export default YourPostPg;
