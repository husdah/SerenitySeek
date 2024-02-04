const mongoose = require("mongoose");
const companyModel = require("../models/Company");
const accountModel = require("../models/Account");
const validator = require("validator");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const { verifyEmail } = require('./verifyEmailController');
const crypto = require('crypto');

const createCompany = async (req, res) =>{
    const {name , description, location, phoneNumber, email, password, confirmPassword} = req.body;
    const phoneNumberRegex = /^(03|71|70|76|78|79|81)\d{6}$/;
    //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",<.>\/?\\[\]`~])(.{8,})$/;
    const oldImagePath = './uploads/' + req.file.filename;

    if(!name || !description || !phoneNumber || !location || !email || !password || !confirmPassword){
        if (req.file) {
            await fs.unlink(oldImagePath);
        }
        return res.status(400).json({error: "All Fields are required!"});
    }
    if(validator.isEmpty(name) || validator.isEmpty(description) || validator.isEmpty(phoneNumber) || validator.isEmpty(location) || validator.isEmpty(email) || validator.isEmpty(password)  || validator.isEmpty(confirmPassword)){
        if (req.file) {
             await fs.unlink(oldImagePath);
        }
        return res.status(400).json({error: "All Fields are required!"});
    }
    if(!validator.isEmail(email)){
        if (req.file) {
             await fs.unlink(oldImagePath);
        }
        return res.status(400).json({error: "Email is not valid"});
    }
    if(!validator.isMobilePhone(phoneNumber)){
        if (req.file) {
             await fs.unlink(oldImagePath);
        }
        return res.status(400).json({error: "Phone Number is not valid"});
    }
    if(!phoneNumberRegex.test(phoneNumber)){
        if (req.file) {
             await fs.unlink(oldImagePath);
        }
        return res.status(400).json({error: "Phone Number is not valid"});
    }
    if(!validator.isStrongPassword(password)){
        if (req.file) {
             await fs.unlink(oldImagePath);
        }
        return res.status(400).json({error: "Please enter a stronger password"});
    }
    if(!validator.equals(confirmPassword,password)){
        if (req.file) {
             await fs.unlink(oldImagePath);
        }
        return res.status(400).json({error: "Confirmation password is invalid"});
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const checkName = await companyModel.findOne({name : name});
        if(checkName){
            if (req.file) {
                 await fs.unlink(oldImagePath);
            }
            return res.status(400).json({error: "Company Name Already Exist"});
        }

        // Check if req.file exists
        if (!req.file) {
            return res.status(400).json({ error: "Please upload your company license!" });
        }

        const checkEmail = await accountModel.findOne({email : email});
        if(checkEmail){
            if (req.file) {
                 await fs.unlink(oldImagePath);
            }
            return res.status(400).json({error: "Email Already Exist"});
        }

        const checkPhone = await accountModel.findOne({phoneNumber : phoneNumber});
        if(checkPhone){
            if (req.file) {
                 await fs.unlink(oldImagePath);
            }
            return res.status(400).json({error: "Phone Number Already Exist"});
        }

        const addedCompany = await companyModel.create({
            name: name,
            description: description,
            location: location,
            license: req.file.filename,
        });

        if(addedCompany){
            const createAccount = await accountModel.create({
                email: email,
                phoneNumber: phoneNumber,
                password: hashedPassword,
                role: 2,
                companyId: addedCompany._id,
                verificationToken : crypto.randomBytes(16).toString('hex')
            });

            if(createAccount){
                const link = `http://localhost:4000/api/EmailConfirm/${createAccount.verificationToken}`;
                await verifyEmail(email, link);
                res.status(200).send({message : "Company Added. Please confirm your email"})
            }
        }
       // res.status(201).json({message : "Company Added Successfully"});
    }catch(error){
        if (req.file) {
             await fs.unlink(oldImagePath);
        }
        return res.status(500).json({error : error.message});
    }
}

