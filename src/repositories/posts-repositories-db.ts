import {postsType} from "../types/types";
import {client} from "../db/db";


export let __posts: postsType[] = []
const date = new Date()
export const repositoryPosts = {

    async findPosts(): Promise<postsType[]> {
        client.db('')

        return __posts
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

        __posts.push(postsPost)
        return postsPost

    },

    async findPostsId(id: string): Promise<postsType | undefined> {
        let findGetId = __posts.find(el => el.id === id)
        return findGetId
    },

    async updatePosts(id: string, title: string, shortDescription: string,
                      content: string, blogId: string): Promise<boolean> {
        const postsPut = __posts.find(el => el.id === id)
        if (postsPut) {
            postsPut.title = title
            postsPut.shortDescription = shortDescription
            postsPut.content = content
            postsPut.blogId = blogId
            return true
        } else {
            return false
        }
    },

    async deletePosts(id: string): Promise<boolean | null> {
        const post = this.findPostsId(id)
        if (!post) return null
        __posts = __posts.filter(p => p.id !== id)
        return true

    },
    async deletePostsAll() {
        __posts.splice(0)
    }

}

