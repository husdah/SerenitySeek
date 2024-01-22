const packageModel = require("../models/Package");
const validator = require("validator");
const { default: mongoose } = require("mongoose");
const fs = require("fs").promises;

// add a package
const addPackage = async (req, res) => {
    const { hotelId, name, country, destination, pricePerOne, discount, description, type, startDate, duration } = req.body;

    if (!hotelId || !name || !country || !pricePerOne || !description || !type || !startDate || !duration) {
        return res.status(400).json({ message: "All fields are required!" });
    } 
    if (validator.isEmpty(name) || validator.isEmpty(country) || validator.isEmpty(pricePerOne) || validator.isEmpty(description) || validator.isEmpty(type) || validator.isEmpty(startDate) || validator.isEmpty(duration)) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    const checkName = await packageModel.findOne({name : name});
    if(checkName){
        return res.status(400).json({message: "Name Already Exist"});
    }
    /*if (!validator.isNumeric(pricePerOne) || !validator.isNumeric(discount)){
        return res.status(400).json({message: "Should be a number"});
    }*/
    try {
        const addPackage = await packageModel.create({
            companyId: req.user.id,
            hotelId: hotelId,
            name: name,
            country: country,
            destination: destination.map(dest => ({
                name: dest.name,
                activities: dest.activities.map(activity => ({
                    name: activity.name,
                    description: activity.description
                })),
            })),
            pricePerOne: pricePerOne,
            discount: discount,
            coverImg: req.file.filename,
            description: description,
            type: type,
            startDate: startDate,
            duration: duration,
        });
        res.status(201).json({ message: "Package Added Successfully!" });
    } catch (error) {
        //console.error("Error adding package:", error);
        return res.status(400).json({ error: "Failed to add the package. Please try again." });
    }
}

//delete a specific package by using its Id
const deletePackage = async (req, res) => {
    const {id} = req.params;
    
    const package =  await packageModel.findOne({_id: id}); 
    const companyId = package.companyId;
    const companyIdToken = req.user.id;

    if(!companyId){
        return res.status(400).json({message : "companyId is required"});
    }
    if(companyId != companyIdToken){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{
        const delPackage = await packageModel.findByIdAndDelete({_id : id});
        if(!delPackage){
           return res.status(404).json({message: "package Not Found!"});
        }
        res.status(201).json({message: "Package Deleted Succssfully!"});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
}

//update a package according to its Id 
const updatePackageById = async (req, res) => {
    const {id} = req.params;
    const { name, country, destination, pricePerOne, discount, description, type, startDate, duration } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    if(!name || !country || !pricePerOne || !description || !type || !startDate || !duration){
        return res.status(400).json({message: "All fields are required!"});
    }
    if(validator.isEmpty(name) || validator.isEmpty(country) || validator.isEmpty(pricePerOne) || validator.isEmpty(description) || validator.isEmpty(type) || validator.isEmpty(startDate) || validator.isEmpty(duration) ) {
        return res.status(400).json({message: "All fields are required!"});
    }
    const package =  await packageModel.findOne({_id: id}); 
    const companyId = package.companyId;
    const companyIdToken = req.user.id;
    if(!companyId){
        return res.status(400).json({message : "companyId is required"});
    }
    if(companyId != companyIdToken){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }
    try{
        const updatePackage = await packageModel.findOneAndUpdate( {_id : id}, {...req.body});
        if(!updatePackage){
            return res.status(404).json({message: "Package Not Found!"});
        }
        res.status(201).json({message: "Package Updated Succssfully!"});
    }catch(error){
        console.error("Error adding package:", error);
        return res.status(500).json({error: error.message});
    }
}

//select all packages to display them in package page
const getAllPackages = async (req, res) => {
    try{
        const packages = await packageModel.find();
        if(!packages){
            res.status(404).json({message: "No Available Packages!"});
        }
        res.status(200).json(packages);
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

//select packages to display them in home page 
const getHomePackages = async (req, res) => {
    try {
        const count = 4; // Set the default value to 5
        const packages = await packageModel.find().limit(count);

        if (!packages || packages.length === 0) {
            return res.status(404).json({ message: "No Available Packages!" });
        }
        res.status(200).json(packages);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
//select all packages of this company: filter by companyId or company interface as table
const getPackagesByCompanyId = async (req, res) => {
    try {
        const companyId = req.user.id; 
        if (!companyId) {
            return res.status(400).json({message:"companyId parameter is required"});
        }
        const packages = await packageModel.find({ companyId: companyId });

        if (!packages || packages.length === 0) {
            return res.status(404).json({ message: 'No packages found for this company' });
        }
        res.status(200).json(packages);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

//select specific package to view details of each package for user when display it, or when editing
const getPackageDetailsById = async (req, res) => {
    const {id} = req.params;
    /*const package =  await packageModel.findOne({_id: id}); 
    const companyId = package.companyId;
    const companyIdToken = req.user.id;*/
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{
        const package = await packageModel.findOne({_id : id});
        if(!package){
            res.status(404).json({message: "package Not Found!"});
        }
        res.status(200).json(package);
    }catch(error){
        res.status(400).json({error: error.message});
    }

}



module.exports = {
    addPackage,
    updatePackageById,
    deletePackage,
    getAllPackages,
    getHomePackages,
    getPackagesByCompanyId,
    getPackageDetailsById
    
}