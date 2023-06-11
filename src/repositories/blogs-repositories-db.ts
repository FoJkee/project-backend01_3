import {blogsType} from "../types/types";
import {blogsCollection} from "./db";

const date = new Date()
export const repositoryBlogs = {

    async findBlogs(): Promise<blogsType[]> {
       return blogsCollection.find({}).toArray()
    },

    async createBlogs(name: string, description: string, websiteUrl: string): Promise<blogsType> {
        const blogsPost = {
            id: (+date).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: date.toISOString(),
            isMembership: false
        }
        const result = await blogsCollection.insertOne(blogsPost)
        return blogsPost
    },

    async findBlogsId(id: string): Promise<blogsType | null> {
        let blogsGet: blogsType | null = await blogsCollection.findOne({id: id})
        if (blogsGet) {
            return blogsGet
        } else {
            return null
        }
    },

    async updateBlogs(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
       const result = await blogsCollection
            .updateOne({id:id}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})

       return  result.matchedCount === 1

    },
    async deleteBlogs(id: string): Promise<blogsType | boolean | null> {
       const result = await blogsCollection.deleteOne({id:id})
       return result.deletedCount  === 1
    },

    async deleteBlogsAll() {
        const result = await blogsCollection.deleteMany({})
        return result.deletedCount  === 1
    }

}

