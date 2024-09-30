const express = require("express")
const User = require("./User.js")
const Request =  require("./Request.js")
const router  = express.Router()

//Registering an user account

router.post("/register", async(req,res) =>{
    try{
    const myUser = new User({
        name: req.body.name, 
        email:req.body.email,
        password:req.body.password,
        role:"User",
        homeaddress:req.body.homeaddress,
    });
    await myUser.save();
    res.status(201).send(myUser);
}catch (error) {
    res.status(400).send({error:"Failed to create user"});
}
});

//Login into user account
router.get("/login",async(req,res) =>{
    const myUser = await User.findOne({_id:req.params.id}).catch(res.status(400).send({error: "Incorrect Username"}));

    if(req.params.password == myUser.password){
        res.status(200).send(myUser);
    }else{
        res.status(400).send({
            error: "Incorrect Password"
        });
    }
});


//Forgot Password
router.patch("/login",async(req,res) =>{
    const myUser = User.findOne({_id:req.body.id}).catch(res.send({error: "User Does not exist"}));

    myUser.password = req.body.password;
    await myUser.save();
    res.status(200).send(myUser);
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
    res.status(200).send(myRequest);
}catch (error) {
    res.status(400).send({error:"Failed to create user"});
}
});


//Delete sample

router.delete("/mySample/:id",async(req,res)=>{

        const deletedSample = await Request.findByIdAndDelete(req.params.id);
        if(deletedSample == null){
            res.status(400).send({"error":"could not find sample"});
        }
        res.status(200).send({message:"Sample Deleted"});
    
})

//Veiw All sample
router.get("/mySample",async(req,res) =>{
    try{
        const allRequest = await Request.find();
        res.status(200).send(allRequest);
    }catch{
        res.status(400).send({error:"Account does not exist"});
    }
});

//Veiw sample

router.get("/mySample/:id",async(req,res) =>{
    try{
        const request = await Request.findOne({_id:req.params.id});
        res.status(200).send(request);
    }catch{
        res.status(400).send({error:"Account does not exist"});
    }

});

//Update Sample
router.patch("/sample/:id",async(req,res) =>{
    try{
        const deletedRequest = await Request.findByIdAndUpdate(req.params.id);
        if(!deletedRequest){
            return res.status(400).send({ error: "Request not found" });
        }
        res.status(200).send(deletedRequest);
    }catch{
        res.status(400).send("Account does not exist");
    }
});

module.exports = router;