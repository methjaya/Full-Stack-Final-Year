const mongoose = require('mongoose')

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    emergencyContact: {
        type: Number,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('User', User)