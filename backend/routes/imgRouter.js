const express = require("express");
const router = express.Router();
const { updateCompanyLogo} = require("../controllers/imgController");
const upload = require('../middlewares/multerMiddleware');

router.put("/uploadCompanyLogo/:id", upload.single("logo"), updateCompanyLogo);

module.exports = router;