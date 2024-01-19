const express = require("express");
const router = express.Router();
const { updateCompanyLogo, updateUserProfilePic} = require("../controllers/imgController");
const upload = require('../middlewares/multerMiddleware');

router.put("/uploadCompanyLogo/:id", upload.single("logo"), updateCompanyLogo);
router.put("/uploadUserPic/:id", upload.single("profilePic"), updateUserProfilePic);

module.exports = router;