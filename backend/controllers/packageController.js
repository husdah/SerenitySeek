const packageModel = require("../models/Package");
const validator = require("validator");
const { default: mongoose } = require("mongoose");
const fs = require("fs").promises;

// add a package
const addPackage = async (req, res) => {
    const { companyId, hotelId, name, nameDestination, activityName, activityDescription, country, pricePerOne, discount, description, type, startDate, duration } = req.body;
    
    //companyid get from param when company click on page package to add a new one
    // Validate if required fields are present

    if(!name || !country || !pricePerOne || !description || !type || !startDate || !duration ){
        return res.status(400).json({message: "All fields are required!"});
    }
    else if(validator.isEmpty(name) || validator.isEmpty(country) || validator.isEmpty(pricePerOne) || validator.isEmpty(description) || validator.isEmpty(type) || validator.isEmpty(startDate) || validator.isEmpty(duration) ) {
        return res.status(400).json({message: "All fields are required!"});
    }
    try{
        const addPackage = await packageModel.create({
            companyId: companyId,
            hotelId: hotelId,
            name: name,
            country: country,
            destination: destination.map(dest => ({
                name: dest.name,
                activities: dest.activities.map(activity => ({
                    name: activity.name,
                        description: activity.description,
                })),
            })),
            pricePerOne: pricePerOne,
            discount: discount,
            //coverImg: req.file.filename,
            description: description,
            type: type,
            startDate: startDate,
            duration: duration,
        });
        res.status(201).json({message: "Package Added Succssfully!"});
    }catch (error) {
        console.error(error);
        res.status(400).json({ error: "Failed to add the package. Please try again." });
    }
}


//update a package according to its Id 
const updatePackageById = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{
        const updateProfile = await packageModel.findOneAndUpdate({_id : id},{...req.body});
        if(!updateProfile){
            res.status(404).json({message: "Package Not Found!"});
        }
        res.status(201).json({message: "Package Updated Succssfully!"});
    }catch(error){
        res.status(400).json({error: error.message});
    }

}

//delete a specific package by using its Id
const deletePackage = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{
        const delPackage = await packageModel.findByIdAndDelete({_id : id});
        if(!delPackage){
            res.status(404).json({message: "package Not Found!"});
        }
        res.status(201).json({message: "Package Deleted Succssfully!"});
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

//select all packages to display them in package page
const getAllPackages = async (req, res) => {
    try{
        const package = await packageModel.find();
        if(!package){
            res.status(404).json({message: "No Available Packages!"});
        }
        res.status(200).json(package);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

//select specific package to view details of each package for user when display it, or when editing
const getPackageDetailsById = async (req, res) => {
    const {id} = req.params;
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

//select 2 packages to display them in home page 
const getSomePackages = async (req, res) => {
    try {
        const count = 2; // Set the default value to 5
        const packages = await packageModel.find().limit(count);

        if (!packages || packages.length === 0) {
            res.status(404).json({ message: "No Available Packages!" });
        }

        res.status(200).json(packages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
} 

//select 2 packages randomly and with limited attributes to display them in home page
const getSomePackagesRandomly = async (req, res) => {
    try {
        const packages = await packageModel.aggregate([
            { $sample: { size: 2 } }, // To fetch randomly
            { $project: { _id: 1, name: 1, description: 1 } } // To select only specified fields
        ]);

        if (!packages || packages.length === 0) {
            res.status(404).json({ message: "No Available Packages!" });
        }

        res.status(200).json(packages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
} 

//select all packages of this company: bl search or filter by company
const getPackagesByCompanyId = async (req, res) => {
    try {
        const companyId = req.query.companyId; 
        if (!companyId) {
            return res.status(404).json({ message: 'companyId is required' });
        }
        const packages = await packageModel.find({ companyId: companyId });

        if (!packages || packages.length === 0) {
            return res.status(404).json({ message: 'No packages found for this company' });
        }
        res.status(200).json(packages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addPackage,
    updatePackageById,
    deletePackage,
    getAllPackages,
    getPackageDetailsById,
    getSomePackages,
    getSomePackagesRandomly,
    getPackagesByCompanyId
}