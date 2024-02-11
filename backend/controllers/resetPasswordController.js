const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const accountModel = require('../models/Account');
const bcrypt = require('bcrypt');
const validator = require("validator");
require('dotenv').config();

const sendForgetPasswordLink = async(req, res) =>{
    const {email} = req.body;
    const account = await accountModel.findOne({email : email});
    if(!account){
        return res.status(404).json({error : "User not found"});
    }

    const secret = process.env.ACCESS_TOKEN_SECRET + account.password;
    const token = jwt.sign({email : email, id: account._id}, secret, {expiresIn : "15m"});
    const link = `http://localhost:4000/password/reset-password/${account._id}/${token}`;
    try{
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_KEY_PASS,
            },
        });
        let info = await transporter.sendMail({
            from : process.env.EMAIL,
            to: email,
            subject: "Reset Password",
            text: "reset:",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #3498db;">Password Reset Request</h2>
                <p>We received a request to reset your password. Click the link below to reset your password:</p>
                <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
                <p style="color: #888; font-size: 12px;">This email was sent from SerenitySeek Website. If you did not request a password reset, please ignore this email.</p>
            </div>`
        });
        console.log("mail send successfuly");
        return res.status(200).json({message : "Email Sent Successfully!"});
    }catch(error){
        console.log(error, "mail faild to send");
        return res.status(400).json({error : "mail faild to send"});
    }
}

const getResetPasswordView = async(req, res) =>{
    const account = await accountModel.findById(req.params.userId);
    if(!account){
        return res.status(404).json({error : "User not found"});
    }

    const secret = process.env.ACCESS_TOKEN_SECRET + account.password;
    try{
        jwt.verify(req.params.token, secret);
        const link = `http://localhost:3000/password/reset-password/${req.params.userId}/${req.params.token}`;
        return res.redirect(link); 
    }catch(error){
        console.log(error);
        return res.status(500).json({error : error.message});
    }
}

const resetThePassword = async(req, res) =>{
    const {password, confirmPassword} = req.body;

    if(!password || !confirmPassword){
        return res.status(400).json({error: "All Fields are required!"});
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({error: "Please enter a stronger password"});
    }
    if(!validator.equals(confirmPassword,password)){
        return res.status(400).json({error: "Confirmation password is invalid"});
    }

    const account = await accountModel.findById(req.params.userId);
    if(!account){
        return res.status(404).json({error : "User not found"});
    }
    
    const secret = process.env.ACCESS_TOKEN_SECRET + account.password;
    try{
        jwt.verify(req.params.token, secret);
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        account.password = hashedPassword;
        await account.save();
        return res.status(200).json({
            message: "Password Updated Successfully!",
            redirectTo: "http://localhost:3000/password/reset-password/success"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({error : error.message});
    }
}   

module.exports = 
{
    sendForgetPasswordLink,
    getResetPasswordView,
    resetThePassword
}