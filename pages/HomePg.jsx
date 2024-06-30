import React, { useEffect, useState } from "react";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ContainerComp, PostCardComp } from "../components/index";
function HomePg() {
  const [allPosts, setAllPosts] = useState([]);
  console.log(allPosts);

  useEffect(() => {
    appwriteConfigService
      .getAllPost()
      .then((data) => {
        if (Array.isArray(data.documents)) {
          
          setAllPosts(data.documents);
        } else {
          console.error("Data is not an array", data);
          setAllPosts([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setAllPosts([]);
      });
  }, []);

  if (allPosts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <ContainerComp>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500"></h1>
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
            allPosts.map((post) => (
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
