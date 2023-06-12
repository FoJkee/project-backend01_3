import {postsCollection} from "./db";
import {PostsType, PostViewType} from "../types/types";
import {ObjectId, WithId} from "mongodb";

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
                      content: string, blogId: string, blogName: string): Promise<PostViewType> {

        const postsPost = {
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: date.toISOString()
        }

        const result = await postsCollection.insertOne(postsPost)

        return {
            id: result.insertedId.toString(),
            title: postsPost.title,
            shortDescription: postsPost.shortDescription,
            content: postsPost.content,
            blogId: postsPost.blogId,
            blogName: postsPost.blogName,
            createdAt: postsPost.createdAt
        }

    },

    async findPostsId(id: string): Promise<PostViewType | null> {

        let findGetId: WithId<PostsType> | null = await postsCollection.findOne({_id: new ObjectId(id)})
        if (findGetId) {
            return {
                id: findGetId._id.toString(),
                title: findGetId.title,
                shortDescription: findGetId.shortDescription,
                content: findGetId.content,
                blogId: findGetId.blogId,
                blogName: findGetId.blogName,
                createdAt: findGetId.createdAt
            }
        } else {
            return null
        }
    },


    async updatePosts(id: string, title: string, shortDescription: string,
                      content: string, blogId: string): Promise<boolean> {

        const result = await postsCollection
            .updateOne({_id: new ObjectId(id)}, {
                "title": title,
                "shortDescription": shortDescription,
                "content": content,
                "blogId": blogId
            })
        return result.matchedCount === 1
    },

    async deletePosts(id: string): Promise<boolean | null> {
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deletePostsAll() {
        const result = await postsCollection.deleteMany({})
        return result.deletedCount === 1
    }
}

