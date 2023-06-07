import {body} from "express-validator";

const pattern = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

export const blogsMiddleware = [
    body('name').exists().isString().trim().isLength({min: 1, max: 15}).withMessage('String length is not more than 15 symbols'),
    body('description').exists().isString().trim().isLength({min: 1, max: 500}).withMessage('String length is not more than 500 symbols'),
    body('websiteUrl').exists().isString().trim().isLength({min: 1, max: 100}).withMessage('String length is not more than 100 symbols').matches(pattern).withMessage('Incorrect websiteUrl')
]