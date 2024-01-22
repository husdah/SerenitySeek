const accountModel = require('../models/Account');
const bcrypt = require('bcrypt');

const addAdmin = async (req, res) =>{
    const adminCheck = await accountModel.findOne({role : 0});

    if(!adminCheck){
        const salt = await bcrypt.genSaltSync(10);
        const password = "Admin@123";
        const hashedPassword = await bcrypt.hash(password, salt);
        const adminAccount = await accountModel.create({
            email: "serenitySeekAdmin@gmail.com",
            phoneNumber: "70085351",
            password : hashedPassword,
            role : 0,
            verificationToken: "verified"
        });

        if(adminAccount){
            console.log("Admin Added Successfully!");
        }
    }
}

module.exports = {addAdmin};