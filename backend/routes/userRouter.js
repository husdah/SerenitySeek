const express = require("express");
const router = express.Router();

const {signUpUser, updateProfile, getUserInfoById, getAllUsers} = require("../controllers/userController");
const validateToken = require('../middlewares/validateTokenHandler');
const { isAdmin, isUser} = require('../middlewares/roleHandler');
const ifHaveToken = require('../middlewares/tokenExist');

router.post("/signup", ifHaveToken , signUpUser);
router.put("/user/:id", validateToken, isUser , updateProfile);
router.get("/user/:id", getUserInfoById);
router.get("/users", validateToken, isAdmin , getAllUsers);

module.exports = router;