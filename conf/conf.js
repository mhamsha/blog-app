const conf = {
  appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  tinymceApiKey:String(import.meta.env.VITE_TINYMCE_API_KEY),
  cloudFlareSiteKey:String(import.meta.env.VITE_CLOUDFLARE_SITE_KEY),
};
export default conf;
