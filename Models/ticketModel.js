// models/Ticket.js
const mongoose = require('mongoose');

const ticketModel = new mongoose.Schema({
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

module.exports = mongoose.model('ticketModel.js', ticketModel);
<<<<<<< HEAD
 module.exports.Schema = ticketModel;  
=======
module.exports.Schema = ticketModel;  
>>>>>>> 3965cdb9126121012daa877b68edc2d5bb1e8a9c
