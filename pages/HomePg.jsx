import React, { useEffect, useState } from "react";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ContainerComp, PostCardComp } from "../components/index";
import { allPostsRed } from "../features/postSlice";
import { useSelector, useDispatch } from "react-redux";
function HomePg() {
  // console.log("rendered");
  const [allPosts, setAllPosts] = useState([]);
  const dispatch = useDispatch();
  const { isAllPostsStore, allPostsStore } = useSelector((state) => ({
    isAllPostsStore: state.post.status,
    allPostsStore: state.post.posts,
  }));
  // const allPostsStore = useSelector((state) => state.post.posts);
  // const isAllPostsStore = useSelector((state) => state.post.status);
  // console.log(allPosts);

  useEffect(() => {
    if (!isAllPostsStore) {
      appwriteConfigService
        .getAllPost()
        .then((data) => {
          if (Array.isArray(data.documents)) {
            setAllPosts(data.documents);
            dispatch(allPostsRed({ posts: data.documents, status: true }));
            // console.log(allPostsStore)
          } else {
            console.error("Data is not an array", data);
            setAllPosts([]);
            dispatch(allPostsRed({ posts: [], status: false }));
          }
        })
        .catch((error) => {
          console.error(error);
          setAllPosts([]);
          dispatch(allPostsRed({ posts: [], status: false }));
        });
    } else {
      setAllPosts(allPostsStore);
    }
  }, [isAllPostsStore, dispatch]);

  if (allPosts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <ContainerComp>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">...Loading</h1>
            </div>
          </div>
        </ContainerComp>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <ContainerComp>
        <div className="flex flex-wrap">
          {allPosts &&
            allPostsStore.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCardComp {...post} />
              </div>
            ))}
        </div>
      </ContainerComp>
    </div>
  );
}

export default HomePg;
