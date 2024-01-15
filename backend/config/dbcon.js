const mongoose = require("mongoose");
require('dotenv').config();
const mongoDB_URI = process.env.MONGODB_URI;

async function dbConnect(){
    mongoose.connect(mongoDB_URI, {
        useNewUrlParser: true, // no longer needed, but won't cause an error if left in
        useUnifiedTopology: true, // no longer needed, but won't cause an error if left in
        //useCreateIndex: true,
    })
    .then(() =>{
        console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) =>{
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
    });
}

dbConnect();
module.exports = dbConnect;