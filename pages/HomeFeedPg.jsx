import { useEffect, useCallback, useState } from "react";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ContainerComp, PostCardComp, LoaderComp } from "../components/index";
import { allPostsRed } from "../features/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { debounce } from "lodash";
import { useIntersection } from "@mantine/hooks";
import { Query } from "appwrite";
let totalItems = null;
let lastDocumentId = null;

function HomeFeedPg() {
  const [isLoading, setIsLoading] = useState(false);
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

  // * fetch data from appwrite and dispatch to store on initial render for the all Posts
  useEffect(() => {
    // console.log("initial data fetching");
    const fetchInitialData = async () => {
      if (allPostsStore.length < 1) {
        setIsLoading(true)
        const page = await appwriteConfigService.getAllPost([
          Query.equal("status", "active"),
          Query.limit(6),
          Query.orderDesc(""),
        ]);
        if (page && page.documents.length > 0) {
          lastDocumentId = page.documents[page.documents.length - 1].$id;
          totalItems = page.total;
          handleDispatch(page.documents, true);
        }
        setIsLoading(false)
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
        Query.orderDesc(""),
        Query.cursorAfter(lastDocumentId),
      ]);

      if (page.documents.length > 0) {
        // currentPage = page;
        lastDocumentId = page.documents[page.documents.length - 1].$id;
        // firstDocumentId = page.documents[0].$id;
        handleDispatch([...allPostsStore, ...page.documents], true);
      }
      setIsLoading(false);
    }
  }
  // * simple intersection observer
  // const { ref, entry } = useIntersection({
  //   threshold: 0.1,
  // });
  // useEffect(() => {
  //   console.log("outer");
  //   if (entry?.isIntersecting && allPostsStore.length < totalItems) {
  //     fetchNextData();
  //     console.log("inner");
  //   }
  // }, [entry]);
  // * intersection observer with debounce
  const [isAllPostsLoaded, setIsAllPostsLoaded] = useState(false);
  const { ref, entry } = useIntersection({
    threshold: 0.1,
  });
  const debouncedFetchNextData = debounce(() => {
    if (entry?.isIntersecting && allPostsStore.length < totalItems) {
      fetchNextData();
    }
  }, 100);

  useEffect(() => {
    if (allPostsStore.length === totalItems) {
      setIsAllPostsLoaded(true);
    }
    if (!isAllPostsLoaded) debouncedFetchNextData();
    return () => debouncedFetchNextData.cancel();
  }, [entry?.isIntersecting]);

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
        {allPostsStore.map((post, index) => {
          const isLastPost = index === allPostsStore.length - 1 && !isAllPostsLoaded;
          return post.status === "active" ? (
            <div
              key={post.$id}
              {...(isLastPost ? { ref: ref } : {})}
              className={isLastPost ? "last-post-class" : ""}
            >
              <PostCardComp {...post} />
            </div>
          ) : null;
        })}
      </div>
      {isLoading && <LoaderComp height="h-[20vh]" size="50" />}
    </ContainerComp>
  );
}
export default HomeFeedPg;
