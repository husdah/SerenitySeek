const express = require("express");
const router = express.Router();

const { addPackage, updatePackageById, deletePackage, getAllPackages, getPackageDetailsById, getHomePackages, getPackagesByCompanyId } = require("../controllers/packageController");

const upload = require('../middlewares/multerMiddleware');
const validateToken = require('../middlewares/validateTokenHandler');
const { isCompany } = require('../middlewares/roleHandler');

router.post("/package",  validateToken, isCompany, upload.single('coverImg'), addPackage);
router.put("/package/:id", validateToken, isCompany, updatePackageById);
router.delete("/package/:id", validateToken, isCompany, deletePackage);
//router.get("/package", getAllPackages);
//router.get("/package/:id", getPackageDetailsById);
router.get("/package", getHomePackages);
//router.get("/package", validateToken, getPackagesByCompanyId);


module.exports = router;