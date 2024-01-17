const express = require("express");
const router = express.Router();
const { 
    createCompany, 
    getCompanyById, 
    getAllCompanies, 
    getHomeCompanies, 
    updateCompanyInfo, 
    acceptCompany, 
    deleteCompany,
    rateCompany 
} = require("../controllers/companyController");
const upload = require('../middlewares/multerMiddleware');

router.post("/company", upload.single("license"), createCompany);
router.get("/companies", getAllCompanies);
router.get("/homeCompanies", getHomeCompanies);
router.get("/company/:id", getCompanyById);
router.put("/company/:id", updateCompanyInfo);
router.put("/company/accept/:id", acceptCompany);
router.put("/company/rate/:companyId", rateCompany);
router.delete("/company/:id", deleteCompany);

module.exports = router;