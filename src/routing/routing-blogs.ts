import {Request, Response, Router} from "express";
import {repositoryBlogs} from "../repositories/blogs-repositories";
import {authorizeMiddleware} from "../middleware/authorize";
import {errorsMessages} from "../middleware/errorsmessages";
import {blogsMiddleware} from "../middleware/blogs-middleware";


export const routingBlogs = Router()
routingBlogs.get('/', (req: Request, res: Response) => {
    const blogsGet = repositoryBlogs.findBlogs()
    res.status(200).send(blogsGet)
})
routingBlogs.post('/',authorizeMiddleware,  blogsMiddleware, errorsMessages,
    (req: Request, res: Response) => {

        const newBlogs = repositoryBlogs.createBlogs(req.body.name, req.body.description,
            req.body.websiteUrl)
        res.status(201).json(newBlogs)
    })
routingBlogs.get('/:id', (req: Request, res: Response) => {
    const blogsGetId = repositoryBlogs.findBlogsId(req.params.id)
    blogsGetId ? res.status(200).json(blogsGetId) : res.sendStatus(404)
})
routingBlogs.put('/:id', authorizeMiddleware, blogsMiddleware, errorsMessages,
    (req: Request, res: Response) => {
        const blogsPut = repositoryBlogs.updateBlogs(req.params.id, req.body.name,
            req.body.description, req.body.websiteUrl)
        if (blogsPut) {
            const blogsPutId = repositoryBlogs.findBlogsId(req.params.id)
            res.status(204).send(blogsPutId)
        } else {
            res.sendStatus(404)
        }

    })
routingBlogs.delete('/:id', authorizeMiddleware, blogsMiddleware,(req: Request, res: Response) => {

    const deleteBlogs = repositoryBlogs.deleteBlogs(req.params.id)

    if (!deleteBlogs) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)


})