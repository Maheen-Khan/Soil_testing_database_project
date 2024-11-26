const express = require("express")
const router  = express.Router()
const {userRegister, userLogin, getUsers,updateUser} = require("../controller/UserController.js")

//Registering an user account

router.post("/register", userRegister);

//Login into user account
router.post("/login", userLogin);



//Veiw All users
router.get("/users",getUsers);


//Forgot Password
router.patch("/login",updateUser);


module.exports = router;