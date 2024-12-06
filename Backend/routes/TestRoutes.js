const express = require("express")
const router  = express.Router()
const {createTest, getTest,updateTest,deleteTest,getAllTest} = require("../controller/TestController.js")


router.post("/test/create",createTest)
//Get Test

router.get("/test/get/:id", getTest)

router.get("/test/get-all",getAllTest)

//Update Test
router.patch("/test/update/:id",updateTest)

//Delete Test
router.delete("/test/delete/:id",deleteTest)

module.exports = router

