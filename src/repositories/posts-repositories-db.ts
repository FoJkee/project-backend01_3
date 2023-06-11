import {postsType} from "../types/types";
import {postsCollection} from "./db";



const date = new Date()
export const repositoryPosts = {

    async findPosts(): Promise<postsType[]> {
        return await postsCollection.find({}).toArray()
    },

    async createPosts(title: string, shortDescription: string,
                      content: string, blogId: string, blogName: string):Promise<postsType> {

        const postsPost = {
            id: (+date).toString(),
            title: title,
            shortDescription: shortDescription,
            content:content,
            blogId:blogId,
            blogName: blogName,
            createdAt: date.toISOString()
        }
        await postsCollection.insertOne(postsPost)
        return postsPost

    },

    async findPostsId(id: string): Promise<postsType | null> {

        let findGetId: postsType | null = await postsCollection.findOne({id: id})
        if (findGetId) {
            return findGetId
        } else {
            return null
        }
    },

    async updatePosts(id: string, title: string, shortDescription: string,
                      content: string, blogId: string): Promise<boolean> {

        const result = await postsCollection
            .updateOne({id: id}, {
                title: title, shortDescription: shortDescription,
                content: content,
                blogId: blogId
            })
        return result.matchedCount === 1
    },

    async deletePosts(id: string): Promise<boolean | null> {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    async deletePostsAll() {
        const result = await postsCollection.deleteMany({})
        return result.deletedCount === 1
    }
}

