const bookPackageModel=require("../models/BookPackage")
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
const bookPackage=async(req,res)=>{
    const {companyId,packageId,userId,nbPeople,bookingStatus,payment}=req.body;
    const {status,method}=payment;
    if(!companyId || !packageId || !userId || !nbPeople || !method){
        return res.status(400).json({message: "All fields are required!"});
    }
    
    if(!mongoose.Types.ObjectId.isValid(companyId) || !mongoose.Types.ObjectId.isValid(packageId) || !mongoose.Types.ObjectId.isValid(userId))
    {
        return res.status(400).json({msg:"Not a valid id"});
    }
    try{
        const bookPackage=await bookPackageModel.create({
            companyId,packageId,userId,nbPeople,bookingStatus:"pending",payment:{
                status:"pending",method
            }
        })
        return res.status(200).json(bookPackage);

    }catch(error){
        return res.status(400).json({error:error.message});
    }
}
//cancel booking
const cancelBooking=async(req,res)=>{
    const {id}=req.params;
    try{
        const canceled=await bookPackageModel.findByIdAndDelete({_id:id});
        return res.status(200).json({msg:"canceled succefully"});
    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

//search for booked packages for a specific user
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