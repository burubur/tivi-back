import moment from "moment"
import cacher from "./cacher"

const middleware = (req, res, next) => {
    let timestamp = moment().utc(true)
    console.log(`[${timestamp}] - ${req.method} | ${req.url}`)
    let cacheKey = req.url
    cacher.get(cacheKey, (e, dataSet) => {
        if (e || dataSet === null ){
            next()
        } else {
            res.send(JSON.parse(dataSet))
            res.end()
        }
    })
}

export default middleware