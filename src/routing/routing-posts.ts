import {Request, Response, Router} from "express";
import {repositoryPosts} from "../repositories/posts-repositories";
import {postMaddleware} from "../middleware/post-maddleware";
import {errorsMessages} from "../middleware/errorsmessages";
import {blogidMiddleware} from "../middleware/blogid-middleware";
import {authorizeMiddleware} from "../middleware/authorize";

export const routingPosts = Router()


routingPosts.get('/', (req: Request, res: Response) => {

    const postsGet = repositoryPosts.findPosts()
    res.status(200).json(postsGet)

})
routingPosts.post('/',authorizeMiddleware,  postMaddleware, blogidMiddleware, errorsMessages,(req: Request, res: Response) => {

    console.log(req.body.blogName)
    const newPosts = repositoryPosts.createPosts(req.body.title,
        req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName)
    res.status(201).json(newPosts)

})
routingPosts.get('/:id', (req: Request, res: Response) => {

    const postsGetId = repositoryPosts.findPostsId(req.params.id)
    postsGetId ? res.status(200).json(postsGetId) : res.sendStatus(404)

})
routingPosts.put('/:id',authorizeMiddleware,  postMaddleware, blogidMiddleware,errorsMessages,(req: Request, res: Response) => {
    const putBlogs = repositoryPosts.updatePosts(req.params.id, req.body.title,
        req.body.shortDescription, req.body.content, req.body.blogId)
    if (putBlogs) {
        const putBlogsId = repositoryPosts.findPostsId(req.params.id)
        res.status(204).send(putBlogsId)
    } else {
        res.sendStatus(404)
    }

})
routingPosts.delete('/:id',authorizeMiddleware,postMaddleware, (req: Request, res: Response) => {

    const postDelete = repositoryPosts.deletePosts(req.params.id)
    postDelete ? res.sendStatus(204) : res.sendStatus(404)

})