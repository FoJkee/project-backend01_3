import {blogsType} from "../types/types";


export let blogs: blogsType[] = []
const date = new Date()

export const repositoryBlogs = {

    async findBlogs(): Promise<blogsType[]> {
        return blogs
    },

    async createBlogs(name: string, description: string, websiteUrl: string): Promise<blogsType> {

        const blogsPost = {
            id: (+date).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: date.toISOString(),
            isMembership: true
        }
        blogs.push(blogsPost)
        return blogsPost
    },

    async findBlogsId(id: string): Promise<blogsType | null> {
        let blogsGet = blogs.find(el => el.id === id)
        if(blogsGet) {
            return blogsGet
        } else {
            return null
        }
    },

    async updateBlogs(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
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
    async deleteBlogs(id: string): Promise<blogsType | boolean | null> {
        const blog = this.findBlogsId(id)
        if (!blog) return null
        blogs = blogs.filter(b => b.id !== id)
        return true

    },
    async deleteBlogsAll() {
        blogs.splice(0)
    }

}

