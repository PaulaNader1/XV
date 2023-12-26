// models/chatModel.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

  sender: String,
  receiver: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
  isRead : Boolean,

});

module.exports = mongoose.model('messageSchema', messageSchema);
module.exports.Schema = messageSchema; 
