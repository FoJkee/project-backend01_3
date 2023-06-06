import {body} from "express-validator";

const pattern = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

export const blogsMiddleware = [
    body('name').exists().bail().isString().bail().trim().isLength({min: 1, max: 15}).withMessage('String length is not more than 15 symbols'),
    body('description').exists().bail().isString().bail().trim().isLength({min: 1, max: 500}).withMessage('String length is not more than 500 symbols'),
    body('websiteUrl').exists().bail().isString().bail().trim().isLength({min: 1, max: 100}).bail().withMessage('String length is not more than 100 symbols').bail().matches(pattern).withMessage('Incorrect websiteUrl')
]