import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";


class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId)



        this.bucket = new Storage(this.client);
        this.databases = new Databases(this.client);
    }


    async createPost({name, content, featuredImage
, userId, fileType, likes = 0}){
        try {

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                   
                    content,
                    featuredImage,
                    userId,
                    name,
                    fileType,
                    likes
                }
            )
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async updateLike(documentId,{name, content, featuredImage
, userId, fileType, likes}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
                {
                    
                    content,
                    featuredImage,
                    userId,
                    name,
                    fileType,
                    likes
                }

            )
            
        } catch (error) {
            console.log(error);
            return false
            
        }
    }

    async getPosts(queries = [Query.orderDesc('$createdAt')]){
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
    
            )
        } catch (error) {
            console.log(error);
            return false
        }
    }
    
   

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file

            )
        } catch (error) {
            console.log(error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }

   

}

const service = new Service();

export default service;