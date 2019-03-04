import dotenv from "dotenv"
import axios from "axios"

dotenv.config()
const API = process.env.API
const httpClient = axios.create({
    baseURL: API,
})

const requestor = async (endpoint) => {
    try {
        const response = await httpClient.get(endpoint)
        return response.data
    } catch (error) {
        console.log("error on http request", error)
        return null
    }
}

export default requestor