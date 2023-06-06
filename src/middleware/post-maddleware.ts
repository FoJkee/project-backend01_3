import {body} from "express-validator";
import {blogs} from "../repositories/blogs-repositories";


export const postMaddleware = [

    body('title').exists().bail().isString().bail().trim().isLength({
        min: 1,
        max: 30
    }).withMessage('String length is not more than 30 symbols'),
    body('shortDescription').exists().bail().isString().bail().trim().isLength({
        min: 1,
        max: 100
    }).withMessage('String length is not more than 100 symbols'),
    body('content').exists().bail().isString().bail().trim().isLength({
        min: 1,
        max: 1000
    }).withMessage('String length is not more than 1000 symbols'),
    body('blogId').exists().bail().isString().bail().isLength({min: 1, max: 100})
        .withMessage('Incorrect blogId')
        .custom((v, {req}) => {
            console.log(req.body)
            const blog = blogs.find(b => b.id === v)
            if (!blog) throw new Error()
            req.body.blogName = blog.name
            return true
        }),
]