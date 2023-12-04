
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");


router.post("/create-new-user", authorizationMiddleware(['admin']), adminController.createNewUser);


router.post("/update-user-role",authorizationMiddleware(['admin']) , adminController.updateUserRole);


router.delete("/delete-user" ,  authorizationMiddleware(['admin']), adminController.deleteUser);


router.post("/change-customization", authorizationMiddleware(['admin']),adminController.changeCustomization);


router.get("/users", authorizationMiddleware(['admin']), adminController.getAllUsers);   


module.exports = router;