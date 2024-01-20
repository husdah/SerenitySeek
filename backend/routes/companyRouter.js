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
const { isAdmin, isCompany, isUser} = require('../middlewares/roleHandler');

router.post("/company", upload.single("license"), createCompany);
router.get("/companies", getAllCompanies);
router.get("/homeCompanies", getHomeCompanies);
router.get("/company/:id", getCompanyById);
router.put("/company/:id", validateToken , isCompany , updateCompanyInfo);
router.put("/companyAccept/:id", validateToken, isAdmin , acceptCompany);
router.put("/companyRate", validateToken , isUser , rateCompany);
router.delete("/company/:id", validateToken, isAdmin , deleteCompany);

module.exports = router;