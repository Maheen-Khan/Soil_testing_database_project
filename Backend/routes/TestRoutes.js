const express = require("express")
const router  = express.Router()
const {createTest, getTest,updateTest,deleteTest,getAllTest} = require("../controller/TestController.js")


router.post("/test/create",createTest)
//Get Test

router.post("/test/get", getTest)

router.get("/test/get/all",getAllTest)

//Update Test
router.patch("/test/update",updateTest)

//Delete Test
router.delete("/test/delete/:id",deleteTest)

module.exports = router

