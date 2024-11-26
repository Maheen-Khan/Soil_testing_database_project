const express = require("express")
const router  = express.Router()
const {createTest, getTest,updateTest,deleteTest} = require("../controller/TestController.js")


router.post("/test/create",createTest)
//Get Test

router.post("/test/get", getTest)

//Update Test
router.patch("/test/update",updateTest)

//Delete Test
router.delete("/test/delete/:id",deleteTest)

module.exports = router