const getCompanyById = async (req, res) =>{
    const {id} = req.params;
    try{
        const company = await companyModel.findOne({_id : id});
        if(!company){
            return res.status(404).json({error : "Company Not Found"});
        }
        const account = await accountModel.findOne({companyId: id});
        if(!account){
            res.status(404).json({error: "Company Account Not Found!"});
        }
        res.status(200).json({
            name: company.name, 
            description: company.description, 
            location: company.location,
            logo: company.logo, 
            email: account.email, 
            phoneNumber: account.phoneNumber});
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}

const getAllCompanies = async (req, res) =>{
    try{
        const companies = await companyModel.find();
        if(!companies || companies.length === 0){
            return res.status(404).json({message : "No Available Companies"});
        }
        res.status(200).json(companies);
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}

const getHomeCompanies = async (req, res) =>{
    try{
        const companies = await companyModel.find().limit(4);;
        if(!companies || companies.length === 0){
            return res.status(404).json({message : "No Available Companies"});
        }
        res.status(200).json(companies);
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}

const updateCompanyInfo = async (req, res) =>{
    const {id} = req.params;
    const {name , description, location, email, phoneNumber} = req.body;
    const phoneNumberRegex = /^(03|71|70|76|78|79|81)\d{6}$/;

    if(id != req.user.id){
        return res.status(400).json({error : "You are not authorized to access this request"});
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "not a valid Id!"});
    }
    if(!name || !description || !location){
        return res.status(400).json({error: "All Fields are required!"});
    }
    if(validator.isEmpty(name) || validator.isEmpty(description) || validator.isEmpty(location) || validator.isEmpty(email) || validator.isEmpty(phoneNumber)){
        return res.status(400).json({error: "Fields cannot be empty!"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({error: "Email is not valid"});
    }
    if(!validator.isMobilePhone(phoneNumber) || !phoneNumberRegex.test(phoneNumber)){
        return res.status(400).json({error: "Phone Number is not valid"});
    }
    try{
        const checkName = await companyModel.findOne({ name: name, _id: { $ne: id } });
        if (checkName) {
            return res.status(400).json({ message: "Company Name Already Exists" });
        }

        const checkEmail = await accountModel.findOne({ email: email, companyId: { $ne: id } });
        if (checkEmail) {
            return res.status(400).json({ error: "Email Already Exists" });
        }
        const checkPhone = await accountModel.findOne({ phoneNumber: phoneNumber, companyId: { $ne: id } });
        if (checkPhone) {
            return res.status(400).json({ error: "Phone Number Already Exists" });
        }

        const updateAccount = await accountModel.findOneAndUpdate({companyId: id},{email: email, phoneNumber: phoneNumber});
        if(!updateAccount){
            return res.status(404).json({error: "Company Account Not Found!"});
        }
        
        const updateCompany = await companyModel.findOneAndUpdate({_id : id}, {name: name, description: description, location: location});
        if(!updateCompany){
            return res.status(404).json({error : "Company Not Found"});
        }
        return res.status(201).json({message : "Company Info Updated Successfully!"});
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}

const acceptCompany = async (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{ 
        const acceptCompany = await companyModel.findOneAndUpdate({_id : id}, {active : true});
        if(!acceptCompany){
            return res.status(404).json({message : "Company Not Found"});
        }
        res.status(201).json({message : "Company is now active!"});
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}

const deleteCompany = async (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{ 
        const deleteCompany = await companyModel.findOneAndDelete({_id : id});
        if(!deleteCompany){
            return res.status(404).json({message : "Company Not Found"});
        }else{
            const deleteCompanyAcc = await accountModel.findOneAndDelete({companyId : id});
        }
        res.status(201).json({message : "Company Deleted Successfully!"});
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}

const rateCompany = async (req, res) => {
    //const {companyId} = req.params;
    const {companyId,userId, rating } = req.body;

    if(userId != req.user.id){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }

    try {
        // Check if the user is a customer of the company
        const company = await companyModel.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        const isCustomer = company.customers.some(customerId => customerId.equals(userId));
        let availableCustomers = company.customers;
        if (!isCustomer) {
            return res.status(403).json({ message: "User is not a customer of this company", availableCustomers });
        }

        if (isNaN(rating) || rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Invalid rating value" });
        }

        // Update the rate based on your logic
        company.rate = (company.rate + rating) / 2;

        // Save the updated company
        const updatedCompany = await company.save();

        res.status(200).json({ message: "Rating updated successfully", updatedCompany });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updatePassword=async (req, res) =>{
    const {id} = req.params;
    const {password, confirmPassword} = req.body;

    if(id != req.user.id){
        return res.status(400).json({error : "You are not authorized to access this request"});
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "not a valid Id!"});
    }
    if(!password || !confirmPassword){
        return res.status(422).json({error: "All fields are required!", body});
    }
    if(!validator.isStrongPassword(password)){
        return res.status(422).json({error: "Please enter a stronger password"});
    }
    if(!validator.equals(confirmPassword,password)){
        return res.status(422).json({error: "Confirmation password is invalid"});
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   
    try{
        const updateAccount = await accountModel.findOneAndUpdate({companyId: id},{password: hashedPassword});
        if(!updateAccount){
            return res.status(404).json({error: "Company Account Not Found!"});
        }
        res.status(201).json({message: "Password Updated Succssfully!"});
    }catch(error){
        res.status(400).json({error: error.message});
    }

}


module.exports = 
{
    createCompany,
    getCompanyById,
    getAllCompanies,
    getHomeCompanies,
    updateCompanyInfo,
    acceptCompany,
    deleteCompany,
    rateCompany,
    updatePassword
};