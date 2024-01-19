const express = require("express");
const router = express.Router();

const {signUpUser, updateProfile, getUserInfoById, getAllUsers} = require("../controllers/userController");
const validateToken = require('../middlewares/validateTokenHandler');

router.post("/signup", signUpUser);
router.put("/user/:id", validateToken , updateProfile);
router.get("/user/:id", getUserInfoById);
router.get("/users", validateToken , getAllUsers);

module.exports = router;