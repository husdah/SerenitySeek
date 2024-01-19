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
const validateToken = require('../middlewares/validateTokenHandler');

router.post("/company", upload.single("license"), createCompany);
router.get("/companies", getAllCompanies);
router.get("/homeCompanies", getHomeCompanies);
router.get("/company/:id", getCompanyById);
router.put("/company/:id", validateToken , updateCompanyInfo);
router.put("/companyAccept/:id", validateToken , acceptCompany);
router.put("/companyRate", validateToken , rateCompany);
router.delete("/company/:id", validateToken , deleteCompany);

module.exports = router;