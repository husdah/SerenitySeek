const express = require("express");
const router = express.Router();
const { updateCompanyLogo, updateUserProfilePic, removeUserProfilePic, removeCompanyLogo} = require("../controllers/imgController");
const upload = require('../middlewares/multerMiddleware');
const validateToken = require('../middlewares/validateTokenHandler');
const { isCompany, isUser} = require('../middlewares/roleHandler');

/* router.use(validateToken); */

router.put("/uploadCompanyLogo/:id", validateToken, isCompany , upload.single("logo"), updateCompanyLogo);
router.put("/uploadUserPic/:id", validateToken, isUser , upload.single("profilePic"), updateUserProfilePic);
router.put("/removeUserPic/:id", validateToken, isUser , removeUserProfilePic);
router.put("/removeCompanyLogo/:id", validateToken, isCompany , removeCompanyLogo);
module.exports = router;