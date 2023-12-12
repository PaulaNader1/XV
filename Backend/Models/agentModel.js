const mongoose = require('mongoose');

const agentModel = new mongoose.Schema( 
    {
        // agentId: {
        //   type: Number,
        //   required:true
        // },
        username: {
          type: String,
          required: true,
          unique:true
        },
        password: {
          type: String,
          minLength: 5,
          required: true,
        },

        email:{
            type:String,
            required:true

        },

        primaryCategory:{
            type:String,
            required:true
        }
      },
      // schemaOptions
      {
        strict: true,
        timestamps: true,
      }
    );

 module.exports = mongoose.model('agentModel', agentModel);
 module.exports.Schema = agentModel;   