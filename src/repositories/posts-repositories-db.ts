import {postsType} from "../types/types";
import {client} from "./db";


export let __posts: postsType[] = []
const date = new Date()
export const repositoryPosts = {

    async findPosts(): Promise<postsType[]> {
        return client.db('social_network').collection<postsType>('posts').find({}).toArray()
    },

    async createPosts(title: string, shortDescription: string,
                      content: string, blogId: string, blogName: string): Promise<postsType> {

        const postsPost = {
            id: (+date).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: date.toISOString()
        }
        const result = await client.db('social_network').collection<postsType>('posts').insertOne(postsPost)
        return postsPost

    },

    async findPostsId(id: string): Promise<postsType | null> {

        let findGetId: postsType | null = await client.db('social_network')
            .collection<postsType>('posts').findOne({id: id})
        if (findGetId) {
            return findGetId
        } else {
            return null
        }
    },

    async updatePosts(id: string, title: string, shortDescription: string,
                      content: string, blogId: string): Promise<boolean> {

        const result = await client.db('social_network')
            .collection<postsType>('posts')
            .updateOne({id: id}, {
                title: title, shortDescription: shortDescription,
                content: content,
                blogId: blogId
            })
        return result.matchedCount === 1
    },

    async deletePosts(id: string): Promise<boolean | null> {
        const result = await client.db('social_network')
            .collection<postsType>('posts').deleteOne({id: id})
        return result.deletedCount === 1
    },

    async deletePostsAll() {
        const result = await client.db('social_network')
            .collection<postsType>('posts').deleteMany({})
        return result.deletedCount === 1
    }
}

