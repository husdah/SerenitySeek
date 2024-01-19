const express = require("express");
const router = express.Router();
const { updateCompanyLogo, updateUserProfilePic} = require("../controllers/imgController");
const upload = require('../middlewares/multerMiddleware');
const validateToken = require('../middlewares/validateTokenHandler');

router.use(validateToken);

router.put("/uploadCompanyLogo/:id", upload.single("logo"), updateCompanyLogo);
router.put("/uploadUserPic/:id", upload.single("profilePic"), updateUserProfilePic);

module.exports = router;