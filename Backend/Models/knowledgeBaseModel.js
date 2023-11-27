const mongoose = require('mongoose');
const knowledgeBaseModel = new mongoose.Schema( 
    {
        title: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        subCategory: {
          type: Number,
          required: true,
        },

        answer: {
            type: String,
            required: true,
          }
      },
     
    );
    
 module.exports = mongoose.model('knowledgeBaseModel', knowledgeBaseModel);
 module.exports.Schema = knowledgeBaseModel;  