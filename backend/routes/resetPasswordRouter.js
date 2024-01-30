const express = require('express');
const router = express.Router();
const { sendForgetPasswordLink, getResetPasswordView, resetThePassword} = require('../controllers/resetPasswordController');

router.post("/forget-password", sendForgetPasswordLink);
router.get("/reset-password/:userId/:token", getResetPasswordView);
router.post("/reset-password/:userId/:token",resetThePassword);

module.exports = router;