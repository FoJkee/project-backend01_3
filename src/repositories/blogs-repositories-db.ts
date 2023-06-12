import {BlogsType} from "../types/types";
import {blogsCollection} from "./db";

type BlogViewType = BlogsType & { id: string }

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

    async createBlogs(name: string, description: string, websiteUrl: string): Promise<BlogsType | null> {
        const blogsPost = {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: date.toISOString(),
            isMembership: false
        }
        const result =  await blogsCollection.insertOne(blogsPost)
        if(blogsPost){
            return {
                name: blogsPost.name,
                description: blogsPost.description,
                websiteUrl: blogsPost.websiteUrl,
                createdAt: blogsPost.createdAt,
                isMembership: blogsPost.isMembership
            }
        } else {
            return null
        }

    },

    async findBlogsId(id: string): Promise<BlogViewType | null> {
        let blogsGet = await blogsCollection.findOne({id: id})
        if (blogsGet) {
            return {
                id: blogsGet._id.toString(),
                name: blogsGet.name,
                description: blogsGet.description,
                websiteUrl: blogsGet.websiteUrl,
                createdAt: blogsGet.createdAt,
                isMembership: blogsGet.isMembership
            }
        } else {
            return null
        }
    },

    async updateBlogs(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogsCollection
            .updateOne({id: id}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})

        return result.matchedCount === 1

    },
    async deleteBlogs(id: string): Promise<BlogsType | boolean | null> {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    async deleteBlogsAll() {
        const result = await blogsCollection.deleteMany({})
        return result.deletedCount === 1
    }

}

