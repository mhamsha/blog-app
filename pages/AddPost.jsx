import React from "react";
import { ContainerComp, PostFormComp } from "../components";

function AddPost() {
  return (
    <div className="py-8">
      <ContainerComp>
        <PostFormComp />
      </ContainerComp>
    </div>
  );
}

export default AddPost;
