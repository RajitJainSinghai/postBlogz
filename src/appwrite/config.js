import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    Databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid);
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);
    }
    //createPost isliye title, slug, content, featuredImage, userId, status pass kiya hai kyuki post create karne ke liye ye values pass karni padegi
    async createPost({title, slug, content, featuredImage, userId, status }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status,
                }
            )
            
        } catch (error) {
            console.log("error", error);
        }
            
    }
    // slug bahar isliye hai kyuki jab bhi koi post update karega toh slug change nahi hoga
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            console.log("error", error);
            
            
        }
    }
    //deletePost isliye slug pass kiya hai kyuki delete portion me slug pass karna padega to delete the post
    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, 
            )
            return true;
            
        } catch (error) {
            console.log("error", error);
            return false;
        }
    }
    //to get the post we need to pass the slug
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("error", error); 
            return false   
        }
    }
    //getPosts isliye queries pass kiya hai kyuki agar koi user post ko search karega toh usko search karne me help milegi
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
            
        } catch (error) {
            console.log("error", error);
            return false
            
        }

    }

    // file upload service , file upload karne ke liye file pass karna padega to upload the file
    async uploadFile() {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            );
            
        } catch (error) {
            console.log("error", error);
            
        }
    }
    //deleteFile isliye fileId pass kiya hai kyuki delete karne ke liye fileId pass karna padega to delte the file
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            
        } catch (error) {
            console.log("error", error);    
            return false;
            
        }
    }
    //getFilePreview isliye fileId pass kiya hai kyuki file preview ke liye fileId pass karna padega to preview the file
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,  
            fileId,
        )
    }
}

//service ko export karne me koi aisa sence hai nahi to object nikal ke dede toh to values mil jayegi 
const service = new Service()
export default service