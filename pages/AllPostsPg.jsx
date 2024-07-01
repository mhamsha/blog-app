import React, { useState, useEffect } from "react";
import { ContainerComp, PostCardComp } from "../components";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { useSelector, useDispatch } from "react-redux";
import { allPostsRed } from "../features/postSlice";

function AllPostsPg() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const { isAllPostsStore, allPostsStore } = useSelector((state) => ({
    isAllPostsStore: state.post.status,
    allPostsStore: state.post.posts,
  }));

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!isAllPostsStore) {
      appwriteConfigService.getAllPost([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          dispatch(allPostsRed({ posts: posts.documents, status: true }));

          // console.log(posts.documents[0].userID);
          // console.log(userData.$id);
        }
      });
    } else {
      setPosts(allPostsStore);
    }
  }, []);
  return (
    <div className="w-full py-8">
      <ContainerComp>
        <div className="flex flex-wrap">
          {posts.map(
            (post) =>
              post?.userID == userData?.$id && (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCardComp {...post} />
                </div>
              )
          )}
        </div>
      </ContainerComp>
    </div>
  );
}

export default AllPostsPg;
