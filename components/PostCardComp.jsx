import React from "react";
import { Link } from "react-router-dom";
import appwriteConfigService from "../appwrite/appwriteConfig";

function PostCardComp({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4 ">
          <img
            src={appwriteConfigService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl h-48 w-48"
          />
        </div >
        <h2 className="text-xl font-bold ml-8">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCardComp;
