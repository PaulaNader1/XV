const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema( 
    {
        // chatid: {
        //   type: Number,
        //   unique: true
        // },
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
        sub_category: {
          type: String,
          required : true,
        },
        date: {
          type : Date,
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

 