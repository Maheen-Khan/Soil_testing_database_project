const User = require("../model/User")
const bcrypt  = require("bcrypt")




const userLogin = async (req, res) => {
    try {
        const myUsers = await User.find({ //Checks all with same name or email
            $or: [
                { name: req.body.name },
                { email: req.body.name }
            ]
        });

        if(myUsers.length === 0 ){
            return res.status(404).json({error:"User not found"});
        }

        for(const user of myUsers){
            if(bcrypt.compare(req.body.password, user.password)){
                return res.status(200).json({ id: user._id, name: user.name, role: user.role });
            }
        }
    
        
            return res.status(404).json({ error: "Incorrect Password" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err });
    }
}






const getUser = async(req,res) =>{
    const myUser = await User.findById(req.params.id).select('-password').lean().exec()
    if(myUser)
        res.status(200).json(myUser)
    else
        res.status(400).json({message: "Users not found"})
}

const getAllUsers = async(req,res) =>{
    try{
        const allUsers = await User.find().select('-password').lean()
        res.status(200).json(allUsers);
    }catch{
        res.status(400).json({error:"Users not found"});
    }
}


const createUser = async(req,res) =>{
    try{
        //Check for parameters
        const {name,email,password,homeAddress,role} = req.body

        if(!name || !email || !password || !homeAddress){
            res.status(400).status({message : "All feilds required to create user"})
        }

        const duplicate = await User.findOne({email}).lean().exec()
        if(duplicate){
            return res.status(409).json({message: "Duplicates not allowed"})
        }


        
        const user = await User.create({
            name: req.body.name, 
            email:req.body.email,
            role: req.body.role || "user",
            password:req.body.password,
            homeAddress:req.body.homeAddress,
        })
        if(user)
            res.status(201).json({message: "User created"});
    }catch (error) {
        console.log(error);
        res.status(401).json({error:"Failed to create user"});
}
}


const updateUser = async(req,res) =>{
    try{
        const {id,name,email,homeAddress,password} = req.body
        
        if(!id||!name||!email||!homeAddress){
            return res.status(400).json({message: "All feilds required to update user"})
        }

        const user = await User.findById(id).exec()
        console.log(user)
        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        console.log(user)

        const duplicate = await User.findOne({email}).lean().exec()
        if(duplicate && duplicate?._id.toString !== id){
            return res.status(409).json({message:"Duplicate email"})
        }

        user.name = name
        user.email = email
        user.homeAddress = homeAddress
        
        if(password){
            user.password = await bcrypt.hash(password,10)
        }
        const updatedUser = await user.save()
        res.status(200).json({message: "User updated"});
    }catch{
        res.status(400).json({error:"Failed to update user"})
    }
}

const deleteUser = async(req,res) =>{
    const {id} = req.body
    if(!id){
        return res.status(400).json({message :'User ID required to delete account'})
    }

    const requests = await Request.find({userID : id}).lean().exec()
    if(requests){
        return res.status(400).json({message : "Cannot delete user with requests"})
    }
    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message : "Cannot find user"})
    }

    const deletedUser = await user.deleteOne()

    res.status(200).json({message : "User deleted"})
}





module.exports = {
    userLogin,
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser

}