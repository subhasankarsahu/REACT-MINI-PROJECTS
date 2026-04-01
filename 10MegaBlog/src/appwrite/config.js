import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.TablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        documentId: ID.unique(),
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.TablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        documentId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.TablesDB.deleteRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPosts(slug) {
    try {
      return await this.databases.TablesDB.listRows(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return [];
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.TablesDB.listRows(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return [];
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {

    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
    }
}

const service = new Service();
export default service;