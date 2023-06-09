import {MongoClient} from "mongodb";


const mongoUri = process.env.mongo_URI || "mongodb://127.0.0.1:27017"

export const client = new MongoClient(mongoUri)
export async function runDb() {
    try{
        await client.connect()
        await client.db('blogs').command({ping: 1})
        console.log('Connected successfully to mongo server')
        
    }
    
    catch {
        console.log("Can't connect to db")
        await client.close()
    }
}

console.log(process.env.mongo_URI)