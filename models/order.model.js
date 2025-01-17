const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  products: [{
    product : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  total: {
    type: Number,
    default: 0
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orderState',
    required: true,
    default: '67864b3921f4118a4da25e7e'
  },
  shippingAddresss: {
    type: String,
    minLength: 10,
    required: true,
  },  
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema);