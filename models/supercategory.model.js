const mongoose = require('mongoose');

const superCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  },
  }, { timestamps: true })
  
  module.exports = mongoose.model('supercategory', superCategorySchema);