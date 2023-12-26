const mongoose = require('mongoose');
const messageModel = require('./messageModel');

const chatSchema = new mongoose.Schema( 
    {
        chatid: {
          type: Number,
          unique: true
        },
        userid: {
          type: Number,
          required: true
        },
        agentid: {
          type: Number,
          required: true
        },
        category: {
          type : String,
          required : true
        },
        // sub_category: {
        //   type: String,
        //   required : true,
        // },
        messages: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'messageModel', // Reference to the messageModel
        }],
      },
      // schemaOptions
      {
        strict: true,
        timestamps: true,
      }
);

module.exports = mongoose.model('Chat', chatSchema);  // corrected the model name to 'Chat'
module.exports.Schema = chatSchema;
