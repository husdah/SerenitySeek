const nodemailer = require('nodemailer');
require('dotenv').config();

const verifyEmail = async (email, link) =>{
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
            subject: "Account Verification",
            text: "Welcome",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #3498db;">Welcome to Serenity Seek!</h2>
                <p>Thank you for signing up. To activate your account, please click the link below:</p>
                <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px;">Activate Account</a>
                <p style="color: #888; font-size: 12px;">This email was sent from SerenitySeek Website. If you did not sign up, please ignore this email.</p>
            </div>`
        });
        console.log("mail send successfuly");
    }catch(error){
        console.log(error, "mail faild to send");
    }
}

module.exports = {verifyEmail};