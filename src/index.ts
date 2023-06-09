import express from "express";
import {testingRouter} from "./routing/routing-testing";
import {routingPosts} from "./routing/routing-posts";
import {routingBlogs} from "./routing/routing-blogs";
import bodyParser from "body-parser";
import {runDb} from "./db/db";


const app = express()
app.use(bodyParser())

const port = process.env.PORT || 4000


const parserMiddleware = express.json()

app.use(parserMiddleware)

app.use('/blogs', routingBlogs)
app.use('/posts', routingPosts)
app.use('/testing', testingRouter)

const startApp = async () => {

await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}
startApp()



