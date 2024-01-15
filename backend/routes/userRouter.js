const express = require("express");
const router = express.Router();

const {signUpUser, updateProfile, getUserInfoById, getAllUsers} = require("../controllers/userController");

router.post("/signup", signUpUser);
router.put("/signup/:id", updateProfile);
router.get("/signup/:id", getUserInfoById);
router.get("/signup", getAllUsers);

module.exports = router;