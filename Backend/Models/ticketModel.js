// models/Ticket.js
const mongoose = require('mongoose');

const ticketModel = new mongoose.Schema({
    userid: { type: String },
    issueinfo: { type: String, required: true },
    agentResponse: { type: String },
    status: { type: String },
    agentId: { type: String },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    priority: { type: String, required: true , default: 'medium' },
    date: { type: Date },
    resolutionTime: { type: String },
    responserating: { type: Number, default: undefined },
}, {
    strict: true,
    timestamps: true
});

module.exports = mongoose.model('ticketModel', ticketModel);
module.exports.Schema = ticketModel;  