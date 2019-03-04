import dotenv from "dotenv"
import redis from "redis"

dotenv.config()
const host = process.env.CACHE_HOST
const port = process.env.CACHE_PORT
const db = process.env.CACHE_DB
const ttl = process.env.CACHE_TTL

const cacheConfig = {
    host: host,
    port: port,
    db: db,
}

const cacher = redis.createClient(cacheConfig)

const cache = (key, dataSet) => {
    if (key !== "" && dataSet !== null) {
        let cacheValue = JSON.stringify(dataSet)
        cacher.set(key, cacheValue, 'EX', ttl, () => console.log("new dataset cached"))
    }
}

export {
    cache
}

export default cacher