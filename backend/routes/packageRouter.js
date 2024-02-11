const express = require("express");
const router = express.Router();

const { addPackage, updatePackageById, deletePackage, getAllPackages, getPackageDetailsById, getHomePackages, getPackagesByCompanyId, getPackageTypes } = require("../controllers/packageController");

const upload = require('../middlewares/multerMiddleware');
const validateToken = require('../middlewares/validateTokenHandler');
const { isCompany } = require('../middlewares/roleHandler');

router.post("/package",  validateToken, isCompany, upload.single('coverImg'), addPackage);
router.put("/package/:id", validateToken, isCompany, updatePackageById);
router.get("/package/:id", getPackageDetailsById);
router.delete("/package/:id", validateToken, isCompany, deletePackage);
router.get("/packages", getAllPackages);
router.get("/homePackage", getHomePackages);
router.get("/packageForCompany", validateToken, isCompany, getPackagesByCompanyId);
router.get("/packageTypes", getPackageTypes);

module.exports = router;