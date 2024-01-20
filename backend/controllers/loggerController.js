const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
const accountModel = require("../models/Account");
const companyModel = require("../models/Company");
const bcrypt = require('bcrypt');
require("dotenv").config();

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    const account = await accountModel.findOne({email});
    if(account.verificationToken != null){
        return res.status(401).json({message: "Please Activate your account"});
    }
    if(account && (await bcrypt.compare(password, account.password))){

        let name, role, id; 

        if(account.role == 1){ //user
            id = account.userId;
            const user =  await userModel.findOne({_id: id});
            name = user.Fname + " " + user.Lname;
            role = 1;
        }
        else if(account.role == 2){ //company
            id = account.companyId;
            const company = await companyModel.findOne({_id: id});
            name = company.name;
            role = 2;
        }
        else{
            id = account._Id;
            name = "Admin";
            role = 0;
        }
        const accessToken = jwt.sign({
            //payload
            user: {
                username: name,
                email: email,
                id: id,
                role: role,
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        return res.status(200).json({accessToken});
    }
    else{
        return res.status(401).json({message: "Invalid Credentials"});
    }
}

module.exports = {loginUser};