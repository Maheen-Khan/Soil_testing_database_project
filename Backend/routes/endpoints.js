const express = require("express")
const User = require("../model/User.js")
const Request =  require("../model/Request.js")
const router  = express.Router()
const bcrypt = require("bcrypt");
//Registering an user account

router.post("/register", async(req,res) =>{
    try{
    console.log(1);
    const myUser = new User({
        name: req.body.name, 
        email:req.body.email,
        password:req.body.password,
        homeAddress:req.body.homeAddress,
    });
    console.log(2);
    await myUser.save();
    console.log(3);
    res.status(201).json(myUser);
}catch (error) {
    console.log(error);
    res.status(401).json({error:"Failed to create user"});
}
});

//Login into user account
router.post("/login",async(req,res) =>{
    const myUser = await User.findOne({_id:req.params._id}).catch(res.status(400).json({error: "Incorrect Username"}));

    if(req.params.password == myUser.password){
        res.status(200).json({name:myUser.name,id:myUser._id,token});
    }else{
        res.status(400).json({
            error: "Incorrect Password"
        });
    }
});


//Forgot Password
router.patch("/login",async(req,res) =>{

    const myUser = User.findOne({_id:req.body.id}).catch(res.json({error: "User Does not exist"}));

    myUser.password = req.body.password;
    await myUser.save();
    res.status(200).json(myUser);
});

//Create sample

router.post("/create", async(req,res) =>{
    try{
    const myRequest = new Request({
        userID: req.body.userID, 
        tests:req.body.tests,
        shippingSlip:req.body.shippingSlip,
        payment:payment,
    });
    await myRequest.save();
    res.status(200).json(myRequest);
}catch (error) {
    res.status(400).json({error:"Failed to create user"});
}
});


//Delete sample

router.delete("/mySample/:id",async(req,res)=>{

        const deletedSample = await Request.findByIdAndDelete(req.params.id);
        if(deletedSample == null){
            res.status(400).json({"error":"could not find sample"});
        }
        res.status(200).json({message:"Sample Deleted"});
    
})

//Veiw All sample
router.get("/mySample",async(req,res) =>{
    try{
        const allRequest = await Request.find();
        res.status(200).json(allRequest);
    }catch{
        res.status(400).json({error:"Account does not exist"});
    }
});

//Veiw sample

router.get("/mySample/:id",async(req,res) =>{
    try{
        const request = await Request.findOne({_id:req.params.id});
        res.status(200).json(request);
    }catch{
        res.status(400).json({error:"Account does not exist"});
    }

});

//Update Sample
router.patch("/sample/:id",async(req,res) =>{
    try{
        const deletedRequest = await Request.findByIdAndUpdate(req.params.id);
        if(!deletedRequest){
            return res.status(400).json({ error: "Request not found" });
        }
        res.status(200).json(deletedRequest);
    }catch{
        res.status(400).json("Account does not exist");
    }
});

module.exports = router;