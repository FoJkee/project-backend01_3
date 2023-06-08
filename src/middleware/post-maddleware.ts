import {body} from "express-validator";
import {blogs, repositoryBlogs} from "../repositories/blogs-repositories";


export const postMaddleware = [

    body('title').exists().isString().trim().isLength({
        min: 1,
        max: 30
    }).withMessage('String length is not more than 30 symbols'),
    body('shortDescription').exists().isString().trim().isLength({
        min: 1,
        max: 100
    }).withMessage('String length is not more than 100 symbols'),
    body('content').exists().isString().trim().isLength({
        min: 1,
        max: 1000
    }).withMessage('String length is not more than 1000 symbols'),
    body('blogId').exists().isString().isLength({min: 1, max: 100})
        .withMessage('Incorrect blogId')
        .custom((v, {req}) => {
            console.log(req.body)
            const blog = blogs.find(b => b.id === v)
            if (!blog) throw new Error()
            req.body.blogName = blog.name
            req.body.blogId = blog.id
            return true
        })
]