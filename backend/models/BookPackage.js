const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
 
const bookPackageSchema = new Schema({ 
    packageId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Package', 
        required:true
    }, 
    userId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required:true
    }, 
    nbPeople: { 
        type: Number, 
        required: true,
        min: 1 
    }, 
    bookingStatus: { 
        type: String, 
        trim: true, 
        enum: ["completed","pending","canceled"], 
        required:true
    }, 
    payment: [{ 
        status: { 
            type: String, 
            enum: ["completed","pending","canceled"], 
            trim: true, 
            required:true
        }, 
        method: { 
            type: String, 
            enum: ["Cash","Online"],
            required:true
        }, 
    }] 
 
},
{timestamps: true}); 
 
const bookPackageModel = mongoose.model('bookPackage',bookPackageSchema); 
module.exports = bookPackageModel;