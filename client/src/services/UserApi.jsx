import api from "./api";

const getAllRequests = (async () => {
    const res = await api.post("/request/get/all");
    return(res);
})

const getRequest = (async (userId) =>{
    const res = await api.post("/request/get/", { requestId : userId });

    const requestData = res.data.tests.map((test) => ({
        id: test.testId._id,
        name: test.testId.testName,
        value: test.value,
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

export default {
    getAllUsers,
    getRequest,
    updateRequest,
    deleteUser,
    getAllRequests,
    getUser,
    updateUser

}
