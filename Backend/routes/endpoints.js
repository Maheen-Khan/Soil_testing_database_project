const express = require("express")
const mongoose = require("mongoose")
const User = require("../model/User.js")
const Request =  require("../model/Request.js")
const router  = express.Router()
const bcrypt = require("bcrypt");
const Result = require("../model/Result.js")
const Test = require("../model/Test.js")


//Create sample

// router.post("/create", async(req,res) =>{
//     try{
//     const myRequest = new Request({
//         userID: req.body.userID, 
//         tests:req.body.tests,
//         shippingSlip:req.body.shippingSlip,
//         payment:payment,
//     });
//     await myRequest.save();
//     res.status(200).json(myRequest);
// }catch (error) {
//     res.status(400).json({error:"Failed to create user"});
// }
// });


//Delete sample

// router.delete("/mySample/:id",async(req,res)=>{

//         const deletedSample = await Request.findByIdAndDelete(req.params.id);
//         if(deletedSample == null){
//             res.status(400).json({"error":"could not find sample"});
//         }
//         res.status(200).json({message:"Sample Deleted"});
    
// })

//Veiw All sample (admin)
// router.get("/admin/allSamples",async(req,res) =>{
//     try{
//         const allRequest = await Request.find();
//         res.status(200).json(allRequest);
//     }catch{
//         res.status(400).json({error:"Account does not exist"});
//     }
// });


// //Veiw All sample (user)
// router.get("/user/allSamples",async(req,res) =>{
//     try{
//         const allRequest = await Request.find(req.params.userID);
//         res.status(200).json(allRequest);
//     }catch{
//         res.status(400).json({error:"Account does not exist"});
//     }
// });

// //Veiw single sample

// router.get("/mySample/:id",async(req,res) =>{
//     try{
//         const request = await Request.findOne({_id:req.params.id});
//         res.status(200).json(request);
//     }catch{
//         res.status(400).json({error:"Account does not exist"});
//     }

// });

//Update Sample
// router.patch("/sample/:id",async(req,res) =>{
//     try{
//         const deletedRequest = await Request.findByIdAndUpdate(req.params.id);
//         if(!deletedRequest){
//             return res.status(400).json({ error: "Request not found" });
//         }
//         res.status(200).json(deletedRequest);
//     }catch{
//         res.status(400).json("Account does not exist");
//     }
// });

//Need to add a create test

// router.post("/test", async(req,res) =>{
//     try{
//     const test = Test.findOne(req.params.testName);
//     res.status(200).json(request);
//     }catch{
//     res.status(400).json("Test does not exist");

//     }

// });


//Create a Request
router.post("/request/create", async(req,res) =>{

    const myTest = await Promise.all(req.body.tests.map(async (value,index) =>{
        const testDoc = await Test.findOne({testName: value})
        if(!testDoc){
            return({
                error: "Test not found"
            })
        }
        return({
            testId : testDoc._id,
            value : 0
        })
    }))
    try{
        const request = new Request({
            userId : req.body.userId,
            tests: myTest,
            description : req.body.description,
        })
        await request.save()
        res.status(200).json({sucess : "Sucess"})
    }catch{
        res.status(400).json({error : "Error request not created"})
    }


})
//Get all Request (user)
router.post("/request/get/all/:userId" , async(req,res) =>{
    try{
        const requestAll = await Request.find({userId : req.params.userId } ).populate('tests.testId');
        res.status(200).json(requestAll);
    }catch{
        res.status(400).json({error: "Could not retrive requests"})
    }
})

//Get a Request (user,admin)
router.post("/request/get", async(req,res) => {
    try{
        const request = await Request.findById(req.body.requestId).populate('tests.testId');
        res.status(200).json(request);
    }catch{
        res.status(400).json({error: "Could not retrive request"})
    }
})
//Get all request (admin)
router.post("/request/get/all" , async(req,res) =>{
    try{
        const requestAll = await Request.find().populate('tests.testId'); 
        res.status(200).json(requestAll)
    }catch{
        res.status(400).json({error : "Could not retrive request"})
    }
})

//Update a Request

// Express route to update the Request by its ID
router.patch("/request/update/:id", async (req, res) => {


    try{

        console.log(req.body.tests)
        const  id  = req.params.id; // Extract the request ID from the URL parameter
        const { tests, status } = req.body; // Extract the tests and status from the body


        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        await Request.findByIdAndUpdate(req.params.id,{tests:req.body.tests});


        // if (status) {
        //     request.status = status;
        // }

           res.status(200).json({sucess:"Request updated"})
           Request.findById(req.params.id).then( (i) => console.log(i))
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating the request", error });
    }

});



//Delete a Request

router.delete("/request/:id",async(req,res)=>{

        const deletedRequest = await Request.findByIdAndDelete(req.params.id);
        if(deletedRequest == null){
            res.status(400).json({"error":"could not find sample"});
        }
        res.status(200).json({message:"Sample Deleted"});
    
})



module.exports = router;