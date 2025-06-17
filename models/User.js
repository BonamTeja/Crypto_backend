const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    //Id, username, email, password, gender, terms, hobbies, state, address
    Id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    terms: {
        type: String,
        default: false
    },
    hobbies: {
        type: Array,
        default: false
    },
    state: {
        type: String,
        default: false
    },
    address: {
        type: String,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)