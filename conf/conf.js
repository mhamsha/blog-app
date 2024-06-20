const conf = {
  appwriteEndpoint: String(process.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectID: String(process.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteCollectionID: String(process.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketID: String(process.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteDatabaseID: String(process.meta.env.VITE_APPWRITE_DATABASE_ID),
};
export default conf;
