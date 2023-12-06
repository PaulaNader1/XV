const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// // * Get all users
// router.get("/",  authorizationMiddleware(['admin']),userController.getAllUsers);

// // * Get one user
// router.get("/:id", authorizationMiddleware(['admin','customer']), userController.getUser);

// // * Update one user
// router.put("/:id",  authorizationMiddleware(['admin','customer']),userController.updateUser);

// // * Delete one user
// router.delete("/:id", authorizationMiddleware(['admin']), userController.deleteUser);

// // get shopping cart
// router.get("/cart/:id",  authorizationMiddleware(['admin','customer']),userController.getShoppingCart);

// //* add to cart
// router.put("/addTocart/:id/:productid", authorizationMiddleware(['admin','customer']), userController.addToCart);

// //* remove from cart
// router.put("/removeFromcart/:id/:productid",  authorizationMiddleware(['admin','customer']), userController.removeFromCart);

// //*checkout
// router.get("/checkout/:id", authorizationMiddleware(['admin','customer']), userController.checkout);

//------------using router.route()-----------------

// router.route("/").get(userController.getAllUsers);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .put(userController.updateUser)
//   .delete(userController.deleteUser);

// module.exports = router;

// const authenticationMiddleware = require('../middleware/authenticationMiddleware');

// User Registration
// router.post('/register', userController.register);

// User Login
// router.post('/login', userController.login);

// Get All Users
// router.get('/users', authenticationMiddleware, authorizationMiddleware(['admin']), userController.getAllUsers);

// Get User by ID
router.get('/users/:id', authorizationMiddleware(['admin', 'user']), userController.getUser);

// Update User Name
router.put('/users/:id/update-username', authorizationMiddleware(['user']), userController.updateUserName);

// Update Password
router.put('/users/:id/update-password', authorizationMiddleware(['user']), userController.updatePassword);

// Create Ticket
router.post('/tickets/create', authorizationMiddleware(['user']), userController.createTicket);

// Create Knowledge Base Entry
//router.post('/knowledgebase/create', authenticationMiddleware, authorizationMiddleware(['admin']), userController.createKnowledgeBase);

// Get All Knowledge Base Entries
router.get('/knowledgebase', authorizationMiddleware(['user']), userController.getAllKnowledgeBase);

// Get Knowledge Base Entries by Category
router.get('/knowledgebase/category/:category', authorizationMiddleware(['user']), userController.getKnowledgeBaseByCategory);

// Get Knowledge Base Entries by SubCategory
router.get('/knowledgebase/subcategory/:subcategory', authorizationMiddleware(['user']), userController.getKnowledgeBaseBySubCategory);

// Get Knowledge Base Entries by Title
router.get('/knowledgebase/title', authorizationMiddleware(['user']), userController.getKnowledgeBaseBytitle);

// Rate Ticket
router.put('/tickets/:ticketId/rate', authorizationMiddleware(['user']), userController.rateTicket);

module.exports = router;
