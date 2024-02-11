const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const companySchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique: [true, "Company name already exist!"],
        //match:/^[a-zA-Z ]+$/
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
        trim:true,
    },
    logo:{
        type:String,
        required:false,
        trim:true,
    },
    license:{
        type:String,
        required:true,
        trim:true,
    },
    active: {
        type: Boolean,
        default: false
    },
    rate:{
        value: {
            type:Number,
            min:0,
            max:5,
            default:0
        },
        raters: {
            type:[mongoose.Types.ObjectId],
            ref:"User"
        }
    },
    customers:{
        type:[mongoose.Types.ObjectId],
        ref:"User"
    }

 },{timestamps:true})

const companyModel=mongoose.model("Company",companySchema)
module.exports=companyModel;