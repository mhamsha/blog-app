import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ButtonComp, ContainerComp } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function PostPg() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  // console.log( slug);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userID === userData.$id : false;

  // const isAuthor = true;
  
  // console.log(isAuthor);
  // console.log(post)

  useEffect(() => {
    if (slug) {
      appwriteConfigService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteConfigService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteConfigService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <ContainerComp>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteConfigService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <ButtonComp bgColor="bg-green-500" className="mr-3">
                  Edit
                </ButtonComp>
              </Link>
              <ButtonComp bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </ButtonComp>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </ContainerComp>
    </div>
  ) : null;
}
