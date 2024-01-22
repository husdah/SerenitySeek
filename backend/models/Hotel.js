const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        //match: /[a-zA-Z]/,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    gallery: {
        type: Array,
        default: [],
        required: true,  
    },
    rating: {
        type: Number,
        required: true, 
        min: 0,
        max: 5,
        default:0, 
    },
})

const hotelModel = mongoose.model("Hotel", hotelSchema)
module.exports = hotelModel;