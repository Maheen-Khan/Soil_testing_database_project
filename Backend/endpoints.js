const e = require("express")
const express = require("express")
const User = require("./User.js")
const router  = express.Router()


//Registering an account

router.post("./register",(req,res) =>{
    const User = new User({
        name: res.body.Name, 
        email:res.body.email,
        password:res.body.password,
        role:"User",
        homeaddress:res.body.homeaddress,
    })
    User.save()
    res.send(User)
})

//Login into user account
router.get("./login",(req,res) =>{
    const User = User.findOne({_id:req.params.id}).catch(res.send({error: "Incorrect Username"}))

    if(req.params.password == User.password){
        res.send(User)
    }else{
        res.send({
            error: "Incorrect Password"
        })
    }
})


//Forgot Password
router.patch("./login",(req,res) =>{
    const User = User.findOne({_id:req.params.id}).catch(res.send({error: "User Does not exist"}))

    User.password = req.params.password;
    User.save()
    res.send(User)
})