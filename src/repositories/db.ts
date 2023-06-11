import {MongoClient} from "mongodb";
import {blogsType} from "../types/types";
import * as dotenv from 'dotenv'
dotenv.config()



const mongoUri = process.env.MONGO_URL
if(!mongoUri){
    throw new Error('Not')
}
console.log('url:', mongoUri)

export const client = new MongoClient(mongoUri)

const blogsDb = client.db().collection<blogsType>('blogs')
const postsDb = client.db().collection<blogsType>('posts')

export async function runDb() {
    try{
        await client.connect()
        console.log('Connected successfully to mongo server')
        
    }
    
    catch {
        console.log("Can't connect to db")
        await client.close()
    }
}
