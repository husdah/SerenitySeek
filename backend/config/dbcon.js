const mongoose = require("mongoose");
require('dotenv').config();
const mongoDB_URI = process.env.MONGODB_URI;

function dbConnect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(mongoDB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Successfully connected to MongoDB Atlas!");
            resolve();  // Resolve the Promise if the connection is successful
        })
        .catch((error) => {
            console.log("Unable to connect to MongoDB Atlas!");
            console.error(error);
            reject(error); // Reject the Promise if there is an error
        });
    });
}

module.exports = dbConnect;