const express = require('express');
const router = express.Router();
const { getForgetPasswordView, sendForgetPasswordLink, getResetPasswordView, resetThePassword} = require('../controllers/resetPasswordController');

router.get("/forget-password", getForgetPasswordView);
router.post("/forget-password", sendForgetPasswordLink);
router.get("/reset-password/:userId/:token", getResetPasswordView);
router.post("/reset-password/:userId/:token",resetThePassword);

module.exports = router;