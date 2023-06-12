import {BlogsType, BlogViewType} from "../types/types";
import {blogsCollection} from "./db";
import {ObjectId} from "mongodb";

const date = new Date()

export const repositoryBlogs = {

    async findBlogs(): Promise<BlogViewType[]> {
        const result = await blogsCollection.find({}).toArray()
        return result.map(el => ({
            name: el.name, id: el._id.toString(),
            description: el.description, websiteUrl: el.websiteUrl,
            createdAt: el.createdAt, isMembership: el.isMembership
        }))
    },

    async createBlogs(name: string, description: string, websiteUrl: string): Promise<string> {
        const blogsPost = {
            _id: new ObjectId(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: date.toISOString(),
            isMembership: false
        }
        const result = await blogsCollection.insertOne(blogsPost)
        return result.insertedId.toString()

    },

    async findBlogsId(id: string): Promise<BlogViewType | null> {
        let blogsGet = await blogsCollection.findOne({_id: new ObjectId(id)})
        console.log('blogsGet', blogsGet)
        if (blogsGet) {
            return {
                id: blogsGet._id.toString(),
                name: blogsGet.name,
                description: blogsGet.description,
                websiteUrl: blogsGet.websiteUrl,
                createdAt: date.toISOString(),
                isMembership: false

            }
        } else {
            return null
        }
    },

    async updateBlogs(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogsCollection
            .updateOne({_id: new ObjectId(id)}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})

        return result.matchedCount === 1

    },
    async deleteBlogs(id: string): Promise<boolean | null> {
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteBlogsAll() {
        const result = await blogsCollection.deleteMany({})
        return result.deletedCount === 1
    }

}

