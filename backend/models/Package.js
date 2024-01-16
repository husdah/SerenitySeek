const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    /*companyId: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
    },*/
    companyId: {
        type: Number,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /[a-zA-Z]/,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    destination: [{
        name:{
            type: String,
            required: true,
            trim: true,
        },
        activities: [{
            name: {
                type: String,
                required: true,
                trim: true,
                match: /[a-zA-Z]/,
            },
            description: {
                type: String,
                required: true,
                trim: true,
            },
            /*gallery: {
                type: [String],
                required: true,  
            },*/
        }],
    }],
    pricePerOne: {
        type: String, //change from number to string to add currency
        required: true,
    },
    discount: {
        type: Number,
    },
    coverImg: {
        type: String,
        //required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ["Culture", "Tourism"],
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    hotel: [{
        name: {
            type: String,
            required: true,
            trim: true,
            match: /[a-zA-Z]/,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        /*gallery: {
            type: [String],
            required: true,  
        },*/
        rating: {
            type: Number,
            required: true, 
            min: 0,
            max: 5,
            default:0, 
        },
    }],
},
{timestamps: true});

const packageModel = mongoose.model("Package", packageSchema);
module.exports = packageModel;