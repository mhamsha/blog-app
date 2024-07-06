/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { InputComp, RteComp, SelectComp, ButtonComp } from "../components/index";
import { useForm, useWatch } from "react-hook-form";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allPostsRed } from "../features/postSlice";

function PostFormComp({ post }) {
  const dispatch = useDispatch();
  const allPostsStore = useSelector((state) => state.post.posts);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,

    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      quesPara: post?.quesPara || "",
      hashTags: post?.hashTags || "",
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

  const title = useWatch({
    control,
    name: "title",
  });

  useEffect(() => {
    // const subscription = watch((data, { name }) => {
    //   if (name === "title") {
    setValue("slug", slugTransfrom(title), { shouldValidate: true });
    // console.log(title);
    //   }
    // });
    // return () => subscription.unsubscribe();
  }, [setValue, watch, title]);

  const submitFunc = async (data) => {
    console.log(data);
    // * If post is available then update the post
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
      // if (postUpdated) {

      //   allPostsStore.filter((post) => post.$id !== postUpdated.$id)
      //   const allPostsStoreUpdated = [...allPostsStore, postUpdated];
      //   dispatch(allPostsRed({ posts: allPostsStoreUpdated, status: true }));

      //   navigate(`/post/${postUpdated.$id}`);
      // }
      if (postUpdated) {
        // Filter out the existing post and add the updated post
        const allPostsStoreUpdated = allPostsStore.filter((post) => post.$id !== postUpdated.$id);
        allPostsStoreUpdated.push(postUpdated); // Add the updated post to the array

        // Dispatch the updated posts array to the Redux store
        dispatch(allPostsRed({ posts: allPostsStoreUpdated, status: true }));

        // Navigate to the updated post's page
        navigate(`/post/${postUpdated.$id}`);
      }
    }
    // * If post is not available then create the post
    else {
      const imageUpload = await appwriteConfigService.uploadFile(data.featuredImage[0]);
      if (imageUpload) {
        const postCreated = await appwriteConfigService.createPost({
          ...data,
          featuredImage: imageUpload.$id,
          userID: userData.$id,
        });
        if (postCreated) {
          const allPostsStoreUpdated = [...allPostsStore, postCreated];
          dispatch(allPostsRed({ posts: allPostsStoreUpdated, status: true }));
          navigate(`/post/${postCreated.$id}`);
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(submitFunc)} className="flex flex-wrap bg-slate-200">
      <div className="md:w-2/3  p-2">
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <InputComp
          type="text"
          placeholder="Title"
          label="Title"
          className="mb-4"
          {...register("title", {
            required: "Title is required",

            pattern: {
              value: /^[A-Za-z\s]{1,35}$/,
              message: "Title must be 1-35 characters long and contain only letters",
            },
          })}
        />

        <InputComp
          type="text"
          placeholder="Title slug"
          label="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            // console.log(e.currentTarget.value);
            setValue("slug", slugTransfrom(e.currentTarget.value), { shouldValidate: true });
          }}
        />

        {errors.quesPara && <p className="text-red-500">{errors.quesPara.message}</p>}
        <InputComp
          type="text"
          placeholder="Question Paragraph"
          label="Sub Title"
          className="mb-4"
          {...register("quesPara", {
            required: "sub Title is required",
            pattern: {
              value: /^[A-Za-z\s]{1,100}$/,
              message: "Sub Title must be 1-100 characters long and contain only letters",
            },
          })}
        />

        {errors.hashTags && <p className="text-red-500">{errors.hashTags.message}</p>}
        <InputComp
          type="text"
          placeholder="#Tags"
          label="Tags"
          className="mb-4"
          {...register("hashTags", {
            required: "Tags are required",
            pattern: {
              value: /^[A-Za-z\s#]{1,100}$/,
              message: "Tags must be 1-100 characters long and contain only letters",
            },
          })}
        />

        {/* {errors.content && (
          <p
            className={
              !errors.content.message.includes("required") ? "text-gray-400" : "text-red-500"
            }
          >
            {errors.content.message}
          </p>
        )} */}
        {errors.content && <p className="text-red-500">{errors.content.message}</p>}
        <RteComp
          defaultValue={post?.content || ""}
          // defaultValue={getValues("content")}
          control={control}
          UniqueName="content"
          label="Content"
          rulesGiven={{
            required: "Content is required",
            maxLength: {
              value: 3000,
              message: "Content must under 1-3000 characters not words of  text and numbers",
            },
          }}

          // errors={errors.content}
        />
      </div>

      <div className="md:w-1/3  p-2">
        {errors.featuredImage && <p className="text-red-500">{errors.featuredImage.message}</p>}
        <InputComp
          type="file"
          label="Featured Image"
          className="mb-4"
          accept="image/png image/jpeg image/jpg image/gif"
          {...register("featuredImage", {
            required: post ? false : "Featured Image is required",
          })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              // eslint-disable-next-line react/prop-types
              src={appwriteConfigService.getFilePreview(post?.featuredImage)}
              alt={"Image-Preview"}
            />
          </div>
        )}

        <SelectComp
          options={["active", "InActive"]}
          label={"Status"}
          className="mb-4"
          {...register("status", { required: true })}
        />
        <ButtonComp type="submit">{post ? "Update Post" : "Create Post"}</ButtonComp>
      </div>
    </form>
  );
}

export default PostFormComp;
