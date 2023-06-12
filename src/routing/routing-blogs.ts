import {Request, Response, Router} from "express";
import {authorizeMiddleware} from "../middleware/authorize";
import {errorsMessages} from "../middleware/errorsmessages";
import {blogsMiddleware} from "../middleware/blogs-middleware";
import {repositoryBlogs} from "../repositories/blogs-repositories-db";
import {BlogViewType} from "../types/types";


export const routingBlogs = Router()

routingBlogs.get('/', async (req: Request, res: Response) => {

    const blogsGet = await repositoryBlogs.findBlogs()
    res.status(200).send(blogsGet)
})

routingBlogs.post('/', authorizeMiddleware, blogsMiddleware, errorsMessages,
    async (req: Request, res: Response) => {

        const newBlogs = await repositoryBlogs.createBlogs(req.body.name, req.body.description,
            req.body.websiteUrl)
            res.status(201).json(newBlogs)
    })
routingBlogs.get('/:id', async (req: Request, res: Response) => {

    const blogsGetId = await repositoryBlogs.findBlogsId(req.params.id)
    if (blogsGetId) {
        res.status(200).json(blogsGetId)
    } else {
        res.sendStatus(404)
    }

})
routingBlogs.put('/:id', authorizeMiddleware, blogsMiddleware, errorsMessages,
    async (req: Request, res: Response) => {
        const blogsPut = await repositoryBlogs.updateBlogs(req.params.id, req.body.name,
            req.body.description, req.body.websiteUrl)

        if (blogsPut) {
            const blogsPutId = await repositoryBlogs.findBlogsId(req.params.id)
            res.status(204).send(blogsPutId)
        } else {
            res.sendStatus(404)
        }

    })
routingBlogs.delete('/:id', authorizeMiddleware, blogsMiddleware, async (req: Request, res: Response) => {

    const deleteBlogs = await repositoryBlogs.deleteBlogs(req.params.id)

    if (!deleteBlogs) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }
})