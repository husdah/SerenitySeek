const mongoose = require("mongoose");  
const Schema = mongoose.Schema;  
  
const bookPackageSchema = new Schema({  
    companyId: {  
        type: mongoose.Types.ObjectId,  
        ref: 'Company',  
        required:true 
    },  
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
    paidAmount : { 
        type: Number, 
        trim:true, 
        required:true 
    } 
  
}, 
{timestamps: true});  
  
const bookPackageModel = mongoose.model('bookPackage',bookPackageSchema);  
module.exports = bookPackageModel;