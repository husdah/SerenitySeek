const bookPackageModel=require("../models/BookPackageModel")
const nodemailer = require('nodemailer');
const companyModel=require("../models/Company")
const accountModel=require("../models/Account")
const mongoose=require("mongoose")

//get all books
const companyBooks=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{
        const books=await bookPackageModel.find({companyId:id});
        return res.status(200).json(books);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
}
//book package
const bookPackage = async (req, res) => {
    const { companyId, packageId, userId, nbPeople, paidAmount } = req.body;
  
    if (!companyId || !packageId || !userId || !nbPeople || !paidAmount) {
      return res.status(400).json({ msg: "All fields are required!" });
    }
  
    if (
      !mongoose.Types.ObjectId.isValid(companyId) ||
      !mongoose.Types.ObjectId.isValid(packageId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ msg: "Not a valid id" });
    }
  
    try {
      const existingBooking = await bookPackageModel.findOne({
        packageId,
        userId,
      });
  
      if (existingBooking) {
        return res.status(400).json({
          msg: "You already booked this package.",
        });
      }
  
      const newBooking = await bookPackageModel.create({
        companyId,
        packageId,
        userId,
        nbPeople,
        paidAmount,
      });
  
      try {
        const company = await companyModel.findOne({ _id: companyId });
        const customer = await company.customers.some((customerId) =>
          customerId.equals(userId)
        );
  
        if (!customer) {
          const updatedCompany = await companyModel.findOneAndUpdate(
            { _id: companyId },
            { $push: { customers: userId } }
          );
        }
        async function sendPaymentConfirmationEmail() {
          const user = await accountModel.findOne({ userId: userId });
              
          if (!user) {
           return res.status(400).json({msg:"user is not valid"});
          }
      
          const userEmail = user.email;
          let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: "serenityseek2024@gmail.com",
                  pass: "vlub ghpe zoxn jjxy",
              },
          });
      
      
          let mailOptions = {
              from: "serenityseek2024@gmail.com",
              to: userEmail,
              subject: "Confirmation Email",
              text: "Thank you for your payment! Your payment was successful.",
          };
      
          try {
              // Send email
              await transporter.sendMail(mailOptions);
              console.log('Email sent successfully');
          } catch (error) {
              console.error('Error sending email:', error);
          }
      
      }

      await sendPaymentConfirmationEmail();
  
        return res.status(200).json(newBooking);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
//cancel booking
const cancelBooking = async (req, res) => {
    const { id } = req.params;
  
    try {
     
      const canceledBooking = await bookPackageModel.findByIdAndDelete({ _id: id });
      const { userId, companyId } = canceledBooking;
  
      const otherBookings = await bookPackageModel.find({ userId: userId });
  
      if (!otherBookings || otherBookings.length === 0) {
        await companyModel.findOneAndUpdate(
          { _id: companyId },
          { $pull: { customers: userId } }, 
          { new: true, useFindAndModify: false }
        );
      }
  
      return res.status(200).json(canceledBooking);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  

//search for booked packages for a specific user
//bde eshteghela aal jwt
const userBookPackages=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{
        const userPackages=await bookPackageModel.find({userId:id});
        return res.status(200).json(userPackages);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

//update the booked package
const updateBookPackage=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "not a valid Id!"});
    }
    try{
        const canceled=await bookPackageModel.findByIdAndUpdate({_id:id},{...req.body});
        return res.status(200).json({msg:"updated succefully"});
    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

//get payments


const getCompanyPaidAmounts = async () => {
  try {
      const companyPaidAmounts = await BookPackage.aggregate([
          {
              $group: {
                  _id: "$companyId",
                  totalPaidAmount: { $sum: "$paidAmount" }
              }
          },
          {
              $lookup: {
                  from: "companies", 
                  localField: "_id",
                  foreignField: "_id",
                  as: "company"
              }
          },
          {
              $project: {
                  companyName: { $arrayElemAt: ["$company.name", 0] },
                  totalPaidAmount: 1,
                  _id: 0
              }
          }
      ]);

      return companyPaidAmounts;
  } catch (error) {
      console.error("Error getting company paid amounts:", error);
      throw error; // Forward the error to the caller
  }
};

const getAllBookPackages = async (req, res) => {
  try {
    // Query all BookPackage documents
    const bookPackages = await bookPackageModel.find().populate('companyId', 'name');

    // Return the fetched BookPackage documents
    res.json(bookPackages);
  } catch (error) {
    // Handle errors
    console.error('Error fetching BookPackage documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPaidAmounts = async (req, res) => {
  try {
    // Query all BookPackage documents
    const bookPackages = await bookPackageModel.find().populate('companyId', 'name');

    const resultObject = {};

    bookPackages.forEach((bookPackage) => {
      const companyName = bookPackage.companyId.name;

      if (resultObject[companyName] === undefined) {
        // If companyName is not already a key in the object, initialize it
        
        resultObject[companyName] = { total: bookPackage.paidAmount };
      }
      // Update the total for the companyName
      resultObject[companyName].total += bookPackage.paidAmount;
    });

    const resultArray = Object.keys(resultObject).map((companyName) => ({
      companyName:companyName,
      total: resultObject[companyName].total,
    }));
    console.log(resultObject);
    // You can send the resultObject as a response or perform further operations as needed
    res.status(200).json(resultArray);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports={
    bookPackage,
    cancelBooking,
    userBookPackages,
    updateBookPackage,
    companyBooks,
    getAllBookPackages,
    getPaidAmounts
};