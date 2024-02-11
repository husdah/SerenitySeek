const express = require('express');
const router = express.Router();
const accountModel = require('../models/Account');

router.get('/EmailConfirm/:token', async(req, res) =>{
    try{
        const {token} = req.params;
        const account = await accountModel.findOneAndUpdate({verificationToken: token},{verificationToken : "verified"});
        if(account){
            //return res.status(200).json({message: "Email verified successfully!"});
            //redirect in frontend
            return res.redirect('http://localhost:3000/email-verification-success'); // Adjust the URL as needed
        }else{
            return res.status(404).json({error: "Invalid Token"});
        }
    }catch(error){
        return res.status(400).json({error: error.message});
    }
})

module.exports = router;