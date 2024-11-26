const mongoose = require("mongoose")

const testSchema = new mongoose.Schema({
    testName: {type: String, required: true},
    discription: {type:String},
    unit: {type:String},
    cost: {type:Number, default: 0},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
});
const Test = mongoose.model("Test",testSchema);
module.exports = Test;