const userModel = require("../models/User");
const accountModel = require("../models/Account");

const signUpUser = async (req, res) =>{
    const {Fname, Lname, phoneNumber, email, password} = req.body;
    //here validation before add
    try{
        const addedUser = await userModel.create({
            Fname: Fname,
            Lname: Lname,
            phoneNumber: phoneNumber,
        });

        const addedAccount = await accountModel.create({
            email: email,
            password: password,
            role: 1,
            userId: addedUser._id,
        });

        res.status(201).json({message: "User Added Succssfully!"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {signUpUser};