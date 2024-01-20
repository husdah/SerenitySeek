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
            <div>
            <a href="${link}">Click here to activate your account</a>
            </div>`
        });
        console.log("mail send successfuly");
    }catch(error){
        console.log(error, "mail faild to send");
    }
}

module.exports = {verifyEmail};