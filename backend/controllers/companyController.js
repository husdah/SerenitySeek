const mongoose = require("mongoose");
const companyModel = require("../models/Company");
const accountModel = require("../models/Account");
const validator = require("validator");
const bcrypt = require("bcrypt");

const createCompany = async (req, res) =>{
    const {name , description, phoneNumber, location, license, email, password} = req.body;

    if(!name || !description || !phoneNumber || !location || !license || !email || !password){
        return res.status(400).json({message: "All Fields are required!"});
    }
    if(validator.isEmpty(name) || validator.isEmpty(description) || validator.isEmpty(phoneNumber) || validator.isEmpty(location) || validator.isEmpty(license) || validator.isEmpty(email) || validator.isEmpty(password)){
        return res.status(400).json({message: "All Fields are required!"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message: "Email is not valid"});
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{ 
        const addedCompany = await companyModel.create({
            name: name,
            description: description,
            location: location,
            license: license,
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
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
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
        }
        res.status(201).json({message : "Company Deleted Successfully!"});
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}

const rateCompany = async (req, res) => {
    const {companyId} = req.params;
    const {userId, rating } = req.body;

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