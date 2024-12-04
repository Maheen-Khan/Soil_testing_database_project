const express = require("express")
const router  = express.Router()
const {userLogin,createUser,getUser,getAllUsers,updateUser,deleteUser} = require("../controller/UserController.js")

//Registering an user account

router.post("/register", createUser);

//Login into user account
router.post("/login", userLogin);

//View user
router.get("/user/:id",getUser);

//Veiw All users
router.get("/users",getAllUsers);


//Update account
router.patch("/user",updateUser);

//Delete account
router.delete("/user",deleteUser)




module.exports = router;