const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({

    userID : {type:mongoose.Schema.Types.ObjectId},
    tests: [{
        soilTestID: {type:mongoose.Schema.Types.ObjectId},
        quantity: {type:Number, required:true},
        price: {type:Number,required:true}, //Should come from SoilTests.tests
    }],
    shippingSlip: String,
    status: {type:String, default:"Pending"},
    results: String,
    payment: {
        id:String, //Stripe Payment,Indent ID
        status:String,
        amount:Number,
        currency:String
    },

    createdAt: {type:Date,default:Date.now()},
    updatedAt: Date

});

const request = mongoose.model("Requests",requestSchema);
module.exports = request;