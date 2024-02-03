const Stripe = require('stripe')("sk_test_51ObTfZDOmCem7mO8Ji5Dl6OOiQDWzs0ONfhjKC8z3cvosUvlwspjnMNJSxv09m3KmFbiYuJ66G2ixt54vR0P2aL600Gf5C8XUZ");
const nodemailer = require('nodemailer');
const accountModel = require('../models/Account');
const bookPackageModel = require('../models/BookPackageModel');

const HandlerPayment = async (req, res) => {
    let status, error, chargeId;

    const { token, amount, userId, companyId } = req.body;

    try {
        const charge = await Stripe.charges.create({
            source: token.id,
            amount,
            currency: 'usd',
            metadata: {
                userId: userId.toString(),
                companyId: companyId.toString(),
            },
        });

        // Extract the charge ID from the response
        chargeId = charge.id;
        async function sendPaymentConfirmationEmail() {
            const user = await accountModel.findOne({ userId: userId });
                
            if (!user) {
             return res.status(400).json("user is not valid");
            }
        
            const userEmail = user.email;
            // Create a nodemailer transporter
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "serenityseek2024@gmail.com",
                    pass: "vlub ghpe zoxn jjxy",
                },
            });
        
        
            let mailOptions = {
                from: "serenityseek2024@gmail.com",
                to: userEmail,
                subject: "Confirmation Email",
                text: "Thank you for your payment! Your payment was successful. Charge ID: ${chargeId}",
            };
        
            try {
                // Send email
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
            }
        
        }

        await sendPaymentConfirmationEmail();
      
       
        status = 'success';
    } catch (error) {
        console.error(error);
        status = 'Failure';
    }

    res.json({ error, status, chargeId });
};



module.exports = {HandlerPayment};