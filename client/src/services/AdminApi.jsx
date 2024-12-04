import api from "./api";

const URL = "http://localhost:3001"

const getAllTests  = async () =>{
    const res = api.get("/test/get/all")
    return(res)
}
const createRequest = async (request) => {
    const res = api.post("/request/create",request)
    return(res)
}

export default {
    getAllTests,
    createRequest
}