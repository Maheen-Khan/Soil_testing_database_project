const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({

    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    role: {type:String, default: 'user'}, //Master admin, admin, user
    
    homeAddress: {type:String, required: true},
    createdAt: {type:Date, default: Date.now()},
    updatedAt: {type:Date}


}
);

userSchema.pre('save', async function(next){
    try{
        this.password = await bcrypt.hash(this.password,10);
        next();
    }catch(err){
        console.error(err);
    }


})

const User = mongoose.model("User",userSchema);

module.exports = User;