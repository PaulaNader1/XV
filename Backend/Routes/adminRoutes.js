
const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");


// router.post("/create-new-user", authorizationMiddleware(['admin']), adminController.createNewUser);


router.put("/update-user-role", authorizationMiddleware(['admin']), adminController.updateUserRole); //tested done


router.delete("/delete-user", authorizationMiddleware(['admin']), adminController.deleteUser);// tested done



router.put("/change-customization", authorizationMiddleware(['admin']),adminController.changeCustomization);// tested done 


router.get("/Allusers",  authorizationMiddleware(['admin']), adminController.getAllUsers);   //tested done


module.exports = router;