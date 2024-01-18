const express=require('express');
const app=express();
const dbConnect=require('./config/dbcon')

require('dotenv').config();
app.use(express.json())

const userRouter = require("./routes/userRouter");
app.use("/user", userRouter);

const companyRouter = require("./routes/companyRouter");
app.use("/api", companyRouter);

const imgRouter  = require("./routes/imgRouter");
app.use("/api", imgRouter);

const blogRouter = require("./routes/blogRouter");
app.use("/blogs",blogRouter);

const packageRouter = require("./routes/packageRouter");
app.use("/package", packageRouter);

const bookPackageRouter=require("./routes/bookPackageRouter")
app.use("/package",bookPackageRouter);

const hotelRouter = require("./routes/hotelRouter")
app.use("/hotel", hotelRouter);

dbConnect()
.then(() => {
    // The database connection is successful, you can start your app logic here
    // e.g., start the server
    app.listen(process.env.PORT, () => {
        console.log('App is listening on port ' + process.env.PORT);
    });
})
.catch((error) => {
    // Handle error (e.g., log the error or exit the application)
    console.error('Error connecting to the database:', error.message);
});