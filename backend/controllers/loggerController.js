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
        return res.status(400).json({error: "All fields are required"});
    }
    const account = await accountModel.findOne({email});
    if(account && (await bcrypt.compare(password, account.password))){

        if(account.verificationToken != "verified"){
            return res.status(401).json({error: "Please Activate your account"});
        }

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

            if(!company.active){
                return res.status(401).json({error: "Your Company Still haven't get the accept from the Admin"});
            }
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
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });

        const refreshToken = jwt.sign({
            //payload
            accountId: account._id,
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

        account.refreshToken = refreshToken;
        await account.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Set to true in a production environment with HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000, // Set the expiration time as needed
            sameSite: 'None'
        });

        return res.status(200).json({ accessToken, refreshToken });
    }
    else{
        return res.status(401).json({error: "Invalid Credentials"});
    }
}

/* const useRefreshToken = async (req, res) => {
    const  refreshToken  = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is required" });
    }

    // Check if the refresh token is valid
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid refresh token" });
        }

        // Here, you can perform additional checks, such as checking if the refresh token is blacklisted
        const checkRefreshToken = await accountModel.findOne({refreshToken : refreshToken});
        if(!checkRefreshToken){
            return res.status(404).json({ error: "No matching token" });
        }

        const accountIdDecoded = decoded.accountId;
        const account = await accountModel.findOne({_id: accountIdDecoded});
        if(!account){
            return res.status(404).json({ error: "Account Not Found", id : accountIdDecoded});
        }
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

        // Generate a new access token
        const newAccessToken = jwt.sign({
            //payload
            user: {
                username: name,
                email: account.email,
                id: id,
                role: role,
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

        res.json({ accessToken: newAccessToken });
    });
}; */

const logout = async (req, res) => {
    const  refreshToken  = req.cookies.refreshToken;
    
    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is required" });
    }

    const refreshTokenAccount = await accountModel.findOne({refreshToken : refreshToken});
    if(!refreshTokenAccount){
        return res.status(404).json({ error: "No matching token" });
    }

    refreshTokenAccount.refreshToken = null;
    await refreshTokenAccount.save();
    return res.status(201).json({ message: 'Logout successful' });
};

module.exports = 
{
    loginUser,
    logout
};