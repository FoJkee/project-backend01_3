import {Request, Response, Router} from "express";
import {repositoryPosts} from "../repositories/posts-repositories";
import {postMaddleware} from "../middleware/post-maddleware";
import {errorsMessages} from "../middleware/errorsmessages";
import {authorizeMiddleware} from "../middleware/authorize";

export const routingPosts = Router()


routingPosts.get('/', async (req: Request, res: Response) => {

    const postsGet = await repositoryPosts.findPosts()
    res.status(200).json(postsGet)

})
routingPosts.post('/', authorizeMiddleware, postMaddleware, errorsMessages, async (req: Request, res: Response) => {

    console.log(req.body.blogName)
    console.log(req.body.blogId)
    const newPosts = await repositoryPosts.createPosts(req.body.title,
        req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName)
    res.status(201).json(newPosts)

})
routingPosts.get('/:id', async (req: Request, res: Response) => {

    const postsGetId = await repositoryPosts.findPostsId(req.params.id)
   if (postsGetId) {
       res.status(200).json(postsGetId)
   } else {
       res.sendStatus(404)
   }

})
routingPosts.put('/:id', authorizeMiddleware, postMaddleware, errorsMessages, async (req: Request, res: Response) => {
    const putBlogs = await repositoryPosts.updatePosts(req.params.id, req.body.title,
        req.body.shortDescription, req.body.content, req.body.blogId)
    if (putBlogs) {
        const putBlogsId = repositoryPosts.findPostsId(req.params.id)
        res.status(204).send(putBlogsId)
    } else {
        res.sendStatus(404)
    }

})
routingPosts.delete('/:id', authorizeMiddleware, postMaddleware, async (req: Request, res: Response) => {

    const postDelete = await repositoryPosts.deletePosts(req.params.id)
    if (postDelete) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})