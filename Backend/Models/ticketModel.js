// models/Ticket.js
const mongoose = require('mongoose');
const uuid = require('uuid');

const ticketModel = new mongoose.Schema({
    userid: { type: String },
    issueinfo: { type: String, required: true },
    agentResponse: { type: String },
    status: { type: String, required: true },
    agentid: { type: String },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    priority: { type: String, required: true },
    date: { type: Date },
    responsedate: { type: Date },
    resolutionTime: { type: String },
    responserating: { type: Number, default: undefined },



},
    { timestamps: true });

module.exports = mongoose.model('ticketModel', ticketModel);
module.exports.Schema = ticketModel;  