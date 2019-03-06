import "@babel/polyfill"
import dotenv from "dotenv"
import express from 'express';
import http from "http"
import https from "https"
import cors from "cors"
import fs from "fs"
import { cache } from "./cacher"
import middleware from "./middleware"
import requestor from "./requestor"

// load env values
dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())

// attach the middleware, cache mechanism would be applied
app.use(middleware)

app.get("/", (req, res) => {
    res.send("Wellcome to TiVi API\n")
})

app.get("/discover/tv", (req, res) => {
    let endpoint = req.url
    let cacheKey = req.url
    requestor(endpoint)
    .then(response => {
        res.json(response)
        cache(cacheKey, response)
        res.end()
    })
    .catch(e => {
        console.log("error on http request")
    })
})

app.get("/tv/:id", (req, res) => {
    let endpoint = req.url
    let cacheKey = req.url
    requestor(endpoint)
    .then(response => {
        res.json(response)
        cache(cacheKey, response)
        res.end()
    })
    .catch(e => {
        console.log("error on http request")
    })
})

app.get("/tv/:id/season/:sessionId", (req, res) => {
    let endpoint = req.url
    let cacheKey = req.url
    requestor(endpoint)
    .then(response => {
        res.json(response)
        cache(cacheKey, response)
        res.end()
    })
    .catch(e => {
        console.log("error on http request")
    })
})

app.get("/search/tv", (req, res) => {
    let endpoint = req.url
    let cacheKey = req.url
    requestor(endpoint)
    .then(response => {
        res.json(response)
        cache(cacheKey, response)
        res.end()
    })
    .catch(e => {
        console.log("error on http request")
    })
})

var server = http.createServer(app)
if (process.env.SSL_ENABLED) {
    let key = fs.readFileSync("./certs/server.key")
    let cert = fs.readFileSync("./certs/server.csr")
    server = https.createServer({key: key, cert: cert}, app)
}

server.listen(port, function() {}())
server.on("error", onError)
server.on("listening", onListening)

function onListening(){
    console.log("starting a web API server in port:", port)
}

function onError(e) {
    console.log("failed to start a web API server in port:", port, ", got error:\n", e)
    process.exit(1)
}
