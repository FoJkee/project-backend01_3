import {blogsType} from "../types/types";
import {client} from "./db";


let __blogs:blogsType[] = []
const date = new Date()

const blogsRepositoryDb = client.db('social_network').collection<blogsType>('blogs')
export const repositoryBlogs = {

    async findBlogs(): Promise<blogsType[]> {
       return blogsRepositoryDb.find({}).toArray()
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
        const result = await blogsRepositoryDb.insertOne(blogsPost)
        return blogsPost
    },

    async findBlogsId(id: string): Promise<blogsType | null> {
        let blogsGet: blogsType | null = await blogsRepositoryDb.findOne({id: id})
        if (blogsGet) {
            return blogsGet
        } else {
            return null
        }
    },

    async updateBlogs(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
       const result = await blogsRepositoryDb
            .updateOne({id:id}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})

       return  result.matchedCount === 1

    },
    async deleteBlogs(id: string): Promise<blogsType | boolean | null> {
       const result = await blogsRepositoryDb.deleteOne({id:id})
       return result.deletedCount  === 1
    },

    async deleteBlogsAll() {
        const result = await blogsRepositoryDb.deleteMany({})
        return result.deletedCount  === 1
    }

}

