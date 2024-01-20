const hotelModel = require("../models/Hotel");
const mongoose   = require("mongoose");
const validator  = require("validator");
const fs         = require("fs").promises;

// add hotel
const addHotel = async (req, res) => {
    const companyId = req.user.id;
    const { name, location, rating } = req.body;
    if(!companyId){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }
    if( !name || !location || !rating || !req.files) {
        return res.status(400).json({message: "All Fields are required!"});
    }
    if(validator.isEmpty(name) || validator.isEmpty(location) || validator.isEmpty(rating)) {
        return res.status(400).json({message: "All Fields are required!"});
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
        res.status(500).json({error:error.message});
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
    if(req.user.role != 2 || companyId != req.user.id){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }
    try{
        const delHotel = await hotelModel.findByIdAndDelete({_id : id});
        if(!delHotel){
            res.status(404).json({message: "Not Found!"});
        }
        res.status(201).json({message: "Hotel Deleted Succssfully!"});
    }
    catch(error){
        res.status(400).json({error: error.message});
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
        res.status(400).json({error:error.message});
    }
}

module.exports = {
    addHotel,
    deleteHotel,
    getHotelsByCompanyId 
}