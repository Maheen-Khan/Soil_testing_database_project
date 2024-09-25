const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    role: {type:String, required: true}, //Master admin, admin, user
    
    homeAddress: {type:String, required: true},
    createdAt: {type:Date, default: Date.now()},
    updatedAt: {type:Date}


}
);

const User = userSchema.model("User",mongoose.Schema);

module.exports = User;