const mongoose = require('mongoose');
const customizationModel = new mongoose.Schema( 
    {


        colors: {
            type: String,
            required: true,
          },
          comapnyName: {
            type: String,
            required: true,
          },
          logo: {
            type:Image,
            required: true,
          },


    },
     
    );
    
 module.exports = mongoose.model('customizationModel', customizationModel);
 module.exports.Schema = customizationModel;  