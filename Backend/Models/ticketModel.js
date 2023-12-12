// models/Ticket.js
const mongoose = require('mongoose');

const ticketModel = new mongoose.Schema({
    // ticketid: { type: Number, unique: true },
    userid: { type: String },
    issueinfo: { type: String, required: true },
    agentResponse:{type: String},
    status:{type: String} ,
    agentid:{type: String}  ,
    category: { type: String, required: true },
    subCategory: {type: String, required: true},
    priority: { type: String, required: true },
    date: {type: Date},
    responsedate: {type: Date},
    responserating: {type: Number},

    
    
});

module.exports = mongoose.model('ticketModel', ticketModel);
module.exports.Schema = ticketModel;  