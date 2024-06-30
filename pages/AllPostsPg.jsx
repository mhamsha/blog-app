import React, { useState, useEffect } from "react";
import { ContainerComp, PostCardComp } from "../components";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { useSelector } from "react-redux";

function AllPostsPg() {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteConfigService.getAllPost([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        // console.log(posts.documents[0].userID);
        // console.log(userData.$id);
      }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <ContainerComp>
        <div className="flex flex-wrap">
          {posts.map(
            (post) =>
              (post.userID == userData.$id) && (
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
