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
    companyId:{
        type:mongoose.Types.ObjectId,
        ref:"Company"
    },
    caption:{
        type:String,
        required:true,
        trim: true
    },
    gallery:{
        type:[String],
        trim:true
    },
    likes:{
        type:Number 
    },
   comments:[
    {
        userId:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        },
        message:{
            type:String,
            required:true,
            trim:true
        }
    }
   ]
},{timestamps:true})

const blogModel=mongoose.model("Blog",blogSchema);
module.exports=blogModel;