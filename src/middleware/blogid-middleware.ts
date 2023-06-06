import {body, ValidationChain} from "express-validator";
import {repositoryBlogs} from "../repositories/blogs-repositories";


export const blogidMiddleware: ValidationChain = body('blogId').custom((value) => {
const blogId = repositoryBlogs.findBlogs()
  const findBlogId =  blogId.filter((id, index)  => value === blogId[index].id)
  return findBlogId.length > 0
})