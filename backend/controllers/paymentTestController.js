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
      
       
        status = 'success';
    } catch (error) {
        console.error(error);
        status = 'Failure';
    }

    res.json({ error, status, chargeId });
};



module.exports = {HandlerPayment};