const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema( 
    {
        chatid: {
          type: int,
          unique: true
        },
        userid: {
          type: int,
          required: true
        },
        agentid: {
          type: int,
          required: true
        },
        category: {
          type : String,
          required : true
        },
        sub_category: {
          type: String,
          required : true,
        },
        date: {
          type : datetime,
          required : true
        }

      },
      // schemaOptions
      {
        strict: true,
        timestamps: true,
      }
    );

 module.exports = mongoose.model('chatSchema', chatSchema);
 module.exports.Schema = chatSchema;   

 