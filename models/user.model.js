const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    phone: {
        type: Number,
        required: true
    },
    addresss: {
        type: String,
        minLength: 10
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isSuspended: {
        type: Boolean,
        required: true,
        default: false
    },
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema);