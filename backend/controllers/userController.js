const userModel = require("../models/User");
const accountModel = require("../models/Account");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");


const signUpUser = async (req, res) =>{
    const {Fname, Lname, phoneNumber, email, password} = req.body;
    //here validation before add
    if(!Fname || !Lname || !email || !password){
        return res.status(400).json({message: "All fields are required!"});
    }
    if(validator.isEmpty(Fname) || validator.isEmpty(Lname) || validator.isEmpty(email) || validator.isEmpty(password)){
        return res.status(400).json({message: "All fields are required!"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message: "Not A Valid Email!"});
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const addedUser = await userModel.create({
            Fname: Fname,
            Lname: Lname,
        });

        if(addedUser){
            const addedAccount = await accountModel.create({
                email: email,
                phoneNumber: phoneNumber,
                password: hashedPassword,
                role: 1,
                userId: addedUser._id,
            });
        }

        res.status(201).json({message: "User Added Succssfully!"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const updateProfile =async (req, res) =>{
    const {id} = req.params;
    const {Fname, Lname, profilePic} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{
        const updateProfile = await userModel.findOneAndUpdate({_id : id},{...req.body});
        if(!updateProfile){
            res.status(404).json({message: "User Not Found!"});
        }
        res.status(201).json({message: "User Updated Succssfully!"});
    }catch(error){
        res.status(400).json({error: error.message});
    }

}

const getUserInfoById =async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{
        const user = await userModel.findOne({_id : id});
        if(!user){
            res.status(404).json({message: "User Not Found!"});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({error: error.message});
    }

}

const getAllUsers =async (req, res) =>{
    try{
        const users = await userModel.find();
        if(!users){
            res.status(404).json({message: "no Available Users!"});
        }
        res.status(200).json(users);
    }catch(error){
        res.status(400).json({error: error.message});
    }

}

const loginUser =async(req,res)=>{

}
module.exports = 
{
    signUpUser,
    updateProfile,
    getUserInfoById,
    getAllUsers
    
};