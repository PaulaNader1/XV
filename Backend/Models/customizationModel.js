const mongoose = require('mongoose');
const customizationModel = new mongoose.Schema( 
    {


        colors: {
          primary: String,
          secondary: String
          },
          comapanyName: {
            type: String,
            required: true,
          },
          logo: {
            type:String,
            required: true,
          },


    },
     
    );
    
 module.exports = mongoose.model('customizationModel', customizationModel);
 module.exports.Schema = customizationModel;  