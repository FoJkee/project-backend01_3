import {Request, Response, Router} from "express";
import {postMiddleware} from "../middleware/post-middleware";
import {errorsMessages} from "../middleware/errorsmessages";
import {authorizeMiddleware} from "../middleware/authorize";
import {repositoryPosts} from "../repositories/posts-repositories-db";


export const routingPosts = Router()


routingPosts.get('/', async (req: Request, res: Response) => {

    const postsGet = await repositoryPosts.findPosts()
    res.status(200).send(postsGet)

})
routingPosts.post('/', authorizeMiddleware, postMiddleware, errorsMessages, async (req: Request, res: Response) => {

    const newPosts = await repositoryPosts.createPosts(req.body.title,
        req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName)
    res.status(201).send(newPosts)

})




routingPosts.get('/:id', async (req: Request, res: Response) => {
    if(!req.params.id){
        res.sendStatus(404)
        return
    }
    const postsGetId = await repositoryPosts.findPostsId(req.params.id)

    if (postsGetId) {
        res.status(200).send(postsGetId)
    } else {
        res.sendStatus(404)
    }

})
routingPosts.put('/:id', authorizeMiddleware, postMiddleware, errorsMessages, async (req: Request, res: Response) => {
    if(!req.params.id){
        res.sendStatus(404)
        return
    }
    const putBlogs = await repositoryPosts.updatePosts(req.params.id, req.body.title,
        req.body.shortDescription, req.body.content, req.body.blogId)
    if (putBlogs) {
        const putBlogsId = await repositoryPosts.findPostsId(req.params.id)
        res.status(204).send(putBlogsId)
    } else {
        res.sendStatus(404)
    }

})
routingPosts.delete('/:id', authorizeMiddleware, postMiddleware, async (req: Request, res: Response) => {

    if(!req.params.id){
        res.sendStatus(404)
        return
    }

    const postDelete = await repositoryPosts.deletePosts(req.params.id)
    if (!postDelete) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }

})