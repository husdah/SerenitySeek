const express = require("express");
const router = express.Router();
const { loginUser, useRefreshToken, logout } = require("../controllers/loggerController");
const ifHaveToken = require('../middlewares/tokenExist');
const validateToken = require('../middlewares/validateTokenHandler');

router.post("/login", ifHaveToken , loginUser);

// Endpoint for refreshing access token using refresh token
router.post("/refresh", useRefreshToken);

router.put('/logout', validateToken , logout);

module.exports = router;