const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const blogSchema=new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    location:{
        type:String,
        trim:true
    },
    /*companyId:{
        type:mongoose.Types.ObjectId,
        ref:"Company"
    },*/
    caption:{
        type:String,
        required:true,
        trim: true,
    },
    gallery:{
        type:Array,
        default:[],
        trim:true
    },
    likes:{
        type:Number ,
        default: 0
    },
   comments:[
    {
        message:{
            type:String,
            required:true,
            trim:true
        },
        userId:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    }
   ]
},{timestamps:true})



const blogModel=mongoose.model("Blog",blogSchema);
module.exports=blogModel;