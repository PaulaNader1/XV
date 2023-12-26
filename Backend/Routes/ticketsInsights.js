const express = require("express");
const router = express.Router();
const ticketsInsightsController = require('../controller/ticketsInsightsController');
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

// * Get tickets insights paginated
router.get("/",authorizationMiddleware, ticketsInsightsController.getTicketsInsightsPaginated);

router.get("/:id",authorizationMiddleware, ticketsInsightsController.getTicketsInsightsById);

router.get("/tickets/analytics",authorizationMiddleware, ticketsInsightsController.getAnalytics);


module.exports = router; // ! Don't forget to export the router
