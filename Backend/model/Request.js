const mongoose = require("mongoose");
const Test = require("./Test");

const requestSchema = new mongoose.Schema({

    userId : {type:mongoose.Schema.Types.ObjectId, requred:true},
    tests:[{testId: {type:mongoose.Schema.Types.ObjectId, ref: "Test"},
            value: Number
            }],
    status: {type:String,default:"Pending"},
    createdAt: {type:Date,default:Date.now()},
    updatedAt: Date

});

const request = mongoose.model("Requests",requestSchema);
module.exports = request;