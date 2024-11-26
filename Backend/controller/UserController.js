const User = require("../model/User")
const bcrypt  = require("bcrypt")

const userRegister = async(req,res) =>{
    try{
    const myUser = new User({
        name: req.body.name, 
        email:req.body.email,
        password:req.body.password,
        homeAddress:req.body.homeAddress,
    });
        await myUser.save();
        res.status(201).json(myUser);
    }catch (error) {
        console.log(error);
        res.status(401).json({error:"Failed to create user"});
}
}

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

const getUsers = async(req,res) =>{
    try{
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    }catch{
        res.status(400).json({error:"Account does not exist"});
    }
}


const updateUser = async(req,res) =>{

    const myUser = User.findOne({_id:req.body.id}).catch(res.json({error: "User Does not exist"}));

    myUser.password = req.body.password;
    await myUser.save();
    res.status(200).json(myUser);
}



module.exports = {
    userRegister,
    userLogin,
    getUsers,
    updateUser

}