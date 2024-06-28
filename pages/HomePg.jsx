import React, { useEffect, useState } from "react";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ContainerComp, PostCardComp } from "../components";

function HomePg() {
  const [allPosts, setallPosts] = useState([]);
  useEffect(() => {
    setallPosts(appwriteConfigService.getAllPost());
  }, []);

  return allPosts.length == 0 ? (
    <div className="w-full py-8 mt-4 text-center">
      <ContainerComp>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">Login to read posts</h1>
          </div>
        </div>
      </ContainerComp>
    </div>
  ) : (
    <div className="w-full py-8">
      <ContainerComp>
        <div className="flex flex-wrap">
          {allPosts.map((post) => (
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
