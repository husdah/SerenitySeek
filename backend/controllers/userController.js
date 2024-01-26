const mongoose = require("mongoose");
const userModel = require("../models/User");
const accountModel = require("../models/Account");
const validator = require("validator");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const { verifyEmail } = require('./verifyEmailController');
const crypto = require('crypto');

const signUpUser = async (req, res) =>{
    const {Fname, Lname, phoneNumber, email, password, confirmPassword} = req.body;
    const phoneNumberRegex = /^(03|71|70|76|78|79|81)\d{6}$/;
    //here validation before add
    let body = req.body;
    if(!Fname || !Lname || !phoneNumber || !email || !password || !confirmPassword){
        return res.status(422).json({error: "All fields are required!", body});
    }
    if(validator.isEmpty(Fname) || validator.isEmpty(Lname) || validator.isEmpty(phoneNumber) || validator.isEmpty(email) || validator.isEmpty(password)  || validator.isEmpty(confirmPassword)){
        return res.status(422).json({error: "All fields are required!"});
    }
    if(!validator.isAlpha(Fname)){
        return res.status(422).json({error: "First Name is invalid!"});
    }
    if(!validator.isAlpha(Lname)){
        return res.status(422).json({error: "Last Name is invalid!"});
    }
    if(!validator.isEmail(email)){
        return res.status(422).json({error: "Not A Valid Email!"});
    }
    if(!validator.isMobilePhone(phoneNumber)){
        return res.status(422).json({error: "Phone Number is not valid"});
    }
    if(!phoneNumberRegex.test(phoneNumber)){
        return res.status(422).json({error: "Phone Number is not valid"});
    }
    if(!validator.isStrongPassword(password)){
        return res.status(422).json({error: "Please enter a stronger password"});
    }
    if(!validator.equals(confirmPassword,password)){
        return res.status(422).json({error: "Confirmation password is invalid"});
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const checkEmail = await accountModel.findOne({email : email});
        if(checkEmail){
            return res.status(422).json({error: "Email Already Exist"});
        }

        const checkPhone = await accountModel.findOne({phoneNumber : phoneNumber});
        if(checkPhone){
            return res.status(422).json({error: "Phone Number Already Exist"});
        }

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
                verificationToken : crypto.randomBytes(16).toString('hex')
            });

            if(addedAccount){
                const link = `http://localhost:4000/api/EmailConfirm/${addedAccount.verificationToken}`;
                await verifyEmail(email, link);
                res.status(200).send({message : "User added. Please confirm your email"})
            }
        }

       // res.status(201).json({message: "User Added Succssfully!"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const updateProfile =async (req, res) =>{
    const {id} = req.params;
    const {Fname, Lname} = req.body;

    if(id != req.user.id){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    if(!Fname || !Lname){
        return res.status(400).json({message: "Full Name is Required!"});
    }
    if(validator.isEmpty(Fname) || validator.isEmpty(Lname)){
        return res.status(400).json({message: "Full Name is Required!"});
    }
    if(!validator.isAlpha(Fname)){
        return res.status(400).json({message: "First Name is invalid!"});
    }
    if(!validator.isAlpha(Lname)){
        return res.status(400).json({message: "Last Name is invalid!"});
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
        if(!users || users.length === 0){
            res.status(404).json({message: "no Available Users!"});
        }
        res.status(200).json(users);
    }catch(error){
        res.status(400).json({error: error.message});
    }

}

module.exports = 
{
    signUpUser,
    updateProfile,
    getUserInfoById,
    getAllUsers
    
};