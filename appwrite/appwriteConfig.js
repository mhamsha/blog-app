import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf.js";

class ConfigService {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  // * create post,comment and like method
  async createEntity(entityType, params) {
    let collectionID;
    let documentID = params.slug || ID.unique();
    let data;

    switch (entityType) {
      case "post": {
        const {
          title,
          content,
          status,
          featuredImage,
          userID,
          quesPara,
          hashTags,
          author,
        } = params;
        collectionID = conf.appwriteCollectionID;
        data = {
          title,
          content,
          status,
          featuredImage,
          userID,
          quesPara,
          hashTags,
          author,
        };
        break;
      }
      case "reaction": {
        const { slug, userID, likesCount, dislikesCount } = params;
        collectionID = conf.appwriteCollectionIDReactions;
        data = { slug, userID, likesCount, dislikesCount, articles: slug };
        documentID = ID.unique();
        break;
      }
      case "comment": {
        const {
          documentID,
          userID,
          commentText,
          parentID,
          author,
          date,
          nestNumber,
        } = params;
        collectionID = conf.appwriteCollectionIDComments;
        data = {
          documentID,
          userID,
          commentText,
          parentID,
          author,
          date,
          articles: documentID,
          nestNumber,
        };
        break;
      }
      default:
        throw new Error(`Unsupported entity type: ${entityType}`);
    }
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        collectionID,
        documentID,
        data,
      );
    } catch (error) {
      console.error(
        `Appwrite :: appwriteConfig :: createEntity :: ${entityType} :: error`,
        error,
      );
    }
  }

  // * Update Post,comment and like Method

  async updateEntity(entityType, documentID, params) {
    let collectionID;
    let data;

    switch (entityType) {
      case "post": {
        const { title, content, featuredImage, status, quesPara, hashTags } =
          params;
        collectionID = conf.appwriteCollectionID;
        data = { title, content, featuredImage, status, quesPara, hashTags };
        break;
      }
      case "reaction": {
        const { likesCount, dislikesCount } = params;
        collectionID = conf.appwriteCollectionIDReactions;
        data = { likesCount, dislikesCount };
        break;
      }
      case "comment": {
        const { commentText } = params;
        collectionID = conf.appwriteCollectionIDComments;
        data = { commentText };
        break;
      }
      default:
        throw new Error(`Unsupported entity type: ${entityType}`);
    }

    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        collectionID,
        documentID,
        data,
      );
    } catch (error) {
      console.error(
        `Appwrite :: updateEntity :: ${entityType} :: error`,
        error,
      );
      return false;
    }
  }

  // * get posts, comments and like method
  async getAllEntity(entityType, queries = []) {
    let collectionID;
    switch (entityType) {
      case "post":
        collectionID = conf.appwriteCollectionID;
        break;
      case "reaction":
        collectionID = conf.appwriteCollectionIDReactions;
        break;
      case "comment":
        collectionID = conf.appwriteCollectionIDComments;
        break;

      default:
        throw new Error(`Unsupported entity type: ${entityType}`);
    }
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        collectionID,
        queries,
      );
    } catch (error) {
      console.log(
        "Appwrite :: appwriteConfig :: getAllComments :: error",
        error,
      );
      return false;
    }
  }

  // * delete post,comment and like method
  async deleteEntity(entityType, documentID) {
    let collectionID;
    switch (entityType) {
      case "post":
        collectionID = conf.appwriteCollectionID;
        break;
      case "reaction":
        collectionID = conf.appwriteCollectionIDReactions;
        break;
      case "comment":
        collectionID = conf.appwriteCollectionIDComments;
        break;

      default:
        throw new Error(`Unsupported entity type: ${entityType}`);
    }
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        collectionID,
        documentID,
      );
      return true;
    } catch (error) {
      console.log("Appwrite :: appwriteConfig :: deletePost :: error", error);
      return false;
    }
  }
  // * Get a Post Method
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
      );
    } catch (error) {
      console.log("Appwrite :: appwriteConfig :: getPost :: error", error);
      return false;
    }
  }

  // * Get File Preview Method storage
  getFilePreview(fileID) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketID, fileID);
    } catch (error) {
      console.log(
        "Appwrite :: appwriteConfig :: getFilePreview :: error",
        error,
      );
      return false;
    }
  }

  // * Upload File Method storage
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite :: appwriteConfig :: uploadFile :: error", error);
      return false;
    }
  }
  //* Delete File Method storage
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }
}
const appwriteConfigService = new ConfigService();
export default appwriteConfigService;
