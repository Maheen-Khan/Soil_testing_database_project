const express = require("express")
const router = express.Router()
const {createRequest,getRequest,getAllRequest,getAllUserRequest,updateRequest,deleteRequest} = require("../controller/RequestController.js")

router.post("/request/create",createRequest)

router.post("/request/get/all/:userId",getAllUserRequest)

router.post("/request/get",getRequest)

router.post("/request/get/all",getAllRequest)

router.patch("/request/update/:id",updateRequest)

router.delete("/request/:id",deleteRequest)

module.exports = router