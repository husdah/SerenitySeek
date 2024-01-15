const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
 
const bookPackageSchema = new Schema({ 
    packageId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Package', 
    }, 
    userId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
    }, 
    nbPeople: { 
        type: Number, 
        required: true, 
    }, 
    bookingStatus: { 
        type: String, 
        trim: true, 
        enum: ["completed","pending","canceled"], 
    }, 
    payment: [{ 
        status: { 
            type: String, 
            enum: ["completed","pending","canceled"], 
            trim: true, 
        }, 
        method: { 
            type: String, 
            enum: ["Cash","Online"] 
        }, 
    }] 
 
},
{timestamps: true}); 
 
const bookPackageModel = mongoose.model('bookPackage',bookPackageSchema); 
module.exports = bookPackageModel;