// import {postsType} from "../types/types";
//
//
// export let posts: postsType[] = []
// const date = new Date()
// export const repositoryPosts = {
//
//     async findPosts(): Promise<postsType[]> {
//         return posts
//     },
//
//     async createPosts(title: string, shortDescription: string,
//                       content: string, blogId: string, blogName: string): Promise<postsType> {
//
//         const postsPost = {
//             id: (+date).toString(),
//             title: title,
//             shortDescription: shortDescription,
//             content: content,
//             blogId: blogId,
//             blogName: blogName,
//             createdAt: date.toISOString()
//         }
//
//         posts.push(postsPost)
//         return postsPost
//
//     },
//
//     async findPostsId(id: string): Promise<postsType | null> {
//         let findGetId = posts.find(el => el.id === id)
//         if (findGetId) {
//             return findGetId
//         } else {
//             return null
//         }
//     },
//
//     async updatePosts(id: string, title: string, shortDescription: string,
//                       content: string, blogId: string): Promise<boolean> {
//         const postsPut = posts.find(el => el.id === id)
//         if (postsPut) {
//             postsPut.title = title
//             postsPut.shortDescription = shortDescription
//             postsPut.content = content
//             postsPut.blogId = blogId
//             return true
//         } else {
//             return false
//         }
//     },
//
//     async deletePosts(id: string): Promise<boolean | null> {
//         const post = this.findPostsId(id)
//         if (!post) return null
//         posts = posts.filter(p => p.id !== id)
//         return true
//
//     },
//     async deletePostsAll() {
//         posts.splice(0)
//     }
//
// }
//
