const appwriteUrl = String(import.meta.env.VITE_APPWRITE_URL || "").trim()

const conf = {
    appwriteUrl: appwriteUrl.startsWith("http")
        ? appwriteUrl
        : `https://${appwriteUrl}`,
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf
