const Test = require("../model/Test.js")
const Request = require("../model/Request.js")
//Create a Request
const createRequest = async(req,res) =>{

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


}
//Get all Request (user)
const getAllUserRequest = async(req,res) =>{
    try{
        const requestAll = await Request.find({userId : req.params.userId } ).populate('tests.testId');
        res.status(200).json(requestAll);
    }catch{
        res.status(400).json({error: "Could not retrive requests"})
    }
}

//Get a Request (user,admin)
const getRequest = async(req,res) => {
    try{
        const request = await Request.findById(req.body.requestId).populate('tests.testId');
        res.status(200).json(request);
    }catch{
        res.status(400).json({error: "Could not retrive request"})
    }
}
//Get all request (admin)
const getAllRequest = async(req,res) =>{
    try{
        const requestAll = await Request.find().populate('tests.testId'); 
        res.status(200).json(requestAll)
    }catch{
        res.status(400).json({error : "Could not retrive request"})
    }
}

//Update a Request

// Express route to update the Request by its ID
const updateRequest =  async (req, res) => {


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

};



//Delete a Request

const deleteRequest = async(req,res)=>{

        const deletedRequest = await Request.findByIdAndDelete(req.params.id);
        if(deletedRequest == null){
            res.status(400).json({"error":"could not find sample"});
        }
        res.status(200).json({message:"Sample Deleted"});
    
}

module.exports = {
    createRequest,
    getRequest,
    getAllRequest,
    getAllUserRequest,
    updateRequest,
    deleteRequest}
