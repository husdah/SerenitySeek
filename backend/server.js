const express=require('express');
const dbConnect=require('./config/dbcon')

require('dotenv').config();

const app=express();
app.use(express.json())

const userRouter = require("./routes/userRouter");
app.use("/user", userRouter);

app.get('/',(req,res)=>{
    res.json({mssg:"welcome to the app"})
})

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