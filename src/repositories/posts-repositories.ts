import {postsType} from "../types/types";


export let posts: postsType[] = []
const date = new Date()
export const repositoryPosts = {

    findPosts() {
        return posts
    },

    createPosts(title: string, shortDescription: string,
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

    findPostsId(id: string) {
            let findGetId = posts.find(el => el.id === id)
            return findGetId
    },

    updatePosts (id: string, title: string, shortDescription: string,
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

    deletePosts(id: string) {
        const post = posts.find(p => p.id === id)
        if (!post) return null
        posts = posts.filter(p => p.id !== id)
        return true

    },
    deletePostsAll(){
        posts.splice(0)
    }

}

