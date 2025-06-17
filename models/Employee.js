const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    // name, email, phone, city, zip
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: false
    },
    city: {
        type: String,
        default: false
    },
    zip: {
        type: String,
        default: false
    }
})

module.exports = mongoose.model('Employee', employeeSchema)