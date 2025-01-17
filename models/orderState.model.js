const mongoose = require('mongoose');

const orderStateSchema = mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  },
  }, { timestamps: true })
  
  module.exports = mongoose.model('orderState', orderStateSchema);