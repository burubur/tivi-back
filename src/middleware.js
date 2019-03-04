import moment from "moment"
import cacher from "./cacher"

const middleware = (req, res, next) => {
    let timestamp = moment().utc(true)
    console.log(`[${timestamp}] - ${req.method} | ${req.url}`)
    let cacheKey = req.url
    cacher.get(cacheKey, (e, dataSet) => {
        if (e || dataSet === null ){
            console.log("no cached data")
            next()
        } else {
            console.log("load cached data")
            res.send(JSON.parse(dataSet))
            res.end()
        }
    })
}

export default middleware