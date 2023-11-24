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
    
<<<<<<< HEAD
 module.exports = mongoose.model('try2.js', knowledgeBaseModel);
=======
 module.exports = mongoose.model('knowledgeBaseModel.js', knowledgeBaseModel);
>>>>>>> cc1c9f0f25be169bd15aaa874d27bd157891ee81
 module.exports.Schema = knowledgeBaseModel;  