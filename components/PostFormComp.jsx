import React, { useEffect } from "react";
import { InputComp, RteComp, SelectComp, ButtonComp } from "../components/index";
import { useForm } from "react-hook-form";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allPostsRed } from "../features/postSlice";

function PostFormComp({ post }) {
  const dispatch = useDispatch();

  // console.log(post);
  const userData = useSelector((state) => state.auth.userData);

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
      return " ";
    }
  };
  useEffect(() => {
    const subscription = watch((data, { name }) => {
      if (name === "title") {
        // console.log(name)
        setValue("slug", slugTransfrom(data.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransfrom, setValue]);

  const submitFunc = async (data) => {
    console.log(data);
    if (post) {
      const imageUpload = data.featuredImage[0]
        ? await appwriteConfigService.uploadFile(data.featuredImage[0])
        : null;
      if (imageUpload) {
        await appwriteConfigService.deleteFile(post.featuredImage);
      }

      const postUpdated = await appwriteConfigService.updatePost(post.$id, {
        ...data,
        featuredImage: imageUpload ? imageUpload.$id : undefined,
      });
      if (postUpdated) {
        // console.log(postUpdated);
        dispatch(allPostsRed({ posts: [], status: false }));

        navigate(`/post/${postUpdated.$id}`);
      }
    } else {
      const imageUpload = await appwriteConfigService.uploadFile(data.featuredImage[0]);
      // console.log(imageUpload);
      // console.log(userData.$id)

      if (imageUpload) {
        console.log(userData);
        const postCreated = await appwriteConfigService.createPost({
          ...data,
          featuredImage: imageUpload.$id,
          userID: userData.$id,
        });
        if (postCreated) {
          // console.log(postCreated);
          dispatch(allPostsRed({ posts: [], status: false }));
          navigate(`/post/${postCreated.$id}`);
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(submitFunc)} className="flex flex-wrap">
      <div className="w-2/3 p-2">
        <InputComp
          type="text"
          placeholder="write title"
          label="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <InputComp
          type="text"
          placeholder="title slug"
          label="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            // console.log(e.currentTarget.value);
            setValue("slug", slugTransfrom(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RteComp
          defaultValue={post?.content || ""}
          control={control}
          UniqueName="content"
          label="Content"
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
            <img
              src={appwriteConfigService.getFilePreview(post?.featuredImage)}
              alt={"Image-Preview"}
            />
          </div>
        )}

        <SelectComp
          options={["Active", "InActive"]}
          label={"Status"}
          className="mb-4"
          {...register("status", { required: true })}
        />
        <ButtonComp type="submit" className={post ? "bg-green-500" : ""}>
          {post ? "Update Post" : "Create Post"}
        </ButtonComp>
      </div>
    </form>
  );
}

export default PostFormComp;
