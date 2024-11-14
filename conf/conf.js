const conf = {
  appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteCollectionIDReactions: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_Reactions,
  ),
  appwriteCollectionIDComments: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_COMMENTS,
  ),
  appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  tinymceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
  cloudFlareSiteKey: String(import.meta.env.VITE_CLOUDFLARE_SITE_KEY),
  geminiApiKey: String(import.meta.env.VITE_GEMINI_API_KEY),
};
export default conf;
