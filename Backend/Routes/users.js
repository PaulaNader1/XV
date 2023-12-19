const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')


// Get User by ID
// router.get('/users/:id', authorizationMiddleware(['admin', 'user']), userController.getUser);

// Update User Name
router.put('/users/:id/update-username', authorizationMiddleware(['user']), userController.updateUserName);

// Update Password
router.put('/users/:id/update-password', authorizationMiddleware(['user']), userController.updatePassword);

// Create Ticket
router.post('/users/:id/create-ticket', authorizationMiddleware(['user']), userController.createTicket);

// Create Knowledge Base Entry
//router.post('/knowledgebase/create', authenticationMiddleware, authorizationMiddleware(['admin']), userController.createKnowledgeBase);

// Get All Knowledge Base Entries
router.get('/knowledgebase', authorizationMiddleware(['user']), userController.getAllKnowledgeBase);

// Get Knowledge Base Entries by Category
router.get('/knowledgebase/category', authorizationMiddleware(['user']), userController.getKnowledgeBaseByCategory);

//*checkout
router.get("/checkout/:id", authorizationMiddleware(['admin','customer']), userController.checkout);

// Get Knowledge Base Entries by Title
router.get('/knowledgebase/title', authorizationMiddleware(['user']), userController.getKnowledgeBaseBytitle);

// Rate Ticket
router.put('/tickets/:ticketId/rate', authorizationMiddleware(['user']), userController.rateTicket);

module.exports = router;
