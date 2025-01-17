const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  },
  }, { timestamps: true })
  
  module.exports = mongoose.model('category', categorySchema);