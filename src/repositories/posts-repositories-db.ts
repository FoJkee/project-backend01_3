import {postsCollection} from "./db";
import {PostsType} from "../types/types";


type PostViewType = PostsType & { id: string }


const date = new Date()
export const repositoryPosts = {

    async findPosts(): Promise<PostViewType[]> {
        const result = await postsCollection.find({}).toArray()
        return result.map(el => ({
            id: el._id.toString(), title: el.title, shortDescription: el.shortDescription, content: el.content,
            blogId: el.blogId, blogName: el.blogName, createdAt: el.createdAt
        }))
    },

    async createPosts(title: string, shortDescription: string,
                      content: string, blogId: string, blogName: string): Promise<PostsType> {

        const postsPost = {
            id: (+date).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: date.toISOString()
        }
        const result = await postsCollection.insertOne(postsPost)
        return postsPost

    },

    async findPostsId(id: string): Promise<PostsType | null> {

        let findGetId: PostsType | null = await postsCollection.findOne({id: id})
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

