const hotelModel = require("../models/Hotel");
const mongoose   = require("mongoose");
const validator  = require("validator");
const fs         = require("fs").promises;


// Function to remove uploaded files
const removeUploadedFiles = async (filePaths) => {
    try {
        for (const filePath of filePaths) {
            await fs.unlink(filePath);
        }
    } catch (err) {
        console.error("Error while deleting files:", err);
    }
}

// add hotel
const addHotel = async (req, res) => {
    const companyId = req.user.id;
    const { name, location, rating } = req.body;
    const oldImagePaths = req.files.map(file => file.path);
    
    if(!companyId){
        await removeUploadedFiles(oldImagePaths);
        return res.status(400).json({message : "You are not authorized to access this request"});
    }
    if( !name || !location || !rating ) {
        await removeUploadedFiles(oldImagePaths);
        return res.status(400).json({message: "All Fields are required!"});
    }
    if(validator.isEmpty(name) || validator.isEmpty(location) || validator.isEmpty(rating) ) {
        await removeUploadedFiles(oldImagePaths);
        return res.status(400).json({message: "All Fields are required!"});
    }
    if (!validator.isNumeric(rating) || rating < 0 || rating > 5){
        await removeUploadedFiles(oldImagePaths);
        return res.status(400).json({message: "Rating must be a number between 0 and 5!"});
    }
    const checkName = await hotelModel.findOne({name : name});
    if(checkName){
        await removeUploadedFiles(oldImagePaths);
        return res.status(400).json({message: "Name Already Exist"});
    }
    try{
        const addHotel = await hotelModel.create ({
            companyId: companyId,
            name: name,
            location: location,
            gallery: req.files,
            rating: rating,
        });
        res.status(201).json({message:'Hotel added successfully!'});
    }
    catch(error){
        await removeUploadedFiles(oldImagePaths);
        return res.status(500).json({error:error.message});
    }
}

// delete hotel
const deleteHotel = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }

    const hotel =  await hotelModel.findOne({_id: id}); 
    const companyId = hotel.companyId;
    const companyIdToken = req.user.id;
    if(!companyId){
        return res.status(400).json({message : "companyId for this hotel is required"});
    }
    if(companyId != companyIdToken){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }
    try{
        const delHotel = await hotelModel.findByIdAndDelete({_id : id});
        if(!delHotel){
            return res.status(404).json({message: "Not Found!"});
        }
        res.status(201).json({message: "Hotel Deleted Succssfully!"});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
}

// get all Hotels for a specific company
const getHotelsByCompanyId = async (req, res) => {        
    try{
        const companyId = req.user.id; 
        if(!companyId){
            return res.status(400).json({message:"companyId parameter is required"});
        }
        const hotels = await hotelModel.find({companyId : companyId});
        if (!hotels) {
            return res.status(404).json({ message: 'No available hotels' });
        }
        res.status(200).json(hotels);
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
}

module.exports = {
    addHotel,
    deleteHotel,
    getHotelsByCompanyId
}