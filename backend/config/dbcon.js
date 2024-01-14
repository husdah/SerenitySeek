const mongoose = require("mongoose");
//require("dotenv").config();
const uri = process.env.MONGODB_URI;
const connectdb = async(dbURL) =>{
    try{
        await mongoose.connect(dbURL).then(
            ()=> console.log("connected successfully"),
            (err)=> console.log("connection error", err)
        );
    }catch(error){
        console.log(error);
    }
};
connectdb(uri);