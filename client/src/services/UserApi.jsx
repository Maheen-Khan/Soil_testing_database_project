import api from "./api";

const getAllUsers = (async () => {
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
const updateUser = (async (data,userId) =>{
    const res = await api.patch(`/request/update/${userId}`, data);
})

export default {
    getAllUsers,
    getRequest,
    updateUser

}