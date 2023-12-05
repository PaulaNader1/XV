// models/Ticket.js
const mongoose = require('mongoose');

const ticketModel = new mongoose.Schema({
    ticketid: { type: Number, required: true, uniqu: true },
    userid: { type: Number, required: true },
    issueinfo: { type: String, required: true },
    agentResponse:{type: String},
    status:{type: String} ,
    agentid:{type: Number}  ,
    category: { type: String, required: true },
    subCategory: {type: String, required: true},
    priority: { type: String, required: true },
    date: {type: Date},
    responsedate: {type: Date},
    responserating: {type: Number},

    
    
});

module.exports = mongoose.model('ticketModel', ticketModel);
module.exports.Schema = ticketModel;  