const ticketModel = require("../Models/ticketModel");
const userModel = require("../Models/userModel");
const agentModel = require("../Models/agentModel");

const date = require('date-and-time')

const ticketsInsightsProjection = {
    '_id': 0,
    status: 1,
    category: 1,
    priority: 1,
    subCategory: 1,
    responserating: 1,
    createdAt: 1,
    updatedAt: 1
}

const ticketsAnalyticsProjection = {
    '_id': 0,
    status: 1,
    category: 1,
    priority: 1,
    issueinfo: 1,
}

const getCategoryPercentage = (partCount, wholeCount) => ((partCount / wholeCount) * 100).toFixed(2);

const getCategoryCount = (tickets, categoryTitle) => tickets.filter((ticket) => ticket.category.trim().toLowerCase() === categoryTitle).length;

const ticketsInsightsController = {

    getTicketsInsightsPaginated: async (req, res) => {
        try {
            const page = req.query.pageNumber - 1 ?? 0;
            const pageSize = req.query.pageSize ?? 10;

            let result = await ticketModel.find({}, ticketsInsightsProjection).skip(page * pageSize).limit(pageSize);


            result.map(row => {
                if (row.status && row.status.trim().toLowerCase() === 'closed') {
                    row.resolutionTime = date.subtract(row.updatedAt, row.createdAt)
                        .toMinutes()
                        .toFixed(2).toString() + ' Minutes';

                }
                return row;

            });
            return res.send(result);
        }
        catch (error) {
            console.error("Error while getting tickets Insights:", error);
            res.status(500).json({ message: "Server error" });
        }
    },

    getTicketsInsightsById: async (req, res) => {
        try {

            let result = await ticketModel.findOne({ ticketId: req.params.id ?? '0' }, ticketsInsightsProjection);
            if (!result) {
                return res.status(404).send('No tickets found');
            }
            return res.send(result);
        }
        catch (error) {
            console.error("Error while getting tickets Insights by id:", error);
            res.status(500).json({ message: "Server error" });
        }
    },



    getAnalytics: async (req, res) => {
        try {
            let analytics = await ticketModel.find({}, ticketsAnalyticsProjection)
            var analyticsCount = analytics.length
            categoriesPercentage = [
                { category: 'Software', percentage: getCategoryPercentage(getCategoryCount(analytics, 'software'), analyticsCount) },
                { category: 'Hardware', percentage: getCategoryPercentage(getCategoryCount(analytics, 'hardware'), analyticsCount) },
                { category: 'Network', percentage: getCategoryPercentage(getCategoryCount(analytics, 'network'), analyticsCount) }
            ];
            return res.send(categoriesPercentage);
        }
        catch (err) {
            console.error("Error while getting tickets", err);
            res.status(500).json({ message: "Server error" });
        }
    }
};

module.exports = ticketsInsightsController;



