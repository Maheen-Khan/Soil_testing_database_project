const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    role: {type:String, required: true}, //Master admin, admin, user
    homeAddress: {type:String, required: true},
    createdAt: {type:Date, default: Date.now},
    updatedAt: {type:Date}

}
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };
  

const User = userSchema.model("User",mongoose.Schema);

module.exports = User;