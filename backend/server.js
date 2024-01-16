const express=require('express');
const app=express();
const dbConnect=require('./config/dbcon')
const path = require("path");
const multer = require('multer');

require('dotenv').config();

const mongoose = require("mongoose");
const companyModel = require("./models/Company");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage }).single("logo");

app.use(express.json())

const userRouter = require("./routes/userRouter");
app.use("/user", userRouter);

const companyRouter = require("./routes/companyRouter");
app.use("/api", companyRouter);

/* app.put("/api/uploadCompanyLogo/:id", upload.single("logo"), async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{
        
        const uploadImg = await companyModel.findOneAndUpdate({_id : id}, {logo: req.file.filename} , { new: true });
        if(!uploadImg){
            return res.status(404).json({message : "Company Not Found"});
        }
        res.status(201).json({ message: 'Logo updated successfully!', updatedCompany: uploadImg });
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}); */

app.put("/api/uploadCompanyLogo/:id", (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    let FileName = req.file.filename;
    try{
        upload(req, res, async (err) => {
            if(err){
                console.log(err);
            }else{
                const uploadImg = await companyModel.findOneAndUpdate({_id : id}, {logo: FileName} , { new: true });
                if(!uploadImg){
                    return res.status(404).json({message : "Company Not Found"});
                }
                res.status(201).json({ message: 'Logo updated successfully!', updatedCompany: uploadImg });
            }
        })
    }catch(error){
        return res.status(500).json({error : error.message});
    }
});

const blogRouter = require("./routes/blogRouter");
app.use("/blogs",blogRouter);

const packageRouter = require("./routes/packageRouter");
app.use("/package", packageRouter);

const bookPackageRouter=require("./routes/bookPackageRouter")
app.use("/package",bookPackageRouter);


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