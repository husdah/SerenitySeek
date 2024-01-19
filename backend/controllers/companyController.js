const mongoose = require("mongoose");
const companyModel = require("../models/Company");
const accountModel = require("../models/Account");
const validator = require("validator");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

const createCompany = async (req, res) =>{
    const {name , description, location, phoneNumber, email, password, confirmPassword} = req.body;
    const phoneNumberRegex = /^(03|71|70|76|78|79|81)\d{6}$/;
    //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",<.>\/?\\[\]`~])(.{8,})$/;

    if(!name || !description || !phoneNumber || !location || !email || !password || !confirmPassword){
        return res.status(400).json({message: "All Fields are required!"});
    }
    if(validator.isEmpty(name) || validator.isEmpty(description) || validator.isEmpty(phoneNumber) || validator.isEmpty(location) || validator.isEmpty(email) || validator.isEmpty(password)  || validator.isEmpty(confirmPassword)){
        return res.status(400).json({message: "All Fields are required!"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message: "Email is not valid"});
    }
    if(!validator.isMobilePhone(phoneNumber)){
        return res.status(400).json({message: "Phone Number is not valid"});
    }
    if(!phoneNumberRegex.test(phoneNumber)){
        return res.status(400).json({message: "Phone Number is not valid"});
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({message: "Please enter a stronger password"});
    }
    if(!validator.equals(confirmPassword,password)){
        return res.status(400).json({message: "Confirmation password is invalid"});
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const checkName = await companyModel.findOne({name : name});
        if(checkName){
            return res.status(400).json({message: "Company Name Already Exist"});
        }

        // Check if req.file exists
        if (!req.file) {
            return res.status(400).json({ message: "Please upload your company license!" });
        }

        const checkEmail = await accountModel.findOne({email : email});
        if(checkEmail){
            return res.status(400).json({message: "Email Already Exist"});
        }

        const checkPhone = await accountModel.findOne({phoneNumber : phoneNumber});
        if(checkPhone){
            return res.status(400).json({message: "Phone Number Already Exist"});
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
                companyId: addedCompany._id
            });
        }
        res.status(201).json({message : "Company Added Successfully!"});
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}

const getCompanyById = async (req, res) =>{
    const {id} = req.params;
    try{
        const company = await companyModel.find({_id : id});
        if(!company){
            return res.status(404).json({message : "Company Not Found"});
        }
        res.status(200).json(company);
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
    const {name , description, location} = req.body;

    if(req.user.role != 2 || id != req.user.id){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    if(!name || !description || !location){
        return res.status(400).json({message: "All Fields are required!"});
    }
    if(validator.isEmpty(name) || validator.isEmpty(description) || validator.isEmpty(location)){
        return res.status(400).json({message: "Fields cannot be empty!"});
    }
    try{ 
        const updateCompany = await companyModel.findOneAndUpdate({_id : id}, {...req.body});
        if(!updateCompany){
            return res.status(404).json({message : "Company Not Found"});
        }
        res.status(201).json({message : "Company Updated Successfully!"});
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}

const acceptCompany = async (req, res) =>{
    const {id} = req.params;

    if(req.user.role != 0){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }

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

    if(req.user.role != 0){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }

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

    if(req.user.role != 1 || userId != req.user.id){
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


module.exports = 
{
    createCompany,
    getCompanyById,
    getAllCompanies,
    getHomeCompanies,
    updateCompanyInfo,
    acceptCompany,
    deleteCompany,
    rateCompany
};