import {blogsType} from "../types/types";



export let blogs: blogsType[] = []
const date = new Date()

export const repositoryBlogs = {

    findBlogs() {
        return blogs
    },

    createBlogs(name: string, description: string, websiteUrl: string) {

        const blogsPost = {
            id: (+date).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogs.push(blogsPost)
        return blogsPost
    },

    findBlogsId(id: string) {
        let blogsGet = blogs.find(el => el.id === id)
        return blogsGet
    },

    updateBlogs(id: string, name: string, description: string, websiteUrl: string) {
        const blogsPut = blogs.find(el => el.id === id)
        if (blogsPut) {
            blogsPut.name = name
            blogsPut.description = description
            blogsPut.websiteUrl = websiteUrl
            return true
        } else {
            return false
        }
    },
    deleteBlogs(id: string) {
        const blog = this.findBlogsId(id)
        if(!blog) return null
        blogs = blogs.filter(b => b.id !== id)
        return true

    },
    deleteBlogsAll(){
        blogs.splice(0)
    }

}

