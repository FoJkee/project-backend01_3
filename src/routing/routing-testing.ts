import {Request, Response, Router} from "express";
import {blogs, repositoryBlogs} from "../repositories/blogs-repositories";
import {posts, repositoryPosts} from "../repositories/posts-repositories";


export const testingRouter = Router()

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    await repositoryBlogs.deleteBlogsAll()
    await repositoryPosts.deletePostsAll()
    res.status(204).json(blogs)
})