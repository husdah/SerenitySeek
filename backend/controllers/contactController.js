const nodemailer = require('nodemailer');
const validator = require("validator");
require('dotenv').config();

// 1. Create a Nodemailer transporter using either SMTP or some other transport mechanism

let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_KEY_PASS,
    },
});


const sendMail = async (req, res) => {
    // get the data from request body 
    const { fname, lname, email, subject, message } = req.body;
    
    if(!fname || !lname || !email || !subject || !message){
        return res.status(400).json({message:"All fields are required"});
    }
    if(validator.isEmpty(fname) || validator.isEmpty(lname) || validator.isEmpty(email) || validator.isEmpty(subject) || validator.isEmpty(message)){
        return res.status(400).json({message: "All Fields are required!"});
    }
    if(!validator.isAlpha(fname)){
        return res.status(400).json({message: "First Name is invalid!"});
    }
    if(!validator.isAlpha(lname)){
        return res.status(400).json({message: "Last Name is invalid!"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message: "Email is not valid"});
    }
    if(!validator.matches(subject, /^[a-zA-Z\s]+$/)){
        return res.status(400).json({message: "Subject is invalid!"});
    }
    if (!validator.isLength(message, { min: 1, max: 50 })) {
        return res.status(400).json({ message: 'Message must be between 1 and 50 characters long' });
    }
    
    // 2. Set up message options (who sends what to whom)
    let mailMessage = {
        from: email,
        to: process.env.EMAIL,
        subject: subject,
        text: `Name: ${fname} ${lname} \n Message: ${message}`,
    };

    // 3. Deliver the message object using the sendMail() method of your previously created transporter
    transporter.sendMail(mailMessage, (error, info) => {
        if (error) {
            //console.log(error);
           return res.status(200).json({ message: 'Internal Server Error' });
           
        } 
        else {
            //console.log("Email sent: " + info.response);
            return res.status(200).json({ message: 'Email sent successfully' });
        }
    });
}

module.exports = { sendMail } ;