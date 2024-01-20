const nodemailer = require('nodemailer');
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
    // 2. Set up message options (who sends what to whom)
    let mailMessage = {
        from: email,
        to: process.env.EMAIL,
        subject: subject,
        text: `First Name: ${fname}\nLast Name: ${lname}\nMessage: ${message}`,
    };

    // 3. Deliver the message object using the sendMail() method of your previously created transporter
    transporter.sendMail(mailMessage, (error, info) => {
        if (error) {
            //console.log(error);
            return res.status(500).send("Internal Server Error");
        } else {
            //console.log("Email sent: " + info.response);
            return res.status(200).send("Email sent successfully");
        }
    });
}

module.exports = { sendMail } ;