const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

// * login
router.post("/login",userController.login );
// * register
router.post("/register",userController.register);

router.post("/verify-otp", userController.verifyOTP);

module.exports = router; // ! Don't forget to export the router
