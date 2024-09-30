import mongoose from "./mongoose.js";

const requestSchema = new mongoose.Schema({

    userID : mongoose.SchemaType.ObjectID(),
    tests: [{
        soilTestID: {type:mongoose.SchemaType.ObjectID(), required:True},
        quantity: {type:Number, required:True},
        price: {type:Number,required:True}, //Should come from SoilTests.tests
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

    createdAt: {Type:Date,default:Date.now()},
    updatedAt: Date

});

module.exports(requestSchema.model("Requests"),mongoose.Schema);