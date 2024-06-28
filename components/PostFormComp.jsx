import React, { useEffect } from "react";
import { InputComp, RteComp, SelectComp, ButtonComp } from "../components/index";
import { useForm } from "react-hook-form";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostFormComp(post) {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, control, watch } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "Active",
    },
  });

  const slugTransfrom = (text) => {
    if (text.length > 0) {
      return text
        .trim()
        .toLowerCase()
        .replace(/[\s\W-]+/g, "-");
    } else {
      return "";
    }
  };
  useEffect(() => {
    const subscription = watch((data, { fieldName }) => {
      if (fieldName === "title") {
        setValue("slug", slugTransfrom(data.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransfrom, setValue]);

  const submitFunc = (data) => {
    if (post) {
      const imageUpload = appwriteConfigService.uploadFile(data.featuredImage[0]);
      if (imageUpload) {
        const imageDelete = appwriteConfigService.deleteFile(post.$id);
        if (imageDelete) {
          const postUpdated = appwriteConfigService.updatePost({
            ...data,
            featuredImage: imageUpload.$id,
            userId: userData.$id,
          });
          if (postUpdated) {
            navigate(`/post/${postUpdated.$id}`);
          }
        }
      } else {
        const imageUpload = appwriteConfigService.uploadFile(data.featuredImage[0]);
        if (imageUpload) {
          const postCreated = appwriteConfigService.createPost({
            ...data,
            featuredImage: imageUpload.$id,
            userId: userData.$id,
          });
          if (postCreated) {
            navigate(`/post/${postCreated.$id}`);
          }
        }
      }

      return (
        <form action={handleSubmit(submitFunc)}>
          <div>
            <div className="w-2/3 p-2">
              <InputComp
                type="text"
                placeholder="write title"
                label="Title"
                {...register("title", { required: true })}
              />
              <InputComp
                type="text"
                placeholder="title slug"
                label="Slug"
                {...register("slug", { required: true })}
                oninput={(e) => {
                  setValue("slug", slugTransfrom(e.target.value), { shouldValidate: true });
                }}
              />
              <RteComp
                initialValue=""
                control={control}
                UniqueName="Blog-Content"
                label="Content"
                defaultValues={post?.content}
              />
            </div>

            <div className="w-1/2 p-2">
              <InputComp
                type="file"
                label="Featured Image"
                className="mb-4"
                accept="image/png image/jpeg image/jpg image/gif"
                {...register("featuredImage", { required: !post })}
              />
              {post && (
                <div className="w-full mb-4">
                  <img src={appwriteConfigService.getFilePreview(post?.$id)} alt="Image-Preview" />
                </div>
              )}

              <SelectComp
                options={["Active", "InActive"]}
                label={"Status"}
                className="mb-4"
                {...register("status", { required: true })}
              />
              <ButtonComp
                type="submit"
                children={post ? "Update Post" : "Publish Post"}
                className={post ? "bg-green-500" : ""}
              />
            </div>
          </div>
        </form>
      );
    }
  };
}

export default PostFormComp;
