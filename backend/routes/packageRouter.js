const express = require("express");
const router = express.Router();

const { addPackage, updatePackageById, deletePackage, getAllPackages, getPackageDetailsById, getSomePackages, getSomePackagesRandomly, getPackagesByCompanyId } = require("../controllers/packageController");

const upload = require('../middlewares/multerMiddleware');
router.post("/addPackage", upload.single('coverImg'), addPackage);
router.put("/action/:id", updatePackageById);
router.delete("/action/:id", deletePackage);
router.get("/action", getAllPackages);
//router.get("/action/:id", getPackageDetailsById);
//router.get("/action", getSomePackages);
//router.get("/action", getSomePackagesRandomly);
//router.get("/action/:companyId", getPackagesByCompanyId);


module.exports = router;