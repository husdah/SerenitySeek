const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const companySchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique: [true, "Company name already exist!"],
        match:/^[a-zA-Z ]+$/
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true,
        validation: {
            validator: function(value){
                return /^(03|71|70|76|78|79|81)\d{6}$/.test(value);
            },
            message: "Phone number is not valid!"
        }
    },
    location:{
        type:String,
        required:true,
        trim:true,
    },
    logo:{
        type:String,
        required:true,
        trim:true,
    },
    license:{
        type:String,
        required:true,
        trim:true,
    }/* ,
    rate:{
        type:Number,
        required:true,
        trim:true,
        min:0,
        max:5,
        default:0
    },
    customers:{
        type:[mongoose.Types.ObjectId],
        ref:"User"
    } */

 },{timestamps:true})

const companyModel=mongoose.model("Company",companySchema)
module.exports=companyModel;