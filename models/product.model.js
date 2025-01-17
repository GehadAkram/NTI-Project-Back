const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  supercategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'supercategory',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true
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
  bestSeller: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('product', productSchema);