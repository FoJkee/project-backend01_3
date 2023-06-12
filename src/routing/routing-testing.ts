import {Request, Response, Router} from "express";
import {repositoryBlogs} from "../repositories/blogs-repositories";
import {repositoryPosts} from "../repositories/posts-repositories";


export const testingRouter = Router()

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    await repositoryBlogs.deleteBlogsAll()
    await repositoryPosts.deletePostsAll()
    const blogs = repositoryBlogs.findBlogs()
    res.status(204).json(blogs)
})