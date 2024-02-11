const bookPackageModel=require("../models/BookPackageModel")
const companyModel=require("../models/Company")
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
      return res.status(400).json({ message: "All fields are required!" });
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
          message: "User has already booked this package.",
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

module.exports={
    bookPackage,
    cancelBooking,
    userBookPackages,
    updateBookPackage,
    companyBooks
};