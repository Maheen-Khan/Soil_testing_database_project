const Test = require("../model/Test.js")


const createTest = async(req,res)=>{
    try{
        const Test = new Test({
            testName : req.body.testName,
            discription: req.body.discription,
            unit : req.body.unit,
            cost : req.body.cost,
        })
        request.save()
        res.status(200).json({sucess : "Sucess"})
    }catch{
        res.status(400).json({error : "Error request not created"})
    }
}

const getTest = async(req,res) => {
    try{
        const test = await Test.findById(req.params.id);
        res.status(200).json(test);
    }catch{
        res.status(400).json({error: "Could not retrive test"})
    }
}


const getAllTest = async(req,res) => {
    try{
        const allTests = await Test.find().lean()
        res.status(200).json(allTests);
    }catch{
        res.status(400).json({error:"Tests not found"});
    }
}

const updateTest = async(req,res)=>{
    try{
        console.log("Test1",req.body)
        const replacedTest = await Test.findByIdAndUpdate(req.params.id,req.body);
        console.log("Test2",replacedTest)
        if(!replacedTest){
            return res.status(400).json({ error: "Test not found" });
        }
        res.status(200).json(replacedTest);
    }catch{
        res.status(400).json("Account does not exist");
    }
}

const deleteTest = async(req,res)=>{

    const deletedTest = await Request.findByIdAndDelete(req.params.id);
    if(deletedTest == null){
        res.status(400).json({"error":"could not find sample"});
    }
    res.status(200).json({message:"Sample Deleted"});

}

module.exports = {
    createTest,
    getTest,
    getAllTest,
    updateTest,
    deleteTest
}