const express = require("express");
const router = express.Router();
const { 
    createCompany, 
    getCompanyById,
    getCompanyByName,
    getAllCompanies,
    getCompaniesRequest, 
    getHomeCompanies, 
    updateCompanyInfo, 
    acceptCompany, 
    deleteCompany,
    rateCompany ,
    updatePassword,
    getAnalytics
} = require("../controllers/companyController");
const upload = require('../middlewares/multerMiddleware');
const validateToken = require('../middlewares/validateTokenHandler');
const { isAdmin, isCompany, isUser} = require('../middlewares/roleHandler');
const ifHaveToken = require('../middlewares/tokenExist');

router.post("/company", ifHaveToken , upload.single("license"), createCompany);
router.get("/companies", getAllCompanies);
router.get("/homeCompanies", getHomeCompanies);
router.get("/companiesRequest", validateToken, isAdmin , getCompaniesRequest);
router.get("/company/:id", getCompanyById);
router.get("/companyInfo/:Cname", getCompanyByName);
router.put("/company/:id", validateToken , isCompany , updateCompanyInfo);
router.put("/companyAccept/:id", validateToken, isAdmin , acceptCompany);
router.put("/companyRate", validateToken , isUser , rateCompany);
router.put("/companyUpdatePassword/:id", validateToken , isCompany , updatePassword);
router.delete("/company/:id", validateToken, isAdmin , deleteCompany);

//for admin dashboard
router.get("/analytics", validateToken, isAdmin, getAnalytics);

module.exports = router;