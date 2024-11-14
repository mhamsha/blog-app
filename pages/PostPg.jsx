import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteConfigService from "../appwrite/appwriteConfig";
import { ButtonComp, ContainerComp, LoaderComp } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { deletePostRed, currentPostRed } from "../features/postSlice";
import {
  likeIncrementRed,
  likeDecrementRed,
  dislikeIncrementRed,
  dislikeDecrementRed,
  selectLikesCountByPostId,
  selectDislikesCountByPostId,
} from "../features/postReactSlice";
import { createSelector } from "reselect";
import { useEffect, useState } from "react";
import { Query } from "appwrite";
import { debounce } from "lodash";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";

export default function PostPg() {
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAllPostsStore = (state) => state.post.posts;
  const isAllUserData = (state) => state.auth.userData;
  const isCurrentPost = (state) => state.post.currentPost;
  const isSearhPosts = (state) => state.post.searchPosts;
  const isYourPost = (state) => state.post.yourPosts;
  // const disLikesCounterSelector = (state) =>
  //   state.postReact.postsReact[slug]?.dislikesCount || 0;
  // const likesCounterSelector = (state) =>
  //   state.postReact.postsReact[slug]?.likesCount || 0;
  const postInfoSelector = createSelector(
    [
      isAllPostsStore,
      isAllUserData,
      isCurrentPost,
      isSearhPosts,
      isYourPost,
      // likesCounterSelector,
      // disLikesCounterSelector,
    ],
    (posts, data, currPost, searchPosts, yourPosts) => ({
      allPostsStore: posts,
      userData: data,
      currentPost: currPost,
      searchPostsStore: searchPosts,
      yourPostsStore: yourPosts,
      // likesCounter: likes,
      // disLikesCounter: dislikes,
    }),
  );

  const {
    allPostsStore,
    userData,
    currentPost,
    searchPostsStore,
    yourPostsStore,
  } = useSelector(postInfoSelector);
  const likesCounter = useSelector((state) =>
    selectLikesCountByPostId(state, slug),
  );
  const disLikesCounter = useSelector((state) =>
    selectDislikesCountByPostId(state, slug),
  );
  // console.log(likesCounter, disLikesCounter);

  const [isAuthor, setIsAuthor] = useState(false);

  const postToFind = searchPostsStore
    ? searchPostsStore
    : allPostsStore
      ? allPostsStore
      : yourPostsStore;
  useEffect(() => {
    const fetchPost = async () => {
      if (!currentPost) {
        setIsLoading(true);
        try {
          const fetchedPost = await appwriteConfigService.getPost(slug);
          setIsAuthor(fetchedPost.userID === userData.$id);
          dispatch(currentPostRed(fetchedPost));
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
        setIsLoading(false);
      } else if (currentPost?.$id === slug) {
        setIsAuthor(currentPost.userID === userData.$id);
      } else {
        const foundPost = postToFind?.find((post) => post.$id === slug);
        if (foundPost) {
          dispatch(currentPostRed(foundPost));
          setIsAuthor(foundPost.userID === userData.$id);
        }
      }
    };
    window.scroll(0, 0);
    if (userData) {
      fetchPost();
    }
  }, [allPostsStore, dispatch, slug, userData, currentPost, postToFind]);
  const deletePost = () => {
    appwriteConfigService.deleteFile(currentPost?.featuredImage);
    appwriteConfigService
      .deleteEntity("post", currentPost?.$id)
      .then((status) => {
        if (status) {
          dispatch(deletePostRed(currentPost?.$id));
          navigate("/");
        }
      });
  };

  const postCreationData = new Date(currentPost?.$createdAt).toLocaleDateString(
    "en-GB",
  );
  const [isLiked, setIsliked] = useState(false);
  const [isDisLiked, setIsDisliked] = useState(false);
  const [likeUserID, setLikeUserID] = useState("");
  const [documentID, setDocumentID] = useState("");
  const [useEffectTrigger, setUseEffectTrigger] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  // console.log(documentID);
  // console.log(likeUserID, userData.$id);

  // ! These function are not optimized and need to be refactored and when constantly clicking on the like and dislike button the it will call api multiple times and create multiple entities
  // TODO : Refactor the code and optimize the function and fix the bug when user constantly click on the like and dislike button
  // const handleLikesCounter = async () => {
  //   try {
  //     if (isDisabled) return;
  //     setIsDisabled(true);
  //     // * If the current post has dislikes and user click on like button
  //     if (isDisLiked) {
  //       setIsDisliked(false);
  //       setIsliked(true);
  //       // * dispatch the like decrement action and dislike increment action
  //       const dispatchReqlike = dispatch(dislikeDecrementRed({ postId: slug }));
  //       if (dispatchReqlike) {
  //         const dispatchReqDislike = dispatch(
  //           likeIncrementRed({ postId: slug }),
  //         );
  //         // * Appwrite service to update the like entity
  //         if (dispatchReqDislike) {
  //           const updateLikeReq = await appwriteConfigService.updateEntity(
  //             "reaction",
  //             documentID,
  //             { likesCount: 1, dislikesCount: 0 },
  //           );
  //           // * If the like entity is not updated then dispatch the like increment and dislike decrement action
  //           if (!updateLikeReq) {
  //             dispatch(dislikeIncrementRed({ postId: slug }));
  //             dispatch(likeDecrementRed({ postId: slug }));
  //             setIsDisliked(true);
  //             setIsliked(false);
  //           } else {
  //             setUseEffectTrigger(!useEffectTrigger);
  //           }
  //         }
  //       }
  //       return;
  //     }
  //     // * If the user has already liked the post and click on the like button again
  //     if (likesCounter > 0 && userData.$id === likeUserID) {
  //       setIsliked(false);
  //       // * Dispatch the like decrement action
  //       const dispatchReq = dispatch(likeDecrementRed({ postId: slug }));
  //       if (dispatchReq) {
  //         // * Appwrite service to update the like entity
  //         const deleteReq = await appwriteConfigService.deleteEntity(
  //           "reaction",
  //           documentID,
  //         );
  //         // * If the like entity is not updated then dispatch the like increment action
  //         if (!deleteReq) {
  //           dispatch(likeDecrementRed({ postId: slug }));
  //           setIsliked(true);
  //         } else {
  //           setLikeUserID("");
  //         }
  //       }

  //       return;
  //     } else {
  //       // * when user first click on like button
  //       setIsliked(true);
  //       setIsDisliked(false);
  //       // * Dispatch the like increment action
  //       const dispatchReq = dispatch(likeIncrementRed({ postId: slug }));
  //       // * Appwrite service to create a like entity
  //       if (dispatchReq) {
  //         const createLikeReq = await appwriteConfigService.createEntity(
  //           "reaction",
  //           {
  //             userID: userData.$id,
  //             likesCount: 1,
  //             dislikesCount: 0,
  //             slug: slug,
  //           },
  //         );
  //         // * If the like entity is not created then dispatch the like decrement action
  //         if (!createLikeReq) {
  //           dispatch(likeDecrementRed({ postId: slug }));
  //           setIsliked(false);
  //           setIsDisliked(true);
  //         } else {
  //           setUseEffectTrigger(!useEffectTrigger);
  //         }
  //       }
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Error handling likes:", error);
  //   } finally {
  //     setIsDisabled(false);
  //   }
  // };
  // const handleDisLikesCounter = async () => {
  //   try {
  //     if (isDisabled) return;
  //     setIsDisabled(true);
  //     // * If current post has like and user click on dislike button
  //     if (isLiked) {
  //       // console.log(" toggle");
  //       setIsliked(false);
  //       setIsDisliked(true);
  //       // * dispatch the like decrement action and dislike increment action
  //       const dispatchReqlike = dispatch(likeDecrementRed({ postId: slug }));
  //       if (dispatchReqlike) {
  //         const dispatchReqDislike = dispatch(
  //           dislikeIncrementRed({ postId: slug }),
  //         );
  //         // * Appwrite service to update the like entity
  //         if (dispatchReqDislike) {
  //           const updateLikeReq = await appwriteConfigService.updateEntity(
  //             "reaction",
  //             documentID,
  //             { likesCount: 0, dislikesCount: 1 },
  //           );
  //           // * If the like entity is not updated then dispatch the like increment and dislike decrement action
  //           if (!updateLikeReq) {
  //             dispatch(likeIncrementRed({ postId: slug }));
  //             dispatch(dislikeDecrementRed({ postId: slug }));
  //             setIsliked(true);
  //             setIsDisliked(false);
  //           } else {
  //             setUseEffectTrigger(!useEffectTrigger);
  //           }
  //         }
  //       }
  //       return;
  //     }
  //     // * If the user has already disliked the post and click on the dislike button again
  //     if (disLikesCounter > 0 && userData.$id === likeUserID) {
  //       // console.log("delete");
  //       setIsDisliked(false);
  //       // * Dispatch the dislike decrement action
  //       const dispatchReqDislike = dispatch(
  //         dislikeDecrementRed({ postId: slug }),
  //       );
  //       if (dispatchReqDislike) {
  //         // * Appwrite service to delete the dislike entity
  //         const deleteDislikeReq = await appwriteConfigService.deleteEntity(
  //           "reaction",
  //           documentID,
  //         );

  //         // * If the dislike entity is not deleted then dispatch the dislike increment action
  //         if (!deleteDislikeReq) {
  //           dispatch(dislikeIncrementRed({ postId: slug }));
  //           setIsDisliked(true);
  //         } else {
  //           setLikeUserID("");
  //         }
  //       }
  //       return;
  //     } else {
  //       // console.log("create");
  //       // * If the user first click on the dislike button
  //       setIsDisliked(true);
  //       setIsliked(false);
  //       // * Dispatch the dislike increment action
  //       const dispatchReq = dispatch(dislikeIncrementRed({ postId: slug }));
  //       if (dispatchReq) {
  //         // * Appwrite service to create a dislike entity
  //         const disLikeReq = await appwriteConfigService.createEntity(
  //           "reaction",
  //           {
  //             userID: userData.$id,
  //             dislikesCount: 1,
  //             likesCount: 0,
  //             slug: slug,
  //           },
  //         );
  //         // * If the dislike entity is not created then dispatch the dislike decrement action
  //         if (!disLikeReq) {
  //           dispatch(dislikeDecrementRed({ postId: slug }));
  //           setIsDisliked(false);
  //           setIsliked(true);
  //         } else {
  //           setUseEffectTrigger(!useEffectTrigger);
  //         }
  //       }
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Error handling dislikes:", error);
  //   } finally {
  //     setIsDisabled(false);
  //   }
  // };

  const handleReactionCounter = async (entity) => {
    try {
      // Prevent further actions if already disabled
      if (isDisabled) return;
      setIsDisabled(true);

      // Determine if the action is a like or dislike
      const isLikeAction = entity === "like";
      const isDislikeAction = entity === "dislike";

      // Determine the current and opposite reaction states
      // const currentReactionState = isLikeAction ? isLiked : isDisLiked;
      const oppositeReactionState = isLikeAction ? isDisLiked : isLiked;

      // Determine the appropriate increment and decrement actions
      const incrementAction = isLikeAction
        ? likeIncrementRed
        : dislikeIncrementRed;
      const decrementAction = isLikeAction
        ? likeDecrementRed
        : dislikeDecrementRed;
      const oppositeIncrementAction = isLikeAction
        ? dislikeIncrementRed
        : likeIncrementRed;
      const oppositeDecrementAction = isLikeAction
        ? dislikeDecrementRed
        : likeDecrementRed;

      // Define the payloads for updating and creating entities
      const updateEntityPayload = isLikeAction
        ? { likesCount: 1, dislikesCount: 0 }
        : { likesCount: 0, dislikesCount: 1 };

      const createEntityPayload = isLikeAction
        ? { userID: userData.$id, likesCount: 1, dislikesCount: 0, slug: slug }
        : { userID: userData.$id, dislikesCount: 1, likesCount: 0, slug: slug };

      // Handle the case where the opposite reaction is already set
      if (oppositeReactionState) {
        setIsliked(isLikeAction);
        setIsDisliked(isDislikeAction);

        // Dispatch the decrement action for the opposite reaction
        const dispatchReqOpposite = dispatch(
          oppositeDecrementAction({ postId: slug }),
        );
        if (dispatchReqOpposite) {
          // Dispatch the increment action for the current reaction
          const dispatchReq = dispatch(incrementAction({ postId: slug }));
          if (dispatchReq) {
            // Update the entity in the backend
            const updateReq = await appwriteConfigService.updateEntity(
              "reaction",
              documentID,
              updateEntityPayload,
            );
            if (!updateReq) {
              // Revert the actions if the update fails
              dispatch(oppositeIncrementAction({ postId: slug }));
              dispatch(decrementAction({ postId: slug }));
              setIsliked(!isLikeAction);
              setIsDisliked(!isDislikeAction);
            } else {
              setUseEffectTrigger(!useEffectTrigger);
            }
          }
        }
        return;
      }

      // Handle the case where the current reaction is already set
      if (
        (isLikeAction && likesCounter > 0) ||
        (isDislikeAction && disLikesCounter > 0 && userData.$id === likeUserID)
      ) {
        setIsliked(false);
        setIsDisliked(false);

        // Dispatch the decrement action for the current reaction
        const dispatchReq = dispatch(decrementAction({ postId: slug }));
        if (dispatchReq) {
          // Delete the entity in the backend
          const deleteReq = await appwriteConfigService.deleteEntity(
            "reaction",
            documentID,
          );
          if (!deleteReq) {
            // Revert the actions if the deletion fails
            dispatch(incrementAction({ postId: slug }));
            setIsliked(isLikeAction);
            setIsDisliked(isDislikeAction);
          } else {
            setLikeUserID("");
          }
        }
        return;
      } else if (!likeUserID) {
        // Handle the case where no reaction is set and the user has not reacted before
        setIsliked(isLikeAction);
        setIsDisliked(isDislikeAction);

        // Dispatch the increment action for the current reaction
        const dispatchReq = dispatch(incrementAction({ postId: slug }));
        if (dispatchReq) {
          // Create the entity in the backend
          const createReq = await appwriteConfigService.createEntity(
            "reaction",
            createEntityPayload,
          );
          if (!createReq) {
            // Revert the actions if the creation fails
            dispatch(decrementAction({ postId: slug }));
            setIsliked(!isLikeAction);
            setIsDisliked(!isDislikeAction);
          } else {
            setUseEffectTrigger(!useEffectTrigger);
          }
        }
        return;
      }
    } catch (error) {
      // Log any errors that occur
      console.error(`Error handling ${entity}s:`, error);
    } finally {
      // Re-enable actions
      setIsDisabled(false);
    }
  };

  const debouncedHandleCounter = debounce(handleReactionCounter, 200);

  // const debouncedHandleDisLikesCounter = debounce(handleDisLikesCounter, 200);

  useEffect(() => {
    const getReactions = async () => {
      try {
        const reactionsReq = await appwriteConfigService.getAllEntity(
          "reaction",
          [Query.equal("slug", slug)],
        );
        // console.log(reactionsReq);
        const documents = await reactionsReq.documents;

        const userDocument = documents.find(
          (doc) => doc.userID === userData?.$id,
        );
        if (userDocument) {
          setLikeUserID(userDocument.userID);
          setDocumentID(userDocument.$id);
          if (userDocument.likesCount === 1) {
            setIsliked(true);
          } else {
            setIsliked(false);
          }
          if (userDocument.dislikesCount === 1) {
            setIsDisliked(true);
          } else {
            setIsDisliked(false);
          }
        } else {
          // Reset or set default values if userDocument is not found
          setLikeUserID("");
          setDocumentID("");
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    getReactions();
  }, [slug, useEffectTrigger, userData]);

  const [iconSize, setIconSize] = useState();
  const handleVideoSrcSet = () => {
    if (window.innerWidth > 768) {
      setIconSize(23);
    } else {
      setIconSize(15);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  if (isLoading) return <LoaderComp />;
  return currentPost ? (
    <div className="p-6">
      <ContainerComp>
        <div className="relative mb-4 flex w-full justify-center rounded-xl border-2 border-solid border-black dark:border-none">
          <img
            src={appwriteConfigService.getFilePreview(
              currentPost?.featuredImage,
            )}
            alt={currentPost?.title}
            className="max-h-screen w-full rounded-lg object-cover opacity-95 transition-opacity duration-500 ease-in-out hover:opacity-100 dark:opacity-100 dark:brightness-75 dark:filter"
          />
          {/*This is footer for data nad author name  */}
          <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 rounded-b-lg bg-gray-900 bg-opacity-80 p-2 text-xs text-white opacity-70 transition-opacity duration-500 ease-in-out group-hover:opacity-100 md:text-lg lg:text-3xl">
            <span>{`${postCreationData}`}</span>

            {/*This is the title */}
            <span>{`${currentPost?.author}`}</span>
          </footer>
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${currentPost?.$id}`}>
                <ButtonComp>Edit</ButtonComp>
              </Link>
              <ButtonComp
                bgColor="bg-red-500"
                hover="hover:bg-red-600"
                className="mt-2 flex flex-auto justify-center"
                onClick={deletePost}
              >
                Delete
              </ButtonComp>
            </div>
          )}
          {/* </div> */}
        </div>
        {/*This is the reactions buttons */}
        <div className="flex-center gap-3">
          {/* like button */}
          <ButtonComp
            className={`post-reaction-btn`}
            onClick={isDisabled ? null : () => debouncedHandleCounter("like")}
            style={{
              backgroundColor: isLiked && "#1e40af",
            }}
          >
            <span>
              <ThumbsUp size={iconSize} />
            </span>
            <span>{likesCounter}</span>
          </ButtonComp>
          {/* dislike button */}
          <ButtonComp
            className={`post-reaction-btn`}
            onClick={
              isDisabled ? null : () => debouncedHandleCounter("dislike")
            }
            style={{
              backgroundColor: isDisLiked && "#991b1b",
            }}
          >
            <span>
              <ThumbsDown size={iconSize} />
            </span>
            <span>{disLikesCounter}</span>
          </ButtonComp>
          {/* comment button */}
          <ButtonComp
            className="post-reaction-btn hover:bg-gray-700"
            onClick={() => navigate(`/post/${slug}/comments`)}
          >
            <span>
              <MessageSquare size={iconSize} />
            </span>
            <span>{0} </span>
          </ButtonComp>
          {/* share button */}
          <ButtonComp
            className="post-reaction-btn hover:bg-gray-700"
            onClick={() => navigate(`/post/${slug}/comments`)}
          >
            <span>
              <Share2 size={iconSize} />
            </span>
            <span>{0} </span>
          </ButtonComp>
        </div>
        <div className="my-6 w-full">
          <h1 className="text-center text-lg font-bold dark:text-gray-200 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            {currentPost?.title}
          </h1>
        </div>
        <div className="text-sm leading-normal dark:text-gray-300 sm:text-base sm:leading-relaxed md:text-lg md:leading-loose lg:text-xl xl:text-2xl 2xl:text-3xl">
          {parse(currentPost?.content)}
        </div>
      </ContainerComp>
    </div>
  ) : null;
}
