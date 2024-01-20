const express=require('express');
const app=express();
const dbConnect=require('./config/dbcon')
const { addAdmin } = require('./controllers/addAdmin');

require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const emailVerifcationRouter = require('./routes/verificationRouter');
app.use("/api", emailVerifcationRouter);

const loggerRouter = require("./routes/loggerRouter");
app.use("/api", loggerRouter);

const userRouter = require("./routes/userRouter");
app.use("/api", userRouter);

const companyRouter = require("./routes/companyRouter");
app.use("/api", companyRouter);

const imgRouter  = require("./routes/imgRouter");
app.use("/api", imgRouter);

const blogRouter = require("./routes/blogRouter");
app.use("/blogs",blogRouter);

const packageRouter = require("./routes/packageRouter");
app.use("/api", packageRouter);

const bookPackageRouter=require("./routes/bookPackageRouter")
app.use("/package",bookPackageRouter);

const hotelRouter = require("./routes/hotelRouter")
app.use("/api", hotelRouter);

const contactRouter = require("./routes/contactRouter")
app.use("/api", contactRouter);

dbConnect()
.then(() => {
    // The database connection is successful, you can start your app logic here
    // e.g., start the server
    app.listen(process.env.PORT, () => {
        console.log('App is listening on port ' + process.env.PORT);
    });

    addAdmin();
})
.catch((error) => {
    // Handle error (e.g., log the error or exit the application)
    console.error('Error connecting to the database:', error.message);
});