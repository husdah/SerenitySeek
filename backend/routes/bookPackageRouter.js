const express=require("express");
const router=express.Router();
const {bookPackage,cancelBooking,userBookPackages,updateBookPackage,companyBooks}=require("../controllers/bookPackageController");

router.get("/bookPackage/foruser/:id",userBookPackages);
router.get("/bookPackage/forcompany/:id",companyBooks);
router.post("/bookPackage",bookPackage);
router.put("/bookPackage/:id",updateBookPackage);
router.delete("/bookPackage/:id",cancelBooking);

module.exports=router;