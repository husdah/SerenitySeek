const express=require("express");
const router=express.Router();
const {bookPackage,cancelBooking,userPackages,updateBookPackage,allBooks}=require("../controllers/bookPackageController");

router.get("/bookPackage/:id",userPackages);
router.get("/bookPackage",allBooks);
router.post("/bookPackage",bookPackage);
router.put("/bookPackage/:id",updateBookPackage);
router.delete("/bookPackage/:id",cancelBooking);

module.exports=router;