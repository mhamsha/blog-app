  // * Create Post Method
  // async createPost({
  //   title,
  //   slug,
  //   content,
  //   status,
  //   featuredImage,
  //   userID,
  //   quesPara,
  //   hashTags,
  //   author,
  // }) {
  //   try {
  //     return await this.databases.createDocument(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionID,
  //       slug,
  //       {
  //         title,
  //         content,
  //         status,
  //         featuredImage,
  //         userID,
  //         quesPara,
  //         hashTags,
  //         author,
  //       },
  //     );
  //   } catch (error) {
  //     console.log("Appwrite :: appwriteConfig :: createPost :: error", error);
  //   }
  // }
  // *create like count method
  // async createLike({ slug, userID, likesCount, dislikesCount }) {
  //   try {
  //     return await this.databases.createDocument(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionIDReactions,
  //       ID.unique(),
  //       {
  //         slug,
  //         userID,
  //         likesCount,
  //         dislikesCount,
  //       },
  //     );
  //   } catch (error) {
  //     console.error("Appwrite :: appwriteConfig :: createLike :: error", error);
  //   }
  // }
  // * Create Comment Method
  // async createComment({
  //   documentID,
  //   userID,
  //   commentText,
  //   parentId,
  //   author,
  //   date,
  // }) {
  //   try {
  //     return await this.databases.createDocument(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionIDComments,
  //       ID.unique(),
  //       {
  //         documentID,
  //         userID,
  //         commentText,
  //         parentId,
  //         author,
  //         date,
  //       },
  //     );
  //   } catch (error) {
  //     console.error(
  //       "Appwrite :: appwriteConfig :: createComment :: error",
  //       error,
  //     );
  //   }
//   }
    // * update like count method
  // async updateLike(documentID, likesCount, dislikesCount) {
  //   try {
  //     return await this.databases.updateDocument(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionIDLikes,
  //       documentID,
  //       {
  //         likesCount,
  //         dislikesCount,
  //       },
  //     );
  //   } catch (error) {
  //     console.error("Appwrite :: appwriteConfig :: updateLike :: error", error);
  //     return false;
  //   }
  // }
  // * update comment method
  // async editComment(documentID, commentText) {
  //   try {
  //     return await this.databases.updateDocument(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionIDComments,
  //       documentID,
  //       {
  //         commentText,
  //       },
  //     );
  //   } catch (error) {
  //     console.error(
  //       "Appwrite :: appwriteConfig :: editComment :: error",
  //       error,
  //     );
  //     return false;
  //   }
  // }

  // * update post
//   async updatePost(
//     slug,
//     { title, content, featuredImage, status, quesPara, hashTags },
//   ) {
//     try {
//       return await this.databases.updateDocument(
//         conf.appwriteDatabaseID,
//         conf.appwriteCollectionID,
//         slug,
//         {
//           title,
//           content,
//           status,
//           featuredImage,
//           quesPara,
//           hashTags,
//         },
//       );
//     } catch (error) {
//       console.log("Appwrite :: appwriteConfig :: updatePost :: error", error);
//     }
//   }

  // * get all like count method
  // async getALlReactions(queries = []) {
  //   try {
  //     const allLikes = await this.databases.listDocuments(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionIDReactions,
  //       queries,
  //     );
  //     return allLikes;
  //   } catch (error) {
  //     console.log("Appwrite :: appwriteConfig :: getAllLike :: error", error);
  //     return false;
  //   }
  // }
  // * Get All Posts Method
  // async getAllPost(queries = []) {
  //   try {
  //     const allPosts = await this.databases.listDocuments(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionID,
  //       queries,
  //     );
  //     return allPosts;
  //   } catch (error) {
  //     console.log("Appwrite :: appwriteConfig :: getAllPost :: error", error);
  //     return false;
  //   }
  // }
  // * Get all the comments method
  // async getAllComments(queries = []) {
  //   try {
  //     const allComments = await this.databases.listDocuments(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionIDComments,
  //       queries,
  //     );
  //     return allComments;
  //   } catch (error) {
  //     console.log(
  //       "Appwrite :: appwriteConfig :: getAllComments :: error",
  //       error,
  //     );
  //     return false;
  //   }
  // }
    // * delete like count method
  // async deleteLike(documentID) {
  //   try {
  //     await this.databases.deleteDocument(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionIDLikes,
  //       documentID,
  //     );
  //     return true;
  //   } catch (error) {
  //     console.error("Appwrite :: appwriteConfig :: deleteLike :: error", error);
  //     return false;
  //   }
  // }
  // * delete comment method
  // async deleteComment(documentID) {
  //   try {
  //     await this.databases.deleteDocument(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionIDComments,
  //       documentID,
  //     );
  //     return true;
  //   } catch (error) {
  //     console.error(
  //       "Appwrite :: appwriteConfig :: deleteComment :: error",
  //       error,
  //     );
  //     return false;
  //   }
  // }
  // * Delete Post Method
  // async deletePost(slug) {
  //   try {
  //     await this.databases.deleteDocument(
  //       conf.appwriteDatabaseID,
  //       conf.appwriteCollectionID,
  //       slug,
  //     );
  //     return true;
  //   } catch (error) {
  //     console.log("Appwrite :: appwriteConfig :: deletePost :: error", error);
  //     return false;
  //   }
  // }