import { Client, Databases, Storage, ID } from "appwrite";
import conf from "../conf/conf.js";

class ConfigService {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client.setEndpoin(conf.appwriteEndpoint).setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  // * Create Post Method
  async createPost({ title, slug, content, status, featuredImage, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
          userID,
        }
      );
    } catch (error) {
      console.log("Appwrite :: appwriteConfig :: createPost :: error", error);
    }
  }
  // * Update Post Method
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite :: appwriteConfig :: updatePost :: error", error);
    }
  }
  // * Get Post Method
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log("Appwrite :: appwriteConfig :: getPost :: error", error);
      return false;
    }
  }
  // * Get All Posts Method
  async getAllPost() {
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseID, conf.appwriteCollectionID);
    } catch (error) {
      console.log("Appwrite :: appwriteConfig :: getAllPost :: error", error);
      return false;
    }
  }
  // * Delete Post Method
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID, slug);
      return true;
    } catch (error) {
      console.log("Appwrite :: appwriteConfig :: deletePost :: error", error);
      return false;
    }
  }

  // * Get File Preview Method storage
  getFilePreview(fileID) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketID, fileID);
    } catch (error) {
      console.log("Appwrite :: appwriteConfig :: getFilePreview :: error", error);
      return false;
    }
  }

  // * Upload File Method storage
  async uploadFile(file) {
    try {
      return await this.storage.createFile(conf.appwriteBucketID, ID.unique, file);
    } catch (error) {
      console.log("Appwrite :: appwriteConfig :: uploadFile :: error", error);
      return false;
    }
  }
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
