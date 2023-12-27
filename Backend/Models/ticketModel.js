// models/Ticket.js
const mongoose = require('mongoose');

const ticketModel = new mongoose.Schema({
    userid: { type: String },
    issueinfo: { type: String, required: true },
    agentResponse:{type: String},
    status:{type: String} ,
    agentid:{type: String}  ,
    category: { type: String, required: true },
    subCategory: {type: String, required: true},
    priority: { type: String},
    date: {type: Date},
    responsedate: {type: Date},
    responserating: {type: Number, default: 0},

    
    
});

module.exports = mongoose.model('ticketModel', ticketModel);
module.exports.Schema = ticketModel;  