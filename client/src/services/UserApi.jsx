import api from "./api";

const getAllRequests = (async () => {
    const res = await api.post("/request/get/all");
    console.log("Request retrived")
    return(res);
})

const getRequest = (async (userId) =>{
    const res = await api.post("/request/get/", { requestId : userId });

    const requestData = res.data.tests.map((test) => ({
        id: test.testId._id,
        name: test.testId.testName,
        values: test.values,
        unit: test.testId.unit,
      }));
    console.log("Sucess! data updated")
    return(requestData)
})
const updateRequest = (async (data,userId) =>{
    const res = await api.patch(`/request/update/${userId}`, data);
})

const deleteUser = (async (requestId) =>{
    const res = await api.delete(`/request/${requestId}`)
    console.log(res.data)
})

const getAllUsers = (async () =>{
    const res = await api.get("/users")
    return res

})

const getUser = (async (userId) => {
    const res = await api.get(`/user/${userId}`)
    return res
})

const updateUser = (async (user) =>{
    const res = await api.patch("/user",user)
    return res

})

const getAllTests = (async () =>{
    const res = await api.get("/test/get-all")
    console.log("Test retrived")
    return(res)
})
const getTest = (async (testId) =>{
    const res = await api.get(`/test/get/${testId}`)
    console.log("Test retrived")
    return(res)
})

const updateTest = (async (testId,test) =>{
    const res = await api.patch(`/test/update/${testId}`,test)
    console.log("Test updated")
})

const createRequest = async (request) => {
    const res = api.post("/request/create",request)
    return(res)
}


export default {
    getAllUsers,
    getRequest,
    updateRequest,
    deleteUser,
    getAllRequests,
    getUser,
    updateUser,
    getAllTests,
    getTest,
    updateTest,
    createRequest

}
