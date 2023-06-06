import {Request, Response, Router} from "express";
import {blogs, repositoryBlogs} from "../repositories/blogs-repositories";
import {posts, repositoryPosts} from "../repositories/posts-repositories";


export const testingRouter = Router()

testingRouter.delete('/all-data', (req: Request, res: Response) => {
        repositoryBlogs.deleteBlogsAll()
        repositoryPosts.deletePostsAll()
        res.status(204).json(blogs)
})