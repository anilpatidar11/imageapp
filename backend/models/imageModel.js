const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({

  filename: String,
  path: String,
  originalname: String,

});

const imageSchemaModel = mongoose.model('Image', imageSchema);

module.exports = imageSchemaModel;


