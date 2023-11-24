// models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketid: { type: int, required: true, uniqu: true },
    userid: { type: int, required: true },
    issueinfo: { type: String, required: true },
    agentResponse:{type: String},
    status:{type: Boolean} ,
    agentid:{type: int}  ,
    category: { type: String, required: true },
    subCategory: {type: String, required: true},
    priority: { type: String, required: true },
    date: {type: datetime},
    responsedate: {type: datetime},
    responserating: {type: int},
    
});

module.exports = mongoose.model('ticketModel', ticketModel);
module.exports.Schema = ticketModel;  