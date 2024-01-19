const express = require("express");
const router = express.Router();

const {signUpUser, updateProfile, getUserInfoById, getAllUsers} = require("../controllers/userController");

router.post("/signup", signUpUser);
router.put("/user/:id" , updateProfile);
router.get("/user/:id", getUserInfoById);
router.get("/users", getAllUsers);

module.exports = router;