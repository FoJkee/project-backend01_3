import {postsType} from "../types/types";


export let posts: postsType[] = []
const date = new Date()
export const repositoryPosts = {

    async findPosts() {
        return posts
    },

    async createPosts(title: string, shortDescription: string,
                content: string, blogId: string, blogName: string) {

        const postsPost = {
            id: (+date).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName
        }

        posts.push(postsPost)
        return postsPost

    },

    async findPostsId(id: string) {
            let findGetId = posts.find(el => el.id === id)
            return findGetId
    },

   async updatePosts (id: string, title: string, shortDescription: string,
                 content: string, blogId: string){
        const postsPut = posts.find(el => el.id === id)
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

    async deletePosts(id: string) {
        const post = posts.find(p => p.id === id)
        if (!post) return null
        posts = posts.filter(p => p.id !== id)
        return true

    },
    async deletePostsAll(){
        posts.splice(0)
    }

}

