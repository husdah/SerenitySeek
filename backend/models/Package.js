const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const fs       = require("fs").promises;

const packageSchema = new Schema({
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
    },
    hotelId: {
        type: [mongoose.Types.ObjectId],
        ref: "Hotel",
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        //match: /[a-zA-Z]/,
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
        }],
    }],
    pricePerOne: {
        type: Number, 
        required: true,
    },
    discount: {
        type: Number,
    },
    coverImg: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ["Type", "Adventure", "Beach", "Combination", "Romantic", "Family", "History", "Nature", "Relax"],
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
},
{timestamps: true});

const packageModel = mongoose.model("Package", packageSchema);
module.exports = packageModel;