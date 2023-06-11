import {MongoClient} from "mongodb";
import {blogsType, postsType} from "../types/types";
import dotenv from 'dotenv'

dotenv.config()


const mongoUri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017"
console.log(mongoUri)
if (!mongoUri) {
    throw new Error('Not')
}



const client = new MongoClient(mongoUri)

const db = client.db('social_network');
export const postsCollection = db.collection<postsType>('posts')
export const blogsCollection = db.collection<blogsType>('blogs')


export async function runDb() {
    try {
        await client.connect()
        console.log('Connected successfully to mongo server')

    } catch {
        console.log("Can't connect to db")
        await client.close()
    }
}
